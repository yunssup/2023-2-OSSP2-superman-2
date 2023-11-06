package com.superman.backend.Controller;

import com.superman.backend.DAO.SessionDataDao;
import com.superman.backend.Entity.SessionData;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.Instant;

@SpringBootApplication
@ComponentScan(basePackages = {"com.superman.backend", "com.superman.backend.DAO"})
@RestController
public class GenerateSession {

    private final SessionDataDao sessionDataDao; // SessionDataDao 주입
    @PersistenceContext
    private EntityManager entityManager;
    public GenerateSession(SessionDataDao sessionDataDao) {
        this.sessionDataDao = sessionDataDao;
    }

    public static void main(String[] args) {
        SpringApplication.run(GenerateSession.class, args);
    }
    //세션아이디가 이미 데이터베이스에 있는지 확인.
    public boolean isSessionIdExists(String sessionId) {
        String query = "SELECT COUNT(*) FROM SessionData s WHERE s.sessionId = :sessionId";
        Long count = entityManager.createQuery(query, Long.class)
                .setParameter("sessionId", sessionId)
                .getSingleResult();
        return count > 0;
    }
    @GetMapping("/api/user")
    public String getSessionInfo(HttpServletRequest request) {
        HttpSession session = request.getSession(true); // 세션이 없으면 새로 생성
        session.setMaxInactiveInterval(3600); // 세션 만료 시간을 1시간(3600초)으로 설정

        // 세션 만료 시간 계산
        long now = Instant.now().toEpochMilli();
        long expiryTime = now + (session.getMaxInactiveInterval() * 1000L);

        // 만료 시간까지의 남은 시간 계산
        long timeToLive = (expiryTime - now) / 1000; // 초 단위로 변환

        // 이미 있는 세션 ID 확인
        if (isSessionIdExists(session.getId())) {
            return "Error: Session ID already exists! "+ session.getId();
        }

        // SessionDataDao를 사용하여 데이터 저장
        SessionData sessionData = new SessionData();
        sessionData.setSessionId(session.getId());
        sessionData.setIsSelected(0); // 적절한 값으로 변경
        sessionData.setMileage(0); // 적절한 값으로 변경
        sessionData.setFrequentLocation("someLocation"); // 적절한 값으로 변경
        sessionDataDao.insertSessionData(sessionData);

        return "Session ID: " + session.getId() + ", Expiry Time (seconds): " + timeToLive;
    }

}
