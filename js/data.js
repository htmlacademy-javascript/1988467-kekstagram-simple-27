import {getRandomPositiveInteger} from './util.js';

const MIN_NUMBER_COMMENTS = 0;
const MAX_NUMBER_COMMENTS = 200;
const MIN_NUMBER_LIKES = 15;
const MAX_NUMBER_LIKES = 200;
const PHOTO_COUNT = 25;

const descriptionsArray = [
  'Сбалансированная диета — это печенье в каждой руке',
  'Хорошая еда — хорошее настроение',
  'Дом там, где есть еда',
  'Лучше пасты может быть только две пасты!',
  'Извините, у меня любовь… С едой!',
  'Какая у меня суперсила? Я могу заставить мороженное исчезнуть!',
  'Быть взрослым — прекрасно! Тебе не нужно разрешение, чтобы съесть десерт на ужин',
  'Единственное, что я люблю больше, чем говорить о еде, — это есть',
  'Нет ничего лучше на свете, чем теплая коробка из-под пиццы у тебя на коленях',
  'Все хорошо, если оно сделано из шоколада',
  'Сначала мы едим, потом делаем все остальное',
  'Люди, которые любят поесть, всегда лучшие люди',
  'Мне нравятся хэштеги, потому что они похожи на вафли',
  'Нет искренней любви, чем любовь к еде',
  'Если во время свидания за столом будет недостаточно еды, я засыплю тебя вопросами…',
];
// https://mysekret.ru/chto-napisat/kak-podpisat-foto-s-edoy-v-lente-i-v-storis.html
// https://saytpozitiva.ru/podpisi-k-foto-v-instagram.html

function getRandomArrayElement(elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

function getUserPhotos () {
  const userPhotos = Array.from({length: PHOTO_COUNT}, (_, index) => {
    const createObject = {
      id: index + 1,
      url: `photos/${index + 1}.jpg`,
      description: getRandomArrayElement(descriptionsArray),
      likes: getRandomPositiveInteger(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES),
      comments: getRandomPositiveInteger(MIN_NUMBER_COMMENTS, MAX_NUMBER_COMMENTS),
    };
    return createObject;
  });
  return userPhotos;
}

getUserPhotos();

export {getUserPhotos};
