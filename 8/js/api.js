import { renderPhotos } from './upload-photo.js';
import { showErrorUpload } from './loading-messages.js';

const ERROR_MESSAGE = 'Фотографии других пользователей не загрузились... Хочешь попробовать еще раз?';
const BASE_URL = 'https://27.javascript.pages.academy/kekstagram-simple';

function getPhotos(onSuccess, onFail) {
  fetch(`${BASE_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail(ERROR_MESSAGE);
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail(ERROR_MESSAGE);
    });
}


function sendPhoto(onSuccess, onFail, body) {
  fetch(BASE_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось загрузить фото.');
      }
    })
    .catch(() => {
      onFail('Не удалось загрузить фото.');
    });
}

getPhotos(renderPhotos, showErrorUpload);


export { getPhotos, sendPhoto };
