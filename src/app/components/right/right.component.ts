import { Component, OnInit} from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { TagComponent } from 'src/app/components/tag/tag.component';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class RightComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category', 'type', 'power', 'accuracy', 'description', 'effect'];

  constructor( public pokemonService: PokemonService ) { }

  ngOnInit(): void {
  }

}
