import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center p-8">
            <h1 style={{ color: 'black' }} className="text-4xl font-bold mb-8">Pokédex App</h1>
            <div style={{ backgroundColor: '#FFCB05', borderColor: '#3B5BA7', borderWidth: '4px' }} className="max-w-5xl w-full p-6 rounded-lg shadow-lg">
                <h2 style={{ color: 'black' }} className="text-2xl font-bold mb-4">Welcome to your Pokédex</h2>
                <p style={{ color: 'black' }} className="mb-4">Explore the world of Pokémon with this interactive Pokédex application.</p>
                <Link href="/pokemon" style={{ backgroundColor: '#3B5BA7', color: 'white' }} className="inline-block font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                    View All Pokémon
                </Link>
            </div>
        </main>
    );
}