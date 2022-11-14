import { addZoomController } from './zoom-control.js';
import { addEffectsController, restEffects } from './apply-effects.js';
import { clearErrorMessage } from './comment-control.js';

const { body } = document;
const form = body.querySelector('.img-upload__form');
const imgUploadPopup = form.querySelector('.img-upload__overlay');
const uploadFileInput = form.querySelector('.img-upload__input');

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


