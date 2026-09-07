package com.laundryhub.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderCreateRequest {
    private String customerName;
    private String customerPhone;
    private String customerEmail;
    private String shopId;
    private String shopName;
    private String deliveryMode; // standard | express | emergency
    private Double totalAmount;
    private String pickupAddress;
    private String pickupSlot;
    private String deliverySlot;
    private List<String> carePreferences;
    private List<OrderItemDTO> items;

    @Data
    public static class OrderItemDTO {
        private String name;
        private Integer qty;
        private String unit;
        private Double price;
    }
}
