const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const cardList = document.querySelector('#map-canvas');
const photoTemplate = cardTemplate.querySelector('.popup__photo');

// установим тип жилья
const setType = (value) => {
  switch(value) {
    case 'flat' : return 'Квартира';
    case 'bungalow': return 'Бунгало';
    case 'house': return 'Дом';
    case 'palace': return 'Дворец';
    case 'hotel': return 'Отель';
  }
};

// добавим фотографии жилья
const addPhotos = (arr, photoList) => {
  const fragment = document.createDocumentFragment();
  arr.forEach((it) => {
    const photo = photoTemplate.cloneNode(true);
    photo.src = it;
    fragment.appendChild(photo);
  });
  photoList.appendChild(fragment);
};

// создадим и заполним карточку объявления
export const createCard = (obj) => {
  const {offer, author} = obj;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.adress;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = setType(offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardElement.querySelector('.popup__features').textContent = offer.features;
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__photo').remove();

  addPhotos(offer.photos, cardElement.querySelector('.popup__photos'));

  cardElement.querySelector('.popup__avatar').src = author.avatar;

  // if (cardElement.textContent === '') {
  //   cardElement.classList.add('visually-hidden');
  // }
  return cardElement;
};

// зальем карточку объявления
export const renderCard = (arr) => {
  const fragment = document.createDocumentFragment();
  arr.forEach((it) => {
    fragment.appendChild(createCard(it));
  });
  cardList.appendChild(fragment);
};

