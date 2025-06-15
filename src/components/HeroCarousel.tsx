
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface ImagenCarrusel {
  id: number;
  imagen: string;
  titulo: string;
  descripcion: string;
  url?: string;
  textoBoton?: string;
}

const imagenesCarrusel: ImagenCarrusel[] = [
  {
    id: 1,
    imagen: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
    titulo: 'Laptops de Última Generación',
    descripcion: 'Descubre nuestras laptops con procesadores de última generación y diseños ultradelgados',
    url: '/catalogo?category=laptops',
    textoBoton: 'Ver Laptops'
  },
  {
    id: 2,
    imagen: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    titulo: 'Componentes de Alto Rendimiento',
    descripcion: 'Mejora tu PC con los mejores componentes del mercado',
    url: '/catalogo?category=componentes',
    textoBoton: 'Ver Componentes'
  },
  {
    id: 3,
    imagen: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
    titulo: 'Oferta Especial - 20% de Descuento',
    descripcion: 'Aprovecha nuestros descuentos en MacBooks y productos Apple',
    url: '/catalogo?ofertas=apple',
    textoBoton: 'Ver Ofertas'
  }
];

const HeroCarousel = () => {
  const manejarClicImagen = (url?: string) => {
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <div className="relative w-full h-full">
      <Carousel className="w-full h-full" opts={{ align: "start", loop: true }}>
        <CarouselContent className="h-full">
          {imagenesCarrusel.map((item) => (
            <CarouselItem key={item.id} className="h-full">
              <div className="relative h-full flex items-center">
                <div className="flex flex-col lg:flex-row items-center w-full h-full">
                  {/* Contenido de texto */}
                  <div className="lg:w-1/2 mb-10 lg:mb-0 z-10 px-4 lg:px-0">
                    <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight ColorTextoHero">
                      {item.titulo}
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">
                      {item.descripcion}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        size="lg" 
                        className="ColorBotonesHero hover:bg-gray-100 font-semibold"
                        onClick={() => manejarClicImagen(item.url)}
                      >
                        {item.textoBoton || 'Ver Más'}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Imagen del carrusel */}
                  <div className="lg:w-1/2 relative">
                    <div 
                      className="relative z-10 cursor-pointer transition-transform duration-300 hover:scale-105"
                      onClick={() => manejarClicImagen(item.url)}
                    >
                      <img
                        src={item.imagen}
                        alt={item.titulo}
                        className="rounded-lg shadow-2xl w-full h-auto max-h-[400px] lg:max-h-[500px] object-cover"
                      />
                      {item.url && (
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 rounded-lg flex items-center justify-center">
                          <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <ArrowRight className="h-12 w-12 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Elementos decorativos */}
                    <div className="absolute -top-4 -left-4 w-20 h-20 bg-[var(--color-hero-tertiary)] rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[var(--color-hero-primary)] rounded-full opacity-20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Controles del carrusel - solo visibles en pantallas grandes */}
        <div className="hidden lg:block">
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-30" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-30" />
        </div>
        
        {/* Indicadores del carrusel para móviles */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 lg:hidden">
          {imagenesCarrusel.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-white bg-opacity-50"
            ></div>
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
