package com.superman.backend.Controller;

import com.superman.backend.DTO.CompareRequestDTO;
import com.superman.backend.Entity.SessionData;
import com.superman.backend.Entity.UserHouseData;
import com.superman.backend.Repository.SessionDataRepository;
import com.superman.backend.Service.CrawlingHouseInfoService;
import com.superman.backend.Service.TransportCostService;
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
    private final TransportCostService transportCostService;
    private final CrawlingHouseInfoService crawlingInfoService;
    private final SessionDataRepository sessionDataRepository;
    @Autowired
    public CompareController(UserHouseInfoService userHouseInfoService, TravalTimeService travalTimeService, TransportCostService transportCostService, CrawlingHouseInfoService crawlingInfoService, SessionDataRepository sessionDataRepository) {
        this.userHouseInfoService = userHouseInfoService;
        this.travalTimeService = travalTimeService;
        this.transportCostService = transportCostService;
        this.crawlingInfoService = crawlingInfoService;
        this.sessionDataRepository = sessionDataRepository;
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
    @GetMapping("/compare/transport")
    public ResponseEntity<String> getTransportCost(@RequestParam String user, @RequestParam int house) {
        try {
            String cost = transportCostService.getCost(user, house);
            return ResponseEntity.ok("user name :" + user + "\n house_number: " + house + "\ncost : " + cost);
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
    @GetMapping("/realhouseinfo")
    @ResponseBody
    public String getRealEstateInfo(@RequestParam String sessionId, @RequestParam int housenum) {
        SessionData sessionData = sessionDataRepository.findById(sessionId).orElse(null);
        if (sessionData != null) {
            String searchAddress = getAddressFromHouseNumber(sessionData, housenum);
            return crawlingInfoService.getRealEstateInfo(searchAddress);
        }
        return "No data found for given sessionId";
    }

    private String getAddressFromHouseNumber(SessionData sessionData, int houseNumber) {
        UserHouseData userHouseData = sessionData.getUserHouseData();
        if (userHouseData != null) {
            if (houseNumber == 1) {
                return userHouseData.getFirstHome();
            } else if (houseNumber == 2) {
                return userHouseData.getSecondHome();
            }
        }
        return null;
    }
}
