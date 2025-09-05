'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Users,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Star,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'
import { MetricCard } from '@/components/metric-card'
import { ChartContainer } from '@/components/chart-container'
import { RecentActivity } from '@/components/recent-activity'
import { supabaseAdmin } from '@/lib/supabase'

interface DashboardStats {
  totalUsers: number
  totalVendors: number
  totalCustomers: number
  totalBookings: number
  monthlyRevenue: number
  averageRating: number
  activeServices: number
  pendingTickets: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalVendors: 0,
    totalCustomers: 0,
    totalBookings: 0,
    monthlyRevenue: 0,
    averageRating: 0,
    activeServices: 0,
    pendingTickets: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      
      if (!supabaseAdmin) {
        console.log('Supabase admin not configured, using mock data')
        setStats({
          totalUsers: 156,
          totalVendors: 24,
          totalCustomers: 132,
          totalBookings: 89,
          monthlyRevenue: 73540,
          averageRating: 4.8,
          activeServices: 42,
          pendingTickets: 5
        })
        return
      }
      
      // Get user counts from auth.users
      const { data: users } = await supabaseAdmin.auth.admin.listUsers()
      
      const vendors = users?.users?.filter((user: any) => user.user_metadata?.role === 'vendor') || []
      const customers = users?.users?.filter((user: any) => user.user_metadata?.role === 'customer') || []
      
      // Get vendor profiles count
      const { count: vendorCount } = await supabaseAdmin
        .from('vendor_profiles')
        .select('*', { count: 'exact' })
        .eq('is_active', true)
      
      // Get services count
      const { count: servicesCount } = await supabaseAdmin
        .from('vendor_services')
        .select('*', { count: 'exact' })
      
      setStats({
        totalUsers: users?.users?.length || 0,
        totalVendors: vendors.length,
        totalCustomers: customers.length,
        totalBookings: 0, // Will be implemented when bookings table exists
        monthlyRevenue: 0, // Will be calculated from transactions
        averageRating: 4.8, // Will be calculated from reviews
        activeServices: servicesCount || 0,
        pendingTickets: 0 // Will be from support tickets
      })
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const metrics = [
    {
      title: 'Total de Usuarios',
      value: stats.totalUsers.toString(),
      change: '+12%',
      trend: 'up' as const,
      icon: Users,
      description: 'Usuarios registrados en la plataforma'
    },
    {
      title: 'Proveedores Activos',
      value: stats.totalVendors.toString(),
      change: '+8%',
      trend: 'up' as const,
      icon: Building2,
      description: 'Salones y profesionales verificados'
    },
    {
      title: 'Clientes Registrados',
      value: stats.totalCustomers.toString(),
      change: '+15%',
      trend: 'up' as const,
      icon: Users,
      description: 'Clientes activos en la plataforma'
    },
    {
      title: 'Servicios Disponibles',
      value: stats.activeServices.toString(),
      change: '+5%',
      trend: 'up' as const,
      icon: Star,
      description: 'Servicios activos ofrecidos'
    },
    {
      title: 'Reservas del Mes',
      value: stats.totalBookings.toString(),
      change: '+23%',
      trend: 'up' as const,
      icon: Calendar,
      description: 'Reservas completadas este mes'
    },
    {
      title: 'Ingresos Mensuales',
      value: `RD$${stats.monthlyRevenue.toLocaleString()}`,
      change: '+18%',
      trend: 'up' as const,
      icon: DollarSign,
      description: 'Comisiones generadas este mes'
    },
    {
      title: 'Calificación Promedio',
      value: stats.averageRating.toString(),
      change: '+0.2',
      trend: 'up' as const,
      icon: Star,
      description: 'Satisfacción promedio de clientes'
    },
    {
      title: 'Tickets Pendientes',
      value: stats.pendingTickets.toString(),
      change: '-3',
      trend: 'down' as const,
      icon: MessageSquare,
      description: 'Tickets de soporte por resolver'
    }
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panel Principal</h1>
          <p className="text-muted-foreground mt-1">
            ¡Bienvenido de vuelta! Aquí tienes el resumen de FemFuel Beauty.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Exportar Datos
          </Button>
          <Button size="sm">
            Ver Reportes
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <ChartContainer 
            title="Ingresos Mensuales"
            description="Ingresos por comisiones de la plataforma"
          />
        </div>

        {/* Recent Activity */}
        <div>
          <RecentActivity />
        </div>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="usuarios" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
          <TabsTrigger value="reservas">Reservas</TabsTrigger>
          <TabsTrigger value="ingresos">Ingresos</TabsTrigger>
          <TabsTrigger value="soporte">Soporte</TabsTrigger>
        </TabsList>
        
        <TabsContent value="usuarios" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-femfuel-dark">
                  Nuevos Usuarios (7 días)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-femfuel-rose mb-1">
                  +24
                </div>
                <p className="text-sm text-femfuel-medium">
                  18 clientes, 6 proveedores
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-femfuel-dark">
                  Usuarios Activos Hoy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-femfuel-rose mb-1">
                  156
                </div>
                <p className="text-sm text-femfuel-medium">
                  +23% vs ayer
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-femfuel-dark">
                  Tasa de Retención
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-femfuel-rose mb-1">
                  89%
                </div>
                <p className="text-sm text-femfuel-medium">
                  Usuarios que regresan
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reservas" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-femfuel-dark">
                  Reservas de Hoy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-femfuel-rose mb-1">
                  42
                </div>
                <p className="text-sm text-femfuel-medium">
                  +12% vs ayer
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-femfuel-dark">
                  Tasa de Completación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-femfuel-rose mb-1">
                  94%
                </div>
                <p className="text-sm text-femfuel-medium">
                  Reservas completadas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-femfuel-dark">
                  Cancelaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500 mb-1">
                  3
                </div>
                <p className="text-sm text-femfuel-medium">
                  -2 vs ayer
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ingresos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-femfuel-dark">
                  Ingresos de Hoy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-femfuel-rose mb-1">
                  RD$12,450
                </div>
                <p className="text-sm text-femfuel-medium">
                  +18% vs ayer
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-femfuel-dark">
                  Comisión Promedio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-femfuel-rose mb-1">
                  RD$275
                </div>
                <p className="text-sm text-femfuel-medium">
                  Por transacción
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-femfuel-dark">
                  Proveedor Top
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold text-femfuel-rose mb-1">
                  Glamour House
                </div>
                <p className="text-sm text-femfuel-medium">
                  RD$2,340 generados
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="soporte" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-femfuel-dark">
                  Tickets Nuevos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-500 mb-1">
                  5
                </div>
                <p className="text-sm text-femfuel-medium">
                  Requieren atención
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-femfuel-dark">
                  Tiempo de Respuesta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-femfuel-rose mb-1">
                  2.5h
                </div>
                <p className="text-sm text-femfuel-medium">
                  Promedio de respuesta
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-femfuel-dark">
                  Satisfacción
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-femfuel-rose mb-1">
                  4.7
                </div>
                <p className="text-sm text-femfuel-medium">
                  Calificación promedio
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}