package com.example.BillingApp;

import com.example.BillingApp.Entity.User;
import com.example.BillingApp.Repository.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.UUID;

@SpringBootApplication
public class BillingAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(BillingAppApplication.class, args);
	}

	@Bean
	public CommandLineRunner createAdminUser(UserRepo userRepo, PasswordEncoder passwordEncoder) {
		return args -> {
			String adminEmail = "admin123@gmail.com";
			if (userRepo.findByEmail(adminEmail).isEmpty()) {
				User admin = new User();
				admin.setUserId(UUID.randomUUID().toString());
				admin.setName("admin");
				admin.setEmail(adminEmail);
				admin.setPassword(passwordEncoder.encode("admin123"));
				admin.setRole("ADMIN");
				userRepo.save(admin);
				System.out.println("Admin user created successfully!");
			} else {
				System.out.println("Admin user already exists.");
			}
		};
	}
}
