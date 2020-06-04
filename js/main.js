'use strict';

var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var mapPins = document.querySelector('.map__pins');
var PinSize = {
  HEIGHT: 70,
  RADIUS: 50 / 2,
};
var START_Y = 0;
var START_X = 130;
var finishX = mapPins.clientWidth;
var FINISH_Y = 630;
var maxCoordinateX = finishX - PinSize.RADIUS;

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArray = function (elements) {
  var maxLength = elements.length - 1;
  var minLength = 1;
  return elements.slice(elements.length - getRandomNumber(minLength, maxLength));
};

var getRandomElement = function (elements) {
  var lastElement = elements.length - 1;
  var firstElement = 0;
  return elements[getRandomNumber(firstElement, lastElement)];
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

document.querySelector('.map').classList.remove('map--faded');
var adverts = generateAdverts();

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

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


var addElements = function (renderFunction) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(renderFunction(adverts[i]));
  }
  mapPins.appendChild(fragment);
};

addElements(renderPin);


