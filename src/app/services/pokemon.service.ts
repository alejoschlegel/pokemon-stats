import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { Move } from '../models/move';
import { Ability } from '../models/ability';
import { Effectiveness } from '../models/effectiveness';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  currentPokemon: Pokemon = {} as Pokemon;
  currentMoves: Move[] = [];
  currentAbilities: Ability[] = [];

  
  //currentEffectiveness: Effectiveness = {} as Effectiveness;
  /* private effectiveness1 = new BehaviorSubject<Effectiveness>({} as Effectiveness);
  currentEffectiveness1 = this.effectiveness1.asObservable(); */

  currentEffectiveness: Effectiveness = {
    defence: {},
    attack:{}
  }
  defenceKeys: string[] = [];
  attackKeys: string[] = [];

  private pokemonsCollection: AngularFirestoreCollection<Pokemon>;
  pokemons: Observable<Pokemon[]>;

  private movesCollection: AngularFirestoreCollection<Move>;
  moves: Observable<Move[]>;

  private abilitiesCollection: AngularFirestoreCollection<Ability>;
  abilities: Observable<Ability[]>;

  private effectivenessCollection: AngularFirestoreCollection<any>;
  effectiveness: Observable<any>;


  constructor(private angularFirestore: AngularFirestore) {
    this.pokemonsCollection = this.angularFirestore.collection<Pokemon>('pokemons');
    this.pokemons = this.pokemonsCollection.valueChanges();

    this.movesCollection = this.angularFirestore.collection<Move>('moves');
    this.moves = this.movesCollection.valueChanges();

    this.abilitiesCollection = this.angularFirestore.collection<Ability>('abilities');
    this.abilities = this.abilitiesCollection.valueChanges();

    this.effectivenessCollection = this.angularFirestore.collection<any>('effectiveness');
    this.effectiveness = this.effectivenessCollection.valueChanges();
  }


  getPokemons() {
    return this.pokemons;
  }
  getPokemon(name: string) {
    return this.angularFirestore.collection<Pokemon>('pokemons', ref => ref.where('name', '==', name.toLowerCase())).valueChanges();
  }

  setCurrentPokemon(pokemon: Pokemon) {
    this.currentPokemon = pokemon;
    this.angularFirestore.collection<Move>('moves', ref => ref.where( 'name', "in", pokemon.moves.splice(0, 10))).valueChanges().subscribe(moves => {
      this.setCurrentMoves(moves);
    });
    this.angularFirestore.collection<Ability>('abilities', ref => ref.where( 'name', "in", pokemon.abilities)).valueChanges().subscribe(abilities => {
      this.setCurrentAbilities(abilities);
    });
    this.angularFirestore.collection<any>('effectiveness').valueChanges().subscribe((effectiveness:any) => {

      let str:string = "";
      pokemon.types.sort().forEach(type => str += '-' + type);
      str = str.substring(1);

      this.setCurrentEffectiveness({
        defence: effectiveness[1][str]
      });
      this.defenceKeys = Object.keys(this.currentEffectiveness.defence);

      // Sort defence keys
      this.defenceKeys = Object.keys(this.currentEffectiveness.defence).sort(
        (a:any, b:any) => {
          if( (a === "Inmune" ? 0 : (a.length > 3 ? a[0] / a[2] : a[0])) > (b === "Inmune" ? 0 : (b.length > 3 ? b[0] / b[2] : b[0]) )) {
            return -1;
          } else return 1
        }
      );
    });
  }
  setCurrentMoves(moves: Move[]) {
    this.currentMoves = moves;
  }
  setCurrentAbilities(abilities: Ability[]) {
    this.currentAbilities = abilities;
  }
  setCurrentEffectiveness(effectiveness: Effectiveness) {
    this.currentEffectiveness = effectiveness;
  }


  /* addPokemon(pokemon: Pokemon) {
    this.pokemonsCollection.doc(pokemon.name.toLowerCase()).set(pokemon);
  } */
  
  /* addPokemons(pokemons: Pokemon[]) {
    pokemons.forEach(pokemon => {
      this.pokemonsCollection.doc(pokemon.name.toLowerCase()).set(pokemon);
    });
  } */

  /* addMoves(moves: Move[]) {
    moves.forEach(move => {
      this.movesCollection.doc(move.name.toLowerCase()).set(move);
    });
  } */

  /* addAbilities(abilities: Ability[]) {
    abilities.forEach(ability => {
      this.abilitiesCollection.doc(ability.name.toLowerCase()).set(ability);
    });
  } */

  // Upload effectiveness json to firestore
  async getJsonData1() {
    let res = await fetch('assets/data/effectiveness.json');
    let data = await res.text();
    return JSON.parse(data);
  }

  addEffectiveness() {
    let res = this.getJsonData1().then(data => {
    let newEffectiveness: any = {};
    for (let key in data) {
      let newKey:any = {}
      for (let key2 in data[key]) {
        if(data[key][key2].length > 0) {
          newKey[key2] = data[key][key2];
        }
      }
      newEffectiveness[key] = newKey;
    }
    data = newEffectiveness

    let newEffectiveness2: any = {};
    for (let key in data) {
      let newKey:any = {}
      for (let key2 in data[key]) {
        switch (key2){
          case "4X":
            newKey["4X"] = data[key][key2];
            break;
          case "2X":
            newKey["2X"] = data[key][key2];
            break;
          case "1X":
            newKey["1X"] = data[key][key2];
            break;
          case ".5X":
            newKey["1/2X"] = data[key][key2];
            break;
          case ".25X":
            newKey["1/4X"] = data[key][key2];
            break;
          case "0X":
            newKey["Inmune"] = data[key][key2];
            break;
        }
      }
      newEffectiveness2[key] = newKey;
    }
      data = newEffectiveness2;
      this.effectivenessCollection.doc('defence').set(data);
    });
  }

  sortEffectiveness(effectiveness: any){

  }

/*
  deleteEmptyEfectivenessType(effectiveness:any) {
    let newEffectiveness: any = {};
    for (let key in effectiveness[1]) {
      let newKey:any = {}
      for (let key2 in effectiveness[1][key]) {
        if(effectiveness[1][key][key2].length > 0) {
          newKey[key2] = effectiveness[1][key][key2];
        }
      }
      newEffectiveness[key] = newKey;
    }
    console.log(newEffectiveness);
    this.angularFirestore.collection<any>('effectiveness').doc('defence').set(newEffectiveness);
  }

  remapEfectivenessTypeNames(effectiveness:any) {
    let newEffectiveness: any = {};
    for (let key in effectiveness[1]) {
      let newKey:any = {}
      for (let key2 in effectiveness[1][key]) {
        switch (key2){
          case "4X":
            newKey["Takes 4X from"] = effectiveness[1][key][key2];
            break;
          case "2X":
            newKey["Takes 2X from"] = effectiveness[1][key][key2];
            break;
          case "1X":
            newKey["Takes 1X from"] = effectiveness[1][key][key2];
            break;
          case ".5X":
            newKey["Takes 1/2X from"] = effectiveness[1][key][key2];
            break;
          case ".25X":
            newKey["Takes 1/4X from"] = effectiveness[1][key][key2];
            break;
          case "0X":
            newKey["Inmune to"] = effectiveness[1][key][key2];
            break;
        }
      }
      newEffectiveness[key] = newKey;
    }
    console.log(newEffectiveness);
    this.angularFirestore.collection<any>('effectiveness').doc('defence').set(newEffectiveness);
  }
  */
} 