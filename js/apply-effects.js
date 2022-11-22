const form = document.querySelector('.img-upload__form');
const effectsList = form.querySelector('.effects__list');
const image = form.querySelector('.img-upload__preview img');
const sliderContainer = form.querySelector('.img-upload__effect-level');

const sliderElement = form.querySelector('.effect-level__slider');
const effectLevelStorage = form.querySelector('.effect-level__value');
let effectLevel = 0;

sliderElement.hidden = true;
sliderContainer.hidden = true;

const createSliderOption = (min = 0, max = 100, step = 1) => (
  {
    range: { min, max },
    start: max,
    step,
  }
);

const EFFECT_SETTING_MAP = {
  none: {
    sliderOptions: createSliderOption(),
  },

  chrome: {
    sliderOptions: createSliderOption(0, 1, 0.1),
    effect: (level) => `grayscale(${level})`
  },

  sepia: {
    sliderOptions: createSliderOption(0, 1, 0.1),
    effect: (level) => `sepia(${level})`
  },

  marvin: {
    sliderOptions: createSliderOption(),
    effect: (level) => `invert(${level}%)`
  },

  phobos: {
    sliderOptions: createSliderOption(0, 3, 0.1),
    effect: (level) => `blur(${level}px)`
  },

  heat: {
    sliderOptions: createSliderOption(1, 3, 0.1),
    effect: (level) => `brightness(${level})`
  }
};


noUiSlider.create(sliderElement, {
  ...EFFECT_SETTING_MAP.none.sliderOptions,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  const effectValue = form.effect.value;
  const effectSettings = EFFECT_SETTING_MAP[effectValue];

  effectLevel = sliderElement.noUiSlider.get();
  effectLevelStorage.value = effectLevel;
  image.style.filter = effectSettings.effect ? effectSettings.effect(effectLevel) : '';
});


const addEffectsController = () => {
  effectsList.addEventListener('input', () => {
    const effectValue = form.effect.value;

    sliderElement.hidden = effectValue === 'none';
    sliderContainer.hidden = effectValue === 'none';

    image.className = '';
    image.classList.add(`effects__preview--${effectValue}`);

    const effectSettings = EFFECT_SETTING_MAP[effectValue];
    sliderElement.noUiSlider.updateOptions(effectSettings.sliderOptions);
  });
};


/** для удаления эффектов у картинки */
const resetEffects = () => {
  image.className = '';
  sliderElement.noUiSlider.updateOptions({
    ...EFFECT_SETTING_MAP.none.sliderOptions,
  });
  image?.style.removeProperty('filter');
  sliderElement.hidden = true;
  sliderContainer.hidden = true;
};


export { addEffectsController, resetEffects };
