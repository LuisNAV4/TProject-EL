
import React from 'react';
import { Monitor, Server, Wifi, Headphones, Shield, Code } from 'lucide-react';

const CategorySection = () => {
  const categories = [
    {
      icon: Monitor,
      title: 'Hardware',
      description: 'Computadoras, laptops y componentes',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Code,
      title: 'Software',
      description: 'Licencias y aplicaciones empresariales',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Wifi,
      title: 'Networking',
      description: 'Routers, switches y soluciones de red',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Shield,
      title: 'Seguridad',
      description: 'Antivirus, firewalls y protección',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: Server,
      title: 'Servidores',
      description: 'Infraestructura y almacenamiento',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Headphones,
      title: 'Accesorios',
      description: 'Periféricos y complementos',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Categorías Principales
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Encuentra exactamente lo que necesitas para impulsar tu negocio con nuestras categorías especializadas
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
