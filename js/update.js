'use strict';
(function () {
  var mainPinStyle = document.querySelector('.map__pin--main').style;
  var CoordinatesMainPin = {
    LEFT: 570,
    TOP: 375
  };

  var resetMainPin = function () {
    mainPinStyle.left = CoordinatesMainPin.LEFT + 'px';
    mainPinStyle.top = CoordinatesMainPin.TOP + 'px';
  };
  var resetPage = function () {
    resetMainPin();
    window.filter.reset();
    window.form.reset();
    window.card.remove();
    window.pin.remove();
    window.map.reset();
  };
  window.update = {
    resetPage: resetPage
  };
})();
