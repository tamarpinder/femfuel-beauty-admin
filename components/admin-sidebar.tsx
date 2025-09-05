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
      { name: 'Todos los Usuarios', href: '/dashboard/users', icon: Users },
      { name: 'Proveedores', href: '/dashboard/users/vendors', icon: Building2 },
      { name: 'Clientes', href: '/dashboard/users/customers', icon: UserCheck }
    ]
  },
  {
    name: 'Reservaciones',
    href: '/dashboard/bookings',
    icon: Calendar
  },
  {
    name: 'Servicios',
    href: '/dashboard/services',
    icon: Store
  },
  {
    name: 'Análisis',
    href: '/dashboard/analytics',
    icon: BarChart3
  },
  {
    name: 'Ingresos',
    href: '/dashboard/revenue',
    icon: CreditCard
  },
  {
    name: 'Reseñas',
    href: '/dashboard/reviews',
    icon: Star
  },
  {
    name: 'Soporte',
    href: '/dashboard/support',
    icon: MessageSquare
  },
  {
    name: 'Configuración',
    href: '/dashboard/settings',
    icon: Settings
  }
]

function NavItem({ item }: { item: any }) {
  const pathname = usePathname()
  
  if (item.children) {
    return (
      <div className="space-y-1">
        <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground">
          <item.icon className="h-4 w-4" />
          {item.name}
        </div>
        <div className="ml-4 space-y-1">
          {item.children.map((child: any) => (
            <Link
              key={child.href}
              href={child.href}
              className={cn(
                "admin-nav-item",
                pathname === child.href && "data-[active=true]"
              )}
              data-active={pathname === child.href}
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
        "admin-nav-item",
        pathname === item.href && "data-[active=true]"
      )}
      data-active={pathname === item.href}
    >
      <item.icon className="h-4 w-4" />
      {item.name}
    </Link>
  )
}

export function AdminSidebar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-6 overflow-y-auto bg-sidebar border-r border-sidebar-border px-4 py-6">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">FemFuel</h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col gap-y-1">
            {navigation.map((item) => (
              <li key={item.name || item.href}>
                <NavItem item={item} />
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border pt-4">
          <p className="text-xs text-muted-foreground px-2">
            © 2025 FemFuel Beauty v1.0
          </p>
        </div>
      </div>
    </div>
  )
}