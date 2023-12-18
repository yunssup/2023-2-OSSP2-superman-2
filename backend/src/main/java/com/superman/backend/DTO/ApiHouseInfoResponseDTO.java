package com.superman.backend.DTO;

import lombok.Data;

public class ApiHouseInfoResponseDTO {

    int prc = 0;        // 전세 또는 월세보증금
    int rentPrc = 0;    // 월세

    int comparePrc = 0; //월세일 때 1년치 월세 + 보증금

    String spc = "/";           // 면적

    //int comparePrice = 999999999;

    public ApiHouseInfoResponseDTO() {
    }

    public ApiHouseInfoResponseDTO(int prc, int rentPrc, String spc) {
        this.prc = prc;
        this.rentPrc = rentPrc;
        this.spc = spc;

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


    public int getComparePrc(){
        return this.comparePrc;
    }
// 전월세 가격 임의 비교를 위해 가공
}
