import {getRandomPositiveInteger, getRandomArrayElement, getRandomPositiveFloat, getRandomArrayLength} from './util.js';

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const TIME = ['12:00', '13:00', '14:00'];

const generateAvatar = (number) => {
  if ( number < 9) {
    return `img/avatars/user${0}${number + 1}.png`;
  } else {
    return `img/avatars/user${number + 1}.png`;
  }
};

export const generateAd = (number) => {
  const arr = [];
  for (let i = 0; i < number; i++) {
    arr.push({
      author: {
        avatar: generateAvatar(i),
      },
      offer: {
        title: `Заголовок №${i + 1}`,
        address: `${location.lat}, ${location.lng}`,
        price: getRandomPositiveInteger (1000, 5000),
        type: getRandomArrayElement(TYPES),
        rooms: getRandomPositiveInteger (1, 5),
        guests: getRandomPositiveInteger (1, 10),
        checkin: getRandomArrayElement(TIME),
        checkout: getRandomArrayElement(TIME),
        features: getRandomArrayLength(FEATURES),
        description: `Описание помещения №${i + 1}`,
        photos: getRandomArrayLength(PHOTOS),
      },
      location: {
        lat: getRandomPositiveFloat(35.65000, 35.70000),
        lng: getRandomPositiveFloat(139.70000, 139.80000),
      }
    });
  }
  return arr;
};
