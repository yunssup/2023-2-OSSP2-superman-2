package com.superman.backend.Controller;

import com.superman.backend.DTO.SearchConditionDTO;
import com.superman.backend.Service.MonthlyRentService;
import com.superman.backend.Service.SearchBestHouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/region")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://43.202.189.160:5173",
        "http://43.202.189.160"
}, allowCredentials = "true")
public class RegionController {

    @Autowired
    SearchBestHouseService searchBestHouseService;

    @Autowired
    MonthlyRentService monthlyRentService;
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생: " + ex.getMessage());
    }
    @GetMapping()
    public ResponseEntity<?> getBestHousesByCondition(@RequestParam("userid") String userid,
                                                      @RequestParam("regionid") int regionid,
                                                      @RequestParam("condition") int condition,
                                                      @RequestParam("range") int range,
                                                      @RequestParam("maxtraval") int maxtraval) {

        SearchConditionDTO searchConditionDTO = new SearchConditionDTO(regionid, range, maxtraval, userid, condition);

        try {
            List<?> result = searchBestHouseService.getBestHousesByCondition(searchConditionDTO);

            if (result == null || result.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("조건 내 검색된 항목이 없습니다");
            } else {
                List<Map<String, Object>> formattedResult = formatResultList(result);
                return ResponseEntity.ok(formattedResult);
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    private List<Map<String, Object>> formatResultList(List<?> result) {
        List<Map<String, Object>> formattedResult = new ArrayList<>();
        for (int i = 0; i < result.size(); i++) {
            Map<String, Object> numberedMap = new LinkedHashMap<>();
            numberedMap.put(String.valueOf(i + 1), result.get(i));
            formattedResult.add(numberedMap);
        }
        return formattedResult;
    }

}

