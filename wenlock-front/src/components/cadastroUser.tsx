import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CadastroUsuario: React.FC = () => {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [errors, setErrors] = useState({
    nome: '',
    email: '',
    matricula: '',
    senha: '',
    repetirSenha: '',
  });

  useEffect(() => {
    validateForm();
  }, [nome, email, matricula, senha, repetirSenha]);

  const validateForm = () => {
    let isValid = true;
    let newErrors = { nome: '', email: '', matricula: '', senha: '', repetirSenha: '' };

    if (!/^[A-Za-z\s]+$/.test(nome) || nome.length > 30) {
      newErrors.nome = 'Nome deve conter apenas letras e no máximo 30 caracteres';
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido';
      isValid = false;
    }

    if (!/^[0-9]+$/.test(matricula) || matricula.length > 10) {
      newErrors.matricula = 'Matrícula deve conter apenas números e no máximo 10 caracteres';
      isValid = false;
    }

    if (senha.length < 6) {
      newErrors.senha = 'Senha deve ter no mínimo 6 caracteres';
      isValid = false;
    }

    if (senha !== repetirSenha) {
      newErrors.repetirSenha = 'As senhas não coincidem';
      isValid = false;
    }

    setErrors(newErrors);
    setIsFormValid(isValid);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'nome':
        setNome(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'matricula':
        setMatricula(value);
        break;
      case 'senha':
        setSenha(value);
        break;
      case 'repetirSenha':
        setRepetirSenha(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      try {
        const response = await fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: nome,
            email,
            registration_number: matricula,
            password: senha,
          }),
        });

        if (response.ok) {
          router.push('/dashboard/usuarios');
        } else {
          setErrorMessage('Erro ao cadastrar usuário. Tente novamente.');
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage('Erro ao cadastrar usuário: ' + error.message);
        } else {
          setErrorMessage('Erro desconhecido ao cadastrar usuário.');
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
        {' > Cadastro de Usuário'}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Cadastro de Usuário</h1>
        </div>

        {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

        <div className="mb-4">
          <div className="text-lg font-bold mb-2">Dados do Usuário</div>
          <hr className="border-gray-400 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Nome completo *</label>
              <input
                type="text"
                name="nome"
                value={nome}
                onChange={handleInputChange}
                className="border rounded-lg w-full px-4 py-2"
                placeholder="Insira o nome completo"
                maxLength={30}
              />
              {errors.nome && <p className="text-sm text-red-600">{errors.nome}</p>}
            </div>
            <div>
              <label className="block mb-1 font-semibold">Matrícula *</label>
              <input
                type="text"
                name="matricula"
                value={matricula}
                onChange={handleInputChange}
                className="border rounded-lg w-full px-4 py-2"
                placeholder="Insira o Nº da matrícula"
                maxLength={10}
              />
              {errors.matricula && <p className="text-sm text-red-600">{errors.matricula}</p>}
            </div>
            <div>
              <label className="block mb-1 font-semibold">E-mail *</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                className="border rounded-lg w-full px-4 py-2"
                placeholder="Insira o e-mail"
                maxLength={40}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
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
                value={senha}
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
              {errors.senha && <p className="text-sm text-red-600">{errors.senha}</p>}
            </div>
            <div className="relative">
              <label className="block mb-1 font-semibold">Repetir Senha *</label>
              <input
                type={showRepeatPassword ? 'text' : 'password'}
                name="repetirSenha"
                value={repetirSenha}
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
              {errors.repetirSenha && <p className="text-sm text-red-600">{errors.repetirSenha}</p>}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 mt-6">
          <button className="bg-gray-200 text-black font-bold py-2 px-4 rounded">
            Cancelar
          </button>
          <button
            className={`py-2 px-4 font-bold rounded ${isFormValid ? 'bg-quarto text-white' : 'bg-gray-200 text-gray-500'}`}
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CadastroUsuario;
