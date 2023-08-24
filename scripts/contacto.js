const $form = document.querySelector('#contacto-form');

async function handleSubmit(e) {

  e.preventDefault();

  const formData = new FormData($form);

  const response = await fetch('https://formspree.io/f/xzblrajj', {
      method: 'post',
      body: formData,
      headers: {
          'Accept': 'application/json'
      }
  })
  if (response.ok) {
      this.reset();
      mensaje();
  }
}

const mensaje = () => {
  Swal.fire(
      'Gracias por su contacto!',
      'Tus datos se han enviado correctamente'
  )
}


/********************************
          Eventos
********************************/

$form.addEventListener('submit', handleSubmit);

