package com.example.BillingApp.Service;

import org.springframework.web.multipart.MultipartFile;

public interface UploadImageService {
    String uploadImage(MultipartFile file);
    boolean deleteImage(String imgUrl);

}
