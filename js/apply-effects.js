const effectsList = document.querySelector('.effects__list');
const imageUploadPreview = document.querySelector('.img-upload__preview');
const image = imageUploadPreview.querySelector('img');

let effectValue;

function addEffectsController() {
  effectsList.addEventListener('click', (evt) => {
    const target = evt.target;
    const effectItem = target.closest('.effects__radio');

    if (effectItem) {
      effectValue = effectItem.value;
    }

    image.className = '';
    image.classList.add(`effects__preview--${effectValue}`);
  });
}

// removeEffectsController для удаления класса у картинки

function removeEffectsController() {
  image.className = '';
}

export { addEffectsController, removeEffectsController };
