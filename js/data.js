import {getRandomPositiveInteger, getRandomArrayElement, getRandomPositiveFloat, getRandomArrayLength} from './util.js';

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const TIME = ['12:00', '13:00', '14:00'];

// создадим объект для последующего заполнения данными
const generateObj = (number) => {
  const location = {
    lat: getRandomPositiveFloat(35.65000, 35.70000),
    lng: getRandomPositiveFloat(139.10000, 139.80000),
  };
  const object = {
    author: {
      avatar: `img/avatars/user${String(number).padStart(2, '0')}.png`,
    },
    offer: {
      title: `Заголовок №${number}`,
      adress: `${location.lat}, ${location.lng}`,
      price: getRandomPositiveInteger (1000, 5000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger (1, 5),
      guests: getRandomPositiveInteger (1, 10),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: getRandomArrayLength(FEATURES),
      description: `Описание помещения №${number}`,
      photos: getRandomArrayLength(PHOTOS),
    },
    location: location,
  };
  return object;
};

// заполним массив созданными объектами для последюущего заполнения объектов данными
export const generateAds = (number) => {
  const arr = [];
  for (let i = 0; i < number; i++) {
    arr.push(generateObj(i + 1));
  }
  return arr;
};
