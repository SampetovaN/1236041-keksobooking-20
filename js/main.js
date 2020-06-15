'use strict';
(function () {
  var filteredPins = [];
  var pinClicked;
  var indexClickedPin;

  var turnOnPage = function () {
    if (!window.utils.isMapOn) {
      window.utils.isMapOn = true;
      window.map.turnOn();
      window.form.turnOn();
      filteredPins = window.map.filterPins(window.utils.mapPins.children);
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === window.utils.ESCAPE_BUTTON) {
      evt.preventDefault();
      advertClose();
    }
  };

  var advertOpen = function (evt) {
    var targetPin = evt.target;
    if (targetPin.parentNode.className === 'map__pin' || targetPin.className === 'map__pin') {
      if (pinClicked) {
        pinClicked.classList.remove('map__pin--active');
      }
      pinClicked = targetPin.parentNode.className === 'map__pin' ? targetPin.parentNode : targetPin;
      var indexPinTemp = window.map.findIndexPin(pinClicked, filteredPins);
      if (indexClickedPin !== indexPinTemp || !indexClickedPin) {
        indexClickedPin = indexPinTemp;
        pinClicked.classList.add('map__pin--active');
        window.map.removeCard();
        window.map.addCard(window.card.render, indexClickedPin);
      } else {
        evt.preventDefault();
      }
      document.addEventListener('keydown', onPopupEscPress);
    }

  };

  var advertClose = function () {
    window.map.removeCard();
    pinClicked.classList.remove('map__pin--active');
    indexClickedPin = null;
    document.removeEventListener('keydown', onPopupEscPress);
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
    advertOpen(evt);
  });

  window.utils.mapPins.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ENTER_BUTTON) {
      advertOpen(evt);
    }
  });

  window.utils.map.addEventListener('click', function (evt) {
    if (evt.target.className === 'popup__close') {
      advertClose(evt);
    }
  });
})();

