import '../styles/globals.css';
import { UIContextProvider } from '@/stores/store';
import { Inter } from 'next/font/google';
import styles from '../styles/layout.module.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cookify',
  description:
    'Search a clean and modern recipe database. Find your next recipe here.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UIContextProvider>
        <body className={`${inter.className} ${styles.layout}`}>
          {children}
        </body>
      </UIContextProvider>
    </html>
  );
}
