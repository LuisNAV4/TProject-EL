import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Header = ({ cartItemCount, onCartClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    'Smartphones',
    'Laptops',
    'Audio',
    'Gaming',
    'Fotografía',
    'Wearables'
  ];

  return (
    <header className="bg-[var(--color-bg)] shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent"
            onClick={() => window.location.href = '/'}>
              TechStore
            </h1>
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
                <button
                  className="w-full flex items-center justify-center bg-[var(--color-primary)] text-white font-semibold rounded-lg py-2 transition-colors duration-200"
                >
                  <User className="h-5 w-5 mr-2" />
                  Iniciar sesión
                </button>
              </li>
            )}
            {categories.map((category) => (
              <li key={category}>
                <a
                  href="#"
                  className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-200 block py-2 md:py-0"
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full px-4 py-2 pl-10 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-[var(--color-bg)] text-[var(--color-text)]"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-[var(--color-muted)]" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
