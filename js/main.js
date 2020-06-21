'use strict';
(function () {
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

  var onInserted = function () {
    cards = window.utils.map.querySelectorAll('.map__card');
    pins = window.utils.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    setPinId(pins);
  };

  var turnOnPage = function () {
    if (!window.utils.isMapOn) {
      window.utils.isMapOn = true;
      window.map.turnOn();
      window.form.turnOn();
      document.addEventListener('DOMNodeInserted', onInserted);
    }
  };

  var onKeyDown = function (evt) {
    if (evt.key === window.utils.ESCAPE_BUTTON) {
      evt.preventDefault();
      closeAdvert();
    }
  };

  var openAdvert = function (evt) {
    document.removeEventListener('DOMNodeInserted', onInserted);
    var closest = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (closest) {
      var tempPinId = Number(closest.dataset.id);
      if (pinClicked) {
        pinClicked.classList.remove('map__pin--active');
      }
      pinClicked = closest;
      pinClicked.classList.add('map__pin--active');
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
    pinClicked.classList.remove('map__pin--active');
    pinId = null;
    document.removeEventListener('keydown', onKeyDown);
  };

  window.utils.turnBlocks(window.utils.advertFormBlocks, window.utils.disableBlock);
  window.utils.turnBlocks(window.utils.filterFormBlocks, window.utils.disableBlock);
  window.utils.advertAddress.value = window.form.formatMainPinAddress(window.utils.isMapOn);
  window.utils.mainPin.addEventListener('mousedown', function (evt) {
    window.utils.isClickEvent(evt, turnOnPage);

  });
  window.utils.mainPin.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, turnOnPage);
  });
  window.utils.mapPins.addEventListener('click', function (evt) {
    openAdvert(evt);
  });
  window.utils.mapPins.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ENTER_BUTTON) {
      openAdvert(evt);
    }
  });
  window.utils.map.addEventListener('click', function (evt) {
    if (evt.target.className === 'popup__close') {
      closeAdvert(evt);
    }
  });
})();

