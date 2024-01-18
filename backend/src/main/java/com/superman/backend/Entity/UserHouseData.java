package com.superman.backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class UserHouseData {
    @Id
    private String sessionId;

    @Column(columnDefinition = "VARCHAR(255) DEFAULT NULL")
    private String FirstHome;

    @Column(columnDefinition = "VARCHAR(255) DEFAULT NULL")
    private String FirstHomeDetail;

    @Column(columnDefinition = "VARCHAR(255) DEFAULT NULL")
    private String SecondHome;

    @Column(columnDefinition = "VARCHAR(255) DEFAULT NULL")
    private String SecondHomeDetail;

    @JsonBackReference
    @OneToOne
    @MapsId
    @JoinColumn(name = "sessionId")
    private SessionData sessionData;
}
