'use strict';

(function () {
  var MapRect = {
    LEFT: 0,
    RIGHT: 1200,
    TOP: 130,
    BOTTOM: 630,
  };
  var LEFT_MOUSE_BUTTON = 0;
  var ENTER_BUTTON = 'Enter';
  var ESCAPE_BUTTON = 'Escape';
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var filterForm = map.querySelector('.map__filters');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var advertForm = document.querySelector('.ad-form');
  var advertAddress = advertForm.querySelector('#address');

  window.utils = {
    MapRect: MapRect,
    map: map,
    mapPins: mapPins,
    mainPin: mainPin,
    advertAddress: advertAddress,
    advertForm: advertForm,
    advertFormBlocks: advertForm.children,
    filterFormBlocks: filterForm.children,
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
    isLeftMouseButton: function (evt, action) {
      if (evt.button === LEFT_MOUSE_BUTTON) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_BUTTON) {
        action(evt);
      }
    },
    isEscEvent: function (evt, action) {
      if (evt.key === ESCAPE_BUTTON) {
        evt.preventDefault();
        action();
      }
    }
  };
})();
