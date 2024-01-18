package com.superman.backend.Service;

import com.superman.backend.Repository.SessionDataRepository;
import com.superman.backend.Entity.SessionData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInfoService {

    @Autowired
    private SessionDataRepository sessionDataRepository;

    public SessionData getSessionInfo(String sessionId) {
        return sessionDataRepository.findById(sessionId).orElse(null);
    }

    public boolean isSessionIdExists(String sessionId) {
        return sessionDataRepository.existsById(sessionId);
    }

    public void insertSessionData(String sessionId, int homeType, int transportationType, double fuelCost, String oftenPlace, int Interest) {
        SessionData sessionData = new SessionData();
        sessionData.setSessionId(sessionId);
        sessionData.setHomeType(homeType);
        sessionData.setTransportationType(transportationType);
        sessionData.setFuelCost(fuelCost);
        sessionData.setOftenPlace(oftenPlace);
        sessionData.setInterest(Interest);
        sessionDataRepository.save(sessionData);
    }
}
