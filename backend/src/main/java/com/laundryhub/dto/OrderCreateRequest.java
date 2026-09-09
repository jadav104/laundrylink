package com.laundryhub.dto;

import java.util.List;

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

    public OrderCreateRequest() {}

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

    public String getShopId() { return shopId; }
    public void setShopId(String shopId) { this.shopId = shopId; }

    public String getShopName() { return shopName; }
    public void setShopName(String shopName) { this.shopName = shopName; }

    public String getDeliveryMode() { return deliveryMode; }
    public void setDeliveryMode(String deliveryMode) { this.deliveryMode = deliveryMode; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public String getPickupAddress() { return pickupAddress; }
    public void setPickupAddress(String pickupAddress) { this.pickupAddress = pickupAddress; }

    public String getPickupSlot() { return pickupSlot; }
    public void setPickupSlot(String pickupSlot) { this.pickupSlot = pickupSlot; }

    public String getDeliverySlot() { return deliverySlot; }
    public void setDeliverySlot(String deliverySlot) { this.deliverySlot = deliverySlot; }

    public List<String> getCarePreferences() { return carePreferences; }
    public void setCarePreferences(List<String> carePreferences) { this.carePreferences = carePreferences; }

    public List<OrderItemDTO> getItems() { return items; }
    public void setItems(List<OrderItemDTO> items) { this.items = items; }

    public static class OrderItemDTO {
        private String name;
        private Integer qty;
        private String unit;
        private Double price;

        public OrderItemDTO() {}

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public Integer getQty() { return qty; }
        public void setQty(Integer qty) { this.qty = qty; }

        public String getUnit() { return unit; }
        public void setUnit(String unit) { this.unit = unit; }

        public Double getPrice() { return price; }
        public void setPrice(Double price) { this.price = price; }
    }
}
