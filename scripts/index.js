
//DOM
const filtrosBTN = document.querySelector('#filtrosBTN')
const filtros = document.querySelector('#filtros');

const categorias = document.querySelectorAll('.selectores__cat')
let filtrosOpen = false;

filtrosBTN.addEventListener('click', (e) => {
    e.preventDefault();

    if(filtrosOpen) {
        filtros.style.top = '-1000px';
        filtrosOpen = false;
    }else{
        filtros.style.top = '4px';
        filtrosOpen = true;
    }
});

categorias.forEach((cat) => {
    cat.addEventListener('click', (e) => {
        e.preventDefault();
    })
})