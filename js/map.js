'use strict';

(function () {
  var filterContainer = window.utils.map.querySelector('.map__filters-container');
  var addPins = function (renderFunction) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.adverts.length; i++) {
      fragment.appendChild(renderFunction(window.data.adverts[i]));
    }
    window.utils.mapPins.appendChild(fragment);
  };

  var addCards = function (renderFunction) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderFunction(window.data.adverts[0]));
    window.utils.map.insertBefore(fragment, filterContainer);
  };


  var turnOnMap = function () {
    window.utils.map.classList.remove('map--faded');
    addPins(window.pin.render);

  };

  window.map = {
    turnOn: turnOnMap,
    addCards: addCards
  };
})();
