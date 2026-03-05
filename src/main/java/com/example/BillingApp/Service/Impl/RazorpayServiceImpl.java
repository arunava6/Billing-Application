package com.example.BillingApp.Service.Impl;

import com.example.BillingApp.Dto.RazorpayOrderResponse;
import com.example.BillingApp.Service.RazorpayService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RazorpayServiceImpl implements RazorpayService {

    @Value("${razorpay.api.key}")
    private String key;
    @Value("${razorpay.key.secret}")
    private String secret;

    @Override
    public RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException {
        RazorpayClient razorpayClient = new RazorpayClient(key, secret);
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", Math.round(amount*100));
        orderRequest.put("currency", currency);
        orderRequest.put("receipt", "order_rcptId" + System.currentTimeMillis());
        orderRequest.put("payment_capture", 1);

        Order order = razorpayClient.orders.create(orderRequest);
        return ConvertToResponse(order);
    }

    private RazorpayOrderResponse ConvertToResponse(Order order) {
        return RazorpayOrderResponse.builder()
                .id(order.get("id"))
                .entity(order.get("entity"))
                .amount(order.get("amount"))
                .currency(order.get("currency"))
                .status(order.get("status"))
                .createdAt(order.get("created_at"))
                .receipt(order.get("receipt"))
                .build();
    }

}
