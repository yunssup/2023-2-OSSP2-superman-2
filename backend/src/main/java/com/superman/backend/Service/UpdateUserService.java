package com.superman.backend.Service;

import com.superman.backend.DTO.UpdateSessionDataDto;
import com.superman.backend.Repository.SessionDataRepository;
import com.superman.backend.Entity.SessionData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UpdateUserService {

    private static final Logger logger = LoggerFactory.getLogger(UpdateUserService.class);

    @Autowired
    private SessionDataRepository sessionDataRepository;

    @Transactional
    public ResponseEntity<String> updateSessionData(String sessionId, UpdateSessionDataDto sessionData) {
        try {
            SessionData existingData = sessionDataRepository.findById(sessionId).orElse(null);
            if (existingData != null) {
                ObjectMapper objectMapper = new ObjectMapper();
                String dtoAsJson = objectMapper.writeValueAsString(sessionData);

                logger.info("DTO as JSON: {}", dtoAsJson);

                existingData.setHomeType(sessionData.getHomeType());
                existingData.setTransportationType(sessionData.getTransportationType());
                existingData.setOftenPlace(sessionData.getOftenPlace());
                existingData.setFuelCost(sessionData.getFuelCost());

                sessionDataRepository.save(existingData);
            } else {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            logger.error("Error updating user data", e);
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>("User data updated successfully", HttpStatus.OK);
    }
}

