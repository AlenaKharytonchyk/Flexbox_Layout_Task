$('#start-chat').click(function startChat() { alert("Let's start!"); });

const email = localStorage.getItem('userEmail');
$('.user-email').text(email);

$.getJSON('chat-message.json')
  .done(function json(data) {
  // const elementsArr = [];
    $.each(data, function newChatElement(key, value) {
      $('<div/>', {
        class: 'chat-section-card',
        id: `message-${key}`,
        html: `
      <div>
                  <img src="./assets/speak.png" class="communities-image" />
                </div>
                <div class="chat-section-card-text">
                  <span class="communities-name">
                    ${value.speakerName}
                  </span>
                  <div class="chat-section-message">
                    <p>
                      ${value.speakerMessage}
                    </p>
                  </div>
                </div>`
      }).appendTo('main.chat-section-field');
    });
  });
