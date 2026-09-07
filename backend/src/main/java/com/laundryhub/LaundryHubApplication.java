package com.laundryhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LaundryHubApplication {

    public static void main(String[] args) {
        SpringApplication.run(LaundryHubApplication.class, args);
        System.out.println("=========================================================");
        System.out.println("  🧺 LaundryHub Java Spring Boot Backend Running!");
        System.out.println("  API URL: http://localhost:8080/api");
        System.out.println("  H2 DB Console: http://localhost:8080/h2-console");
        System.out.println("=========================================================");
    }
}
