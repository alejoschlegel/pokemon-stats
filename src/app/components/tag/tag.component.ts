import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  types: Array<string> = ['bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water'];
  @Input() type: string = "";
  typecss:string = "";
  
  constructor() { }

  ngOnInit(): void {
    this.typecss = "var(--"+ this.type +")"
  }

}
