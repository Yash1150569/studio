import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Logo } from '@/components/logo';

export const metadata: Metadata = {
  title: 'BeyondChats AI Revitalizer',
  description: 'Revitalize articles with the power of AI.',
};

function AnimatedBackground() {
  return (
    <div className="bg-anim pointer-events-none">
      <div className="bg-anim-logo" style={{ animationDuration: '25s', top: '10%', left: '5%', width: '120px' }}><Logo /></div>
      <div className="bg-anim-logo" style={{ animationDuration: '35s', top: '20%', left: '80%', width: '80px', animationDelay: '-5s' }}><Logo /></div>
      <div className="bg-anim-logo" style={{ animationDuration: '45s', top: '70%', left: '15%', width: '150px', animationDelay: '-10s' }}><Logo /></div>
      <div className="bg-anim-logo" style={{ animationDuration: '30s', top: '80%', left: '90%', width: '60px', animationDelay: '-15s' }}><Logo /></div>
      <div className="bg-anim-logo" style={{ animationDuration: '40s', top: '40%', left: '45%', width: '100px', animationDelay: '-20s' }}><Logo /></div>
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background">
        <div className="relative min-h-screen z-10">
          {children}
        </div>
        <AnimatedBackground />
        <Toaster />
      </body>
    </html>
  );
}
