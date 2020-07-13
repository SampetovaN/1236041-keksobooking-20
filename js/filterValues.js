'use strict';

(function () {
  var options = Array.from(document.querySelector('.map__filters').children);
  var findValues = function () {
    var values = options.reduce(function (object, option) {
      if (option.id !== 'housing-features') {
        if (option.value !== 'any') {
          object[option.id.replace('housing-', '')] = option.value;
        }
      } else {
        Array.from(option.querySelectorAll('input')).forEach(function (feature) {
          if (feature.checked) {
            if (!object.features) {
              object.features = [feature.value];
            } else {
              object.features.push(feature.value);
            }
          }
        });
      }
      return object;
    }, {});

    return Object.keys(values).length > 0 ? values : null;
  };
  window.filterValues = {
    collect: findValues
  };
})();
