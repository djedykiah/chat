document.addEventListener('DOMContentLoaded', function () {

  let userMessage = document.querySelector('.message__field'),
    sendBtn = document.querySelector('.send__btn'),
    messageBlock = document.querySelectorAll('.message__container'),
    avatar = document.querySelectorAll('.user__avatar'),
    user = document.querySelectorAll('.user'),
    messageContainer = document.querySelectorAll('.message__container'),
    chatTab = document.querySelector('.chat__left'),
    chatMessages = [];


	function getMessage() {
    return JSON.parse(localStorage.getItem('message'));
	}
  // hide user`s message windows

	let currentUser = 0;
	console.log(JSON.parse(localStorage.getItem('currentUser')))

  for (let i = 0; i < user.length; i++) {
    user[currentUser].classList.add('active')
  }

  let hideTabContent = (a) => {
    for (let i = a; i < messageContainer.length; i++) {
      const element = messageContainer[i];
      element.classList.remove('show');
      element.classList.add('hide');

    }

  }
  hideTabContent(1);

  let showTabContent = (b) => {
    if (messageContainer[b].classList.contains('hide')) {
      messageContainer[b].classList.remove('hide');
      messageContainer[b].classList.add('show')
    }
  }

  for (let i = 0; i < user.length; i++) {
    const element = user[i];
    element.addEventListener('click', function () {
      let self = this;

      if (self && self.classList.contains('user')) {
        for (let i = 0; i < user.length; i++) {
          const element = user[i];
          element.classList.remove('active')
        }
        self.classList.add('active')
        for (let i = 0; i < user.length; i++) {
          const element = user[i];


          if (self === element) {
            hideTabContent(0);
						showTabContent(i);
						currentUser = i;
						localStorage.setItem('currentUser', JSON.stringify(currentUser));
            if (getMessage() != null) {
              messageContainer[i].innerHTML = getMessage()[i];
              break;
            } else {
              break;
            }

          }
        }
      }
    })
  }


  function sendMessage() {
    let message = userMessage.value,
        newMessage = document.createElement('div'),
        avatarUrl = "";

    for (let i = 0; i < avatar.length; i++) {
      const element = avatar[i];
      if (element.parentElement.classList.contains('active')) {
        avatarUrl = element.getAttribute('src');
      }
    }

    newMessage.classList.add('message');
    newMessage.innerHTML = ('<img class="message__avatar" src="' + avatarUrl + '" alt=""><div class="message__text">' + message + '</div>')
    newMessage.classList.add('message--user');

    for (let i = 0; i < messageBlock.length; i++) {
      const element = messageBlock[i];
      if (!element.classList.contains('hide')) {
        element.appendChild(newMessage);
      }
    }
    setTimeout(() => {
      botMessage();
    }, 1500);

    userMessage.value = '';


  };

  let bufferMessagesArray = [];

  if (!window.localStorage.length) {
    messageContainer.forEach(function (elem, index) {
      chatMessages.push(bufferMessagesArray);
      localStorage.setItem('message', JSON.stringify(chatMessages));
    });
  }


  function botMessage() {
    let botNewMessage = document.createElement('div');


    botNewMessage.classList.add('message');
    botNewMessage.classList.add('message--bot');
    botNewMessage.innerHTML = ('<img class="message__avatar" src="img/avatar.jpg" alt="" ><div class="message__text">' + messagesArray[getRandomPhrase()] + '</div>');
    for (let i = 0; i < messageBlock.length; i++) {
      const element = messageBlock[i];
      if (!element.classList.contains('hide')) {
        element.appendChild(botNewMessage);
      }
    }

    messageContainer.forEach(function (elem, index) {

      let history = JSON.parse(localStorage.getItem('message'));

      if (!elem.classList.contains('hide')) {
        history[index] = elem.innerHTML.trim();
        localStorage.setItem('message', JSON.stringify(history));
      }
    });

  }
  sendBtn.addEventListener('click', sendMessage);

  function getRandomPhrase() {
    return Math.round(0 + Math.random() * (messagesArray.length - 1));
  };

  user[JSON.parse(localStorage.getItem('currentUser'))].click();




});
