import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles
import { AnimatedBackground } from '@/components/animated-background';
import { ThemeToggle } from '@/components/theme-toggle';
import { MouseCursor } from '@/components/mouse-cursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Vertexora Solutions | Web Development, Mobile Apps & Automation Agency',
  description: 'Vertexora Solutions builds websites, web apps, mobile apps, backend systems, and automation solutions that help businesses scale faster.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="bg-background text-foreground antialiased selection:bg-violet-500/30 overflow-x-hidden font-sans" suppressHydrationWarning>
        <nav className="fixed top-8 right-8 z-50">
          <ThemeToggle />
        </nav>
        <MouseCursor />
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
