package com.superman.backend.Repository;

import com.superman.backend.Entity.SessionData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionDataRepository extends JpaRepository<SessionData, String> {

}
