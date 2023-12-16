package com.superman.backend.Service;

import com.superman.backend.DTO.CompareRequestDTO;
import com.superman.backend.DTO.SessionDataDTO;
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
public class TravalTimeService {
    //이부분 깃이그노어, 재발급.
    private static final Logger logger = LoggerFactory.getLogger(TravalTimeService.class);
    private final String kakaoApiUri = "https://dapi.kakao.com/v2/local/search/address.json";
    private final String kakaoLocalKey = "aafe21a8645b933d0ab0dbef62818de2";
    private final String sktappkey = "Lhsk2CA7yM6Eo24i1CFeb9462aBHsQ5O3cgC15fq";
    private final SessionDataRepository sessionDataRepository;
    private final UserHouseDataRepository userHouseDataRepository;

    @Autowired
    public TravalTimeService(SessionDataRepository sessionDataRepository, UserHouseDataRepository userHouseDataRepository) {
        this.sessionDataRepository = sessionDataRepository;
        this.userHouseDataRepository = userHouseDataRepository;
    }
    public String getTravalTime(String user, int HouseNum){
        String House = null;
        int transportType = 0;
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
            logger.error("사용자 데이터 업데이트 중 오류 발생", e);
        }
        // oftenplace와 house 이동 시간 tmap api 이용.
        if(transportType != 0){
            if(transportType == 1)
            {
                String time = sendTransportTimeRequest(HouseX, HouseY, oftenPlaceX, oftenPlaceY);
                if(time != null) {
                    int totaltime = Integer.parseInt(time);
                    int hours = totaltime / 60;
                    int minutes = totaltime % 60;
                    return String.format("%d시간 %d분", hours, minutes);
                }else{
                    return "대중교통 서버 응답 실패";
                }
            }
            if(transportType == 2) {
                String time = sendCarTimeRequest(HouseX, HouseY, oftenPlaceX, oftenPlaceY);
                int seconds = Integer.parseInt(time);
                int hours = seconds / 3600;
                int minutes = (seconds % 3600) / 60;
                return String.format("%d시간 %d분", hours, minutes);
            }
        }
        return "gg";
    }
    public String sendTransportTimeRequest(String HouseX, String HouseY, String oftenPlaceX, String oftenPlaceY) {
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
        String totalTime = "";
        if (response.getStatusCode() == HttpStatus.OK) {
            String responseBody = response.getBody();

            try {
                JSONObject jsonResponse = new JSONObject(responseBody);
                JSONObject result = jsonResponse.getJSONObject("result");
                JSONArray path = result.getJSONArray("path");
                JSONObject firstPath = path.getJSONObject(0);
                JSONObject info = firstPath.getJSONObject("info");
                totalTime = info.getString("totalTime");
            } catch (JSONException e) {
                e.printStackTrace();
                throw new RuntimeException("Failed to parse the response from the new API");
            }
        } else {
            throw new RuntimeException("Request to the new API failed");
        }

        return totalTime;
    }

    public String sendCarTimeRequest(String HouseX, String HouseY, String oftenPlaceX, String oftenPlaceY) {
        String url = "https://apis.openapi.sk.com/tmap/routes/prediction?totalValue=2";
        String reqCoordType = "WGS84GEO";
        String resCoordType = "WGS84GEO";
        String sort = "index";

        String requestBody = "{\n" +
                "    \"routesInfo\" : {\n" +
                "        \"departure\" : {\n" +
                "            \"name\" : \"test1\",\n" +
                "            \"lon\" : \"" + HouseX + "\",\n" +
                "            \"lat\" : \"" + HouseY + "\"\n" +
                "        },\n" +
                "        \"destination\" : {\n" +
                "            \"name\" : \"test2\",\n" +
                "            \"lon\" : \"" + oftenPlaceX + "\",\n" +
                "            \"lat\" : \"" + oftenPlaceY + "\"\n" +
                "        },\n" +
                "        \"predictionType\" : \"arrival\",\n" +
                "        \"predictionTime\" : \"2022-09-10T08:00:22+0900\"\n" +
                "    },\n" +
                "    \"reqCoordType\": \"" + reqCoordType + "\",\n" +
                "    \"resCoordType\": \"" + resCoordType + "\",\n" +
                "    \"sort\": \"" + sort + "\",\n" +
                "}";

        // Creating the HTTP Headers for Tmap API
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("appKey", sktappkey);
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);

        // Creating the HTTP Entity for Tmap API
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        // Making the POST request to Tmap API
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        // Handling the response from Tmap API
        String totalTime = "";
        if (response.getStatusCode() == HttpStatus.OK) {
            String responseBody = response.getBody();
            // Extract totalTime from Tmap API response
            totalTime = extractTotalTimeFromResponse(responseBody);
            logger.info("Car total travel time: " + totalTime);
        } else {
            logger.error("Request to Tmap API failed");
            throw new RuntimeException("Tmap Api 연결 실패");
        }

        return totalTime;
    }
    public String extractTotalTimeFromResponse(String responseBody) {
        String totalTime = "";

        try {
            // 응답 메시지를 JSONObject로 변환
            JSONObject jsonResponse = new JSONObject(responseBody);

            // features 배열 추출
            JSONArray features = jsonResponse.getJSONArray("features");

            // 첫 번째 feature 선택
            JSONObject firstFeature = features.getJSONObject(0);

            // properties 객체 추출
            JSONObject properties = firstFeature.getJSONObject("properties");

            // properties에서 totalTime 추출
            totalTime = properties.getString("totalTime");
        } catch (Exception e) {
            e.printStackTrace();

        }

        return totalTime;
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

