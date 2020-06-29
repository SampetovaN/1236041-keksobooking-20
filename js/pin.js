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
    var finalX = advert.location.x - PinSize.RADIUS;
    var finalY = advert.location.y - PinSize.HEIGHT;
    image.src = advert.author.avatar;
    image.alt = advert.offer.title;
    pin.style.left = finalX + 'px';
    pin.style.top = finalY + 'px';
    return pin;
  };

  window.pin = {
    render: renderPin
  };
})();
