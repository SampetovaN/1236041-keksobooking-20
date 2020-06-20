'use strict';

(function () {
  var filterContainer = window.utils.map.querySelector('.map__filters-container');
  var createFragment = function (adverts, renderFunction) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adverts.length; i++) {
      if (adverts[i].offer) {
        fragment.appendChild(renderFunction(adverts[i]));
      }
    }
    return fragment;
  };
  var addCards = function (adverts) {
    window.utils.map.insertBefore(createFragment(adverts, window.card.render), filterContainer);
  };
  var addPins = function (adverts) {
    window.utils.mapPins.appendChild(createFragment(adverts, window.pin.render));
  };
  var removeCard = function () {
    var cardPopup = window.utils.map.querySelector('.map__card.popup');
    if (cardPopup) {
      cardPopup.parentNode.removeChild(cardPopup);
    }

  };

  var errorHandler = function (errorMessage) {
    var errorBlock = document.createElement('div');
    errorBlock.style = 'z-index: 100; margin: auto; text-align: center; background-color: red;';
    errorBlock.style.position = 'absolute';
    errorBlock.style.left = 0;
    errorBlock.style.right = 0;
    errorBlock.style.fontSize = '30px';
    errorBlock.style.top = '40%';
    errorBlock.textContent = errorMessage;
    window.utils.map.insertBefore(errorBlock, window.utils.mapPins);
  };

  var successHandler = function (adverts) {
    addCards(adverts);
    addPins(adverts);
  };

  var turnOnMap = function () {
    window.utils.map.classList.remove('map--faded');
    window.load(successHandler, errorHandler);
  };

  var setPinId = function (elements) {
    [].slice.call(elements)
      .map(function (element, index) {
        element.dataset.id = index;
      });
  };

  window.map = {
    turnOn: turnOnMap,
    addCards: addCards,
    setPinId: setPinId,
    removeCard: removeCard,
  };
})();
