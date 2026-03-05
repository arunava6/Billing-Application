package com.example.BillingApp.Service.Impl;

import com.example.BillingApp.Dto.*;
import com.example.BillingApp.Entity.Order;
import com.example.BillingApp.Entity.OrderItem;
import com.example.BillingApp.Entity.PaymentMethod;
import com.example.BillingApp.Repository.OrderRepo;
import com.example.BillingApp.Service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepo orderRepo;

    @Override
    public OrderResponse createOrder(OrderRequest orderRequest) {
        Order newOrder = convertToOrderEntity(orderRequest);

        newOrder.setPaymentMethod(PaymentMethod.valueOf(orderRequest.getPaymentMethod()));
        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setPaymentstatus(newOrder.getPaymentMethod() == PaymentMethod.CASH ?
                PaymentStatus.COMPLETED : PaymentStatus.PENDING);
        newOrder.setPaymentDetails(paymentDetails);


        List<OrderItem> orderItems = orderRequest.getCartItems().stream()
                .map(item -> convertToCartItem(item))
                .collect(Collectors.toList());
        newOrder.setOrderItems(orderItems);

        orderRepo.save(newOrder);
        return convertToOrderResponse(newOrder);
    }

    private OrderResponse convertToOrderResponse(Order newOrder) {
        return OrderResponse.builder()
                .orderId(newOrder.getOrderId())
                .customerName(newOrder.getCustomerName())
                .mobileNumber(newOrder.getMobileNumber())
                .subTotal(newOrder.getSubTotal())
                .tax(newOrder.getTax())
                .grandTotal(newOrder.getGrandTotal())
                .createdAt(newOrder.getCreatedAt())
                .paymentDetails(newOrder.getPaymentDetails())
                .paymentMethod(newOrder.getPaymentMethod().name())
                .cartItemResponse(newOrder.getOrderItems().stream()
                        .map(item -> convertToItemResponse(item))
                        .toList())
                .build();
    }

    private OrderResponse.OrderItemResponse convertToItemResponse(OrderItem orderItem) {
        return OrderResponse.OrderItemResponse.builder()
                .itemId(orderItem.getItemId())
                .name(orderItem.getName())
                .price(orderItem.getPrice())
                .quantity(orderItem.getQuantity())
                .build();
    }

    private OrderItem convertToCartItem(OrderRequest.OrderItemRequest item) {
        return OrderItem.builder()
                .itemId(item.getItemId())
                .name(item.getName())
                .price(item.getPrice())
                .quantity(item.getQuantity())
                .build();
    }


    private Order convertToOrderEntity(OrderRequest orderRequest) {
        return Order.builder()
                .orderId(UUID.randomUUID().toString())
                .customerName(orderRequest.getCustomerName())
                .mobileNumber(orderRequest.getMobileNumber())
                .subTotal(orderRequest.getSubTotal())
                .tax(orderRequest.getTax())
                .grandTotal(orderRequest.getGrandTotal())
                .build();
    }

    @Override
    public void deleteOrder(String orderId) {
        Order existingOrder = orderRepo.findByOrderId(orderId).orElseThrow(
                () -> new RuntimeException("Order Id is not present")
        );
        orderRepo.delete(existingOrder);

    }

    @Override
    public List<OrderResponse> fetchOrders() {
        List<Order> orders = orderRepo.findAll();

        return orders.stream()
                .map(order -> convertToOrderResponse(order))
                .toList();
    }

    @Override
    public OrderResponse veriyPayment(RazorpayVerificationRequest request) {
        Order existingOrder = orderRepo.findByOrderId(request.getOrderId()).orElseThrow(
                () -> new RuntimeException("Order Id not found")
        );

        if (!verifyRazorpayRequest(request.getRazorpayOrderId(), request.getRazorpayPaymentId(), request.getSignature())) {
            throw new RuntimeException("Payment failed");
        }

        PaymentDetails paymentDetails = existingOrder.getPaymentDetails();
        paymentDetails.setRazorpayPaymentId(request.getRazorpayPaymentId());
        paymentDetails.setRazorpayOrderId(request.getRazorpayOrderId());
        paymentDetails.setRazorpaySignature(request.getSignature());
        paymentDetails.setPaymentstatus(PaymentStatus.COMPLETED);

        orderRepo.save(existingOrder);
        return convertToOrderResponse(existingOrder);
    }

    @Override
    public Double sumSales(LocalDate date) {
        return orderRepo.sumSalesByDate(date);
    }

    @Override
    public Long countSales(LocalDate date) {
        return orderRepo.countSalesByDate(date);
    }


    @Override
    public List<OrderResponse> fetchRecentOrder() {
        return orderRepo.findRecentOrder(PageRequest.of(0,5))
                .stream()
                .map(
                        orderItem -> convertToOrderResponse(orderItem)
                )
                .toList();
    }

    private boolean verifyRazorpayRequest(String razorpayOrderId, String razorpayPaymentId, String signature) {
        return true;
    }
}


