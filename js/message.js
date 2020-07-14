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
    var removeBlock = function () {
      block.remove();
      document.removeEventListener('keydown', onEscKeyDown);
    };
    var onClickBlock = function (evt) {
      window.utils.isClickEvent(evt, removeBlock);
    };
    var onEscKeyDown = function (evt) {
      window.utils.isEscEvent(evt, removeBlock);
    };
    document.addEventListener('keydown', onEscKeyDown);
    block.addEventListener('click', onClickBlock);
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
