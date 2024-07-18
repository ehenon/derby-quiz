import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import '@styles/globals.css';

export const metadata: Metadata = {
  title: 'Derby Quiz',
  description: 'Speed-oriented quiz game',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="fr" className={inter.className}>
    <body className='w-screen h-screen flex items-center justify-center'>
      <Toaster position="bottom-center" />
      {children}
    </body>
  </html>
);

export default RootLayout;
