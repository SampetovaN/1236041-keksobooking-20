'use strict';
(function () {
  var MAX_ADVERTS = 5;
  var filterFormElements = window.utils.map.querySelector('.map__filters').childNodes;
  var advertForm = document.querySelector('.ad-form');
  var successElement = null;
  var main = document.querySelector('main');
  var activatePage = function () {
    window.load(onLoadSuccess, window.error.load);
    window.form.turnOn();
  };
  var setOnFirstClick = activatePage;
  var preventTurnOnPage = function () {
    if (window.utils.isFunction(setOnFirstClick)) {
      setOnFirstClick();
      setOnFirstClick = null;
    }
  };
  var unactivatePage = function () {
    window.reset.page();
    window.utils.mainPin.addEventListener('keydown', onMainPinEnterKeyDown);
    setOnFirstClick = activatePage;
    filterFormElements.forEach(window.utils.setDisabled);
  };
  var onMainPinEnterKeyDown = function (evt) {
    window.utils.isEnterEvent(evt, turnOnPage);
  };
  var onMainPinMouseDown = function (evt) {
    window.utils.isLeftMouseButton(evt, turnOnPage);
    window.move.mouse();
  };
  var onLoadSuccess = function (adverts) {
    adverts = adverts.filter(window.filter.checkAdvert);
    window.utils.map.classList.remove('map--faded');
    window.map.addPins(adverts.slice(0, MAX_ADVERTS));
    filterFormElements.forEach(window.utils.unsetDisabled);
    window.filter.setOnChange(function (evt) {
      var filteredAdverts = [];
      for (var i = 0; i < adverts.length; i++) {
        if (window.filter.checkOption(evt, adverts[i])) {
          filteredAdverts.push(adverts[i]);
          if (filteredAdverts.length === MAX_ADVERTS) {
            break;
          }
        }
      }
      window.pin.remove();
      window.map.addPins(filteredAdverts);
      window.card.remove();
    });
  };
  filterFormElements.forEach(window.utils.setDisabled);
  window.utils.mainPin.addEventListener('mousedown', onMainPinMouseDown);
  window.utils.mainPin.addEventListener('keydown', onMainPinEnterKeyDown);
  var turnOnPage = function () {
    preventTurnOnPage();
    window.utils.mainPin.removeEventListener('keydown', onMainPinEnterKeyDown);
  };
  var onEscKeyDown = function (evt) {
    window.utils.isEscEvent(evt, removeSuccessMessage);
  };
  var onUploadSuccess = function () {
    successElement = document.querySelector('#success')
      .content
      .querySelector('.success')
      .cloneNode(true);
    main.append(successElement);
    main.addEventListener('click', removeSuccessMessage);
    main.addEventListener('keydown', onEscKeyDown);
  };
  var removeSuccessMessage = function () {
    successElement.remove();
    successElement = null;
    main.removeEventListener('click', removeSuccessMessage);
    main.removeEventListener('keydown', onEscKeyDown);
    unactivatePage();
  };

  advertForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(advertForm), onUploadSuccess, window.error.upload);
    evt.preventDefault();
  });

  advertForm.addEventListener('reset', function () {
    unactivatePage();
  });

})();
