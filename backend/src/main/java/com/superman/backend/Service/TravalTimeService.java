package com.superman.backend.Service;

import com.superman.backend.DTO.CompareRequestDTO;
import com.superman.backend.DTO.SessionDataDTO;
import com.superman.backend.Entity.SessionData;
import com.superman.backend.Entity.UserHouseData;
import com.superman.backend.Repository.SessionDataRepository;
import com.superman.backend.Repository.UserHouseDataRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Optional;

@Service
public class TravalTimeService {
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
    public void getTravalTime(CompareRequestDTO requestDTO){
        String sessionId = requestDTO.getUser();
        String House = null;
        int transportType = 0;
        String oftenPlaceX;
        String oftenPlaceY;
        String HouseX;
        String HouseY;
        // 세션 ID를 사용하여 SessionData 엔터티 찾기
        Optional<SessionData> optionalSessionData = sessionDataRepository.findById(sessionId);

        // Optional에서 OftenPlaceX 값을 가져오기
        if (optionalSessionData.isPresent()) {
            SessionData sessionData = optionalSessionData.get();
            oftenPlaceX = sessionData.getOftenPlaceX();
            oftenPlaceY = sessionData.getOftenPlaceY();
            transportType = sessionData.getTransportationType();
        }
        Optional<UserHouseData> optionalUserHouseData = userHouseDataRepository.findById(sessionId);
        // House 지정 1번 2번에 따라.
        if(optionalUserHouseData.isPresent()) {
            UserHouseData userHouseData = optionalUserHouseData.get();
            if (requestDTO.getHouseNum() == 1) {
                House = userHouseData.getFirstHome();
            }
            else if(requestDTO.getHouseNum() == 2) {
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

            }
            if(transportType == 2)
            {

            }
        }
    }
    private String[] getCoordinates(String address) throws JSONException {
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
    private String[] countTravalTime(String address) throws JSONException {
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

