package com.laundryhub.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String role; // customer | vendor
    private String name;
    private String email;
    private String phone;
    private String address;
    private String password;

    // Vendor specific fields
    private String shopName;
    private String ownerName;
}
