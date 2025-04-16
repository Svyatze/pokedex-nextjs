import { useState, useEffect } from 'react';
import { Pokemon, PokemonListItem } from '@/types/pokemon';
import { getPokemon, getPokemonList } from '@/services/pokemonService';

export function usePokemonList(limit = 20, offset = 0) {
    const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [prevUrl, setPrevUrl] = useState<string | null>(null);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const fetchPokemonList = async () => {
            setIsLoading(true);
            try {
                const data = await getPokemonList(limit, offset);
                setPokemonList(data.results);
                setNextUrl(data.next);
                setPrevUrl(data.previous);
                setTotal(data.count);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An unknown error occurred'));
            } finally {
                setIsLoading(false);
            }
        };

        void fetchPokemonList();
    }, [limit, offset]);

    return { pokemonList, isLoading, error, nextUrl, prevUrl, total };
}

export function usePokemonDetails(nameOrId: string | number | null) {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!nameOrId) return;

        const fetchPokemonDetails = async () => {
            setIsLoading(true);
            try {
                const data = await getPokemon(nameOrId);
                setPokemon(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An unknown error occurred'));
                setPokemon(null);
            } finally {
                setIsLoading(false);
            }
        };

        void fetchPokemonDetails();
    }, [nameOrId]);

    return { pokemon, isLoading, error };
}