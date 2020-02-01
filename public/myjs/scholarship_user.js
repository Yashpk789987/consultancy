let data = [];

async function loadData() {
  let res = await fetch('/scholarship/allJSON');
  data = await res.json();
  console.log(data);
  console.log($('#degrees').val());
  try {
    $('#degrees').empty();
  } catch (error) {
    console.log(error);
  }
}

loadData();
