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

  let program_id = $('#program_id').val();

  let res1 = await fetch('/program/allJSON');
  let data1 = await res1.json();
  $('#programs').empty();
  $('#programs').append(
    $('<option>')
      .text('Select University')
      .attr('disabled', 'true')
  );
  $.each(data1, function(index, item) {
    if (item._id === parseInt(selected_university_id)) {
      $('#programs').append(
        $('<option  selected>')
          .text(item.major)
          .val(item._id)
      );
    } else {
      $('#programs').append(
        $('<option>')
          .text(item.major)
          .val(item._id)
      );
    }
  });
});
