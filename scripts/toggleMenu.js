//DOM y Variables
const botonMenu = document.querySelector('#botonMenu');
const toggleMenu = document.querySelector('#toggle-menu');
const cerrarMenu = document.querySelector('#cerrarMenu');

//Eventos
botonMenu.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu.style.left = '0dvw';
});

cerrarMenu.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu.style.left = '100dvw';
});