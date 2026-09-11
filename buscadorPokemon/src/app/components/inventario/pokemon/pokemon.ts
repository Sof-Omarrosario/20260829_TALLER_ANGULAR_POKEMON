import { Component, inject } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { PokemonStorageService } from '../../../services/pokemon-storage.service';
import { ResaltarTarjetaDirective } from '../../../directives/resaltar-tarjeta.directive';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [NgClass, NgStyle, ResaltarTarjetaDirective],
  templateUrl: './pokemon.html',
  styleUrls: ['./pokemon.css']
})
export class InventarioPokemon {
  pokemonService = inject(PokemonStorageService);
}