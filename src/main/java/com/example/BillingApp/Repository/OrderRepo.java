package com.example.BillingApp.Repository;

import com.example.BillingApp.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderId(String OrderId);

    Optional<Order> findAllByOrderByCreatedAtDesc();
}
