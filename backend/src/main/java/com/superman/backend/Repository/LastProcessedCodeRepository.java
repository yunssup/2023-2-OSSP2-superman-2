package com.superman.backend.Repository;

import com.superman.backend.Entity.LastProcessedCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LastProcessedCodeRepository extends JpaRepository<LastProcessedCode, Long> {
    // Custom query method, if needed
}
