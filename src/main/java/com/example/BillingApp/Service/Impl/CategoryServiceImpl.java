package com.example.BillingApp.Service.Impl;

import com.example.BillingApp.Dto.CategoryRequest;
import com.example.BillingApp.Dto.CategoryResponse;
import com.example.BillingApp.Entity.Category;
import com.example.BillingApp.Repository.CategoryRepo;
import com.example.BillingApp.Service.CategoryService;
import com.example.BillingApp.Service.UploadImageService;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepo categoryRepo;
    private final UploadImageService uploadImageService;

    @Override
    public CategoryResponse add(CategoryRequest categoryRequest, MultipartFile file) {
        Category newCategory = new Category();
        String imgUrl = uploadImageService.uploadImage(file);

        newCategory.setCategoryId(UUID.randomUUID().toString());
        newCategory.setName(categoryRequest.getName());
        newCategory.setDescription(categoryRequest.getDescription());
        newCategory.setBgColor(categoryRequest.getBgColor());
        newCategory.setImgUrl(imgUrl);

        categoryRepo.save(newCategory);

        return getCategoryResponse(newCategory);
    }

    @Override
    public List<CategoryResponse> read() {
        List<Category> categories = categoryRepo.findAll();

        return categories.stream()
                .map(category -> {
                    return getCategoryResponse(category);
                })
                .toList();
    }

    @Override
    public void delete(String categoryId) {
        Category existingCategory = categoryRepo.findByCategoryId(categoryId).orElseThrow(
                () -> new RuntimeException("Category Id not found!!")
        );

        uploadImageService.deleteImage(existingCategory.getImgUrl());
        categoryRepo.delete(existingCategory);
    }

    private static @NonNull CategoryResponse getCategoryResponse(Category newCategory) {
        CategoryResponse categoryResponse = new CategoryResponse();

        categoryResponse.setCategoryId(newCategory.getCategoryId());
        categoryResponse.setName(newCategory.getName());
        categoryResponse.setDescription(newCategory.getDescription());
        categoryResponse.setBgColor(newCategory.getBgColor());
        categoryResponse.setImgUrl(newCategory.getImgUrl());
        categoryResponse.setCreatedAt(newCategory.getCreatedAt());
        categoryResponse.setUpdatedAt(newCategory.getUpdatedAt());
        return categoryResponse;
    }
}
