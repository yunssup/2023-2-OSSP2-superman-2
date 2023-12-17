package com.superman.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
public class ScheduledDataImportService {

    private final MakePastDataService makePastDataService;
    private final LastProcessedCodeService lastProcessedCodeService;

    @Autowired
    public ScheduledDataImportService(MakePastDataService makePastDataService, LastProcessedCodeService lastProcessedCodeService) {
        this.makePastDataService = makePastDataService;
        this.lastProcessedCodeService = lastProcessedCodeService;
    }

    /*@PostConstruct
    public void init() {
        importScheduledData(); // 서버 시작시 한번 실행
    }*/

    // 매일 자정에 데이터를 자동으로 가져오는 예약된 작업
    @Scheduled(cron = "0 0 0 * * ?")
    public void importScheduledData() {
        LocalDate startDate = LocalDate.of(2020, 1, 1);
        LocalDate endDate = LocalDate.of(2022, 12, 31);
        int lawdCode = lastProcessedCodeService.getLastProcessedCode(); // 시작 법정동 코드 이전 종료기록부터.(default 종로구)
        int maxRequestsPerDay = 1000, i = 1;
        if(lawdCode == 11260)
            return;
        while(i<maxRequestsPerDay) {
            while (startDate.isBefore(endDate) || startDate.isEqual(endDate)) {
                String lawdCodeStr = String.format("%05d", lawdCode); // 앞의 0을 붙여 5자리로 만듦
                String dealYmd = startDate.toString().substring(0, 7).replace("-", ""); // YYYYMM 형태로 만듦

                // 요청 보내는 로직
                // 이부분 깃 이그노어해서 만들어야함.
                makePastDataService.makePastData(lawdCodeStr, dealYmd, "f919UU4Uw9diG8k76c4TDz%2FVKtyW0xIJBr%2F6zMP3uoCyd8F%2F41Z30h%2BrvKMPFCeyzbimdCM0sgAWOqWINsa0QA%3D%3D");

                // 다음 날과 법정동 코드를 설정
                startDate = startDate.plusMonths(1); // 한달씩 증가
                i++;
            }
            startDate = LocalDate.of(2020, 1, 1);
            endDate = LocalDate.of(2022, 12, 31);
            lawdCode = getNextLawdCode(lawdCode); // 다음 법정동 코드 계산

            // 나중에 서버에 올릴 때 이거 내리기
            lastProcessedCodeService.saveLastProcessedCode(lawdCode);
        }
    }

    // 다음 법정동 코드를 계산하는 메서드
    private static final Map<Integer, String> lawdCodeToDistrictMap = new HashMap<>();

    static {
        lawdCodeToDistrictMap.put(11680, "강남구");
        lawdCodeToDistrictMap.put(11740,"강동구");
        lawdCodeToDistrictMap.put(11305, "강북구");
        lawdCodeToDistrictMap.put(11500, "강서구");
        lawdCodeToDistrictMap.put(11620, "관악구");
        lawdCodeToDistrictMap.put(11215, "광진구");
        lawdCodeToDistrictMap.put(11530, "구로구");
        lawdCodeToDistrictMap.put(11545, "금천구");
        lawdCodeToDistrictMap.put(11350, "노원구");
        lawdCodeToDistrictMap.put(11320, "도봉구");
        lawdCodeToDistrictMap.put(11230, "동대문구");
        lawdCodeToDistrictMap.put(11590, "동작구");
        lawdCodeToDistrictMap.put(11440, "마포구");
        lawdCodeToDistrictMap.put(11410, "서대문구");
        lawdCodeToDistrictMap.put(11650, "서초구");
        lawdCodeToDistrictMap.put(11200, "성동구");
        lawdCodeToDistrictMap.put(11290, "성북구");
        lawdCodeToDistrictMap.put(11710, "송파구");
        lawdCodeToDistrictMap.put(11470, "양천구");
        lawdCodeToDistrictMap.put(11560, "영등포구");
        lawdCodeToDistrictMap.put(11170, "용산구");
        lawdCodeToDistrictMap.put(11380, "은평구");
        lawdCodeToDistrictMap.put(11110, "종로구");
        lawdCodeToDistrictMap.put(11140, "중구");
        lawdCodeToDistrictMap.put(11260, "중랑구");
    }

    public static String getDistrictByCode(String code) {
        return lawdCodeToDistrictMap.get(code);
    }

    public static int getNextLawdCode(int currentLawdCode) {
        switch (currentLawdCode) {
            case 11110:
                return 11200;
            case 11200:
                return 11215;
            case 11215:
                return 11230;
            case 11230:
                return 11260;
            case 11260:
                return 11305;
            case 11305:
                return 11320;
            case 11320:
                return 11350;
            case 11350:
                return 11380;
            case 11380:
                return 11410;
            case 11410:
                return 11440;
            case 11440:
                return 11470;
            case 11470:
                return 11500;
            case 11500:
                return 11530;
            case 11530:
                return 11545;
            case 11545:
                return 11560;
            case 11560:
                return 11590;
            case 11590:
                return 11620;
            case 11620:
                return 11650;
            case 11650:
                return 11680;
            case 11680:
                return 11710;
            case 11710:
                return 11740;
            case 11740:
                return 11215; // Loop back to the beginning or handle differently
            default:
                return 0;
        }
    }
}
