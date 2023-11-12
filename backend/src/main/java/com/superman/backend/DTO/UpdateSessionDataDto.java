package com.superman.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateSessionDataDto {
    private String OftenPlace;
    private int HomeType;
    private int TransportationType;
    private double FuelCost;
}