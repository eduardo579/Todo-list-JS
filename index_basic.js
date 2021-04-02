document.addEventListener('DOMContentLoaded', function() {
    const titulo = document.getElementById('title');
    const descripcion = document.getElementById('description');
    const tabla = document.getElementById('table');
    const alerta = document.getElementById('alert');
    const btn = document.getElementById('add');
    let id = 1;

    function removeTodo(id) {
        document.getElementById(id).remove();
    }
    
    function addToDo() {
        if (titulo.value === '' || descripcion.value === '') {
            alerta.classList.remove('d-none');
            alerta.innerText = 'El título y descripción son requeridos.';
            return;
        }

        alerta.classList.add('d-none');
        const fila = tabla.insertRow();
        fila.setAttribute('id', id++);
        fila.innerHTML = `
        <td>${titulo.value}</td>
        <td>${descripcion.value}</td>
        <td class="text-center">
                <input type="checkbox">
              </td>
        <td class="text-right">
            <button class="btn btn-primary mb-1">
                <i class="fa fa-pencil"></i>
            </button>
        </td>
        
        `;
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = function() {
            removeTodo(fila.getAttribute('id'));
        };
        fila.children[3].appendChild(removeBtn);
    }

    btn.onclick = addToDo;
});

