
import React from 'react';
import { Monitor, Server, Wifi, Headphones, Shield, Code } from 'lucide-react';

const CategorySection = () => {
  const categories = [
    {
      icon: Monitor,
      title: 'Equipos y Hardware',
      description: 'Computadoras, servidores y componentes para PyMEs',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Code,
      title: 'Software Empresarial',
      description: 'Licencias y aplicaciones especializadas',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Wifi,
      title: 'Infraestructura de Red',
      description: 'Routers, switches y soluciones de conectividad',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Shield,
      title: 'Seguridad Informática',
      description: 'Antivirus, firewalls y protección integral',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: Server,
      title: 'Servidores y Storage',
      description: 'Infraestructura de almacenamiento empresarial',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Headphones,
      title: 'Soporte y Consultoría',
      description: 'Servicios técnicos especializados',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Categorías de Productos y Servicios
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explora nuestras categorías especializadas para encontrar la solución perfecta 
            que impulse el crecimiento tecnológico de tu PyME
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
