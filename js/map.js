import {activeForm} from './form.js';
import {createCard} from './card.js';

const mainAdress = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    console.log('Карта инициализирована'); // eslint-disable-line
    activeForm();
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

const mainPinMarker = L.marker(
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
mainPinMarker.on('moveend', (evt) => {
  const obj = evt.target.getLatLng();
  const latLng = Object.values(obj);
  mainAdress.value = `${latLng[0].toFixed(5)}, ${latLng[1].toFixed(5)}`;
});

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
      .addTo(map)
      .bindPopup(createCard(it));
  });
};
