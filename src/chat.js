$('#start-chat').click(function startChat() {
  alert("Let's start!");
});

const email = localStorage.getItem('userEmail');
$('.user-email').text(email);

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];
function newMessageInChat(userEmail, message, strDate) {
  $('<div/>', {
    class: 'chat-section-card',
    html: `
    <div>
                <img src="./assets/speak.png" class="communities-image" />
              </div>
              <div class="chat-section-card-text">
                <span class="communities-name user-email">
                ${userEmail}
                </span>
                <div class="chat-section-message">
                  <p class="user-message">
                  ${message}
                  </p>
                </div>
                  <p class="message-date">
                  ${strDate}
                  </p>
              </div>`
  }).appendTo('.chat-section-field');
}
$.getJSON('chat-message.json').done(function json(data) {
  $.each(data, function newChatElement(key, value) {
    const { speakerName, speakerMessage, messageDate } = value;
    newMessageInChat(speakerName, speakerMessage, messageDate);
  });
});

$('#chat-message-text').keydown(function keydown(event) {
  let message = $('textarea').val();
  let date = new Date();
  let strDate = date.getDate() + ' ' + monthNames[date.getMonth() + 1] + ' ' + date.getFullYear();
  if (event.keyCode === 13) {
    if (message === '') {
      alert('Enter Some Text In Textarea');
    } else {
      newMessageInChat(email, message, strDate);
    }
    $('textarea').val('');
  }
});
