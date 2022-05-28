import { Component } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { Pokemon } from './models/pokemon';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokemon-stats';

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    console.log('AppComponent initialized');
    console.log(this.pokemonService.currentPokemon.name);
  }
}
