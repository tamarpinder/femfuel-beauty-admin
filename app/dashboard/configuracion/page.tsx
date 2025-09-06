'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Settings,
  Save,
  User,
  Shield,
  Bell,
  Globe,
  CreditCard,
  Mail,
  Database,
  Key,
  Users,
  Eye,
  EyeOff,
  Check,
  X,
  AlertTriangle
} from 'lucide-react';

export default function ConfiguracionPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'FemFuel Beauty',
    siteDescription: 'Plataforma líder de servicios de belleza en República Dominicana',
    adminEmail: 'admin@femfuel.com',
    supportEmail: 'support@femfuel.com',
    phone: '+1 809 555 0100',
    address: 'Av. Winston Churchill, Santo Domingo',
    notifications: {
      newUsers: true,
      newVendors: true,
      newBookings: true,
      payments: true,
      systemAlerts: true,
      emailReports: false
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordExpiry: 90,
      maxLoginAttempts: 5
    },
    business: {
      commissionRate: 15,
      currency: 'DOP',
      timezone: 'America/Santo_Domingo',
      language: 'es',
      vatRate: 18
    },
    integrations: {
      emailService: 'active',
      smsService: 'active',
      paymentGateway: 'active',
      analytics: 'active'
    }
  });

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => {
      const currentSection = prev[section as keyof typeof prev];
      if (typeof currentSection === 'object' && currentSection !== null) {
        return {
          ...prev,
          [section]: {
            ...currentSection,
            [key]: value
          }
        };
      }
      return prev;
    });
  };

  const handleSave = () => {
    console.log('Saving settings...', settings);
    // In a real app, this would save to backend
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Seguridad', icon: Shield },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'business', label: 'Negocio', icon: CreditCard },
    { id: 'integrations', label: 'Integraciones', icon: Globe }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-femfuel-dark">
            Configuración del Sistema
          </h1>
          <p className="text-femfuel-medium">
            Administra la configuración general de la plataforma
          </p>
        </div>
        <Button 
          onClick={handleSave}
          className="bg-femfuel-rose hover:bg-femfuel-rose/90 text-white gap-2"
        >
          <Save className="h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-femfuel-rose text-white'
                          : 'text-femfuel-medium hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'general' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-femfuel-dark">Configuración General</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-femfuel-dark mb-2">
                        Nombre del Sitio
                      </label>
                      <Input
                        value={settings.siteName}
                        onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                        placeholder="Nombre de la plataforma"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-femfuel-dark mb-2">
                        Email del Administrador
                      </label>
                      <Input
                        type="email"
                        value={settings.adminEmail}
                        onChange={(e) => updateSetting('general', 'adminEmail', e.target.value)}
                        placeholder="admin@ejemplo.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-femfuel-dark mb-2">
                        Teléfono de Contacto
                      </label>
                      <Input
                        value={settings.phone}
                        onChange={(e) => updateSetting('general', 'phone', e.target.value)}
                        placeholder="+1 809 555 0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-femfuel-dark mb-2">
                        Descripción del Sitio
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-femfuel-rose"
                        rows={3}
                        value={settings.siteDescription}
                        onChange={(e) => updateSetting('general', 'siteDescription', e.target.value)}
                        placeholder="Descripción de la plataforma"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-femfuel-dark mb-2">
                        Email de Soporte
                      </label>
                      <Input
                        type="email"
                        value={settings.supportEmail}
                        onChange={(e) => updateSetting('general', 'supportEmail', e.target.value)}
                        placeholder="soporte@ejemplo.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-femfuel-dark mb-2">
                        Dirección
                      </label>
                      <Input
                        value={settings.address}
                        onChange={(e) => updateSetting('general', 'address', e.target.value)}
                        placeholder="Dirección física de la empresa"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-femfuel-dark">Configuración de Seguridad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-femfuel-rose" />
                      <div>
                        <p className="font-medium text-femfuel-dark">Autenticación de Dos Factores</p>
                        <p className="text-sm text-femfuel-medium">Aumenta la seguridad de las cuentas de administrador</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateSetting('security', 'twoFactorAuth', !settings.security.twoFactorAuth)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.security.twoFactorAuth ? 'bg-femfuel-rose' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-femfuel-dark mb-2">
                        Tiempo de Sesión (minutos)
                      </label>
                      <Input
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                        min="15"
                        max="480"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-femfuel-dark mb-2">
                        Expiración de Contraseña (días)
                      </label>
                      <Input
                        type="number"
                        value={settings.security.passwordExpiry}
                        onChange={(e) => updateSetting('security', 'passwordExpiry', parseInt(e.target.value))}
                        min="30"
                        max="365"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-femfuel-dark mb-2">
                      Máximo Intentos de Inicio de Sesión
                    </label>
                    <Input
                      type="number"
                      value={settings.security.maxLoginAttempts}
                      onChange={(e) => updateSetting('security', 'maxLoginAttempts', parseInt(e.target.value))}
                      min="3"
                      max="10"
                      className="w-32"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-femfuel-dark">Configuración de Notificaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries({
                    newUsers: 'Nuevos usuarios registrados',
                    newVendors: 'Nuevas solicitudes de proveedores',
                    newBookings: 'Nuevas reservas realizadas',
                    payments: 'Transacciones y pagos',
                    systemAlerts: 'Alertas del sistema',
                    emailReports: 'Reportes por correo electrónico'
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-femfuel-rose" />
                        <div>
                          <p className="font-medium text-femfuel-dark">{label}</p>
                          <p className="text-sm text-femfuel-medium">
                            Recibir notificaciones cuando ocurran estos eventos
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => updateSetting('notifications', key, !settings.notifications[key as keyof typeof settings.notifications])}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.notifications[key as keyof typeof settings.notifications] ? 'bg-femfuel-rose' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.notifications[key as keyof typeof settings.notifications] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'business' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-femfuel-dark">Configuración de Negocio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-femfuel-dark mb-2">
                        Comisión de Plataforma (%)
                      </label>
                      <Input
                        type="number"
                        value={settings.business.commissionRate}
                        onChange={(e) => updateSetting('business', 'commissionRate', parseInt(e.target.value))}
                        min="0"
                        max="50"
                        step="0.5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-femfuel-dark mb-2">
                        Moneda
                      </label>
                      <select
                        value={settings.business.currency}
                        onChange={(e) => updateSetting('business', 'currency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-femfuel-rose"
                      >
                        <option value="DOP">Peso Dominicano (DOP)</option>
                        <option value="USD">Dólar Americano (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-femfuel-dark mb-2">
                        Zona Horaria
                      </label>
                      <select
                        value={settings.business.timezone}
                        onChange={(e) => updateSetting('business', 'timezone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-femfuel-rose"
                      >
                        <option value="America/Santo_Domingo">Santo Domingo (GMT-4)</option>
                        <option value="America/New_York">New York (GMT-5)</option>
                        <option value="Europe/Madrid">Madrid (GMT+1)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-femfuel-dark mb-2">
                        ITBIS/IVA (%)
                      </label>
                      <Input
                        type="number"
                        value={settings.business.vatRate}
                        onChange={(e) => updateSetting('business', 'vatRate', parseInt(e.target.value))}
                        min="0"
                        max="30"
                        step="0.1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-femfuel-dark mb-2">
                        Idioma Predeterminado
                      </label>
                      <select
                        value={settings.business.language}
                        onChange={(e) => updateSetting('business', 'language', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-femfuel-rose"
                      >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'integrations' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-femfuel-dark">Integraciones Externas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries({
                    emailService: { name: 'Servicio de Email', description: 'SendGrid para emails transaccionales' },
                    smsService: { name: 'Servicio SMS', description: 'Twilio para mensajes de texto' },
                    paymentGateway: { name: 'Pasarela de Pagos', description: 'Stripe para procesamiento de pagos' },
                    analytics: { name: 'Google Analytics', description: 'Seguimiento y análisis de tráfico' }
                  }).map(([key, { name, description }]) => (
                    <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          settings.integrations[key as keyof typeof settings.integrations] === 'active' 
                            ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {settings.integrations[key as keyof typeof settings.integrations] === 'active' 
                            ? <Check className="h-5 w-5 text-green-600" />
                            : <X className="h-5 w-5 text-gray-400" />
                          }
                        </div>
                        <div>
                          <p className="font-medium text-femfuel-dark">{name}</p>
                          <p className="text-sm text-femfuel-medium">{description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          settings.integrations[key as keyof typeof settings.integrations] === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {settings.integrations[key as keyof typeof settings.integrations] === 'active' ? 'Activo' : 'Inactivo'}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateSetting('integrations', key, 
                            settings.integrations[key as keyof typeof settings.integrations] === 'active' ? 'inactive' : 'active'
                          )}
                        >
                          {settings.integrations[key as keyof typeof settings.integrations] === 'active' ? 'Desactivar' : 'Activar'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-femfuel-dark">Estado del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg">
                <Database className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-800">Base de Datos</p>
                <p className="text-sm text-green-600">Funcionando correctamente</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-800">Servidor Web</p>
                <p className="text-sm text-green-600">Operativo</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-yellow-800">Backup Automático</p>
                <p className="text-sm text-yellow-600">Programado para esta noche</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}