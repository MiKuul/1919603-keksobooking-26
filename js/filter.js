import {showMarkers, markerGroup} from './map.js';
import {debounce} from './util.js';

const BALLOON_COUNT = 10;
const MAX_PRICE = 50000;
const MIN_PRICE = 10000;

const filterElement = document.querySelector('.map__filters');
const typeElement = document.querySelector('#housing-type');
const priceElement = document.querySelector('#housing-price');
const roomsElement = document.querySelector('#housing-rooms');
const guestsElement = document.querySelector('#housing-guests');

let mainData = [];

export const getMainData = (loadedAdds) => {
  mainData = loadedAdds;
  return mainData;
};

const checkByType = (obj) => {
  if (typeElement.value === 'any') {
    return true;
  }
  return typeElement.value === obj.offer.type;
};

const checkByPrice = (obj) => {
  if (priceElement.value === 'any') {
    return true;
  }
  switch (priceElement.value) {
    case 'middle': return obj.offer.price >= MIN_PRICE && obj.offer.price <= MAX_PRICE;
    case 'low': return obj.offer.price <= MIN_PRICE;
    case 'high': return obj.offer.price >= MAX_PRICE;
  }

};

const checkByRooms = (obj) => {
  if (roomsElement.value === 'any') {
    return true;
  }
  switch (roomsElement.value) {
    case '1': return obj.offer.rooms === 1;
    case '2': return obj.offer.rooms === 2;
    case '3': return obj.offer.rooms === 3;
  }
};

const checkByGuests = (obj) => {
  if (guestsElement.value === 'any') {
    return true;
  }
  switch (guestsElement.value) {
    case '2': return obj.offer.guests === 2;
    case '1': return obj.offer.guests === 1;
    case '0': return obj.offer.guests === 0;
  }
};

const checkByFeatures = (obj) => {
  const checked = document.querySelectorAll('.map__checkbox:checked');
  const checkedValues = Array.from(checked).map((item) => item.value);
  const features = (obj.offer.features !== undefined) ? obj.offer.features : [];
  return checkedValues.every((item) => features.includes(item));
};

export const filterData = () => {
  const results = [];
  for (let i = 0; i < mainData.length; i++) {
    const item = mainData[i];
    if (checkByType(item) && checkByPrice(item) && checkByRooms(item) && checkByGuests(item) && checkByFeatures(item)) {
      results.push(item);
    }

    if (results.length >= BALLOON_COUNT){
      break;
    }
  }

  return results;
};

const debouncedRenderAdds = debounce(showMarkers);

filterElement.addEventListener('change', () => {
  markerGroup.clearLayers();
  showMarkers(filterData());
  debouncedRenderAdds(filterData());
});
