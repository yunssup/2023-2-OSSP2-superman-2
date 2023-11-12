package com.superman.backend.Service;

import com.superman.backend.DTO.CompareRequestDTO;
import com.superman.backend.Entity.UserHouseData;
import com.superman.backend.Repository.UserHouseDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserHouseInfoService {

    private final UserHouseDataRepository userHouseDataRepository;

    @Autowired
    public UserHouseInfoService(UserHouseDataRepository newTableRepository) {
        this.userHouseDataRepository = newTableRepository;
    }

    public void saveHouseInfo(CompareRequestDTO requestDTO) {
        String sessionId = requestDTO.getUser(); // Assuming sessionId is provided in the 'User' field

        UserHouseData newTable = userHouseDataRepository.findById(sessionId).orElse(new UserHouseData());
        if (requestDTO.getHouseNum() == 1) {
            newTable.setFirstHome(requestDTO.getHouseAddress());
        } else if (requestDTO.getHouseNum() == 2) {
            newTable.setSecondHome(requestDTO.getHouseAddress());
        }

        // Save or update the entity
        userHouseDataRepository.save(newTable);
    }
}
