'use strict';

var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var PinSize = {
  HEIGHT: 70,
  RADIUS: 50 / 2,
};
var START_Y = 0;
var START_X = 130;
var finishX = mapPins.clientWidth;
var FINISH_Y = 630;
var FIRST_ELEMENT = 0;
var maxCoordinateX = finishX - PinSize.RADIUS;
var ROOM_ENDINGS = ['комната', 'комнаты', 'комнат'];
var GUEST_ENDINGS = ['гостя', 'гостей'];
var MainPinSize = {
  HEIGHT: 83,
  RADIUS: 65 / 2,
};

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArray = function (elements) {
  var maxElement = elements.length;
  return elements.slice(getRandomNumber(FIRST_ELEMENT, maxElement));
};

var getRandomElement = function (elements) {
  var maxElement = elements.length - 1;
  return elements[getRandomNumber(FIRST_ELEMENT, maxElement)];
};

var getHouseTranslation = function (element) {
  switch (element) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    default:
      return 'Квартира';
  }
};

var getWordEnding = function (number, forms) {
  var ending = '';
  var numberCheck = number % 100;
  var startTeen = 11;
  var endTeen = 19;
  if (numberCheck >= startTeen && numberCheck <= endTeen) {
    ending = forms[2];
  } else {
    var result = numberCheck % 10;
    switch (result) {
      case (1):
        ending = forms[0];
        break;
      case (2):
      case (3):
      case (4):
        ending = forms[1];
        break;
      default:
        ending = forms[2] || forms[1];
    }
  }
  return number + ' ' + ending;
};

var generateAdverts = function () {
  var adverts = [];
  for (var i = 1; i <= 8; i++) {
    var locationX = getRandomNumber(START_X, finishX);
    var locationY = getRandomNumber(START_Y, FINISH_Y);
    var object = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png',
      },
      offer: {
        title: 'заголовок предложения',
        address: locationX + ', ' + locationY,
        price: i,
        type: getRandomElement(HOUSE_TYPES),
        rooms: i,
        guests: i,
        checkin: getRandomElement(TIMES),
        checkout: getRandomElement(TIMES),
        features: getRandomArray(FEATURES),
        description: 'строка с описанием',
        photos: getRandomArray(PHOTOS),
      },
      location: {
        x: locationX,
        y: locationY,
      },
    };
    adverts.push(object);
  }

  return adverts;
};

var getMaxCoordinate = function (coordinate, maxCoordinate) {
  return coordinate > maxCoordinate ? maxCoordinate : coordinate;
};

var adverts = generateAdverts();
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var renderPin = function (advert) {
  var pinClone = pinTemplate.cloneNode(true);
  var image = pinClone.querySelector('img');
  var finalX = getMaxCoordinate(advert.location.x + PinSize.RADIUS, maxCoordinateX);
  var finalY = getMaxCoordinate(advert.location.y + PinSize.HEIGHT, FINISH_Y);
  image.src = advert.author.avatar;
  image.alt = advert.offer.title;
  pinClone.style.left = finalX + 'px';
  pinClone.style.top = finalY + 'px';
  return pinClone;
};


var generateFeatures = function (items) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < items.length; i++) {
    var newItem = document.createElement('li');
    newItem.className = 'popup__feature popup__feature--' + items[i];
    fragment.appendChild(newItem);
  }
  return fragment;
};

var renderPhoto = function (item, photo) {
  var clonePhoto = photo.cloneNode(true);
  clonePhoto.src = item;
  return clonePhoto;
};

var generatePhotos = function (items, photo) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < items.length; i++) {
    fragment.appendChild(renderPhoto(items[i], photo));
  }
  return fragment;
};

var hideBlock = function (block) {
  var childrenAmount = block.children.length;
  block.style.display = childrenAmount === 0 ? 'none' : '';
};

var renderCard = function (advert) {
  var cardClone = cardTemplate.cloneNode(true);
  var featuresContainer = cardClone.querySelector('.popup__features');
  var photosContainer = cardClone.querySelector('.popup__photos');
  var photo = cardClone.querySelector('.popup__photo');
  featuresContainer.innerHTML = '';
  photosContainer.innerHTML = '';
  featuresContainer.appendChild(generateFeatures(advert.offer.features));
  photosContainer.appendChild(generatePhotos(advert.offer.photos, photo));
  hideBlock(featuresContainer);
  hideBlock(photosContainer);
  cardClone.querySelector('.popup__title').textContent = advert.offer.title;
  cardClone.querySelector('.popup__text--address').textContent = advert.offer.address;
  cardClone.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
  cardClone.querySelector('.popup__type').textContent = getHouseTranslation(advert.offer.type);
  cardClone.querySelector('.popup__text--capacity').textContent = getWordEnding(advert.offer.rooms, ROOM_ENDINGS) + ' для ' + getWordEnding(advert.offer.guests, GUEST_ENDINGS);
  cardClone.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  cardClone.querySelector('.popup__description').textContent = advert.offer.description;
  cardClone.querySelector('.popup__avatar').src = advert.author.avatar;
  return cardClone;
};

var addPins = function (renderFunction) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(renderFunction(adverts[i]));
  }
  mapPins.appendChild(fragment);
};

var addCards = function (renderFunction) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderFunction(adverts[0]));
  map.insertBefore(fragment, filterContainer);
};

var notice = document.querySelector('.notice');
var advertForm = notice.querySelector('.ad-form');
var filterContainer = map.querySelector('.map__filters-container');
var filterForm = filterContainer.querySelector('.map__filters');
var advertFormBlocks = advertForm.children;
var filterFormBlocks = filterForm.children;
var mainPin = mapPins.querySelector('.map__pin--main');
var advertAddress = advertForm.querySelector('#address');
var isMapOn = false;

var disableBlock = function (block) {
  block.setAttribute('disabled', 'disabled');
};

var enableBlock = function (block) {
  block.removeAttribute('disabled');
};

var turnBlocks = function (blocks, turnFunction) {
  for (var i = 0; i < blocks.length; i++) {
    turnFunction(blocks[i]);
  }
};

var generatePinAddress = function (isTurnOn) {
  var top = parseInt(mainPin.style.top, 10);
  var addressTop = top + (isTurnOn ? MainPinSize.RADIUS : MainPinSize.HEIGHT);
  var addressLeft = parseInt(mainPin.style.left, 10) + MainPinSize.RADIUS;
  return Math.round(addressTop) + ' ' + Math.round(addressLeft);
};

turnBlocks(advertFormBlocks, disableBlock);
turnBlocks(filterFormBlocks, disableBlock);
advertAddress.value = generatePinAddress(isMapOn);


var turnOnMap = function () {
  if (!isMapOn) {
    isMapOn = true;
    map.classList.remove('map--faded');
    addCards(renderCard);
    addPins(renderPin);
    advertAddress.value = generatePinAddress(isMapOn);
    turnBlocks(advertFormBlocks, enableBlock);
    turnBlocks(filterFormBlocks, enableBlock);
  }
};

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    turnOnMap();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    turnOnMap();
  }
});


