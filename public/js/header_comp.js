

$(window).scroll(function(event){
   var st = $(this).scrollTop();
   if (st > 240){
    $(".navbar").css("background-color","white");
   $('.btnjs').addClass('btn_mysensa2');
   $('.btnjs').removeClass('btn_mysensa');
   $('.btnjs').removeClass('shadow-focus');
   $('.btnjs2').addClass('dropdown-item-mysensa2');
   $('.btnjs2').removeClass('dropdown-item-mysensa');
   } else {
    $(".navbar").css("background-color","#FFD100");
    $('.btnjs').removeClass('btn_mysensa2');
    $('.btnjs').addClass('btn_mysensa');
    $('.btnjs').addClass('shadow-focus');
    $('.btnjs2').removeClass('dropdown-item-mysensa2');
    $('.btnjs2').addClass('dropdown-item-mysensa');
   }
});

$("#btn-resp").click(function(){
   $("#logo-img").toggle();
 
});
