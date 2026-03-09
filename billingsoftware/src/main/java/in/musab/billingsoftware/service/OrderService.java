package in.musab.billingsoftware.service;

import in.musab.billingsoftware.io.OrderRequest;
import in.musab.billingsoftware.io.OrderResponse;
import in.musab.billingsoftware.io.PaymentVerificationRequest;

import java.awt.print.Pageable;
import java.time.LocalDate;
import java.util.List;

public interface OrderService {

    OrderResponse createdOrder(OrderRequest request);

    void deleteOrder(String orderId);

    List<OrderResponse> getLastestOrders();

    OrderResponse verifyPayment(PaymentVerificationRequest request);

    Double sumSalesByDate(LocalDate date);

    Long countByOrderDate(LocalDate date);

    List<OrderResponse> findRecentOrders();
}
