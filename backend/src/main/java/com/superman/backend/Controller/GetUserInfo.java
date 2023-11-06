package com.superman.backend.Controller;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GetUserInfo {

    @PersistenceContext
    private EntityManager entityManager; // EntityManager 주입

    @GetMapping("/api/user")
    public String getUserInfo(@RequestParam String user) {
        String query = "SELECT u.oftenPlace, u.transportation, u.homeType, u.fuelCost FROM SessionData u WHERE u.userid = :userid";
        List<Object[]> results = entityManager.createQuery(query)
                .setParameter("userid", user)
                .getResultList();

        if (results.isEmpty()) {
            return "No user found with the provided ID";
        }

        Object[] userObj = results.get(0);
        String oftenPlace = (String) userObj[0];
        String transportation = (String) userObj[1];
        String homeType = (String) userObj[2];
        String fuelCost = (String) userObj[3];

        // JSON 형태로 변환
        return "{\n" +
                "    \"OftenPlass\": \"" + oftenPlace + "\",\n" +
                "    \"Transportation\": \"" + transportation + "\",\n" +
                "    \"HomeType\": \"" + homeType + "\",\n" +
                "    \"fuelcost\": \"" + fuelCost + "\"\n" +
                "}";
    }
}
