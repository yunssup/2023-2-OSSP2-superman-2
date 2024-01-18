package com.superman.backend.Repository;

import com.superman.backend.Entity.PastHouseData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PastHouseDataRepository extends JpaRepository<PastHouseData, String> {
}
