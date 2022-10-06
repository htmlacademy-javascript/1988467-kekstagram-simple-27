function getRandomNumber(a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }
  if(!Number.isInteger(a) || !Number.isInteger(b)) {
    return NaN;
  }
  if (a <= b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  } else {
    return Math.floor(Math.random() * (a - b + 1)) + b;
  }
}

getRandomNumber(5, 3);

function checkCommentLength(comment, maxLength = 140, minLength = 20) {
  if (comment.length < minLength || comment.length > maxLength) {
    return false;
  } else {
    return true;
  }
}

checkCommentLength('Функция для проверки максимальной длины строки');
