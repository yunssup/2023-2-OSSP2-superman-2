package com.superman.backend.Service;

import com.superman.backend.DTO.SearchConditionDTO;
import com.superman.backend.Entity.SessionData;
import com.superman.backend.Repository.SessionDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchBestHouseService {

   @Autowired
   MonthlyRentService monthlyRentService;
   @Autowired
   LumpSumLeaseRentService lumpSumLeaseRentService;
   @Autowired
   SessionDataRepository sessionDataRepository;

    public List<?> getBestHousesByCondition(SearchConditionDTO searchConditionDTO) {
        SessionData existingData = sessionDataRepository.findById(searchConditionDTO.getUserID()).orElse(null);
        int homeType = 0;
        if (existingData != null) {
            homeType = existingData.getHomeType();
        }else{
            List<String> errorResult = new ArrayList<>();
            errorResult.add("유효하지 않은 사용자 아이디입니다. 올바른 사용자 아이디를 입력해주세요.");
            return errorResult;
        }
        int condition = searchConditionDTO.getCondition();

        if (homeType == 2) {
            if (condition == 1) {
                return monthlyRentService.findMonthlyRentByCost(
                        searchConditionDTO.getRegionId(),
                        searchConditionDTO.getRange(),
                        searchConditionDTO.getMaxTravelTime(),
                        searchConditionDTO.getUserID()
                );
            } else if (condition == 2) {
                // Area에 따른 월세 데이터 조회 로직 추가
                return monthlyRentService.findMonthlyRentByArea(
                        searchConditionDTO.getRegionId(),
                        searchConditionDTO.getRange(),
                        searchConditionDTO.getMaxTravelTime(),
                        searchConditionDTO.getUserID()); // 필요한 파라미터 전달
            } else {
                throw new IllegalArgumentException("Invalid condition for monthly rent");
            }
        } else if (homeType == 1) {
            if (condition == 1) {
                return lumpSumLeaseRentService.findLumpSumLeaseRentByCost(
                        searchConditionDTO.getRegionId(),
                        searchConditionDTO.getRange(),
                        searchConditionDTO.getMaxTravelTime(),
                        searchConditionDTO.getUserID()
                );
            } else if (condition == 2) {
                // Area에 따른 전세 데이터 조회 로직 추가
                return lumpSumLeaseRentService.findLumpSumLeaseRentByArea(
                        searchConditionDTO.getRegionId(),
                        searchConditionDTO.getRange(),
                        searchConditionDTO.getMaxTravelTime(),
                        searchConditionDTO.getUserID()
                ); // 필요한 파라미터 전달
            } else {
                throw new IllegalArgumentException("Invalid condition for lump sum lease");
            }
        } else {
            throw new IllegalArgumentException("Invalid homeType");
        }
    }

}

