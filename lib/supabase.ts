import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Client for browser-side operations
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Admin client for server-side operations
export const supabaseAdmin = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
}) : null

// Auth helper functions
export const adminAuth = {
  // Sign in admin user
  signIn: async (email: string, password: string) => {
    if (!supabase) return { data: null, error: { message: 'Supabase no configurado' } }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) return { data: null, error }
    
    // Verify user is admin
    if (!data.user?.user_metadata?.role || data.user.user_metadata.role !== 'admin') {
      if (supabase) await supabase.auth.signOut()
      return { 
        data: null, 
        error: { message: 'Acceso denegado. Solo administradores pueden acceder.' }
      }
    }
    
    return { data, error: null }
  },

  // Sign out
  signOut: async () => {
    if (!supabase) return { error: { message: 'Supabase no configurado' } }
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  getUser: async () => {
    if (!supabase) return { user: null, error: { message: 'Supabase no configurado' } }
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get current session
  getSession: async () => {
    if (!supabase) return { session: null, error: { message: 'Supabase no configurado' } }
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // Listen for auth changes
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    if (!supabase) return { data: { subscription: { unsubscribe: () => {} } } }
    return supabase.auth.onAuthStateChange(callback)
  }
}