'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Store, 
  DollarSign, 
  Package, 
  TrendingUp, 
  UserPlus 
} from 'lucide-react';
import { mockData } from '@/data/shared/mock-data';

// Calculate real stats from mock data
const totalUsers = mockData.users.filter(u => u.role !== 'admin').length;
const totalVendors = mockData.vendorProfiles.length;
const totalCustomers = mockData.customerProfiles.length;
const totalServices = mockData.services.length;
const completedBookings = mockData.bookings.filter(b => b.status === 'completed');
const totalRevenue = completedBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
const pendingBookings = mockData.bookings.filter(b => b.status === 'pending').length;
const popularServices = mockData.services.filter(s => s.isPopular).length;
const recentUsers = mockData.users.filter(u => u.role === 'customer').slice(-5);

const dashboardStats = [
  {
    title: 'Total Usuarios',
    value: totalUsers.toLocaleString(),
    change: '+12%',
    changeType: 'positive' as const,
    icon: Users,
    description: `${totalCustomers} clientes + ${totalVendors} proveedores`
  },
  {
    title: 'Proveedores Activos',
    value: totalVendors.toString(),
    change: '+5%',
    changeType: 'positive' as const,
    icon: Store,
    description: 'verificados y operando'
  },
  {
    title: 'Ventas del Mes',
    value: `RD$ ${totalRevenue.toLocaleString()}`,
    change: '+18%',
    changeType: 'positive' as const,
    icon: DollarSign,
    description: `${completedBookings.length} reservas completadas`
  },
  {
    title: 'Reservas Pendientes',
    value: pendingBookings.toString(),
    change: '-8%',
    changeType: 'negative' as const,
    icon: Package,
    description: 'por confirmar'
  },
  {
    title: 'Servicios Populares',
    value: popularServices.toString(),
    change: '+23%',
    changeType: 'positive' as const,
    icon: TrendingUp,
    description: `de ${totalServices} servicios totales`
  },
  {
    title: 'Nuevos Registros Hoy',
    value: '12',
    change: '+4',
    changeType: 'positive' as const,
    icon: UserPlus,
    description: 'usuarios nuevos'
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-femfuel-dark">
          Panel Principal
        </h1>
        <p className="text-femfuel-medium">
          Resumen general de la plataforma FemFuel Beauty
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-femfuel-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-femfuel-rose" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-femfuel-dark">
                    {stat.value}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span 
                      className={`font-medium ${
                        stat.changeType === 'positive' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-femfuel-medium">
                      {stat.description}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle className="text-femfuel-dark">Usuarios Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.customerProfiles.slice(-4).map((customer, index) => (
                <div key={customer.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-femfuel-purple rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-femfuel-rose">
                        {customer.user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-femfuel-dark">{customer.user.name}</p>
                      <p className="text-xs text-femfuel-medium">{customer.user.email}</p>
                    </div>
                  </div>
                  <span className="text-xs text-femfuel-medium">
                    {index === 0 ? 'hace 2 horas' : index === 1 ? 'hace 4 horas' : index === 2 ? 'hace 6 horas' : 'ayer'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Providers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-femfuel-dark">Proveedores Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.vendorProfiles.slice(-4).map((vendor, index) => (
                <div key={vendor.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-femfuel-gold/20 rounded-full flex items-center justify-center">
                      <Store className="h-4 w-4 text-femfuel-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-femfuel-dark">{vendor.businessName}</p>
                      <p className="text-xs text-femfuel-medium">
                        {vendor.categories[0]} • {vendor.location.city}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    vendor.isActive && vendor.isVerified
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {vendor.isActive && vendor.isVerified ? 'Activo' : 'Pendiente'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}