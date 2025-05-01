import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';
import FloatingCubes from './components/FloatingCubes';

export const metadata: Metadata = {
  title: 'Sadhwin Arram | Portfolio',
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
        <footer className="text-center text-xs text-gray-500 mt-10 mb-6">
  Built with 💙 using Next.js, Tailwind CSS & Framer Motion. Hosted on Vercel at{" "}
  <a href="https://www.sadhwinarram.com" className="underline text-blue-400">sadhwinarram.com</a>
</footer>

      </body>
    </html>
  );
}
