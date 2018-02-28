$(document).ready(function(){
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
  $('select').material_select();


  $('.password-view-toggle').on('click', function() {
    console.log($(this).prev().attr('type'));
    if ($(this).prev().attr('type') === 'password') {
      $(this).prev().attr('type', 'text');
      $(this).addClass('color-blue');
    } else {
      $(this).prev().attr('type', 'password');
      if ($(this).hasClass('color-blue')) {
        $(this).removeClass('color-blue');
      }
    }
  });

  $('#updateProfile').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'PUT',
      url: $(this).attr('action'),
      data: $(this).serialize()
    }).done(function(data) {
      window.reload();
    });
  })


});
