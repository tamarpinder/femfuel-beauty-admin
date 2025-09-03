'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Calendar, 
  TrendingUp, 
  MessageSquare, 
  Settings, 
  Shield,
  FileText,
  CreditCard,
  AlertTriangle,
  BarChart3,
  UserCheck,
  Store,
  Star
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  {
    name: 'Panel Principal',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Gestión de Usuarios',
    icon: Users,
    children: [
      { name: 'Todos los Usuarios', href: '/dashboard/usuarios', icon: Users },
      { name: 'Proveedores', href: '/dashboard/usuarios/proveedores', icon: Building2 },
      { name: 'Clientes', href: '/dashboard/usuarios/clientes', icon: UserCheck }
    ]
  },
  {
    name: 'Reservas y Servicios',
    icon: Calendar,
    children: [
      { name: 'Todas las Reservas', href: '/dashboard/reservas', icon: Calendar },
      { name: 'Servicios Activos', href: '/dashboard/servicios', icon: Store },
      { name: 'Reseñas y Calificaciones', href: '/dashboard/resenas', icon: Star }
    ]
  },
  {
    name: 'Análisis y Reportes',
    icon: TrendingUp,
    children: [
      { name: 'Métricas Generales', href: '/dashboard/analytics', icon: BarChart3 },
      { name: 'Ingresos y Ganancias', href: '/dashboard/ingresos', icon: CreditCard },
      { name: 'Reportes Detallados', href: '/dashboard/reportes', icon: FileText }
    ]
  },
  {
    name: 'Comunicación',
    icon: MessageSquare,
    children: [
      { name: 'Tickets de Soporte', href: '/dashboard/soporte', icon: MessageSquare },
      { name: 'Moderación de Contenido', href: '/dashboard/moderacion', icon: Shield }
    ]
  },
  {
    name: 'Configuración',
    href: '/dashboard/configuracion',
    icon: Settings
  },
  {
    name: 'Logs del Sistema',
    href: '/dashboard/logs',
    icon: AlertTriangle
  }
]

function NavItem({ item, isActive }: { item: any, isActive: boolean }) {
  const pathname = usePathname()
  
  if (item.children) {
    return (
      <div className="space-y-1">
        <div className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-femfuel-dark">
          <item.icon className="h-5 w-5" />
          {item.name}
        </div>
        <div className="ml-4 space-y-1">
          {item.children.map((child: any) => (
            <Link
              key={child.href}
              href={child.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors",
                pathname === child.href
                  ? "bg-femfuel-purple text-femfuel-rose font-medium"
                  : "text-femfuel-medium hover:text-femfuel-dark hover:bg-gray-100"
              )}
            >
              <child.icon className="h-4 w-4" />
              {child.name}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
        isActive
          ? "bg-femfuel-purple text-femfuel-rose"
          : "text-femfuel-medium hover:text-femfuel-dark hover:bg-gray-100"
      )}
    >
      <item.icon className="h-5 w-5" />
      {item.name}
    </Link>
  )
}

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-4 py-6">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-femfuel-rose rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-femfuel-dark">FemFuel</h1>
            <p className="text-xs text-femfuel-medium">Panel Admin</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col gap-y-2">
            {navigation.map((item) => (
              <li key={item.name || item.href}>
                <NavItem 
                  item={item} 
                  isActive={pathname === item.href || (item.children && item.children.some((child: any) => child.href === pathname))}
                />
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-4">
          <p className="text-xs text-femfuel-medium px-2">
            © 2025 FemFuel Beauty
          </p>
          <p className="text-xs text-gray-400 px-2">
            Panel de Administración v1.0
          </p>
        </div>
      </div>
    </div>
  )
}