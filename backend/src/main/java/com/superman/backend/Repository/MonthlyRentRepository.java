package com.superman.backend.Repository;

import com.superman.backend.Entity.MonthlyRentData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonthlyRentRepository extends JpaRepository<MonthlyRentData, Long> {
}
