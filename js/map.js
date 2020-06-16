'use strict';

(function () {
  var filterContainer = window.utils.map.querySelector('.map__filters-container');
  var addCard = function (renderFunction, advertIndex) {
    var card = renderFunction(window.data.adverts[advertIndex]);
    window.utils.map.insertBefore(card, filterContainer);
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

  var turnOnMap = function () {
    window.utils.map.classList.remove('map--faded');
    addPins(window.pin.render);
  };

  var setPinId = function (elements) {
    [].slice.call(elements)
      .map(function (element, index) {
        element.dataset.id = index;
      });
  };


  window.map = {
    turnOn: turnOnMap,
    addCard: addCard,
    setPinId: setPinId,
    removeCard: removeCard,
  };
})();
