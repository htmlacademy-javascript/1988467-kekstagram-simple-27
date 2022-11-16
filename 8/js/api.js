import { renderPhotos } from './upload-photo.js';
import { showErrorUpload } from './loading-messages.js';

function getPhotos(onSuccess, onFail) {
  fetch('https://27.javascript.pages.academy/kekstagram-simple/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail('Фотографии других пользователей не загрузились... Хочешь попробовать еще раз?');
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail('Фотографии других пользователей не загрузились... Хочешь попробовать еще раз?');
    });
}


function sendPhoto(onSuccess, onFail, body) {
  fetch('https://27.javascript.pages.academy/kekstagram-simple',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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
