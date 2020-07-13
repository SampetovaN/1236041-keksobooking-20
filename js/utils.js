'use strict';

(function () {
  var TIMEOUT_MS = 10000;
  var MainPinSize = {
    HEIGHT: 83,
    RADIUS: Math.round(65 / 2)
  };
  var MapRect = {
    LEFT: 160,
    RIGHT: 1200,
    TOP: 130,
    BOTTOM: 630
  };
  var StylePin = {
    PINS: '.map__pin:not(.map__pin--main)',
    PIN_ACTIVE: 'map__pin--active'
  };
  var LEFT_MOUSE_BUTTON = 0;
  var ENTER_BUTTON = 'Enter';
  var ESCAPE_BUTTON = 'Escape';
  window.utils = {
    MainPinSize: MainPinSize,
    MapRect: MapRect,
    StylePin: StylePin,
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
        action(evt);
      }
    },
    isClickEvent: function (evt, action) {
      if (evt.target.tagName !== 'P') {
        action();
      }
    },
    isFunction: function (value) {
      return typeof value === 'function';
    },
    removeElement: function (element) {
      element.remove();
    },
    setUpRequest: function (url, xhr, onSuccess, onError) {
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onSuccess(xhr.response);
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_MS;
    }
  };
})();
