
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Truck, Building2 } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="flex items-center mb-4">
              <Building2 className="h-8 w-8 mr-3 text-cyan-400" />
              <span className="text-cyan-400 font-semibold">Soluciones B2C para PyMEs</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Impulsa tu
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                PyME Tecnológica
              </span>
              con nuestros servicios
            </h1>
            <p className="text-xl mb-8 text-gray-200 leading-relaxed">
              Plataforma especializada en ofrecer servicios tecnológicos integrales 
              para pequeñas y medianas empresas. Desde consultoría hasta implementación completa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 font-semibold">
                Ver Servicios
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                Consulta Gratuita
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Equipo trabajando en soluciones tecnológicas"
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-cyan-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>
        
        {/* Value Propositions */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Implementación Rápida</h3>
              <p className="text-gray-300">Soluciones listas en 48 horas</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Soporte Dedicado</h3>
              <p className="text-gray-300">Acompañamiento personalizado</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Sin Costos Ocultos</h3>
              <p className="text-gray-300">Precios transparentes y fijos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
