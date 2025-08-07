
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { ProductAPI } from '../services/api';
import { productNameToSlug } from '../utils/urlUtils';
import CatalogHeader from '@/components/CatalogHeader';
import Cart from '@/components/Cart';
import { usarCarrito } from '@/contexts/CartContext';
import { WhatsAppFloat } from '@/components/ui/whatsapp';

const ProductCatalog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { articulosCarrito, agregarAlCarrito, actualizarCantidad, eliminarArticulo, contadorArticulosCarrito } = usarCarrito();
  
  const [productos, setProductos] = useState<Product[]>([]);
  const [categorias, setCategorias] = useState<{id: number, nombre: string}[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [terminoBusqueda, establecerTerminoBusqueda] = useState('');
  const [categoriasSeleccionadas, establecerCategoriasSeleccionadas] = useState<string[]>([]);
  const [rangoPrecio, establecerRangoPrecio] = useState([0, 50000]);
  const [ordenarPor, establecerOrdenarPor] = useState('name');
  const [modoVista, establecerModoVista] = useState<'grid' | 'list'>('grid');
  const [mostrarEnStock, establecerMostrarEnStock] = useState(false);
  const [mostrarCarrito, establecerMostrarCarrito] = useState(false);
  const [mostrarOferta, setMostrarOferta] = useState(false);

  // Load products and categories on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [productosData, categoriasData] = await Promise.all([
          ProductAPI.getProducts(),
          ProductAPI.getCategories()
        ]);
        setProductos(productosData);
        setCategorias(categoriasData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle route state (filters from navigation)
  useEffect(() => {
    if (location.state) {
      const { selectedCategories, onSale, searchTerm } = location.state;
      
      if (selectedCategories) {
        establecerCategoriasSeleccionadas(selectedCategories);
      }
      
      if (onSale) {
        setMostrarOferta(true);
      }
      
      if (searchTerm) {
        establecerTerminoBusqueda(searchTerm);
      }
      
      // Clear location state after processing
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  // Filter and sort products
  const productosFiltrados = useMemo(() => {
    let filtrados = productos.filter(producto => {
      const coincideBusqueda = producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                           (producto.descripcion || '').toLowerCase().includes(terminoBusqueda.toLowerCase());
      
      const coincideCategoria = categoriasSeleccionadas.length === 0 || 
                             categoriasSeleccionadas.includes(producto.categoria_nombre || '');
      
      const coincidePrecio = producto.precio >= rangoPrecio[0] && producto.precio <= rangoPrecio[1];
      
      const coincideStock = !mostrarEnStock || producto.en_stock;
      
      const coincideOferta = !mostrarOferta || (producto.precio_original && producto.precio_original > producto.precio);

      return coincideBusqueda && coincideCategoria && coincidePrecio && coincideStock && coincideOferta;
    });

    // Sort products
    filtrados.sort((a, b) => {
      switch (ordenarPor) {
        case 'precio-low':
          return a.precio - b.precio;
        case 'precio-high':
          return b.precio - a.precio;
        case 'rating':
          return (b.calificacion || 0) - (a.calificacion || 0);
        case 'name':
        default:
          return a.nombre.localeCompare(b.nombre);
      }
    });

    return filtrados;
  }, [productos, terminoBusqueda, categoriasSeleccionadas, rangoPrecio, ordenarPor, mostrarEnStock, mostrarOferta]);

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
    const slug = productNameToSlug(producto.nombre);
    navigate(`/product/${slug}`);
  };

  const ContenidoFiltros = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categorías</h3>
        <div className="space-y-2">
          {categorias.map(categoria => (
            <div key={categoria.id} className="flex items-center space-x-2">
              <Checkbox
                id={categoria.nombre}
                checked={categoriasSeleccionadas.includes(categoria.nombre)}
                onCheckedChange={(marcado) => manejarCambioCategoria(categoria.nombre, marcado === true)}
              />
              <label htmlFor={categoria.nombre} className="text-sm">{categoria.nombre}</label>
            </div>
          ))}
        </div>
      </div>

      {/* precio Range */}
      <div>
        <h3 className="font-semibold mb-3">Rango de Precio</h3>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="text-sm text-gray-600">Mínimo</label>
              <Input
                type="number"
                placeholder="0"
                value={rangoPrecio[0] || ''}
                onChange={(e) => {
                  const valor = e.target.value === '' ? 0 : parseInt(e.target.value);
                  establecerRangoPrecio([valor, rangoPrecio[1]]);
                }}
                className="mt-1"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-600">Máximo</label>
              <Input
                type="number"
                placeholder="50000"
                value={rangoPrecio[1] || ''}
                onChange={(e) => {
                  const valor = e.target.value === '' ? 50000 : parseInt(e.target.value);
                  establecerRangoPrecio([rangoPrecio[0], valor]);
                }}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stock Filter */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="en_stock;"
          checked={mostrarEnStock}
          onCheckedChange={(marcado) => establecerMostrarEnStock(marcado === true)}
        />
        <label htmlFor="en_stock;" className="text-sm">Solo productos en stock</label>
      </div>

      {/* Offers Filter */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="onSale"
          checked={mostrarOferta}
          onCheckedChange={(marcado) => setMostrarOferta(marcado === true)}
        />
        <label htmlFor="onSale" className="text-sm">Solo ofertas</label>
      </div>
    </div>
  );

  return (
    

    <div className="min-h-screen bg-gray-50">
      <WhatsAppFloat />
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
                  <SelectItem value="precio-low">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="precio-high">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="calificacion">Mejor Calificación</SelectItem>
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
                {loading ? 'Cargando...' : `${productosFiltrados.length} producto${productosFiltrados.length !== 1 ? 's' : ''} encontrado${productosFiltrados.length !== 1 ? 's' : ''}`}
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
                    setMostrarOferta(false);
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

