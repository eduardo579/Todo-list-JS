export default class Model {
    constructor() {
        this.view = null;
        this.todos = JSON.parse(localStorage.getItem('todos'));
        if (!this.todos || this.todos.length < 1) {
            this.todos = [
                {
                    id: 0,
                    titulo: 'Aprendiendo JS',
                    descripcion: 'Viendo tutoriales JS',
                    completado: false,
                }
            ]
            this.currentId = 1;
        } else {
            this.currentId = this.todos[this.todos.length - 1].id + 1;
        }
    }

    setView(view) {
        this.view = view;
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    getTodos() {
        // Referencia de 'todo'
        return this.todos.map((todo) => ({...todo}));
    }
    
    findTodo(id) {
        return this.todos.findIndex((todo) => todo.id === id);
    }

    toggleCompleted(id) {
        const index = this.findTodo(id);
        const todo = this.todos[index];
        todo.completado = !todo.completado;
        this.save();
    }

    editTodo(id, values) {
        const indice = this.findTodo(id);
        Object.assign(this.todos[indice], values);
        this.save();
    }

    addTodo(titulo, descripcion) {
        const todo = {
            id: this.currentId++,
            titulo, 
            descripcion,
            completado: false
        }

        this.todos.push(todo);

        this.save();

        return {...todo};
    }

    removeTodo(id) {
        const index = this.todos.findIndex((todo) => todo.id === id);
        this.todos.splice(index, 1);
        this.save();
    }
}