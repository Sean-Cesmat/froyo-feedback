$(document).ready(function(){
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
  $('select').material_select();
  $(".button-collapse").sideNav();


  $('.password-view-toggle').on('click', function() {
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
      data: $(this).serialize(),
    }).done(function(data) {
      window.location.reload();
    });
  });

  $('#edit-flavor-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'PUT',
      url: $(this).attr('action'),
      data: $(this).serialize()
    }).done(function(data){
      window.location.href = '/dashboard/flavors';
    });
  });

  $('.delete-flavor').on('click', function(e) {
    e.preventDefault();
    var flavorDeleteUrl = $(this).attr('data-delete');
    $('#delete-modal').modal('open');
    $('#cancel-delete').on('click', function(e) {
      $('#delete-modal').modal('close');
    });
    $('#approve-delete').on('click', function(e) {
      $.ajax({
        method: 'DELETE',
        url: flavorDeleteUrl
      }).done(function(data){
        window.location.reload();
      });
    });
  })

  $('.delete-modal').modal({
      dismissible: false, // Modal can be dismissed by clicking outside of the modal
    }
  );

});
