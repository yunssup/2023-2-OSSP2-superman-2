package com.superman.backend.Service;

import com.superman.backend.Entity.SessionData;
import com.superman.backend.Repository.MonthlyRentRepository;
import com.superman.backend.Repository.SessionDataRepository;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    TravalTimeService travalTimeService;
    public List<?> findMonthlyRentByCost(int region_id, int range, int maxtraval, String userid){
        int min = 0, max = 0;
        String X; String Y;  int transportType;
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

        SessionData existingData = sessionDataRepository.findById(userid).orElse(null);
        if (existingData != null) {
            X = existingData.getOftenPlaceX();
            Y = existingData.getOftenPlaceY();
            transportType = existingData.getTransportationType();
        }else{
            List<String> errorResult = new ArrayList<>();
            errorResult.add("유효하지 않은 사용자 아이디입니다. 올바른 사용자 아이디를 입력해주세요.");
            return errorResult;
        }
        List<Object[]> data = (List<Object[]>) monthlyRentRepository.getMonthlyRentDataByCost(region_id, min, max);
        List<RentDetails> filteredTop5 = new ArrayList<>();

        for (Object[] item : data) {
            try {
                String place = (String) item[0]; // 동 이름 (예를 들어, 동 이름이 첫 번째 열이라 가정)
                double area = (double) item[1];
                String[] coordinates = travalTimeService.getCoordinates("서울시 " + place);
                logger.error("위치:"+place+coordinates[0]+" 2" + coordinates[1] + " x" + X);
                int time;
                try {
                if (transportType == 2) {
                    time = Integer.parseInt(travalTimeService.sendCarTimeRequest(coordinates[0], coordinates[1], X, Y));
                } else if (transportType == 1) {
                    time = Integer.parseInt(travalTimeService.sendTransportTimeRequest(coordinates[0], coordinates[1], X, Y));
                } else {
                    throw new RuntimeException("유저 교통 정보 없음.");
                }
                }
                catch (Exception e) {
                        logger.error("교통 실패", e);
                        throw new RuntimeException("교통 실패: " + e.getMessage());
                }
                int hours = time / 3600;
                int minutes = (time % 3600) / 60;
                RentDetails rentDetails = new RentDetails();
                rentDetails.setPlace(place);
                rentDetails.setArea(String.valueOf(area));
                rentDetails.setTime(hours + "시간 " + minutes + "분");

                filteredTop5.add(rentDetails);

                if (filteredTop5.size() >= 5) {
                    break; // 상위 5개만 필터링하므로 5개 이상이면 종료
                }
            } catch (Exception e) {
                logger.error("카카오 API 연결 실패", e);
                throw new RuntimeException("카카오 API 연결 실패: " + e.getMessage());
            }
        }

        return filteredTop5;
    }

    public List<?> findMonthlyRentByArea(int region_id, int range, int maxtraval, String userid){
        double min = 0, max = 0;
        String X; String Y;  int transportType;
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

        SessionData existingData = sessionDataRepository.findById(userid).orElse(null);
        if (existingData != null) {
            X = existingData.getOftenPlaceX();
            Y = existingData.getOftenPlaceY();
            transportType = existingData.getTransportationType();
        }else{
            List<String> errorResult = new ArrayList<>();
            errorResult.add("유효하지 않은 사용자 아이디입니다. 올바른 사용자 아이디를 입력해주세요.");
            return errorResult;
        }
        List<Object[]> data = (List<Object[]>) monthlyRentRepository.getMonthlyRentDataByArea(region_id, min, max);
        List<RentDetails> filteredTop5 = new ArrayList<>();

        for (Object[] item : data) {
            try {
                String place = (String) item[0];
                int cost = (int) item[1];
                String[] coordinates = travalTimeService.getCoordinates("서울시 " + place);
                logger.error("위치:"+place+coordinates[0]+" 2" + coordinates[1] + " x" + X);
                int time;
                try {
                    if (transportType == 2) {
                        time = Integer.parseInt(travalTimeService.sendCarTimeRequest(coordinates[0], coordinates[1], X, Y));
                    } else if (transportType == 1) {
                        time = Integer.parseInt(travalTimeService.sendTransportTimeRequest(coordinates[0], coordinates[1], X, Y));
                    } else {
                        throw new RuntimeException("유저 교통 정보 없음.");
                    }
                }
                catch (Exception e) {
                    logger.error("교통 실패", e);
                    throw new RuntimeException("교통 실패: " + e.getMessage());
                }
                int hours = time / 3600;
                int minutes = (time % 3600) / 60;
                RentDetails rentDetails = new RentDetails();
                rentDetails.setPlace(place);
                rentDetails.setCost(String.valueOf(cost));
                rentDetails.setTime(hours + "시간 " + minutes + "분");

                filteredTop5.add(rentDetails);

                if (filteredTop5.size() >= 5) {
                    break; // 상위 5개만 필터링하므로 5개 이상이면 종료
                }
            } catch (Exception e) {
                logger.error("카카오 API 연결 실패", e);
                throw new RuntimeException("카카오 API 연결 실패: " + e.getMessage());
            }
        }

        return filteredTop5;
    }
    @Getter
    @Setter
    class RentDetails {
        private String place;
        private String area;
        private String cost;
        private String time;

    }
}
