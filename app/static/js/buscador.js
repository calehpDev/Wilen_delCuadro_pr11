document.addEventListener("DOMContentLoaded", function () {
  const inputBuscador = document.getElementById("inputBuscador");

  if (inputBuscador) {
    inputBuscador.addEventListener("input", function () {
      const textoBuscado = this.value.toLowerCase().trim();
      const tarjetas = document.querySelectorAll(".tarjeta-producto");

      tarjetas.forEach(tarjeta => {
        const contenido = tarjeta.textContent.toLowerCase();
        if (contenido.includes(textoBuscado)) {
          tarjeta.style.setProperty("display", "flex", "important");
        } else {
          tarjeta.style.setProperty("display", "none", "important");
        }
      });
    });
  }
});

function filtrarPorEtiqueta(categoria, botonClickeado) {
  // Cambiar estilo de botones activos
  const botones = document.querySelectorAll(".btn-filtro");
  botones.forEach(btn => {
    btn.classList.remove("bg-[#164E3A]", "text-white", "dark:bg-[#C89B3C]", "dark:text-[#002B3A]", "active");
    btn.classList.add("bg-white", "dark:bg-[#1a232e]", "text-gray-700", "dark:text-gray-300");
  });

  botonClickeado.classList.remove("bg-white", "dark:bg-[#1a232e]", "text-gray-700", "dark:text-gray-300");
  botonClickeado.classList.add("bg-[#164E3A]", "text-white", "dark:bg-[#C89B3C]", "dark:text-[#002B3A]", "active");

  // Limpiar el campo del buscador de texto
  const inputBuscador = document.getElementById("inputBuscador");
  if (inputBuscador) inputBuscador.value = "";

  const tarjetas = document.querySelectorAll(".tarjeta-producto");

  tarjetas.forEach(tarjeta => {
    const categoriaTarjeta = tarjeta.getAttribute("data-categoria") || "";

    if (categoria === "todos" || categoriaTarjeta.toLowerCase().includes(categoria.toLowerCase())) {
      tarjeta.style.setProperty("display", "flex", "important");
    } else {
      tarjeta.style.setProperty("display", "none", "important");
    }
  });
}