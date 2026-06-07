import { Providers } from '@/components/providers';
import { createSiteMetadata } from '@/lib/site';
import './globals.css';

export const metadata = createSiteMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
