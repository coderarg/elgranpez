
//DOM
const filtrosBTN = document.querySelector('#filtrosBTN')
const filtros = document.querySelector('#filtros');
const categorias = document.querySelectorAll('.selectores__cat');

const botonMenu = document.querySelector('#botonMenu');
const toggleMenu = document.querySelector('#toggle-menu');
const cerrarMenu = document.querySelector('#cerrarMenu');
const togglemenuFiltros = document.querySelector('#togglemenu--filtros');
const headerFiltros = document.querySelector('#header--botonFiltros');
let filtrosOpen = false;

filtrosBTN.addEventListener('click', (e) => {
    e.preventDefault();
    if(filtrosOpen) {
        filtros.style.top = '-1000px';
        filtrosOpen = false;
    }else{
        filtros.style.top = '4px';
        filtrosOpen = true;
    };
});

headerFiltros.addEventListener('click', (e) => {
    e.preventDefault();
    if(filtrosOpen) {
        filtros.style.top = '-1000px';
        filtrosOpen = false;
    }else{
        filtros.style.top = '4px';
        filtrosOpen = true;
    };
});

togglemenuFiltros.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu.style.left = '100vw';
    if(filtrosOpen) {
        filtros.style.top = '-1000px';
        filtrosOpen = false;
    }else{
        filtros.style.top = '4px';
        filtrosOpen = true;
    };

});

categorias.forEach((cat) => {
    cat.addEventListener('click', (e) => {
        e.preventDefault();
    });
});


botonMenu.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu.style.left = '0vw';
});

cerrarMenu.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu.style.left = '100vw';
});


