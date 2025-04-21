import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';
import FloatingCubes from './components/FloatingCubes';

export const metadata: Metadata = {
  title: 'Portfolio - Portfolio',
  description: 'Interactive portfolio with smooth animations and dynamic pages',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="relative min-h-screen text-[#E5E5E5]"
        style={{
          backgroundColor: '#0D0D0D',
        }}
      >
        <FloatingCubes />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
