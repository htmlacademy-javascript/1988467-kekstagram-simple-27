const imgUploadPopup = document.querySelector('.img-upload__overlay');
const scaleControlSmaller = imgUploadPopup.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadPopup.querySelector('.scale__control--bigger');

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

let zoomValue = MAX_SCALE;


const disableButton = (value) => {
  if (value > MIN_SCALE && value < MAX_SCALE) {
    scaleControlSmaller.disabled = false;
    scaleControlBigger.disabled = false;
  } else if (value <= MIN_SCALE) {
    scaleControlSmaller.disabled = true;
    scaleControlBigger.disabled = false;
  } else if (value >= MAX_SCALE) {
    scaleControlSmaller.disabled = false;
    scaleControlBigger.disabled = true;
  }
};

const scaleImage = (value) => {
  const scalePercent = value / 100;
  const imageUploadPreview = document.querySelector('.img-upload__preview');
  const image = imageUploadPreview.querySelector('img');
  image.style.transform = `scale(${scalePercent})`;
};

const renderZoomControlValue = (value) => {
  const scaleControlValue = imgUploadPopup.querySelector('.scale__control--value');
  scaleControlValue.value = `${value}%`;
  scaleImage(zoomValue);
};


const zoomOut = () => {
  zoomValue -= SCALE_STEP;
  renderZoomControlValue(zoomValue);
  disableButton(zoomValue);
};

const zoomIn = () => {
  zoomValue += SCALE_STEP;
  renderZoomControlValue(zoomValue);
  disableButton(zoomValue);
};


const addZoomController = () => {
  zoomValue = MAX_SCALE;
  scaleControlSmaller.addEventListener('click', zoomOut);
  scaleControlBigger.addEventListener('click', zoomIn);
  renderZoomControlValue(zoomValue);
  disableButton(zoomValue);
};


addZoomController();


export { addZoomController };
