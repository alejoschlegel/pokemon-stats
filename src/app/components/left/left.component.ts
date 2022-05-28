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

  ngOnInit(): void {
    //this.pokemonService.currentEffectiveness.subscribe((defence:any) => this.currentEffectiveness = defence);
  }
}
