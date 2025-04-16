import { PokemonType } from '@/types/pokemon';

interface TypeBadgeProps {
    type: PokemonType;
}

export default function TypeBadge({ type }: TypeBadgeProps) {
    const getBadgeColors = (pokemonType: PokemonType): { background: string, text: string } => {
        switch (pokemonType) {
            case 'normal': return { background: '#A8A878', text: 'black' };
            case 'fire': return { background: '#F08030', text: 'white' };
            case 'water': return { background: '#6890F0', text: 'white' };
            case 'electric': return { background: '#F8D030', text: 'black' };
            case 'grass': return { background: '#78C850', text: 'black' };
            case 'ice': return { background: '#98D8D8', text: 'black' };
            case 'fighting': return { background: '#C03028', text: 'white' };
            case 'poison': return { background: '#A040A0', text: 'white' };
            case 'ground': return { background: '#E0C068', text: 'black' };
            case 'flying': return { background: '#A890F0', text: 'white' };
            case 'psychic': return { background: '#F85888', text: 'white' };
            case 'bug': return { background: '#A8B820', text: 'white' };
            case 'rock': return { background: '#B8A038', text: 'white' };
            case 'ghost': return { background: '#705898', text: 'white' };
            case 'dragon': return { background: '#7038F8', text: 'white' };
            case 'dark': return { background: '#705848', text: 'white' };
            case 'steel': return { background: '#B8B8D0', text: 'black' };
            case 'fairy': return { background: '#EE99AC', text: 'black' };
            default: return { background: '#68A090', text: 'white' };
        }
    };

    const colors = getBadgeColors(type);

    return (
        <span
            style={{
                backgroundColor: colors.background,
                color: colors.text,
                border: '1px solid #000000',
                fontWeight: 'bold',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                textTransform: 'capitalize'
            }}
            className="text-sm"
        >
      {type}
    </span>
    );
}