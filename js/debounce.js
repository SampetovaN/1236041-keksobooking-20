'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;

  window.debounce = function (onTimeout) {
    var lastTimeoutId = 0;
    return function () {
      var parameters = arguments;
      if (lastTimeoutId > 0) {
        window.clearTimeout(lastTimeoutId);
      }
      lastTimeoutId = window.setTimeout(function () {
        onTimeout.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
