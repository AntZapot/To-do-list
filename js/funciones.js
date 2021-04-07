import Tareas from './clases/Tareas.js'
import UI from './clases/UI.js'

import { input, formulario} from './selectores.js'
export const ui = new UI;
export const administrarTareas = new Tareas;

let editando = false;
let tareaObj = {
    texto: ''
}

export function datosTarea(e) {
    tareaObj[e.target.name] = e.target.value;
}

export function nuevaTarea(e) {
    e.preventDefault();

    const { texto } = tareaObj;
    // Validar formulario
    if(texto.trim() === '') {
        ui.imprimirAlerta('Formulario vacio', 'error');
        return;
    }

    if (editando) {
        ui.imprimirAlerta('Editado correctamente');
        formulario.querySelector('button[type="submit"]').textContent = 'Crear tarea';
        // Quitar modo edicion
        editando = false;

        // Pasar los cambios al objeto
        administrarTareas.actualizarEstado({...tareaObj});
    } else {
        // Agregar un id
        tareaObj.id = Date.now();

        // Agregar estado
        tareaObj.estado = false;
        
        // Crear la tarea
        administrarTareas.agregarTarea({...tareaObj}); 

        // Mensaje de exito
        ui.imprimirAlerta('Se agregó correctamente');
    }

    // Reiniciar el objeto y formulario
    reiniciarObj();
    formulario.reset();
    input.focus();

    ui.pintarTarea(administrarTareas);
}

export function reiniciarObj() {
    tareaObj = {
        texto: ''
    }
}

export function eliminarTarea(id) {
    // Eliminar tarea 
    administrarTareas.eliminarTarea(id);
    // Imprimir mensaje de exito
    ui.imprimirAlerta('La tarea se eliminó correctamente');
    // Imprimir las tareas actualizadas
    ui.pintarTarea(administrarTareas);
}

export function cargarEdicion(tarea) {
    const { texto, id, estado } = tarea;

    // Pasar los valores al input
    input.value = texto;

    // Pasar los valores al objeto
    tareaObj.texto = texto;
    tareaObj.id = id;
    tareaObj.estado = estado;

    // Cambiar texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

    editando = true;

}

// Cambiar el estado de la tarea
export function cambiarEstado(tarea) {
    if(tarea.estado) {
        tarea.estado = false;
    }else {
        ui.imprimirAlerta('Has completado una actividad ¡Felicidades!');
        tarea.estado = true;
    }
    administrarTareas.actualizarEstado({...tarea});

    ui.pintarTarea(administrarTareas);
}