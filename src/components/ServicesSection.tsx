
import React from 'react';
import { Code, Database, Cloud, Users, BarChart3, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ServicesSection = () => {
  const services = [
    {
      icon: Code,
      title: 'Desarrollo Web',
      description: 'Sitios web profesionales y tiendas online para tu PyME',
      price: 'Desde $15,000',
      features: ['Diseño responsive', 'SEO optimizado', 'Panel de administración'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Database,
      title: 'Gestión de Datos',
      description: 'Sistemas de gestión y análisis de datos empresariales',
      price: 'Desde $8,500',
      features: ['Base de datos segura', 'Reportes automáticos', 'Backup diario'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Cloud,
      title: 'Migración a la Nube',
      description: 'Moderniza tu infraestructura con soluciones cloud',
      price: 'Desde $12,000',
      features: ['Migración completa', 'Capacitación incluida', 'Soporte 24/7'],
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Users,
      title: 'CRM Personalizado',
      description: 'Sistema de gestión de clientes adaptado a tu negocio',
      price: 'Desde $10,500',
      features: ['Gestión de leads', 'Automatización', 'Integración email'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: BarChart3,
      title: 'Business Intelligence',
      description: 'Dashboards y análisis para toma de decisiones',
      price: 'Desde $18,000',
      features: ['Dashboards interactivos', 'KPIs personalizados', 'Alertas automáticas'],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Lock,
      title: 'Ciberseguridad',
      description: 'Protección integral contra amenazas digitales',
      price: 'Desde $6,800',
      features: ['Auditoría de seguridad', 'Protección endpoint', 'Capacitación staff'],
      color: 'from-gray-600 to-gray-800'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Servicios Especializados para PyMEs
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Ofrecemos soluciones tecnológicas completas diseñadas específicamente para las necesidades 
            y presupuesto de pequeñas y medianas empresas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${service.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                
                <div className="mb-4">
                  <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                  <span className="text-gray-500 text-sm ml-1">MXN</span>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Solicitar Cotización
                </Button>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="mr-4">
            Ver Todos los Servicios
          </Button>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Agenda una Consulta
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
