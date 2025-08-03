
import React, { useState, useEffect } from 'react';
import { Smartphone, Laptop, Headphones, Camera, Watch, Gamepad2, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProductAPI } from '@/services/api';

const CategorySection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);

  const handleCategoryClick = (categoryName: string) => {
    navigate('/products', { state: { selectedCategories: [categoryName] } });
  };

  // Mapeo de íconos por nombre de categoría
  const iconMap: Record<string, any> = {
    'Computadoras': Laptop,
    'Electrónica': Package,
    'Teléfonos': Smartphone,
    'Tabletas': Package,
    'Accesorios': Package,
    'Audio': Headphones,
    'Video': Camera,
    'Redes': Package,
    'Almacenamiento': Package
  };

  // Mapeo de colores por categoría
  const colorMap: Record<string, string> = {
    'Computadoras': 'from-purple-500 to-pink-500',
    'Electrónica': 'from-blue-500 to-cyan-500',
    'Teléfonos': 'from-green-500 to-teal-500',
    'Tabletas': 'from-red-500 to-orange-500',
    'Accesorios': 'from-indigo-500 to-blue-500',
    'Audio': 'from-yellow-500 to-orange-500',
    'Video': 'from-pink-500 to-purple-500',
    'Redes': 'from-teal-500 to-green-500',
    'Almacenamiento': 'from-orange-500 to-red-500'
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await ProductAPI.getCategories();
        // Tomar solo las primeras 6 categorías para mostrar
        const formattedCategories = categoriesData.slice(0, 6).map(cat => ({
          id: cat.id,
          title: cat.nombre,
          icon: iconMap[cat.nombre] || Package,
          description: `Explora nuestra selección de ${cat.nombre.toLowerCase()}`,
          color: colorMap[cat.nombre] || 'from-gray-500 to-gray-600'
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    loadCategories();
  }, []);

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
                onClick={() => handleCategoryClick(category.title)}
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
