'use strict';
(function () {
  var mainPinStyle = document.querySelector('.map__pin--main').style;
  var minX = window.utils.MapRect.LEFT + window.utils.MainPinSize.RADIUS;
  var maxX = minX + window.utils.MapRect.RIGHT;
  var minY = window.utils.MapRect.TOP - window.utils.MainPinSize.HEIGHT;
  var maxY = window.utils.MapRect.BOTTOM - window.utils.MainPinSize.HEIGHT;
  var getXCoordinate = function (x) {
    var resultX = x - minX;
    if (x < minX) {
      resultX = -window.utils.MainPinSize.RADIUS;
    }
    if (x > maxX) {
      resultX = window.utils.MapRect.RIGHT - window.utils.MainPinSize.RADIUS;
    }
    return resultX;
  };
  var getYCoordinate = function (y) {
    var resultY = y - window.utils.MainPinSize.RADIUS;
    if (y < minY) {
      resultY = minY;
    }
    if (y > maxY) {
      resultY = maxY;
    }
    return resultY;
  };

  var getPinCoordinates = function (x, y) {
    return {x: getXCoordinate(x), y: getYCoordinate(y)};
  };
  var moveMouse = function (evt) {
    evt.preventDefault();
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var coordinates = getPinCoordinates(moveEvt.pageX, moveEvt.pageY);
      mainPinStyle.top = coordinates.y + 'px';
      mainPinStyle.left = coordinates.x + 'px';
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
