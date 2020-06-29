'use strict';
(function () {
  var onMainPinMouseDown = function (evt) {
    window.utils.isLeftMouseButton(evt, turnOnPage);
  };

  var onMainPinEnterKeyDown = function (evt) {
    window.utils.isEnterEvent(evt, turnOnPage);
  };

  window.utils.mainPin.addEventListener('mousedown', onMainPinMouseDown);
  window.utils.mainPin.addEventListener('keydown', onMainPinEnterKeyDown);
  var turnOnPage = function () {
    window.map.turnOn();
    window.form.turnOn();
    window.utils.mainPin.removeEventListener('mousedown', onMainPinMouseDown);
    window.utils.mainPin.removeEventListener('keydown', onMainPinEnterKeyDown);
  };
})();

