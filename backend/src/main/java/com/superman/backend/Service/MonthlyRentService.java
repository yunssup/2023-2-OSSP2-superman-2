package com.superman.backend.Service;

import com.superman.backend.Entity.SessionData;
import com.superman.backend.Repository.MonthlyRentRepository;
import com.superman.backend.Repository.SessionDataRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;
import java.util.logging.ErrorManager;
import java.util.stream.Collectors;

@Service
public class MonthlyRentService {
    private static final Logger logger = LoggerFactory.getLogger(TransportCostService.class);

    @Autowired
    MonthlyRentRepository monthlyRentRepository;
    @Autowired
    SessionDataRepository sessionDataRepository;
    @Autowired
    TransportCostService transportCostService;
    public List<?> findMonthlyRentByCost(int region_id, int range, int maxtraval, String userid){
        int min = 0, max = 0;
        String X = null; String Y = null; String start = null; int transportType;
        switch (range) {
            case 1:
                min = 0;
                max = 20;
                break;
            case 2:
                min = 20;
                max = 40;
                break;
            case 3:
                min = 40;
                max = 60;
                break;
            case 4:
                min = 60;
                max = 80;
                break;
            case 5:
                min = 80;
                max = 100;
                break;
            case 6:
                min = 100;
                max = 20000;
                break;

        }
        List<?> data = monthlyRentRepository.getMonthlyRentDataByCost(region_id, min, max);
        SessionData existingData = sessionDataRepository.findById(userid).orElse(null);
        if (existingData != null) {
            X = existingData.getOftenPlaceX();
            Y = existingData.getOftenPlaceY();
            transportType = existingData.getTransportationType();
            start = X + "," + Y;
        }else{
            List<String> errorResult = new ArrayList<>();
            errorResult.add("유효하지 않은 사용자 아이디입니다. 올바른 사용자 아이디를 입력해주세요.");
            return errorResult;
        }
        List<?> filteredTop5 = data.stream()
                .filter(item -> {
                    String goal = null;
                    boolean flag = false;
                    // 여기에 추가적인 조건을 적용하여 조건을 통과하는지 확인
                    // 조건을 만족하는 경우 true 반환
                    // ((List<?>) item).get(0) : 첫 번째 요소
                    // ((List<?>) item).get(1) : 두 번째 요소
                    // ...
                    try {
                        String[] coordinates = transportCostService.getCoordinates("서울시" + ((List<?>) item).get(0));
                        goal = coordinates[0] + "," + coordinates[1];
                    }catch (Exception e){
                        logger.error("카카오 api 연결 실패", e);
                        throw new RuntimeException("카카오 API 연결 실패");
                    }


                    if (transportType == 1) {

                    }
                    else {

                    }

                    // 여기서 추가적인 조건을 만족하는지 확인하고 반환
                    return flag;
                })
                .limit(5) // 최대 5개까지만 추출
                .collect(Collectors.toList());

        return filteredTop5;
    }

    public List<?> findMonthlyRentByArea(int region_id, int range, int maxtraval, String userid){
        return monthlyRentRepository.getMonthlyRentDataByCost(region_id, range, maxtraval);
    }
}
