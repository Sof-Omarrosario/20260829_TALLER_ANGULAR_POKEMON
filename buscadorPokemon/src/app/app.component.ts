import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService, Pokemon } from './pokemon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  termino = '';
  pokemon: Pokemon | null = null;
  cargando = false;
  error = '';

  constructor(private pokemonService: PokemonService) {}

  buscar(): void {
    const query = this.termino.trim();
    if (!query) {
      this.error = 'Escribe el nombre o número de un Pokémon.';
      this.pokemon = null;
      return;
    }

    this.cargando = true;
    this.error = '';

    this.pokemonService.buscarPokemon(query).subscribe({
      next: (data) => {
        this.pokemon = data;
        this.cargando = false;
      },
      error: () => {
        this.pokemon = null;
        this.error = `No se encontró ningún Pokémon con "${query}". Verifica el nombre.`;
        this.cargando = false;
      },
    });
  }

  get imagen(): string {
    if (!this.pokemon) return '';
    return (
      this.pokemon.sprites.other['official-artwork'].front_default ||
      this.pokemon.sprites.front_default ||
      ''
    );
  }

  formatearId(id: number): string {
    return '#' + id.toString().padStart(3, '0');
  }

  formatearNombre(nombre: string): string {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1);
  }

  formatearStat(nombre: string): string {
    const mapa: Record<string, string> = {
      hp: 'HP',
      attack: 'Ataque',
      defense: 'Defensa',
      'special-attack': 'At. Esp.',
      'special-defense': 'Def. Esp.',
      speed: 'Velocidad',
    };
    return mapa[nombre] ?? nombre;
  }
}
