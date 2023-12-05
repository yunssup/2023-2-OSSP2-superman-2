package com.superman.backend.Controller;

import com.superman.backend.DTO.SearchConditionDTO;
import com.superman.backend.Service.SearchBestHouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/region")
public class RegionController {

    @Autowired
    SearchBestHouseService searchBestHouseService;

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
}

