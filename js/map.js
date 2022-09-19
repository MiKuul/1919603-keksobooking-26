import {createCard} from './card.js';
import {blockform, activateForm} from './form.js';

export const mainAdress = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
mainAdress.value = '35.6895, 139.692';

blockform();

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView({
    lat: 35.6895,
    lng: 139.692,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const adPinIcon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const mainPinMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);


mainPinMarker.addTo(map);
mainPinMarker.on('move', (evt) => {
  const obj = evt.target.getLatLng();
  const latLng = Object.values(obj);
  mainAdress.value = `${latLng[0].toFixed(5)}, ${latLng[1].toFixed(5)}`;
});

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng([35.6895, 139.692]).update();
  mainAdress.value = '35.6895, 139.692';
});

export const markerGroup = L.layerGroup().addTo(map);

export const showMarkers = (arr) => {
  arr.forEach((it) => {
    const {location} = it;
    const adPinMarker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: adPinIcon,
      },
    );

    adPinMarker
      .addTo(markerGroup)
      .bindPopup(createCard(it));
  });
};
