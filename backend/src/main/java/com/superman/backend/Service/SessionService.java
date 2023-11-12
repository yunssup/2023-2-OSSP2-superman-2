package com.superman.backend.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionService {

    @Autowired
    private UserInfoService userInfoService;

    public String generateSession(HttpServletRequest request) {
        HttpSession session = request.getSession(true);
        session.setMaxInactiveInterval(3600);

        long now = Instant.now().toEpochMilli();
        long expiryTime = now + (session.getMaxInactiveInterval() * 1000L);
        long timeToLive = (expiryTime - now) / 1000;

        if (userInfoService.isSessionIdExists(session.getId())) {
            return "Error: Session ID already exists! " + session.getId();
        }

        userInfoService.insertSessionData(session.getId(), 1, 2, 0.0, "");

        return "Session ID: " + session.getId() + ", Expiry Time (seconds): " + timeToLive;
    }
}
