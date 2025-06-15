
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import ProductCard, { Product } from '../components/ProductCard';
import { sampleProducts } from '../data/products';
import { productNameToSlug } from '../utils/urlUtils';
import CatalogHeader from '@/components/CatalogHeader';
import Cart from '@/components/Cart';
import { usarCarrito } from '@/contexts/CartContext';

const ProductCatalog = () => {
  const navigate = useNavigate();
  const { articulosCarrito, agregarAlCarrito, actualizarCantidad, eliminarArticulo, contadorArticulosCarrito } = usarCarrito();
  const [terminoBusqueda, establecerTerminoBusqueda] = useState('');
  const [categoriasSeleccionadas, establecerCategoriasSeleccionadas] = useState<string[]>([]);
  const [rangoPrecio, establecerRangoPrecio] = useState([0, 50000]);
  const [ordenarPor, establecerOrdenarPor] = useState('name');
  const [modoVista, establecerModoVista] = useState<'grid' | 'list'>('grid');
  const [mostrarEnStock, establecerMostrarEnStock] = useState(false);
  const [mostrarCarrito, establecerMostrarCarrito] = useState(false);

  // Get unique categories
  const categorias = useMemo(() => {
    return Array.from(new Set(sampleProducts.map(producto => producto.category)));
  }, []);

  // Filter and sort products
  const productosFiltrados = useMemo(() => {
    let filtrados = sampleProducts.filter(producto => {
      const coincideBusqueda = producto.name.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                           producto.description.toLowerCase().includes(terminoBusqueda.toLowerCase());
      
      const coincideCategoria = categoriasSeleccionadas.length === 0 || 
                             categoriasSeleccionadas.includes(producto.category);
      
      const coincidePrecio = producto.price >= rangoPrecio[0] && producto.price <= rangoPrecio[1];
      
      const coincideStock = !mostrarEnStock || producto.inStock;

      return coincideBusqueda && coincideCategoria && coincidePrecio && coincideStock;
    });

    // Sort products
    filtrados.sort((a, b) => {
      switch (ordenarPor) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtrados;
  }, [terminoBusqueda, categoriasSeleccionadas, rangoPrecio, ordenarPor, mostrarEnStock]);

  const manejarCambioCategoria = (categoria: string, marcado: boolean) => {
    if (marcado) {
      establecerCategoriasSeleccionadas([...categoriasSeleccionadas, categoria]);
    } else {
      establecerCategoriasSeleccionadas(categoriasSeleccionadas.filter(c => c !== categoria));
    }
  };

  const manejarAgregarAlCarrito = (producto: Product) => {
    agregarAlCarrito(producto);
    console.log('Agregado al carrito:', producto);
  };

  const manejarClicProducto = (producto: Product) => {
    const slug = productNameToSlug(producto.name);
    navigate(`/catalogo/${slug}`);
  };

  const ContenidoFiltros = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categorías</h3>
        <div className="space-y-2">
          {categorias.map(categoria => (
            <div key={categoria} className="flex items-center space-x-2">
              <Checkbox
                id={categoria}
                checked={categoriasSeleccionadas.includes(categoria)}
                onCheckedChange={(marcado) => manejarCambioCategoria(categoria, marcado === true)}
              />
              <label htmlFor={categoria} className="text-sm">{categoria}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Rango de Precio</h3>
        <div className="space-y-4">
          <Slider
            value={rangoPrecio}
            onValueChange={establecerRangoPrecio}
            max={50000}
            min={0}
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>REF: {rangoPrecio[0].toLocaleString()}</span>
            <span>REF: {rangoPrecio[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Stock Filter */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="inStock"
          checked={mostrarEnStock}
          onCheckedChange={(marcado) => establecerMostrarEnStock(marcado === true)}
        />
        <label htmlFor="inStock" className="text-sm">Solo productos en stock</label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <CatalogHeader contadorArticulosCarrito={contadorArticulosCarrito} alClicCarrito={() => establecerMostrarCarrito(true)} />
      <Cart 
        estaAbierto={mostrarCarrito} 
        alCerrar={() => establecerMostrarCarrito(false)}
        articulos={articulosCarrito}
        alActualizarCantidad={actualizarCantidad}
        alEliminarArticulo={eliminarArticulo}
      />
      
      {/* Search and filters header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <h1 className="text-2xl font-bold">Catálogo de Productos</h1>
            
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={terminoBusqueda}
                  onChange={(e) => establecerTerminoBusqueda(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Sort */}
              <Select value={ordenarPor} onValueChange={establecerOrdenarPor}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nombre A-Z</SelectItem>
                  <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="rating">Mejor Calificación</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border rounded-lg">
                <Button
                  variant={modoVista === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => establecerModoVista('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={modoVista === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => establecerModoVista('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Filter */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <ContenidoFiltros />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="h-4 w-4" />
                  <h2 className="font-semibold">Filtros</h2>
                </div>
                <ContenidoFiltros />
              </CardContent>
            </Card>
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''} encontrado{productosFiltrados.length !== 1 ? 's' : ''}
              </p>
              <div className="flex gap-2">
                {categoriasSeleccionadas.map(categoria => (
                  <Badge key={categoria} variant="secondary" className="cursor-pointer">
                    {categoria}
                    <button
                      onClick={() => manejarCambioCategoria(categoria, false)}
                      className="ml-1 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {productosFiltrados.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No se encontraron productos</p>
                <Button
                  onClick={() => {
                    establecerTerminoBusqueda('');
                    establecerCategoriasSeleccionadas([]);
                    establecerRangoPrecio([0, 50000]);
                    establecerMostrarEnStock(false);
                  }}
                  className="mt-4"
                >
                  Limpiar filtros
                </Button>
              </div>
            ) : (
              <div className={
                modoVista === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {productosFiltrados.map(producto => (
                  <ProductCard
                    key={producto.id}
                    product={producto}
                    onAddToCart={manejarAgregarAlCarrito}
                    onProductClick={manejarClicProducto}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;

