package com.superman.backend.DTO;

import lombok.Data;

public class ApiHouseInfoResponseDTO {

    int prc = 999999999;        // 전세 또는 월세보증금
    int rentPrc = 999999999;    // 월세
    String spc = "/";           // 면적

    int comparePrice = 999999999;

    public ApiHouseInfoResponseDTO() {
    }

    public ApiHouseInfoResponseDTO(int prc, int rentPrc, String spc) {
        this.prc = prc;
        this.rentPrc = rentPrc;
        this.spc = spc;

        // 전월세 가격 임의 비교를 위해 가공
        if (rentPrc == 0) // 월세가 0일 경우 (==전세)
        {
            comparePrice = prc;
        } else // 월세 가격이 있을 경우 (==월세)
        {
            // 보증금 + 월세*12 로 계산
            comparePrice = prc + (rentPrc * 12);
        }
    }

    public int getPrc() {
        return this.prc;
    }

    public int getRentPrc() {
        return this.rentPrc;
    }

    public String getSpc() {
        return this.spc;
    }

    public int getComparePrice() {
        return this.comparePrice;
    }

}
