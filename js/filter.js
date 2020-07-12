'use strict';

(function () {
  var PriceValue = {
    HIGH: 50000,
    LOW: 10000,
  };
  var PriceRange = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
  };
  var onFilterChange = null;
  var filterForm = window.utils.map.querySelector('.map__filters');

  var setOnFilterChange = function (onChange) {
    onFilterChange = onChange;
  };

  var checkFacilitiesEqual = function (facilities, facilityValues) {
    var checkIncluded = function (element) {
      return facilities.includes(element);
    };
    return facilityValues.every(checkIncluded);
  };

  var checkLowPrice = function (price) {
    return PriceValue.LOW >= price;
  };
  var checkHighPrice = function (price) {
    return price >= PriceValue.HIGH;
  };
  var checkMiddlePrice = function (price) {
    return PriceValue.LOW <= price && price <= PriceValue.HIGH;
  };
  var checkPriceEqual = function (price, priceToCompare) {
    var isPriceEqual;
    switch (priceToCompare) {
      case PriceRange.MIDDLE:
        isPriceEqual = checkMiddlePrice(price);
        break;
      case PriceRange.LOW:
        isPriceEqual = checkLowPrice(price);
        break;
      case PriceRange.HIGH:
        isPriceEqual = checkHighPrice(price);
    }
    return isPriceEqual;
  };

  var checkRoomFeature = function (feature, featureToCompare) {
    return feature === featureToCompare;
  };
  var compareParameters = function (parameter, option, compareFunction) {
    return (!option && option !== 0 || option.isNaN) ? true : compareFunction(parameter, option);
  };
  var checkOption = function (values, advert) {
    var offer = advert.offer;
    var parameters = [[offer.features, values.features, checkFacilitiesEqual], [offer.price, values.price, checkPriceEqual],
      [offer.type, values.type, checkRoomFeature], [offer.rooms, Number(values.rooms), checkRoomFeature], [offer.guests, Number(values.guests), checkRoomFeature]];
    var checkParameter = function (element) {
      return compareParameters(element[0], element[1], element[2]);
    };
    return parameters.every(checkParameter);
  };
  var onFilterFormChange = window.debounce(function () {
    if (window.utils.isFunction(onFilterChange)) {
      onFilterChange();
    }
  });

  filterForm.addEventListener('change', onFilterFormChange);
  var resetFilter = function () {
    filterForm.reset();
  };
  window.filter = {
    checkOption: checkOption,
    setOnChange: setOnFilterChange,
    reset: resetFilter,
  };
})();
