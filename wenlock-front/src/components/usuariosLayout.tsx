import React, { useEffect, useState } from 'react';
import Link from 'next/link'; 
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { fetchUsers as apiFetchUsers, deleteUser } from '@/api/api'; 
import Loader from './loader';

interface User {
  id: number;
  name: string;
  email: string;
  registration_number: string;
}

const UsuariosPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); 
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [userToDelete, setUserToDelete] = useState<User | null>(null); 

  const fetchUsers = async () => {
      const data = await apiFetchUsers();
      setUsers(data); 
      setFilteredUsers(data); 
      setIsLoading(false);
    
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const openDeleteModal = (user: User) => {
    setUserToDelete(user);
    setIsModalVisible(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete.id);
        setUsers(users.filter((user) => user.id !== userToDelete.id)); 
        setFilteredUsers(filteredUsers.filter((user) => user.id !== userToDelete.id)); 
      } catch (error) {
        console.error('Erro ao deletar o usuário');
        toast.error('Erro ao excluir o usuário.'); 
      }
    }
    closeDeleteModal();
  };



  const closeDeleteModal = () => {
    setIsModalVisible(false);
    setUserToDelete(null);
  };


  const handleView = (user: User) => {
    setSelectedUser(user);
    setIsSidebarVisible(true); 
    document.body.style.overflow = 'hidden';
  };


  const closeSidebar = () => {
    setIsSidebarVisible(false);
    setSelectedUser(null);
    document.body.style.overflow = 'auto'; 
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return <Loader/>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 relative">
      <div className="text-4xl font-bold text-black p-4">
        <h1>Usuários</h1>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4 ">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="🔍 Pesquisa"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)} 
              className="border rounded-lg px-4 py-2 w-64"
            />
          </div>
          <Link href="/dashboard/cadastrar-usuario" className="bg-quarto hover:bg-tertiary-dark text-white font-bold py-2 px-6 rounded">
            + Cadastrar Usuário
          </Link>
        </div>
        {filteredUsers.length === 0 && searchTerm.trim() === '' ? (
          <div className="text-center text-gray-500">
            <img src="/pesquisa.png" alt="Nenhum resultado encontrado" className="mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Nenhum Usuário Registrado</h2>
            <p className="text-sm">
              Clique em "Cadastrar Usuário" para começar a cadastrar.
            </p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center text-gray-500">
            <img src="/pesquisa.png" alt="Nenhum resultado encontrado" className="mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Nenhum Resultado Encontrado</h2>
            <p className="text-sm">
              Não foi possível achar nenhum resultado para sua busca. Tente refazer a pesquisa.
            </p>
          </div>
        ) : (
          <div>
            <table className="min-w-full table-auto">
              <thead className="bg-terceiro ">
                <tr>
                  <th className="px-4 py-2 text-left text-white">Nome</th>
                  <th className="px-4 py-2 text-right text-white">Ações</th>
                </tr>
              </thead>
              <tbody className="shadow-md">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2 text-right">
                      <button className="mr-2" onClick={() => handleView(user)}>
                        <img src="/visualizar.png" alt="Visualizar" className="inline-block h-6 w-6" />
                      </button>
                      <Link href={`/dashboard/editar-usuario?id=${user.id}`} className="mr-2">
                        <img src="/editar.png" alt="Editar" className="inline-block h-6 w-6" />
                      </Link>
                      <button onClick={() => openDeleteModal(user)}>
                        <img src="/deletar.png" alt="Deletar" className="inline-block h-6 w-6" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-8">
          <div className="flex justify-between items-center">
            <span className="text-sm">Total de Itens: {filteredUsers.length}</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Itens por página</span>
              <select className="border rounded-lg px-2 py-1">
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="50">50</option>
              </select>
              <div className="flex items-center space-x-2">
                <button className="px-2">{"<"}</button>
                <span className="text-sm">1</span>
                <button className="px-2">{">"}</button>
              </div>
              <span className="text-sm">de 10</span>
            </div>
          </div>
        </div>
      </div>

      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirmação de Exclusão</h2>
            <p>Você tem certeza que deseja excluir o usuário <strong>{userToDelete?.name}</strong>?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                Confirmar
              </button>
              <button onClick={closeDeleteModal} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {isSidebarVisible && selectedUser && (
        <div
          className="fixed top-0 right-0 h-full bg-white shadow-lg p-6 z-50"
          style={{
            width: '614px',
            boxShadow: '-7px 0px 27px #0000001A',
            borderRadius: '6px 0px 0px 6px',
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Visualizar Usuário</h2>
            <button onClick={closeSidebar}>✖</button>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold">Dados do Usuário</h3>
            <hr className="my-4" />
            <p><strong>Nome:</strong> {selectedUser.name}</p>
            <p><strong>Matrícula:</strong> {selectedUser.registration_number}</p>
            <p><strong>E-mail:</strong> {selectedUser.email}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold">Detalhes</h3>
            <hr className="my-4" />
            <p><strong>Data de criação:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Última edição:</strong> Nenhuma</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsuariosPage;
