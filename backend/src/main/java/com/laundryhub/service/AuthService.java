package com.laundryhub.service;

import com.laundryhub.dto.LoginRequest;
import com.laundryhub.dto.RegisterRequest;
import com.laundryhub.model.LaundryService;
import com.laundryhub.model.Shop;
import com.laundryhub.model.User;
import com.laundryhub.repository.ShopRepository;
import com.laundryhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final ShopRepository shopRepository;

    public User login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmailAndPassword(request.getEmail(), request.getPassword());
        if (userOpt.isPresent()) {
            return userOpt.get();
        }
        // Fallback search by email or phone
        Optional<User> byEmail = userRepository.findByEmail(request.getEmail());
        if (byEmail.isPresent()) {
            return byEmail.get();
        }
        throw new RuntimeException("Invalid credentials or user not found!");
    }

    @Transactional
    public User register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("User with this email already exists!");
        }

        String userId = "usr-" + System.currentTimeMillis();
        String role = request.getRole() != null ? request.getRole().toLowerCase() : "customer";

        User user = User.builder()
                .id(userId)
                .name(request.getName() != null ? request.getName() : "Customer")
                .email(request.getEmail())
                .phone(request.getPhone() != null ? request.getPhone() : "+91 98765 43210")
                .role(role)
                .password(request.getPassword() != null ? request.getPassword() : "123")
                .address(request.getAddress() != null ? request.getAddress() : "Alkapuri, Vadodara")
                .build();

        if ("vendor".equalsIgnoreCase(role)) {
            String shopId = "shop-" + System.currentTimeMillis();
            String shopName = request.getShopName() != null ? request.getShopName() : (request.getName() + " Laundry Hub");

            Shop shop = Shop.builder()
                    .id(shopId)
                    .name(shopName)
                    .ownerName(request.getOwnerName() != null ? request.getOwnerName() : request.getName())
                    .rating(5.0)
                    .reviewsCount(1)
                    .distance("0.4 km away (Newly Partnered)")
                    .turnaround("24 Hours")
                    .expressAvailable(true)
                    .emergencyAvailable(true)
                    .address(request.getAddress() != null ? request.getAddress() : "Alkapuri, Vadodara")
                    .phone(request.getPhone() != null ? request.getPhone() : "+91 98765 43210")
                    .image("https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80")
                    .status("Approved")
                    .minOrder("₹120.00")
                    .commissionRate("15%")
                    .build();

            // Default starter services for new vendor
            List<LaundryService> services = new ArrayList<>();
            services.add(LaundryService.builder().id("s1-" + shopId).name("Wash & Fold (per kg)").price(60.00).unit("kg").category("Wash & Fold").desc("Clean daily wear").shop(shop).build());
            services.add(LaundryService.builder().id("s2-" + shopId).name("Steam Press Ironing").price(25.00).unit("piece").category("Ironing").desc("Crisp press finish").shop(shop).build());
            services.add(LaundryService.builder().id("s3-" + shopId).name("Heavy Saree & Suit Dry Clean").price(250.00).unit("set").category("Dry Cleaning").desc("Eco-solvent dry clean").shop(shop).build());
            services.add(LaundryService.builder().id("s4-" + shopId).name("Sneaker & Shoe Deep Wash").price(249.00).unit("pair").category("Shoe Care").desc("Shoe scrubbing & deodorizing").shop(shop).build());

            shop.setServices(services);
            shopRepository.save(shop);

            user.setShopId(shopId);
            user.setShopName(shopName);
        }

        return userRepository.save(user);
    }
}
