package com.superman.backend.Repository;

import com.superman.backend.Entity.MonthlyRentData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MonthlyRentRepository extends JpaRepository<MonthlyRentData, Long> {

    @Query(value = "select dong_name, avg(monthly) from monthly_rent_data where logical_code= ?1 GROUP BY dong_name", nativeQuery = true)
    public List<?> getMonthlyRentDataByCost(int region_id);
}
