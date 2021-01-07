$("#formulario").on("submit", function (event) {
  event.preventDefault();

  var data = $('#nickname1').val();
 
  $.ajax({
    type: "POST",
    url: "/registro",
    data: {
      nickname: $('#nickname1').val(),
      correo: $('#email1').val() ,
      contra : $('#pass1').val(),
      c_contra : $('#pass2').val(),
    },
    success: function (response) {
      if (response === "1") {
          $('#reg_succ').show().delay(7000).fadeOut(1000);
          $('#nickname1').val("");
      $('#email1').val("");
      $('#pass1').val("");
       $('#pass2').val("");
      }
      if (response === "2") {
        $('#reg_err2').show().delay(7000).fadeOut(1000);
    }
    if (response === "3") {
      $('#reg_err3').show().delay(7000).fadeOut(1000);
  }
  if (response === "4") {
    $('#reg_err4').show().delay(7000).fadeOut(1000);
}
if (response === "6") {
  $('#reg_err6').show().delay(7000).fadeOut(1000);
}

    }
  });
});

$('#alert-btn1').click(function(){
  $('#reg_succ').hide();
});

$('#alert-btn2').click(function(){
  $('#reg_err2').hide();
});

$('#alert-btn3').click(function(){
  $('#reg_err3').hide();
});

$('#alert-btn4').click(function(){
  $('#reg_err4').hide();
});
$('#alert-btn5').click(function(){
  $('#reg_err5').hide();
});

$('#alert-btn6').click(function(){
  $('#reg_err6').hide();
});


$("#formulario2").on("submit", function (event) {
  event.preventDefault();
var d1 = $('#i_nick').val();
var d2 = $('#i_contra').val();
  $.ajax({
    type: "POST",
    url: "/sesion",
    data: {
      nickname: $('#i_nick').val(),
      contra : $('#i_contra').val(),
    },
    success: function (response) {
      var sda = response.admin;
      if (response === "error") {
        $('#reg_err5').show().delay(7000).fadeOut(1000);
      }else if(response.admin === true){
        window.location.href = "/admin";
      }else
      {  window.location.href = "/";}
      
    }
  });
});


$("#formulario3").on("submit", function (event) {
  event.preventDefault();
  $.ajax({
    type: "Post",
    url: "/tarjeta",
    data: [],
    success: function (response) {
      $('#datosdeenvio').modal('hide');
      $('#tarjeta').modal('show');
    }
  });
});

if(window.location.pathname == "/modalsession"){
  $('#Modal-sesion').modal();
}

if(window.location.pathname == "/"){
  $('#n').css("border-bottom","3px solid  #FFEE32");
  $('#n').css("background-color"," #202020");
  $('#n').css(" border-color"," #333533");
}
if(window.location.pathname == "/carrito"){
  $('#c').css("border-bottom","3px solid  #FFEE32");
  $('#c').css("background-color"," #202020");
  $('#c').css(" border-color"," #333533");
}
if(window.location.pathname == "/peliculas"){
  $('#p').css("border-bottom","3px solid  #FFEE32");
  $('#p').css("background-color"," #202020");
  $('#p').css(" border-color"," #333533");
  $('#title_cont').text("Películas");
  $('#subtitle_cont').text("Encuentra aquí todas las películas en los cines de México.");
};
  
if(window.location.pathname == "/series"){
  $('#s').css("border-bottom","3px solid  #FFEE32");
  $('#s').css("background-color"," #202020");
  $('#s').css(" border-color"," #333533");
  $('#title_cont').text("Series");
  $('#subtitle_cont').text("Las mejores series del momento.");
}
if(window.location.pathname == "/avances"){
  $('#a').css("border-bottom","3px solid  #FFEE32");
  $('#a').css("background-color"," #202020");
  $('#a').css(" border-color"," #333533");
  $('#title_cont').text('Avances');
  $('#subtitle_cont').text("Visualiza los nuevos estrenos.");
}

