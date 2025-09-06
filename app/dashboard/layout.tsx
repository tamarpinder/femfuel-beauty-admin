'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  Package, 
  BarChart3, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const sidebarItems = [
  { 
    name: 'Panel Principal', 
    href: '/dashboard', 
    icon: LayoutDashboard 
  },
  { 
    name: 'Usuarios', 
    href: '/dashboard/usuarios', 
    icon: Users 
  },
  { 
    name: 'Proveedores', 
    href: '/dashboard/proveedores', 
    icon: Store 
  },
  { 
    name: 'Productos', 
    href: '/dashboard/productos', 
    icon: Package 
  },
  { 
    name: 'Reportes', 
    href: '/dashboard/reportes', 
    icon: BarChart3 
  },
  { 
    name: 'Configuración', 
    href: '/dashboard/configuracion', 
    icon: Settings 
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    // TODO: Implement proper logout
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-femfuel-light">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <Image 
                src="/femfuel-logo.png" 
                alt="FemFuel Beauty" 
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <h1 className="text-xl font-semibold text-femfuel-dark hidden sm:block">
                Panel Administrativo
              </h1>
            </div>
          </div>

          {/* Right side - Admin info */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-femfuel-dark">Administrador</p>
              <p className="text-xs text-femfuel-medium">admin@femfuel.com</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:translate-x-0 lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 pt-16 lg:pt-0 transition-transform duration-200`}>
          <nav className="h-full py-4 px-3 overflow-y-auto">
            <ul className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-femfuel-rose text-white' 
                          : 'text-femfuel-medium hover:bg-gray-100 hover:text-femfuel-dark'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}