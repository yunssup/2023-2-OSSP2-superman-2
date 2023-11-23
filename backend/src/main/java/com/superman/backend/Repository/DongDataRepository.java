package com.superman.backend.Repository;

import com.superman.backend.Entity.DongData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DongDataRepository extends JpaRepository<DongData, Long> {
}
