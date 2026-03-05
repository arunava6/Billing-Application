package com.example.BillingApp.Controller;

import com.example.BillingApp.Dto.RazorpayOrderRequest;
import com.example.BillingApp.Dto.RazorpayOrderResponse;
import com.example.BillingApp.Dto.RazorpayVerificationRequest;
import com.example.BillingApp.Service.OrderService;
import com.example.BillingApp.Service.RazorpayService;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create-order")
    public ResponseEntity<RazorpayOrderResponse> createOrder(@RequestBody RazorpayOrderRequest razorpayOrderRequest) throws RazorpayException {
        return ResponseEntity.status(HttpStatus.CREATED).body(razorpayService.createOrder(razorpayOrderRequest.getAmount(), razorpayOrderRequest.getCurrency()));
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody RazorpayVerificationRequest razorpayVerificationRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.veriyPayment(razorpayVerificationRequest));
    }
}
