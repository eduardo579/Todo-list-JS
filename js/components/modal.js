import Alert from './alert.js';

export default class Modal {
    constructor() {
        this.titulo = document.getElementById('modal-title');
        this.descripcion = document.getElementById('modal-description');
        this.boton = document.getElementById('modal-btn');
        this.completado = document.getElementById('modal-completed');
        this.alerta = new Alert('modal-alert');
        this.todo = null;
    }

    setValues(todo) {
        this.todo = todo;
        this.titulo.value = todo.titulo;
        this.descripcion.value = todo.descripcion;
        this.completado.checked = todo.completado;
    }

    onClick(callback) {
        this.boton.onclick = () => {
            if (!this.titulo.value || !this.descripcion.value) {
               this.alerta.show('El título y descripción son requeridos.')
               return;
            } 

            $('#modal').modal('toggle');

            callback(this.todo.id, {
                titulo: this.titulo.value,
                descripcion: this.descripcion.value,
                completado: this.completado.checked
            });
        }
    }
}