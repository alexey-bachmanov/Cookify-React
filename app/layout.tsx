import '../styles/globals.css';
import { UIContextProvider } from '@/stores/store';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cookify',
  description: 'Find your next recipe here',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UIContextProvider>
        <body className={inter.className}>{children}</body>
      </UIContextProvider>
    </html>
  );
}
