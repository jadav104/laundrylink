package com.laundryhub.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
    @Builder.Default
    private List<String> carePreferences = new ArrayList<>();

    @Column(length = 1000)
    private String rejectionReason;

    private String createdAt;

    private String acceptedAt;

    private String rejectedAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Builder.Default
    private List<OrderItem> items = new ArrayList<>();
}
