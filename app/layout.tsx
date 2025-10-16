import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Creator Tip Jar',
  description: 'Instant, gasless USDC tipping for Farcaster creators',
  openGraph: {
    title: 'Creator Tip Jar',
    description: 'Instant, gasless USDC tipping for Farcaster creators',
    images: ['/icon.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
