package com.superman.backend.Service;

import com.superman.backend.DTO.DongDataDTO;
import com.superman.backend.DTO.PastHouseDTO;
import com.superman.backend.Entity.DongData;
import com.superman.backend.Entity.LumpSumLeaseData;
import com.superman.backend.Entity.MonthlyRentData;
import com.superman.backend.Entity.PastHouseData;
import com.superman.backend.Repository.DongDataRepository;
import com.superman.backend.Repository.LumpSumLeaseRepository;
import com.superman.backend.Repository.MonthlyRentRepository;
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
    private LumpSumLeaseRepository lumpSumLeaseRepository;
    @Autowired
    private MonthlyRentRepository monthlyRentRepository;

    @Transactional
    public void makePastData(String lawdCode, String dealYmd, String serviceKey) {
        try {
            String apiUrl = "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcRHRent?LAWD_CD="
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

                    String deposit = getNodeValue("보증금액", item);
                    String monthly = getNodeValue("월세금액", item);

                    double depositValue = Double.parseDouble(deposit.replace(",", ""));
                    double monthlyValue = Double.parseDouble(monthly.replace(",", ""));

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
                    // 엔티티 저장
                    pastHouseDataRepository.save(pastHouseData);
                    if (monthlyOrLumpSumLease(depositValue, monthlyValue)) {
                        LumpSumLeaseData lumpSumLeaseData = convertToLumpSumLeaseData(dongDataDTO);
                        lumpSumLeaseRepository.save(lumpSumLeaseData);
                        lumpSumLeaseData.setPastHouseData(pastHouseData);
                    } else {
                        MonthlyRentData monthlyRentData = convertToMonthlyRentData(dongDataDTO);
                        monthlyRentRepository.save(monthlyRentData);
                        monthlyRentData.setPastHouseData(pastHouseData);
                    }
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
            if (node.getNodeType() == Node.ELEMENT_NODE && node.getNodeName().equals(tagName)) {
                String content = node.getTextContent().trim();
                return content.isEmpty() ? "0" : content; // 빈 문자열일 경우 "0" 반환하도록 수정
            }
        }
        return "0"; // 태그를 찾지 못할 경우 기본값 "0" 반환
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
    // Node에서 LumpSumLeaseData 엔터티로 변환하는 메서드
    private LumpSumLeaseData convertToLumpSumLeaseData(DongDataDTO dto) {
        LumpSumLeaseData lumpSumLeaseData = new LumpSumLeaseData();
        lumpSumLeaseData.setDongName(dto.getDongName());

        // 문자열 값을 숫자로 변환하여 Area 필드에 설정
        double areaValue = Double.parseDouble(dto.getArea());
        lumpSumLeaseData.setArea(areaValue);

        // 문자열을 숫자로 변환하여 설정
        int depositValue = Integer.parseInt(dto.getDeposit().replace(",", ""));
        int monthlyValue = Integer.parseInt(dto.getMonthly().replace(",", ""));

        // 숫자값을 필드에 설정
        lumpSumLeaseData.setDeposit(depositValue);
        lumpSumLeaseData.setMonthly(monthlyValue);

        return lumpSumLeaseData;
    }

    // Node에서 MonthlyRentData 엔터티로 변환하는 메서드
    private MonthlyRentData convertToMonthlyRentData(DongDataDTO dto) {
        MonthlyRentData entity = new MonthlyRentData();
        entity.setDongName(dto.getDongName());
        int depositValue = Integer.parseInt(dto.getDeposit().replace(",", ""));
        int monthlyValue = Integer.parseInt(dto.getMonthly().replace(",", ""));
        entity.setDeposit(depositValue);
        entity.setMonthly(monthlyValue);
        double areaValue = Double.parseDouble(dto.getArea());
        entity.setArea(areaValue);
        return entity;
    }
    private boolean monthlyOrLumpSumLease(double deposit, double monthly) {
        return monthly < (deposit * 0.02);
    }
}
