package com.laundryhub.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "complaints")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
}
