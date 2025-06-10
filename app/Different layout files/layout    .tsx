import '../styles/globals1.css';
import type { Metadata } from 'next';
import Header from '@/components/header';

export const metadata: Metadata = {
  title: 'Rishab Informatica Group',
  description: 'Advanced Your Tech Career With Expert Training',
  themeColor: '#ffffff', // For PWA/mobile browser theming
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white antialiased">
        <Header />
        <main className="pt-0 relative">
          {children}
        </main>
      </body>
    </html>
  );
}