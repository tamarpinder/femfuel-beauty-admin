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
  DollarSign,
  Calendar,
  Phone,
  MapPin
} from 'lucide-react';
import { mockData } from '@/data/shared/mock-data';

export default function UsuariosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const customers = mockData.customerProfiles;

  const filteredUsers = useMemo(() => {
    return customers.filter(customer => {
      const matchesSearch = 
        customer.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.preferences.location.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'Todos' || 
        (statusFilter === 'Activo' && customer.totalBookings > 0) ||
        (statusFilter === 'Inactivo' && customer.totalBookings === 0);
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const totalUsers = customers.length;
  const activeUsers = customers.filter(c => c.totalBookings > 0).length;
  const suspendedUsers = 0; // No suspended users in our data
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);

  const handleUserAction = (userId: string, action: 'suspend' | 'activate') => {
    // In a real app, this would make an API call
    console.log(`Action: ${action} for user: ${userId}`);
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-femfuel-dark">
            Gestión de Usuarios
          </h1>
          <p className="text-femfuel-medium">
            Administra y supervisa todos los usuarios de la plataforma
          </p>
        </div>
        <Button className="bg-femfuel-rose hover:bg-femfuel-rose/90 text-white gap-2">
          <Download className="h-4 w-4" />
          Exportar Datos
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-femfuel-purple rounded-lg">
                <CheckCircle className="h-5 w-5 text-femfuel-rose" />
              </div>
              <div>
                <p className="text-sm text-femfuel-medium">Total Usuarios</p>
                <p className="text-2xl font-bold text-femfuel-dark">{totalUsers}</p>
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
                <p className="text-sm text-femfuel-medium">Usuarios Activos</p>
                <p className="text-2xl font-bold text-femfuel-dark">{activeUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Ban className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-femfuel-medium">Suspendidos</p>
                <p className="text-2xl font-bold text-femfuel-dark">{suspendedUsers}</p>
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
                <p className="text-sm text-femfuel-medium">Ingresos Totales</p>
                <p className="text-2xl font-bold text-femfuel-dark">{formatCurrency(totalRevenue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-femfuel-dark">Lista de Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nombre, email o ciudad..."
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
                <option value="Todos">Todos los usuarios</option>
                <option value="Activo">Activos (con reservas)</option>
                <option value="Inactivo">Inactivos (sin reservas)</option>
              </select>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-femfuel-medium">Usuario</th>
                  <th className="text-left py-3 px-4 font-medium text-femfuel-medium">Contacto</th>
                  <th className="text-left py-3 px-4 font-medium text-femfuel-medium">Ubicación</th>
                  <th className="text-left py-3 px-4 font-medium text-femfuel-medium">Estadísticas</th>
                  <th className="text-left py-3 px-4 font-medium text-femfuel-medium">Estado</th>
                  <th className="text-left py-3 px-4 font-medium text-femfuel-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-femfuel-purple rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-femfuel-rose">
                            {customer.user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-femfuel-dark">{customer.user.name}</p>
                          <p className="text-sm text-femfuel-medium">{customer.user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                        <Phone className="h-4 w-4" />
                        {customer.user.phone}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                        <MapPin className="h-4 w-4" />
                        {customer.preferences.location.city}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <p className="text-sm text-femfuel-medium">
                          {customer.totalBookings} citas
                        </p>
                        <p className="text-sm font-medium text-femfuel-dark">
                          {formatCurrency(customer.totalSpent)}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        customer.totalBookings > 0
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {customer.totalBookings > 0 ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedUser(customer)}
                          className="gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          Ver
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUserAction(customer.id, customer.totalBookings > 0 ? 'suspend' : 'activate')}
                          className="gap-1 text-blue-600 hover:bg-blue-50 border-blue-200"
                        >
                          <CheckCircle className="h-3 w-3" />
                          Gestionar
                        </Button>
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
              Mostrando {filteredUsers.length} de {totalUsers} usuarios
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

      {/* User Details Modal (simplified) */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedUser(null)}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-femfuel-dark">Detalles del Usuario</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-femfuel-dark mb-2">{selectedUser.user.name}</h4>
                <div className="space-y-2 text-sm text-femfuel-medium">
                  <p><strong>Email:</strong> {selectedUser.user.email}</p>
                  <p><strong>Teléfono:</strong> {selectedUser.user.phone}</p>
                  <p><strong>Ciudad:</strong> {selectedUser.preferences.location.city}</p>
                  <p><strong>Distrito:</strong> {selectedUser.preferences.location.district}</p>
                  <p><strong>Fecha de registro:</strong> {formatDate(selectedUser.createdAt)}</p>
                  <p><strong>Total de citas:</strong> {selectedUser.totalBookings}</p>
                  <p><strong>Total gastado:</strong> {formatCurrency(selectedUser.totalSpent)}</p>
                  <p><strong>Nivel de lealtad:</strong> {selectedUser.loyaltyLevel}</p>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-femfuel-dark mb-2">Categorías Preferidas</h5>
                <div className="flex flex-wrap gap-1">
                  {selectedUser.preferences.categories.map((category, index) => (
                    <span key={index} className="px-2 py-1 bg-femfuel-purple text-femfuel-rose text-xs rounded-full">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setSelectedUser(null)}
                className="flex-1"
              >
                Cerrar
              </Button>
              <Button
                className="flex-1 bg-femfuel-rose hover:bg-femfuel-rose/90"
                onClick={() => {
                  handleUserAction(selectedUser.id, selectedUser.status === 'Activo' ? 'suspend' : 'activate');
                  setSelectedUser(null);
                }}
              >
                {selectedUser.status === 'Activo' ? 'Suspender' : 'Activar'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}