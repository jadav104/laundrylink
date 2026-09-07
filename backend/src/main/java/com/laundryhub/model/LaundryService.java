package com.laundryhub.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "laundry_services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

    @Transient
    public String getShopId() {
        return shop != null ? shop.getId() : null;
    }

    @Transient
    public String getShopName() {
        return shop != null ? shop.getName() : null;
    }
}
