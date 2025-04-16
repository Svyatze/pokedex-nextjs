'use client';

import { useEffect, useState } from 'react';
import { usePokemonList } from '@/hooks/usePokemon';
import { getPokemon, searchPokemon } from '@/services/pokemonService';
import { Pokemon } from '@/types/pokemon';

import Loading from '../../components/Loading';
import PokemonCard from '../../components/PokemonCard';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';

const ITEMS_PER_PAGE = 12;

export default function PokemonListPage() {
    const [page, setPage] = useState(1);
    const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const {
        pokemonList,
        isLoading,
        error,
        total
    } = usePokemonList(ITEMS_PER_PAGE, (page - 1) * ITEMS_PER_PAGE);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            if (pokemonList.length > 0 && !isSearching) {
                const detailsPromises = pokemonList.map(pokemon => {
                    return getPokemon(pokemon.name);
                });

                try {
                    const details = await Promise.all(detailsPromises);
                    setPokemonData(details);
                } catch (err) {
                    console.error("Failed to fetch Pokémon details:", err);
                }
            }
        };

        void fetchPokemonDetails();
    }, [pokemonList, isSearching]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        setIsSearching(false);
        setSearchQuery('');
    };

    const handleSearch = async (query: string) => {
        if (!query.trim()) {
            setIsSearching(false);
            return;
        }

        setSearchQuery(query);
        setIsSearching(true);

        try {
            const results = await searchPokemon(query);
            setSearchResults(results);
        } catch (err) {
            console.error("Search failed:", err);
            setSearchResults([]);
        }
    };

    const clearSearch = () => {
        setIsSearching(false);
        setSearchQuery('');
    };

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
    const displayedPokemon = isSearching ? searchResults : pokemonData;

    if (error) {
        return (
            <div className="container mx-auto p-8">
                <div className="bg-red-100 text-red-700 p-4 rounded">
                    Error loading Pokémon: {error.message}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-8">
            <h1 style={{ color: 'black', borderBottom: '4px solid #FFCB05' }} className="text-4xl font-bold mb-6 pb-2 inline-block">
                Pokémon List
            </h1>

            <div className="mb-6">
                <SearchBar onSearch={handleSearch} />
                {isSearching && (
                    <div className="mt-2 flex items-center">
            <span style={{ color: 'black' }} className="font-semibold mr-2">
              Showing results for "{searchQuery}" ({searchResults.length} found)
            </span>
                        <button
                            onClick={clearSearch}
                            style={{ color: '#3B5BA7' }}
                            className="text-base font-bold hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </div>

            {isLoading && !isSearching ? (
                <Loading />
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {displayedPokemon.map(pokemon => (
                            <PokemonCard key={pokemon.id} pokemon={pokemon} />
                        ))}
                    </div>

                    {displayedPokemon.length === 0 && (
                        <div className="text-center py-8">
                            <p style={{ color: 'black' }} className="text-xl font-semibold">No Pokémon found</p>
                        </div>
                    )}

                    {!isSearching && (
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    );
}