package com.superman.backend.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class SearchConditionDTO {
    private int regionId;
    private int maxTravelTime;
    private String userID;
    private int condition;
    private int range;

    public SearchConditionDTO(int regionid, int range, int maxtraval, String userid, int condition) {
        this.regionId = regionid;
        this.range = range;
        this.maxTravelTime = maxtraval;
        this.userID = userid;
        this.condition = condition;
    }
}
