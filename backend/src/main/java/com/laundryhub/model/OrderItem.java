package com.laundryhub.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private Integer qty;

    private String unit;

    private Double price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;

    public OrderItem() {}

    public OrderItem(Long id, String name, Integer qty, String unit, Double price, Order order) {
        this.id = id;
        this.name = name;
        this.qty = qty;
        this.unit = unit;
        this.price = price;
        this.order = order;
    }

    public static OrderItemBuilder builder() {
        return new OrderItemBuilder();
    }

    public static class OrderItemBuilder {
        private Long id;
        private String name;
        private Integer qty;
        private String unit;
        private Double price;
        private Order order;

        public OrderItemBuilder id(Long id) { this.id = id; return this; }
        public OrderItemBuilder name(String name) { this.name = name; return this; }
        public OrderItemBuilder qty(Integer qty) { this.qty = qty; return this; }
        public OrderItemBuilder unit(String unit) { this.unit = unit; return this; }
        public OrderItemBuilder price(Double price) { this.price = price; return this; }
        public OrderItemBuilder order(Order order) { this.order = order; return this; }

        public OrderItem build() {
            return new OrderItem(id, name, qty, unit, price, order);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getQty() { return qty; }
    public void setQty(Integer qty) { this.qty = qty; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
}
