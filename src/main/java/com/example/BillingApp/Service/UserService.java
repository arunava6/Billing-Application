package com.example.BillingApp.Service;

import com.example.BillingApp.Dto.UserRequest;
import com.example.BillingApp.Dto.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserRequest userRequest);
    String getUserRole(String email);
    List<UserResponse> readUsers();
    void deleteUser(String id);
}
