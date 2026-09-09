package com.laundryhub.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String phone;

    @Column(nullable = false)
    private String role; // customer | vendor | admin

    private String password;

    private String address;

    private String shopId;

    private String shopName;

    public User() {}

    public User(String id, String name, String email, String phone, String role, String password, String address, String shopId, String shopName) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.password = password;
        this.address = address;
        this.shopId = shopId;
        this.shopName = shopName;
    }

    public static UserBuilder builder() {
        return new UserBuilder();
    }

    public static class UserBuilder {
        private String id;
        private String name;
        private String email;
        private String phone;
        private String role;
        private String password;
        private String address;
        private String shopId;
        private String shopName;

        public UserBuilder id(String id) { this.id = id; return this; }
        public UserBuilder name(String name) { this.name = name; return this; }
        public UserBuilder email(String email) { this.email = email; return this; }
        public UserBuilder phone(String phone) { this.phone = phone; return this; }
        public UserBuilder role(String role) { this.role = role; return this; }
        public UserBuilder password(String password) { this.password = password; return this; }
        public UserBuilder address(String address) { this.address = address; return this; }
        public UserBuilder shopId(String shopId) { this.shopId = shopId; return this; }
        public UserBuilder shopName(String shopName) { this.shopName = shopName; return this; }

        public User build() {
            return new User(id, name, email, phone, role, password, address, shopId, shopName);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getShopId() { return shopId; }
    public void setShopId(String shopId) { this.shopId = shopId; }

    public String getShopName() { return shopName; }
    public void setShopName(String shopName) { this.shopName = shopName; }
}
