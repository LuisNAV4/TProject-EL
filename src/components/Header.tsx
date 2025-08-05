import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, User, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthDropdown from './auth/AuthDropdown';
import { useNavigate } from 'react-router-dom';
import { ProductAPI } from '@/services/api';

// Configuración del logo - igual que en CatalogHeader
const CONFIGURACION_LOGO = {
  modo: 'text-only' as 'image-only' | 'text-only' | 'image-and-text', // Cambiar aquí: 'image-only' | 'text-only' | 'image-and-text'
  rutaImagen: '/logo.png', // Ruta de la imagen del logo
  texto: 'TechStore'
};

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Header = ({ cartItemCount, onCartClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<{id: number, nombre: string}[]>([]);
  const navigate = useNavigate();

  // Fetch categories from database
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await ProductAPI.getCategories();
        // Only show first 6 categories
        setCategories(categoriesData.slice(0, 6));
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    
    loadCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    navigate('/products', { state: { selectedCategories: [category] } });
    setIsMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate('/products', { state: { searchTerm: searchTerm.trim() } });
    }
  };

  // Renderizado del logo igual que en CatalogHeader
  const renderizarLogo = () => {
    const clasesLogo = "select-none pointer-events-none";
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
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Buscar smartphones, laptops, accesorios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-[var(--color-bg)] text-[var(--color-text)]"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-[var(--color-muted)]" />
            </form>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Botón de Tickets de Ayuda */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/tickets')}
              className="hidden md:flex items-center space-x-2 text-[var(--color-text)] hover:text-[var(--color-primary)]"
              title="Tickets de Ayuda"
            >
              <HelpCircle className="h-5 w-5" />
              <span className="text-sm">Ayuda</span>
            </Button>
            <AuthDropdown />
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5 text-[var(--color-text)]" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--color-danger)] text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X className="h-5 w-5 text-[var(--color-text)]" /> : <Menu className="h-5 w-5 text-[var(--color-text)]" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block pb-4`}>
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8">
            {/* Botón central solo visible en mobile */}
            {isMenuOpen && (
              <li className="md:hidden flex justify-center mb-2">
                <AuthDropdown />
              </li>
            )}
            {/* Botón de Tickets para móvil */}
            <li className="md:hidden">
              <button
                onClick={() => {
                  navigate('/tickets');
                  setIsMenuOpen(false);
                }}
                className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-200 block py-2 select-none cursor-pointer flex items-center space-x-2"
              >
                <HelpCircle className="h-5 w-5" />
                <span>Tickets de Ayuda</span>
              </button>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => handleCategoryClick(category.nombre)}
                  className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-200 block py-2 md:py-0 select-none cursor-pointer"
                >
                  {category.nombre}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-[var(--color-bg)] text-[var(--color-text)]"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-[var(--color-muted)]" />
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
