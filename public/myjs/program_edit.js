$(document).ready(async function() {
  let selected_university_id = $('#university_id').val();

  let res = await fetch('/university/allJSON');
  let data = await res.json();
  $('#universities').empty();
  $('#universities').append(
    $('<option>')
      .text('Select University')
      .attr('disabled', 'true')
  );
  $.each(data, function(index, item) {
    if (item._id === parseInt(selected_university_id)) {
      $('#universities').append(
        $('<option  selected>')
          .text(item.name)
          .val(item._id)
      );
    } else {
      $('#universities').append(
        $('<option>')
          .text(item.name)
          .val(item._id)
      );
    }
  });
});
