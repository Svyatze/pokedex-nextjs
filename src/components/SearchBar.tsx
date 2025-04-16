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
                    style={{
                        borderColor: '#3B5BA7',
                        borderWidth: '2px',
                        color: 'black',
                        borderTopLeftRadius: '0.375rem',
                        borderBottomLeftRadius: '0.375rem',
                        padding: '0.75rem 1rem',
                        fontSize: '1.125rem'
                    }}
                    className="flex-grow focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button
                    type="submit"
                    style={{
                        backgroundColor: '#FFCB05',
                        color: 'black',
                        borderColor: '#3B5BA7',
                        borderWidth: '2px',
                        borderLeftWidth: '0',
                        borderTopRightRadius: '0.375rem',
                        borderBottomRightRadius: '0.375rem',
                        padding: '0.75rem 1.5rem',
                        fontWeight: 'bold',
                        fontSize: '1.125rem'
                    }}
                    className="hover:bg-yellow-400 transition-colors"
                >
                    Search
                </button>
            </div>
        </form>
    );
}