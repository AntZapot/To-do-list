class Tareas{
    constructor() {
        this.tareas = [];
    }

    agregarTarea(tarea) {
        this.tareas = [...this.tareas, tarea];
    }

    eliminarTarea(id) {
        this.tareas = this.tareas.filter( tarea => tarea.id !== id );
    }

    actualizarEstado(tareaActualizada) {
        this.tareas = this.tareas.map( tarea => tarea.id === tareaActualizada.id ? tareaActualizada : tarea);
    }
}

export default Tareas;