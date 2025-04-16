import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center p-8">
            <h1 className="text-4xl font-bold mb-8">Pokédex App</h1>
            <div className="max-w-5xl w-full bg-red-500 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Welcome to your Pokédex</h2>
                <p className="mb-4">Explore the world of Pokémon with this interactive Pokédex application.</p>
                <Link href="/pokemon" className="inline-block bg-white text-red-500 font-bold py-2 px-4 rounded hover:bg-gray-100 transition-colors">
                    View All Pokémon
                </Link>
            </div>
        </main>
    );
}