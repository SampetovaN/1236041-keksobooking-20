'use strict';

(function () {
  var ERROR_TIMEOUT_MS = 2000;
  var MAX_ADVERTS = 5;
  var filterContainer = window.utils.map.querySelector('.map__filters-container');
  var filterForm = filterContainer.querySelector('.map__filters');
  var filterFormBlocks = filterForm.children;
  var mapPins = window.utils.map.querySelector('.map__pins');
  var advertsMap = [];
  var loadedAdverts = [];
  var addCard = function (advertCard) {
    window.utils.map.insertBefore(advertCard, filterContainer);
  };
  var onLoadError = function (errorMessage) {
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
    window.utils.map.insertBefore(errorBlock, mapPins);
    setTimeout(window.utils.removeElement, ERROR_TIMEOUT_MS, errorBlock);
  };

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
      window.card.item = window.card.render(advert);
      addCard(window.card.item);
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
  var removePins = function () {
    window.utils.map.querySelectorAll(window.utils.StylePin.PINS).forEach(window.utils.removeElement);
  };
  var filterOfferAdverts = function (adverts) {
    var filteredAdverts = [];
    for (var i = 0; i < adverts.length; i++) {
      if (filteredAdverts.length === MAX_ADVERTS) {
        break;
      }
      if (adverts[i].offer && adverts[i].location) {
        filteredAdverts.push(adverts[i]);
      }
    }
    return filteredAdverts;
  };
  var onFilterChange = function (evt) {
    if (evt.target.id === 'housing-type') {
      if (evt.target.value === 'any') {
        addPins(advertsMap);
      } else {
        var filteredTypeAdverts = [];
        for (var i = 0; i < loadedAdverts.length; i++) {
          if (filteredTypeAdverts.length === MAX_ADVERTS) {
            break;
          }
          if (loadedAdverts[i].offer.type === evt.target.value) {
            filteredTypeAdverts.push(loadedAdverts[i]);
          }
        }
        removePins();
        addPins(filteredTypeAdverts);
      }
    }
    window.card.remove();
    window.card.setOnRemove(function () {
      window.utils.map.classList.remove(window.utils.StylePin.PIN_ACTIVE);
    });
  };
  var onLoadSuccess = function (adverts) {
    loadedAdverts = adverts;
    advertsMap = filterOfferAdverts(loadedAdverts);
    addPins(advertsMap);
    window.utils.turnElements(filterFormBlocks, window.utils.enableElement);
    filterForm.addEventListener('change', onFilterChange);
  };
  var turnOnMap = function () {
    window.utils.map.classList.remove('map--faded');
    window.load(onLoadSuccess, onLoadError);
  };
  window.utils.turnElements(filterFormBlocks, window.utils.disableElement);
  window.map = {
    turnOn: turnOnMap
  };
})();
