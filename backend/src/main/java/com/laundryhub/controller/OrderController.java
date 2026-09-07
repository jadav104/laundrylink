package com.laundryhub.controller;

import com.laundryhub.dto.OrderCreateRequest;
import com.laundryhub.dto.RejectOrderRequest;
import com.laundryhub.model.Order;
import com.laundryhub.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/customer/{email}")
    public ResponseEntity<List<Order>> getCustomerOrders(@PathVariable String email) {
        return ResponseEntity.ok(orderService.getOrdersByCustomer(email));
    }

    @GetMapping("/vendor/{shopId}")
    public ResponseEntity<List<Order>> getVendorOrders(@PathVariable String shopId) {
        return ResponseEntity.ok(orderService.getOrdersByShop(shopId));
    }

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody OrderCreateRequest request) {
        try {
            Order created = orderService.placeOrder(request);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<?> acceptOrder(@PathVariable String id) {
        try {
            Order accepted = orderService.acceptOrder(id);
            return ResponseEntity.ok(accepted);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectOrder(@PathVariable String id, @RequestBody RejectOrderRequest request) {
        try {
            Order rejected = orderService.rejectOrder(id, request);
            return ResponseEntity.ok(rejected);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        try {
            String status = body.get("status");
            Order updated = orderService.updateOrderStatus(id, status);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
