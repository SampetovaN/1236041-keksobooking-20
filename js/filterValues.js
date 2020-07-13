'use strict';

(function () {
  var options = Array.from(document.querySelector('.map__filters').children);
  var getValues = function () {
    var values = {};
    options.forEach(function (option) {
      if (option.id !== 'housing-features') {
        if (option.value !== 'any') {
          values[option.id.replace('housing-', '')] = option.value;
        }
      } else {
        Array.from(option.querySelectorAll('input')).forEach(function (feature) {
          if (feature.checked) {
            if (!values.features) {
              values.features = [feature.value];
            } else {
              values.features.push(feature.value);
            }
          }
        });
      }
    });

    return Object.keys(values).length > 0 ? values : null;
  };
  window.filterValues = {
    collect: getValues
  };
})();
