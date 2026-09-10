package com.laundryhub.service;

import com.laundryhub.model.Complaint;
import com.laundryhub.repository.ComplaintRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;

    public ComplaintService(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @Transactional
    public Complaint submitComplaint(Complaint complaint) {
        if (complaint.getId() == null) {
            complaint.setId("cmp-" + System.currentTimeMillis());
        }
        if (complaint.getStatus() == null) {
            complaint.setStatus("Open");
        }
        if (complaint.getDate() == null) {
            complaint.setDate(LocalDate.now().toString());
        }
        return complaintRepository.save(complaint);
    }

    @Transactional
    public Complaint resolveComplaint(String id) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found with ID: " + id));

        complaint.setStatus("Resolved");
        return complaintRepository.save(complaint);
    }
}
