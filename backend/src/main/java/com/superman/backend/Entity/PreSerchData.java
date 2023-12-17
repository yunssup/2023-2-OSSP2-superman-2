package com.superman.backend.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PreSerchData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int SurrogateKey;
    private String StartDong;
    private String EndDong;
    private String TransportType;
    private double Fee;
    private double Time;
}
