# FemFuel Beauty - Panel de Administración

Panel de administración para la plataforma FemFuel Beauty, desarrollado con Next.js 15 y Supabase.

## 🚀 Características

- **Dashboard completo** con métricas en tiempo real
- **Gestión de usuarios** (proveedores y clientes)  
- **Análisis y reportes** detallados
- **Sistema de autenticación** con roles de admin
- **Diseño responsivo** para desktop y móvil
- **100% en español dominicano**
- **Integración completa** con Supabase

## 🛠️ Tecnologías

- **Framework**: Next.js 15 con App Router
- **Base de datos**: Supabase
- **Estilos**: Tailwind CSS + FemFuel Design System
- **UI Components**: Radix UI + shadcn/ui
- **Gráficos**: Recharts
- **Autenticación**: Supabase Auth con roles
- **TypeScript**: Completamente tipado

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/tamarpinder/femfuel-beauty-admin.git
cd femfuel-beauty-admin

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev
```

## 🔧 Configuración

1. Crear proyecto en [Supabase](https://supabase.com)
2. Configurar variables de entorno en `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

3. Crear usuario admin en Supabase con `role: 'admin'` en user_metadata

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conectar repositorio en [Vercel](https://vercel.com)
2. Configurar variables de entorno en Vercel
3. Desplegar automáticamente

### Build local

```bash
npm run build
npm start
```

## 📱 Funcionalidades

### Dashboard Principal
- Métricas de usuarios, proveedores, reservas e ingresos
- Gráficos de rendimiento en tiempo real
- Actividad reciente de la plataforma
- Vista general de KPIs importantes

### Gestión de Usuarios
- Lista completa de usuarios registrados
- Gestión de proveedores verificados
- Administración de clientes activos
- Herramientas de moderación

### Analytics y Reportes
- Métricas generales de la plataforma
- Análisis de ingresos y ganancias
- Reportes detallados descargables
- Tendencias y proyecciones

### Comunicación
- Sistema de tickets de soporte
- Moderación de contenido
- Notificaciones administrativas

## 🔐 Seguridad

- Autenticación basada en roles
- Verificación de permisos de admin
- Variables de entorno para credenciales
- Protección de rutas administrativas

## 🎨 Diseño

Implementa el sistema de diseño FemFuel con:
- **Colores primarios**: Rosa (#b91c5c) y Dorado (#d4af37)
- **Tipografía**: Sistema de fuentes optimizado
- **Iconografía**: Lucide React
- **Componentes**: Biblioteca consistente

## 📄 Licencia

© 2025 FemFuel Beauty. Todos los derechos reservados.

## 🤝 Soporte

Para soporte técnico, contactar al equipo de desarrollo.