import React from 'react';
import EditarUsuario from '@/components/editarUsuarios';
import DashboardLayout from '@/components/dashboardLayout';

const cadastroUsuarios: React.FC = () => {
  return (
    <DashboardLayout>
     <EditarUsuario/>
    </DashboardLayout>
  );
};

export default cadastroUsuarios;
