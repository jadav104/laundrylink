import React from 'react';

export const StatusBadge = ({ status }) => {
  let badgeClass = 'badge-pending';
  if (status === 'In Washing' || status === 'Processing') badgeClass = 'badge-processing';
  if (status === 'Ready' || status === 'Out for Delivery') badgeClass = 'badge-ready';
  if (status === 'Completed' || status === 'Delivered' || status === 'Approved') badgeClass = 'badge-completed';

  return <span className={`badge ${badgeClass}`}>{status}</span>;
};
