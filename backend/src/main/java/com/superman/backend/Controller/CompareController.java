package com.superman.backend.Controller;

import com.superman.backend.DTO.CompareRequestDTO;
import com.superman.backend.Service.UserHouseInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CompareController {

    private final UserHouseInfoService userHouseInfoService;

    @Autowired
    public CompareController(UserHouseInfoService userHouseInfoService) {
        this.userHouseInfoService = userHouseInfoService;
    }

    @PostMapping("/compare")
    public ResponseEntity<String> compare(@RequestBody CompareRequestDTO requestDTO) {
        try {
            userHouseInfoService.saveHouseInfo(requestDTO);
            return ResponseEntity.ok("House information saved successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving house information: " + e.getMessage());
        }
    }
}
