const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const cardList = document.querySelector('#map-canvas');
const photoTemplate = cardTemplate.querySelector('.popup__photo');
const featureTemplate = cardTemplate.querySelector('.popup__feature');

const setType = (value) => {
  switch(value) {
    case 'flat' : return 'Квартира';
    case 'bungalow': return 'Бунгало';
    case 'house': return 'Дом';
    case 'palace': return 'Дворец';
    case 'hotel': return 'Отель';
  }
};

const addPhotos = (arr, photoList) => {
  const fragment = document.createDocumentFragment();
  arr.forEach((it) => {
    const photo = photoTemplate.cloneNode(true);
    photo.src = it;
    fragment.appendChild(photo);
  });
  photoList.appendChild(fragment);
};

const addFeatures = (arr, featureList) => {
  const fragment = document.createDocumentFragment();
  arr.forEach((it) => {
    const feature = featureTemplate.cloneNode(true);
    feature.classList.remove('popup__feature--wifi');
    feature.classList.add(`popup__feature--${it}`);
    fragment.appendChild(feature);
  });
  featureList.appendChild(fragment);
};

export const createCard = (obj) => {
  const {offer, author} = obj;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.adress;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = setType(offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardTemplate.querySelectorAll('.popup__feature').forEach((it) => it.remove());
  if (offer.features !== undefined) {
    addFeatures(offer.features, cardElement.querySelector('.popup__features'));
  }
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__photo').remove();

  if (offer.photos !== undefined) {
    addPhotos(offer.photos, cardElement.querySelector('.popup__photos'));
  }

  cardElement.querySelector('.popup__avatar').src = author.avatar;

  return cardElement;
};

export const renderCard = (arr) => {
  const fragment = document.createDocumentFragment();
  arr.forEach((it) => {
    fragment.appendChild(createCard(it));
  });
  cardList.appendChild(fragment);
};

