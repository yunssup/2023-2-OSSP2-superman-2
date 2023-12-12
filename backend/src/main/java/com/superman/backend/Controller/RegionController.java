package com.superman.backend.Controller;

import com.superman.backend.DTO.SearchConditionDTO;
import com.superman.backend.Service.MonthlyRentService;
import com.superman.backend.Service.SearchBestHouseService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping
    public ResponseEntity<?> searchRegion(
            @RequestParam int region,
            @RequestParam int condition,
            @RequestParam int range,
            @RequestParam int maxtraveltime,
            @RequestParam int hometype
    ) {
        SearchConditionDTO searchConditionDTO = new SearchConditionDTO(region, maxtraveltime, condition, range, hometype);
        return ResponseEntity.ok(searchBestHouseService.getBestHousesByCondition(searchConditionDTO));
    }
    @GetMapping("/{regionid}")
    public List<?> getMonthlyDataByCost(@PathVariable int regionid){
        return monthlyRentService.findMonthlyRentByCost(regionid);
    }
}

