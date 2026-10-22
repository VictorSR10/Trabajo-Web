
const botonBuscar = document.getElementById("botonBuscar");
const botonLimpiar = document.getElementById("botonLimpiar");
const tarjetas = document.querySelectorAll(".tarjeta-oportunidad");
const opcionesCategoria = document.querySelectorAll('input[name="categoria"]');
const opcionesModalidad = document.querySelectorAll('input[name="modalidad"]');
const categorias = document.querySelectorAll(".categoria");
const botonesVer = document.querySelectorAll(".boton-ver");
const mensajeResultados = document.getElementById("mensajeResultados");


function filtrarOportunidades() {
  const texto = document
    .getElementById("textoBusqueda")
    .value.toLowerCase()
    .trim();

  const lugar = document
    .getElementById("lugarBusqueda")
    .value.toLowerCase()
    .trim();

  const areaBusqueda = document.getElementById("areaBusqueda").value;
  const areaFiltro = document.getElementById("filtroArea").value;

  const categoriaSeleccionada = document.querySelector(
    'input[name="categoria"]:checked'
  ).value;

  const modalidadesSeleccionadas = [];

  opcionesModalidad.forEach(function (opcion) {
    if (opcion.checked) {
      modalidadesSeleccionadas.push(opcion.value);
    }
  });

  let cantidadVisible = 0;

  tarjetas.forEach(function (tarjeta) {
    const categoriaTarjeta = tarjeta.dataset.categoria;
    const modalidadTarjeta = tarjeta.dataset.modalidad;
    const areaTarjeta = tarjeta.dataset.area;
    const lugarTarjeta = tarjeta.dataset.lugar;
    const textoTarjeta = tarjeta.textContent.toLowerCase();

    const cumpleTexto = texto === "" || textoTarjeta.includes(texto);
    const cumpleLugar = lugar === "" || lugarTarjeta.includes(lugar);

    const cumpleCategoria =
      categoriaSeleccionada === "todas" ||
      categoriaTarjeta === categoriaSeleccionada;

    const cumpleModalidad =
      modalidadesSeleccionadas.length === 0 ||
      modalidadesSeleccionadas.includes(modalidadTarjeta);

    const cumpleAreaBusqueda =
      areaBusqueda === "todas" || areaTarjeta === areaBusqueda;

    const cumpleAreaFiltro =
      areaFiltro === "todas" || areaTarjeta === areaFiltro;

    if (
      cumpleTexto &&
      cumpleLugar &&
      cumpleCategoria &&
      cumpleModalidad &&
      cumpleAreaBusqueda &&
      cumpleAreaFiltro
    ) {
      tarjeta.classList.remove("oculta");
      cantidadVisible = cantidadVisible + 1;
    } else {
      tarjeta.classList.add("oculta");
    }
  });

  mensajeResultados.textContent =
    "Se encontraron " + cantidadVisible + " oportunidades.";
}


botonBuscar.addEventListener("click", function () {
  filtrarOportunidades();
  document.getElementById("oportunidades").scrollIntoView();
});


opcionesCategoria.forEach(function (opcion) {
  opcion.addEventListener("change", filtrarOportunidades);
});

opcionesModalidad.forEach(function (opcion) {
  opcion.addEventListener("change", filtrarOportunidades);
});

document
  .getElementById("filtroArea")
  .addEventListener("change", filtrarOportunidades);


categorias.forEach(function (botonCategoria) {
  botonCategoria.addEventListener("click", function () {
    const categoriaElegida = botonCategoria.dataset.categoria;

    opcionesCategoria.forEach(function (opcion) {
      if (opcion.value === categoriaElegida) {
        opcion.checked = true;
      }
    });

    filtrarOportunidades();
    document.getElementById("oportunidades").scrollIntoView();
  });
});


botonLimpiar.addEventListener("click", function () {
  document.getElementById("textoBusqueda").value = "";
  document.getElementById("lugarBusqueda").value = "";
  document.getElementById("areaBusqueda").value = "todas";
  document.getElementById("filtroArea").value = "todas";

  opcionesCategoria[0].checked = true;

  opcionesModalidad.forEach(function (opcion) {
    opcion.checked = false;
  });

  filtrarOportunidades();
});


botonesVer.forEach(function (boton) {
  boton.addEventListener("click", function () {
    const tarjeta = boton.closest(".tarjeta-oportunidad");
    const titulo = tarjeta.querySelector("h3").textContent;

    alert("Próximamente podrás ver más información sobre: " + titulo);
  });
});

$(document).ready(function(){
    
  const validUser = "admin";
  const validPass = "1234";

  $("#loginBtn").click(function(){
      const user = $("#username").val().trim();
      const pass = $("#password").val().trim();

      
      if(user === "" || pass === ""){
          $("#message").text("Por favor, complete todos los campos.")
                       .removeClass("success")
                       .addClass("error");
          return;
      }

     
      if(user === validUser && pass === validPass){
          $("#message").text("Inicio de sesión exitoso.")
                       .removeClass("error")
                       .addClass("success");
      } else {
          $("#message").text("Usuario o contraseña incorrectos.")
                       .removeClass("success")
                       .addClass("error");
      }
  });
});


filtrarOportunidades();
