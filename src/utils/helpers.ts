export function formatPokemonId(id: number): string {
    return `#${id.toString().padStart(3, '0')}`;
}

export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatPokemonName(name: string): string {
    return name
        .split('-')
        .map(capitalizeFirstLetter)
        .join(' ');
}

export function extractIdFromUrl(url: string): number {
    const regex = /\/(\d+)\/?$/;
    const match = url.match(regex);
    return match ? parseInt(match[1]) : 0;
}