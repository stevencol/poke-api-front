import { Routes } from '@angular/router';
import { PokemonComponent } from './components/pokemon/pokemon/pokemon.component';
import { CardInfoPokemonComponent } from './components/pokemon/card-info-pokemon/card-info-pokemon.component';


export const routes: Routes = [
   {path:"pokemon", component: PokemonComponent},
   {path:"", redirectTo: "pokemon", pathMatch: "full"}
];

