package com.superman.backend.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class SearchConditionDTO {
    @JsonProperty("region")
    private int regionId;

    @JsonProperty("maxtraveltime")
    private int maxTravelTime;

    private int condition;
    private int range;
    private int homeType;

    // 생성자
    public SearchConditionDTO(int regionId, int maxTravelTime, int condition, int range, int hometype) {
        this.regionId = regionId;
        this.maxTravelTime = maxTravelTime;
        this.condition = condition;
        this.range = range;
        this.homeType = hometype;
    }
    // 기본 생성자 - 필요에 따라 추가하셔도 됩니다.
}
