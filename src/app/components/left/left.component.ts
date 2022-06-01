import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Effectiveness } from 'src/app/models/effectiveness';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {

  constructor(public pokemonService: PokemonService) { }

  currentEffectiveness: Effectiveness = {} as Effectiveness;
  defenceKeys = Object.keys(this.currentEffectiveness);
  levels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];

  ngOnInit(): void {
    //this.pokemonService.currentEffectiveness.subscribe((defence:any) => this.currentEffectiveness = defence);
  }
  abbreviate = (text: string) => {
    if (text === "attack") return 'atk'
    if (text === "defense") return 'def'
    if (text === "special-attack") return 'spa'
    if (text === "special-defense") return 'spd'
    return text;
  }
}
