import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../../services/pokemon_service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PokemonResponseDto } from '../../../models/pokemon/pokemonResponseDto';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CardInfoPokemonComponent } from '../card-info-pokemon/card-info-pokemon.component';
import { AlertManager } from '../../../managers/alertManagers';

@Component({
  selector: 'app-pokemon',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    CardInfoPokemonComponent,
  ],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css',
})
export class PokemonComponent implements OnInit {
  pokemonId!: string;
  pokemon!: PokemonResponseDto | null;
  loading: boolean = true;
  error!: boolean;
  errorMessage!: string;
  formSearch: FormGroup;
  pokemons: PokemonResponseDto[] = [];

  constructor(
    private router: ActivatedRoute,
    private pokemonService: PokemonService,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
    private alertManager: AlertManager
  ) {
    this.formSearch = this.fb.group({
      searchValue: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.error = false;
    this.loading = false;

    this.getPokemonsSessionStorage();
  }

  getDatForm() {
    this.pokemonId = this.formSearch.get('searchValue')?.value;
  }

  requestPokemonData() {
    if (this.pokemonId) {
      this.loading = true;
      this.pokemonService.getPokemon(this.pokemonId).subscribe({
        next: (response: PokemonResponseDto) => {
          this.pokemon = response;
          this.loading = false;
          this.formSearch.get('searchValue')?.setValue('');
        },
        error: (error) => {
          this.pokemon = null;
          this.error = true;
          this.errorMessage = error || 'Error Desconocido';
          this.loading = false;
        },
      });
    }
  }

  searchPokemon() {
    this.getDatForm();
    this.requestPokemonData();
  }

  validsearchPokemon(searchValue: string, value: Event) {
    const control = this.formSearch.get(searchValue);

    if (control) {
      const inputValue = control.value;
      if (!isNaN(inputValue[0])) {
        if (!this.isOnlyNumbers(control.value)) {
          control.setValue(control.value.replace(/[^0-9]/g, ''));

          control.setErrors({ uniqueType: true });
        } else {
          control.setErrors(null);
        }
      }

      if (isNaN(inputValue[0])) {
        if (!this.isOnlyText(control.value)) {
          control.setValue(control.value.replace(/[0-9]/g, ''));
          control.setErrors({ uniqueType: true });
        } else {
          control.setErrors({ uniqueType: null });
        }
      }
    }
  }

  isOnlyText(input: string): boolean {
    const regex = /^[A-Za-z]+$/;
    return regex.test(input);
  }
  isOnlyNumbers(input: string): boolean {
    const regex = /^[0-9]+$/;
    return regex.test(input);
  }

  getPokemonId(pokemonId: string) {
    this.pokemonId = pokemonId;
    this.requestPokemonData();
  }

  async savePokemon(pokemon: PokemonResponseDto) {
    const exists = this.pokemons.some((p) => p.id === pokemon.id);
    if (exists) {
      this.alertManager.errorAlert('Este pokemon ya fue agregado');
    } else {
      let confirm = await this.alertManager.showConfirmAlert(
        `Vas a agregar a  ${pokemon.name} a la lista`, '¿Esta seguro?', pokemon.spriteUrl
      );
      
      if(confirm.isConfirmed){
        this.pokemons.push(pokemon);
      this.savePokemonsSessionStorage();
      }
    }
  }

  async removePokemonList(pokemonId: string) {
    let confirm = await this.alertManager.showConfirmAlert(
      "Va a eliminar el pokemon de la lista", '¿Esta seguro?'
    );
    if (confirm.isConfirmed) {
      this.getPokemonsSessionStorage();
      this.pokemons = this.pokemons.filter((p) => p.id !== pokemonId);
      this.savePokemonsSessionStorage();
      this.alertManager.successAlert('Pokemon eliminado de la lista');
    } else {
      this.alertManager.errorAlert('Operación cancelada');
    }

  }
  savePokemonsSessionStorage() {
    sessionStorage.setItem('pokemons', JSON.stringify(this.pokemons));
  }
  getPokemonsSessionStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const pokemons = sessionStorage.getItem('pokemons');
      if (pokemons) {
        this.pokemons = JSON.parse(pokemons);
      }
    }
  }
}
