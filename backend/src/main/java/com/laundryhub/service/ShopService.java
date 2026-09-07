package com.laundryhub.service;

import com.laundryhub.model.LaundryService;
import com.laundryhub.model.Shop;
import com.laundryhub.model.ShopWarning;
import com.laundryhub.repository.ServiceRepository;
import com.laundryhub.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShopService {

    private final ShopRepository shopRepository;
    private final ServiceRepository serviceRepository;

    public List<Shop> getAllShops() {
        return shopRepository.findAll();
    }

    public List<Shop> getApprovedShops() {
        return shopRepository.findAll().stream()
                .filter(s -> !"Delisted".equalsIgnoreCase(s.getStatus()))
                .toList();
    }

    public Optional<Shop> getShopById(String id) {
        return shopRepository.findById(id);
    }

    @Transactional
    public Shop updateShopStatus(String id, String status) {
        Shop shop = shopRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shop not found with ID: " + id));
        shop.setStatus(status);
        return shopRepository.save(shop);
    }

    @Transactional
    public Shop issueWarning(String shopId, String reason) {
        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new RuntimeException("Shop not found with ID: " + shopId));

        ShopWarning warning = ShopWarning.builder()
                .id("warn-" + System.currentTimeMillis())
                .reason(reason)
                .date(LocalDate.now().toString())
                .shop(shop)
                .build();

        if (shop.getWarnings() == null) {
            shop.setWarnings(List.of(warning));
        } else {
            shop.getWarnings().add(warning);
        }
        shop.setStatus("Warning Issued");
        return shopRepository.save(shop);
    }

    @Transactional
    public LaundryService addServiceToShop(String shopId, LaundryService service) {
        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new RuntimeException("Shop not found with ID: " + shopId));

        service.setId("svc-" + System.currentTimeMillis());
        service.setShop(shop);
        return serviceRepository.save(service);
    }
}
