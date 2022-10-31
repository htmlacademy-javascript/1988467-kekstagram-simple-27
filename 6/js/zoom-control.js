const imgUploadPopup = document.querySelector('.img-upload__overlay');
const scaleControlSmaller = imgUploadPopup.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadPopup.querySelector('.scale__control--bigger');
let zoomValue = 100;


function disableButton(value) {
  if (value > 25 && value < 100) {
    scaleControlSmaller.disabled = false;
    scaleControlBigger.disabled = false;
  } else if (value <= 25) {
    scaleControlSmaller.disabled = true;
    scaleControlBigger.disabled = false;
  } else if (value >= 100) {
    scaleControlSmaller.disabled = false;
    scaleControlBigger.disabled = true;
  }
}

function zoomOut() {
  zoomValue -= 25;
  renderZoomControlValue(zoomValue);
  disableButton(zoomValue);
}

function zoomIn() {
  zoomValue += 25;
  renderZoomControlValue(zoomValue);
  disableButton(zoomValue);
}

function renderZoomControlValue(value) {
  const scaleControlValue = imgUploadPopup.querySelector('.scale__control--value');
  scaleControlValue.value = `${value}%`;
  scaleImage(zoomValue);
}

function addZoomController() {
  zoomValue = 100;
  scaleControlSmaller.addEventListener('click', zoomOut);
  scaleControlBigger.addEventListener('click', zoomIn);
  renderZoomControlValue(zoomValue);
  disableButton(zoomValue);
}

function scaleImage(value) {
  const scalePercent = value / 100;
  const imageUploadPreview = document.querySelector('.img-upload__preview');
  const image = imageUploadPreview.querySelector('img');
  image.style.transform = `scale(${scalePercent})`;
}

addZoomController();


export { addZoomController };
