package com.superman.backend.Service;

import com.superman.backend.Repository.MonthlyRentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MonthlyRentService {
    @Autowired
    MonthlyRentRepository monthlyRentRepository;

    public List<?> findMonthlyRentByCost(int region_id){
        return monthlyRentRepository.getMonthlyRentDataByCost(region_id);
    }
}
