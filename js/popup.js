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


const toggleClasses = (toOpen = true) => {
  imgUploadPopup.classList.toggle('hidden', !toOpen);
  body.classList.toggle('modal-open', toOpen);
};


const onPopupEscKeydown = (evt) => {
  const modalState = getModalState();
  if (evt.key === 'Escape' && modalState === 'upload') {
    evt.preventDefault();
    restEffects();
    form.reset();
    resetModalState();
  }
};

const onOpenImagePopup = () => {
  toggleClasses(true);

  document.addEventListener('keydown', onPopupEscKeydown);
  addZoomController();
  addEffectsController();
  clearErrorMessage();

  setModalState('upload');
};

uploadFileInput.addEventListener('change', onOpenImagePopup);

const onCloseImagePopup = () => {
  toggleClasses(false);

  document.removeEventListener('keydown', onPopupEscKeydown);
  restEffects();
  form.reset();

  resetModalState();
};

form.addEventListener('reset', onCloseImagePopup);


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};


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

