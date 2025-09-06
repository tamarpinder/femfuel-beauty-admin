'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simple validation
    if (!email || !password) {
      setError('Por favor complete todos los campos')
      setIsLoading(false)
      return
    }

    // TODO: Implement actual authentication
    setTimeout(() => {
      setIsLoading(false)
      console.log('Login attempt:', { email, password })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-femfuel-50 to-femfuel-100 flex items-center justify-center p-4 lg:p-8 xl:p-16">
      <div className="w-full max-w-md lg:max-w-xl xl:max-w-2xl">
        <div className="bg-white rounded-xl shadow-xl p-8 lg:p-12 xl:p-16">
          <div className="text-center mb-8 lg:mb-10">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 lg:mb-4">
              FemFuel Admin
            </h1>
            <p className="text-gray-600 text-base lg:text-lg">
              Panel de administración
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
            <div>
              <label htmlFor="email" className="block text-sm lg:text-base font-medium text-gray-700 mb-2 lg:mb-3">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 lg:px-6 py-3 lg:py-4 text-base lg:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-femfuel-500 focus:border-femfuel-500 outline-none transition-colors"
                placeholder="admin@femfuel.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm lg:text-base font-medium text-gray-700 mb-2 lg:mb-3">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 lg:px-6 py-3 lg:py-4 text-base lg:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-femfuel-500 focus:border-femfuel-500 outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 lg:p-4">
                <p className="text-red-700 text-sm lg:text-base">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-femfuel-600 text-white py-3 lg:py-4 px-4 lg:px-6 rounded-lg font-medium text-base lg:text-lg hover:bg-femfuel-700 focus:ring-2 focus:ring-femfuel-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>

          <div className="mt-6 lg:mt-8 text-center">
            <p className="text-xs lg:text-sm text-gray-500">
              © 2024 FemFuel Beauty. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}