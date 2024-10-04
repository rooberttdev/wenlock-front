import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { fetchUserById, updateUser } from '@/api/api';

const EditarUsuario: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; 
  const userId = Array.isArray(id) ? id[0] : id;

  const [user, setUser] = useState({
    nome: '',
    email: '',
    matricula: '',
    senha: '',
    repetirSenha: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    if (userId) {
      const loadUserData = async () => {
        try {
          const userData = await fetchUserById(userId);
          setUser({
            nome: userData.name, 
            email: userData.email, 
            matricula: userData.registration_number, 
            senha: '', 
            repetirSenha: '', 
          });
        } catch (error) {
          console.error('Erro ao carregar os dados do usuário:', error);
          setErrorMessage('Erro ao carregar os dados do usuário.');
        }
      };
      loadUserData();
    }
  }, [userId]);

  useEffect(() => {
    const validateForm = () => {
      let isValid = true;

      if (!user.nome || !user.email || !user.matricula) {
        isValid = false;
      }
      if (user.senha && user.senha !== user.repetirSenha) {
        isValid = false;
        setErrorMessage('As senhas não coincidem.');
      } else {
        setErrorMessage('');
      }

      setIsFormValid(isValid);
    };
    validateForm();
  }, [user.senha, user.repetirSenha, user.nome, user.email, user.matricula]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (isFormValid &&  userId) {
      try {
        await updateUser(userId, {
          name: user.nome,
          email: user.email,
          registration_number: user.matricula,
          password: user.senha,
        });
        router.push('/dashboard/usuarios');
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage('Erro ao atualizar usuário: ' + error.message);
        } else {
          setErrorMessage('Erro desconhecido ao atualizar usuário.');
        }
      }
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/dashboard/usuarios" legacyBehavior>
          <a className="text-blue-600 hover:underline">Usuários</a>
        </Link>
        {' > Editar Usuário'}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Editar Usuário</h1>
        </div>
        {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
        <div className="mb-4">
          <div className="text-lg font-bold mb-2">Dados do Usuário</div>
          <hr className="border-gray-400 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Nome Completo *</label>
              <input
                type="text"
                name="nome"
                value={user.nome}
                onChange={handleInputChange}
                className="border rounded-lg w-full px-4 py-2"
                placeholder="Insira o nome completo"
                maxLength={30}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Matrícula *</label>
              <input
                type="text"
                name="matricula"
                value={user.matricula}
                onChange={handleInputChange}
                className="border rounded-lg w-full px-4 py-2"
                placeholder="Insira o Nº da matrícula"
                maxLength={10}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">E-mail *</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="border rounded-lg w-full px-4 py-2"
                placeholder="Insira o e-mail"
                maxLength={40}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-lg font-bold mb-2">Dados de Acesso</div>
          <hr className="border-gray-400 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block mb-1 font-semibold">Senha *</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="senha"
                value={user.senha}
                onChange={handleInputChange}
                className="border rounded-lg w-full px-4 py-2"
                placeholder="Senha"
              />
              <button
                type="button"
                className="absolute right-3 top-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <div className="relative">
              <label className="block mb-1 font-semibold">Repetir Senha *</label>
              <input
                type={showRepeatPassword ? 'text' : 'password'}
                name="repetirSenha"
                value={user.repetirSenha}
                onChange={handleInputChange}
                className="border rounded-lg w-full px-4 py-2"
                placeholder="Repita a senha"
              />
              <button
                type="button"
                className="absolute right-3 top-10"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              >
                {showRepeatPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            className="bg-gray-200 text-black font-bold py-2 px-4 rounded"
            onClick={() => router.push('/dashboard/usuarios')}
          >
            Cancelar
          </button>
          <button
            className={`py-2 px-4 font-bold rounded ${isFormValid ? 'bg-quarto text-white' : 'bg-gray-200 text-gray-500'}`}
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarUsuario;
