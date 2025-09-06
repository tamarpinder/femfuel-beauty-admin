'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  DollarSign,
  Users,
  Store,
  Package,
  Eye,
  Filter,
  FileText,
  PieChart
} from 'lucide-react';
import { mockUsers, mockVendors, mockBookings, mockProducts, getTotalRevenue, getMonthlyRevenue } from '@/lib/mockData';

export default function ReportesPage() {
  const [dateRange, setDateRange] = useState('30'); // Last 30 days
  const [reportType, setReportType] = useState('general');

  // Analytics calculations
  const totalUsers = mockUsers.length;
  const totalVendors = mockVendors.length;
  const totalBookings = mockBookings.length;
  const totalRevenue = getTotalRevenue();
  const monthlyRevenue = getMonthlyRevenue();
  const averageBookingValue = totalRevenue / totalBookings;

  // Growth calculations (mock data)
  const userGrowth = 12.5; // percentage
  const revenueGrowth = 18.2;
  const bookingGrowth = 15.8;
  const vendorGrowth = 8.3;

  // Top performers
  const topVendors = mockVendors
    .filter(v => v.status === 'Activo')
    .sort((a, b) => b.monthlyRevenue - a.monthlyRevenue)
    .slice(0, 5);

  const topUsers = mockUsers
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);

  // Booking status distribution
  const bookingStats = {
    completed: mockBookings.filter(b => b.status === 'Completada').length,
    confirmed: mockBookings.filter(b => b.status === 'Confirmada').length,
    pending: mockBookings.filter(b => b.status === 'Pendiente').length,
    cancelled: mockBookings.filter(b => b.status === 'Cancelada').length
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const generateReport = (type: string) => {
    console.log(`Generating ${type} report...`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-femfuel-dark">
            Reportes y Análisis
          </h1>
          <p className="text-femfuel-medium">
            Análisis detallado del rendimiento de la plataforma
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-femfuel-rose"
          >
            <option value="7">Últimos 7 días</option>
            <option value="30">Últimos 30 días</option>
            <option value="90">Últimos 3 meses</option>
            <option value="365">Último año</option>
          </select>
          <Button className="bg-femfuel-rose hover:bg-femfuel-rose/90 text-white gap-2">
            <Download className="h-4 w-4" />
            Exportar Reporte
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-femfuel-medium">Ingresos Totales</p>
                <p className="text-2xl font-bold text-femfuel-dark">{formatCurrency(totalRevenue)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">
                    {formatPercentage(revenueGrowth)}
                  </span>
                </div>
              </div>
              <div className="p-2 bg-femfuel-purple rounded-lg">
                <DollarSign className="h-5 w-5 text-femfuel-rose" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-femfuel-medium">Usuarios Activos</p>
                <p className="text-2xl font-bold text-femfuel-dark">{totalUsers}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">
                    {formatPercentage(userGrowth)}
                  </span>
                </div>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-femfuel-medium">Reservas Totales</p>
                <p className="text-2xl font-bold text-femfuel-dark">{totalBookings}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">
                    {formatPercentage(bookingGrowth)}
                  </span>
                </div>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-femfuel-medium">Proveedores</p>
                <p className="text-2xl font-bold text-femfuel-dark">{totalVendors}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">
                    {formatPercentage(vendorGrowth)}
                  </span>
                </div>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Store className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-femfuel-dark flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Ingresos por Mes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-femfuel-medium">Enero</span>
                <span className="font-medium text-femfuel-dark">{formatCurrency(28500)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-femfuel-rose h-2 rounded-full" style={{width: '65%'}}></div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-femfuel-medium">Febrero</span>
                <span className="font-medium text-femfuel-dark">{formatCurrency(32100)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-femfuel-rose h-2 rounded-full" style={{width: '73%'}}></div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-femfuel-medium">Marzo</span>
                <span className="font-medium text-femfuel-dark">{formatCurrency(35800)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-femfuel-rose h-2 rounded-full" style={{width: '82%'}}></div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-femfuel-medium">Abril</span>
                <span className="font-medium text-femfuel-dark">{formatCurrency(43600)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-femfuel-rose h-2 rounded-full" style={{width: '100%'}}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-femfuel-dark flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Estado de Reservas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-femfuel-medium">Completadas</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-femfuel-dark">{bookingStats.completed}</p>
                  <p className="text-xs text-femfuel-medium">
                    {((bookingStats.completed / totalBookings) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-femfuel-medium">Confirmadas</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-femfuel-dark">{bookingStats.confirmed}</p>
                  <p className="text-xs text-femfuel-medium">
                    {((bookingStats.confirmed / totalBookings) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-femfuel-medium">Pendientes</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-femfuel-dark">{bookingStats.pending}</p>
                  <p className="text-xs text-femfuel-medium">
                    {((bookingStats.pending / totalBookings) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-femfuel-medium">Canceladas</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-femfuel-dark">{bookingStats.cancelled}</p>
                  <p className="text-xs text-femfuel-medium">
                    {((bookingStats.cancelled / totalBookings) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Vendors */}
        <Card>
          <CardHeader>
            <CardTitle className="text-femfuel-dark">Top Proveedores del Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topVendors.map((vendor, index) => (
                <div key={vendor.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-femfuel-gold/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-femfuel-gold">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-femfuel-dark">{vendor.businessName}</p>
                      <p className="text-xs text-femfuel-medium">{vendor.city}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-femfuel-dark">{formatCurrency(vendor.monthlyRevenue)}</p>
                    <p className="text-xs text-femfuel-medium">{vendor.totalBookings} citas</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Users */}
        <Card>
          <CardHeader>
            <CardTitle className="text-femfuel-dark">Usuarios más Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topUsers.map((user, index) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-femfuel-purple rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-femfuel-rose">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-femfuel-dark">{user.name}</p>
                      <p className="text-xs text-femfuel-medium">{user.city}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-femfuel-dark">{formatCurrency(user.totalSpent)}</p>
                    <p className="text-xs text-femfuel-medium">{user.totalBookings} citas</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="text-femfuel-dark">Reportes Rápidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2 hover:bg-femfuel-rose/5"
              onClick={() => generateReport('revenue')}
            >
              <DollarSign className="h-5 w-5" />
              <span className="text-sm">Reporte de Ingresos</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2 hover:bg-femfuel-rose/5"
              onClick={() => generateReport('users')}
            >
              <Users className="h-5 w-5" />
              <span className="text-sm">Reporte de Usuarios</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2 hover:bg-femfuel-rose/5"
              onClick={() => generateReport('vendors')}
            >
              <Store className="h-5 w-5" />
              <span className="text-sm">Reporte de Proveedores</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2 hover:bg-femfuel-rose/5"
              onClick={() => generateReport('bookings')}
            >
              <Calendar className="h-5 w-5" />
              <span className="text-sm">Reporte de Reservas</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-femfuel-dark">{formatCurrency(averageBookingValue)}</p>
              <p className="text-sm text-femfuel-medium">Valor Promedio por Reserva</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-femfuel-dark">
                {mockVendors.filter(v => v.verified).length}
              </p>
              <p className="text-sm text-femfuel-medium">Proveedores Verificados</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-femfuel-dark">
                {Math.round(mockVendors.reduce((sum, v) => sum + v.rating, 0) / mockVendors.filter(v => v.rating > 0).length * 10) / 10}
              </p>
              <p className="text-sm text-femfuel-medium">Rating Promedio</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}