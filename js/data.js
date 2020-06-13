'use strict';

(function () {
  var START_Y = 0;
  var START_X = 130;
  var FIRST_ELEMENT = 0;
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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

  var generateAdverts = function () {
    var adverts = [];
    for (var i = 1; i <= 8; i++) {
      var locationX = getRandomNumber(START_X, window.utils.finishX);
      var locationY = getRandomNumber(START_Y, window.utils.FINISH_Y);
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
  var adverts = generateAdverts();
  window.data = {
    adverts: adverts
  };
})();
