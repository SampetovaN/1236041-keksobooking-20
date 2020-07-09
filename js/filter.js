'use strict';

(function () {
  var HIGH_PRICE = 50000;
  var LOW_PRICE = 10000;
  var PriceValues = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };
  var onFilterChange = null;
  var filterForm = window.utils.map.querySelector('.map__filters');

  var setOnFilterChange = function (onChange) {
    onFilterChange = onChange;
  };

  var checkFacilitiesEqual = function (facilities, facilityValues) {
    var isIncluded = function (element) {
      return facilities.includes(element);
    };
    return facilityValues.every(isIncluded);
  };

  var checkPriceEqual = function (price, priceToCompare) {
    var isPriceEqual;
    switch (priceToCompare) {
      case PriceValues.MIDDLE:
        isPriceEqual = LOW_PRICE <= price && price <= HIGH_PRICE;
        break;
      case PriceValues.LOW:
        isPriceEqual = LOW_PRICE >= price;
        break;
      case PriceValues.HIGH:
        isPriceEqual = price >= HIGH_PRICE;
    }
    return isPriceEqual;
  };

  var checkRoomFeature = function (feature, featureToCompare) {
    return feature === featureToCompare;
  };

  var checkOption = function (values, advert) {
    var offer = advert.offer;
    var isFacilitiesEqual = true;
    var isPriceEqual = true;
    var isTypeEqual = true;
    var isCapacityEqual = true;
    var isGuestsNumberEqual = true;
    if (values.features) {
      isFacilitiesEqual = checkFacilitiesEqual(offer.features, values.features);
    }
    if (values.price) {
      isPriceEqual = checkPriceEqual(offer.price, values.price);
    }
    if (values.type) {
      isTypeEqual = checkRoomFeature(offer.type, values.type);
    }
    if (values.rooms) {
      isCapacityEqual = checkRoomFeature(offer.rooms, Number(values.rooms));
    }
    if (values.guests) {
      isGuestsNumberEqual = checkRoomFeature(offer.guests, Number(values.guests));
    }
    return isFacilitiesEqual && isPriceEqual && isCapacityEqual && isGuestsNumberEqual && isTypeEqual;
  };
  var onFilterFormChange = window.debounce(function (evt) {
    if (window.utils.isFunction(onFilterChange)) {
      onFilterChange(evt);
    }
  });

  filterForm.addEventListener('change', onFilterFormChange);
  var resetFilter = function () {
    filterForm.reset();
  };
  window.filter = {
    checkOption: checkOption,
    setOnChange: setOnFilterChange,
    reset: resetFilter
  };
})();
