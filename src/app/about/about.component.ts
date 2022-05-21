import { Component, OnInit } from '@angular/core';
import { PokemonClientService } from '../pokemon-client.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  pikachu: any;

  constructor(private pokemonClient: PokemonClientService) { }

  ngOnInit(): void {
    this.pokemonClient.getPokemon('pikachu').then((data:any) => {
      this.pikachu = data;
    })
  }

}
