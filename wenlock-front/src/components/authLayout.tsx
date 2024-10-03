import React from 'react';
interface AuthLayoutProps {
  children: React.ReactNode;
  logoSrc?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, logoSrc }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-terceiro">
      <div className="bg-companyWhite shadow-lg rounded-lg flex max-w-4xl w-full overflow-hidden">
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-10">
          <img
            src={logoSrc || '/logo2.png'}
            alt="Ilustração"
            className="max-w-full h-auto"
          />
        </div>
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
