package com.superman.backend.DTO;

import lombok.Data;

@Data
public class SerchConditionDTO {
    private int RegionId;
    private int MaxTravelTime;
    private int Condition;
    private int Low;
    private int High;
}
