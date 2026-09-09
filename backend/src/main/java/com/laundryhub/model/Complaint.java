package com.laundryhub.model;

import jakarta.persistence.*;

@Entity
@Table(name = "complaints")
public class Complaint {

    @Id
    private String id;

    @Column(nullable = false)
    private String shopId;

    private String shopName;

    private String customerName;

    @Column(nullable = false, length = 1000)
    private String text;

    private String status; // Open | Resolved

    private String date;

    public Complaint() {}

    public Complaint(String id, String shopId, String shopName, String customerName, String text, String status, String date) {
        this.id = id;
        this.shopId = shopId;
        this.shopName = shopName;
        this.customerName = customerName;
        this.text = text;
        this.status = status;
        this.date = date;
    }

    public static ComplaintBuilder builder() {
        return new ComplaintBuilder();
    }

    public static class ComplaintBuilder {
        private String id;
        private String shopId;
        private String shopName;
        private String customerName;
        private String text;
        private String status;
        private String date;

        public ComplaintBuilder id(String id) { this.id = id; return this; }
        public ComplaintBuilder shopId(String shopId) { this.shopId = shopId; return this; }
        public ComplaintBuilder shopName(String shopName) { this.shopName = shopName; return this; }
        public ComplaintBuilder customerName(String customerName) { this.customerName = customerName; return this; }
        public ComplaintBuilder text(String text) { this.text = text; return this; }
        public ComplaintBuilder status(String status) { this.status = status; return this; }
        public ComplaintBuilder date(String date) { this.date = date; return this; }

        public Complaint build() {
            return new Complaint(id, shopId, shopName, customerName, text, status, date);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getShopId() { return shopId; }
    public void setShopId(String shopId) { this.shopId = shopId; }

    public String getShopName() { return shopName; }
    public void setShopName(String shopName) { this.shopName = shopName; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
}
