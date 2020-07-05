'use strict';
(function () {
  var errorUploadBlock = document.querySelector('#error')
    .content
    .querySelector('.error')
    .cloneNode(true);
  var successUploadBlock = document.querySelector('#success')
    .content
    .querySelector('.success')
    .cloneNode(true);
  var main = document.querySelector('main');

  var onUploadMessage = function (block) {
    main.append(block);
    var onMainClick = function (evt) {
      if (evt.target.tagName !== 'P') {
        block.remove();
      }
      main.removeEventListener('keydown', onMainClick);
    };
    var onMainEscDown = function (evt) {
      window.utils.isEscEvent(evt, onMainClick);
    };
    main.addEventListener('keydown', onMainEscDown);
    block.addEventListener('click', onMainClick);
  };

  var onUploadSuccess = function () {
    onUploadMessage(successUploadBlock);
  };
  var onUploadError = function () {
    onUploadMessage(errorUploadBlock);
  };
  window.result = {
    onUploadSuccess: onUploadSuccess,
    onUploadError: onUploadError
  };
})();
