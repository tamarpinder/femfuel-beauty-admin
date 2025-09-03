'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { adminAuth } from '@/lib/supabase'

interface User {
  id: string
  email: string
  role: string
  name?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    adminAuth.getSession().then(({ session }) => {
      if (session?.user && session.user.user_metadata?.role === 'admin') {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          role: session.user.user_metadata.role,
          name: session.user.user_metadata.name
        })
      }
      setIsLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = adminAuth.onAuthStateChange(async (event, session) => {
      if (session?.user && session.user.user_metadata?.role === 'admin') {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          role: session.user.user_metadata.role,
          name: session.user.user_metadata.name
        })
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { data, error } = await adminAuth.signIn(email, password)
    return { error }
  }

  const signOut = async () => {
    await adminAuth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}