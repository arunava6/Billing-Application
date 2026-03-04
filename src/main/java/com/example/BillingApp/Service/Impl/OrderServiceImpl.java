package com.example.BillingApp.Service.Impl;

import com.example.BillingApp.Dto.OrderRequest;
import com.example.BillingApp.Dto.OrderResponse;
import com.example.BillingApp.Dto.PaymentDetails;
import com.example.BillingApp.Dto.PaymentStatus;
import com.example.BillingApp.Entity.Order;
import com.example.BillingApp.Entity.OrderItem;
import com.example.BillingApp.Entity.PaymentMethod;
import com.example.BillingApp.Repository.OrderRepo;
import com.example.BillingApp.Service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
        Order existingOrder=orderRepo.findByOrderId(orderId).orElseThrow(
                ()->new RuntimeException("Order Id is not present")
        );
        orderRepo.delete(existingOrder);

    }

    @Override
    public List<OrderResponse> fetchOrders() {
        List<Order> orders=orderRepo.findAll();

        return orders.stream()
                .map(order -> convertToOrderResponse(order))
                .toList();
    }
}


