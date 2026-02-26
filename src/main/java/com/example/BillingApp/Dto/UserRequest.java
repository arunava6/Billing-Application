package com.example.BillingApp.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    private String email;
    private String password;
    private String name;
    private String role;

}
