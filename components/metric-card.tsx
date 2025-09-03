'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: LucideIcon
  description: string
}

export function MetricCard({ title, value, change, trend, icon: Icon, description }: MetricCardProps) {
  return (
    <Card className="relative overflow-hidden border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-femfuel-purple rounded-lg flex items-center justify-center">
              <Icon className="w-5 h-5 text-femfuel-rose" />
            </div>
            <div>
              <p className="text-sm font-medium text-femfuel-medium">{title}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-2xl font-bold text-femfuel-dark">{value}</div>
          
          <div className="flex items-center justify-between">
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              trend === 'up' ? "text-green-600" : "text-red-500"
            )}>
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {change}
            </div>
          </div>
          
          <p className="text-xs text-femfuel-medium mt-2">{description}</p>
        </div>

        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-femfuel-rose to-femfuel-gold rounded-full transform translate-x-8 -translate-y-8"></div>
        </div>
      </CardContent>
    </Card>
  )
}