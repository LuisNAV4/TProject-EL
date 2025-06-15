
import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropiedadesCatalogHeader {
  contadorArticulosCarrito: number;
  alClicCarrito: () => void;
}

// Configuración del logo - aquí puedes cambiar entre las 3 opciones
const CONFIGURACION_LOGO = {
  modo: 'text-only' as 'image-only' | 'text-only' | 'image-and-text', // Cambiar aquí: 'image-only' | 'text-only' | 'image-and-text'
  rutaImagen: '/logo.png', // Ruta de la imagen del logo
  texto: 'TechStore'
};

const CatalogHeader = ({ contadorArticulosCarrito, alClicCarrito }: PropiedadesCatalogHeader) => {
  const [menuAbierto, establecerMenuAbierto] = useState(false);

  const renderizarLogo = () => {
    const clasesLogo = "select-none pointer-events-none"; // Hace que no se pueda seleccionar como texto
    
    switch (CONFIGURACION_LOGO.modo) {
      case 'image-only':
        return (
          <img 
            src={CONFIGURACION_LOGO.rutaImagen} 
            alt="TechStore" 
            className={`h-8 w-auto ${clasesLogo}`}
            draggable={false}
          />
        );
      case 'text-only':
        return (
          <h1 className={`text-2xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent ${clasesLogo}`}>
            {CONFIGURACION_LOGO.texto}
          </h1>
        );
      case 'image-and-text':
        return (
          <div className={`flex items-center space-x-3 ${clasesLogo}`}>
            <img 
              src={CONFIGURACION_LOGO.rutaImagen} 
              alt="TechStore" 
              className="h-8 w-auto"
              draggable={false}
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
              {CONFIGURACION_LOGO.texto}
            </h1>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <header className="bg-[var(--color-bg)] shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <div onClick={() => window.location.href = '/'} className="cursor-pointer">
              {renderizarLogo()}
            </div>
          </div>

          {/* Search bar - desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar smartphones, laptops, accesorios..."
                className="w-full px-4 py-2 pl-10 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-[var(--color-bg)] text-[var(--color-text)]"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-[var(--color-muted)]" />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex text-[var(--color-text)]">
              <User className="h-5 w-5 mr-2" />
              Mi Cuenta
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={alClicCarrito}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5 text-[var(--color-text)]" />
              {contadorArticulosCarrito > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--color-danger)] text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {contadorArticulosCarrito}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => establecerMenuAbierto(!menuAbierto)}
              className="md:hidden"
            >
              {menuAbierto ? <X className="h-5 w-5 text-[var(--color-text)]" /> : <Menu className="h-5 w-5 text-[var(--color-text)]" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuAbierto && (
          <div className="md:hidden pb-4">
            {/* Botón de Mi Cuenta en móvil */}
            <div className="flex justify-center mb-4">
              <button className="w-full flex items-center justify-center bg-[var(--color-primary)] text-white font-semibold rounded-lg py-2 transition-colors duration-200">
                <User className="h-5 w-5 mr-2" />
                Iniciar sesión
              </button>
            </div>

            {/* Mobile search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full px-4 py-2 pl-10 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-[var(--color-bg)] text-[var(--color-text)]"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-[var(--color-muted)]" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default CatalogHeader;

