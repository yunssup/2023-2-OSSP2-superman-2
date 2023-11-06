package com.superman.backend.DTO;

import lombok.Data;

@Data
public class SessionDataDto {
    private String sessionId;
    private boolean isSelected;
    private int mileage;
    private String frequentLocation;
}

