package com.laundryhub.controller;

import com.laundryhub.model.LaundryService;
import com.laundryhub.model.Shop;
import com.laundryhub.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/shops")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ShopController {

    private final ShopService shopService;

    @GetMapping
    public ResponseEntity<List<Shop>> getApprovedShops() {
        return ResponseEntity.ok(shopService.getApprovedShops());
    }

    @GetMapping("/all")
    public ResponseEntity<List<Shop>> getAllShops() {
        return ResponseEntity.ok(shopService.getAllShops());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getShopById(@PathVariable String id) {
        return shopService.getShopById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        try {
            String status = body.get("status");
            Shop updated = shopService.updateShopStatus(id, status);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/warnings")
    public ResponseEntity<?> issueWarning(@PathVariable String id, @RequestBody Map<String, String> body) {
        try {
            String reason = body.get("reason");
            Shop updated = shopService.issueWarning(id, reason);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/services")
    public ResponseEntity<?> addService(@PathVariable String id, @RequestBody LaundryService service) {
        try {
            LaundryService created = shopService.addServiceToShop(id, service);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
