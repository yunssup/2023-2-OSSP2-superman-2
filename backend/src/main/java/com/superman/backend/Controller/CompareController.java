package com.superman.backend.Controller;

import com.superman.backend.DTO.CompareRequestDTO;
import com.superman.backend.Service.TravalTimeService;
import com.superman.backend.Service.UserHouseInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CompareController {

    private final UserHouseInfoService userHouseInfoService;
    private final TravalTimeService travalTimeService;
    @Autowired
    public CompareController(UserHouseInfoService userHouseInfoService, TravalTimeService travalTimeService) {
        this.userHouseInfoService = userHouseInfoService;
        this.travalTimeService = travalTimeService;
    }

    @GetMapping("/compare/TravalTime")
    public ResponseEntity<String> getTravalTime(@RequestParam String user, @RequestParam int house) {
        try {
            String time = travalTimeService.getTravalTime(user, house);
            return ResponseEntity.ok("Travel time for user " + user + " and house " + house + ": " + time);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error getting travel time: " + e.getMessage());
        }
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
