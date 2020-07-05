'use strict';

(function () {
  var ERROR_TIMEOUT_MS = 2000;
  var onLoadError = function (errorMessage) {
    var errorBlock = document.createElement('div');
    var style = errorBlock.style;
    style.zIndex = '100';
    style.margin = 'auto';
    style.textAlign = 'center';
    style.backgroundColor = 'red';
    style.position = 'absolute';
    style.left = 0;
    style.right = 0;
    style.fontSize = '30px';
    style.top = '40%';
    errorBlock.textContent = errorMessage;
    window.utils.map.append(errorBlock);
    setTimeout(window.utils.removeElement, ERROR_TIMEOUT_MS, errorBlock);
  };
  window.error = {
    onLoad: onLoadError
  };
})();
