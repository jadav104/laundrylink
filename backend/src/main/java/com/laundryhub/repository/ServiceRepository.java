package com.laundryhub.repository;

import com.laundryhub.model.LaundryService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<LaundryService, String> {
    List<LaundryService> findByShopId(String shopId);
}
