function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#banner_preview').html(
        "<img id = 'banner_img' height='100%' width='100%' alt='Failed To Load'>"
      );
      $('#banner_img').attr('src', e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

$('#banner').change(function() {
  readURL(this);
});

$(document).ready(() => {
  fetch('/degree/allJSON')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      $('#degrees').empty();
      $('#degrees').append(
        $('<option selected>')
          .text('Select Degree')
          .attr('disabled', 'true')
      );
      $.each(data, function(index, item) {
        $('#degrees').append(
          $('<option>')
            .text(item.title)
            .val(item.title)
        );
      });
    })
    .catch(err => console.log(err));

  fetch('/language/allJSON')
    .then(res => res.json())
    .then(data => {
      $('#languages').empty();
      $('#languages').append(
        $('<option selected>')
          .text('Select Language')
          .attr('disabled', 'true')
      );
      $.each(data, function(index, item) {
        $('#languages').append(
          $('<option>')
            .text(item.language)
            .val(item.language)
        );
      });
    })
    .catch(err => console.log(err));
});
