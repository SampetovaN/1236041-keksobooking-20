'use strict';
(function () {
  var MainPinSize = {
    HEIGHT: 83,
    RADIUS: Math.round(65 / 2)
  };
  var minX = Math.round(window.utils.map.getBoundingClientRect().x) + MainPinSize.RADIUS;
  var maxX = minX + window.utils.MapRect.RIGHT;
  var advertAddress = document.querySelector('#address');
  var formatMainPinAddress = function (isTurnOn) {
    var top = parseInt(window.utils.mainPin.style.top, 10);
    var addressTop = top + (isTurnOn ? MainPinSize.HEIGHT : MainPinSize.RADIUS);
    var addressLeft = parseInt(window.utils.mainPin.style.left, 10) + MainPinSize.RADIUS;
    advertAddress.value = Math.round(addressLeft) + ', ' + Math.round(addressTop);
  };
  formatMainPinAddress(false);
  var getXCoordinate = function (x) {
    if (x < minX) {
      x = -MainPinSize.RADIUS;
    } else if (x > maxX) {
      x = window.utils.MapRect.RIGHT - MainPinSize.RADIUS;
    } else {
      x = x - minX;
    }
    return x;
  };
  var getYCoordinate = function (y) {
    if (y < window.utils.MapRect.TOP) {
      y = window.utils.MapRect.TOP;
    } else if (y > window.utils.MapRect.BOTTOM) {
      y = window.utils.MapRect.BOTTOM;
    } else {
      y = y - MainPinSize.RADIUS;
    }
    return y;
  };

  var getPinCoordinates = function (x, y) {
    return {x: getXCoordinate(x), y: getYCoordinate(y)};
  };


  var moveMouse = function () {

    var onMouseMove = function (evt) {
      var coordinates = getPinCoordinates(evt.pageX, evt.pageY);
      window.utils.mainPin.style.top = coordinates.y + 'px';
      window.utils.mainPin.style.left = coordinates.x + 'px';
      formatMainPinAddress(true);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      formatMainPinAddress(true);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  window.move = {
    mouse: moveMouse,
    formatMainPinAddress: formatMainPinAddress
  };
})();
