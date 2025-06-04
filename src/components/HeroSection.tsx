
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Tecnología de
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Última Generación
              </span>
              a tu alcance
            </h1>
            <p className="text-xl mb-8 text-gray-200 leading-relaxed">
              Descubre los mejores productos tecnológicos, desde laptops y smartphones 
              hasta gadgets innovadores. Calidad garantizada y precios competitivos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 font-semibold">
                Ver Productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-blue-900 hover:bg-gray-100 font-semibold border-blue-900">
                Ofertas del Día
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Productos tecnológicos"
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-cyan-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>
        
        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Envío Gratis</h3>
              <p className="text-gray-300">En compras superiores a $999</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Garantía Extendida</h3>
              <p className="text-gray-300">Hasta 2 años en productos seleccionados</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Entrega Rápida</h3>
              <p className="text-gray-300">Recibe tu pedido de 1 a 4 horas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
