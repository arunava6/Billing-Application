package com.example.BillingApp.Controller;

import com.example.BillingApp.Dto.ItemRequest;
import com.example.BillingApp.Service.ItemService;
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
public class ItemController {
    private final ItemService itemService;

    @PostMapping(value = "/admin/addItem", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addItems(
            @RequestPart("item") String itemString,
            @RequestPart("file") MultipartFile file
    ) {
        ObjectMapper objectMapper = new ObjectMapper();
        ItemRequest itemRequest = objectMapper.readValue(itemString, ItemRequest.class);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(itemService.add(itemRequest, file));
    }

    @GetMapping("/items")
    public ResponseEntity<?> getItems(){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(itemService.fetchItems());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Error in fetching");
        }
    }

    @DeleteMapping("/admin/item/{itemId}")
    public ResponseEntity<?> deleteItems(@PathVariable String itemId){
        try {
            itemService.deleteItem(itemId);
            return ResponseEntity.status(HttpStatus.OK).body("Delete successfully");
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"item Id not found");
        }
    }
}
