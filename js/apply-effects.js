const effectsList = document.querySelector('.effects__list');
const imageUploadPreview = document.querySelector('.img-upload__preview');
const image = imageUploadPreview.querySelector('img');

const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelStorage = document.querySelector('.effect-level__value');
let effectLevel = 0;

let effectValue;

const EFFECT_SETTING_MAP = {
  chrome: {
    updateSliderOptions: {
      range: {
        'min': 0,
        'max': 1,
      },
      start: 1,
      step: 0.1,
    },
    effect: (level) => `grayscale(${level})`
  },

  sepia: {
    updateSliderOptions: {
      range: {
        'min': 0,
        'max': 1,
      },
      start: 1,
      step: 0.1,
    },
    effect: (level) => `sepia(${level})`
  },

  marvin: {
    updateSliderOptions: {
      range: {
        'min': 0,
        'max': 100,
      },
      start: 100,
      step: 1,
    },
    effect: (level) => `invert(${level}%)`
  },

  phobos: {
    updateSliderOptions: {
      range: {
        'min': 0,
        'max': 3,
      },
      start: 3,
      step: 0.1,
    },
    effect: (level) => `blur(${level}px)`
  },

  heat: {
    updateSliderOptions: {
      range: {
        'min': 1,
        'max': 3,
      },
      start: 3,
      step: 0.1,
    },
    effect: (level) => `brightness(${level})`
  }

};


noUiSlider.create(sliderElement, {
  range: {
    'min': 0,
    'max': 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

function addEffectsController() {
  effectsList.addEventListener('click', (evt) => {
    const target = evt.target;
    const effectItem = target.closest('.effects__radio');

    if (effectItem) {
      effectValue = effectItem.value;
    }

    if (effectValue !== 'none') {
      sliderElement.classList.remove('hidden');
    } else {
      sliderElement.classList.add('hidden');
    }

    image.className = '';
    image.classList.add(`effects__preview--${effectValue}`);


    const effectSettings = EFFECT_SETTING_MAP[effectValue];

    if (effectSettings) {
      sliderElement.noUiSlider.updateOptions(effectSettings.updateSliderOptions);
    }


    sliderElement.noUiSlider.on('update', () => {
      effectLevel = sliderElement.noUiSlider.get();
      effectLevelStorage.value = effectLevel;
      image.style.filter = effectSettings ? effectSettings.effect(effectLevel) : '';
    });

  });
}

// removeEffectsController для удаления эффектов у картинки

function removeEffectsController() {
  image.className = '';
  sliderElement.noUiSlider.updateOptions({
    start: 100,
  });
  image.style.filter = 'none';
}

export { addEffectsController, removeEffectsController };
