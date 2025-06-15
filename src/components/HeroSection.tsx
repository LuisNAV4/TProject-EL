
import React from 'react';
import { Zap, Shield, Truck } from 'lucide-react';
import HeroCarousel from './HeroCarousel';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-[var(--color-hero-primary)] via-[var(--color-hero-secondary)] to-[var(--color-hero-tertiary)] text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative container mx-auto px-4 py-12 lg:py-20">
        {/* Carrusel Hero */}
        <div className="min-h-[500px] lg:min-h-[600px] mb-12 lg:mb-20">
          <HeroCarousel />
        </div>
        
        {/* Características de la tienda */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="flex items-center space-x-4 p-4 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="bg-white bg-opacity-20 p-3 rounded-full flex-shrink-0">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-sm lg:text-base">Envío Gratis</h3>
              <p className="text-gray-300 text-xs lg:text-sm">En compras superiores a $999</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="bg-white bg-opacity-20 p-3 rounded-full flex-shrink-0">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-sm lg:text-base">Garantía Extendida</h3>
              <p className="text-gray-300 text-xs lg:text-sm">Hasta 2 años en productos seleccionados</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="bg-white bg-opacity-20 p-3 rounded-full flex-shrink-0">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-sm lg:text-base">Entrega Rápida</h3>
              <p className="text-gray-300 text-xs lg:text-sm">Recibe tu pedido de 1 a 4 horas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
