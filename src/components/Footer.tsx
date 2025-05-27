
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
              TechStore
            </h3>
            <p className="text-gray-300 mb-4">
              Tu tienda de tecnología de confianza. Los mejores productos, 
              precios competitivos y servicio al cliente excepcional.
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
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Smartphones</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Laptops</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Audio</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Gaming</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Fotografía</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Envíos y Devoluciones</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Garantías</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contacto</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mi Cuenta</a></li>
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
                <span className="text-gray-300">soporte@techstore.com</span>
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
            © 2024 TechStore. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
