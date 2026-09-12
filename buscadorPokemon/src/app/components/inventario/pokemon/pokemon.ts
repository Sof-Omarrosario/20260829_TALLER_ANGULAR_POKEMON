import { Component, inject } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { PokemonStorageService } from '../../../services/pokemon.storage.service';
import { ResaltarTarjetaDirective } from '../../../directivas/resaltar-tarjeta.directive';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [NgClass, NgStyle, ResaltarTarjetaDirective],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.css'
})
export class InventarioPokemon {
  pokemonService = inject(PokemonStorageService);
}