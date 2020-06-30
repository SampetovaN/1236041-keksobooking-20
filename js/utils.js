'use strict';

(function () {
  var MapRect = {
    LEFT: 0,
    RIGHT: 1200,
    TOP: 130,
    BOTTOM: 630,
  };
  var StylePin = {
    PINS: '.map__pin:not(.map__pin--main)',
    PIN_ACTIVE: 'map__pin--active'
  };
  var LEFT_MOUSE_BUTTON = 0;
  var ENTER_BUTTON = 'Enter';
  var ESCAPE_BUTTON = 'Escape';
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  window.utils = {
    MapRect: MapRect,
    map: map,
    StylePin: StylePin,
    mainPin: mainPin,
    setDisabled: function (element) {
      element.disabled = true;
    },
    unsetDisabled: function (element) {
      element.disabled = false;
    },
    isLeftMouseButton: function (evt, action) {
      if (evt.button === LEFT_MOUSE_BUTTON) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_BUTTON) {
        action(evt);
      }
    },
    isEscEvent: function (evt, action) {
      if (evt.key === ESCAPE_BUTTON) {
        evt.preventDefault();
        action();
      }
    },
    isFunction: function (value) {
      return typeof value === 'function';
    },
    removeElement: function (element) {
      element.remove();
    }
  };
})();
