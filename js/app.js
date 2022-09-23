const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const divPaginador = document.querySelector('#paginacion');

const imagenesPorPagina = 40;
let paginasTotales;
let iterador;
let paginaActual = 1;

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario (e) {
    e.preventDefault();

    const busqueda = document.querySelector('#termino').value; // valido datos input.

    if (busqueda === '') {
        mostrarAlerta('¡Tenés que poner algo!');
        return;
    }

    // Request API
    cargarImagenes();
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

function cargarImagenes () {

    const busqueda = document.querySelector('#termino').value; // tomo los datos del input.
    const key = '30105334-44a77fadd938340f332227def';
    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

    fetch(url)
        .then( respuesta => respuesta.json())
        .then( resultado => {
            paginasTotales = calcularPaginas(resultado.totalHits); // calculo la cantidad de paginas
            mostrarImagenes(resultado.hits); // mando únicamente los hits del resultado.
        })
}

// Generador que va ir iterando por cada página en base a cuantas haya en total.
function *crearPaginador (totalPags) {
    for ( let i = 1; i <= totalPags; i++ ) {
        yield i;
    }
}

function calcularPaginas (totalImgs) {
    // redondeo para arriba la cantidad de paginas en base a la cantidad de imagenes x cada una de ellas (40).
    return Math.ceil(totalImgs / imagenesPorPagina);
}

function mostrarImagenes(imagenes) {

    // Limpio HTML de los resultados previos.
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

    // iteración sobre el array y display HTML por c/u.
    imagenes.forEach( imagen => {

        const { likes, views, previewURL, largeImageURL } = imagen;
        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 mb-4 p-3">
                <div class="bg-white">
                    <img class="w-full" src=${previewURL} />
                    <div class="p-4">
                        <p class="card-text"><span class="font-bold">${likes}</span> Likes</p>
                        <p class="card-text"><span class="font-bold">${views}</span> Visualizaciones</p>
        
                        <a href=${largeImageURL} 
                        rel="noopener noreferrer" 
                        target="_blank" class="bg-blue-800 w-full p-1 block mt-5 rounded text-center font-bold uppercase hover:bg-blue-500 text-white">Ver Imagen</a>
                    </div>
                </div>
            </div>
        `;

    })

    // Limpio el HTML del paginador previo.
    while(divPaginador.firstChild) {
        divPaginador.removeChild(divPaginador.firstChild);
    }

    // Muestro el paginador según la búsqueda.
    mostrarPaginador();

}

// Creo el HTML del paginador.
function mostrarPaginador () {
    iterador = crearPaginador(paginasTotales) // creo el generador.

    while (true) {
        const { value, done } = iterador.next(); // desestructuro value y done por cada .next()
        if (done) return; // cuando done sea true, entonces dejo de ejecutar el while.

        // Creo e inserto el HTML por cada yield que tenga el generador.
        const boton = document.createElement('A');
        boton.href = '#';
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'rounded');
        divPaginador.appendChild(boton);

        // Cuando se clickea el boton, carga devuelta el fetch con la page indicada.
        boton.onclick = () => {
            paginaActual = value;
            cargarImagenes();
        }

    }

}