package com.superman.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.LocalDate;

@Service
public class ScheduledDataImportService {

    private final MakePastDataService makePastDataService;
    private final LastProcessedCodeService lastProcessedCodeService;

    @Autowired
    public ScheduledDataImportService(MakePastDataService makePastDataService, LastProcessedCodeService lastProcessedCodeService) {
        this.makePastDataService = makePastDataService;
        this.lastProcessedCodeService = lastProcessedCodeService;
    }
    @PostConstruct
    public void init() {
        importScheduledData(); // 서버 시작시 한번 실행
    }

    // 매일 자정에 데이터를 자동으로 가져오는 예약된 작업
    @Scheduled(cron = "0 0 0 * * ?")
    public void importScheduledData() {
        LocalDate startDate = LocalDate.of(2020, 1, 1);
        LocalDate endDate = LocalDate.of(2022, 12, 31);
        int lawdCode = lastProcessedCodeService.getLastProcessedCode(); // 시작 법정동 코드 이전 종료기록부터.(default 종로구)
        int maxRequestsPerDay = 1000, i = 1;
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
            System.out.println(i);
            // 나중에 서버에 올릴 때 이거 내리기
            lastProcessedCodeService.saveLastProcessedCode(lawdCode);
        }
    }

    // 다음 법정동 코드를 계산하는 메서드
    private int getNextLawdCode(int currentLawdCode) {
        if(currentLawdCode == 11110)
            return 11200;
        return currentLawdCode + 100;
    }
}
