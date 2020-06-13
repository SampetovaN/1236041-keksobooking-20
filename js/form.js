'use strict';
(function () {
  var MainPinSize = {
    HEIGHT: 83,
    RADIUS: 65 / 2,
  };
  var capacity = window.utils.advertForm.querySelector('#capacity');
  var roomNumber = window.utils.advertForm.querySelector('#room_number');
  var capacityValues = ['1', '2', '3'];
  var constraintType = {
    1: [capacityValues.slice(0, 1), 'Для одной комнаты гостей не может быть больше одного'],
    2: [capacityValues.slice(0, 2), 'Для двух комнат гостей не может быть больше двух'],
    3: [capacityValues, 'Для трех комнат гостей не может быть больше трех'],
    100: ['0', 'Помещение сдается не для гостей'],
  };

  var formatMainPinAddress = function (isTurnOn) {
    var top = parseInt(window.utils.mainPin.style.top, 10);
    var addressTop = top + (isTurnOn ? MainPinSize.HEIGHT : MainPinSize.RADIUS);
    var addressLeft = parseInt(window.utils.mainPin.style.left, 10) + MainPinSize.RADIUS;
    return Math.round(addressLeft) + ', ' + Math.round(addressTop);
  };
  var checkCapacity = function () {
    var isValid = constraintType[roomNumber.value][0].indexOf(capacity.value) !== -1;

    if (isValid) {
      capacity.setCustomValidity('');
      capacity.style.borderColor = '';
    } else {
      capacity.setCustomValidity(constraintType[roomNumber.value][1]);
      capacity.style.borderColor = 'red';
    }
  };

  var turnOnForm = function () {
    window.utils.turnBlocks(window.utils.advertFormBlocks, window.utils.enableBlock);
    window.utils.turnBlocks(window.utils.filterFormBlocks, window.utils.enableBlock);
    window.utils.advertAddress.value = formatMainPinAddress(window.utils.isMapOn);
    window.utils.advertForm.classList.remove('ad-form--disabled');
    checkCapacity();
  };

  capacity.addEventListener('change', function () {
    checkCapacity();
  });


  roomNumber.addEventListener('change', function () {
    checkCapacity();
  });

  window.form = {
    formatMainPinAddress: formatMainPinAddress,
    turnOn: turnOnForm,
  };
})();

