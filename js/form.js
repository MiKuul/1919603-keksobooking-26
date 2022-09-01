const form = document.querySelector('.ad-form');
const formInput = document.querySelectorAll('.ad-form input');
const formFilters = document.querySelector('.map__filters');
const filtersInput = document.querySelectorAll('.map__filters');
const filter = document.querySelectorAll('.map__filter');

// блокируем активность формы
const blockform = () => {
  form.classList.add('ad-form--disabled');
  formInput.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
  // заблокируем слайдер
  formFilters.classList.add('map__filters--disabled');
  filtersInput.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
  filter.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

// разблокируем активность формы
export const activeForm = () => {
  form.classList.remove('ad-form--disabled');
  formInput.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
  // разблокируем слайдер
  formFilters.classList.remove('map__filters--disabled');
  filtersInput.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
  filter.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
};

blockform();
