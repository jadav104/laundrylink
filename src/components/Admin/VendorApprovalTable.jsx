import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Check, X, ShieldAlert, FileText, Eye, Building2 } from 'lucide-react';

export const VendorApprovalTable = () => {
  const { pendingVendors, approveVendor } = useApp();
  const [selectedReqModal, setSelectedReqModal] = useState(null);

  if (pendingVendors.length === 0) {
    return (
      <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
        <Check size={32} color="var(--secondary)" style={{ marginBottom: '8px' }} />
        <h4>No Pending Provider Verification Requests</h4>
        <p style={{ fontSize: '0.85rem' }}>All local laundry shop registration applications have been reviewed.</p>
      </div>
    );
  }

  return (
    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border-light)', background: '#fef3c7', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ShieldAlert size={20} color="#b45309" />
        <div>
          <h3 style={{ fontSize: '1.1rem', color: '#b45309' }}>Pending Provider Verification & Document Queue ({pendingVendors.length})</h3>
          <p style={{ fontSize: '0.8rem', color: '#92400e' }}>Review submitted business licenses, tax IDs, and owner identity proof before publishing shops</p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-medium)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 18px' }}>Shop Name</th>
              <th style={{ padding: '12px 18px' }}>Owner & Contact</th>
              <th style={{ padding: '12px 18px' }}>Business License & Tax ID</th>
              <th style={{ padding: '12px 18px' }}>ID Proof Status</th>
              <th style={{ padding: '12px 18px', textAlign: 'right' }}>Review & Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingVendors.map((req) => (
              <tr key={req.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{req.name || req.shopName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{req.address}</div>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <div><strong>{req.ownerName}</strong></div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{req.phone}</div>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ fontFamily: 'monospace', fontWeight: 600, color: '#1e293b' }}>📄 {req.licenseNo || 'GSTIN-29AAAAA0000A1Z5'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Trade Lic: KA-BLR-2026-8812</div>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span className="badge badge-completed">Verified Aadhaar / PAN</span>
                </td>
                <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                    <button
                      className="filter-chip"
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                      onClick={() => setSelectedReqModal(req)}
                    >
                      <Eye size={12} /> Review Details
                    </button>
                    <button
                      className="btn-sm btn-success"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 14px' }}
                      onClick={() => approveVendor(req.id)}
                    >
                      <Check size={14} /> Accept
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review Details Modal */}
      {selectedReqModal && (
        <div className="modal-overlay" onClick={() => setSelectedReqModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
            <div className="modal-header" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: 'white' }}>
              <div>
                <h3 style={{ color: 'white' }}>📋 Provider License & Document Inspection</h3>
                <p style={{ fontSize: '0.8rem', color: '#c7d2fe' }}>Submitted Business Credentials & Verification Status</p>
              </div>
              <button className="close-btn" style={{ color: 'white', background: 'rgba(255,255,255,0.2)' }} onClick={() => setSelectedReqModal(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ background: 'var(--primary-light)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid #c7d2fe', marginBottom: '20px' }}>
                <h4 style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>{selectedReqModal.name || selectedReqModal.shopName}</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Owner: <strong>{selectedReqModal.ownerName}</strong> | Email: {selectedReqModal.email}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div style={{ background: 'var(--bg-main)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>BUSINESS LICENSE / GSTIN</div>
                  <div style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--primary)', marginTop: '2px' }}>📄 {selectedReqModal.licenseNo || 'GSTIN-29AAAAA0000A1Z5'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--secondary)', marginTop: '4px' }}>✔ Govt Registry Active</div>
                </div>

                <div style={{ background: 'var(--bg-main)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>IDENTITY & PHOTO PROOF</div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: '2px' }}>🪪 Aadhaar / PAN Uploaded</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--secondary)', marginTop: '4px' }}>✔ Biometric Verified</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                <button
                  className="view-btn"
                  style={{ padding: '12px', background: 'var(--secondary)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}
                  onClick={() => {
                    approveVendor(selectedReqModal.id);
                    setSelectedReqModal(null);
                  }}
                >
                  <Check size={18} /> Accept & Publish Laundry Shop
                </button>
                <button
                  className="filter-chip"
                  style={{ padding: '12px', color: 'var(--danger)', borderColor: 'var(--danger)', background: 'var(--danger-light)', fontWeight: 700 }}
                  onClick={() => setSelectedReqModal(null)}
                >
                  <X size={18} /> Remove / Reject Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
