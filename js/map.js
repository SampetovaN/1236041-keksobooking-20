'use strict';

(function () {
  var filterContainer = window.utils.map.querySelector('.map__filters-container');
  var addCard = function (renderFunction, advertIndex) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderFunction(window.data.adverts[advertIndex]));
    window.utils.map.insertBefore(fragment, filterContainer);
  };
  var addPins = function (renderFunction) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.adverts.length; i++) {
      fragment.appendChild(renderFunction(window.data.adverts[i]));
    }
    window.utils.mapPins.appendChild(fragment);
  };

  var removeCard = function () {
    var cardPopup = window.utils.map.querySelector('.map__card.popup');
    if (cardPopup) {
      cardPopup.parentNode.removeChild(cardPopup);
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === window.utils.ESCAPE_BUTTON) {
      evt.preventDefault();
      removeCard();
    }
  };

  var turnOnMap = function () {
    window.utils.map.classList.remove('map--faded');
    addPins(window.pin.render);
  };

  var filterPins = function (collection) {
    var filterChildren = [].slice.call(collection)
      .filter(function (elem) {
        return elem.className === 'map__pin';
      });
    return filterChildren;
  };

  var findIndexPin = function (pin, pins) {
    for (var i = 0; i < pins.length; i++) {
      if (pin === pins[i]) {
        return i;
      }
    }
    return null;
  };


  window.map = {
    turnOn: turnOnMap,
    addCard: addCard,
    filterPins: filterPins,
    findIndexPin: findIndexPin,
    removeCard: removeCard,
    onPopupEscPress: onPopupEscPress
  };
})();
