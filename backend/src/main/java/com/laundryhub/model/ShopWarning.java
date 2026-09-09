package com.laundryhub.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "shop_warnings")
public class ShopWarning {

    @Id
    private String id;

    @Column(nullable = false, length = 1000)
    private String reason;

    private String date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id")
    @JsonIgnore
    private Shop shop;

    public ShopWarning() {}

    public ShopWarning(String id, String reason, String date, Shop shop) {
        this.id = id;
        this.reason = reason;
        this.date = date;
        this.shop = shop;
    }

    public static ShopWarningBuilder builder() {
        return new ShopWarningBuilder();
    }

    public static class ShopWarningBuilder {
        private String id;
        private String reason;
        private String date;
        private Shop shop;

        public ShopWarningBuilder id(String id) { this.id = id; return this; }
        public ShopWarningBuilder reason(String reason) { this.reason = reason; return this; }
        public ShopWarningBuilder date(String date) { this.date = date; return this; }
        public ShopWarningBuilder shop(Shop shop) { this.shop = shop; return this; }

        public ShopWarning build() {
            return new ShopWarning(id, reason, date, shop);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public Shop getShop() { return shop; }
    public void setShop(Shop shop) { this.shop = shop; }
}
