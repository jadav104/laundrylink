package com.laundryhub.config;

import com.laundryhub.model.*;
import com.laundryhub.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ShopRepository shopRepository;
    private final OrderRepository orderRepository;
    private final ComplaintRepository complaintRepository;

    public DataSeeder(UserRepository userRepository, ShopRepository shopRepository, OrderRepository orderRepository, ComplaintRepository complaintRepository) {
        this.userRepository = userRepository;
        this.shopRepository = shopRepository;
        this.orderRepository = orderRepository;
        this.complaintRepository = complaintRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            return; // Data already seeded
        }

        // Seed Users
        userRepository.save(User.builder().id("usr-1").name("Priya Patel").email("priya@example.in").phone("+91 98765 43210").role("customer").password("123").address("Flat 302, Royal Residency, Alkapuri, Vadodara").build());
        userRepository.save(User.builder().id("usr-jadav").name("Jadav Laundry Provider").email("jadav@laundryhub.in").phone("+91 98980 12345").role("vendor").password("123").address("Jadav Express Hub, Alkapuri Main Road, Vadodara").shopId("shop-jadav").shopName("Jadav Laundry & Dry Cleaning Services").build());
        userRepository.save(User.builder().id("usr-2").name("Rajesh Patel").email("vendor@laundryhub.in").phone("+91 98250 12345").role("vendor").password("123").address("RC Dutt Road, Alkapuri, Vadodara").shopId("shop-1").shopName("Bandbox Dry Cleaners & Laundry").build());
        userRepository.save(User.builder().id("usr-3").name("Platform Super Admin").email("admin@laundryhub.in").phone("+91 99000 00000").role("admin").password("admin123").address("Vadodara Headquarters").build());

        // Seed Jadav Shop with Services
        Shop shopJadav = Shop.builder()
                .id("shop-jadav")
                .name("Jadav Laundry & Dry Cleaning Services")
                .ownerName("Jadav Laundry Provider")
                .rating(5.0)
                .reviewsCount(48)
                .distance("0.3 km away (Nearest)")
                .turnaround("24 Hours Express")
                .expressAvailable(true)
                .emergencyAvailable(true)
                .address("Jadav Express Hub, Alkapuri Main Road, Vadodara")
                .phone("+91 98980 12345")
                .image("https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80")
                .status("Approved")
                .minOrder("₹120.00")
                .commissionRate("15%")
                .build();

        List<LaundryService> jadavServices = new ArrayList<>();
        jadavServices.add(LaundryService.builder().id("sj-1").name("Wash & Fold (per kg)").price(60.00).unit("kg").category("Wash & Fold").desc("Clean daily wear").shop(shopJadav).build());
        jadavServices.add(LaundryService.builder().id("sj-2").name("Shirt & Kurta Steam Press").price(20.00).unit("piece").category("Ironing").desc("Crisp precision steam press").shop(shopJadav).build());
        jadavServices.add(LaundryService.builder().id("sj-3").name("Heavy Suit & Saree Dry Clean").price(240.00).unit("set").category("Dry Cleaning").desc("Eco-solvent dry clean").shop(shopJadav).build());
        jadavServices.add(LaundryService.builder().id("sj-4").name("Sneaker & Shoe Deep Cleansing").price(249.00).unit("pair").category("Shoe Care").desc("Shoe scrubbing & deodorizing").shop(shopJadav).build());
        shopJadav.setServices(jadavServices);
        shopRepository.save(shopJadav);

        // Seed Shops with Services
        Shop shop1 = Shop.builder()
                .id("shop-1")
                .name("Bandbox Dry Cleaners & Laundry")
                .ownerName("Rajesh Patel")
                .rating(4.9)
                .reviewsCount(142)
                .distance("0.8 km away")
                .turnaround("24-48 Hours")
                .expressAvailable(true)
                .emergencyAvailable(true)
                .address("RC Dutt Road, Alkapuri, Vadodara")
                .phone("+91 98250 12345")
                .image("https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80")
                .status("Approved")
                .minOrder("₹150.00")
                .commissionRate("15%")
                .build();

        List<LaundryService> s1Services = new ArrayList<>();
        s1Services.add(LaundryService.builder().id("s1-1").name("Wash & Fold (per kg)").price(65.00).unit("kg").category("Wash & Fold").desc("Quality detergent & neat folding").shop(shop1).build());
        s1Services.add(LaundryService.builder().id("s1-2").name("Steam Press Ironing").price(20.00).unit("piece").category("Ironing").desc("Professional crisp steam press").shop(shop1).build());
        s1Services.add(LaundryService.builder().id("s1-3").name("Premium Silk Saree Dry Clean").price(299.00).unit("piece").category("Dry Cleaning").desc("Gentle eco-solvent care").shop(shop1).build());
        shop1.setServices(s1Services);
        shopRepository.save(shop1);

        Shop shop2 = Shop.builder()
                .id("shop-2")
                .name("White Tiger Laundry & Shoe Spa")
                .ownerName("Suresh Shah")
                .rating(4.8)
                .reviewsCount(98)
                .distance("1.2 km away")
                .turnaround("24 Hours")
                .expressAvailable(true)
                .emergencyAvailable(true)
                .address("Opp Centurion Mall, OP Road, Vadodara")
                .phone("+91 98980 54321")
                .image("https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80")
                .status("Approved")
                .minOrder("₹200.00")
                .commissionRate("15%")
                .build();

        List<LaundryService> s2Services = new ArrayList<>();
        s2Services.add(LaundryService.builder().id("s2-1").name("Wash & Iron Package").price(85.00).unit("kg").category("Wash & Iron").desc("Complete wash & press care").shop(shop2).build());
        s2Services.add(LaundryService.builder().id("s2-2").name("Sneaker & Shoe Deep Scrub").price(249.00).unit("pair").category("Shoe Care").desc("Foam cleansing & UV sanitization").shop(shop2).build());
        shop2.setServices(s2Services);
        shopRepository.save(shop2);

        // Seed Sample Orders
        Order order1 = Order.builder()
                .id("ORD-8921")
                .customerName("Priya Patel")
                .customerPhone("+91 98765 43210")
                .customerEmail("priya@example.in")
                .shopId("shop-1")
                .shopName("Bandbox Dry Cleaners & Laundry")
                .status("Order Placed")
                .deliveryMode("emergency")
                .totalAmount(449.00)
                .pickupAddress("Flat 302, Royal Residency, Alkapuri, Vadodara")
                .pickupSlot("Today, 2:00 PM")
                .deliverySlot("Today (In 3 Hours Rush)")
                .createdAt("10:30 AM")
                .carePreferences(List.of("Fragrance-Free Detergent", "Gentle Cycle"))
                .build();

        OrderItem item1 = OrderItem.builder().name("Wash & Fold (per kg)").qty(3).unit("kg").price(65.00).order(order1).build();
        OrderItem item2 = OrderItem.builder().name("Premium Silk Saree Dry Clean").qty(1).unit("piece").price(299.00).order(order1).build();
        order1.setItems(List.of(item1, item2));
        orderRepository.save(order1);

        // Seed Sample Complaints
        complaintRepository.save(Complaint.builder()
                .id("cmp-101")
                .shopId("shop-1")
                .shopName("Bandbox Dry Cleaners & Laundry")
                .customerName("Anita Desai")
                .text("Button missing on formal shirt delivered yesterday.")
                .status("Open")
                .date("2026-09-06")
                .build());

        System.out.println("✅ DataSeeder initialized database with demo users, Vadodara shops, services, and live orders!");
    }
}
