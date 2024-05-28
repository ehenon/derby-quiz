import type { Metadata } from 'next';
import '@styles/globals.css';

export const metadata: Metadata = {
  title: 'Derby Quiz',
  description: 'Speed-oriented quiz game',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="fr">
    <body>{children}</body>
  </html>
);

export default RootLayout;
