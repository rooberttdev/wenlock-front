import React, { useEffect, useState } from 'react';
import Image from 'next/image'; 

const Home: React.FC = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [userName, setUserName] = useState('Usuário');

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName') || 'Milena';
    setUserName(storedUserName);

    const date = new Date();
    const formattedDate = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-gray-100 relative">
      <div className="w-full text-left px-32 py-6">
        <h1 className="text-4xl font-bold text-black">Home</h1>
      </div>
      <div className="flex flex-col items-center justify-center w-10/12 bg-white shadow-md rounded-lg p-10 max-w-5xl">
        <div className="text-left w-full mb-8">
          <h1 className="text-4xl font-bold text-black">Olá {userName}!</h1>
          <p className="text-lg text-gray-500">{currentDate}</p>
        </div>
        <div className="mb-8">
          <Image 
            src="/home.png" 
            alt="Ilustração de Boas-vindas"
            width={400}
            height={300}
            className="mx-auto" 
          />
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold bg-white px-6 py-4 rounded-lg shadow-md border-2" style={{ borderColor: '#272846' }}>
            Bem-vindo ao WenLock!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
