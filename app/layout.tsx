import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter" 
})

export const metadata: Metadata = {
  title: "FemFuel Beauty - Panel de Administración",
  description: "Panel de control administrativo para la plataforma FemFuel Beauty",
  keywords: ["FemFuel", "Beauty", "Admin", "Dashboard", "República Dominicana"],
  authors: [{ name: "FemFuel Beauty Team" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-DO">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}