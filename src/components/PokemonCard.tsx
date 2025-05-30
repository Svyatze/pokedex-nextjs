'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Pokemon } from '@/types/pokemon';
import { getPokemonImageUrl } from '@/services/pokemonService';

import TypeBadge from './TypeBadge';

interface PokemonCardProps {
    pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <Link href={`/pokemon/${pokemon.id}`}>
            <div style={{ borderColor: '#3B5BA7', borderWidth: '4px' }} className="bg-white rounded-lg shadow-xl overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl">
                <div className="relative h-48 bg-gray-100">
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
                            <span style={{ color: 'black' }} className="font-bold">Image unavailable</span>
                        </div>
                    )}
                </div>
                <div style={{ backgroundColor: '#FFCB05', borderTop: '4px solid #3B5BA7' }} className="p-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 style={{ color: 'black' }} className="text-xl font-bold capitalize">{pokemon.name}</h3>
                        <span style={{ color: 'black' }} className="font-bold">#{pokemon.id.toString().padStart(3, '0')}</span>
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