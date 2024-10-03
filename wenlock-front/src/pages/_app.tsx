import React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css'; // Importa estilos do Tailwind

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
