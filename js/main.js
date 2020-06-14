'use strict';
(function () {
  var filteredPins = [];
  var indexClickedPin;
  var pinClicked;

  var turnOnPage = function () {
    if (!window.utils.isMapOn) {
      window.utils.isMapOn = true;
      window.map.turnOn();
      window.form.turnOn();
      filteredPins = window.map.filterPins(window.utils.mapPins.children);
    }
  };


  var pinOpen = function (evt) {
    var targetPin = evt.target;
    if (targetPin.parentNode.className === 'map__pin' || targetPin.className === 'map__pin') {
      if (pinClicked) {
        pinClicked.classList.remove('map__pin--active');
      }
      if (targetPin.parentNode.className === 'map__pin') {
        pinClicked = targetPin.parentNode;
      } else {
        pinClicked = targetPin;
      }
      if (indexClickedPin !== window.map.findIndexPin(pinClicked, filteredPins)) {
        indexClickedPin = window.map.findIndexPin(pinClicked, filteredPins);
        pinClicked.classList.add('map__pin--active');
        window.map.removeCard();
        window.map.addCard(window.card.render, indexClickedPin);
      } else {
        evt.preventDefault();
      }
    }
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
    pinOpen(evt);
  });

  window.utils.mapPins.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, pinOpen);
  });

})();

