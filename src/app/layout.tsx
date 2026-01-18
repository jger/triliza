import '../styles/index.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Triliza - Tic-Tac-Toe Game',
    description: 'Triliza - Multi-dimensional Tic-Tac-Toe Game',
    manifest: '/triliza/manifest.json',
    icons: {
        icon: '/triliza/favicon.ico',
        apple: '/triliza/icon-192.svg',
    },
};

export const viewport = {
    themeColor: '#000000',
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
