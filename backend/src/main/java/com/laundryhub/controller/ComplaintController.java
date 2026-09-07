package com.laundryhub.controller;

import com.laundryhub.model.Complaint;
import com.laundryhub.service.ComplaintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ComplaintController {

    private final ComplaintService complaintService;

    @GetMapping
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        return ResponseEntity.ok(complaintService.getAllComplaints());
    }

    @PostMapping
    public ResponseEntity<?> submitComplaint(@RequestBody Complaint complaint) {
        try {
            Complaint created = complaintService.submitComplaint(complaint);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/resolve")
    public ResponseEntity<?> resolveComplaint(@PathVariable String id) {
        try {
            Complaint resolved = complaintService.resolveComplaint(id);
            return ResponseEntity.ok(resolved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
