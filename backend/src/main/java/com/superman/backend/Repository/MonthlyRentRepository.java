package com.superman.backend.Repository;

import com.superman.backend.Entity.MonthlyRentData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Repository
public interface MonthlyRentRepository extends JpaRepository<MonthlyRentData, Long> {

    @Query(value = "select dong_name, ROUND(AVG(area) / 3.3) from monthly_rent_data where logical_code= ?1 and ?2 < monthly and monthly <= ?3 GROUP BY dong_name ORDER BY avg(area)", nativeQuery = true)
    public List<Object[]> getMonthlyRentDataByCost(int region_id, int min, int max);

    @Query(value = "select dong_name, CAST(ROUND(AVG(monthly)) from monthly_rent_data where logical_code= ?1 and ?2 < area and area <= ?3 GROUP BY dong_name ORDER BY avg(monthly)", nativeQuery = true)
    public List<Object[]> getMonthlyRentDataByArea(int region_id, double min, double max);
}
