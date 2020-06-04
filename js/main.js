'use strict';

var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var mapPins = document.querySelector('.map__pins');
var pinSize = {
  HEIGHT: 70,
  RADIUS: 50 / 2
};
var pinCoordinate = {
  START_Y: 0,
  START_X: 130,
  maxCoordinateX: mapPins.clientWidth - (pinSize.RADIUS * 3),
  maxCoordinateY: 630 - pinSize.HEIGHT
};

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var renderRandomArray = function (elements) {
  var maxLength = elements.length - 1;
  var minLength = 1;
  return elements.slice(elements.length - getRandomNumber(minLength, maxLength));
};

var renderRandomElement = function (elements) {
  var lastElement = elements.length - 1;
  var firstElement = 0;
  return elements[getRandomNumber(firstElement, lastElement)];
};

var createArrayObjects = function () {
  var objects = [];
  for (var i = 1; i <= 8; i++) {
    var locationX = getRandomNumber(pinCoordinate.START_X, pinCoordinate.maxCoordinateX);
    var locationY = getRandomNumber(pinCoordinate.START_Y, pinCoordinate.maxCoordinateY);
    var object = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png',
      },
      'offer': {
        'title': 'заголовок предложения',
        'address': locationX + ', ' + locationY,
        'price': i,
        'type': renderRandomElement(HOUSE_TYPES),
        'rooms': i,
        'guests': i,
        'checkin': renderRandomElement(TIMES),
        'checkout': renderRandomElement(TIMES),
        'features': renderRandomArray(FEATURES),
        'description': 'строка с описанием',
        'photos': renderRandomArray(PHOTOS),
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
    objects.push(object);
  }

  return objects;
};

document.querySelector('.map').classList.remove('map--faded');
var pins = createArrayObjects();

var renderPin = function (pin) {
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var pinElement = similarPinTemplate.cloneNode(true);
  var pinImage = pinElement.querySelector('img');
  pinImage.src = pin.author.avatar;
  pinImage.alt = 'заголовок объявления';
  pinElement.style.left = pin.location.x + pinSize.RADIUS + 'px';
  pinElement.style.top = pin.location.y + pinSize.HEIGHT + 'px';
  return pinElement;
};


var paintElements = function (renderFunction) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderFunction(pins[i]));
  }
  mapPins.appendChild(fragment);
};

paintElements(renderPin);


