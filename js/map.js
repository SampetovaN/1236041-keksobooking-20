'use strict';

(function () {
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
      window.card.render(window.utils.map, advert);
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
    window.utils.map.append.apply(window.utils.map, adverts.map(renderPin));
  };

  window.map = {
    addPins: addPins
  };
})();
