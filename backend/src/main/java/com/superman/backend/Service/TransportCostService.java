package com.superman.backend.Service;

import lombok.ToString;
import org.springframework.stereotype.Service;

@Service
public class TransportCostService {
    public String getCost(String user, int Homenum){
        String cost = "2060";
        return cost;
    }
}
