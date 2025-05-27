
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              TechPyme
            </h3>
            <p className="text-gray-300 mb-4">
              Soluciones tecnológicas especializadas para pequeñas y medianas empresas. 
              Impulsamos tu crecimiento con la mejor tecnología.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Productos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Hardware</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Software</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Networking</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Seguridad</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Servidores</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Consultoría Técnica</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Instalación</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Soporte Técnico</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mantenimiento</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Capacitación</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">+52 55 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">ventas@techpyme.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">Ciudad de México, México</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 TechPyme. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
