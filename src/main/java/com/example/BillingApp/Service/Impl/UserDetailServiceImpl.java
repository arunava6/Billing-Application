package com.example.BillingApp.Service.Impl;

import com.example.BillingApp.Entity.User;
import com.example.BillingApp.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {
    private final UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User existingUser= userRepo.findByEmail(email).orElseThrow(
                ()->new UsernameNotFoundException("User name not found!!")
        );

        return new org.springframework.security.core.userdetails.User(existingUser.getEmail(), existingUser.getPassword(), Collections.singleton(new SimpleGrantedAuthority(existingUser.getRole())));

    }
}
