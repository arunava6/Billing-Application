package com.example.BillingApp.Service.Impl;

import com.example.BillingApp.Dto.UserRequest;
import com.example.BillingApp.Dto.UserResponse;
import com.example.BillingApp.Entity.User;
import com.example.BillingApp.Repository.UserRepo;
import com.example.BillingApp.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse createUser(UserRequest userRequest) {
        if(userRepo.findByEmail(userRequest.getEmail()).isPresent()){
            throw new RuntimeException("User name already exists");
        }

        User newUser =new User();
        newUser.setUserId(UUID.randomUUID().toString());
        newUser.setName(userRequest.getName());
        newUser.setEmail(userRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        newUser.setRole(userRequest.getRole());

        userRepo.save(newUser);
        return getUserResponse(newUser);
    }

    private UserResponse getUserResponse(User newUser) {
        UserResponse userResponse=new UserResponse();
        userResponse.setUserId(newUser.getUserId());
        userResponse.setName(newUser.getName());
        userResponse.setEmail(newUser.getEmail());
        userResponse.setRole(newUser.getRole());
        userResponse.setCreatedAt(newUser.getCreatedAt());
        userResponse.setUpdatedAt(newUser.getUpdatedAt());

        return  userResponse;
    }

    @Override
    public String getUserRole(String email) {
        User existingUser=userRepo.findByEmail(email).orElseThrow(
                ()->new RuntimeException("Email not found!!")
        );
        return existingUser.getRole();
    }

    @Override
    public List<UserResponse> readUsers() {
        List<User> responses=userRepo.findAll();

        return responses.stream()
                .map(user -> {
                    return getUserResponse(user);
                })
                .toList();

    }

    @Override
    public void deleteUser(String id) {
        User existingUser=userRepo.findByUserId(id).orElseThrow(
                ()->new RuntimeException("UserId not found!!")
        );
        userRepo.delete(existingUser);

    }
}
