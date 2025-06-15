
import React from 'react';
import { Smartphone, Laptop, Headphones, Camera, Watch, Gamepad2 } from 'lucide-react';

const CategorySection = () => {
  const categories = [
    {
      icon: Smartphone,
      title: 'Smartphones',
      description: 'Los últimos modelos de iPhone, Samsung y más',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Laptop,
      title: 'Laptops',
      description: 'Computadoras portátiles para trabajo y gaming',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Headphones,
      title: 'Audio',
      description: 'Audífonos, bocinas y equipos de sonido',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Camera,
      title: 'Fotografía',
      description: 'Cámaras digitales y accesorios',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: Watch,
      title: 'Wearables',
      description: 'Smartwatches y dispositivos inteligentes',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Gamepad2,
      title: 'Gaming',
      description: 'Consolas, videojuegos y accesorios',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            Categorías Populares
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explora nuestra amplia selección de productos tecnológicos organizados por categorías
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group hover:text-[var(--color-primary)] text-[var(--color-text)]"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {category.title}
                </h3>
                <p className="">
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
