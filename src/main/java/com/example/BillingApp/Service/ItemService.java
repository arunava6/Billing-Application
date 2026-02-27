package com.example.BillingApp.Service;

import com.example.BillingApp.Dto.ItemRequest;
import com.example.BillingApp.Dto.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {
    ItemResponse add(ItemRequest itemRequest, MultipartFile file);

    List<ItemResponse> fetchItems();

    void deleteItem(String itemId);
}
