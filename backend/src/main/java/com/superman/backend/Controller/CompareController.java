package com.superman.backend.Controller;

import com.superman.backend.DTO.ApiHouseInfoResponseDTO;
import com.superman.backend.DTO.CompareRequestDTO;
import com.superman.backend.Entity.SessionData;
import com.superman.backend.Entity.UserHouseData;
import com.superman.backend.Repository.SessionDataRepository;
import com.superman.backend.Service.CrawlingHouseInfoService;
import com.superman.backend.Service.GetHouseInfoByApiService;
import com.superman.backend.Service.TransportCostService;
import com.superman.backend.Service.TravalTimeService;
import com.superman.backend.Service.UserHouseInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class CompareController {

    private final UserHouseInfoService userHouseInfoService;
    private final TravalTimeService travalTimeService;
    private final TransportCostService transportCostService;
    private final CrawlingHouseInfoService crawlingInfoService;
    private final SessionDataRepository sessionDataRepository;
    private final GetHouseInfoByApiService getHouseInfoByApiService;
    
    @Autowired
    public CompareController(UserHouseInfoService userHouseInfoService, TravalTimeService travalTimeService, TransportCostService transportCostService, CrawlingHouseInfoService crawlingInfoService, SessionDataRepository sessionDataRepository, GetHouseInfoByApiService getHouseInfoByApiService) {
        this.userHouseInfoService = userHouseInfoService;
        this.travalTimeService = travalTimeService;
        this.transportCostService = transportCostService;
        this.crawlingInfoService = crawlingInfoService;
        this.sessionDataRepository = sessionDataRepository;
        this.getHouseInfoByApiService = getHouseInfoByApiService;
    }

    @GetMapping("/compare/TravalTime")
    public ResponseEntity<Map<String, Object>> getTravelTime(@RequestParam String user, @RequestParam int house) {
        try {
            String time = travalTimeService.getTravalTime(user, house);
            if(Objects.equals(time, "gg")){
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Not found");
                errorResponse.put("message", "Time data not found for user " + user + " and house " + house);

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("house", house);
            response.put("travel_time", time);
            response.put("status_code_value", 200);
            response.put("status_code", "OK");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error getting travel time");
            errorResponse.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/compare/transport")
    public ResponseEntity<Map<String, Object>> getTransportCost(@RequestParam String user, @RequestParam int house) {
        try {
            String cost = transportCostService.getCost(user, house);
            Map<String, Object> response = new HashMap<>();
            response.put("user name", user);
            response.put("house_number", house);
            response.put("cost", cost);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error getting travel time");
            errorResponse.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    @PostMapping("/compare")
    public ResponseEntity<?> compare(@RequestBody CompareRequestDTO requestDTO) {
        try {
            userHouseInfoService.saveHouseInfo(requestDTO);
            return ResponseEntity.ok("House information saved successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving house information: " + e.getMessage());
        }
    }

    // 집 정보 반환
    @GetMapping("/compare/houseinfo")
    public ResponseEntity<Map<String, Object>> getHouseInfo(@RequestParam String user, @RequestParam String address) {
        try {
            
            Map<String, Object> response = new HashMap<>();
            ApiHouseInfoResponseDTO apiRes = getHouseInfoByApiService.getHouseInfo(address);
            response.put("houseInfo", apiRes);
            //response.put("houseInfo", getHouseInfoByApiService.getHouseInfo(address));
            System.out.println(apiRes.getPrc());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error getting house info");
            errorResponse.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
   /* @GetMapping("/realhouseinfo")
    @ResponseBody
    public String getRealEstateInfo(@RequestParam String sessionId, @RequestParam int housenum) {
        // SessionData sessionData = sessionDataRepository.findById(sessionId).orElse(null);
        // if (sessionData != null) {
        //    String searchAddress = getAddressFromHouseNumber(sessionData, housenum);
        //    return crawlingInfoService.getRealEstateInfo(searchAddress);
        //}
        return "매물 가격: 5,000/60 면적: 22.91㎡/22.91㎡(전용률100%) ";
    }*/

    // 실거래가 자동화 되면 추가.
}
