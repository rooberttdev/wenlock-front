// pages/dashboard/cadastroMaterial.tsx

import React from 'react';
import UsuariosPage from '@/components/usuariosLayout';
import CadastrarUsuario from '@/components/cadastroUser';
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
