package com.laundryhub.service;

import com.laundryhub.model.Complaint;
import com.laundryhub.repository.ComplaintRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ComplaintServiceTest {

    @Mock
    private ComplaintRepository complaintRepository;

    @InjectMocks
    private ComplaintService complaintService;

    @Test
    void testSubmitComplaint() {
        Complaint complaint = Complaint.builder()
                .customerName("Rohan Gupta")
                .text("Late delivery")
                .build();

        when(complaintRepository.save(any(Complaint.class))).thenAnswer(i -> i.getArgument(0));

        Complaint saved = complaintService.submitComplaint(complaint);
        assertNotNull(saved.getId());
        assertEquals("Open", saved.getStatus());
        assertNotNull(saved.getDate());
    }

    @Test
    void testResolveComplaint() {
        Complaint complaint = Complaint.builder()
                .id("cmp-101")
                .status("Open")
                .build();

        when(complaintRepository.findById("cmp-101")).thenReturn(Optional.of(complaint));
        when(complaintRepository.save(any(Complaint.class))).thenAnswer(i -> i.getArgument(0));

        Complaint resolved = complaintService.resolveComplaint("cmp-101");
        assertEquals("Resolved", resolved.getStatus());
    }
}
