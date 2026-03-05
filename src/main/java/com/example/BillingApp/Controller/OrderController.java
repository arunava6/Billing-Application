package com.example.BillingApp.Controller;

import com.example.BillingApp.Dto.OrderRequest;
import com.example.BillingApp.Dto.OrderResponse;
import com.example.BillingApp.Service.Impl.OrderServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {
    private final OrderServiceImpl orderService;

    @PostMapping("/add")
    public ResponseEntity<OrderResponse> addOrder(@RequestBody OrderRequest orderRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.createOrder(orderRequest));
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<?> deleteOrder(@PathVariable String orderId){
        orderService.deleteOrder(orderId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(Map.of("message","Delete Successfully"));
    }

    @GetMapping
    public ResponseEntity<?> fetchOrder(){
        return ResponseEntity.status(HttpStatus.OK).body(orderService.fetchOrders());
    }

}
