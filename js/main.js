'use strict';
(function () {
  var Style = {
    PINS: '.map__pin:not(.map__pin--main)',
    PIN_ACTIVE: 'map__pin--active'
  };
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
  var onMainPinMouseDown = function (evt) {
    window.utils.isLeftMouseButton(evt, turnOnPage);
  };

  var onMainPinEnterKeyDown = function (evt) {
    window.utils.isEnterEvent(evt, turnOnPage);
  };

  window.utils.mainPin.addEventListener('mousedown', onMainPinMouseDown);
  window.utils.mainPin.addEventListener('keydown', onMainPinEnterKeyDown);
  var turnOnPage = function () {
    if (!window.common.isMapOn) {
      window.common.isMapOn = true;
      window.map.turnOn();
      window.form.turnOn();
      document.addEventListener('DOMNodeInserted', function () {
        cards = window.utils.map.querySelectorAll('.map__card');
        pins = window.utils.mapPins.querySelectorAll(Style.PINS);
        setPinId(pins);
      });
      window.utils.mainPin.removeEventListener('mousedown', onMainPinMouseDown);
      window.utils.mainPin.removeEventListener('keydown', onMainPinEnterKeyDown);
    }
  };

  var onKeyDown = function (evt) {
    window.utils.isEscEvent(evt, closeAdvert);
  };

  var openAdvert = function (evt) {
    var closest = evt.target.closest(Style.PINS);
    if (closest) {
      var tempPinId = Number(closest.dataset.id);
      if (pinClicked) {
        pinClicked.classList.remove(Style.PIN_ACTIVE);
      }
      pinClicked = closest;
      pinClicked.classList.add(Style.PIN_ACTIVE);
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
    pinClicked.classList.remove(Style.PIN_ACTIVE);
    pinId = null;
    pinClicked = null;
    openCard = null;
    document.removeEventListener('keydown', onKeyDown);
  };

  window.utils.turnBlocks(window.utils.advertFormBlocks, window.utils.disableBlock);
  window.utils.turnBlocks(window.utils.filterFormBlocks, window.utils.disableBlock);
  window.utils.advertAddress.value = window.form.formatMainPinAddress(window.common.isMapOn);
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

