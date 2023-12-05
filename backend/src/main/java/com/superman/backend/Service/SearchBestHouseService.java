package com.superman.backend.Service;

import com.superman.backend.DTO.SearchConditionDTO;
import com.superman.backend.Entity.LumpSumLeaseData;
import com.superman.backend.Entity.MonthlyRentData;
import com.superman.backend.Repository.LumpSumLeaseRepository;
import com.superman.backend.Repository.MonthlyRentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchBestHouseService {

    private final MonthlyRentRepository monthlyRentRepository;
    private final LumpSumLeaseRepository lumpSumLeaseRepository;

    @Autowired
    public SearchBestHouseService(MonthlyRentRepository monthlyRentRepository, LumpSumLeaseRepository lumpSumLeaseRepository) {
        this.monthlyRentRepository = monthlyRentRepository;
        this.lumpSumLeaseRepository = lumpSumLeaseRepository;
    }

    public List<?> getBestHousesByCondition(SearchConditionDTO searchConditionDTO) {
        int homeType = searchConditionDTO.getHomeType();

        if (homeType == 1) {
            return getAllMonthlyRentData(searchConditionDTO);
        } else if (homeType == 2) {
            return getAllLumpSumLeaseData(searchConditionDTO);
        } else {
            throw new IllegalArgumentException("Invalid homeType");
        }
    }

    private List<MonthlyRentData> getAllMonthlyRentData(SearchConditionDTO searchConditionDTO) {
        // MonthlyRentData에 대한 조회 로직 추가
        // DTO를 사용하여 원하는 기준으로 MonthlyRentData를 조회하는 코드 작성
        // 예시로 모든 MonthlyRentData 반환
        return monthlyRentRepository.findAll();
    }

    private List<LumpSumLeaseData> getAllLumpSumLeaseData(SearchConditionDTO searchConditionDTO) {
        // LumpSumLeaseData에 대한 조회 로직 추가
        // DTO를 사용하여 원하는 기준으로 LumpSumLeaseData를 조회하는 코드 작성
        // 예시로 모든 LumpSumLeaseData 반환
        return lumpSumLeaseRepository.findAll();
    }
}

