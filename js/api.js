import { renderPhotos } from './upload-photo.js';
import { showErrorUpload } from './loading-messages.js';

function getPhotos(onSuccess, onFail) {
  fetch('https://27.javascript.pages.academy/kekstagram-simple/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail('Кажется, что-то пошло не так... Фотографии других пользователей не загрузились!');
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail('Кажется, что-то пошло не так... Фотографии других пользователей не загрузились!');
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
