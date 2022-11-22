import { setModalState } from './util.js';

const body = document.body;
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');


const showMessage = (message = 'error') => {
  const modal = (message === 'success' ? successMessage : errorMessage).cloneNode(true);
  const button = modal.querySelector('button');

  const closeModal = () => {
    modal.remove();

    document.removeEventListener('keydown', onKeydownClose);
    setModalState('upload');
  };

  const onClickClose = (evt) => {
    if (evt.target === modal || evt.target === button) {
      closeModal();
    }
  };

  function onKeydownClose(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeModal();
    }
  }


  modal.addEventListener('click', onClickClose);
  document.addEventListener('keydown', onKeydownClose);

  body.append(modal);

  setModalState('alert');
};

const hideMessage = (message) => {
  message.classList.add('hidden');
};


const addListenersCloseMessage = (message) => {
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
};

const showErrorUpload = (message) => {
  const errorUpload = document.createElement('section');
  errorUpload.classList.add('error-upload');

  const errorUploadInner = document.createElement('div');
  errorUploadInner.classList.add('error-upload__inner');
  errorUploadInner.style.backgroundColor = 'white';
  errorUploadInner.style.paddingTop = '40px';
  errorUploadInner.style.color = '#232321';

  const errorUploadContainer = document.createElement('div');
  errorUploadContainer.classList.add('error-upload__container');
  errorUploadContainer.style.display = 'flex';

  const errorUploadImage = document.createElement('img');
  errorUploadImage.classList.add('error-upload__image');
  errorUploadImage.src = '../img/error-cat.jpg';
  errorUploadImage.style.width = '200px';
  errorUploadImage.style.height = '200px';

  const errorUploadTitle = document.createElement('h2');
  errorUploadTitle.classList.add('error-upload__title');
  errorUploadTitle.textContent = message;
  errorUploadTitle.style.lineHeight = '36px';
  errorUploadTitle.style.margin = 'auto';
  errorUploadTitle.style.fontSize = '28px';


  const errorUploadButton = document.createElement('button');
  errorUploadButton.classList.add('error-upload__button');
  errorUploadButton.textContent = 'Да!';
  errorUploadButton.style.color = '#232321';
  errorUploadButton.style.border = '2px solid #232321';

  body.append(errorUpload);
  errorUpload.append(errorUploadInner);
  errorUploadInner.append(errorUploadContainer);
  errorUploadContainer.append(errorUploadImage);
  errorUploadContainer.append(errorUploadTitle);
  errorUploadInner.append(errorUploadButton);

  addListenersCloseMessage(errorUpload);
};

export { showErrorUpload, showMessage };
