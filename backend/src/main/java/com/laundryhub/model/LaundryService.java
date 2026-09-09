package com.laundryhub.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "laundry_services")
public class LaundryService {

    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double price;

    private String unit; // kg | piece | pair | set

    private String category; // Wash & Fold | Ironing | Dry Cleaning | Shoe Care

    private String desc;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id")
    @JsonIgnore
    private Shop shop;

    public LaundryService() {}

    public LaundryService(String id, String name, Double price, String unit, String category, String desc, Shop shop) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.unit = unit;
        this.category = category;
        this.desc = desc;
        this.shop = shop;
    }

    public static LaundryServiceBuilder builder() {
        return new LaundryServiceBuilder();
    }

    public static class LaundryServiceBuilder {
        private String id;
        private String name;
        private Double price;
        private String unit;
        private String category;
        private String desc;
        private Shop shop;

        public LaundryServiceBuilder id(String id) { this.id = id; return this; }
        public LaundryServiceBuilder name(String name) { this.name = name; return this; }
        public LaundryServiceBuilder price(Double price) { this.price = price; return this; }
        public LaundryServiceBuilder unit(String unit) { this.unit = unit; return this; }
        public LaundryServiceBuilder category(String category) { this.category = category; return this; }
        public LaundryServiceBuilder desc(String desc) { this.desc = desc; return this; }
        public LaundryServiceBuilder shop(Shop shop) { this.shop = shop; return this; }

        public LaundryService build() {
            return new LaundryService(id, name, price, unit, category, desc, shop);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDesc() { return desc; }
    public void setDesc(String desc) { this.desc = desc; }

    public Shop getShop() { return shop; }
    public void setShop(Shop shop) { this.shop = shop; }

    @Transient
    public String getShopId() {
        return shop != null ? shop.getId() : null;
    }

    @Transient
    public String getShopName() {
        return shop != null ? shop.getName() : null;
    }
}
