'use strict';

(function () {
  var ERROR_TIMEOUT_MS = 2000;
  var errorElement = null;
  var main = document.querySelector('main');
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
    window.utils.map.classList.remove('map--faded');
    setTimeout(window.utils.removeElement, ERROR_TIMEOUT_MS, errorBlock);
  };

  var removeErrorMessage = function () {
    errorElement.remove();
    errorElement = null;
    main.removeEventListener('click', removeErrorMessage);
    main.removeEventListener('keydown', onEscKeyDown);
  };

  var onEscKeyDown = function (evt) {
    window.utils.isEscEvent(evt, removeErrorMessage);
  };
  var onUploadError = function () {
    errorElement = document.querySelector('#error')
      .content
      .querySelector('.error')
      .cloneNode(true);
    main.append(errorElement);
    main.addEventListener('click', removeErrorMessage);
    main.addEventListener('keydown', onEscKeyDown);

  };
  window.error = {
    load: onLoadError,
    upload: onUploadError
  };
})();
