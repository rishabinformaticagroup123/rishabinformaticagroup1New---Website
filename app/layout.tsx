import '../styles/globals1.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Rishab Informatica Group',
  description: 'Advanced Your Tech Career With Expert Training',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white">
        <Header />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}
