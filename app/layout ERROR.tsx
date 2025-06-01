import '../styles/globals1.css';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Rishab Informatica Group',
  description: 'Advanced Your Tech Career With Expert Training',
  themeColor: '#ffffff',
};

// Dynamic import for client-side components
const Header = dynamic(() => import('@/components/header'), { 
  ssr: false,
  loading: () => <div className="h-16 bg-white" /> // Simple fallback
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Header />
        <main className="min-h-screen bg-white antialiased pt-0 relative">
          {children}
        </main>
      </body>
    </html>
  );
}