/*******************************************
              DOM y Variables 
*******************************************/
import './toggleMenu.js';
const buscarBotton = document.querySelector('#boton__buscar');
const buscarInput = document.querySelector('#barra__buscar');
const buscarLupa = document.querySelector('.buscar__logo');

const numeroResultados = document.querySelector('#numero-resultados');
const prodRoot = document.querySelector('#prod-root');
let prodArray = [];

const filtrosBTN = document.querySelector('#filtrosBTN')
const filtros = document.querySelector('#filtros');
const categorias = document.querySelectorAll('.selectores__cat');
const togglemenuFiltros = document.querySelector('#togglemenu--filtros');
const headerFiltros = document.querySelector('#header--botonFiltros');
let filtrosOpen = false;

let botonesProductos;
let idElementoSeleccionado;

/*******************************************
              DOM y Variables 
*******************************************/
fetch("../datos/productos.json")
  .then(res => res.json())
  .then(json => {
    prodArray = [...json];
    cargarProductos(prodArray);
  })


/*******************************************
                  Eventos
*******************************************/
buscarBotton.addEventListener('click', (e) => {
  e.preventDefault();
  buscarProductos();
});
buscarLupa.addEventListener('click', (e) => {
  e.preventDefault();
  buscarProductos();
});

buscarInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    buscarProductos();
  }
})

filtrosBTN.addEventListener('click', (e) => {
  e.preventDefault();
  filtrosOpen ? filtros.style.top = '-1000px' : filtros.style.top = '4px';
  filtrosOpen = !filtrosOpen;
});

headerFiltros.addEventListener('click', (e) => {
  e.preventDefault();
  if (filtrosOpen) {
    filtros.style.top = '-1000px';
    filtrosOpen = false;
  } else {
    filtros.style.top = '4px';
    filtrosOpen = true;
  };
});

togglemenuFiltros.addEventListener('click', (e) => {
  e.preventDefault();
  toggleMenu.style.left = '100vw';
  if (filtrosOpen) {
    filtros.style.top = '-1000px';
    filtrosOpen = false;
  } else {
    filtros.style.top = '4px';
    filtrosOpen = true;
  };
});

categorias.forEach((cat) => {
  cat.addEventListener('click', (e) => {
    e.preventDefault();
  });
});
/*******************************************
              Funciones
*******************************************/
const buscarProductos = () => {

  const palabrasInput = [];
  const productosDuplicados = [];

  palabrasInput.push(...buscarInput.value.toLowerCase().split(' '));

  palabrasInput.forEach(palabra => {
    prodArray.forEach(producto => {
      if (producto.titulo.toLowerCase().includes(palabra)) {
        productosDuplicados.push(producto);
      }
    })
  })

  const productosSinDuplicar = productosDuplicados.reduce((sum, prod) => {
    if (!sum.find(item => item.titulo === prod.titulo)) sum.push(prod);
    return sum;
  }, [])

  cargarProductos(productosSinDuplicar)
  if (prodArray.length == productosDuplicados.length) {
    document.querySelector('#filtro-resultado').innerText = "todos los productos";
  } else {
    document.querySelector('#filtro-resultado').innerText = "resultado de búsqueda";
  }

}

const cargarProductos = (prods) => {
  prodRoot.innerHTML = '';

  numeroResultados.textContent = activeProds(prods).toString();

  prods.forEach((element) => {


    if (element.activo === 1) {

      const div = document.createElement('div');
      div.classList.add('producto')

      div.innerHTML = `
      <div class="producto__img-container" id="${element.codigo_producto}">
        <img src="./recursos/productos/${element.img1}" alt="${element.titulo}" class="producto__img">
      </div>
      <h3 class="producto__titulo">${element.titulo}</h3>
      <div class="producto__boton">
        <p class="producto__boton--precio"><span id="prod__precio">${numToPrice(element.precio)}</span></p>
      </div>
      `;

      prodRoot.append(div);
    }

  })

  cargarBotonesProductos()
}

const activeProds = (list) => {
  const active = list.filter(e => e.activo === 1)
  return active.length;
}

const numToPrice = (num) => {
  const f = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  })
  return (f.format(num))
}

const cargarBotonesProductos = () => {
  botonesProductos = document.querySelectorAll('.producto__img-container');

  botonesProductos.forEach((element) => {
    element.addEventListener('click', (e) => {
      idElementoSeleccionado = (e.target.tagName === "IMG") ? e.target.parentNode.id : e.target.id;
      cargarProductoIndividual();
    })
  })
}

const cargarProductoIndividual = () => {
  const productoACargar = prodArray.find((prod) => prod.codigo_producto === idElementoSeleccionado);

const nuevaPagina = window.open();

  nuevaPagina.document.write(`
  <style type="text/css">
    .productoI {
      width: 100%;
      margin-bottom: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .productoI__titulo {
      width: 100%;
      margin: 40px 0px;
      font-size: 40px;
      font-weight: 300;
      text-align: center;
      color: var(--negro-1);
    }
    .productoI__container {
      width: 80%;
      max-width: 1240px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 60px;
    }
    .productoI__miniaturas {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 60px;
    }
    .productoI__miniaturas--img {
      width: 200px;
      border-radius: 10px;
    }
    .productoI__ampliado {
      width: 720px;
    }
    .productoI__ampliado--img {
      width: 720px;
      border-radius: 10px;
    }
    .productoI__descripcion {
      font-size: 20px;
      color: var(--negro-1);
      margin-top: 60px;
      text-align: justify;
    }
    .productoI__botones {
      width: 80%;
      max-width: 1040px;
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .productoI__precio, .productoI__whatsapp {
      width: 460px;
      height: 80px;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40px;
      font-weight: 700;
    }
    .productoI__precio {
      border: 4px solid var(--naranja-1);
      color: var(--naranja-1);
    }
    .productoI__whatsapp {
      border: 4px solid var(--verde-wp);
      color: var(--verde-wp);
    }
    .productoI__whatsapp--img {
      height: 50px;
      margin-left: 20px;
    }

    @charset "UTF-8";
    /* ---------------------------------- 
      genéricos para todas las páginas
    ---------------------------------- */
    * {
      margin: 0;
      padding: 0;
      font-family: Oswald-Regular;
    }

    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    main {
      flex-grow: 1;
    }

    a {
      text-decoration: none;
    }

    @font-face {
      font-family: Oswald-Regular;
      src: url(../recursos/tipografia/static/Oswald-Regular.ttf);
    }
    :root {
      --naranja-1: #FF5C00;
      --azul-1: #00478F;
      --azul-2: #006EFF;
      --verde-wp: #25D366;
      --negro-1: #272727;
    }

    main {
      margin-top: 140px;
    }

    header {
      width: 100%;
      height: 150px;
      background-color: white;
      z-index: 5;
      position: fixed;
      display: flex;
      flex-flow: column;
      align-items: center;
    }

    .header {
      width: 80%;
      max-width: 1040px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: auto auto;
    }
    .header__filtros {
      display: none;
    }
    .header__filtros--img {
      width: 100%;
    }
    .header__logo {
      height: 80px;
    }
    .header__logo--img {
      height: 100%;
    }
    .header__menu {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 50px;
    }
    .header__nav {
      display: flex;
      gap: 60px;
    }
    .header__items {
      font-size: 30px;
      font-weight: 400;
      background: linear-gradient(50deg, #4EA6FF 15%, #00478F 110%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
    .header__items:hover {
      -webkit-text-fill-color: #2391ff;
      transition: 1s;
    }
    .header__icons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
    }
    .header__icons--img {
      height: 40px;
    }
    .header__titulo {
      font-size: 50px;
      font-weight: 400;
      text-align: center;
      background: linear-gradient(50deg, #4EA6FF 15%, #00478F 110%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
    .header__botonmenu {
      display: none;
    }
    .header__botonmenu--img {
      width: 100%;
    }

    footer {
      background-color: var(--negro-1);
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column;
    }

    .footer {
      width: 80%;
      max-width: 1040px;
      margin: 50px auto 30px auto;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .footer__logo {
      height: 80px;
    }
    .footer__container {
      color: white;
    }
    .footer__titulo {
      margin: 10px 0px;
      display: flex;
      align-items: center;
    }
    .footer__descripcion {
      font-family: Oswald-Regular;
      font-size: 30px;
      font-weight: 300;
    }
    .footer__icono {
      height: 40px;
      margin-right: 10px;
    }
    .footer__info {
      margin-left: 10px;
      text-align: left;
      font-size: 20px;
      font-weight: 100;
    }
    .footer__rrss--icono {
      margin: 10px;
      height: 45px;
    }
    .footer__creacion {
      margin: 30px auto;
      color: white;
      font-size: 25px;
      font-weight: 200;
    }

    /* -------------------------------
                ToggleMenu
    ---------------------------------*/
    .togglemenu {
      width: 100%;
      height: 100dvh;
      background-color: white;
      position: fixed;
      z-index: 30;
      top: 0px;
      left: 100%;
      transition: 0.5s;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
    .togglemenu__header {
      width: 80%;
      height: 100px;
      max-width: 1040px;
      margin: 10px auto 10px auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .togglemenu__logo {
      height: 80px;
    }
    .togglemenu__hamburguesa, .togglemenu__cerrar {
      width: 30px;
    }
    .togglemenu__hamburguesa--img, .togglemenu__cerrar--img {
      width: 100%;
    }
    .togglemenu__menu {
      width: 80%;
      height: 100vh;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
    }
    .togglemenu__nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
    }
    .togglemenu__items {
      font-size: 40px;
      text-align: center;
      margin: 40px auto;
      background: linear-gradient(50deg, #4EA6FF 15%, #00478F 110%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
    .togglemenu__items:hover {
      -webkit-text-fill-color: #2391ff;
      transition: 1s;
    }
    .togglemenu__icons {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin: 10px auto;
    }
    .togglemenu__icons--img {
      height: 50px;
    }

    /* ------------------------------- 
                Media Queries
    ------------------------------ */
    @media screen and (max-width: 1240px) {
      /**************************/
      main {
        margin-top: 100px;
      }
      header {
        height: auto;
        margin-top: 0px;
      }
      .header {
        height: 80px;
        width: 100%;
        margin: 10px auto;
        padding: 0px 10%;
        box-sizing: border-box;
        justify-content: space-between;
      }
      .header__logo {
        height: 80px;
      }
      .header__filtros, .header__botonmenu {
        display: block;
        width: 4%;
        min-width: 35px;
      }
      .header__filtros--img, .header__botonmenu--img {
        width: 100%;
      }
      .header__menu {
        display: none;
      }
      .header__titulo {
        font-size: 2.5rem;
      }
      .togglemenu__header {
        height: 80px;
      }
      .togglemenu__logo {
        height: 80px;
      }
      .togglemenu__botones {
        width: 4%;
        min-width: 35px;
      }
      .togglemenu__botones img {
        width: 100%;
      }
      .productoI__container {
        gap: 5%;
      }
      .productoI__miniaturas {
        width: 20%;
        gap: 40px;
      }
      .productoI__miniaturas--img {
        width: 100%;
      }
      .productoI__ampliado {
        width: 70%;
      }
      .productoI__ampliado--img {
        width: 100%;
      }
      .productoI__botones {
        margin: 60px auto;
        justify-content: center;
        gap: 5%;
      }
      .productoI__precio, .productoI__whatsapp {
        width: 45%;
        height: 70px;
        border-radius: 15px;
      }
      .productoI__precio p, .productoI__whatsapp p {
        font-size: 30px;
      }
    }
    @media screen and (max-width: 820px) {
      header {
        height: auto;
      }
      .header {
        height: auto;
      }
      .header__titulo {
        font-size: 2rem;
      }
      .footer {
        margin: 15px auto;
      }
      .footer__descripcion {
        font-size: 20px;
      }
      .footer__icono {
        height: 20px;
      }
      .footer__info {
        font-size: 12px;
      }
      .footer__creacion {
        font-size: 16px;
        margin: 15px auto;
      }
      /*****Producto Individual******/
      .productoI__titulo {
        margin: 30px auto 0px auto;
        font-size: 25px;
      }
      .productoI__container {
        width: 80%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .productoI__miniaturas {
        width: 100%;
        justify-content: space-between;
        flex-direction: row;
        gap: normal;
        margin: 4%;
      }
      .productoI__miniaturas--img {
        width: 22%;
      }
      .productoI__ampliado {
        width: 100%;
      }
      .productoI__ampliado--img {
        width: 100%;
      }
      .productoI__descripcion {
        font-size: 20px;
        margin-top: 30px;
      }
      .productoI__botones {
        width: 80%;
        margin-top: 40px;
      }
      .productoI__precio, .productoI__whatsapp {
        border: 4px solid black;
        height: 50px;
      }
      .productoI__precio p, .productoI__whatsapp p {
        font-size: 20px;
        font-weight: 700;
      }
      .productoI__precio {
        border: 3px solid var(--naranja-1);
        color: var(--naranja-1);
      }
      .productoI__whatsapp {
        border: 3px solid var(--verde-wp);
        color: var(--verde-wp);
      }
      .productoI__whatsapp--img {
        height: 40px;
        margin-left: 10px;
      }
    }
    @media screen and (max-width: 650px) {
      main {
        margin-top: 100px;
      }
      header {
        height: auto;
      }
      .header__titulo {
        font-size: 1.5rem;
        text-align: center;
        width: 80%;
        margin: auto;
      }
      .header__logo {
        height: 70px;
      }
      
      .footer {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(4, 1fr);
        grid-template-areas: "logo rrss" "container1 container1" "container2 container2" "container3 container3";
        justify-items: center;
        align-items: center;
      }
      .footer__logo {
        grid-area: logo;
      }
      .footer__rrss {
        grid-area: rrss;
      }
      .container1 {
        grid-area: container1;
      }
      .container2 {
        grid-area: container2;
      }
      .container3 {
        grid-area: container3;
      }
      .productoI {
        margin-bottom: 10px;
      }
      .productoI__titulo {
        margin: 10px auto 0px auto;
        font-size: 18px;
      }
      .productoI__descripcion {
        font-size: 16px;
        margin-top: 10px;
      }
      .productoI__botones {
        margin: 20px auto 40px auto;
        flex-direction: column;
        gap: 10px;
      }
      .productoI__precio, .productoI__whatsapp {
        width: 100%;
        height: 50px;
      }
      .productoI__precio p, .productoI__whatsapp p {
        font-weight: 700;
      }
    }
    @media screen and (max-width: 375px) {
      .header__titulo {
        margin: auto 20px;
      }
    }
  </style>
  <header>
    <section class="header">
      <div id="header--botonFiltros" class="header__filtros">
        <img class="header__filtros--img" src="../recursos/nav_menu/filtros-logo.png" alt="">
      </div>

      <div class="header__logo">
        <img class="header__logo--img" src="../recursos/egp-logo/el-gran-pez_logo.png" alt="logo el gran pez">
      </div>
      <div class="header__menu">
        <div class="header__nav">
          <a class="header__items" href="../index.html">Inicio</a>
          <a class="header__items" href="./contacto.html">Contacto</a>
          <a class="header__items" href="./preguntas-frecuentes.html">Preguntas Frecuentes</a>
        </div>
        <div class="header__icons">
          <a href="https://instagram.com/elgranpezimport?igshid=MzRlODBiNWFlZA==" class="header__icons--links">
            <img src="../recursos/nav_menu/instagram-logo.png" alt="logo instagram" class="header__icons--img"></a>
          <a href="https://www.facebook.com/elgranpezimport?mibextid=ZbWKwL" class="header__icons--links">
            <img src="../recursos/nav_menu/facebook-logo.png" alt="logo facebook" class="header__icons--img">
          </a>
        </div>
      </div>
      <div id="botonMenu" class="header__botonmenu">
        <img class="header__botonmenu--img" src="../recursos/nav_menu/nav__menu.png" alt="botón menu">
      </div>
    </section>
  </header>

  <div id="toggle-menu" class="togglemenu">
    <div class="togglemenu__header">
      <div id="togglemenu--filtros" class="togglemenu__botones">
        <img class="togglemenu__hamburguesa" src="../recursos/nav_menu/filtros-logo.png" alt="filter icon">
      </div>
      <img class="togglemenu__logo" src="../recursos/egp-logo/el-gran-pez_isologo.png" alt="logo el gran pez">
      <div id="cerrarMenu" class="togglemenu__botones">
        <img class="togglemenu__cerrar" src="../recursos/nav_menu/close_menu.png" alt="cerrar menu">
      </div>
    </div>
    <div class="togglemenu__menu">
      <div class="togglemenu__nav">
        <a class="togglemenu__items" href="../index.html">Inicio</a>
        <a class="togglemenu__items" href="./contacto.html">Contacto</a>
        <a class="togglemenu__items" href="./preguntas-frecuentes.html">Preguntas Frecuentes</a>
      </div>
      <div class="togglemenu__icons">
        <a href="https://instagram.com/elgranpezimport?igshid=MzRlODBiNWFlZA==" class="togglemenu__icons--links">
          <img src="../recursos/nav_menu/instagram-logo.png" alt="logo instagram" class="togglemenu__icons--img"></a>
        <a href="https://www.facebook.com/elgranpezimport?mibextid=ZbWKwL" class="togglemenu__icons--links">
          <img src="../recursos/nav_menu/facebook-logo.png" alt="logo facebook" class="togglemenu__icons--img">
        </a>
      </div>
    </div>
  </div>

  <main>
    <section class="productoI">
      <h1 class="productoI__titulo">${productoACargar.titulo}</h1>
      <div class="productoI__container">
        <div class="productoI__miniaturas">
          <img src="../recursos/productos/bz-1.png" alt="taza-cafe1" class="productoI__miniaturas--img">
          <img src="../recursos/productos/bz-2.png" alt="taza-cafe1" class="productoI__miniaturas--img">
          <img src="../recursos/productos/bz-3.png" alt="taza-cafe1" class="productoI__miniaturas--img">
          <img src="../recursos/productos/bz-4.png" alt="taza-cafe1" class="productoI__miniaturas--img">
        </div>
        <div class="productoI__ampliado">
          <img class="productoI__ampliado--img" src="../recursos/productos/bz-1.png" alt="taza-cafe1">
          <p class="productoI__descripcion">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur sequi
            provident adipisci! Sit, nisi excepturi minus, error expedita ad illo nemo nobis sequi perferendis dolor
            repellendus? Voluptate qui iste earum.
            Pariatur eaque amet qui, architecto soluta numquam consectetur voluptates perferendis necessitatibus
            corporis quos quaerat eligendi, debitis velit ratione quas. Error temporibus deleniti quisquam ducimus
            sequi, nostrum laboriosam impedit modi. Possimus?
            Ipsam, nesciunt? Nulla fugiat officia nostrum. Laboriosam consectetur similique quasi sapiente consequatur
            voluptatum deleniti debitis impedit, ea perspiciatis, tempore nobis hic excepturi odio aperiam mollitia
            delectus aspernatur modi natus quidem.</p>
        </div>
      </div>
      <div class="productoI__botones">
        <div class="productoI__precio">
          $ <span id="prodI_precio">1000</span>
        </div>
        <div class="productoI__whatsapp">
          <p>CONSULTA WHATSAPP</p>
          <img class="productoI__whatsapp--img" src="../recursos/nav_menu/whatsapp-logo.png" alt="">
        </div>
      </div>
    </section>
  </main>
  <footer>
    <section class="footer">
      <img class="footer__logo" src="../recursos/egp-logo/el-gran-pez_logo.png" alt="logo el gran pez">

      <a class="footer__container container1" href="https://goo.gl/maps/3g4UuWyEtb4XwNiA6" target="_blank">
        <div class="footer__titulo">
          <img src="../recursos/nav_menu/location-logo-white.png" alt="icono ubicacion" class="footer__icono">
          <h4 class="footer__descripcion">Ubicación</h4>
        </div>
        <p class="footer__info">Lavalle 2133, CABA</p>
      </a>
      <a class="footer__container container2" href="https://wa.me/5491123980862" target="_blank">
        <div class="footer__titulo">
          <img src="../recursos/nav_menu/whatsapp-logo-blanco.png" alt="icono whatsapp" class="footer__icono">
          <h4 class="footer__descripcion">Whats App</h4>
        </div>
        <p class="footer__info">+ 54 9 11 2398-0862</p>
      </a>
      <a class="footer__container container3" href="./preguntas-frecuentes.html">
        <div class="footer__titulo">
          <img src="../recursos/nav_menu/signo-preguntas.png" alt="icono signo interrogacion" class="footer__icono">
          <h4 class="footer__descripcion">Preguntas</h4>
        </div>
        <p class="footer__info">Preguntas Frecuentes</p>
      </a>
      <div class="footer__rrss">
        <a href="https://instagram.com/elgranpezimport?igshid=MzRlODBiNWFlZA==" class="footer__rrss--link">
          <img src="../recursos/nav_menu/instagram-logo-white.png" alt="instagram logo" class="footer__rrss--icono">
        </a>
        <a href="https://www.facebook.com/elgranpezimport?mibextid=ZbWKwL" class="footer__rrss--link">
          <img src="../recursos/nav_menu/facebook-logo-white.png" alt="facebook logo" class="footer__rrss--icono">
        </a>
      </div>
    </section>
    <a href="https://github.com/coderarg" class="footer__creacion">Sitio web creado por Lucas García</a>
  </footer>
  <script src="../scripts/toggleMenu.js"></script>
  `)
};



// Encontrar los productos y guardarlos en una variable
// Identificar cada producto cuando es clickeado
// Buscar el producto en la base de datos
// Abrir una nueva pestaña de navegador
// Cargar en esa nueva pestaña el contenido del producto
// Eliminar el id donde se renderiza el producto para no modificarlo cuando se clickea otro producto