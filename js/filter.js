'use strict';

(function () {
  var PriceValue = {
    HIGH_PRICE: 50000,
    LOW_PRICE: 10000,
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
    var isIncluded = function (element) {
      return facilities.includes(element);
    };
    return facilityValues.every(isIncluded);
  };

  var checkLowPrice = function (price) {
    return PriceValue.LOW_PRICE >= price;
  };
  var checkHighPrice = function (price) {
    return price >= PriceValue.HIGH_PRICE;
  };
  var checkMiddlePrice = function (price) {
    return PriceValue.LOW_PRICE <= price && price <= PriceValue.HIGH_PRICE;
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

  var checkOption = function (values, advert) {
    var offer = advert.offer;
    var isFacilitiesEqual = true;
    var isPriceEqual = true;
    var isTypeEqual = true;
    var isCapacityEqual = true;
    var isGuestsNumberEqual = true;
    if (values.features) {
      isFacilitiesEqual = checkFacilitiesEqual(offer.features, values.features);
      if (!isFacilitiesEqual) {
        return false;
      }
    }
    if (values.price) {
      isPriceEqual = checkPriceEqual(offer.price, values.price);
      if (!isPriceEqual) {
        return false;
      }
    }
    if (values.type) {
      isTypeEqual = checkRoomFeature(offer.type, values.type);

      if (!isTypeEqual) {
        return false;
      }
    }
    if (values.rooms) {
      isCapacityEqual = checkRoomFeature(offer.rooms, Number(values.rooms));

      if (!isCapacityEqual) {
        return false;
      }
    }
    if (values.guests) {
      isGuestsNumberEqual = checkRoomFeature(offer.guests, Number(values.guests));
      if (!isGuestsNumberEqual) {
        return false;
      }
    }
    return isFacilitiesEqual && isPriceEqual && isCapacityEqual && isGuestsNumberEqual && isTypeEqual;
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
