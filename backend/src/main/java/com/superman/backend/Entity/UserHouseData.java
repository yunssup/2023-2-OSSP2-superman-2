package com.superman.backend.Entity;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
public class UserHouseData {
    @Id
    private String sessionId;

    @Column(columnDefinition = "VARCHAR(255) DEFAULT NULL")
    private String FirstHome;

    @Column(columnDefinition = "VARCHAR(255) DEFAULT NULL")
    private String SecondHome;


    @OneToOne
    @JoinColumn(name = "sessionId", referencedColumnName = "sessionId", foreignKey = @ForeignKey(name = "FK_UserHouseData_SessionData"))
    private SessionData sessionData;
}
