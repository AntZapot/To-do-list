import { cambiarEstado, cargarEdicion, eliminarTarea } from '../funciones.js'
import { listaActividades, template, fragment } from '../selectores.js'

class UI {

    imprimirAlerta(mensaje, tipo){
        //Crear div de alerta
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block');
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else {
            divMensaje.classList.add('alert-success');
        }
        // Contenido del mensaje
        divMensaje.textContent = mensaje;

        // Agregar al DOM
        document.querySelector('.container').insertBefore(divMensaje, formulario);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    pintarTarea({tareas}) {

        if(Object.values(tareas).length === 0) {
            listaActividades.innerHTML = `
            <div class="alert alert-dark text-center">
            No tienes tareas pendientes :3
            </div>
            `;
            return;
        }        


        // Limpiar de elementos previos
        listaActividades.innerHTML = '';


        //Iterar sobre el objeto
        Object.values(tareas).forEach(tarea => {
            const { id } = tarea;
            // Cargar el template
            const clone = template.cloneNode(true);
            clone.querySelector('p').textContent = tarea.texto;

            if(tarea.estado) {
                clone.querySelectorAll('i')[0].classList.replace('fa-check-circle', 'fa-undo');
                clone.querySelector('.alert').classList.replace('alert-secondary', 'alert-primary');
                clone.querySelector('p').style.textDecoration = 'line-through';
            }

            // Asignar variables a los botones
            const btnCheck = clone.querySelectorAll('i')[0];
            const btnEditar = clone.querySelectorAll('i')[1];
            const btnELiminar = clone.querySelectorAll('i')[2];
            fragment.appendChild(clone);

            // Detectar cuando se pulsa un boton
            btnCheck.onclick = () => cambiarEstado(tarea);
            btnELiminar.onclick = () => eliminarTarea(id);
            btnEditar.onclick = () => cargarEdicion(tarea);

        })
        listaActividades.appendChild(fragment);
    }
}

export default UI;