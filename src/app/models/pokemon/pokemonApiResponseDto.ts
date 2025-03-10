import { AbilityDto } from "./ability";
import { TypeDto } from "./type";

export interface PokeApiPokemonRequestDto{
    id: number;
    name: string;
    types: TypeDto[];
    abilities:AbilityDto[];
    sprites: {
      front_default: string[];
      other: {
        'home': {
          front_default: string;
          front_shiny: string;
        };
      };
    };
  }