import '../styles/globals.css'
import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/WhatsAppButton' // ✅ Import the WhatsApp button

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
        <main className="pt-0">
          {children}
        </main>
        <Footer />
        <WhatsAppButton /> {/* ✅ WhatsApp floating button added */}
      </body>
    </html>
  )
}
