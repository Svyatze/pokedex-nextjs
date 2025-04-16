import { PokemonType, typeColors } from '@/types/pokemon';

interface TypeBadgeProps {
    type: PokemonType;
}

export default function TypeBadge({ type }: TypeBadgeProps) {
    return (
        <span
            className={`${typeColors[type]} text-white text-sm font-semibold px-3 py-1 rounded-full capitalize`}
        >
      {type}
    </span>
    );
}