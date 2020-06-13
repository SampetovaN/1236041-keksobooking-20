'use strict';

(function () {
  var PinSize = {
    HEIGHT: 70,
    RADIUS: 50 / 2,
  };
  var maxCoordinateX = window.utils.finishX - PinSize.RADIUS;
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var getMaxCoordinate = function (coordinate, maxCoordinate) {
    return coordinate > maxCoordinate ? maxCoordinate : coordinate;
  };
  var renderPin = function (advert) {
    var pinClone = pinTemplate.cloneNode(true);
    var image = pinClone.querySelector('img');
    var finalX = getMaxCoordinate(advert.location.x + PinSize.RADIUS, maxCoordinateX);
    var finalY = getMaxCoordinate(advert.location.y + PinSize.HEIGHT, window.utils.FINISH_Y);
    image.src = advert.author.avatar;
    image.alt = advert.offer.title;
    pinClone.style.left = finalX + 'px';
    pinClone.style.top = finalY + 'px';
    return pinClone;
  };

  window.pin = {
    renderPin: renderPin
  };
})();
