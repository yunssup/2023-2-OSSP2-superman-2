package com.superman.backend.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

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
    public Map<String, Object> generateSession(HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();
        HttpSession session = request.getSession(true);
        session.setMaxInactiveInterval(3600);

        long now = Instant.now().toEpochMilli();
        long expiryTime = now + (session.getMaxInactiveInterval() * 1000L);
        long timeToLive = (expiryTime - now) / 1000;

        if (userInfoService.isSessionIdExists(session.getId())) {
            response.put("status", "Error");
            response.put("error_message", "Session ID already exists!");
            response.put("session_id", session.getId());
            return response;
        }

        userInfoService.insertSessionData(session.getId(), 0, 0, 0.0, "");

        UserHouseData userHouseData = new UserHouseData();
        userHouseData.setSessionId(session.getId());
        // 여기에서 firstHome, secondHome 등 필요한 값들을 설정

        SessionData sessionData = entityManager.find(SessionData.class, session.getId());
        userHouseData.setSessionData(sessionData);

        entityManager.persist(userHouseData);

        boolean isUserHouseDataManaged = entityManager.contains(userHouseData);
        System.out.println("Is UserHouseData managed by the persistence context? " + isUserHouseDataManaged);

        response.put("status", "Success");
        response.put("session_id", session.getId());
        response.put("expiry_time_seconds", timeToLive);
        response.put("session_status", "New");
        return response;
    }

}
