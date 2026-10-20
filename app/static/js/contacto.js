document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const responseDiv = document.getElementById('form-response');

  if (!contactForm) return;

  const avisar = (tipo, mensaje) => {
    if (typeof window.cowToast === 'function') {
      window.cowToast(tipo, mensaje);
    } else {
      alert(mensaje || 'Revisa los datos del formulario.');
    }
  };

  // El campo de teléfono solo acepta números (se registra una sola vez)
  const inputTelefono = document.getElementById('telefono');
  if (inputTelefono) {
    inputTelefono.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    limpiarErrores();

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    let esValido = true;

    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
    if (!regexNombre.test(nombre)) {
      mostrarError('nombre', 'El nombre solo debe contener letras y al menos 3 caracteres.');
      esValido = false;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      mostrarError('correo', 'Ingresa un correo electrónico válido (ejemplo@dominio.com).');
      esValido = false;
    }

    const telefonoLimpio = telefono.replace(/[\s-]/g, '');
    const regexEstructuraPeru = /^9[1-9]\d{7}$/;
    const esNumeroRepetido = /^(\d)\1{8}$/.test(telefonoLimpio);
    const secuenciasInvalidas = ['912345678', '987654321', '900000000'];
    const esSecuenciaInvalida = secuenciasInvalidas.includes(telefonoLimpio);
    const tieneDemasiadosCeros = (telefonoLimpio.match(/0/g) || []).length >= 4;

    if (!regexEstructuraPeru.test(telefonoLimpio) || esNumeroRepetido || esSecuenciaInvalida || tieneDemasiadosCeros) {
      mostrarError('telefono', 'Ingresa un número de celular peruano válido (9 dígitos, empieza con 9).');
      esValido = false;
    }

    if (mensaje.length < 10) {
      mostrarError('mensaje', 'El mensaje debe tener al menos 10 caracteres.');
      esValido = false;
    } else if (mensaje.length > 500) {
      mostrarError('mensaje', 'El mensaje no puede superar los 500 caracteres.');
      esValido = false;
    }

    if (esValido) {
      const producto = document.getElementById('producto').value;
      const comprador = document.getElementById('comprador').value;

      const data = {
        nombre,
        correo,
        telefono: telefonoLimpio,
        producto,
        comprador,
        mensaje
      };

      try {
        const response = await fetch('/contacto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok && result.status === 'success') {
          avisar('success');      // vaquita feliz, mensaje al azar
          contactForm.reset();
        } else {
          avisar('error', result.message || 'Error al guardar los datos.');
        }
      } catch (error) {
        console.error('Error de conexión:', error);
        avisar('error', 'El establo está cerrado por un momento. Inténtalo de nuevo en unos minutos.');
      }
    } else {
      avisar('error');            // vaquita triste, mensaje al azar
    }
  });

  function mostrarError(elementId, mensaje) {
    const campo = document.getElementById(elementId);
    campo.classList.add('border-red-500', 'focus:ring-red-500');

    const errorText = document.createElement('p');
    errorText.className = 'error-msg mt-1 text-xs font-medium text-red-500 dark:text-red-400';
    errorText.innerText = mensaje;

    campo.parentNode.appendChild(errorText);
  }

  function limpiarErrores() {
    document.querySelectorAll('.error-msg').forEach((el) => el.remove());
    document.querySelectorAll('#contact-form input, #contact-form textarea').forEach((campo) => {
      campo.classList.remove('border-red-500', 'focus:ring-red-500');
    });
    if (responseDiv) {
      responseDiv.classList.add('hidden');
    }
  }
});