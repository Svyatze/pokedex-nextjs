import { Pokemon, PokemonListResponse, PokemonSpecies } from '@/types/pokemon';

const API_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
    const response = await fetch(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`);

    if (!response.ok) {
        throw new Error('Failed to fetch Pokemon list');
    }

    return response.json();
}

export async function getPokemon(nameOrId: string | number): Promise<Pokemon> {
    const response = await fetch(`${API_URL}/pokemon/${nameOrId}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon: ${nameOrId}`);
    }

    return response.json();
}

export async function getPokemonSpecies(nameOrId: string | number): Promise<PokemonSpecies> {
    const response = await fetch(`${API_URL}/pokemon-species/${nameOrId}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon species: ${nameOrId}`);
    }

    return response.json();
}

export function getPokemonImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export async function searchPokemon(query: string): Promise<Pokemon[]> {
    const list = await getPokemonList(100, 0);

    const filteredResults = list.results.filter(pokemon =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
    );

    const pokemonPromises = filteredResults.map(result => getPokemon(result.name));
    return Promise.all(pokemonPromises);
}