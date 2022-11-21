const commentField = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const commentWrapper = commentField.parentElement;

const warningMessage = document.createElement('div');
warningMessage.classList.add('warning-message');

const pluralRuleSelector = new Intl.PluralRules('ru');
const charactersToWord = {
  one: 'символ',
  few: 'символа',
  many: 'символов',
  other: 'символов'
};
let charsLeft = 0;

commentField.addEventListener('input', onCheckCommentValidation);

function onCheckCommentValidation() {
  const { valueMissing, tooShort, tooLong } = commentField.validity;
  const isInvalid = valueMissing | tooShort | tooLong;

  commentField.setAttribute('area-invalid', String(isInvalid));

  if (isInvalid) {
    commentField.style.outline = '4px solid #ff0000';

    if (tooLong) {
      commentField.setCustomValidity('Комментарий должен быть не более 140 символов.');
    }

    if (tooShort) {
      charsLeft = commentField.minLength - commentField.value.length;
      const amountCharacters = pluralRuleSelector.select(charsLeft);
      commentField.setCustomValidity(`Комментарий слишком короткий. Введите еще ${charsLeft} ${charactersToWord[amountCharacters]}.`);
    }

    if (valueMissing) {
      commentField.setCustomValidity('Комментарий к фото обязателен!');
    }
  } else {
    commentField.setCustomValidity('');
    commentField.style.removeProperty('outline');
  }

  displayWarningMessage(commentField.validationMessage);

  submitButton.disabled = isInvalid;
}

function clearErrorMessage() {
  warningMessage.textContent = '';
}


function displayWarningMessage(errorMessage) {
  if (errorMessage.length) {
    warningMessage.textContent = errorMessage;
    commentWrapper.append(warningMessage);
  } else {
    warningMessage.remove();
  }
}

export { clearErrorMessage };
