package com.superman.backend.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.Instant;

import com.superman.backend.Entity.SessionData;
import com.superman.backend.Entity.UserHouseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SessionService {

    @Autowired
    private UserInfoService userInfoService;

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public String generateSession(HttpServletRequest request) {
        // 세션 생성 및 설정
        HttpSession session = request.getSession(true);
        session.setMaxInactiveInterval(3600);

        // 세션 만료 시간 설정
        long now = Instant.now().toEpochMilli();
        long expiryTime = now + (session.getMaxInactiveInterval() * 1000L);
        long timeToLive = (expiryTime - now) / 1000;

        // 이미 존재하는 세션 ID 확인
        if (userInfoService.isSessionIdExists(session.getId())) {
            return "Error: Session ID already exists! " + session.getId();
        }

        // SessionData 생성 및 저장
        userInfoService.insertSessionData(session.getId(), 0, 0, 0.0, "");

        // UserHouseData 생성 및 저장
        UserHouseData userHouseData = new UserHouseData();
        userHouseData.setSessionId(session.getId());
        // 여기에서 firstHome, secondHome 등 필요한 값들을 설정

        // SessionData와의 관계 설정
        SessionData sessionData = entityManager.find(SessionData.class, session.getId());
        userHouseData.setSessionData(sessionData);

        // UserHouseData 저장
        entityManager.persist(userHouseData);

        // UserHouseData의 영속성 컨텍스트 관리 여부 확인
        boolean isUserHouseDataManaged = entityManager.contains(userHouseData);
        System.out.println("Is UserHouseData managed by the persistence context? " + isUserHouseDataManaged);

        // 응답 반환
        return "Session ID: " + session.getId() + ", Expiry Time (seconds): " + timeToLive;
    }
}
