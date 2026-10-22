$(document).ready(function () {

    $(".boton-inscribir").click(function () {
 
      let tarjeta = $(this).closest(".tarjeta-evento");
 
      let nombreEvento = tarjeta.find("h3").text();
 
      alert(
        "Te has inscrito correctamente al evento: " +
        nombreEvento
      );
 
      $(this).text("Inscrito");
 
      $(this).css("background-color", "#28a745");
 
      $(this).prop("disabled", true);
 
    });
 
 
    $("#verCalendario").click(function (evento) {
 
      evento.preventDefault();
 
      $(".lista-eventos").slideToggle();
 
    });
 
  });