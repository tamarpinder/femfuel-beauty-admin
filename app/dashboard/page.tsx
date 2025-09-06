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

const dashboardStats = [
  {
    title: 'Total Usuarios',
    value: '2,543',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Users,
    description: 'desde el mes pasado'
  },
  {
    title: 'Proveedores Activos',
    value: '89',
    change: '+5%',
    changeType: 'positive' as const,
    icon: Store,
    description: 'verificados y operando'
  },
  {
    title: 'Ventas del Mes',
    value: 'RD$ 125,750',
    change: '+18%',
    changeType: 'positive' as const,
    icon: DollarSign,
    description: 'ingresos totales'
  },
  {
    title: 'Pedidos Pendientes',
    value: '47',
    change: '-8%',
    changeType: 'negative' as const,
    icon: Package,
    description: 'por procesar'
  },
  {
    title: 'Productos Populares',
    value: '156',
    change: '+23%',
    changeType: 'positive' as const,
    icon: TrendingUp,
    description: 'más solicitados'
  },
  {
    title: 'Nuevos Registros Hoy',
    value: '24',
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
              {[
                { name: 'María González', email: 'maria@email.com', time: 'hace 2 horas' },
                { name: 'Ana Martínez', email: 'ana@email.com', time: 'hace 4 horas' },
                { name: 'Carmen López', email: 'carmen@email.com', time: 'hace 6 horas' },
                { name: 'Sofia Rodríguez', email: 'sofia@email.com', time: 'ayer' }
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-femfuel-purple rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-femfuel-rose">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-femfuel-dark">{user.name}</p>
                      <p className="text-xs text-femfuel-medium">{user.email}</p>
                    </div>
                  </div>
                  <span className="text-xs text-femfuel-medium">{user.time}</span>
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
              {[
                { name: 'Beauty Studio Rosa', type: 'Salón de Belleza', city: 'Santo Domingo', status: 'Activo' },
                { name: 'Spa Relax Total', type: 'Spa', city: 'Santiago', status: 'Pendiente' },
                { name: 'Barbería El Corte', type: 'Barbería', city: 'La Romana', status: 'Activo' },
                { name: 'Nails Art Studio', type: 'Uñas', city: 'Puerto Plata', status: 'Activo' }
              ].map((provider, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-femfuel-gold/20 rounded-full flex items-center justify-center">
                      <Store className="h-4 w-4 text-femfuel-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-femfuel-dark">{provider.name}</p>
                      <p className="text-xs text-femfuel-medium">{provider.type} • {provider.city}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    provider.status === 'Activo' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {provider.status}
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