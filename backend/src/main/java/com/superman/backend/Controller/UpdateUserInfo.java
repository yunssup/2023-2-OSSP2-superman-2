package com.superman.backend.Controller;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UpdateUserInfo {

    @PostMapping("/{userid}")
    public String handleUserRequest(
            @PathVariable String userid,
            @RequestBody UserData userData
    ) {
        // 여기서 요청 처리 로직을 구현
        String oftenPlace = userData.getOftenPlass();
        String transportation = userData.getTransportation();
        String homeType = userData.getHomeType();
        String fuelCost = userData.getFuelcost();

        // 필요에 따라 데이터를 사용하여 작업을 수행

        return "Received user ID: " + userid;
    }

    // 모델 클래스
    public static class UserData {
        private String oftenPlass;
        private String transportation;
        private String homeType;
        private String fuelcost;

        public String getOftenPlass() {
            return oftenPlass;
        }

        public void setOftenPlass(String oftenPlass) {
            this.oftenPlass = oftenPlass;
        }

        public String getTransportation() {
            return transportation;
        }

        public void setTransportation(String transportation) {
            this.transportation = transportation;
        }

        public String getHomeType() {
            return homeType;
        }

        public void setHomeType(String homeType) {
            this.homeType = homeType;
        }

        public String getFuelcost() {
            return fuelcost;
        }

        public void setFuelcost(String fuelcost) {
            this.fuelcost = fuelcost;
        }
    }
}
