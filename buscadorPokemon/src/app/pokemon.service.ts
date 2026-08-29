import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PokemonType {
  slot: number;
  type: { name: string };
}

export interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: {
    front_default: string | null;
    other: {
      'official-artwork': {
        front_default: string | null;
      };
    };
  };
}

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  buscarPokemon(nombre: string): Observable<Pokemon> {
    const query = nombre.trim().toLowerCase();
    return this.http.get<Pokemon>(`${this.baseUrl}/${query}`);
  }
}
