package com.superman.backend.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    private double FuelCost;
    private int Interest;
    private String OftenPlace;
    @Column(nullable = true)
    private String OftenPlaceX;
    @Column(nullable = true)
    private String OftenPlaceY;
    @Column
    private String OftenDong;

    @JsonManagedReference
    @OneToOne(mappedBy = "sessionData", cascade = CascadeType.PERSIST)
    private UserHouseData userHouseData;
}
