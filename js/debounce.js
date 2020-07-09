'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 300;

  window.debounce = function (onTimeout) {
    var lastTimeout = 0;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        onTimeout.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
