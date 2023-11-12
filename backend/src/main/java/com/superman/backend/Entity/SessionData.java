package com.superman.backend.Entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class SessionData {
    @Id
    private String sessionId;
    @Column(columnDefinition = "INT(2) DEFAULT 1")
    private int HomeType;
    @Column(columnDefinition = "INT(2) DEFAULT 2")
    private int TransportationType;
    private String OftenPlace;
    private double FuelCost;
}