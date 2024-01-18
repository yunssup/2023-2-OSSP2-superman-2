package com.superman.backend.Entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class LumpSumLeaseData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int SurrogateKey;
    private String DongName;
    private int Deposit;
    private int Monthly;
    private double area;

    @ManyToOne
    @JoinColumn(name = "logical_code", referencedColumnName = "LogicalCode")
    private PastHouseData pastHouseData;
}
