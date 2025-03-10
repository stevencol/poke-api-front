import { HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { RequestManager } from "../managers/requestManagers"; 

const httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'application/json',
    }),
  }
  

  @Injectable({
    providedIn: 'root'
  })

  export class PokemonService {
    constructor(private requestManage:RequestManager) { }
  
    getPokemon(id :string) {
      this.requestManage.setPath('POKE_API_URL');
      return this.requestManage.get(id);
    }
  
    
  }

