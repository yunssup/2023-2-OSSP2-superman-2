package com.superman.backend.Service;

import com.superman.backend.DTO.DongDataDTO;
import com.superman.backend.DTO.PastHouseDTO;
import com.superman.backend.Entity.DongData;
import com.superman.backend.Entity.PastHouseData;
import com.superman.backend.Repository.DongDataRepository;
import com.superman.backend.Repository.PastHouseDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.transaction.Transactional;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class MakePastDataService {

    @Autowired
    private PastHouseDataRepository pastHouseDataRepository;

    @Autowired
    private DongDataRepository dongDataRepository;

    @Transactional
    public void makePastData(String lawdCode, String dealYmd, String serviceKey) {
        try {
            String apiUrl = "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcOffiRent?LAWD_CD="
                    + lawdCode + "&DEAL_YMD=" + dealYmd + "&serviceKey=" + serviceKey;

            URL url = new URL(apiUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();

            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(url.openStream());

            NodeList itemList = doc.getElementsByTagName("item");
            for (int i = 0; i < itemList.getLength(); i++) {
                Node item = itemList.item(i);
                if (item.getNodeType() == Node.ELEMENT_NODE) {
                    String logicalCode = getNodeValue("지역코드", item);
                    String dongName = getNodeValue("법정동", item);
                    String deposit = getNodeValue("보증금", item);
                    String monthly = getNodeValue("월세", item);
                    String area = getNodeValue("전용면적", item);

                    PastHouseDTO pastHouseDTO = new PastHouseDTO();
                    pastHouseDTO.setLogicalCode(logicalCode);
                    pastHouseDTO.setCityName(dongName);

                    DongDataDTO dongDataDTO = new DongDataDTO();
                    dongDataDTO.setDongName(dongName);
                    dongDataDTO.setDeposit(deposit);
                    dongDataDTO.setMonthly(monthly);
                    dongDataDTO.setArea(area);


                    // DTO to Entity 변환
                    PastHouseData pastHouseData = convertToPastHouseData(pastHouseDTO);
                    DongData dongData = convertToDongData(dongDataDTO);

                    dongData.setPastHouseData(pastHouseData);

                    // 엔티티 저장
                    pastHouseDataRepository.save(pastHouseData);
                    dongDataRepository.save(dongData);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String getNodeValue(String tagName, Node item) {
        NodeList nodeList = item.getChildNodes();
        for (int i = 0; i < nodeList.getLength(); i++) {
            Node node = nodeList.item(i);
            if (node.getNodeName().equals(tagName)) {
                return node.getTextContent();
            }
        }
        return "";
    }

    // DTO to Entity 변환 메서드
    private PastHouseData convertToPastHouseData(PastHouseDTO dto) {
        PastHouseData entity = new PastHouseData();
        entity.setLogicalCode(dto.getLogicalCode());
        entity.setCityName(dto.getCityName());
        // 추가 필드 설정

        return entity;
    }

    private DongData convertToDongData(DongDataDTO dto) {
        DongData entity = new DongData();
        entity.setDongName(dto.getDongName());
        entity.setDeposit(dto.getDeposit());
        entity.setMonthly(dto.getMonthly());
        entity.setArea(dto.getArea());
        // 추가 필드 설정

        return entity;
    }
}
