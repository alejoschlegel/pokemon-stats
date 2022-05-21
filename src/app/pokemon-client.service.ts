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
    sprite: "",
    stats: [{}],
    types: [{}],
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
      this.data.sprite = res.sprites.front_default;
      // for every stat save relevant data
      for (let i = 0; i < res.stats.length; i++){
        let obj = {
          num: res.stats[i].base_stat,
          name: res.stats[i].stat.name
        }
        this.data.stats.push(obj);
      }
      // for every type save relevant data
      for (let i = 0; i < res.types.length; i++){
        let obj = {
          slot: res.types[i].slot,
          name: res.types[i].type.name
        }
        this.data.types.push(obj)
      }
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
          description: data.effect_entries[1].effect
        }
        this.data.abilities.push(obj);
        console.log(this.data);
      })
      .catch((error) => console.error(error));
    }
  }
}
