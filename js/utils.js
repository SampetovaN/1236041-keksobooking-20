'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var filterForm = map.querySelector('.map__filters');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var advertForm = document.querySelector('.ad-form');
  var advertAddress = advertForm.querySelector('#address');
  var isMapOn = false;
  var FINISH_Y = 630;
  var LEFT_MOUSE_BUTTON = 0;
  var ENTER_BUTTON = 'Enter';
  window.utils = {
    finishX: mapPins.clientWidth,
    FINISH_Y: FINISH_Y,
    map: map,
    mapPins: mapPins,
    mainPin: mainPin,
    advertAddress: advertAddress,
    advertForm: advertForm,
    advertFormBlocks: advertForm.children,
    filterFormBlocks: filterForm.children,
    isMapOn: isMapOn,
    disableBlock: function (block) {
      block.disabled = true;
    },
    enableBlock: function (block) {
      block.disabled = false;
    },
    turnBlocks: function (blocks, turnFunction) {
      for (var i = 0; i < blocks.length; i++) {
        turnFunction(blocks[i]);
      }
    },
    isClickEvent: function (evt, action) {
      if (evt.button === LEFT_MOUSE_BUTTON) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_BUTTON) {
        action();
      }
    }
  };
})();
