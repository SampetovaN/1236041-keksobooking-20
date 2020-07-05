'use strict';
(function () {
  var minX = Math.round(window.utils.map.getBoundingClientRect().x) + window.utils.MainPinSize.RADIUS;
  var maxX = minX + window.utils.MapRect.RIGHT;
  var minY = window.utils.MapRect.TOP - window.utils.MainPinSize.HEIGHT;
  var maxY = window.utils.MapRect.BOTTOM - window.utils.MainPinSize.HEIGHT;
  var getXCoordinate = function (x) {
    if (x < minX) {
      return -window.utils.MainPinSize.RADIUS;
    } else if (x > maxX) {
      return window.utils.MapRect.RIGHT - window.utils.MainPinSize.RADIUS;
    }
    return x - minX;
  };
  var getYCoordinate = function (y) {
    if (y < minY) {
      return minY;
    } else if (y > maxY) {
      return maxY;
    }
    return y - window.utils.MainPinSize.RADIUS;
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
