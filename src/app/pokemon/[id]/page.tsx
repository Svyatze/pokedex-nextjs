'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePokemonDetails } from '@/hooks/usePokemon';
import { getPokemonSpecies } from '@/services/pokemonService';
import { PokemonSpecies } from '@/types/pokemon';

import Loading from '../../../components/Loading';
import TypeBadge from '../../../components/TypeBadge';

interface PokemonDetailPageProps {
    params: {
        id: string;
    };
}

export default function PokemonDetailPage({ params }: PokemonDetailPageProps) {
    const {id} = params;
    const {pokemon, isLoading, error} = usePokemonDetails(id);
    const [species, setSpecies] = useState<PokemonSpecies | null>(null);
    const [speciesLoading, setSpeciesLoading] = useState(false);

    useEffect(() => {
        const fetchSpecies = async () => {
            if (pokemon) {
                setSpeciesLoading(true);
                try {
                    const speciesData = await getPokemonSpecies(pokemon.id);
                    setSpecies(speciesData);
                } catch (err) {
                    console.error("Failed to fetch species data:", err);
                } finally {
                    setSpeciesLoading(false);
                }
            }
        };

        fetchSpecies();
    }, [pokemon]);

    if (isLoading || speciesLoading) {
        return <Loading/>;
    }

    if (error || !pokemon) {
        return (
            <div className="container mx-auto p-8">
                <div className="bg-red-100 text-red-700 p-4 rounded">
                    Error loading Pokémon: {error?.message || "Pokémon not found"}
                </div>
                <Link href="/pokemon" className="mt-4 inline-block text-red-500 hover:underline">
                    Back to Pokémon List
                </Link>
            </div>
        );
    }

    const getEnglishFlavorText = () => {
        if (!species) return "No description available.";

        const englishEntry = species.flavor_text_entries.find(
            entry => entry.language.name === 'en'
        );

        return englishEntry ? englishEntry.flavor_text.replace(/\f/g, ' ') : "No description available.";
    };

    const getGenus = () => {
        if (!species) return "Pokémon";

        const englishGenus = species.genera.find(
            g => g.language.name === 'en'
        );

        return englishGenus ? englishGenus.genus : "Pokémon";
    };

    return (
        <div className="container mx-auto p-8">
            <Link href="/pokemon" className="inline-block mb-6 text-pokemon-blue font-semibold hover:underline">
                &larr; Back to Pokémon List
            </Link>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-pokemon-blue">
                <div className="p-6 bg-pokemon-yellow text-dark-text">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 relative h-64 md:h-auto">
                            <Image
                                src={pokemon.sprites.other['official-artwork'].front_default || ''}
                                alt={pokemon.name}
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="md:w-2/3 md:pl-8 mt-4 md:mt-0">
                            <div className="flex items-center mb-4">
                                <h1 className="text-3xl font-bold capitalize mr-4">{pokemon.name}</h1>
                                <span className="text-xl font-semibold">#{pokemon.id.toString().padStart(3, '0')}</span>
                            </div>

                            <div className="mb-4">
                                <h2 className="text-xl font-semibold mb-2">The {getGenus()}</h2>
                                <p className="text-dark-text">{getEnglishFlavorText()}</p>
                            </div>

                            <div className="flex gap-2 mb-4">
                                {pokemon.types.map((typeInfo) => (
                                    <TypeBadge key={typeInfo.type.name} type={typeInfo.type.name as never}/>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-semibold">Height</p>
                                    <p className="font-bold">{(pokemon.height / 10).toFixed(1)} m</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">Weight</p>
                                    <p className="font-bold">{(pokemon.weight / 10).toFixed(1)} kg</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <h2 style={{color: 'black', fontWeight: 'bold'}} className="text-2xl mb-4">Base Stats</h2>
                    <div className="space-y-4">
                        {pokemon.stats.map(stat => {
                            const percentage = Math.min(100, (stat.base_stat / 180) * 100);

                            return (
                                <div key={stat.stat.name}>
                                    <div className="flex justify-between mb-1">
                    <span style={{color: 'black'}} className="text-sm font-medium capitalize">
                      {stat.stat.name.replace('-', ' ')}
                    </span>
                                        <span style={{color: 'black'}}
                                              className="text-sm font-medium">{stat.base_stat}</span>
                                    </div>
                                    <div style={{
                                        backgroundColor: '#e5e7eb',
                                        height: '0.625rem',
                                        borderRadius: '9999px',
                                        border: '1px solid #3B5BA7'
                                    }} className="w-full">
                                        <div
                                            style={{
                                                backgroundColor: '#FFCB05',
                                                height: '0.5rem',
                                                borderRadius: '9999px',
                                                width: `${percentage}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="p-6 border-t border-pokemon-blue">
                    <h2 className="text-2xl font-bold mb-4 text-dark-text">Abilities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pokemon.abilities.map(ability => (
                            <div
                                key={ability.ability.name}
                                className="p-3 rounded-lg bg-pokemon-yellow border border-pokemon-blue hover:bg-yellow-300 transition-colors"
                            >
                                <h3 className="font-semibold capitalize mb-1 text-dark-text">
                                    {ability.ability.name.replace('-', ' ')}
                                    {ability.is_hidden && <span className="ml-2 text-sm font-semibold">(Hidden)</span>}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}