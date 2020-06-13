'use strict';
(function () {
  var turnOnPage = function () {
    if (!window.utils.isMapOn) {
      window.utils.isMapOn = true;
      window.map.turnOn();
      window.form.turnOn();
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

})();

