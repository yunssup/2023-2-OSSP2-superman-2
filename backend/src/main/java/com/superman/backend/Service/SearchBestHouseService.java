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
            // hometype이 1이면 MonthlyRentData 조회
            // MonthlyRentData에 대한 조회 로직 추가
            return monthlyRentRepository.findAll(); // 예시로 모든 MonthlyRentData 반환
        } else if (homeType == 2) {
            // hometype이 2이면 LumpSumLeaseData 조회
            // LumpSumLeaseData에 대한 조회 로직 추가
            return lumpSumLeaseRepository.findAll(); // 예시로 모든 LumpSumLeaseData 반환
        } else {
            // 다른 값이 들어올 경우 예외처리 또는 기본 동작 정의
            throw new IllegalArgumentException("Invalid homeType");
        }
    }
}
