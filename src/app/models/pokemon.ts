export interface Pokemon {
    abilities: string[];
    moves: string[];
    name: string;
    sprite: string;
    stats: Array<{
        stat: string;
        amount: number;
    }>;
    types: string[];
    weight: number;
}  