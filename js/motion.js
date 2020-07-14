'use strict';
(function () {
  var MainPinRect = {
    LEFT: window.utils.MapRect.LEFT - window.utils.MainPinSize.RADIUS,
    RIGHT: window.utils.MapRect.RIGHT - window.utils.MainPinSize.RADIUS,
    TOP: window.utils.MapRect.TOP - window.utils.MainPinSize.HEIGHT,
    BOTTOM: window.utils.MapRect.BOTTOM - window.utils.MainPinSize.HEIGHT,
  };
  var mainPin = document.querySelector('.map__pin--main');
  var clampNumber = function (value, min, max) {
    return Math.min(Math.max(value, min), max);
  };

  var moveMouse = function (evt) {
    evt.preventDefault();

    var startCoords = {
      y: mainPin.offsetTop - evt.clientY,
      x: mainPin.offsetLeft - evt.clientX,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var y = startCoords.y + moveEvt.clientY;
      var x = startCoords.x + moveEvt.clientX;

      var top = clampNumber(y, MainPinRect.TOP, MainPinRect.BOTTOM);
      var left = clampNumber(x, MainPinRect.LEFT, MainPinRect.RIGHT);

      mainPin.style.top = top + 'px';
      mainPin.style.left = left + 'px';
      window.form.formatMainPinAddress(true);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.form.formatMainPinAddress(true);
      document.removeEventListener('mousemove', onMouseMove);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp, {once: true});
  };

  window.motion = {
    moveMouse: moveMouse
  };
})();
