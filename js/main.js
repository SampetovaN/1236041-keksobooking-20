'use strict';
(function () {
  var pinClicked;
  var pinId;

  var turnOnPage = function () {
    if (!window.utils.isMapOn) {
      window.utils.isMapOn = true;
      window.map.turnOn();
      window.form.turnOn();
      window.map.setPinId(window.utils.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)'));
    }
  };

  var onKeyDown = function (evt) {
    if (evt.key === window.utils.ESCAPE_BUTTON) {
      evt.preventDefault();
      closeAdvert();
    }
  };

  var openAdvert = function (evt) {
    var closest = evt.target.closest('.map__pin');
    if (closest && !closest.classList.contains('map__pin--main')) {
      var tempPinId = closest.dataset.id;
      if (pinClicked) {
        pinClicked.classList.remove('map__pin--active');
      }
      pinClicked = closest;
      pinClicked.classList.add('map__pin--active');
      if (pinId && tempPinId !== pinId || !pinId) {
        pinId = tempPinId;
        window.map.removeCard();
        window.map.addCard(window.card.render, pinId);
      } else {
        evt.preventDefault();
      }
      document.addEventListener('keydown', onKeyDown);
    }
  };

  var closeAdvert = function () {
    window.map.removeCard();
    pinClicked.classList.remove('map__pin--active');
    pinId = null;
    pinClicked = null;
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

