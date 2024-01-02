package com.zone.connect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ConnectApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(ConnectApplication.class, args);
	}

}
