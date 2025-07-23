
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Plus, Minus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { usarCarrito } from '../contexts/CartContext';
import { ProductAPI } from '../services/api';
import { Product } from '../components/ProductCard';
import { WhatsAppFloat } from '@/components/ui/whatsapp';
import Cart from '../components/Cart';
import Header from '../components/Header';

const ProductInfo = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [producto, setProducto] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, establecerCantidad] = useState(1);
  const [esFavorito, establecerEsFavorito] = useState(false);
  
  const {
    articulosCarrito,
    agregarAlCarrito,
    actualizarCantidad: actualizarCantidadCarrito,
    eliminarArticulo,
    contadorArticulosCarrito,
    carritoAbierto,
    establecerCarritoAbierto,
  } = usarCarrito();

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        const productData = await ProductAPI.getProductBySlug(slug);
        setProducto(productData || null);
      } catch (error) {
        console.error('Error loading product:', error);
        setProducto(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Cargando producto...</h1>
        </div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Button onClick={() => navigate('/')}>Volver al inicio</Button>
        </div>
      </div>
    );
  }

  const descuento = producto.originalPrice 
    ? Math.round(((producto.originalPrice - producto.price) / producto.originalPrice) * 100)
    : 0;

  const manejarAgregarAlCarrito = () => {
    // Agregar la cantidad especificada al carrito
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito(producto);
    }
    toast({
      title: "Producto agregado",
      description: `${cantidad} ${producto.name} agregado al carrito`,
    });
  };

  const manejarCambioCantidad = (cambio: number) => {
    const nuevaCantidad = cantidad + cambio;
    if (nuevaCantidad >= 1 && nuevaCantidad <= 99) {
      establecerCantidad(nuevaCantidad);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <WhatsAppFloat />
      
      {/* Header */}
      <Header
        cartItemCount={contadorArticulosCarrito}
        onCartClick={() => establecerCarritoAbierto(true)}
      />
      
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={producto.image}
                  alt={producto.name}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                {descuento > 0 && (
                  <Badge className="absolute top-4 left-4 bg-red-500">
                    -{descuento}%
                  </Badge>
                )}
                {!producto.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">Agotado</span>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {producto.category}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {producto.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(producto.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">({producto.rating})</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    REF: {producto.price.toLocaleString()}
                  </span>
                  {producto.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      REF: {producto.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                {descuento > 0 && (
                  <span className="text-green-600 font-medium">
                    Ahorras REF: {(producto.originalPrice! - producto.price).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Descripción</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {producto.description}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Cantidad:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => manejarCambioCantidad(-1)}
                    disabled={cantidad <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{cantidad}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => manejarCambioCantidad(1)}
                    disabled={cantidad >= 99}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={manejarAgregarAlCarrito}
                  disabled={!producto.inStock}
                  className="flex-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:brightness-110"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {producto.inStock ? 'Agregar al carrito' : 'Agotado'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => establecerEsFavorito(!esFavorito)}
                  className={esFavorito ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`h-4 w-4 ${esFavorito ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Stock Status */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Disponibilidad:</span>
                  <Badge variant={producto.inStock ? "default" : "destructive"}>
                    {producto.inStock ? 'En stock' : 'Agotado'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Cart Component */}
      <Cart
        estaAbierto={carritoAbierto}
        alCerrar={() => establecerCarritoAbierto(false)}
        articulos={articulosCarrito}
        alActualizarCantidad={actualizarCantidadCarrito}
        alEliminarArticulo={eliminarArticulo}
      />
    </div>
  );
};

export default ProductInfo;

