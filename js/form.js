'use strict';
(function () {
  var MainPinSize = {
    HEIGHT: 83,
    RADIUS: 65 / 2,
  };
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var advertForm = document.querySelector('.ad-form');
  var advertFormBlocks = advertForm.childNodes;
  var advertAddress = advertForm.querySelector('#address');
  var capacity = advertForm.querySelector('#capacity');
  var roomNumber = advertForm.querySelector('#room_number');
  var advertTitle = advertForm.querySelector('#title');
  var advertType = advertForm.querySelector('#type');
  var advertPrice = advertForm.querySelector('#price');
  var advertCheckIn = advertForm.querySelector('#timein');
  var advertCheckOut = advertForm.querySelector('#timeout');
  var guestToCapacity = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
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
  var changeMinCost = function (minCost) {
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
    advertFormBlocks.forEach(window.utils.unsetDisabled);
    advertAddress.value = formatMainPinAddress(true);
    advertForm.classList.remove('ad-form--disabled');
    checkCapacity();
    checkAdvertPrice();
  };
  advertFormBlocks.forEach(window.utils.setDisabled);
  advertAddress.value = formatMainPinAddress(false);
  capacity.addEventListener('change', function () {
    checkCapacity();
  });
  roomNumber.addEventListener('change', function () {
    checkCapacity();
  });
  advertType.addEventListener('change', function () {
    changeMinCost(typeToMinCost[advertType.value]);
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
    turnOn: turnOnForm
  };
})();

