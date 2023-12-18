package com.superman.backend;

import com.superman.backend.Controller.UserController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class BackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(UserController.class, args); //서버가 시작되면 바로 세션을 줌.
	}
}
