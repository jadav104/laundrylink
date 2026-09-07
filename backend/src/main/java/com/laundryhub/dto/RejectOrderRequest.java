package com.laundryhub.dto;

import lombok.Data;

@Data
public class RejectOrderRequest {
    private String reason;
    private String note;
}
