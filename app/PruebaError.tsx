// En alguna otra parte de tu código donde quieras mostrar la pantalla de error
import React from 'react';
import ErrorConexion from '../ui/components/ErrorConexion';

const SomeComponent = () => {
  const handleRetry = () => {
    // Lógica para reintentar
    console.log("Reintentando...");
  };

  return <ErrorConexion onRetry={handleRetry} />;
};

export default SomeComponent;
