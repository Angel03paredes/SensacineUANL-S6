function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function(e) {
        $('#imgInp').attr('src', e.target.result);
      }
      
      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }
  
  $("#file").change(function() {
    readURL(this);
  });

  $('#file').change(function(e){
    var fileName = e.target.files[0].name;
    $('.custom-file-label').html(fileName);
});


  