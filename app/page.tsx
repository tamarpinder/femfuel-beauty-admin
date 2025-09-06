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
      {/* REVOLUTIONARY ANIMATED MESH BACKGROUND */}
      <div className="absolute inset-0 mesh-gradient-animated"></div>
      <div className="absolute inset-0 ultra-gradient-3d opacity-70"></div>
      
      {/* Dynamic Grid Pattern with Animation */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] animate-pulse"></div>
      
      <div className="relative flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - ULTRA-REVOLUTIONARY Admin Branding */}
        <div className="lg:w-1/2 relative overflow-hidden">
          
          {/* Morphing Gradient Layers */}
          <div className="absolute inset-0 mesh-gradient-animated"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20"></div>
          
          {/* FLOATING 3D ELEMENTS */}
          <div className="absolute top-10 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl float-animation opacity-60"></div>
          <div className="absolute top-40 right-20 w-60 h-60 bg-femfuel-gold/10 rounded-full blur-3xl float-animation opacity-40" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-femfuel-rose/8 rounded-full blur-3xl float-animation opacity-50" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-40 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl float-animation opacity-30" style={{animationDelay: '6s'}}></div>
          
          <div className="relative z-10 h-full p-8 lg:p-12 flex items-center justify-center">
            <div className="text-white text-center lg:text-left max-w-md reveal-up">
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
                
                <h1 className="text-4xl lg:text-6xl font-black mb-6 drop-shadow-2xl reveal-up typewriter">
                  FemFuel Beauty
                </h1>
                <div className="h-1.5 w-32 bg-gradient-to-r from-white via-femfuel-gold to-white mb-6 mx-auto lg:mx-0 reveal-up animate-pulse"></div>
                <p className="text-2xl lg:text-3xl font-light mb-3 drop-shadow-lg reveal-up">
                  Panel de Administración
                </p>
                <p className="text-lg lg:text-xl opacity-95 leading-relaxed reveal-up">
                  🚀 Centro de control empresarial para la revolución de la belleza dominicana
                </p>
              </div>

              {/* REVOLUTIONARY Admin Features with Ultra Glass Cards */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-4 rounded-xl glass-premium hover:bg-white/20 transition-all duration-500 ripple-effect reveal-up">
                  <div className="w-12 h-12 bg-gradient-to-br from-white/40 to-white/10 rounded-xl flex items-center justify-center shadow-2xl pulse-glow">
                    <Users className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                  <span className="text-sm font-semibold tracking-wide">✨ Gestión completa de usuarios y proveedores</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl glass-premium hover:bg-white/20 transition-all duration-500 ripple-effect reveal-up">
                  <div className="w-12 h-12 bg-gradient-to-br from-white/40 to-white/10 rounded-xl flex items-center justify-center shadow-2xl pulse-glow">
                    <BarChart3 className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                  <span className="text-sm font-semibold tracking-wide">📊 Análisis avanzado y reportes en tiempo real</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl glass-premium hover:bg-white/20 transition-all duration-500 ripple-effect reveal-up">
                  <div className="w-12 h-12 bg-gradient-to-br from-white/40 to-white/10 rounded-xl flex items-center justify-center shadow-2xl pulse-glow">
                    <Settings className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                  <span className="text-sm font-semibold tracking-wide">⚙️ Control total de la plataforma</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl glass-premium hover:bg-white/20 transition-all duration-500 ripple-effect reveal-up">
                  <div className="w-12 h-12 bg-gradient-to-br from-white/40 to-white/10 rounded-xl flex items-center justify-center shadow-2xl pulse-glow">
                    <Shield className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                  <span className="text-sm font-semibold tracking-wide">🛡️ Seguridad empresarial de nivel superior</span>
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

        {/* Right Side - REVOLUTIONARY 3D FLOATING LOGIN FORM */}
        <div className="lg:w-1/2 relative overflow-hidden p-8 lg:p-12 flex items-center justify-center card-3d">
          {/* ULTRA-PREMIUM Background with Multiple Layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
          <div className="absolute inset-0 mesh-gradient-animated opacity-5"></div>
          
          {/* Floating Decorative Elements */}
          <div className="absolute top-10 right-10 w-60 h-60 bg-femfuel-rose/8 rounded-full blur-3xl float-animation opacity-70"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-femfuel-gold/6 rounded-full blur-3xl float-animation opacity-60" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-40 left-1/3 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl float-animation opacity-50" style={{animationDelay: '5s'}}></div>
          
          {/* FLOATING 3D FORM CONTAINER */}
          <div className="w-full max-w-lg relative z-20 card-floating glass-ultra rounded-3xl p-8 lg:p-10">
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
            
            {/* REVOLUTIONARY Desktop Form Header */}
            <div className="hidden lg:block mb-12 text-center reveal-up">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-femfuel-rose/40 to-femfuel-gold/40 rounded-full blur-3xl pulse-glow"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
                <Image 
                  src="/femfuel-logo.png" 
                  alt="FemFuel Beauty" 
                  width={140}
                  height={140}
                  className="w-[140px] h-[140px] mx-auto relative z-10 hover:scale-125 hover:rotate-12 transition-all duration-700 drop-shadow-2xl"
                />
              </div>
              <h2 className="text-5xl font-black bg-gradient-to-r from-femfuel-rose via-purple-600 to-femfuel-gold bg-clip-text text-transparent mb-4 typewriter">
                Acceso Administrativo
              </h2>
              <div className="h-1 w-40 bg-gradient-to-r from-femfuel-rose to-femfuel-gold mx-auto mb-4 reveal-up animate-pulse"></div>
              <p className="text-gray-700 text-xl font-medium reveal-up">
                🌟 Centro de control empresarial exclusivo
              </p>
            </div>

            {/* Error Message with Animation */}
            {error && (
              <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 rounded-xl text-sm animate-pulse">
                {error}
              </div>
            )}

            {/* REVOLUTIONARY LIQUID FORM */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3 reveal-up">
                <Label htmlFor="email" className="text-sm font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
                  <Mail className="w-4 h-4 text-femfuel-rose" />
                  Correo Administrativo
                </Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-femfuel-rose/20 to-femfuel-gold/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
                  <Mail className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6 group-hover:text-femfuel-rose transition-all duration-300 z-10" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@femfuelbeauty.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-liquid pl-14 pr-4 h-16 text-lg font-medium placeholder:text-gray-400 z-10 relative"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3 reveal-up">
                <Label htmlFor="password" className="text-sm font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
                  <Lock className="w-4 h-4 text-femfuel-rose" />
                  Contraseña Ultra-Segura
                </Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-femfuel-rose/20 to-femfuel-gold/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
                  <Lock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6 group-hover:text-femfuel-rose transition-all duration-300 z-10" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-liquid pl-14 pr-14 h-16 text-lg font-medium placeholder:text-gray-400 z-10 relative"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-femfuel-rose transition-all duration-300 p-2 z-10 ripple-effect rounded-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </div>
              </div>

              <div className="pt-4 reveal-up">
                <button
                  type="submit"
                  className="btn-neon w-full h-16 text-xl font-black tracking-wide ripple-effect reveal-up"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="animate-pulse">🚀 Verificando Acceso Ultrasecreto...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Shield className="w-6 h-6" />
                      <span>🌟 ACCEDER AL CENTRO DE CONTROL</span>
                    </div>
                  )}
                </button>
              </div>
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