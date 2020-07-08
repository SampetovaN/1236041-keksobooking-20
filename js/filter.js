'use strict';

(function () {
  var HIGH_PRICE = 50000;
  var LOW_PRICE = 10000;
  var onFilterChange = null;
  var filterForm = window.utils.map.querySelector('.map__filters');
  var filterInputs = Array.from(filterForm.children);
  var options = filterInputs.slice(0, filterInputs.length - 1);
  var features = Array.from(filterForm.querySelector('#housing-features').querySelectorAll('input'));
  var filterValidAdvert = function (advert) {
    return advert.offer && advert.location;
  };
  var setOnFilterChange = function (onChange) {
    onFilterChange = onChange;
  };
  var checkActiveOption = function (option) {
    return option.value !== 'any';
  };
  var checkActiveFeature = function (feature) {
    return feature.checked;
  };
  var getValueOptions = function (element) {
    var elementFieldName = element.id.replace('housing-', '');
    return [elementFieldName, element.value];
  };
  var getFeatureOptions = function (feature) {
    return feature.value;
  };
  var setCurrentValues = function (activeOptions, activeFeatures) {
    var values = {};
    if (activeFeatures.length) {
      values.features = activeFeatures;
    }
    activeOptions.forEach(function (item) {
      values[item[0]] = item[1];
    });
    return values;
  };
  var checkFacilitiesEqual = function (facilities, facilitiesToCompare) {
    if (facilitiesToCompare) {
      return facilities.filter(function (array) {
        return facilitiesToCompare.indexOf(array) > -1;
      }).length === facilitiesToCompare.length;

    }
    return true;
  };

  var checkPriceEqual = function (price, priceToCompare) {
    if (priceToCompare) {
      switch (priceToCompare) {
        case 'middle':
          return LOW_PRICE < price && price < HIGH_PRICE;
        case 'low':
          return LOW_PRICE > price;
        case 'high':
          return price > HIGH_PRICE;
      }

    }
    return true;
  };

  var checkRoomFeature = function (feature, featureToCompare) {
    if (!featureToCompare && featureToCompare !== 0) {
      return true;
    }
    return feature === featureToCompare;
  };

  var findAdvert = function (obj, item) {
    if (!obj) {
      return true;
    }
    var offer = item.offer;
    var isFacilitiesEqual = checkFacilitiesEqual(offer.features, obj.features);
    var isPriceEqual = checkPriceEqual(offer.price, obj.price);
    var isTypeEqual = checkRoomFeature(offer.type, obj.type);
    var isCapacityEqual = checkRoomFeature(offer.rooms, Number(obj.rooms));
    var isGuestsNumberEqual = checkRoomFeature(offer.guests, Number(obj.guests));
    return isFacilitiesEqual && isPriceEqual && isCapacityEqual && isGuestsNumberEqual && isTypeEqual;
  };
  var checkOption = function (advert) {
    var currentFeatures = features.filter(checkActiveFeature).map(getFeatureOptions);
    var currentValues = options.filter(checkActiveOption).map(getValueOptions);
    var values = setCurrentValues(currentValues, currentFeatures);
    return findAdvert(values, advert);
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
    checkAdvert: filterValidAdvert,
    reset: resetFilter,
  };
})();
