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
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 femfuel-gradient opacity-10"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]"></div>
      
      <div className="relative flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Ultra Professional Admin Branding */}
        <div className="lg:w-1/2 relative overflow-hidden">
          {/* Multi-layer Gradient Background */}
          <div className="absolute inset-0 femfuel-gradient"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {/* Floating Shapes for Visual Interest */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl float-animation"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-femfuel-gold/20 rounded-full blur-3xl float-animation" style={{animationDelay: '3s'}}></div>
          
          <div className="relative z-10 h-full p-8 lg:p-12 flex items-center justify-center">
            <div className="text-white text-center lg:text-left max-w-md">
              <div className="mb-8">
                {/* Logo with Glow Effect */}
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl pulse-glow"></div>
                  <Image 
                    src="/femfuel-logo.png" 
                    alt="FemFuel Beauty" 
                    width={100}
                    height={100}
                    className="w-24 h-24 mx-auto lg:mx-0 relative z-10 drop-shadow-2xl"
                  />
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 drop-shadow-2xl">
                  FemFuel Beauty
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-white to-femfuel-gold mb-4 mx-auto lg:mx-0"></div>
                <p className="text-2xl font-light mb-2 drop-shadow-lg">
                  Panel de Administración
                </p>
                <p className="text-lg opacity-90 leading-relaxed">
                  Centro de control empresarial para la revolución de la belleza dominicana
                </p>
              </div>

              {/* Admin Features with Glass Cards */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-white/30 to-white/10 rounded-lg flex items-center justify-center shadow-lg">
                    <Users className="w-5 h-5 text-white drop-shadow" />
                  </div>
                  <span className="text-sm font-medium">Gestión completa de usuarios y proveedores</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-white/30 to-white/10 rounded-lg flex items-center justify-center shadow-lg">
                    <BarChart3 className="w-5 h-5 text-white drop-shadow" />
                  </div>
                  <span className="text-sm font-medium">Análisis avanzado y reportes en tiempo real</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-white/30 to-white/10 rounded-lg flex items-center justify-center shadow-lg">
                    <Settings className="w-5 h-5 text-white drop-shadow" />
                  </div>
                  <span className="text-sm font-medium">Control total de la plataforma</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-white/30 to-white/10 rounded-lg flex items-center justify-center shadow-lg">
                    <Shield className="w-5 h-5 text-white drop-shadow" />
                  </div>
                  <span className="text-sm font-medium">Seguridad empresarial de nivel superior</span>
                </div>
              </div>

              {/* Platform Stats with Glass Effect */}
              <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white drop-shadow-lg">500+</div>
                  <div className="text-xs text-white/80 font-medium">Usuarios</div>
                </div>
                <div className="text-center border-x border-white/10">
                  <div className="text-3xl font-bold text-white drop-shadow-lg">95%</div>
                  <div className="text-xs text-white/80 font-medium">Satisfacción</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white drop-shadow-lg">4.9</div>
                  <div className="text-xs text-white/80 font-medium">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Ultra Professional Login Form */}
        <div className="lg:w-1/2 bg-gradient-to-br from-gray-50 to-white p-8 lg:p-12 flex items-center justify-center relative">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-femfuel-rose/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-femfuel-gold/5 rounded-full blur-3xl"></div>
          
          <div className="w-full max-w-md relative z-10">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-femfuel-rose/20 rounded-full blur-xl"></div>
                <Image 
                  src="/femfuel-logo.png" 
                  alt="FemFuel Beauty" 
                  width={70}
                  height={70}
                  className="w-[70px] h-[70px] relative z-10"
                />
              </div>
              <h1 className="text-2xl font-bold text-gradient">FemFuel Beauty</h1>
              <p className="text-femfuel-medium">Panel Administrativo</p>
            </div>
            
            {/* Desktop Form Header with Premium Logo */}
            <div className="hidden lg:block mb-10 text-center">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-femfuel-rose/30 to-femfuel-gold/30 rounded-full blur-2xl pulse-glow"></div>
                <Image 
                  src="/femfuel-logo.png" 
                  alt="FemFuel Beauty" 
                  width={120}
                  height={120}
                  className="w-[120px] h-[120px] mx-auto relative z-10 hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-femfuel-rose to-femfuel-gold bg-clip-text text-transparent mb-3">
                Acceso Administrativo
              </h2>
              <p className="text-femfuel-medium text-lg">
                Centro de control empresarial exclusivo
              </p>
            </div>

            {/* Error Message with Animation */}
            {error && (
              <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 rounded-xl text-sm animate-pulse">
                {error}
              </div>
            )}

            {/* Ultra Professional Admin Access Form */}
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Correo Administrativo
                </Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-femfuel-rose to-femfuel-gold rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-femfuel-rose transition-colors duration-300" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@femfuelbeauty.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 pr-4 h-14 text-lg bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-femfuel-rose focus:ring-4 focus:ring-femfuel-rose/20 transition-all duration-300 hover:border-gray-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Contraseña Segura
                </Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-femfuel-rose to-femfuel-gold rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-femfuel-rose transition-colors duration-300" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 h-14 text-lg bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-femfuel-rose focus:ring-4 focus:ring-femfuel-rose/20 transition-all duration-300 hover:border-gray-300"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-femfuel-rose transition-colors duration-300 p-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="animate-pulse">Verificando Credenciales...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Shield className="w-5 h-5" />
                    <span>Acceder al Centro de Control</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Premium Security Notice */}
            <div className="mt-10 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-xl blur-xl"></div>
              <div className="relative p-5 bg-gradient-to-r from-orange-50/90 to-red-50/90 backdrop-blur-sm border border-orange-200/50 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <span>Acceso de Alta Seguridad</span>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Este es un portal exclusivo para administradores certificados de FemFuel Beauty. 
                      Todas las sesiones son monitoreadas y registradas con encriptación de nivel empresarial.
                    </p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>SSL Activo</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>2FA Habilitado</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Monitoreo 24/7</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Footer */}
            <div className="mt-12 text-center">
              <div className="inline-block">
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-4"></div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  © 2025 FemFuel Beauty
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  República Dominicana • Santo Domingo
                </p>
                <p className="text-xs font-light text-transparent bg-clip-text bg-gradient-to-r from-femfuel-rose to-femfuel-gold">
                  "Revolucionando la belleza dominicana con tecnología de vanguardia"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}