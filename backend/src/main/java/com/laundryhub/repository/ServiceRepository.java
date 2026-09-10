package com.laundryhub.repository;

import com.laundryhub.model.LaundryService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<LaundryService, String> {
    @Query("SELECT s FROM LaundryService s WHERE s.shop.id = :shopId")
    List<LaundryService> findByShopId(@Param("shopId") String shopId);
}
