// Selectores
// Evento submit y validación
// Alerta reutilizable con timeout, y validar que no exista una.

const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario (e) {
    e.preventDefault();

    const busqueda = document.querySelector('#termino').value;

    if (busqueda === '') {
        mostrarAlerta('Tienes que poner algo');
        return;
    }

    // Request API

}

function mostrarAlerta (msj) {

    const alertaExiste = document.querySelector('p.bg-red-100');

    if (!alertaExiste) {
        const alerta = document.createElement('P');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');
    
        alerta.innerHTML = `
        <strong class="font-bold">ERROR</strong>
        <span class="block">${msj}</span>
        `;
    
        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3500);
    }

}