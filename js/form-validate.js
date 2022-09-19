import {updateSlider} from './slider.js';
import './form.js';
import {showMarkers, mainAdress, mainPinMarker} from './map.js';
import {filterData} from './filter.js';

const TYPES = ['jpg', 'jpeg', 'png'];
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_BUNGALOW_PRICE = 0;
const MIN_FLAT_PRICE = 1000;
const MIN_HOTEL_PRICE = 3000;
const MIN_HOUSE_PRICE = 5000;
const MIN_PALACE_PRICE = 10000;
const MAX_PLACE_PRICE = 100000;


const form = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');
const title = document.querySelector('#title');
const price = document.querySelector('#price');
const type = document.querySelector('#type');
const checkin = document.querySelector('#timein');
const checkout = document.querySelector('#timeout');
const rooms = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const submitButton = document.querySelector('.ad-form__submit');
const resetButton = document.querySelector('.ad-form__reset');
const checkboxes = document.querySelectorAll('.map__checkbox');
const avatar = document.querySelector('#avatar');
const housePhoto = document.querySelector('#images');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imagePlace = document.querySelector('.ad-form__photo');

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return TYPES.some((it) => fileName.endsWith(it));
};

const changeAvatar = () => {
  const file = avatar.files[0];
  if (file && isValidType(file)) {
    avatarPreview.src = URL.createObjectURL(file);
  }
};

const changeImage = () => {
  const file = housePhoto.files[0];
  if (file && isValidType(file)) {
    const img = document.createElement('img');
    img.style.width = 'inherit';
    img.style.height = 'inherit';
    img.src = '';
    imagePlace.appendChild(img);
    img.src = URL.createObjectURL(file);
  }
};

avatar.addEventListener('change', () => {
  changeAvatar();
});

housePhoto.addEventListener('change', () => {
  changeImage();
});

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__error',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__text-error',
});

const validateTitle = (value) => MIN_TITLE_LENGTH <= value.length && value.length <= MAX_TITLE_LENGTH;

let newValue = 0;
const setPrice = (value) => {
  switch(value) {
    case 'flat': newValue = MIN_FLAT_PRICE; break;
    case 'bungalow': newValue = MIN_BUNGALOW_PRICE; break;
    case 'house': newValue = MIN_HOUSE_PRICE; break;
    case 'palace': newValue = MIN_PALACE_PRICE; break;
    case 'hotel': newValue = MIN_HOTEL_PRICE; break;
  }

  price.setAttribute('min', newValue);
  price.setAttribute('placeholder', newValue);
  updateSlider(newValue);
};

setPrice(type.value);

type.addEventListener('change', () => {
  setPrice(type.value);
});

const validatePrice = (value) => newValue <= value && value <= MAX_PLACE_PRICE;

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

export const reset = () => {
  filtersForm.reset();
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  showMarkers(filterData());
  avatarPreview.src = 'img/muffin-grey.svg';
  imagePlace.querySelectorAll('img').forEach((it) => it.remove());
  mainPinMarker.setLatLng([35.6895, 139.692]).update();
  mainAdress.value = '35.6895, 139.692';
  form.reset();
};

resetButton.addEventListener('click', () => {
  reset();
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

export const setOnFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(form));
      unblockSubmitButton();
    }
  });
};


