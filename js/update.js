'use strict';
(function () {
  var CoordinatesMainPin = {
    LEFT: 570,
    TOP: 375
  };

  var resetMainPin = function () {
    window.utils.mainPinStyle.left = CoordinatesMainPin.LEFT + 'px';
    window.utils.mainPinStyle.top = CoordinatesMainPin.TOP + 'px';
  };
  var resetPage = function () {
    resetMainPin();
    window.filter.reset();
    window.form.reset();
    window.card.remove();
    window.pin.remove();
    window.utils.map.classList.add('map--faded');
  };
  window.update = {
    resetPage: resetPage
  };
})();
