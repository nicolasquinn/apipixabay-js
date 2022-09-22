const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario (e) {
    e.preventDefault();

    const busqueda = document.querySelector('#termino').value; // valido datos input.

    if (busqueda === '') {
        mostrarAlerta('Tienes que poner algo');
        return;
    }

    // Request API
    cargarImagenes(busqueda);
}

function mostrarAlerta (msj) {

    const alertaExiste = document.querySelector('p.bg-red-100'); // reviso si hay una alerta ya.

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

function cargarImagenes (busqueda) {
    const key = '30105334-44a77fadd938340f332227def';
    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}`;

    fetch(url)
        .then( respuesta => respuesta.json())
        .then( resultado => mostrarImagenes(resultado)); // mando el resultado entero.
}

function mostrarImagenes(imagenes) {
    console.log(imagenes.hits);
}