package com.example.BillingApp.Dto;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentDetails {
    private String razorpayPaymentId;
    private String razorpayOrderId;
    private String razorpaySignature;

    @Enumerated(value = EnumType.STRING)
    private PaymentStatus paymentstatus;
}
