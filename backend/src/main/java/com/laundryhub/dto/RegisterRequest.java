package com.laundryhub.dto;

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

    public RegisterRequest() {}

    public RegisterRequest(String role, String name, String email, String phone, String address, String password, String shopName, String ownerName) {
        this.role = role;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.password = password;
        this.shopName = shopName;
        this.ownerName = ownerName;
    }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getShopName() { return shopName; }
    public void setShopName(String shopName) { this.shopName = shopName; }

    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }
}
