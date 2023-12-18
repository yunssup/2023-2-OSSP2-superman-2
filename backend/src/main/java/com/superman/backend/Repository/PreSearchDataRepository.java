package com.superman.backend.Repository;

import com.superman.backend.Entity.PreSearchData;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface PreSearchDataRepository extends JpaRepository<PreSearchData, Integer> {
    PreSearchData findByStartDongAndEndDongAndTransportType(String StartDong, String EndDong, int TransportType);
}
