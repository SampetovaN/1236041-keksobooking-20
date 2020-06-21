'use strict';
(function () {
  var PINS_SELECTOR = '.map__pin:not(.map__pin--main)';
  var PIN_ACTIVE_SELECTOR = 'map__pin--active';
  var pinClicked;
  var pinId;
  var pins;
  var cards;
  var openCard;
  var setPinId = function (elements) {
    [].slice.call(elements)
      .map(function (element, index) {
        element.dataset.id = index;
      });
  };

  var findCard = function (elements, id) {
    var card;
    for (var i = 0; i < elements.length; ++i) {
      if (i === id) {
        card = elements[i];
        break;
      }
    }
    return card;
  };

  var turnOnPage = function () {
    if (!window.common.isMapOn) {
      window.common.isMapOn = true;
      window.map.turnOn();
      window.form.turnOn();
      document.addEventListener('DOMNodeInserted', function () {
        cards = window.utils.map.querySelectorAll('.map__card');
        pins = window.utils.mapPins.querySelectorAll(PINS_SELECTOR);
        setPinId(pins);
      });
    }
  };

  var onKeyDown = function (evt) {
    if (evt.key === window.common.ESCAPE_BUTTON) {
      evt.preventDefault();
      closeAdvert();
    }
  };

  var openAdvert = function (evt) {
    var closest = evt.target.closest(PINS_SELECTOR);
    if (closest) {
      var tempPinId = Number(closest.dataset.id);
      if (pinClicked) {
        pinClicked.classList.remove(PIN_ACTIVE_SELECTOR);
      }
      pinClicked = closest;
      pinClicked.classList.add(PIN_ACTIVE_SELECTOR);
      if (pinId && tempPinId !== pinId || !pinId) {
        if (typeof pinId !== 'undefined' && pinId !== null) {
          window.map.hideCard(findCard(cards, pinId));
        }
        pinId = tempPinId;
        openCard = findCard(cards, pinId);
        window.map.showCard(openCard);
      } else {
        evt.preventDefault();
      }
      document.addEventListener('keydown', onKeyDown);
    }
  };

  var closeAdvert = function () {
    window.map.hideCard(openCard);
    pinClicked.classList.remove(PIN_ACTIVE_SELECTOR);
    pinId = null;
    pinClicked = null;
    openCard = null;
    document.removeEventListener('keydown', onKeyDown);
  };

  window.utils.turnBlocks(window.utils.advertFormBlocks, window.utils.disableBlock);
  window.utils.turnBlocks(window.utils.filterFormBlocks, window.utils.disableBlock);
  window.utils.advertAddress.value = window.form.formatMainPinAddress(window.common.isMapOn);
  window.utils.mainPin.addEventListener('mousedown', function (evt) {
    window.utils.isLeftMouseButton(evt, turnOnPage);

  });
  window.utils.mainPin.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, turnOnPage);
  });
  window.utils.mapPins.addEventListener('click', function (evt) {
    openAdvert(evt);
  });
  window.utils.mapPins.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, openAdvert);
  });
  window.utils.map.addEventListener('click', function (evt) {
    if (evt.target.className === 'popup__close') {
      closeAdvert(evt);
    }
  });
})();

