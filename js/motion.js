'use strict';
(function () {
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
  var moveMouse = function () {

    var onMouseMove = function (evt) {
      var coordinates = getPinCoordinates(evt.pageX, evt.pageY);
      window.utils.mainPinStyle.top = coordinates.y + 'px';
      window.utils.mainPinStyle.left = coordinates.x + 'px';
      window.form.formatMainPinAddress(true);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.formatMainPinAddress(true);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  window.motion = {
    moveMouse: moveMouse
  };
})();
