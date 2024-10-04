import React from 'react';
import DashboardLayout from '../components/dashboardLayout';
import Home from '@/components/homeLayout';

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
    <Home/>
    </DashboardLayout>
  );
};

export default Dashboard;
