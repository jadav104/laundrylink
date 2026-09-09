package com.laundryhub.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    private String id;

    @Column(nullable = false)
    private String customerName;

    private String customerPhone;

    private String customerEmail;

    @Column(nullable = false)
    private String shopId;

    private String shopName;

    @Column(nullable = false)
    private String status; // Order Placed | In Washing | Ready | Completed | Rejected

    private String deliveryMode; // standard | express | emergency

    private Double totalAmount;

    @Column(length = 1000)
    private String pickupAddress;

    private String pickupSlot;

    private String deliverySlot;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "order_care_preferences", joinColumns = @JoinColumn(name = "order_id"))
    @Column(name = "preference")
    private List<String> carePreferences = new ArrayList<>();

    @Column(length = 1000)
    private String rejectionReason;

    private String createdAt;

    private String acceptedAt;

    private String rejectedAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<OrderItem> items = new ArrayList<>();

    public Order() {}

    public Order(String id, String customerName, String customerPhone, String customerEmail, String shopId, String shopName, String status, String deliveryMode, Double totalAmount, String pickupAddress, String pickupSlot, String deliverySlot, List<String> carePreferences, String rejectionReason, String createdAt, String acceptedAt, String rejectedAt, List<OrderItem> items) {
        this.id = id;
        this.customerName = customerName;
        this.customerPhone = customerPhone;
        this.customerEmail = customerEmail;
        this.shopId = shopId;
        this.shopName = shopName;
        this.status = status;
        this.deliveryMode = deliveryMode;
        this.totalAmount = totalAmount;
        this.pickupAddress = pickupAddress;
        this.pickupSlot = pickupSlot;
        this.deliverySlot = deliverySlot;
        this.carePreferences = carePreferences != null ? carePreferences : new ArrayList<>();
        this.rejectionReason = rejectionReason;
        this.createdAt = createdAt;
        this.acceptedAt = acceptedAt;
        this.rejectedAt = rejectedAt;
        this.items = items != null ? items : new ArrayList<>();
    }

    public static OrderBuilder builder() {
        return new OrderBuilder();
    }

    public static class OrderBuilder {
        private String id;
        private String customerName;
        private String customerPhone;
        private String customerEmail;
        private String shopId;
        private String shopName;
        private String status;
        private String deliveryMode;
        private Double totalAmount;
        private String pickupAddress;
        private String pickupSlot;
        private String deliverySlot;
        private List<String> carePreferences = new ArrayList<>();
        private String rejectionReason;
        private String createdAt;
        private String acceptedAt;
        private String rejectedAt;
        private List<OrderItem> items = new ArrayList<>();

        public OrderBuilder id(String id) { this.id = id; return this; }
        public OrderBuilder customerName(String customerName) { this.customerName = customerName; return this; }
        public OrderBuilder customerPhone(String customerPhone) { this.customerPhone = customerPhone; return this; }
        public OrderBuilder customerEmail(String customerEmail) { this.customerEmail = customerEmail; return this; }
        public OrderBuilder shopId(String shopId) { this.shopId = shopId; return this; }
        public OrderBuilder shopName(String shopName) { this.shopName = shopName; return this; }
        public OrderBuilder status(String status) { this.status = status; return this; }
        public OrderBuilder deliveryMode(String deliveryMode) { this.deliveryMode = deliveryMode; return this; }
        public OrderBuilder totalAmount(Double totalAmount) { this.totalAmount = totalAmount; return this; }
        public OrderBuilder pickupAddress(String pickupAddress) { this.pickupAddress = pickupAddress; return this; }
        public OrderBuilder pickupSlot(String pickupSlot) { this.pickupSlot = pickupSlot; return this; }
        public OrderBuilder deliverySlot(String deliverySlot) { this.deliverySlot = deliverySlot; return this; }
        public OrderBuilder carePreferences(List<String> carePreferences) { this.carePreferences = carePreferences; return this; }
        public OrderBuilder rejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; return this; }
        public OrderBuilder createdAt(String createdAt) { this.createdAt = createdAt; return this; }
        public OrderBuilder acceptedAt(String acceptedAt) { this.acceptedAt = acceptedAt; return this; }
        public OrderBuilder rejectedAt(String rejectedAt) { this.rejectedAt = rejectedAt; return this; }
        public OrderBuilder items(List<OrderItem> items) { this.items = items; return this; }

        public Order build() {
            return new Order(id, customerName, customerPhone, customerEmail, shopId, shopName, status, deliveryMode, totalAmount, pickupAddress, pickupSlot, deliverySlot, carePreferences, rejectionReason, createdAt, acceptedAt, rejectedAt, items);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

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

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

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

    public String getRejectionReason() { return rejectionReason; }
    public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public String getAcceptedAt() { return acceptedAt; }
    public void setAcceptedAt(String acceptedAt) { this.acceptedAt = acceptedAt; }

    public String getRejectedAt() { return rejectedAt; }
    public void setRejectedAt(String rejectedAt) { this.rejectedAt = rejectedAt; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }
}
