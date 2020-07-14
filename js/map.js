'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinContainer = map.querySelector('.map__pins');
  var onEscKeyDown = function (evt) {
    window.utils.isEscEvent(evt, window.card.remove);
  };
  var renderPin = function (advert) {
    var pin = window.pin.render(advert);
    pin.addEventListener('click', function () {
      if (pin.classList.contains(window.utils.StylePin.PIN_ACTIVE)) {
        return;
      }
      window.card.remove();
      window.card.render(map, advert);
      pin.classList.add(window.utils.StylePin.PIN_ACTIVE);
      window.card.setOnRemove(function () {
        pin.classList.remove(window.utils.StylePin.PIN_ACTIVE);
        document.removeEventListener('keydown', onEscKeyDown);
      });
      document.addEventListener('keydown', onEscKeyDown);
    });

    return pin;
  };

  var addPins = function (adverts) {
    pinContainer.append.apply(pinContainer, adverts.map(renderPin));
  };
  var resetMap = function () {
    map.classList.add('map--faded');
  };

  window.map = {
    addPins: addPins,
    reset: resetMap
  };
})();
