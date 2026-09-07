package com.laundryhub.service;

import com.laundryhub.dto.OrderCreateRequest;
import com.laundryhub.dto.RejectOrderRequest;
import com.laundryhub.model.Order;
import com.laundryhub.model.OrderItem;
import com.laundryhub.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByCustomer(String email) {
        return orderRepository.findByCustomerEmailIgnoreCase(email);
    }

    public List<Order> getOrdersByShop(String shopId) {
        return orderRepository.findByShopIdOrderByIdDesc(shopId);
    }

    @Transactional
    public Order placeOrder(OrderCreateRequest request) {
        String orderId = "ORD-" + (1000 + (int)(Math.random() * 9000));

        Order order = Order.builder()
                .id(orderId)
                .customerName(request.getCustomerName() != null ? request.getCustomerName() : "Priya Patel")
                .customerPhone(request.getCustomerPhone() != null ? request.getCustomerPhone() : "+91 98765 43210")
                .customerEmail(request.getCustomerEmail() != null ? request.getCustomerEmail() : "priya@example.in")
                .shopId(request.getShopId() != null ? request.getShopId() : "shop-1")
                .shopName(request.getShopName() != null ? request.getShopName() : "Sparkle & Spin Laundry Hub")
                .status("Order Placed") // Pending incoming request in provider portal!
                .deliveryMode(request.getDeliveryMode() != null ? request.getDeliveryMode() : "standard")
                .totalAmount(request.getTotalAmount() != null ? request.getTotalAmount() : 0.0)
                .pickupAddress(request.getPickupAddress() != null ? request.getPickupAddress() : "Alkapuri, Vadodara")
                .pickupSlot(request.getPickupSlot() != null ? request.getPickupSlot() : "Tomorrow, 9:00 AM")
                .deliverySlot(request.getDeliverySlot() != null ? request.getDeliverySlot() : "Tomorrow, 5:00 PM")
                .carePreferences(request.getCarePreferences() != null ? request.getCarePreferences() : List.of("Standard Detergent"))
                .createdAt(LocalTime.now().format(DateTimeFormatter.ofPattern("hh:mm a")))
                .build();

        if (request.getItems() != null && !request.getItems().isEmpty()) {
            List<OrderItem> items = new ArrayList<>();
            for (OrderCreateRequest.OrderItemDTO itemDto : request.getItems()) {
                OrderItem item = OrderItem.builder()
                        .name(itemDto.getName())
                        .qty(itemDto.getQty() != null ? itemDto.getQty() : 1)
                        .unit(itemDto.getUnit() != null ? itemDto.getUnit() : "piece")
                        .price(itemDto.getPrice() != null ? itemDto.getPrice() : 0.0)
                        .order(order)
                        .build();
                items.add(item);
            }
            order.setItems(items);
        }

        return orderRepository.save(order);
    }

    @Transactional
    public Order acceptOrder(String orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        order.setStatus("In Washing");
        order.setAcceptedAt(LocalTime.now().format(DateTimeFormatter.ofPattern("hh:mm a")));
        return orderRepository.save(order);
    }

    @Transactional
    public Order rejectOrder(String orderId, RejectOrderRequest request) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        String reason = request.getReason() != null ? request.getReason() : "Declined by provider";
        if (request.getNote() != null && !request.getNote().isBlank()) {
            reason += " - Note: " + request.getNote();
        }

        order.setStatus("Rejected");
        order.setRejectionReason(reason);
        order.setRejectedAt(LocalTime.now().format(DateTimeFormatter.ofPattern("hh:mm a")));
        return orderRepository.save(order);
    }

    @Transactional
    public Order updateOrderStatus(String orderId, String newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        order.setStatus(newStatus);
        return orderRepository.save(order);
    }
}
