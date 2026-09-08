import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';


export interface Usuario {
  id: number;
  nombreCompleto: string;
  documento: {
  tipo: string;
  numero_identificacion: string
};
  celu: string;
  correo: string,
  fecha_nac: string;
  edad: string;

  ubicacion: {
  pais: string,
  ciudad: string
};

  tratamientos: boolean;
}



@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro-usuario.component.html',
  styleUrl: './registro-usuario.component.css'
})


export class RegistroUsuarioComponent {
  nombre = signal('');
  apellido= signal('');
  documento = signal('');
  tipo = signal('');
  numero_identificacion = signal('');

  celu = signal('');
  correo = signal('');
  fecha_nac = signal('');
  edad = signal('');

  ubicacion= signal('');
  pais= signal('');
  ciudad= signal('');

  tratamientos = signal(false);
  

  ultimoUsuario = signal<Usuario |null>(null);

  
  guardarUsuario() {
    if(!this.tratamientos()){
      alert('Debes aceptar el tratamiento de datos personales');
      return;
    }


    
    const usuarioCreado = {

      id: Date.now(),
      nombreCompleto: `${this.nombre()}, ${this.apellido()}`,
      documento: {
      tipo: this.tipo,
      numero_identificacion: this.numero_identificacion,
     },

      celu: this.celu,
      correo: this.correo,
      fecha_nac: this.fecha_nac,
      edad: this.edad,
      ubicacion: {
      pais: this.pais,
      ciudad: this.ciudad
      },

      tratamientos: this.tratamientos,
  }

    localStorage.setItem(usuarioCreado.id.toString(), JSON.stringify(usuarioCreado));

    this.ultimoUsuario.set(usuarioCreado);
    }
  }

// =====================================================
// RETO 1: Condición simple
// =====================================================
// Recibe edad y retorna true si es mayor o igual a 18.
// Retorna false si es menor de 18.

function esMayorDeEdad(edad) {
    if (edad >= 18) {
        return true;
    } else {
        return false;
    }
}


// =====================================================
// RETO 2: Mensaje según condición
// =====================================================
// Recibe edad y retorna un mensaje dependiendo
// de si es mayor o menor de edad.

function mensajeEdad(edad) {
    if (edad >= 18) {
        return 'eres mayor de edad';
    } else {
        return 'eres menor de edad';
    }
}


// =====================================================
// RETO 3: else if para caso exacto
// =====================================================
// Recibe edad y evalúa tres posibilidades:
// >= 19
// === 18
// cualquier otro caso

function mensajeEdadDetallado(edad) {
    if (edad >= 19) {
        return 'eres mayor de edad';
    } else if (edad === 18) {
        return 'Tienes dieciocho años';
    } else {
        return 'eres menor de edad';
    }
}


// =====================================================
// RETO 4: Validar umbral con >=
// =====================================================
// Retorna true si valor es mayor o igual a minimo.
// Retorna false si valor es menor.

function cumpleMinimo(valor, minimo) {
    if (valor >= minimo) {
        return true;
    } else {
        return false;
    }
}


// =====================================================
// FUNCIÓN PARA CREAR USUARIO
// =====================================================

function crearUsuario(
    nombre,
    apellido,
    tipo_identificacion,
    numero_identificacion,
    nacimiento,
    edad,
    celular,
    correo,
    pais,
    ciudad,
    tratamiento_datos,
    valor,
    minimo
) {

    // Ejecutamos los 4 retos
    const resultadoReto1 = esMayorDeEdad(edad);
    const resultadoReto2 = mensajeEdad(edad);
    const resultadoReto3 = mensajeEdadDetallado(edad);
    const resultadoReto4 = cumpleMinimo(valor, minimo);

    const usuarioCreado = {

        id: Date.now(),

        nombreCompleto: `${nombre}, ${apellido}`,

        documento: {
            tipo: tipo_identificacion,
            numero_identificacion: numero_identificacion
        },

        celu: celular,

        correo: correo,

        fecha_nac: nacimiento,

        edad: edad,

        ubicacion: {
            pais: pais,
            ciudad: ciudad
        },

        tratamientos: tratamiento_datos,

        // ==========================================
        // RESULTADOS DE LOS 4 RETOS
        // ==========================================

        resultadosRetos: {

            reto1: {
                funcion: "esMayorDeEdad",
                resultado: resultadoReto1
            },

            reto2: {
                funcion: "mensajeEdad",
                resultado: resultadoReto2
            },

            reto3: {
                funcion: "mensajeEdadDetallado",
                resultado: resultadoReto3
            },

            reto4: {
                funcion: "cumpleMinimo",
                valor: valor,
                minimo: minimo,
                resultado: resultadoReto4
            }

        }

    };

    return usuarioCreado;
}


// =====================================================
// CONEXIÓN CON EL FORMULARIO
// =====================================================

const formulario = document.querySelector('#formulario-registro');

formulario.addEventListener('submit', function(event) {

    // Evita que la página se recargue
    event.preventDefault();


    // ==========================================
    // DATOS DEL USUARIO
    // ==========================================

    const nombre = document.getElementById('nombre').value;

    const apellido = document.getElementById('apellido').value;

    const identificacion =
        document.getElementById('tipo_identificacion').value;

    const numero_identificacion =
        document.getElementById('numero_identificacion').value;

    const nac =
        document.getElementById('nacimiento').value;

    const edad =
        Number(document.getElementById('edad').value);

    const calu =
        document.getElementById('celular').value;

    const correo =
        document.getElementById('correo').value;

    const pais =
        document.getElementById('pais').value;

    const ciudad =
        document.getElementById('ciudad').value;

    // IMPORTANTE:
    // checkbox utiliza .checked
    const datos =
        document.getElementById('tratamiento_datos').checked;


    // ==========================================
    // DATOS DEL RETO 4
    // ==========================================

    const valor =
        Number(document.getElementById('valor').value);

    const minimo =
        Number(document.getElementById('minimo').value);


    // ==========================================
    // CREAR USUARIO Y EJECUTAR LOS RETOS
    // ==========================================

    const CrearUsuario = crearUsuario(
        nombre,
        apellido,
        identificacion,
        numero_identificacion,
        nac,
        edad,
        calu,
        correo,
        pais,
        ciudad,
        datos,
        valor,
        minimo
    );


    // ==========================================
    // MOSTRAR RESULTADOS EN CONSOLA
    // ==========================================

    console.log("Registro creado");
    console.log("Reto 1:", CrearUsuario.resultadosRetos.reto1.resultado);
    console.log("Reto 2:", CrearUsuario.resultadosRetos.reto2.resultado);
    console.log("Reto 3:", CrearUsuario.resultadosRetos.reto3.resultado);
    console.log("Reto 4:", CrearUsuario.resultadosRetos.reto4.resultado);


    // ==========================================
    // CONVERTIR A JSON
    // ==========================================

    const usuarioJSON = JSON.stringify(CrearUsuario);


    // ==========================================
    // GUARDAR EN LOCALSTORAGE
    // ==========================================

    localStorage.setItem(
        CrearUsuario.id,
        usuarioJSON
    );


    console.log("Usuario guardado en LocalStorage");
});

///////////////////////////////////////////////////////////////////////////////////////

const formularioPokemon = document.getElementById('formPokedex');

formularioPokemon.addEventListener('submit',async function(event) {

    event.preventDefault();

    const nombrePokemon = document.getElementById('pokemonInput').value.trim().toLowerCase();
    
    if (!nombrePokemon) return;
try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);

        if (!respuesta.ok){
            throw new Error('¡No encontre nada chamo!');
        }

        
        const datos = await respuesta.json();

        cositasPokemon(datos) 
    } catch(error) {
    
        const contenedor = document.getElementById("ResultadoPokemon");
        contenedor.innerHTML  = 
        `<div>
            <p>${error.message}</p>
        </div>`;

    }
        
});

function cositasPokemon(argumentos) {

    const contenedor = document.getElementById("ResultadoPokemon");
    const nombre = argumentos.name.toUpperCase();
    const imagen = argumentos.sprites.front_default

    contenedor.innerHTML  = 
    `<div>
        <h2>${nombre}</h2>
        <img src = ${imagen} style="with: 200px; height: 200px">
    </div>`;



};
}
