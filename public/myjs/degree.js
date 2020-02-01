let programs = [];
$(document).ready(async function() {
  fetch('/university/allJSON')
    .then(res => res.json())
    .then(data => {
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
    })
    .catch(err => console.log(err));

  fetch('/program/allJSON')
    .then(res => res.json())
    .then(data => {
      $('#programs').empty();
      $('#programs').append(
        $('<option selected>')
          .text('Select Program')
          .attr('disabled', 'true')
      );
      programs = data;
      $.each(data, function(index, item) {
        $('#programs').append(
          $('<option>')
            .text(item.major)
            .val(item._id)
        );
      });
    })
    .catch(err => console.log(err));
});
