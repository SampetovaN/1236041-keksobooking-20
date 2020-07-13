'use strict';
(function () {
  var MAX_ADVERTS = 5;
  var ERROR_TIMEOUT_MS = 2000;
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var filterFormInputs = map.querySelector('.map__filters').childNodes;
  var advertForm = document.querySelector('.ad-form');
  var resetFormButton = advertForm.querySelector('.ad-form__reset');
  var filterValidAdvert = function (advert) {
    return advert.offer && advert.location;
  };
  var onMainPinFirstMouseDown = function (evt) {
    window.utils.isLeftMouseButton(evt, turnOnPage);
  };
  var onMainPinEnterKeyDown = function (evt) {
    window.utils.isEnterEvent(evt, turnOnPage);
  };
  var onMainPinMouseDown = function (evt) {
    window.motion.moveMouse(evt);
  };
  var onLoadError = function (errorMessage) {
    var errorBlock = window.message.showLoadError(errorMessage);
    map.append(errorBlock);
    setTimeout(window.utils.removeElement, ERROR_TIMEOUT_MS, errorBlock);
  };
  var onLoadSuccess = function (adverts) {
    adverts = adverts.filter(filterValidAdvert);
    var permanentAdverts = adverts.slice(0, MAX_ADVERTS);
    window.map.addPins(permanentAdverts);
    filterFormInputs.forEach(window.utils.unsetDisabled);
    window.filter.setOnChange(function () {
      window.pin.remove();
      window.card.remove();
      var values = window.filterValues.collect();
      var filteredAdverts = [];
      if (values) {
        for (var i = 0; i < adverts.length; i++) {
          var advert = adverts[i];
          if (window.filter.checkOption(values, advert)) {
            filteredAdverts.push(advert);
            if (filteredAdverts.length === MAX_ADVERTS) {
              break;
            }
          }
        }
        window.map.addPins(filteredAdverts);
      } else {
        window.map.addPins(permanentAdverts);
      }
    });
  };

  var deactivatePage = function () {
    window.update.resetPage();
    mainPin.addEventListener('keydown', onMainPinEnterKeyDown);
    mainPin.addEventListener('mousedown', onMainPinFirstMouseDown);
    filterFormInputs.forEach(window.utils.setDisabled);
  };
  filterFormInputs.forEach(window.utils.setDisabled);
  mainPin.addEventListener('mousedown', onMainPinMouseDown);
  mainPin.addEventListener('mousedown', onMainPinFirstMouseDown);
  mainPin.addEventListener('keydown', onMainPinEnterKeyDown);

  var turnOnPage = function () {
    window.load(onLoadSuccess, onLoadError);
    map.classList.remove('map--faded');
    window.form.turnOn();
    mainPin.removeEventListener('mousedown', onMainPinFirstMouseDown);
    mainPin.removeEventListener('keydown', onMainPinEnterKeyDown);
  };
  var onUploadSuccess = function () {
    window.message.showUploadSuccess();
    deactivatePage();
  };

  var onUploadError = function () {
    window.message.showUploadError();
  };

  advertForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(advertForm), onUploadSuccess, onUploadError);
    evt.preventDefault();
  });

  resetFormButton.addEventListener('click', function () {
    deactivatePage();
  });

})();
