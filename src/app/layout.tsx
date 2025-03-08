import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GoogleTagManager, GoogleTagManagerNoScript } from './components/GoogleTagManager'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Phạm Đình Hùng - Personal Portfolio',
  description: 'Software Developer based in Hanoi, Vietnam',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <head>
        <title>Phạm Đình Hùng - Personal Portfolio</title>
        <meta name="description" content="Software Developer based in Hanoi, Vietnam" />
      </head>
      <body className={inter.className}>
        <GoogleTagManager />
        <GoogleTagManagerNoScript />
        {children}
      </body>
    </html>
  )
} 