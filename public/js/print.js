
  
    $("#event_click").click(function(){
        var mode = 'iframe'; //popup
        var close = mode == "popup";
        var options = { mode : mode, popClose : close};
        $("#print_div").printArea( options );
    });

