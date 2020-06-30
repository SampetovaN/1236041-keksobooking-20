'use strict';
(function () {
  var MAX_ADVERTS = 5;
  var filterFormBlocks = window.utils.map.querySelector('.map__filters').childNodes;
  var onMainPinMouseDown = function (evt) {
    window.utils.isLeftMouseButton(evt, turnOnPage);
  };

  var onMainPinEnterKeyDown = function (evt) {
    window.utils.isEnterEvent(evt, turnOnPage);
  };
  var onLoadSuccess = function (adverts) {
    window.utils.map.classList.remove('map--faded');
    window.map.addPins(adverts.slice(0, MAX_ADVERTS));
    filterFormBlocks.forEach(window.utils.unsetDisabled);
    window.filter.setOnChange(function (evt) {
      var filteredAdverts = [];
      for (var i = 0; i < adverts.length; i++) {
        if (window.filter.checkOption(evt, adverts[i])) {
          filteredAdverts.push(adverts[i]);
          if (filteredAdverts.length === MAX_ADVERTS) {
            break;
          }
        }
      }
      window.pin.remove();
      window.map.addPins(filteredAdverts);
      window.card.remove();
    });
  };
  filterFormBlocks.forEach(window.utils.setDisabled);
  window.utils.mainPin.addEventListener('mousedown', onMainPinMouseDown);
  window.utils.mainPin.addEventListener('keydown', onMainPinEnterKeyDown);
  var turnOnPage = function () {
    window.load(onLoadSuccess, window.error.load);
    window.form.turnOn();
    window.utils.mainPin.removeEventListener('mousedown', onMainPinMouseDown);
    window.utils.mainPin.removeEventListener('keydown', onMainPinEnterKeyDown);
  };
})();

