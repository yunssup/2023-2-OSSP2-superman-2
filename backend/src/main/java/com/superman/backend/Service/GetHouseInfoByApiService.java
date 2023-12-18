package com.superman.backend.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.superman.backend.DTO.ApiHouseInfoResponseDTO;
import com.superman.backend.Entity.SessionData;
import com.superman.backend.Repository.SessionDataRepository;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class GetHouseInfoByApiService {

    @Value("8a05fe527e9190e5d824d5593ecab17f")//${kakao.local.key}
    private String kakaoLocalKey = "8a05fe527e9190e5d824d5593ecab17f";

    @Autowired
    SessionDataRepository sessionDataRepository;
    // 네이버 부동산 api를 통한 최종 집 정보 (전월세 가격 / 보증금 / 면적)
    public ApiHouseInfoResponseDTO getHouseInfo(String address, String user) throws JSONException {

        SessionData existingData = sessionDataRepository.findById(user).orElse(null);
        // 홈타입 기본값 1
        int homeType = 1;

        homeType = existingData.getHomeType();


        ApiHouseInfoResponseDTO apiHouseInfo = new ApiHouseInfoResponseDTO();

        // 카카오 api 호출
        String[] xy = getCoordinates(address);

        // 경위도
        String lat = xy[1]; // "37.6571937";
        String lon = xy[0]; // "127.0754352";

        // 지도 줌 고정
        String z = "19";

        // 전월세 둘 다 검색하도록
        String tradTpCd = "B1:B3"; // B1 전세 B3 월세

        // 동네 고유번호
        String cortarNo = "";
        cortarNo = getCortarNo(lat, lon, z);

        // 동네 노드 리스트
        Map<String, String> nodeListMap = getNodeListMap(lat, lon, z, cortarNo, tradTpCd);

        // 노드 리스트에 포함되는 모든 건물 리스트 반환
        ArrayList<ApiHouseInfoResponseDTO> hInfoArr = getApiHouseInfoList(nodeListMap);

        // 전월세 가장 싼 건물의 전월세가격/면적 가공
        apiHouseInfo = compareApiHouseInfo(hInfoArr, homeType);
        // System.out.println(apiHouseInfo.getPrc() + " ||| " + apiHouseInfo.getSpc());

        System.out.println("apiHouseInfo" + apiHouseInfo);
        return apiHouseInfo;
    }

    // 네이버 부동산 api 에서 노드 리스트에 해당하는 건물 매물 리스트 모두 조회 및 한 리스트에 저장하여 반환
    private ArrayList<ApiHouseInfoResponseDTO> getApiHouseInfoList(Map<String, String> nodeListMap) {
        BufferedReader bf;
        String result = "";
        ArrayList<ApiHouseInfoResponseDTO> hInfoArr = new ArrayList<>();

        // 건물 리스트 json arr map
        Map<String, JSONObject> allBuildJsonMap = new HashMap<String, JSONObject>();
        // 모든 노드 순회
        for (String key : nodeListMap.keySet()) {
            String houseUrlStr = nodeListMap.get(key);

            // 노드별 건물매물 목록 api 호출
            try {
                URL houseApiUrl = new URL(houseUrlStr);
                bf = new BufferedReader(new InputStreamReader(houseApiUrl.openStream(), "UTF-8"));
                result = bf.readLine();
                System.out.println("result" + result);

                JSONObject buildJsonObj = new JSONObject(result);

                // 노드 내 건축물 있을 경우 순회
                if ("success".equals(buildJsonObj.getString("code")) && buildJsonObj.get("body") != null) {
                    JSONArray houseArr = buildJsonObj.getJSONArray("body");

                    // 건축물 array 순회하여 obj 저장해서 빼냄냄
                    for (Object bo : houseArr) {
                        JSONObject bjo = (JSONObject) bo;
                        allBuildJsonMap.put(bjo.getString("atclNo"), bjo);
                    }
                }
                // 조회 안 될 경우 별다른 조치 없이 추가하지 않고 다음 진행
            } catch (Exception e) {
            }
        }
        // 모든 노드 순회하여 건물 리스트의 모든 jsonObject 를 맵에 추가했으면
        // 모든 건물 정보에 대해서 가공
        for (String key : allBuildJsonMap.keySet()) {
            JSONObject buildJsonObj = allBuildJsonMap.get(key);
            ApiHouseInfoResponseDTO bInfo = new ApiHouseInfoResponseDTO();

            // 전세 또는 보증금
            int prc = 0;

            // 월세
            int rentPrc = 0;

            // 면적
            String spc1 = "", spc2 = "";
            String spc = "";


            try {
                // 전세 / 보증금,월세
                prc = (Integer) buildJsonObj.get("prc");
                rentPrc = (Integer) buildJsonObj.get("rentPrc");
            } catch (Exception e) {
                rentPrc = 0; // 전세의 경우 rentPrc 항목 없으므로
            }

            // 면적
            spc1 = (String) buildJsonObj.get("spc1");
            spc2 = (String) buildJsonObj.get("spc2");
            spc = spc1 + "/" + spc2;

            // 집 정보 가공
            bInfo = new ApiHouseInfoResponseDTO(prc, rentPrc, spc);
            hInfoArr.add(bInfo);
        }

        return hInfoArr;
    }

    // 네이버 부동산 api 에서 경위도/동네고유번호로 해당 동네 매물 노드 리스트 조회
    private Map<String, String> getNodeListMap(String lat, String lon, String z, String cortarNo, String tradTpCd) {
        Map<String, String> nodeListMap = new HashMap<>();

        // 건물 노드 리스트 api url 생성
        String nodeListUrl = "https://m.land.naver.com/cluster/clusterList?"
                + "view=atcl&rletTpCd=OR&"
                + "tradTpCd=" + tradTpCd
                + "&z=" + z
                + "&lat=" + lat
                + "&lon=" + lon
                + "&cortarNo=" + cortarNo;

        // 건물 리스트 url접두 선 생성
        String houseDefaultUrl = "https://m.land.naver.com/cluster/ajax/articleList?&rletTpCd=OR";

        // api 결과 저장
        String result = "";

        // 노드 리스트 호출 실패시 빈 리스트 반환
        try {
            URL url = new URL(nodeListUrl);
            BufferedReader bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
            result = bf.readLine();
            System.out.println("result" + result);
        } catch (Exception e) {
            return nodeListMap;
        }

        JSONObject jsonObj = new JSONObject(result);

        // 노드 리스트 비어있지 않으면 정상 진행
        if ("success".equals(jsonObj.getString("code")) && jsonObj.get("data") != null) {
            JSONArray nodeArr = jsonObj.getJSONObject("data").getJSONArray("ARTICLE");

            // 각 노드 리스트 id map 에 중복 없도록 가져옴
            for (Object nodeObj : nodeArr) {
                JSONObject nodeJsonObj = (JSONObject) nodeObj;
                String lgeoId = nodeJsonObj.getString("lgeo");

                String houseApiUrl = houseDefaultUrl
                        + "&lgeo=" + lgeoId
                        + "&tradTpCd=" + tradTpCd
                        + "&z=" + z;

                // 노드 중복 없이 모든 노드 키, 호출 url 생성해서 저장
                nodeListMap.put(lgeoId, houseApiUrl);
            }
        } else {
            System.out.println("검색 결과가 없습니다.");
        }

        return nodeListMap;
    }

    // 네이버 부동산 api에서 경위도로 동네 고유번호 호출
    private String getCortarNo(String lat, String lon, String z) {
        BufferedReader bf;
        String cortarNo = "";

        // -------------------------------------------
        // 네이버 부동산 기준 동네 코드 get 을 위한 check url
        String checkUrl = "https://m.land.naver.com/cluster/clusterList?view=atcl"
                + "&z=" + z
                + "&lat=" + lat
                + "&lon=" + lon;

        try {
            URL ckUrl = new URL(checkUrl);
            bf = new BufferedReader(new InputStreamReader(ckUrl.openStream(), "UTF-8"));

            String ckRes = bf.readLine();
            JSONObject ckObj = new JSONObject(ckRes).getJSONObject("cortar").getJSONObject("detail");
            cortarNo = ckObj.getString("cortarNo");

            Thread.sleep(3000);
        } catch (Exception e) {
        }

        return cortarNo;
    }

    // 카카오 api 를 통한 경도 위도 반환
    private String[] getCoordinates(String address) throws JSONException {
        String kakaoApiUrl = "https://dapi.kakao.com/v2/local/search/address.json";

        RestTemplate restTemplate = new RestTemplate();

        String apiKey = "KakaoAK " + kakaoLocalKey;

        // 요청 헤더에 만들기, Authorization 헤더 설정하기
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization", apiKey);
        HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        UriComponents uriComponents = UriComponentsBuilder
                .fromHttpUrl(kakaoApiUrl)
                .queryParam("query", address)
                .build();

        ResponseEntity<String> response = restTemplate.exchange(uriComponents.toString(), HttpMethod.GET, entity,
                String.class);

        // API Response로부터 body 뽑아내기
        String body = response.getBody();
        JSONObject json = new JSONObject(body);

        // body에서 좌표 뽑아내기
        JSONArray documents = json.getJSONArray("documents");
        String x = documents.getJSONObject(0).getString("x");
        String y = documents.getJSONObject(0).getString("y");

        return new String[]{x, y};
    }

    // 전월세 통합해서 비교한 다음 가장 싼 매물 반환
    private ApiHouseInfoResponseDTO compareApiHouseInfo(ArrayList<ApiHouseInfoResponseDTO> infoArr, int homeType) {
        ApiHouseInfoResponseDTO min = new ApiHouseInfoResponseDTO();

        if (homeType == 1) {
            for (ApiHouseInfoResponseDTO info : infoArr) {
                if (min.getPrc() == 0 && min.getRentPrc() == 0) {
                    min = info;
                } else if (info.getRentPrc() == 0 && info.getPrc() < min.getPrc()) min = info;
                // 전세일 때는 prc값(전세)만 반환
            }
        } else {
            for (ApiHouseInfoResponseDTO info : infoArr) {
                if (min.getPrc() == 0 && min.getRentPrc() == 0) {
                    min = info;
                } else if (info.getRentPrc() != 0 && info.getComparePrc() < min.getComparePrc()) min = info;
                // 월세일 때는 rentprc와 prc 합산으로 비교하여 반환
            }
        }

        return min;
    }
}
