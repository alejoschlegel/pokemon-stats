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
  private effectiveness = new BehaviorSubject<Effectiveness>({} as Effectiveness);
  currentEffectiveness1 = this.effectiveness.asObservable();

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

  private effectivenessCollection: AngularFirestoreCollection<Effectiveness>;
  effectiveness1: Observable<Effectiveness[]>;


  constructor(private angularFirestore: AngularFirestore) {
    this.pokemonsCollection = this.angularFirestore.collection<Pokemon>('pokemons');
    this.pokemons = this.pokemonsCollection.valueChanges();

    this.movesCollection = this.angularFirestore.collection<Move>('moves');
    this.moves = this.movesCollection.valueChanges();

    this.abilitiesCollection = this.angularFirestore.collection<Ability>('abilities');
    this.abilities = this.abilitiesCollection.valueChanges();

    this.effectivenessCollection = this.angularFirestore.collection<Effectiveness>('effectiveness');
    this.effectiveness1 = this.effectivenessCollection.valueChanges();
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
    this.angularFirestore.collection<any>('effectiveness').valueChanges().subscribe(effectiveness => {

      //TODO: check if the types are in the name instead of check equality
      let str:string = "";
      pokemon.types.sort().forEach(type => str += '-' + type);
      str = str.substring(1);
      console.log(effectiveness[1]);

      this.setCurrentEffectiveness({
        defence: effectiveness[1][str]
      });
      this.defenceKeys = Object.keys(this.currentEffectiveness.defence);
    });

  }
  setCurrentMoves(moves: Move[]) {
    this.currentMoves = moves;
  }
  setCurrentAbilities(abilities: Ability[]) {
    this.currentAbilities = abilities;
  }
  setCurrentEffectiveness(effectiveness: Effectiveness) {
    //this.effectiveness.next(effectiveness)
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

  /* addEffectiveness(effectiveness: Effectiveness) {
    this.effectivenessCollection.doc('effectiveness').set(effectiveness);
  } */
} 