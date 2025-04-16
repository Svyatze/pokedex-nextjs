'use client';

import { useState, FormEvent } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="flex">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Pokémon..."
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-red-500 text-white rounded-r hover:bg-red-600 transition-colors"
                >
                    Search
                </button>
            </div>
        </form>
    );
}