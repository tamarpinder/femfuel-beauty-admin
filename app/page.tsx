'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Lock, Eye, EyeOff, Shield, Star, Users, TrendingUp } from 'lucide-react'
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
    <div className="min-h-screen bg-background">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - FemFuel Beauty Branding */}
        <div className="hidden lg:flex flex-col justify-center px-8 bg-primary">
          <div className="max-w-md mx-auto text-center">
            {/* FemFuel Logo */}
            <div className="w-32 h-32 mx-auto mb-8 flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center shadow-xl">
                <div className="text-4xl font-bold text-primary">F</div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              FemFuel Beauty
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Administración Empresarial
            </p>
            
            {/* Statistics */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-primary-foreground/80">Usuarios</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-sm text-primary-foreground/80">Satisfacción</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">4.9</div>
                <div className="text-sm text-primary-foreground/80">Rating</div>
              </div>
            </div>
            
            <div className="text-primary-foreground/80">
              "Transformamos la belleza dominicana con tecnología de clase mundial"
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-xl flex items-center justify-center">
                <div className="text-2xl font-bold text-white">F</div>
              </div>
              <h1 className="text-2xl font-bold text-foreground">FemFuel Beauty</h1>
              <p className="text-muted-foreground">Panel Administrativo</p>
            </div>
            
            <div className="bg-card p-8 shadow-admin-card rounded-lg border">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Bienvenido de vuelta
                </h2>
                <p className="text-muted-foreground">
                  Inicia sesión para acceder al panel de administración
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Correo electrónico administrativo
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@femfuelbeauty.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Ingresa tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-11"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                      Verificando credenciales...
                    </div>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Iniciar sesión
                    </>
                  )}
                </Button>
              </form>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium mb-1">Acceso seguro</p>
                    <p>Solo personal autorizado puede acceder al sistema de administración.</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-center text-sm text-muted-foreground">
                  © 2025 FemFuel Beauty • República Dominicana
                </p>
                <p className="text-center text-xs text-muted-foreground mt-1">
                  Plataforma líder en servicios de belleza dominicana
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}