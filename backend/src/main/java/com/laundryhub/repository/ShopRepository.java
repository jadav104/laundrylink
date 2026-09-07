package com.laundryhub.repository;

import com.laundryhub.model.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShopRepository extends JpaRepository<Shop, String> {
    List<Shop> findByStatus(String status);
}
