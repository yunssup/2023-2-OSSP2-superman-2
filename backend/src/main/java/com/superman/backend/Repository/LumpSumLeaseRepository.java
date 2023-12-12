package com.superman.backend.Repository;

import com.superman.backend.Entity.LumpSumLeaseData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LumpSumLeaseRepository extends JpaRepository<LumpSumLeaseData, Long> {

}