package com.superman.backend.Controller;

import com.superman.backend.DTO.UpdateSessionDataDTO;
import com.superman.backend.Service.SessionService;
import com.superman.backend.Service.UserInfoService;
import com.superman.backend.Service.UpdateUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
@ComponentScan(basePackages = {"com.superman.backend", "com.superman.backend.Repository"})
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private SessionService sessionService;
    @Autowired
    private UserInfoService userInfoService;
    @Autowired
    private UpdateUserService updateUserService;

    public static void main(String[] args) {
        SpringApplication.run(UserController.class, args);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> generateSession(HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();
        response.putAll(sessionService.generateSession(request));


        return ResponseEntity.ok(response);
    }


    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>>  getSessionInfo(@RequestParam String user) {
        Map<String, Object> response = new HashMap<>();
        if(userInfoService.getSessionInfo(user) == null)
        {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Not found user");

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
        response.put("user", userInfoService.getSessionInfo(user));
        response.put("status_code_value", 200);
        response.put("status_code", "OK");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/update/{sessionId}")
    public ResponseEntity<?> writeSessionData(
            @PathVariable String sessionId,
            @RequestBody UpdateSessionDataDTO sessionData
    ) {
        return ResponseEntity.ok(handleUpdateRequest(sessionId, sessionData));
    }

    @PutMapping("/update/{sessionId}")
    public ResponseEntity<?> updateSessionData(
            @PathVariable String sessionId,
            @RequestBody UpdateSessionDataDTO sessionData
    ) {
        return handleUpdateRequest(sessionId, sessionData);
    }

    private ResponseEntity<String> handleUpdateRequest(String sessionId, UpdateSessionDataDTO sessionData) {
        try {
            return updateUserService.updateSessionData(sessionId, sessionData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving house information: " + e.getMessage());
        }
    }
}
