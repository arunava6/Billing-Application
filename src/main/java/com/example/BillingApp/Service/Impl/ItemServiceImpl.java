package com.example.BillingApp.Service.Impl;

import com.example.BillingApp.Dto.ItemRequest;
import com.example.BillingApp.Dto.ItemResponse;
import com.example.BillingApp.Entity.Category;
import com.example.BillingApp.Entity.Item;
import com.example.BillingApp.Repository.CategoryRepo;
import com.example.BillingApp.Repository.ItemRepo;
import com.example.BillingApp.Service.ItemService;
import com.example.BillingApp.Service.UploadImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {
    private final UploadImageService uploadImageService;
    private final CategoryRepo categoryRepo;
    private final ItemRepo itemRepo;

    @Override
    public ItemResponse add(ItemRequest itemRequest, MultipartFile file) {
        String url = uploadImageService.uploadImage(file);

        Item newItem = Item.builder()
                .itemId(UUID.randomUUID().toString())
                .name(itemRequest.getName())
                .description(itemRequest.getDescription())
                .price(itemRequest.getPrice())
                .imgUrl(url)
                .build();

        Category existingCategory = categoryRepo.findByCategoryId(itemRequest.getCategoryId()).orElseThrow(
                () -> new RuntimeException("Category not found!!")
        );
        newItem.setCategory(existingCategory);

        itemRepo.save(newItem);

        return getItemResponse(newItem);
    }

    private ItemResponse getItemResponse(Item newItem) {
        return ItemResponse.builder()
                .itemId(newItem.getItemId())
                .name(newItem.getName())
                .description(newItem.getDescription())
                .price(newItem.getPrice())
                .categoryId(newItem.getCategory().getCategoryId())
                .categoryName(newItem.getCategory().getName())
                .imgUrl(newItem.getImgUrl())
                .createdAt(newItem.getCreatedAt())
                .updatedAt(newItem.getUpdatedAt())
                .build();
    }

    @Override
    public List<ItemResponse> fetchItems() {
        List<Item> items = itemRepo.findAll();
        return items.stream()
                .map(item -> {
                    return getItemResponse(item);
                })
                .toList();

    }

    @Override
    public void deleteItem(String itemId) {
        Item existingItem = itemRepo.findByItemId(itemId).orElseThrow(
                () -> new RuntimeException("Item not found!!")
        );
        uploadImageService.deleteImage(existingItem.getImgUrl());
        itemRepo.delete(existingItem);
    }

}
