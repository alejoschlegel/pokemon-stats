import { Injectable } from '@angular/core';
import { PokemonClient } from 'pokenode-ts';

@Injectable({
  providedIn: 'root'
})
export class PokemonClientService {
  data = {
    abilities: [{}],
    id: "",
    moves: [],
    name: "",
    sprites: {},
    stats: [],
    types: [],
    weight: 0
  };

  constructor() { }

  async getPokemon (name: string) {
    let res: any;
    const api = new PokemonClient();
    await api
    .getPokemonByName(name)
    .then((data) => {
      res = data
      /* this.data.abilities.push(res.abilities) */
      this.data.id = res.id;
      this.data.moves = res.moves;
      this.data.name = res.name;
      this.data.sprites = res.sprites;
      this.data.stats = res.stats;
      this.data.types = res.types;
      this.data.weight = res.weight;
    })
    .catch((error) => console.error(error));

    // for every abilitie in res, make a request to get the ability's description
    for (let i = 0; i < res.abilities.length; i++) {
      await api
      .getAbilityByName(res.abilities[i].ability.name)
      .then((data) => {
        console.log(data);
        let obj = {
          name: data.name,
          description: data.effect_entries[0].effect
        }
        this.data.abilities.push(obj);
        console.log(this.data);
      })
      .catch((error) => console.error(error));
    }
  }
}
