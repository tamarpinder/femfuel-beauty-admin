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
  Ban,
  CheckCircle,
  Star,
  MapPin,
  Phone,
  Mail,
  Store,
  DollarSign,
  Calendar,
  Package,
  Clock
} from 'lucide-react';
import { mockVendors, getServicesByVendorId, getBookingsByVendorId, type Vendor } from '@/lib/mockData';

export default function ProveedoresPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [cityFilter, setCityFilter] = useState<string>('Todas');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const filteredVendors = useMemo(() => {
    return mockVendors.filter(vendor => {
      const matchesSearch = 
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.businessType.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'Todos' || vendor.status === statusFilter;
      const matchesCity = cityFilter === 'Todas' || vendor.city === cityFilter;
      
      return matchesSearch && matchesStatus && matchesCity;
    });
  }, [searchTerm, statusFilter, cityFilter]);

  const totalVendors = mockVendors.length;
  const activeVendors = mockVendors.filter(v => v.status === 'Activo').length;
  const pendingVendors = mockVendors.filter(v => v.status === 'Pendiente').length;
  const totalRevenue = mockVendors.reduce((sum, vendor) => sum + vendor.monthlyRevenue, 0);
  const cities = [...new Set(mockVendors.map(v => v.city))];

  const handleVendorAction = (vendorId: string, action: 'approve' | 'suspend' | 'activate') => {
    console.log(`Action: ${action} for vendor: ${vendorId}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-DO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo':
        return 'bg-green-100 text-green-800';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Suspendido':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-femfuel-dark">
            Gestión de Proveedores
          </h1>
          <p className="text-femfuel-medium">
            Administra y supervisa todos los proveedores de servicios
          </p>
        </div>
        <Button className="bg-femfuel-rose hover:bg-femfuel-rose/90 text-white gap-2">
          <Download className="h-4 w-4" />
          Exportar Lista
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-femfuel-purple rounded-lg">
                <Store className="h-5 w-5 text-femfuel-rose" />
              </div>
              <div>
                <p className="text-sm text-femfuel-medium">Total Proveedores</p>
                <p className="text-2xl font-bold text-femfuel-dark">{totalVendors}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-femfuel-medium">Activos</p>
                <p className="text-2xl font-bold text-femfuel-dark">{activeVendors}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-femfuel-medium">Pendientes</p>
                <p className="text-2xl font-bold text-femfuel-dark">{pendingVendors}</p>
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
                <p className="text-sm text-femfuel-medium">Ingresos Mensuales</p>
                <p className="text-2xl font-bold text-femfuel-dark">{formatCurrency(totalRevenue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-femfuel-dark">Lista de Proveedores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nombre, negocio, email..."
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
                <option value="Activo">Activos</option>
                <option value="Pendiente">Pendientes</option>
                <option value="Suspendido">Suspendidos</option>
              </select>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-femfuel-rose"
              >
                <option value="Todas">Todas las ciudades</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Más Filtros
              </Button>
            </div>
          </div>

          {/* Vendors Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-femfuel-medium">Proveedor</th>
                  <th className="text-left py-3 px-4 font-medium text-femfuel-medium">Negocio</th>
                  <th className="text-left py-3 px-4 font-medium text-femfuel-medium">Contacto</th>
                  <th className="text-left py-3 px-4 font-medium text-femfuel-medium">Ubicación</th>
                  <th className="text-left py-3 px-4 font-medium text-femfuel-medium">Rendimiento</th>
                  <th className="text-left py-3 px-4 font-medium text-femfuel-medium">Estado</th>
                  <th className="text-left py-3 px-4 font-medium text-femfuel-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-femfuel-gold/20 rounded-full flex items-center justify-center">
                          <Store className="h-5 w-5 text-femfuel-gold" />
                        </div>
                        <div>
                          <p className="font-medium text-femfuel-dark">{vendor.name}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {vendor.verified && (
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            )}
                            {vendor.rating > 0 && (
                              <>
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span className="text-xs text-femfuel-medium">{vendor.rating}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-femfuel-dark">{vendor.businessName}</p>
                        <p className="text-sm text-femfuel-medium">{vendor.businessType}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                          <Mail className="h-3 w-3" />
                          <span className="truncate max-w-32">{vendor.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                          <Phone className="h-3 w-3" />
                          {vendor.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                        <MapPin className="h-4 w-4" />
                        <div>
                          <p>{vendor.city}</p>
                          <p className="text-xs text-gray-400 truncate max-w-32">{vendor.address}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <p className="text-sm text-femfuel-medium">
                          {vendor.totalBookings} citas
                        </p>
                        <p className="text-sm font-medium text-femfuel-dark">
                          {formatCurrency(vendor.monthlyRevenue)}/mes
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vendor.status)}`}>
                        {vendor.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedVendor(vendor)}
                          className="gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          Ver
                        </Button>
                        {vendor.status === 'Pendiente' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVendorAction(vendor.id, 'approve')}
                            className="gap-1 text-green-600 hover:bg-green-50 border-green-200"
                          >
                            <CheckCircle className="h-3 w-3" />
                            Aprobar
                          </Button>
                        )}
                        {vendor.status === 'Activo' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVendorAction(vendor.id, 'suspend')}
                            className="gap-1 text-red-600 hover:bg-red-50 border-red-200"
                          >
                            <Ban className="h-3 w-3" />
                            Suspender
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination placeholder */}
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-femfuel-medium">
              Mostrando {filteredVendors.length} de {totalVendors} proveedores
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

      {/* Vendor Details Modal */}
      {selectedVendor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedVendor(null)}>
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full m-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-femfuel-dark">Detalles del Proveedor</h3>
              <button
                onClick={() => setSelectedVendor(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-femfuel-dark mb-3">Información Personal</h4>
                  <div className="space-y-2 text-sm text-femfuel-medium">
                    <p><strong>Nombre:</strong> {selectedVendor.name}</p>
                    <p><strong>Email:</strong> {selectedVendor.email}</p>
                    <p><strong>Teléfono:</strong> {selectedVendor.phone}</p>
                    <p><strong>Fecha de registro:</strong> {formatDate(selectedVendor.joinDate)}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-femfuel-dark mb-3">Información del Negocio</h4>
                  <div className="space-y-2 text-sm text-femfuel-medium">
                    <p><strong>Negocio:</strong> {selectedVendor.businessName}</p>
                    <p><strong>Tipo:</strong> {selectedVendor.businessType}</p>
                    <p><strong>Ciudad:</strong> {selectedVendor.city}</p>
                    <p><strong>Dirección:</strong> {selectedVendor.address}</p>
                  </div>
                </div>
              </div>

              {/* Performance Stats */}
              <div>
                <h4 className="font-medium text-femfuel-dark mb-3">Estadísticas</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-femfuel-medium">Rating</p>
                    <p className="text-lg font-bold text-femfuel-dark">
                      {selectedVendor.rating > 0 ? `⭐ ${selectedVendor.rating}` : 'Sin rating'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-femfuel-medium">Total Citas</p>
                    <p className="text-lg font-bold text-femfuel-dark">{selectedVendor.totalBookings}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-femfuel-medium">Ingresos Mensuales</p>
                    <p className="text-lg font-bold text-femfuel-dark">{formatCurrency(selectedVendor.monthlyRevenue)}</p>
                  </div>
                </div>
              </div>
              
              {/* Services */}
              <div>
                <h4 className="font-medium text-femfuel-dark mb-3">Servicios Ofrecidos</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedVendor.services.map((service, index) => (
                    <span key={index} className="px-3 py-1 bg-femfuel-purple text-femfuel-rose text-sm rounded-full">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verification Status */}
              <div>
                <h4 className="font-medium text-femfuel-dark mb-3">Estado de Verificación</h4>
                <div className="flex items-center gap-2">
                  {selectedVendor.verified ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-600">Verificado</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-5 w-5 text-yellow-600" />
                      <span className="text-yellow-600">Pendiente de verificación</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-6 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setSelectedVendor(null)}
                className="flex-1"
              >
                Cerrar
              </Button>
              {selectedVendor.status === 'Pendiente' ? (
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    handleVendorAction(selectedVendor.id, 'approve');
                    setSelectedVendor(null);
                  }}
                >
                  Aprobar Proveedor
                </Button>
              ) : selectedVendor.status === 'Activo' ? (
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => {
                    handleVendorAction(selectedVendor.id, 'suspend');
                    setSelectedVendor(null);
                  }}
                >
                  Suspender
                </Button>
              ) : (
                <Button
                  className="flex-1 bg-femfuel-rose hover:bg-femfuel-rose/90"
                  onClick={() => {
                    handleVendorAction(selectedVendor.id, 'activate');
                    setSelectedVendor(null);
                  }}
                >
                  Activar
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}