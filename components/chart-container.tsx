'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts'

interface ChartContainerProps {
  title: string
  description: string
}

const revenueData = [
  { mes: 'Ene', ingresos: 24500, comisiones: 4900 },
  { mes: 'Feb', ingresos: 28200, comisiones: 5640 },
  { mes: 'Mar', ingresos: 32100, comisiones: 6420 },
  { mes: 'Abr', ingresos: 29800, comisiones: 5960 },
  { mes: 'May', ingresos: 35600, comisiones: 7120 },
  { mes: 'Jun', ingresos: 42300, comisiones: 8460 },
  { mes: 'Jul', ingresos: 38900, comisiones: 7780 },
  { mes: 'Ago', ingresos: 45200, comisiones: 9040 },
  { mes: 'Sep', ingresos: 51100, comisiones: 10220 }
]

export function ChartContainer({ title, description }: ChartContainerProps) {
  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-femfuel-dark flex items-center gap-2">
          {title}
        </CardTitle>
        <p className="text-sm text-femfuel-medium">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="mes" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickFormatter={(value) => `RD$${(value/1000).toFixed(0)}K`}
              />
              <Line 
                type="monotone" 
                dataKey="comisiones" 
                stroke="#b91c5c" 
                strokeWidth={3}
                dot={{ fill: '#b91c5c', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#b91c5c' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Summary stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-femfuel-rose">RD$73,540</div>
            <div className="text-sm text-femfuel-medium">Total este mes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">+18.5%</div>
            <div className="text-sm text-femfuel-medium">Crecimiento mensual</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-femfuel-dark">342</div>
            <div className="text-sm text-femfuel-medium">Transacciones</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}