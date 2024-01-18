package com.superman.backend.Service;

import com.superman.backend.DTO.UpdateSessionDataDTO;
import com.superman.backend.Repository.SessionDataRepository;
import com.superman.backend.Entity.SessionData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UpdateUserService {

    private static final Logger logger = LoggerFactory.getLogger(UpdateUserService.class);

    private final String kakaoApiUri = "https://dapi.kakao.com/v2/local/search/address.json";

    private final String kakaoLocalKey = "aafe21a8645b933d0ab0dbef62818de2";

    @Autowired
    private SessionDataRepository sessionDataRepository;

    @Transactional
    public ResponseEntity<String> updateSessionData(String sessionId, UpdateSessionDataDTO sessionData) {
        try {
            // 세션 데이터 조회
            SessionData existingData = sessionDataRepository.findById(sessionId).orElse(null);
            if (existingData != null) {
                // 좌표 얻기
                String[] coordinates = getCoordinates(sessionData.getOftenPlace());
                existingData.setOftenPlaceX(coordinates[0]);
                existingData.setOftenPlaceY(coordinates[1]);
                existingData.setOftenDong(coordinates[2]);
                // DTO를 JSON으로 변환하여 로깅
                ObjectMapper objectMapper = new ObjectMapper();
                String dtoAsJson = objectMapper.writeValueAsString(sessionData);
                logger.info("DTO를 JSON으로 변환: {}", dtoAsJson);

                // 세션 데이터 업데이트
                existingData.setHomeType(sessionData.getHomeType());
                existingData.setTransportationType(sessionData.getTransportationType());
                existingData.setOftenPlace(sessionData.getOftenPlace());
                existingData.setFuelCost(sessionData.getFuelCost());
                existingData.setInterest(sessionData.getInterest());
                sessionDataRepository.save(existingData);
            } else {
                return new ResponseEntity<>("사용자를 찾을 수 없음", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            logger.error("사용자 데이터 업데이트 중 오류 발생", e);
            throw new RuntimeException("카카오 api 연결 실패");
            //return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>("사용자 데이터가 성공적으로 업데이트되었습니다", HttpStatus.OK);
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
        JSONObject firstDocument = documents.getJSONObject(0);
        JSONObject addres = firstDocument.getJSONObject("address");

// address 객체 안에 있는 b_code 값 추출하기
        String bCode = addres.getString("b_code");
        return new String[]{x, y, bCode};
    }
}
