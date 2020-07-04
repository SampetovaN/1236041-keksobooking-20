'use strict';

(function () {
  var onFilterChange = null;
  var filterForm = window.utils.map.querySelector('.map__filters');
  var filterValidAdvert = function (advert) {
    return advert.offer && advert.location;
  };
  var setOnFilterChange = function (onChange) {
    onFilterChange = onChange;
  };
  var checkOption = function (evt, advert) {
    if (evt.target.id === 'housing-type' && evt.target.value !== 'any') {
      return advert.offer.type === evt.target.value;
    }
    return true;
  };
  var onFilterFormChange = function (evt) {
    if (window.utils.isFunction(onFilterChange)) {
      onFilterChange(evt);
    }
  };

  filterForm.addEventListener('change', onFilterFormChange);

  var resetFilter = function () {
    filterForm.reset();
  };
  window.filter = {
    checkOption: checkOption,
    setOnChange: setOnFilterChange,
    checkAdvert: filterValidAdvert,
    reset: resetFilter
  };
})();
