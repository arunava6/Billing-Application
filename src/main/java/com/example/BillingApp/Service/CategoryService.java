package com.example.BillingApp.Service;

import com.example.BillingApp.Dto.CategoryRequest;
import com.example.BillingApp.Dto.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {

    CategoryResponse add(CategoryRequest categoryRequest, MultipartFile file);
    List<CategoryResponse> read();
    void delete(String categoryId);
}
