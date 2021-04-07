import { ui, administrarTareas, datosTarea, nuevaTarea } from './funciones.js'
import { input, formulario } from './selectores.js'

// Eventos
input.addEventListener('input', datosTarea);
formulario.addEventListener('submit', nuevaTarea);
document.addEventListener('DOMContentLoaded', ui.pintarTarea(administrarTareas));





