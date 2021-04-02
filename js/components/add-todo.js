import Alert from './alert.js';

export default class AddTodo {
    constructor() {
        this.btn = document.getElementById('add');
        this.titulo = document.getElementById('title');
        this.descripcion = document.getElementById('description');

        this.alerta = new Alert('alert');
    }

    onclick(callback) {
        this.btn.onclick = () => {
            if (this.titulo.value === '' || this.descripcion.value === '') {
               this.alerta.show('El título y descripción son requeridos.')
            } else {
                this.alerta.hide();
                callback(this.titulo.value, this.descripcion.value);
            }
        }
    }
}