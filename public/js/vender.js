$("#tarjeta_click").on("submit", function (event) {
    event.preventDefault();
    var date = new Date();
    var str = date.getMonth() + 1;
    var str2 =   date.getFullYear() ;
   var cant = parseFloat($('#precio').text().substr(2,100));
   console.log("pasa");
    $.ajax({
        type: "POST",
        url: "/venta",
        data: {
            idproducto: $('#idproducto').text(),
          producto: $('#producto').text(),
          cantidad : $("#cantidad").val(),
          venta: cant * parseFloat($("#cantidad").val()) ,
          fecha:   str2.toString() + str.toString()
        },
        success: function (response) {
            $('#tarjeta').modal('hide');
            if (response === "si") {
              $('#reg_err7').show().delay(7000).fadeOut(1000);
            }
            if (response === "no") {
              $('#reg_err8').show().delay(7000).fadeOut(1000);
            }
        }
      });
});

$('#alert-btn7').click(function(){
  $('#reg_err7').hide();
});

$('#alert-btn8').click(function(){
  $('#reg_err8').hide();
});