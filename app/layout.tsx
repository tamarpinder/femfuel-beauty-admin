import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FemFuel Admin Panel',
  description: 'Admin panel for FemFuel Beauty',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}