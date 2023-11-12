package com.superman.backend.Entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Objects;

@Data
@Entity
public class SessionData {
    @Id
    @Column(name = "sessionId")
    private String sessionId;

    @Column(columnDefinition = "INT(2) DEFAULT 1")
    private int HomeType;

    @Column(columnDefinition = "INT(2) DEFAULT 2")
    private int TransportationType;

    private String OftenPlace;

    private double FuelCost;

    @OneToOne(mappedBy = "sessionData", cascade = CascadeType.ALL)
    private UserHouseData userHouseData;
}
