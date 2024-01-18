package com.superman.backend.Entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class DongData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int SurrogateKey;
    private String DongName;
    private String Deposit;
    private String Monthly;
    private String area;

    @ManyToOne
    @JoinColumn(name = "logical_code", referencedColumnName = "LogicalCode")
    private PastHouseData pastHouseData;
}
