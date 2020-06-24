'use strict';

(function () {
  var ERROR_TIMEOUT_MS = 2000;
  var Style = {
    PINS: '.map__pin:not(.map__pin--main)',
    PIN_ACTIVE: 'map__pin--active',
  };
  var card = null;
  var onCardRemove = null;
  var filterContainer = window.utils.map.querySelector('.map__filters-container');

  var addCard = function (advertCard) {
    window.utils.map.insertBefore(advertCard, filterContainer);
  };

  var onError = function (errorMessage) {
    var errorBlock = document.createElement('div');
    var style = errorBlock.style;
    style.zIndex = '100';
    style.margin = 'auto';
    style.textAlign = 'center';
    style.backgroundColor = 'red';
    style.position = 'absolute';
    style.left = 0;
    style.right = 0;
    style.fontSize = '30px';
    style.top = '40%';
    errorBlock.textContent = errorMessage;
    window.utils.map.insertBefore(errorBlock, window.utils.mapPins);
    setTimeout(removeBlock, ERROR_TIMEOUT_MS, errorBlock);
  };
  var removeBlock = function (block) {
    block.remove();
    block = null;
  };

  var removeCard = function () {
    if (card === null) {
      return;
    }
    removeBlock(card);

    if (typeof onCardRemove === 'function') {
      onCardRemove();
      onCardRemove = null;
    }
  };

  var setOnCardRemove = function (onRemove) {
    onCardRemove = onRemove;
  };

  var onKeyDown = function (evt) {
    window.utils.isEscEvent(evt, removeCard);
  };
  var renderPin = function (advert) {
    var pin = window.pin.render(advert);
    pin.addEventListener('click', function () {
      if (pin.classList.contains(Style.PIN_ACTIVE)) {
        return;
      }
      removeCard();
      card = window.card.render(advert);
      addCard(card);
      pin.classList.add(Style.PIN_ACTIVE);
      setOnCardRemove(function () {
        pin.classList.remove(Style.PIN_ACTIVE);
        document.removeEventListener('keydown', onKeyDown);
      });

      document.addEventListener('keydown', onKeyDown);
    });

    return pin;
  };

  var addPins = function (adverts) {
    window.utils.map.append.apply(window.utils.map, adverts.map(renderPin));
  };
  var onSuccess = function (adverts) {
    addPins(adverts);
    window.utils.turnBlocks(window.utils.filterFormBlocks, window.utils.enableBlock);
  };

  var turnOnMap = function () {
    window.utils.map.classList.remove('map--faded');
    window.load(onSuccess, onError);
  };

  window.utils.map.addEventListener('click', function (evt) {
    if (evt.target.className === 'popup__close') {
      removeCard();
      window.utils.map.classList.remove(Style.PIN_ACTIVE);
    }
  });
  window.map = {
    turnOn: turnOnMap
  };
})();
