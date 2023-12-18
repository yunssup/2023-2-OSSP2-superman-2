package com.superman.backend.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "monthly_rent_data") // Define your table name for monthly rent
public class MonthlyRentData {
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
