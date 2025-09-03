'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  Calendar, 
  UserPlus, 
  Star, 
  DollarSign, 
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ActivityItem {
  id: string
  type: 'booking' | 'user' | 'review' | 'payment' | 'support' | 'alert' | 'success'
  title: string
  description: string
  time: string
  user?: string
}

const activityData: ActivityItem[] = [
  {
    id: '1',
    type: 'booking',
    title: 'Nueva reserva confirmada',
    description: 'María González reservó "Corte y Peinado" en Glamour House',
    time: 'hace 15 min',
    user: 'MG'
  },
  {
    id: '2',
    type: 'user',
    title: 'Nuevo proveedor registrado',
    description: 'Beauty Salon "Estilo Único" completó verificación',
    time: 'hace 32 min',
    user: 'EU'
  },
  {
    id: '3',
    type: 'review',
    title: 'Nueva reseña 5 estrellas',
    description: 'Carmen Rodríguez calificó su experiencia en Bella Vista',
    time: 'hace 1h',
    user: 'CR'
  },
  {
    id: '4',
    type: 'payment',
    title: 'Pago procesado',
    description: 'Comisión de RD$285 generada por servicio completado',
    time: 'hace 2h'
  },
  {
    id: '5',
    type: 'support',
    title: 'Ticket de soporte resuelto',
    description: 'Problema con horarios de disponibilidad solucionado',
    time: 'hace 3h'
  },
  {
    id: '6',
    type: 'alert',
    title: 'Alerta de calidad',
    description: 'Proveedor con calificación baja requiere atención',
    time: 'hace 4h'
  },
  {
    id: '7',
    type: 'success',
    title: 'Meta mensual alcanzada',
    description: 'Objetivo de reservas mensuales superado en 15%',
    time: 'hace 6h'
  }
]

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'booking':
      return Calendar
    case 'user':
      return UserPlus
    case 'review':
      return Star
    case 'payment':
      return DollarSign
    case 'support':
      return MessageSquare
    case 'alert':
      return AlertCircle
    case 'success':
      return CheckCircle
    default:
      return Clock
  }
}

const getActivityColor = (type: ActivityItem['type']) => {
  switch (type) {
    case 'booking':
      return 'bg-blue-100 text-blue-600'
    case 'user':
      return 'bg-green-100 text-green-600'
    case 'review':
      return 'bg-yellow-100 text-yellow-600'
    case 'payment':
      return 'bg-femfuel-purple text-femfuel-rose'
    case 'support':
      return 'bg-purple-100 text-purple-600'
    case 'alert':
      return 'bg-red-100 text-red-600'
    case 'success':
      return 'bg-emerald-100 text-emerald-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

export function RecentActivity() {
  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-femfuel-dark">
          Actividad Reciente
        </CardTitle>
        <p className="text-sm text-femfuel-medium">
          Últimas actividades en la plataforma
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {activityData.map((activity) => {
          const Icon = getActivityIcon(activity.type)
          
          return (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                getActivityColor(activity.type)
              )}>
                <Icon className="w-4 h-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium text-femfuel-dark truncate">
                    {activity.title}
                  </h4>
                  {activity.user && (
                    <Avatar className="w-5 h-5">
                      <AvatarFallback className="text-xs bg-femfuel-purple text-femfuel-rose">
                        {activity.user}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <p className="text-xs text-femfuel-medium mb-1">
                  {activity.description}
                </p>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            </div>
          )
        })}
        
        {/* View all button */}
        <div className="pt-4 border-t border-gray-100">
          <button className="w-full text-sm text-femfuel-rose hover:text-femfuel-dark font-medium transition-colors">
            Ver toda la actividad →
          </button>
        </div>
      </CardContent>
    </Card>
  )
}