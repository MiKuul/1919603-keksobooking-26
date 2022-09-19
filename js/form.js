import {sliderElement} from './slider.js';

const form = document.querySelector('.ad-form');
const formInput = document.querySelectorAll('.ad-form input');
const formFilters = document.querySelector('.map__filters');
const filters = document.querySelectorAll('.map__filter');

export const blockform = () => {
  form.classList.add('ad-form--disabled');
  formInput.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
  sliderElement.setAttribute('disabled', true);
  formFilters.classList.add('map__filters--disabled');
  filters.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

export const activateForm = () => {
  form.classList.remove('ad-form--disabled');
  formInput.forEach((element) => {
    element.removeAttribute('disabled');
  });
  sliderElement.removeAttribute('disabled');
  formFilters.classList.remove('map__filters--disabled');
  filters.forEach((element) => {
    element.removeAttribute('disabled');
  });
};
