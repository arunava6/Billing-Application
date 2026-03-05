package com.example.BillingApp.Controller;

import com.example.BillingApp.Dto.DashboardResponse;
import com.example.BillingApp.Dto.OrderResponse;
import com.example.BillingApp.Service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dashboard")
public class DashboardController {
    private final OrderService orderService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public DashboardResponse getDashboard() {
        LocalDate today = LocalDate.now();
        Double sales = orderService.sumSales(today);
        Long count = orderService.countSales(today);
        List<OrderResponse> orders = orderService.fetchRecentOrder();

        return new DashboardResponse(
                sales != null ? sales : 0.0,
                count != null ? count : 0,
                orders
        );
    }
}
