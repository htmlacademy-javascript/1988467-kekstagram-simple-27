const body = document.body;
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');

const messagesContainer = document.createDocumentFragment();

successMessage.classList.add('hidden');
errorMessage.classList.add('hidden');

messagesContainer.append(successMessage.cloneNode(true));
messagesContainer.append(errorMessage.cloneNode(true));

body.append(messagesContainer);

function showMessage(message) {
  message.classList.remove('hidden');
}

function hideMessage(message) {
  message.classList.add('hidden');
}


function addListenersCloseMessage(message) {
  const button = message.querySelector('button');
  button.addEventListener('click', () => {
    hideMessage(message);
  });

  document.addEventListener('click', (evt) => {
    if (evt.target === message) {
      hideMessage(message);
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      hideMessage(message);
    }
  });
}

function showErrorUpload(message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
}

export { showErrorUpload, addListenersCloseMessage, showMessage };
