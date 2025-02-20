import type { Metadata } from 'next';

import './globals.css';
import NavBar from '../components/Navbar/NavBar';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="bg-gray-100 text-gray-800 dark:bg-neutral-900 dark:text-gray-300 overscroll-none"
    >
      <body className="flex flex-col min-h-screen">
        <main className="flex-1 overflow-y-auto mb-14">{children}</main>
        <NavBar />
      </body>
    </html>
  );
}
