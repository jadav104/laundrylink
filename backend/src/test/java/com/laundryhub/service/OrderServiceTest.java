package com.laundryhub.service;

import com.laundryhub.dto.OrderCreateRequest;
import com.laundryhub.dto.RejectOrderRequest;
import com.laundryhub.model.Order;
import com.laundryhub.repository.OrderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderService orderService;

    private Order sampleOrder;

    @BeforeEach
    void setUp() {
        sampleOrder = Order.builder()
                .id("ORD-1001")
                .customerName("Priya Patel")
                .customerEmail("priya@example.in")
                .shopId("shop-1")
                .status("Order Placed")
                .totalAmount(250.0)
                .build();
    }

    @Test
    void testGetAllOrders() {
        when(orderRepository.findAll()).thenReturn(List.of(sampleOrder));
        List<Order> orders = orderService.getAllOrders();
        assertEquals(1, orders.size());
        assertEquals("ORD-1001", orders.get(0).getId());
    }

    @Test
    void testPlaceOrder() {
        OrderCreateRequest req = new OrderCreateRequest();
        req.setCustomerName("Priya Patel");
        req.setShopId("shop-1");
        req.setTotalAmount(350.0);

        when(orderRepository.save(any(Order.class))).thenAnswer(i -> i.getArgument(0));

        Order created = orderService.placeOrder(req);
        assertNotNull(created.getId());
        assertTrue(created.getId().startsWith("ORD-"));
        assertEquals("Order Placed", created.getStatus());
        assertEquals("Priya Patel", created.getCustomerName());
    }

    @Test
    void testAcceptOrder() {
        when(orderRepository.findById("ORD-1001")).thenReturn(Optional.of(sampleOrder));
        when(orderRepository.save(any(Order.class))).thenAnswer(i -> i.getArgument(0));

        Order accepted = orderService.acceptOrder("ORD-1001");
        assertEquals("In Washing", accepted.getStatus());
        assertNotNull(accepted.getAcceptedAt());
    }

    @Test
    void testRejectOrder() {
        RejectOrderRequest req = new RejectOrderRequest();
        req.setReason("Machine Maintenance");
        req.setNote("Shop will resume tomorrow");

        when(orderRepository.findById("ORD-1001")).thenReturn(Optional.of(sampleOrder));
        when(orderRepository.save(any(Order.class))).thenAnswer(i -> i.getArgument(0));

        Order rejected = orderService.rejectOrder("ORD-1001", req);
        assertEquals("Rejected", rejected.getStatus());
        assertTrue(rejected.getRejectionReason().contains("Machine Maintenance"));
    }

    @Test
    void testUpdateOrderStatus() {
        when(orderRepository.findById("ORD-1001")).thenReturn(Optional.of(sampleOrder));
        when(orderRepository.save(any(Order.class))).thenAnswer(i -> i.getArgument(0));

        Order updated = orderService.updateOrderStatus("ORD-1001", "Ready");
        assertEquals("Ready", updated.getStatus());
    }
}
