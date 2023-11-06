package com.superman.backend.Entity;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class SessionData {
    @Id
    private String sessionId;
    private int isSelected;
    private int mileage;
    private String frequentLocation;
}