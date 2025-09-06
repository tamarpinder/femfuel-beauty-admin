'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Lock, Eye, EyeOff, Shield, Star, Users, TrendingUp, BarChart3, Settings } from 'lucide-react'
import { adminAuth } from '@/lib/supabase'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { data, error: authError } = await adminAuth.signIn(email, password)
      
      if (authError) {
        if (authError.message.includes('Invalid login credentials')) {
          setError('Credenciales incorrectas. Verifica tu correo electrónico y contraseña.')
        } else if (authError.message.includes('Acceso denegado')) {
          setError('Acceso denegado. Solo administradores autorizados pueden ingresar.')
        } else {
          setError('Error al iniciar sesión. Por favor intenta de nuevo.')
        }
        return
      }

      if (data?.user) {
        router.push('/dashboard')
      }
    } catch (error: any) {
      setError('Error de conexión. Revisa tu internet e intenta nuevamente.')
      console.error('Admin login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-femfuel-rose/5 via-white to-femfuel-gold/5 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]"></div>
      
      <div className="relative flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Professional Admin Branding */}
        <div className="lg:w-1/2 bg-gradient-to-br from-femfuel-rose via-pink-600 to-femfuel-gold p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 text-white text-center lg:text-left max-w-md">
            <div className="mb-8">
              <Image 
                src="/femfuel-logo.png" 
                alt="FemFuel Beauty" 
                width={80}
                height={80}
                className="w-20 h-20 mx-auto lg:mx-0 mb-4"
              />
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                FemFuel Beauty
              </h1>
              <p className="text-xl opacity-90 leading-relaxed mb-2">
                Panel de Administración
              </p>
              <p className="text-lg opacity-75 leading-relaxed">
                Plataforma de gestión empresarial para la belleza dominicana
              </p>
            </div>

            {/* Admin Features */}
            <div className="space-y-4 text-sm opacity-80 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span>Gestión completa de usuarios y proveedores</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <span>Análisis avanzado y reportes en tiempo real</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Settings className="w-4 h-4 text-white" />
                </div>
                <span>Control total de la plataforma</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span>Seguridad empresarial de nivel superior</span>
              </div>
            </div>

            {/* Platform Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-xs text-primary-foreground/70">Usuarios</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-xs text-primary-foreground/70">Satisfacción</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">4.9</div>
                <div className="text-xs text-primary-foreground/70">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <Image 
                src="/femfuel-logo.png" 
                alt="FemFuel Beauty" 
                width={60}
                height={60}
                className="w-15 h-15 mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold text-femfuel-dark">FemFuel Beauty</h1>
              <p className="text-femfuel-medium">Panel Administrativo</p>
            </div>
            
            {/* Form Header with Logo */}
            <div className="hidden lg:block mb-8 text-center">
              <div className="mb-6">
                <Image 
                  src="/femfuel-logo.png" 
                  alt="FemFuel Beauty" 
                  width={100}
                  height={100}
                  className="w-[100px] h-[100px] mx-auto hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h2 className="text-3xl font-bold text-femfuel-dark mb-2">
                Acceso Administrativo
              </h2>
              <p className="text-femfuel-medium">
                Inicia sesión para acceder al centro de control
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Admin Access Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-femfuel-dark font-medium">
                  Correo Electrónico Administrativo
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@femfuelbeauty.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-femfuel-rose focus:ring-femfuel-rose"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-femfuel-dark font-medium">
                  Contraseña Administrativa
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-gray-200 focus:border-femfuel-rose focus:ring-femfuel-rose"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-femfuel-rose hover:bg-[#9f1853] text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Verificando Acceso...
                  </div>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Acceder al Panel
                  </>
                )}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-orange-900 mb-1">
                    Acceso Restringido
                  </h3>
                  <p className="text-sm text-orange-700">
                    Solo administradores autorizados de FemFuel Beauty pueden acceder a este panel de control. 
                    Todas las actividades son monitoreadas por seguridad.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center space-y-2">
              <p className="text-sm text-femfuel-medium">
                © 2025 FemFuel Beauty • República Dominicana
              </p>
              <p className="text-xs text-femfuel-medium/70">
                "Transformamos la belleza dominicana con tecnología de clase mundial"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}