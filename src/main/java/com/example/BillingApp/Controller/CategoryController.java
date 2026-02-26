package com.example.BillingApp.Controller;

import com.example.BillingApp.Dto.CategoryRequest;
import com.example.BillingApp.Service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import tools.jackson.databind.ObjectMapper;

@RestController
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping(value="/admin/categories",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addCategory(@RequestPart("category") String categoryString,
                                         @RequestPart("file") MultipartFile file) {

        ObjectMapper mapper = new ObjectMapper();
        CategoryRequest categoryRequest =
                mapper.readValue(categoryString, CategoryRequest.class);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(categoryService.add(categoryRequest, file));
    }

    @GetMapping
    public ResponseEntity<?> fetchCategories() {
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.read());
    }

    @DeleteMapping("/admin/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable String categoryId) {
        try {
            categoryService.delete(categoryId);
            return ResponseEntity.ok("Category deleted successfully");
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
