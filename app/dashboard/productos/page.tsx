'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter,
  Download,
  Eye,
  Edit,
  AlertTriangle,
  Package,
  DollarSign,
  Store,
  TrendingUp,
  Plus,
  BarChart3
} from 'lucide-react';
import { mockProducts, mockVendors, getVendorById, type Product } from '@/lib/mockData';

export default function ProductosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [categoryFilter, setCategoryFilter] = useState<string>('Todas');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'Todos' || product.status === statusFilter;
      const matchesCategory = categoryFilter === 'Todas' || product.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchTerm, statusFilter, categoryFilter]);

  const totalProducts = mockProducts.length;
  const availableProducts = mockProducts.filter(p => p.status === 'Disponible').length;
  const outOfStockProducts = mockProducts.filter(p => p.status === 'Agotado').length;
  const lowStockProducts = mockProducts.filter(p => p.stock <= 10 && p.stock > 0).length;
  const totalValue = mockProducts.reduce((sum, product) => sum + (product.price * product.stock), 0);
  
  const categories = [...new Set(mockProducts.map(p => p.category))];

  const handleProductAction = (productId: string, action: 'edit' | 'restock' | 'discontinue') => {
    console.log(`Action: ${action} for product: ${productId}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponible':
        return 'bg-green-100 text-green-800';
      case 'Agotado':
        return 'bg-red-100 text-red-800';
      case 'Descontinuado':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Agotado', color: 'text-red-600' };
    if (stock <= 5) return { text: 'Crítico', color: 'text-red-600' };
    if (stock <= 10) return { text: 'Bajo', color: 'text-yellow-600' };
    return { text: 'Normal', color: 'text-green-600' };
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-femfuel-dark">
            Gestión de Productos
          </h1>
          <p className="text-femfuel-medium">
            Administra inventario y catálogo de productos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button className="bg-femfuel-rose hover:bg-femfuel-rose/90 text-white gap-2">
            <Plus className="h-4 w-4" />
            Agregar Producto
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-femfuel-purple rounded-lg">
                <Package className="h-5 w-5 text-femfuel-rose" />
              </div>
              <div>
                <p className="text-sm text-femfuel-medium">Total Productos</p>
                <p className="text-2xl font-bold text-femfuel-dark">{totalProducts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-femfuel-medium">Disponibles</p>
                <p className="text-2xl font-bold text-femfuel-dark">{availableProducts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-femfuel-medium">Stock Bajo</p>
                <p className="text-2xl font-bold text-femfuel-dark">{lowStockProducts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-femfuel-gold/20 rounded-lg">
                <DollarSign className="h-5 w-5 text-femfuel-gold" />
              </div>
              <div>
                <p className="text-sm text-femfuel-medium">Valor Inventario</p>
                <p className="text-2xl font-bold text-femfuel-dark">{formatCurrency(totalValue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">
                  Alerta de Inventario Bajo
                </p>
                <p className="text-sm text-yellow-700">
                  {lowStockProducts} productos tienen stock bajo y necesitan reabastecimiento
                </p>
              </div>
              <Button variant="outline" className="ml-auto border-yellow-300 text-yellow-700">
                Ver Productos
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-femfuel-dark">Catálogo de Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nombre, marca o categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-femfuel-rose"
              >
                <option value="Todos">Todos los estados</option>
                <option value="Disponible">Disponible</option>
                <option value="Agotado">Agotado</option>
                <option value="Descontinuado">Descontinuado</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-femfuel-rose"
              >
                <option value="Todas">Todas las categorías</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Más Filtros
              </Button>
            </div>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-femfuel-medium">Producto</th>
                  <th className="text-left py-3 px-4 font-medium text-femfuel-medium">Categoría</th>
                  <th className="text-left py-3 px-4 font-medium text-femfuel-medium">Proveedor</th>
                  <th className="text-left py-3 px-4 font-medium text-femfuel-medium">Precio</th>
                  <th className="text-left py-3 px-4 font-medium text-femfuel-medium">Stock</th>
                  <th className="text-left py-3 px-4 font-medium text-femfuel-medium">Valor Total</th>
                  <th className="text-left py-3 px-4 font-medium text-femfuel-medium">Estado</th>
                  <th className="text-left py-3 px-4 font-medium text-femfuel-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const vendor = getVendorById(product.vendorId);
                  const stockStatus = getStockStatus(product.stock);
                  
                  return (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Package className="h-6 w-6 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium text-femfuel-dark">{product.name}</p>
                            <p className="text-sm text-femfuel-medium">{product.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 bg-femfuel-purple text-femfuel-rose text-xs rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Store className="h-4 w-4 text-femfuel-gold" />
                          <div>
                            <p className="text-sm font-medium text-femfuel-dark">
                              {vendor?.businessName || 'N/A'}
                            </p>
                            <p className="text-xs text-femfuel-medium">
                              {vendor?.city || ''}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium text-femfuel-dark">
                          {formatCurrency(product.price)}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-femfuel-dark">{product.stock}</p>
                          <p className={`text-xs font-medium ${stockStatus.color}`}>
                            {stockStatus.text}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium text-femfuel-dark">
                          {formatCurrency(product.price * product.stock)}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedProduct(product)}
                            className="gap-1"
                          >
                            <Eye className="h-3 w-3" />
                            Ver
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleProductAction(product.id, 'edit')}
                            className="gap-1"
                          >
                            <Edit className="h-3 w-3" />
                            Editar
                          </Button>
                          {product.stock <= 10 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleProductAction(product.id, 'restock')}
                              className="gap-1 text-blue-600 hover:bg-blue-50 border-blue-200"
                            >
                              <TrendingUp className="h-3 w-3" />
                              Reponer
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination placeholder */}
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-femfuel-medium">
              Mostrando {filteredProducts.length} de {totalProducts} productos
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm" disabled>
                Siguiente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-lg p-6 max-w-lg w-full m-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-femfuel-dark">Detalles del Producto</h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Product Image Placeholder */}
              <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <Package className="h-16 w-16 text-gray-400" />
              </div>

              {/* Product Info */}
              <div>
                <h4 className="font-medium text-femfuel-dark mb-2">{selectedProduct.name}</h4>
                <div className="space-y-2 text-sm text-femfuel-medium">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p><strong>Marca:</strong> {selectedProduct.brand}</p>
                      <p><strong>Categoría:</strong> {selectedProduct.category}</p>
                      <p><strong>Precio:</strong> {formatCurrency(selectedProduct.price)}</p>
                    </div>
                    <div>
                      <p><strong>Stock:</strong> {selectedProduct.stock} unidades</p>
                      <p><strong>Valor Total:</strong> {formatCurrency(selectedProduct.price * selectedProduct.stock)}</p>
                      <p><strong>Estado:</strong> 
                        <span className={`ml-1 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedProduct.status)}`}>
                          {selectedProduct.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h5 className="font-medium text-femfuel-dark mb-2">Descripción</h5>
                <p className="text-sm text-femfuel-medium">{selectedProduct.description}</p>
              </div>

              {/* Vendor Info */}
              <div>
                <h5 className="font-medium text-femfuel-dark mb-2">Proveedor</h5>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Store className="h-5 w-5 text-femfuel-gold" />
                  <div>
                    <p className="font-medium text-femfuel-dark">
                      {getVendorById(selectedProduct.vendorId)?.businessName || 'N/A'}
                    </p>
                    <p className="text-sm text-femfuel-medium">
                      {getVendorById(selectedProduct.vendorId)?.city || ''}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stock Status */}
              {selectedProduct.stock <= 10 && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <p className="text-sm font-medium text-yellow-800">
                      Stock bajo - Se recomienda reponer inventario
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-6 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setSelectedProduct(null)}
                className="flex-1"
              >
                Cerrar
              </Button>
              <Button
                className="flex-1 bg-femfuel-rose hover:bg-femfuel-rose/90"
                onClick={() => {
                  handleProductAction(selectedProduct.id, 'edit');
                  setSelectedProduct(null);
                }}
              >
                Editar Producto
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}