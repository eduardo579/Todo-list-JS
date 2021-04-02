export default class Filters {
    constructor() {
        this.form = document.getElementById('filters');
        this.boton = document.getElementById('search');
    }

    onClick(callback) {
        this.boton.onclick = (e) => {
            e.preventDefault();

            const data = new FormData(this.form);
            callback({
                type: data.get('type'),
                words: data.get('words'),
            })
        }
    }
}