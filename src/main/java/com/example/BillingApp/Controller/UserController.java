package com.example.BillingApp.Controller;

import com.example.BillingApp.Dto.UserRequest;
import com.example.BillingApp.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRequest userRequest){
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(userRequest));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"error in creating");
        }
    }

    @GetMapping("/users")
    public ResponseEntity<?> getUsers(){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(userService.readUsers());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Error in fetching details");
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUsers(@PathVariable String id){
        try {
            userService.deleteUser(id);
            return ResponseEntity.status(HttpStatus.OK).body("Delete Successfully");
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"User Id not found");
        }
    }

}
