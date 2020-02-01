$(document).ready(async function() {
  let res = await fetch('/university/allJSON');
  let data = await res.json();
  $('#universities').empty();
  $('#universities').append(
    $('<option selected>')
      .text('Select University')
      .attr('disabled', 'true')
  );
  $.each(data, function(index, item) {
    $('#universities').append(
      $('<option>')
        .text(item.name)
        .val(item._id)
    );
  });
});
