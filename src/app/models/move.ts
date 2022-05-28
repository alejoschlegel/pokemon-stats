export interface Move {
    name: string;
    accuracy: number | null;
    effect_chance: string | null;
    priority: number;
    power: number | null;
    damage_type: string;
    effect: string | null;
    damage_class: string;
}