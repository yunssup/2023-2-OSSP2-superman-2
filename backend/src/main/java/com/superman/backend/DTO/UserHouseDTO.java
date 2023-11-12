package com.superman.backend.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UserHouseDTO {

    private String sessionId;
    private String firstHome;
    private String secondHome;
}
