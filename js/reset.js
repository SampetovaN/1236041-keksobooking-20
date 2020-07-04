'use strict';
(function () {
  var CoordinatesMainPin = {
    LEFT: 570,
    TOP: 375
  };
  var resetMainPin = function () {
    var mainPinStyle = window.utils.mainPin.style;
    mainPinStyle.left = CoordinatesMainPin.LEFT + 'px';
    mainPinStyle.top = CoordinatesMainPin.TOP + 'px';
    window.move.formatMainPinAddress(false);
  };
  var resetPage = function () {
    resetMainPin();
    window.filter.reset();
    window.form.reset();
    window.card.remove();
    window.pin.remove();
    window.utils.map.classList.add('map--faded');
  };
  window.reset = {
    page: resetPage
  };
})();
