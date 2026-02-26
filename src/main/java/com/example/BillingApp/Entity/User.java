package com.example.BillingApp.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.sql.Timestamp;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String userId;
    private String email;
    private String password;
    private String role;
    private String name;
    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdAt;
    @UpdateTimestamp
    private Timestamp updatedAt;

}
