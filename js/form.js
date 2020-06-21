'use strict';
(function () {
  var MainPinSize = {
    HEIGHT: 83,
    RADIUS: 65 / 2,
  };
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var capacity = window.utils.advertForm.querySelector('#capacity');
  var roomNumber = window.utils.advertForm.querySelector('#room_number');
  var advertTitle = window.utils.advertForm.querySelector('#title');
  var advertType = window.utils.advertForm.querySelector('#type');
  var advertPrice = window.utils.advertForm.querySelector('#price');
  var advertCheckIn = window.utils.advertForm.querySelector('#timein');
  var advertCheckOut = window.utils.advertForm.querySelector('#timeout');
  var capacityValues = ['1', '2', '3'];
  var guestToCapacity = {
    1: capacityValues.slice(0, 1),
    2: capacityValues.slice(0, 2),
    3: capacityValues,
    100: '0'
  };
  var guestToConstraint = {
    1: 'Для одной комнаты гостей не может быть больше одного',
    2: 'Для двух комнат гостей не может быть больше двух',
    3: 'Для трех комнат гостей не может быть больше трех',
    100: 'Помещение сдается не для гостей'
  };
  var typeToMinCost = {
    flat: '1000',
    bungalo: '0',
    house: '5000',
    palace: '10000'
  };
  var colorizeBorder = function (element, isValid) {
    element.style.borderColor = isValid ? '' : 'red';
  };

  var formatMainPinAddress = function (isTurnOn) {
    var top = parseInt(window.utils.mainPin.style.top, 10);
    var addressTop = top + (isTurnOn ? MainPinSize.HEIGHT : MainPinSize.RADIUS);
    var addressLeft = parseInt(window.utils.mainPin.style.left, 10) + MainPinSize.RADIUS;
    return Math.round(addressLeft) + ', ' + Math.round(addressTop);
  };
  var checkCapacity = function () {
    var isValid = guestToCapacity[roomNumber.value].indexOf(capacity.value) !== -1;

    if (isValid) {
      capacity.setCustomValidity('');
    } else {
      capacity.setCustomValidity(guestToConstraint[roomNumber.value]);
    }
    colorizeBorder(capacity, isValid);
  };
  var checkEmptyInput = function (input) {
    var valueMissing = input.validity.valueMissing;
    if (input.validity.valueMissing) {
      input.setCustomValidity('Обязательное поле');
    } else {
      input.setCustomValidity('');
    }
    colorizeBorder(input, valueMissing);
  };
  var checkLengthAdvertName = function () {
    var valueLength = advertTitle.value.length;
    var isValid = false;
    if (valueLength < MIN_TITLE_LENGTH) {
      advertTitle.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      advertTitle.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
    } else {
      advertTitle.setCustomValidity('');
      isValid = true;
    }
    colorizeBorder(advertTitle, isValid);
  };
  var changeMinPrice = function (minCost) {
    advertPrice.placeholder = minCost;
    advertPrice.min = minCost;
  };

  var checkAdvertPrice = function () {
    var isValid = !(advertPrice.validity.rangeUnderflow || advertPrice.validity.rangeOverflow);
    colorizeBorder(advertPrice, isValid);
  };

  var sunchronizeTime = function (timeChanged, timeToSunchronize) {
    timeToSunchronize.value = timeChanged.value;
  };

  var turnOnForm = function () {
    window.utils.turnBlocks(window.utils.advertFormBlocks, window.utils.enableBlock);
    window.utils.turnBlocks(window.utils.filterFormBlocks, window.utils.enableBlock);
    window.utils.advertAddress.value = formatMainPinAddress(window.common.isMapOn);
    window.utils.advertForm.classList.remove('ad-form--disabled');
    checkCapacity();
    checkAdvertPrice();
  };
  capacity.addEventListener('change', function () {
    checkCapacity();
  });
  roomNumber.addEventListener('change', function () {
    checkCapacity();
  });
  advertType.addEventListener('change', function () {
    changeMinPrice(typeToMinCost[advertType.value]);
    checkAdvertPrice();
  });
  advertType.addEventListener('keydown', function () {
    changeMinPrice(typeToMinCost[advertType.value]);
    checkAdvertPrice();
  });
  advertTitle.addEventListener('input', function () {
    checkLengthAdvertName();
  });
  advertPrice.addEventListener('input', function () {
    checkAdvertPrice();
  });
  advertTitle.addEventListener('invalid', function () {
    checkEmptyInput(advertTitle);
  });
  advertPrice.addEventListener('invalid', function () {
    checkEmptyInput(advertPrice);
  });
  advertCheckIn.addEventListener('change', function () {
    sunchronizeTime(advertCheckIn, advertCheckOut);
  });
  advertCheckOut.addEventListener('change', function () {
    sunchronizeTime(advertCheckOut, advertCheckIn);
  });

  window.form = {
    formatMainPinAddress: formatMainPinAddress,
    turnOn: turnOnForm,
  };
})();

