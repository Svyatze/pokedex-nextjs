export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}

export interface PokemonListItem {
    name: string;
    url: string;
}

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }[];
    abilities: {
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
        slot: number;
    }[];
    species: {
        name: string;
        url: string;
    };
}

export interface PokemonSpecies {
    flavor_text_entries: {
        flavor_text: string;
        language: {
            name: string;
            url: string;
        };
        version: {
            name: string;
            url: string;
        };
    }[];
    genera: {
        genus: string;
        language: {
            name: string;
            url: string;
        };
    }[];
    evolution_chain: {
        url: string;
    };
}

export type PokemonType =
    | 'normal'
    | 'fire'
    | 'water'
    | 'electric'
    | 'grass'
    | 'ice'
    | 'fighting'
    | 'poison'
    | 'ground'
    | 'flying'
    | 'psychic'
    | 'bug'
    | 'rock'
    | 'ghost'
    | 'dragon'
    | 'dark'
    | 'steel'
    | 'fairy';

export const typeColors: Record<PokemonType, string> = {
    normal: 'bg-gray-400 text-gray-900',
    fire: 'bg-red-500 text-white',
    water: 'bg-blue-500 text-white',
    electric: 'bg-yellow-400 text-gray-900',
    grass: 'bg-green-500 text-white',
    ice: 'bg-blue-200 text-gray-900',
    fighting: 'bg-red-700 text-white',
    poison: 'bg-purple-500 text-white',
    ground: 'bg-yellow-600 text-white',
    flying: 'bg-indigo-300 text-gray-900',
    psychic: 'bg-pink-500 text-white',
    bug: 'bg-green-400 text-gray-900',
    rock: 'bg-yellow-700 text-white',
    ghost: 'bg-purple-700 text-white',
    dragon: 'bg-indigo-700 text-white',
    dark: 'bg-gray-700 text-white',
    steel: 'bg-gray-400 text-gray-900',
    fairy: 'bg-pink-300 text-gray-900'
};