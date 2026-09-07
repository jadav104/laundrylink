package com.laundryhub.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "shops")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shop {

    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    private String ownerName;

    private Double rating;

    private Integer reviewsCount;

    private String distance;

    private String turnaround;

    private Boolean expressAvailable;

    private Boolean emergencyAvailable;

    private String address;

    private String phone;

    private String image;

    private String status; // Approved | Warning Issued | Delisted

    private String minOrder;

    private String commissionRate;

    @OneToMany(mappedBy = "shop", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Builder.Default
    private List<LaundryService> services = new ArrayList<>();

    @OneToMany(mappedBy = "shop", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Builder.Default
    private List<ShopWarning> warnings = new ArrayList<>();
}
