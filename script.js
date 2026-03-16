//======ESTADOS=======//
let notas = [];
let textoBusqueda = "";

//========SELECTORES =======//
const textoNota = document.getElementById("textoNota");
const btnGuardar = document.getElementById("btnGuardar");
const listaNotas = document.getElementById("listaNotas");
const buscadorNotas = document.getElementById("buscadorNotas");
const colorNota = document.getElementById("colorNota");

//========GUARDAR NOTAS CTRL=======//
textoNota.addEventListener("keydown", (event) => {

  if (event.key === "Enter" && event.ctrlKey) {
    btnGuardar.click();
  }

});

//=========GUARDAR NOTAS=======//
function guardarNotas() {
  localStorage.setItem("notas", JSON.stringify(notas));
}

//=======FUNCION RENDERIZAR NOTAS =======//
function renderizarNotas() {
  listaNotas.innerHTML = "";

  let notasFiltradas = notas;

  if (textoBusqueda !== "") {
    notasFiltradas = notas.filter(nota =>
      nota.texto.toLowerCase().includes(textoBusqueda)
    );
  }

  notasFiltradas.forEach((nota) => {
    const div = document.createElement("div");
    div.classList.add("nota");
    div.classList.add(nota.color);

    const texto = document.createElement("p");
    texto.textContent = nota.texto;

    texto.addEventListener("dblclick", () => {
      const nuevoTexto = prompt("Editar nota:", nota.texto);

      if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
        const indiceReal = notas.indexOf(nota);
        notas[indiceReal].texto = nuevoTexto.trim();
        guardarNotas();
        renderizarNotas();
      }
    });

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "🗑";

    btnEliminar.addEventListener("click", () => {
      const indiceReal = notas.indexOf(nota);
      notas.splice(indiceReal, 1);
      guardarNotas();
      renderizarNotas();
    });

    div.appendChild(texto);
    div.appendChild(btnEliminar);
    listaNotas.appendChild(div);
  });
}

btnGuardar.addEventListener("click", () => {
  const texto = textoNota.value.trim();
  const color = colorNota.value;

  if (texto === "") return;

  const nuevaNota = {
    texto: texto,
    color: color
  };

  notas.push(nuevaNota);
  guardarNotas();
  renderizarNotas();

  textoNota.value = "";
});

//====== BUSCADOR DE NOTAS ======//
buscadorNotas.addEventListener("input", () => {
  textoBusqueda = buscadorNotas.value.toLowerCase();
  renderizarNotas();
});

window.addEventListener("DOMContentLoaded", () => {
  const datos = localStorage.getItem("notas");

  if (datos) {
    notas = JSON.parse(datos);
    renderizarNotas();
  }
});