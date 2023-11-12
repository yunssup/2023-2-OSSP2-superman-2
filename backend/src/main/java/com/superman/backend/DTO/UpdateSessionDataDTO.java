package com.superman.backend.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UpdateSessionDataDTO {
    @JsonProperty("OftenPlace")
    private String oftenPlace;

    @JsonProperty("HomeType")
    private int homeType;

    @JsonProperty("TransportationType")
    private int transportationType;

    @JsonProperty("FuelCost")
    private double fuelCost;
}
