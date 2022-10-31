import { checkStringLength } from './util.js';

const commentField = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

commentField.setAttribute('required', true);


function addCommentController() {

  createWarningPlaceholder();

  commentField.oninput = function () {

    displayWarningMessage(commentField.value.length);

    if (checkStringLength(commentField.value)) {
      commentField.style.border = '4px solid transparent';
      submitButton.disabled = false;
    } else {
      commentField.style.border = '4px solid #ff0000';
      submitButton.disabled = true;
    }
  };
}


function displayWarningMessage(numberOfChars) {
  const warningMessage = document.querySelector('.warning-message');
  warningMessage.textContent = `Сообщение не может быть менее 20 символов и более 140 символов.
  Длина сообщения: ${numberOfChars}`;
}

function createWarningPlaceholder() {
  const warningMessage = document.createElement('div');
  warningMessage.style.fontSize = '10px';
  warningMessage.classList.add('warning-message');
  warningMessage.style.margin = 'auto';
  warningMessage.style.width = '450px';

  const imgComment = document.querySelector('.img-upload__text');
  imgComment.append(warningMessage);
}

export { addCommentController };
