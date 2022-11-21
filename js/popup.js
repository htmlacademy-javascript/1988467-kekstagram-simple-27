import { addZoomController } from './zoom-control.js';
import { addEffectsController, restEffects } from './apply-effects.js';
import { clearErrorMessage } from './comment-control.js';
import { sendPhoto } from './api.js';
import { showMessage } from './loading-messages.js';
import { getModalState, setModalState, resetModalState } from './util.js';

const { body } = document;
const form = body.querySelector('.img-upload__form');
const imgUploadPopup = form.querySelector('.img-upload__overlay');
const uploadFileInput = form.querySelector('.img-upload__input');
const submitButton = form.querySelector('.img-upload__submit');


form.addEventListener('reset', onCloseImagePopup);
uploadFileInput.addEventListener('change', onOpenImagePopup);

function onPopupEscKeydown(evt) {
  const modalState = getModalState();
  if (evt.key === 'Escape' && modalState === 'upload') {
    evt.preventDefault();
    restEffects();
    form.reset();
    resetModalState();
  }
}

function onOpenImagePopup() {
  toggleClasses(true);

  document.addEventListener('keydown', onPopupEscKeydown);
  addZoomController();
  addEffectsController();
  clearErrorMessage();

  setModalState('upload');
}


function onCloseImagePopup() {
  toggleClasses(false);

  document.removeEventListener('keydown', onPopupEscKeydown);
  restEffects();
  form.reset();

  resetModalState();
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


form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = form.reportValidity();

  if (isValid) {

    const data = new FormData(form);
    blockSubmitButton();
    sendPhoto(
      () => {
        onCloseImagePopup();
        showMessage('success');
        unblockSubmitButton();
      },
      () => {
        showMessage('error');
        unblockSubmitButton();
      },
      data,
    );
  }
});

