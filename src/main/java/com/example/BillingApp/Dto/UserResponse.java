package com.example.BillingApp.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private String userId;
    private String name;
    private String email;
    private String role;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
