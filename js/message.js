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
  var showLoadError = function (errorMessage) {
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
    return errorBlock;
  };

  var renderMessage = function (block) {
    main.append(block);
    block.tabIndex = 1;
    block.focus();
    var removeUploadMessage = function () {
      block.remove();
      document.removeEventListener('keydown', onEscDownUploadMessage);
    };
    var onClickUploadMessage = function (evt) {
      window.utils.isClickEvent(evt, removeUploadMessage);
    };
    var onEscDownUploadMessage = function (evt) {
      window.utils.isEscEvent(evt, removeUploadMessage);
    };
    document.addEventListener('keydown', onEscDownUploadMessage);
    block.addEventListener('click', onClickUploadMessage);
  };

  var showUploadSuccess = function () {
    renderMessage(successUploadBlock);
  };
  var showUploadError = function () {
    renderMessage(errorUploadBlock);
  };
  window.message = {
    showLoadError: showLoadError,
    showUploadError: showUploadError,
    showUploadSuccess: showUploadSuccess
  };
})();
