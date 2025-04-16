import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from "react";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Pokédex App',
    description: 'A Next.js Pokédex application',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <div className="min-h-screen bg-white">
            <header style={{ backgroundColor: '#FFCB05', borderBottom: '4px solid #3B5BA7' }} className="p-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <a href="/" style={{ color: 'black', fontWeight: 'bold' }} className="text-3xl">Pokédex</a>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><a href="/" style={{ color: 'black', fontWeight: 'bold' }} className="text-lg hover:underline">Home</a></li>
                            <li><a href="/pokemon" style={{ color: 'black', fontWeight: 'bold' }} className="text-lg hover:underline">Pokémon</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main style={{ color: 'black' }} className="bg-white">
                {children}
            </main>
            <footer style={{ backgroundColor: '#3B5BA7', borderTop: '4px solid #FFCB05' }} className="text-white p-4 mt-auto">
                <div className="container mx-auto text-center">
                    <p className="font-semibold">Pokédex App © {new Date().getFullYear()}</p>
                </div>
            </footer>
        </div>
        </body>
        </html>
    );
}