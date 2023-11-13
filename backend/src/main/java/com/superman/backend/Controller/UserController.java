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
    public String generateSession(HttpServletRequest request) {
        return sessionService.generateSession(request);
    }

    @GetMapping("/info")
    public ResponseEntity<?> getSessionInfo(@RequestParam String user) {
        return ResponseEntity.ok(userInfoService.getSessionInfo(user));
    }

    @PostMapping("/update/{sessionId}")
    public ResponseEntity<String> writeSessionData(
            @PathVariable String sessionId,
            @RequestBody UpdateSessionDataDTO sessionData
    ) {
        return handleUpdateRequest(sessionId, sessionData);
    }

    @PutMapping("/update/{sessionId}")
    public ResponseEntity<String> updateSessionData(
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
