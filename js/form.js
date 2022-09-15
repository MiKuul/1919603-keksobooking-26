import {sliderElement} from './slider.js';

const form = document.querySelector('.ad-form');
const formInput = document.querySelectorAll('.ad-form input');
const formFilters = document.querySelector('.map__filters');
const filtersInput = document.querySelectorAll('.map__filters');
export const filters = document.querySelectorAll('.map__filter');

// блокируем активность формы
export const blockform = () => {
  form.classList.add('ad-form--disabled');
  formInput.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
  sliderElement.setAttribute('disabled', true);
  formFilters.classList.add('map__filters--disabled');
  filtersInput.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
  filters.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

// разблокируем активность формы
export const activeForm = () => {
  form.classList.remove('ad-form--disabled');
  formInput.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
  sliderElement.removeAttribute('disabled', true);
  formFilters.classList.remove('map__filters--disabled');
  filtersInput.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
  filters.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
};
