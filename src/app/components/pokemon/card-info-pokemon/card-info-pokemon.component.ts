import { Component, Input, Output, EventEmitter } from '@angular/core';
import{MatCardModule} from '@angular/material/card';
import { PokemonComponent } from "../pokemon/pokemon.component";
import { CommonModule } from '@angular/common';
import { PokemonResponseDto } from '../../../models/pokemon/pokemonResponseDto';
import { PokeApiPokemonRequestDto } from '../../../models/pokemon/pokemonApiResponseDto';
import { TypeDto } from '../../../models/pokemon/type';
import { AbilityDto } from '../../../models/pokemon/ability';

@Component({
  selector: 'app-card-info-pokemon',
  imports: [MatCardModule,CommonModule],
templateUrl: './card-info-pokemon.component.html',
  styleUrl: './card-info-pokemon.component.css'
})
export class CardInfoPokemonComponent {

  @Input() pokemonName!: string;
  @Input() pokemonAbilities!: string[];
  @Input() pokemonSprite!: string;
  @Input() pokemonImg!: string;
  @Input() pokemonId!: string;
  @Input() textInfo!: string;
  @Input() btnsActions!: boolean;
  @Input() btnRemove!: boolean;
  @Output() pokemonIdEmit = new EventEmitter<string>();
  @Output() pokemonEmit = new EventEmitter<PokemonResponseDto>();
  @Input()  pokemonTypes!:string[];
  @Input() removePokemonList!: (pokemonId: string) => void;
  sendPokemonId(){
 
    let pokemonIdParce = Number(this.pokemonId)
    if(pokemonIdParce>0){
      pokemonIdParce= pokemonIdParce+1;
      this.pokemonIdEmit.emit(pokemonIdParce.toString());
    }
  }   


  sendPokemon() {
    const pokemon: PokemonResponseDto = {
      id: this.pokemonId, 
      name: this.pokemonName, 
      types: this.pokemonTypes, 
      abilities: this.pokemonAbilities, 
      spriteUrl: this.pokemonSprite,
      imageStandar: "",
      imageShiny: this.pokemonImg,
    };
    this.pokemonEmit.emit(pokemon);
}

removePokemon(pokemondId: string){

 
  this.removePokemonList(pokemondId);

}

}