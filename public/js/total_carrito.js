$("#tarjeta_click").on("submit", function (event) {
    event.preventDefault();
    var date = new Date();
    var str = date.getMonth() + 1;
    var str2 =   date.getFullYear() ;
   var cant = parseFloat($('#precio').text().substr(2,100));

   
   var arre =  <%- array2 %>;
console.log(arre);

});
