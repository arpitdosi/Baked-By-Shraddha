import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';

export const AdminPortalModal: React.FC = () => {
  const { isAdminOpen, setIsAdminOpen, isAdminAuthenticated } = useBakery();

  if (!isAdminOpen) return null;

  if (!isAdminAuthenticated) {
    return <AdminLogin onClose={() => setIsAdminOpen(false)} />;
  }

  return <AdminDashboard onClose={() => setIsAdminOpen(false)} />;
};
