function getRandomPositiveInteger(a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }

  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomPositiveInteger(5, 3);

function checkStringLength(comment, maxLength = 140, minLength = 20) {
  return comment.length >= minLength && comment.length <= maxLength;
}

checkStringLength('Функция для проверки максимальной длины строки');

function getShuffledArray(from, to) {
  const array = [];

  for (let i = from; i <= to; i++) {
    array.push(i);
  }

  const shaffledArray = [];
  for (let j = 1; j <= (to - from + 1); j++) {
    shaffledArray.push(array.splice(Math.random() * array.length, 1)[0]);
  }
  return shaffledArray;
}

export {getRandomPositiveInteger, checkStringLength, getShuffledArray};
