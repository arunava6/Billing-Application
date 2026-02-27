package com.example.BillingApp.Repository;

import com.example.BillingApp.Entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepo extends JpaRepository<Item,Long> {
    Optional<Item> findByItemId(String itemId);
    Integer countByCategory_Id(Long id);
}
