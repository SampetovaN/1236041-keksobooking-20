'use strict';

(function () {
  var PinSize = {
    HEIGHT: 70,
    RADIUS: 50 / 2
  };
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderPin = function (advert) {
    var pin = pinTemplate.cloneNode(true);
    var image = pin.querySelector('img');
    image.src = advert.author.avatar;
    image.alt = advert.offer.title;
    pin.style.left = (advert.location.x - PinSize.RADIUS) + 'px';
    pin.style.top = (advert.location.y - PinSize.HEIGHT) + 'px';
    return pin;
  };
  var removePins = function () {
    window.utils.map.querySelectorAll(window.utils.StylePin.PINS).forEach(window.utils.removeElement);
  };
  window.pin = {
    render: renderPin,
    remove: removePins
  };
})();
