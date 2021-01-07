
  $( "#slider-range" ).slider({
    range: true,
    min: 12,
    max: 24,
    values: [ 12, 24 ],
    slide: function( event, ui ) {
      $( "#amount" ).val(  ui.values[ 0 ] + " hrs - " + ui.values[ 1 ] + " hrs");
    }
  });
  $( "#amount" ).val(  $( "#slider-range" ).slider( "values", 0 ) + ":00 hrs" +
    " - " + $( "#slider-range" ).slider( "values", 1 ) + ":00 hrs");



	jQuery('#datetimepicker').datetimepicker({
		onGenerate:function( ct ){
		  jQuery(this).find('.xdsoft_date.xdsoft_weekend')
			.addClass('xdsoft_disabled');
		},
		weekends:['01.01.2014','02.01.2014','03.01.2014','04.01.2014','05.01.2014','06.01.2014'],
		timepicker:false
	  });

	  jQuery.datetimepicker.setLocale('es');


	  $( "#cart_cine_drop" ).click(function() {
		$( "#down_cine" ).slideToggle( 300, function() {
		});
	  });

	  $( "#cart_formato_drop" ).click(function() {
		$( "#down_formato" ).slideToggle( 300, function() {
		});
	  });

	  $( "#cart_idioma_drop" ).click(function() {
		$( "#down_idioma" ).slideToggle( 300, function() {
		});
	  });

	  $( "#cart_horario_drop" ).click(function() {
		$( "#down_horario" ).slideToggle( 300, function() {
		});
	  });

	  $( "#cart_calendario_drop" ).click(function() {
		$( "#down_calendario" ).slideToggle( 300, function() {
		});
	  });