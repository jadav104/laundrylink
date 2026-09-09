package com.laundryhub.dto;

public class RejectOrderRequest {
    private String reason;
    private String note;

    public RejectOrderRequest() {}

    public RejectOrderRequest(String reason, String note) {
        this.reason = reason;
        this.note = note;
    }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}
