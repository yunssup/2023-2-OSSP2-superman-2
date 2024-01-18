package com.superman.backend.Entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import java.util.List;

@Data
@Entity
public class PastHouseData {
    @Id
    private String LogicalCode;
    private String DistrictOffice;
    private String CityName;

    @OneToMany(mappedBy = "pastHouseData", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DongData> dongDataList;

}
