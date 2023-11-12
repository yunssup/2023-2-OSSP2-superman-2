package com.superman.backend.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CompareRequestDTO {
    @JsonProperty("User")
    private String User;
    @JsonProperty("HouseNum")
    private int HouseNum;
    @JsonProperty("HouseAddress")
    private String HouseAddress;
}
