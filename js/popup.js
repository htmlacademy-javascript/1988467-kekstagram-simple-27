import { addZoomController } from './zoom-control.js';
import { addEffectsController, restEffects } from './apply-effects.js';
import { clearErrorMessage } from './comment-control.js';
import { sendPhoto } from './api.js';
import { addListenersCloseMessage, showMessage } from './loading-messages.js';

const { body } = document;
const form = body.querySelector('.img-upload__form');
const imgUploadPopup = form.querySelector('.img-upload__overlay');
const uploadFileInput = form.querySelector('.img-upload__input');
const submitButton = form.querySelector('.img-upload__submit');
const errorMessage = body.querySelector('.error');
const successMessage = body.querySelector('.success');

form.addEventListener('reset', closeImagePopup);
uploadFileInput.addEventListener('change', openImagePopup);

function onPopupEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    form.reset();
  }
}

function openImagePopup() {
  toggleClasses(true);

  document.addEventListener('keydown', onPopupEscKeydown);
  addZoomController();
  addEffectsController();
  clearErrorMessage();
}


function closeImagePopup() {
  toggleClasses(false);

  document.removeEventListener('keydown', onPopupEscKeydown);
  restEffects();
  form.reset();
}

function toggleClasses(toOpen = true) {
  imgUploadPopup.classList.toggle('hidden', !toOpen);
  body.classList.toggle('modal-open', toOpen);
}


function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
}

function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}


function setUserFormSubmit(onSuccess) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    // const isValid = form.validity;

    // if (isValid) {
    blockSubmitButton();
    sendPhoto(
      () => {
        onSuccess();
        showMessage(successMessage);
        unblockSubmitButton();
        addListenersCloseMessage(successMessage);
      },
      () => {
        showMessage(errorMessage);
        addListenersCloseMessage(errorMessage);
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
    // }
  });
}

setUserFormSubmit(closeImagePopup);
