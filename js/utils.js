'use strict';

(function () {
  var LEFT_MOUSE_BUTTON = 0;
  var ENTER_BUTTON = 'Enter';
  var ESCAPE_BUTTON = 'Escape';
  var TIMEOUT_MS = 10000;
  var MainPinSize = {
    HEIGHT: 83,
    RADIUS: Math.round(65 / 2),
  };
  var MapRect = {
    LEFT: 0,
    RIGHT: 1200,
    TOP: 130,
    BOTTOM: 630,
  };
  var StylePin = {
    PINS: '.map__pin:not(.map__pin--main)',
    PIN_ACTIVE: 'map__pin--active',
  };
  var setDisabled = function (element) {
    element.disabled = true;
  };
  var unsetDisabled = function (element) {
    element.disabled = false;
  };
  var isLeftMouseButton = function (evt, action) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      action();
    }
  };
  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_BUTTON) {
      action(evt);
    }
  };
  var isEscEvent = function (evt, action) {
    if (evt.key === ESCAPE_BUTTON) {
      evt.preventDefault();
      action(evt);
    }
  };
  var isClickEvent = function (evt, action) {
    if (evt.target.tagName !== 'P') {
      action();
    }
  };
  var isFunction = function (value) {
    return typeof value === 'function';
  };
  var removeElement = function (element) {
    element.remove();
  };
  var setUpRequest = function (url, xhr, onSuccess, onError) {
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
  };

  window.utils = {
    MainPinSize: MainPinSize,
    MapRect: MapRect,
    StylePin: StylePin,
    setDisabled: setDisabled,
    unsetDisabled: unsetDisabled,
    isLeftMouseButton: isLeftMouseButton,
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent,
    isClickEvent: isClickEvent,
    isFunction: isFunction,
    removeElement: removeElement,
    setUpRequest: setUpRequest
  };
})();
