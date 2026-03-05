package com.example.BillingApp.Repository;

import com.example.BillingApp.Entity.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderId(String OrderId);

    Optional<Order> findAllByOrderByCreatedAtDesc();

    @Query("SELECT SUM(o.grandTotal) FROM Order o WHERE DATE(o.createdAt)= :date")
    Double sumSalesByDate(@Param("date")LocalDate date);

    @Query("SELECT COUNT(o.grandTotal) FROM Order o WHERE DATE(o.createdAt)= :date")
    Long countSalesByDate(@Param("date")LocalDate date);

    @Query("SELECT o FROM Order o  ORDER BY o.createdAt DESC")
    List<Order> findRecentOrder(Pageable pageable);
}
