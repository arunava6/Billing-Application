package com.example.BillingApp.Service;

import com.example.BillingApp.Dto.OrderRequest;
import com.example.BillingApp.Dto.OrderResponse;
import com.example.BillingApp.Dto.RazorpayVerificationRequest;

import java.util.List;

public interface OrderService {

    OrderResponse createOrder(OrderRequest orderRequest);

    void deleteOrder(String orderId);

    List<OrderResponse> fetchOrders();

    OrderResponse veriyPayment(RazorpayVerificationRequest razorpayVerificationRequest);
}
