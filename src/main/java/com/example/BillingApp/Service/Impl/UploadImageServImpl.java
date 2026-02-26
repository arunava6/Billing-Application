package com.example.BillingApp.Service.Impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.BillingApp.Service.UploadImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UploadImageServImpl implements UploadImageService {

    private final Cloudinary cloudinary;

    @Override
    public String uploadImage(MultipartFile file) {
        try {
            String publicId = UUID.randomUUID().toString();
            Map<String, String> options = new HashMap<>();
            options.put("public_id", publicId);
            options.put("folder", "billingApp/categories");

            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(), options
            );

            return uploadResult.get("secure_url").toString();
        } catch (IOException e) {
            throw new RuntimeException("Error in upload!!");
        }
    }

    @Override
    public boolean deleteImage(String imgUrl) {
        try {
            String publicId = imgUrl.substring(
                    imgUrl.lastIndexOf('/') + 1,
                    imgUrl.lastIndexOf('.')
            );

            cloudinary.uploader().destroy(
                    "billingApp/categories/" + publicId, ObjectUtils.emptyMap()
            );
            return true;
        } catch (IOException e) {
            throw new RuntimeException("Error!!");
        }
    }
}
