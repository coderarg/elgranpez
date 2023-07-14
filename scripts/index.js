
//DOM
const botonMenu = document.querySelector('#botonMenu');
const toggleMenu = document.querySelector('#toggle-menu');
const cerrarMenu = document.querySelector('#cerrarMenu');


botonMenu.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu.style.left = '0vw';
});

cerrarMenu.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu.style.left = '100vw';
});


