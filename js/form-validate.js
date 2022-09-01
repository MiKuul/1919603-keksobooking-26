import {updateSlider} from './slider.js';

const form = document.querySelector('.ad-form');
const title = document.querySelector('#title');
const price = document.querySelector('#price');
const type = document.querySelector('#type');
const checkin = document.querySelector('#timein');
const checkout = document.querySelector('#timeout');
const rooms = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

const pristine = new Pristine(form, {
  classTo: 'ad-form',
  errorClass: 'ad-form__error',
  errorTextParent: 'ad-form',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__text-error',
});

// валидируем заголовок
const validateTitle = (value) => 30 <= value.length && value.length <= 100;

//устанавливаем цену
let newValue = 0;
const setPrice = (value) => {
  switch(value) {
    case 'flat': newValue = 1000; break;
    case 'bungalow': newValue = 0; break;
    case 'house': newValue = 5000; break;
    case 'palace': newValue = 10000; break;
    case 'hotel': newValue = 3000; break;
  }

  price.setAttribute('min', newValue);
  price.setAttribute('placeholder', newValue);
  updateSlider(newValue);
};

setPrice(type.value);

type.addEventListener('change', () => {
  setPrice(type.value);
});

// валидируем цену
const validatePrice = (value) => newValue < value && value <= 100000;

//устанавливаем время заезда согласно времени выезда
checkin.addEventListener('change', () => {
  checkout.value = checkin.value;
});
checkout.addEventListener('change', () => {
  checkin.value = checkout.value;
});

//сравниваем кол-во гостей с кол-вом комнат
const compareGuestsAndRooms = () => {
  switch(rooms.value) {
    case '1': return capacity.value === '1';
    case '2': return capacity.value === '1' || capacity.value === '2';
    case '3': return capacity.value === '1' || capacity.value === '2' || capacity.value === '3';
    case '100': return capacity.value === '0';
    default: return false;
  }
};

compareGuestsAndRooms();

pristine.addValidator(
  title,
  validateTitle,
  'Размер комментария - от 30 до 100 символов'
);

pristine.addValidator(
  rooms,
  compareGuestsAndRooms,
  'Некорректное отношение кол-ва гостей к кол-ву комнат'
);

pristine.addValidator(
  price,
  validatePrice,
  'Минимальные цены: дворец - 10 000, дом - 5 000, отель - 3 000, комната - 1 000, Максимальная цена - 100 000'
);

pristine.addValidator(
  capacity,
  compareGuestsAndRooms,
  'Некорректное отношение кол-ва гостей к кол-ву комнат'
);

pristine.validate();

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


