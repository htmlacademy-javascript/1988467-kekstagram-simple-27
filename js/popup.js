import { addZoomController } from './zoom-control.js';
import { addEffectsController, removeEffectsController } from './apply-effects.js';
import { addCommentController } from './comment-control.js';

const form = document.querySelector('.img-upload__form');
const imgUploadPopup = form.querySelector('.img-upload__overlay');
const uploadFileInput = form.querySelector('.img-upload__input');
const body = document.querySelector('body');
const imgUploadCancel = form.querySelector('.img-upload__cancel');

function onPopupEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeImagePopup();
  }
}

function openImagePopup() {
  imgUploadPopup.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
  addZoomController();
  addEffectsController();
  addCommentController();
}

uploadFileInput.addEventListener('change', openImagePopup);

function closeImagePopup() {
  imgUploadPopup.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFileInput.value = '';

  document.removeEventListener('keydown', onPopupEscKeydown);
  removeEffectsController();
}

imgUploadCancel.addEventListener('click', closeImagePopup);


