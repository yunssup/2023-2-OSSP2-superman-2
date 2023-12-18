package com.superman.backend.Repository;

import com.superman.backend.Entity.LumpSumLeaseData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LumpSumLeaseRepository extends JpaRepository<LumpSumLeaseData, Long> {

    @Query(value = "SELECT dong_name, ROUND(AVG(area) / 3.3), AVG(deposit) FROM lump_sum_lease_data WHERE logical_code = ?1 AND ?2 < deposit AND deposit <= ?3 GROUP BY dong_name ORDER BY avg(area) DESC", nativeQuery = true)
    public List<Object[]> getLumpSumLeaseDataByCost(int regionId, int min, int max);


    // Get lump sum lease data by cost range and region
    @Query(value = "SELECT dong_name, ROUND(AVG(area) / 3.3), AVG(deposit) FROM lump_sum_lease_data WHERE logical_code = ?1 AND ?2 < area AND area <= ?3 GROUP BY dong_name ORDER BY avg(deposit)", nativeQuery = true)
    public List<Object[]> getLumpSumLeaseDataByArea(int regionId, double min, double max);

    // Get lump sum lease data by cost range across all regions
    @Query(value = "SELECT logical_code, ROUND(AVG(area) / 3.3), AVG(deposit) FROM lump_sum_lease_data WHERE ?1 < deposit AND deposit <= ?2 GROUP BY logical_code ORDER BY avg(area) DESC", nativeQuery = true)
    public List<Object[]> getLumpSumLeaseDataByCostALL(int min, int max);

    // Get lump sum lease data by area range across all regions
    @Query(value = "SELECT logical_code, ROUND(AVG(area) / 3.3), AVG(deposit) FROM lump_sum_lease_data WHERE ?1 < area AND area <= ?2 GROUP BY logical_code ORDER BY avg(deposit)", nativeQuery = true)
    public List<Object[]> getLumpSumLeaseDataByAreaALL(double min, double max);

}
