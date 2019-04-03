$('#login-form').submit(function submit(event) {
  const email = $('#email').val();
  const myComputer = $('#keep-sign').prop('checked');

  localStorage.setItem('userEmail', email);
  localStorage.setItem('myComputer', myComputer);

  window.location = 'chat.html';
  event.preventDefault();
});

(function onInit() {
  const userEmail = localStorage.getItem('userEmail');
  const myComputer = localStorage.getItem('myComputer');

  if (myComputer === 'true') {
    $('#email').val(userEmail);
    $('#keep-sign').prop('checked', !!myComputer);
  }
}());
