package com.superman.backend.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PreSearchData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int surrogateKey;
    private String startDong;
    private String endDong;
    private int transportType;
    private int fee;
    private int time;
}
