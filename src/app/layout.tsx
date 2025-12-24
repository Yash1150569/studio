import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'BeyondChats AI Revitalizer',
  description: 'Revitalize articles with the power of AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className='light'>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className={cn(
            "aurora-bg absolute inset-0",
            "dark:opacity-30"
          )}>
            <div className="absolute top-[10%] left-[10%] h-[400px] w-[400px] rounded-full bg-primary/50" />
            <div className="absolute top-[20%] right-[5%] h-[300px] w-[500px] rounded-full bg-accent/60" />
            <div className="absolute bottom-[25%] left-[25%] h-[350px] w-[350px] rounded-full bg-blue-400/50" />
            <div className="absolute bottom-[5%] right-[20%] h-[400px] w-[400px] rounded-full bg-teal-300/50" />
          </div>
        </div>
        <div className="relative min-h-screen z-10">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
