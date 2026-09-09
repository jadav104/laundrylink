package com.laundryhub.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "shops")
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
    private List<LaundryService> services = new ArrayList<>();

    @OneToMany(mappedBy = "shop", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<ShopWarning> warnings = new ArrayList<>();

    public Shop() {}

    public Shop(String id, String name, String ownerName, Double rating, Integer reviewsCount, String distance, String turnaround, Boolean expressAvailable, Boolean emergencyAvailable, String address, String phone, String image, String status, String minOrder, String commissionRate, List<LaundryService> services, List<ShopWarning> warnings) {
        this.id = id;
        this.name = name;
        this.ownerName = ownerName;
        this.rating = rating;
        this.reviewsCount = reviewsCount;
        this.distance = distance;
        this.turnaround = turnaround;
        this.expressAvailable = expressAvailable;
        this.emergencyAvailable = emergencyAvailable;
        this.address = address;
        this.phone = phone;
        this.image = image;
        this.status = status;
        this.minOrder = minOrder;
        this.commissionRate = commissionRate;
        this.services = services != null ? services : new ArrayList<>();
        this.warnings = warnings != null ? warnings : new ArrayList<>();
    }

    public static ShopBuilder builder() {
        return new ShopBuilder();
    }

    public static class ShopBuilder {
        private String id;
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
        private String status;
        private String minOrder;
        private String commissionRate;
        private List<LaundryService> services = new ArrayList<>();
        private List<ShopWarning> warnings = new ArrayList<>();

        public ShopBuilder id(String id) { this.id = id; return this; }
        public ShopBuilder name(String name) { this.name = name; return this; }
        public ShopBuilder ownerName(String ownerName) { this.ownerName = ownerName; return this; }
        public ShopBuilder rating(Double rating) { this.rating = rating; return this; }
        public ShopBuilder reviewsCount(Integer reviewsCount) { this.reviewsCount = reviewsCount; return this; }
        public ShopBuilder distance(String distance) { this.distance = distance; return this; }
        public ShopBuilder turnaround(String turnaround) { this.turnaround = turnaround; return this; }
        public ShopBuilder expressAvailable(Boolean expressAvailable) { this.expressAvailable = expressAvailable; return this; }
        public ShopBuilder emergencyAvailable(Boolean emergencyAvailable) { this.emergencyAvailable = emergencyAvailable; return this; }
        public ShopBuilder address(String address) { this.address = address; return this; }
        public ShopBuilder phone(String phone) { this.phone = phone; return this; }
        public ShopBuilder image(String image) { this.image = image; return this; }
        public ShopBuilder status(String status) { this.status = status; return this; }
        public ShopBuilder minOrder(String minOrder) { this.minOrder = minOrder; return this; }
        public ShopBuilder commissionRate(String commissionRate) { this.commissionRate = commissionRate; return this; }
        public ShopBuilder services(List<LaundryService> services) { this.services = services; return this; }
        public ShopBuilder warnings(List<ShopWarning> warnings) { this.warnings = warnings; return this; }

        public Shop build() {
            return new Shop(id, name, ownerName, rating, reviewsCount, distance, turnaround, expressAvailable, emergencyAvailable, address, phone, image, status, minOrder, commissionRate, services, warnings);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getReviewsCount() { return reviewsCount; }
    public void setReviewsCount(Integer reviewsCount) { this.reviewsCount = reviewsCount; }

    public String getDistance() { return distance; }
    public void setDistance(String distance) { this.distance = distance; }

    public String getTurnaround() { return turnaround; }
    public void setTurnaround(String turnaround) { this.turnaround = turnaround; }

    public Boolean getExpressAvailable() { return expressAvailable; }
    public void setExpressAvailable(Boolean expressAvailable) { this.expressAvailable = expressAvailable; }

    public Boolean getEmergencyAvailable() { return emergencyAvailable; }
    public void setEmergencyAvailable(Boolean emergencyAvailable) { this.emergencyAvailable = emergencyAvailable; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getMinOrder() { return minOrder; }
    public void setMinOrder(String minOrder) { this.minOrder = minOrder; }

    public String getCommissionRate() { return commissionRate; }
    public void setCommissionRate(String commissionRate) { this.commissionRate = commissionRate; }

    public List<LaundryService> getServices() { return services; }
    public void setServices(List<LaundryService> services) { this.services = services; }

    public List<ShopWarning> getWarnings() { return warnings; }
    public void setWarnings(List<ShopWarning> warnings) { this.warnings = warnings; }
}
