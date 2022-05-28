import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Pokemon } from "../models/pokemon";
import { Move } from '../models/move';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private pokemonsCollection: AngularFirestoreCollection<Pokemon>;
  pokemons: Observable<Pokemon[]>;

  private movesCollection: AngularFirestoreCollection<Move>;
  moves: Observable<Move[]>;

  constructor(private angularFirestore: AngularFirestore) { 
    this.pokemonsCollection = this.angularFirestore.collection<Pokemon>('pokemons');
    this.pokemons = this.pokemonsCollection.valueChanges();

    this.movesCollection = this.angularFirestore.collection<Move>('moves');
    this.moves = this.movesCollection.valueChanges();
  }

  /* *********************** pokemons *********************** */
  getPokemons() {
    return this.pokemons;
  }

  getPokemon(name: string) {
    return this.angularFirestore.collection('pokemons', ref => ref.where('name', '==', name.toLowerCase())).valueChanges();
  } 

  addPokemon(pokemon: Pokemon) {
    this.pokemonsCollection.doc(pokemon.name.toLowerCase()).set(pokemon);
  }
  
  addPokemons(pokemons: Pokemon[]) {
    pokemons.forEach(pokemon => {
      this.pokemonsCollection.doc(pokemon.name.toLowerCase()).set(pokemon);
    });
  }

  /* *********************** moves *********************** */
  addMove(move: Move) {
    this.movesCollection.doc(move.name.toLowerCase()).set(move);
  }

  addMoves(moves: Move[]) {
    moves.forEach(move => {
      this.movesCollection.doc(move.name.toLowerCase()).set(move);
    });
  }

}
