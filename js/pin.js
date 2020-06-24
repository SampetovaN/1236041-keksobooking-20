'use strict';

(function () {
  var PinSize = {
    HEIGHT: 70,
    RADIUS: 50 / 2,
  };
  var maxCoordinateX = window.utils.MapRect.RIGHT - PinSize.RADIUS;
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var getMaxCoordinate = function (coordinate, maxCoordinate) {
    return coordinate > maxCoordinate ? maxCoordinate : coordinate;
  };
  var renderPin = function (advert) {
    var pin = pinTemplate.cloneNode(true);
    var image = pin.querySelector('img');
    var finalX = getMaxCoordinate(advert.location.x + PinSize.RADIUS, maxCoordinateX);
    var finalY = getMaxCoordinate(advert.location.y + PinSize.HEIGHT, window.utils.MapRect.BOTTOM);
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
