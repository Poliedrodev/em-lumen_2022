$(document).ready(function () {
  $('.articleContent').each(function () { 
    var radioExercicio = $('.wrap-radios');

    function radioId() {
      radioExercicio = $('.wrap-radios');
      radioExercicio.find('input').ready(function () {
        radioExercicio.each(function () {
          var randomId = Math.floor(Math.random() * 1000000) + 1;
          $(this).attr('id', randomId);
          $(this).find('input').attr('name', randomId);
        });
      });
    }
  
    radioExercicio.find('input').ready(radioId);
    radioExercicio.find('.textradio').on('click', radioId);
  })
})