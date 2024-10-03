// pages/dashboard/cadastroMaterial.tsx

import React from 'react';
import DashboardLayout from '../../components/dashboardLayout';
import UsuariosPage from '@/components/usuariosLayout';
import CadastrarUsuario from '@/components/cadastroUser';

const cadastroUsuarios: React.FC = () => {
  return (
    <DashboardLayout>
     <CadastrarUsuario/>
    </DashboardLayout>
  );
};

export default cadastroUsuarios;
