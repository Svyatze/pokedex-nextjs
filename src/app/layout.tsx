import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
        <div className="min-h-screen bg-gray-100">
            <header className="bg-red-600 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <a href="/" className="text-2xl font-bold">Pokédex</a>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><a href="/" className="hover:underline">Home</a></li>
                            <li><a href="/pokemon" className="hover:underline">Pokémon</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            {children}
            <footer className="bg-gray-800 text-white p-4 mt-auto">
                <div className="container mx-auto text-center">
                    <p>Pokédex App © {new Date().getFullYear()}</p>
                </div>
            </footer>
        </div>
        </body>
        </html>
    );
}