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

export {getRandomPositiveInteger, checkStringLength};
