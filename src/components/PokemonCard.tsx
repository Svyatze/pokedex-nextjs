'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Pokemon } from '../types/pokemon';
import { getPokemonImageUrl } from '../services/pokemonService';
import TypeBadge from './TypeBadge';

interface PokemonCardProps {
    pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <Link href={`/pokemon/${pokemon.id}`}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-xl">
                <div className="relative h-48 bg-gray-200">
                    {!imageError ? (
                        <Image
                            src={pokemon.sprites.other['official-artwork'].front_default || getPokemonImageUrl(pokemon.id)}
                            alt={pokemon.name}
                            fill
                            className="object-contain p-2"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <span className="text-gray-500">Image unavailable</span>
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold capitalize">{pokemon.name}</h3>
                        <span className="text-gray-500 font-semibold">#{pokemon.id.toString().padStart(3, '0')}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                        {pokemon.types.map((typeInfo) => (
                            <TypeBadge key={typeInfo.type.name} type={typeInfo.type.name as never} />
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
}