package com.example.BillingApp.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RazorpayVerificationRequest {
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String signature;
    private String orderId;
}
