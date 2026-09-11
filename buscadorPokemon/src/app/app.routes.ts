import { Routes} from "@angular/router";
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { BuscadorPokemonComponent } from './components/buscador-pokemon/buscador-pokemon.component';
import { inventarioPokemon } from './components/inventario/pokemon/pokemon';

export const routes: Routes = [
    { path: 'registro', component: RegistroUsuarioComponent },
    { path: 'buscador', component: BuscadorPokemonComponent },
    { path: 'inventario', component: inventarioPokemon },
    { path: '', redirectTo: '/buscador', pathMatch: 'full'}
];