import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PokemonTarjeta {
  id: number;
  name: string;
  image: string;
  type: string;
  baseExperience: number;
  esFavorito?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class PokemonStorageService {
  private http = inject(HttpClient);
  private readonly storageKey = 'equipo_pokemon_registrado';

  misPokemons = signal<PokemonTarjeta[]>([]);

  constructor() {
    this.cargarPokemonsDesdeStorage();
  }

  private cargarPokemonsDesdeStorage() {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.misPokemons.set(JSON.parse(data));
    }
  }
}