package com.a3fitness;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class A3FitnessApplication {

    public static void main(String[] args) {
        SpringApplication.run(A3FitnessApplication.class, args);
    }
}
