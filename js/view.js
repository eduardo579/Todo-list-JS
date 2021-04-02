import AddTodo from './components/add-todo.js';
import Modal from './components/modal.js';
import Filters from './components/filters.js';

export default class View {
    constructor() {
        this.model = null;
        this.tabla = document.getElementById('table');
        this.addTodoForm = new AddTodo();
        this.modal = new Modal();
        this.filtros = new Filters();
        
        this.addTodoForm.onclick((titulo, descripcion) => this.addTodo(titulo, descripcion));
        this.modal.onClick((id, values) => this.editTodo(id, values));
        this.filtros.onClick((filtros) => this.filter(filtros));
    }

    setModel(model) {
        this.model = model;
    }

    render() {
        const todos = this.model.getTodos();

        todos.forEach((todo) => this.createRow(todo));
    }

    filter(filtros) {
        const { type, words } = filtros;

        // Coger todos los elementos (filas) menos la primera, con la coma
        const [, ...rows] = this.tabla.getElementsByTagName('tr');

        for (const row of rows) {
            const [titulo, descripcion, completado] = row.children;
            let toHide = false;

            if (words) {
                toHide = !titulo.innerText.includes(words) && !descripcion.innerText.includes(words);
            }

            const toBeCompleted = type === 'completed';
            const isCompleted = completado.children[0].checked;

            if (type !== 'all' && toBeCompleted !== isCompleted) {
                toHide = true;
            }

            if (toHide) {
                row.classList.add('d-none');
            } else {
                row.classList.remove('d-none');
            }

        }
    }

    addTodo(titulo, descripcion) {
        const todo = this.model.addTodo(titulo, descripcion);
        this.createRow(todo);
    }

    toggleCompleted(id) {
        this.model.toggleCompleted(id);
    }

    editTodo(id, values) {
        this.model.editTodo(id, values);
        const fila = document.getElementById(id);
        fila.children[0].innerText = values.titulo;
        fila.children[1].innerText = values.descripcion;
        fila.children[2].children[0].checked = values.completado;
    }

    removeTodo(id) {
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }

    createRow(todo) {
        const fila = this.tabla.insertRow();
        fila.setAttribute('id', todo.id);
        fila.innerHTML = `
        <td>${todo.titulo}</td>
        <td>${todo.descripcion}</td>
        <td class="text-center">
               
        </td>
        <td class="text-right">
            
        </td>
        
        `;

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = todo.completado;
        checkBox.onclick = () => this.toggleCompleted(todo.id);
        fila.children[2].appendChild(checkBox);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1');
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target', '#modal');
        editBtn.onclick = () => this.modal.setValues({
            id: todo.id,
            titulo: fila.children[0].innerText,
            descripcion: fila.children[1].innerText,
            completado: fila.children[2].children[0].checked
        });
        fila.children[3].appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeTodo(todo.id);
        fila.children[3].appendChild(removeBtn);
    }
}