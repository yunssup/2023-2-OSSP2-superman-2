package com.superman.backend.Controller;

import com.superman.backend.DTO.SearchConditionDTO;
import com.superman.backend.Service.MonthlyRentService;
import com.superman.backend.Service.SearchBestHouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/region")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class RegionController {

    @Autowired
    SearchBestHouseService searchBestHouseService;

    @Autowired
    MonthlyRentService monthlyRentService;
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생: " + ex.getMessage());
    }
    @GetMapping("/{regionid}/{condition}/{range}/{maxtraval}/{userid}")
    public ResponseEntity<?> getMonthlyDataByCost(@PathVariable int regionid,
                                                  @PathVariable int condition,
                                                  @PathVariable int range,
                                                  @PathVariable int maxtraval,
                                                  @PathVariable String userid) {
        if (condition == 1 || condition == 2) {
            List<?> result = null;
            if (condition == 1) {
                result = monthlyRentService.findMonthlyRentByCost(regionid, range, maxtraval, userid);
            } else if (condition == 2) {
                result = monthlyRentService.findMonthlyRentByArea(regionid, range, maxtraval, userid);
            }

            if (result.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("조건내 검색된 항목이 없습니다");
            } else {
                return ResponseEntity.ok(result);
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid condition value");
        }
    }

}

