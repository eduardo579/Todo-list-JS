export default class Alert {
    constructor(alertId) {
        this.alerta = document.getElementById(alertId);
    }

    show(message) {
        this.alerta.classList.remove('d-none');
        this.alerta.innerText = message;
    }

    hide() {
        this.alerta.classList.add('d-none');
    }
}