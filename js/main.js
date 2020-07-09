'use strict';
(function () {
  var MAX_ADVERTS = 5;
  var ERROR_TIMEOUT_MS = 2000;
  var filterFormInputs = window.utils.map.querySelector('.map__filters').childNodes;
  var advertForm = document.querySelector('.ad-form');
  var filterValidAdvert = function (advert) {
    return advert.offer && advert.location;
  };
  var onMainPinFirstMouseDown = function (evt) {
    window.utils.isLeftMouseButton(evt, turnOnPage);
  };
  var onMainPinEnterKeyDown = function (evt) {
    window.utils.isEnterEvent(evt, turnOnPage);
  };
  var onMainPinMouseDown = function () {
    window.motion.moveMouse();
  };
  var onLoadError = function (errorMessage) {
    var errorBlock = window.message.showLoadError(errorMessage);
    window.utils.map.append(errorBlock);
    setTimeout(window.utils.removeElement, ERROR_TIMEOUT_MS, errorBlock);
  };
  var onLoadSuccess = function (adverts) {
    adverts = adverts.filter(filterValidAdvert);
    var advertsMap = adverts.slice(0, MAX_ADVERTS);
    window.map.addPins(advertsMap);
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
        window.map.addPins(advertsMap);
      }
    });
  };

  var deactivatePage = function () {
    window.update.resetPage();
    window.utils.mainPin.addEventListener('keydown', onMainPinEnterKeyDown);
    window.utils.mainPin.addEventListener('mousedown', onMainPinFirstMouseDown);
    filterFormInputs.forEach(window.utils.setDisabled);
  };
  filterFormInputs.forEach(window.utils.setDisabled);
  window.utils.mainPin.addEventListener('mousedown', onMainPinMouseDown);
  window.utils.mainPin.addEventListener('mousedown', onMainPinFirstMouseDown);
  window.utils.mainPin.addEventListener('keydown', onMainPinEnterKeyDown);

  var turnOnPage = function () {
    window.load(onLoadSuccess, onLoadError);
    window.utils.map.classList.remove('map--faded');
    window.form.turnOn();
    window.utils.mainPin.removeEventListener('mousedown', onMainPinFirstMouseDown);
    window.utils.mainPin.removeEventListener('keydown', onMainPinEnterKeyDown);
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

  advertForm.addEventListener('reset', function () {
    deactivatePage();
  });

})();
