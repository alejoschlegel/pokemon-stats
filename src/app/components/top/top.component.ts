import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from "../../services/pokemon.service";

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  // get a json file from assets folder and return it as an array
  async getJsonData() {
    let res = await fetch('assets/data/pokemons.json');
    let data = await res.text();
    return JSON.parse(data);
  }
  async getJsonData1() {
    let res = await fetch('assets/data/effectiveness.json');
    let data = await res.text();
    return JSON.parse(data);
  }

  inputValue: string = '';
  pokemonsList = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getJsonData().then(data => {
      this.pokemonsList = data;
    });
  }
  getPokemon() {
    // TODO: check in the future :)
    if (!this.pokemonsList.find(pokemon => pokemon === this.inputValue)) return
    this.pokemonService.getPokemon(this.inputValue).subscribe(data => {
      this.pokemonService.setCurrentPokemon(data[0]);
      this.inputValue = '';
    });
  }

}
