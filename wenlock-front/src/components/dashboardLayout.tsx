import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [userName, setUserName] = useState('Usuário');
  const [userEmail, setUserEmail] = useState('usuario@email.com'); 
  const [isAccessControlOpen, setIsAccessControlOpen] = useState(false); 
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); 
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); 
  const [showSubMenu, setShowSubMenu] = useState(false); 
  const router = useRouter();

  const isRouteActive = (route: string) => router.pathname === route;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserName = localStorage.getItem('userName') || 'Milena Santana Borges';
      const storedUserEmail = localStorage.getItem('userEmail') || 'milena.santana@empresa.com.br';
      setUserName(storedUserName);
      setUserEmail(storedUserEmail);
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('token');
      router.push('/login');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed); 
    setShowSubMenu(false); 
  };

  const handleAccessControlClick = () => {
    if (isSidebarCollapsed) {
      setShowSubMenu(!showSubMenu); 
    } else {
      setIsAccessControlOpen(!isAccessControlOpen); 
    }
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen); 
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-terceiro opacity-100 min-h-screen flex flex-col justify-between transition-all duration-300 shadow-custom`}>
        <div>
          <div className="flex items-center justify-between p-4">
            <img
              src={isSidebarCollapsed ? "/logo-small.png" : "/logo2.png"}
              alt="Logo"
              className={`transition-all duration-300 ${isSidebarCollapsed ? 'w-8 h-8' : 'max-w-48 h-auto'}`}
            />
            <button onClick={toggleSidebar} className="focus:outline-none">
              <img 
                src={isSidebarCollapsed ? '/icone-menu-direita.png' : '/icone-menu-esquerda.png'} 
                alt="Toggle Sidebar" 
                className="h-6 w-6" 
              />
            </button>
          </div>
          <nav className="mt-10">
            <Link 
              href="/dashboard" 
              className={`flex items-center p-4 ${isRouteActive('/dashboard') ? 'bg-[#00AAC1] text-black' : 'hover:bg-segundo'}`}
            >
              <img src="/home-icon.png" alt="Home" className="h-6 w-6 mr-4" /> 
              {!isSidebarCollapsed && <span className="text-left font-bold text-white">Home</span>}
            </Link>
            <div className="relative">
              <div 
                className={`p-4 flex items-center justify-between cursor-pointer ${
                  isRouteActive('/dashboard/usuarios') && isSidebarCollapsed ? 'bg-[#00AAC1] text-white' : 'hover:bg-segundo'
                }`} 
                onClick={handleAccessControlClick}
              >
                <div className="flex items-center">
                  <img src="/controle-icon.svg" alt="Controle de Acesso" className="h-6 w-6 mr-4" /> 
                  {!isSidebarCollapsed && <span className="text-left font-bold text-white">Controle de Acesso</span>}
                </div>
                <img 
                  src={isAccessControlOpen ? '/pra-baixo.svg' : '/pra-cima.svg'} 
                  alt="Seta" 
                  className="h-4 w-4 ml-2" 
                />
              </div>
              {showSubMenu && isSidebarCollapsed && (
                <div className="absolute left-full top-0 bg-segundo rounded-lg shadow-lg w-48 p-4">
                  <Link 
                    href="/dashboard/usuarios" 
                    className={`block font-bold p-2 ${
                      isRouteActive('/dashboard/usuarios') ? 'bg-[#00AAC1] text-white' : 'hover:bg-terceiro rounded'
                    }`}
                  >
                    Usuários
                  </Link>
                </div>
              )}
              {!isSidebarCollapsed && isAccessControlOpen && (
                <div className="pl-12">
                  <Link 
                    href="/dashboard/usuarios" 
                    className={`flex items-center p-4 ${isRouteActive('/dashboard/usuarios') ? 'bg-[#00AAC1] text-white' : 'hover:bg-segundo'}`}
                  >
                    <img src="/usuarios-icon.svg" alt="Usuários" className="h-6 w-6 mr-4" /> 
                    <span className="text-left font-bold">Usuários</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        <footer className={`p-4 text-left text-xs text-gray-400 ${isSidebarCollapsed ? 'text-center' : ''}`}>
          {!isSidebarCollapsed && (
            <>
              <p className="font-bold text-lg leading-10 text-white opacity-100 tracking-normal">© WenLock</p>
              <p className="text-segundo">Power by Conecthus</p>
              <p className="text-segundo">V 0.0.0</p>
            </>
          )}
          {isSidebarCollapsed && <p className="text-white">V 0.0.0</p>} 
        </footer>
      </aside>
      <main className="flex-1 bg-gray-100 relative">
        <header className="flex justify-between items-center p-6 bg-white text-black">
          <div className="text-2xl font-bold"></div>
          <div className="relative">
            <button onClick={toggleProfileMenu} className="focus:outline-none">
              <div className="bg-terceiro h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                {userName.split(' ').map((n) => n[0]).join('')} {/* Exibe as iniciais */}
              </div>
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 z-10">
                <div className="flex items-center mb-2">
                  <div className="bg-terceiro h-8 w-8 rounded-full flex items-center justify-center text-white font-bold">
                    {userName.split(' ').map((n) => n[0]).join('')} 
                  </div>
                  <div className="ml-2">
                    <p className="font-bold text-xs text-quarto break-words">{userName}</p>
                    <p className="text-[10px] text-gray-500 break-words">{userEmail}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="flex items-center text-quarto font-bold hover:text-tertiary">
                  <img src="/logout.png" alt="Sair" className="h-4 w-4 mr-2" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </header>

        <div>{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
