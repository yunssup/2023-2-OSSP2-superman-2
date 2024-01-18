package com.superman.backend.Service;

import com.superman.backend.Entity.SessionData;
import com.superman.backend.Entity.UserHouseData;
import com.superman.backend.Repository.SessionDataRepository;
import com.superman.backend.Repository.UserHouseDataRepository;
import lombok.ToString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Optional;

@Service
public class TransportCostService {
    private static final Logger logger = LoggerFactory.getLogger(TransportCostService.class);

    // 이부분 나중에 깃 이그노어하고 재발급 받아야함.
    private final String kakaoLocalKey = "aafe21a8645b933d0ab0dbef62818de2";
    private final String na_id = "syx7ik86oo";
    private final String na_key = "p5pIO70ZPriGLyxnGkw2UpdxA60CBD9PHt5OdmeO";
    private final String kakaoApiUri = "https://dapi.kakao.com/v2/local/search/address.json";
    private final String NaverApiUri = "https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving";
    private final SessionDataRepository sessionDataRepository;
    private final UserHouseDataRepository userHouseDataRepository;
    private int TransportCost = 0; // 교통 타입에 따라 달라지는 최종 결과.

    @Autowired
    public TransportCostService(SessionDataRepository sessionDataRepository, UserHouseDataRepository userHouseDataRepository) {
        this.sessionDataRepository = sessionDataRepository;
        this.userHouseDataRepository = userHouseDataRepository;
    }

    // 네이버 api, tmap 대중교통 api
    public String getCost(String user, int HouseNum){
        String House = null;
        int transportType = 0;
        double fuleratio = 0;
        String oftenPlaceX = null;
        String oftenPlaceY = null;
        String HouseX = null;
        String HouseY = null;
        // 세션 ID를 사용하여 SessionData 엔터티 찾기
        Optional<SessionData> optionalSessionData = sessionDataRepository.findById(user);

        // Optional에서 OftenPlaceX 값을 가져오기
        if (optionalSessionData.isPresent()) {
            SessionData sessionData = optionalSessionData.get();
            oftenPlaceX = sessionData.getOftenPlaceX();
            oftenPlaceY = sessionData.getOftenPlaceY();
            transportType = sessionData.getTransportationType();
            fuleratio = sessionData.getFuelCost();
        }
        Optional<UserHouseData> optionalUserHouseData = userHouseDataRepository.findById(user);
        // House 지정 1번 2번에 따라.
        if(optionalUserHouseData.isPresent()) {
            UserHouseData userHouseData = optionalUserHouseData.get();
            if (HouseNum == 1) {
                House = userHouseData.getFirstHome();
            }
            else if(HouseNum == 2) {
                House = userHouseData.getSecondHome();
            }
        }
        // House의 x, y좌표 가져오기.
        try {
            if(House != null){
                String[] coordinates = getCoordinates(House);
                HouseX = coordinates[0];
                HouseY = coordinates[1];
            }
        }catch (Exception e){
            logger.error("카카오 api 연결 실패", e);
        }
        // start 좌표와 goal좌표
        String start = HouseX + "," + HouseY;
        String goal = oftenPlaceX + "," + oftenPlaceY;

        if(transportType != 0) {
            if (transportType == 1) {
                TransportCost = getTransportCost(HouseX, HouseY, oftenPlaceX, oftenPlaceY);
            }
            else {
                if(fuleratio == 0)
                    fuleratio = 14;
                try{
                    TransportCost = getCarCost(start, goal, fuleratio);
                }catch (Exception e){
                    logger.error("네이버 api 연결 실패" + e);
                    throw new RuntimeException("네이버 api 연결 실패");
                }
            }
        }
        if(TransportCost == 0) return "Can't resive enswer";
        else return Integer.toString(TransportCost);
    }
    // 네이버 api이용 자동차 유류비 + 톨게이트비 비용 계산
    public int getCarCost(String start, String goal, double fuelratio) throws JSONException{
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("X-NCP-APIGW-API-KEY-ID", na_id);
        httpHeaders.set("X-NCP-APIGW-API-KEY", na_key);
        HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        UriComponents uriComponents = UriComponentsBuilder
                .fromHttpUrl(NaverApiUri)
                .queryParam("start", start)
                .queryParam("goal", goal)
                .queryParam("mileage", fuelratio)
                .build();

        ResponseEntity<String> response = restTemplate.exchange(uriComponents.toString(), HttpMethod.GET, entity, String.class);

        // API Response로부터 body 뽑아내기
        String body = response.getBody();
        JSONObject json = new JSONObject(body);

        // 교통비 추출
        JSONObject route = json.getJSONObject("route");
        JSONArray traOptimalArray = route.getJSONArray("traoptimal");
        JSONObject traOptimal = traOptimalArray.getJSONObject(0);
        JSONObject summary = traOptimal.getJSONObject("summary");

        int tollFare = summary.getInt("tollFare");
        int fuelPrice = summary.getInt("fuelPrice");
        int totalCost = tollFare + fuelPrice;

        return totalCost;
    }
    // 대중교통 api 이용 대중교통비 계산.
    public int getTransportCost(String HouseX, String HouseY, String oftenPlaceX, String oftenPlaceY) {
        String url = "https://api.odsay.com/v1/api/searchPubTransPathT";

        String apiKey = "EUO/FEnTO0j22YOdjKHNQB5Qc9o5toRfkv58WS/PjgM"; // 여기에 새로운 API의 키를 넣어주세요

        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("SX", HouseX)
                .queryParam("SY", HouseY)
                .queryParam("EX", oftenPlaceX)
                .queryParam("EY", oftenPlaceY)
                .queryParam("apiKey", apiKey)
                .build();

        // Creating the HTTP Headers for the new API
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");

        // Creating the HTTP Entity for the new API
        HttpEntity<?> entity = new HttpEntity<>(headers);

        // Making the GET request to the new API
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(
                uriComponents.toUriString(),
                HttpMethod.GET,
                entity,
                String.class
        );

        // Handling the response from the new API
        int payment = 0;
        if (response.getStatusCode() == HttpStatus.OK) {
            String responseBody = response.getBody();

            try {
                JSONObject jsonResponse = new JSONObject(responseBody);
                JSONObject result = jsonResponse.getJSONObject("result");
                JSONArray path = result.getJSONArray("path");
                JSONObject firstPath = path.getJSONObject(0);
                JSONObject info = firstPath.getJSONObject("info");
                payment = info.getInt("payment");
            } catch (JSONException e) {
                e.printStackTrace();
                throw new RuntimeException("대중교통 비용 api" + e);
            }
        } else {
            throw new RuntimeException("Request to the new API failed");
        }

        return payment;
    }

    public String[] getCoordinates(String address) throws JSONException {
        RestTemplate restTemplate = new RestTemplate();

        String apiKey = "KakaoAK " + kakaoLocalKey;

        // 요청 헤더에 만들기, Authorization 헤더 설정하기
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization", apiKey);
        HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        UriComponents uriComponents = UriComponentsBuilder
                .fromHttpUrl(kakaoApiUri)
                .queryParam("query", address)
                .build();

        ResponseEntity<String> response = restTemplate.exchange(uriComponents.toString(), HttpMethod.GET, entity, String.class);

        // API Response로부터 body 뽑아내기
        String body = response.getBody();
        JSONObject json = new JSONObject(body);

        // body에서 좌표 뽑아내기
        JSONArray documents = json.getJSONArray("documents");
        String x = documents.getJSONObject(0).getString("x");
        String y = documents.getJSONObject(0).getString("y");

        return new String[]{x, y};
    }
}






































































































































































































































































































































































































