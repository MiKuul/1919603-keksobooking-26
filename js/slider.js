const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');

const priceValue = Number(valueElement.getAttribute('min'));

noUiSlider.create(sliderElement, {
  range: {
    min: priceValue,
    max: 100000,
  },
  start: priceValue,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});

export const updateSlider = (value) => {
  sliderElement.noUiSlider.updateOptions(
    {
      range: {
        min: value,
        max: 100000,
      },
      start: value,
    },
    true
  );
};
