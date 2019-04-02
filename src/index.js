$('#login-form').submit(function submit(event) {
  const email = $('#email').val();
  const myComputer = $('#keep-sign').prop('checked');
  if (myComputer) {
    localStorage.setItem('userEmail', email);
    localStorage.setItem('myComputer', myComputer);
  } else {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('myComputer');
  }
  window.location = 'chat.html';
  event.preventDefault();
});

(function onInit() {
  const userEmail = localStorage.getItem('userEmail');
  $('#email').val(userEmail);
  $('#keep-sign').prop('checked', !!userEmail);
}());
