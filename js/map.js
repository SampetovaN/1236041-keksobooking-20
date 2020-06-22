'use strict';

(function () {
  var filterContainer = window.utils.map.querySelector('.map__filters-container');
  var createFragment = function (adverts, renderFunction) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adverts.length; i++) {
      if (adverts[i].offer) {
        fragment.appendChild(renderFunction(adverts[i]));
      }
    }
    return fragment;
  };
  var addCards = function (adverts) {
    window.utils.map.insertBefore(createFragment(adverts, window.card.render), filterContainer);
  };
  var addPins = function (adverts) {
    window.utils.mapPins.appendChild(createFragment(adverts, window.pin.render));
  };
  var showCard = function (card) {
    card.style.display = 'block';
  };
  var hideCard = function (card) {
    card.style.display = 'none';
  };

  var onError = function (errorMessage) {
    var errorBlock = document.createElement('div');
    var style = errorBlock.style;
    style.zIndex = '100';
    style.margin = 'auto';
    style.textAlign = 'center';
    style.backgroundColor = 'red';
    style.position = 'absolute';
    style.position = 'absolute';
    style.left = 0;
    style.right = 0;
    style.fontSize = '30px';
    style.top = '40%';
    errorBlock.textContent = errorMessage;
    window.utils.map.insertBefore(errorBlock, window.utils.mapPins);
    setTimeout(removeBlock, 2000, errorBlock);
  };

  var onSuccess = function (adverts) {
    addPins(adverts);
    addCards(adverts);
    window.utils.turnBlocks(window.utils.filterFormBlocks, window.utils.enableBlock);
  };
  var removeBlock = function (block) {
    block.remove();
    block = null;
  };
  var turnOnMap = function () {
    window.utils.map.classList.remove('map--faded');
    window.load(onSuccess, onError);
  };

  window.map = {
    turnOn: turnOnMap,
    addCards: addCards,
    hideCard: hideCard,
    showCard: showCard
  };
})();
