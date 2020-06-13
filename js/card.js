'use strict';

(function () {
  var ROOM_ENDINGS = ['комната', 'комнаты', 'комнат'];
  var GUEST_ENDINGS = ['гостя', 'гостей'];
  var getHouseTranslation = function (element) {
    switch (element) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      default:
        return 'Квартира';
    }
  };

  var getWordEnding = function (number, forms) {
    var ending = '';
    var numberCheck = number % 100;
    var startTeen = 11;
    var endTeen = 19;
    if (numberCheck >= startTeen && numberCheck <= endTeen) {
      ending = forms[2];
    } else {
      var result = numberCheck % 10;
      switch (result) {
        case (1):
          ending = forms[0];
          break;
        case (2):
        case (3):
        case (4):
          ending = forms[1];
          break;
        default:
          ending = forms[2] || forms[1];
      }
    }
    return number + ' ' + ending;
  };
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');


  var generateFeatures = function (items) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < items.length; i++) {
      var newItem = document.createElement('li');
      newItem.className = 'popup__feature popup__feature--' + items[i];
      fragment.appendChild(newItem);
    }
    return fragment;
  };

  var renderPhoto = function (item, photo) {
    var clonePhoto = photo.cloneNode(true);
    clonePhoto.src = item;
    return clonePhoto;
  };

  var generatePhotos = function (items, photo) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < items.length; i++) {
      fragment.appendChild(renderPhoto(items[i], photo));
    }
    return fragment;
  };

  var hideBlock = function (block) {
    var childrenAmount = block.children.length;
    block.style.display = childrenAmount === 0 ? 'none' : '';
  };

  var renderCard = function (advert) {
    var cardClone = cardTemplate.cloneNode(true);
    var featuresContainer = cardClone.querySelector('.popup__features');
    var photosContainer = cardClone.querySelector('.popup__photos');
    var photo = cardClone.querySelector('.popup__photo');
    featuresContainer.innerHTML = '';
    photosContainer.innerHTML = '';
    featuresContainer.appendChild(generateFeatures(advert.offer.features));
    photosContainer.appendChild(generatePhotos(advert.offer.photos, photo));
    hideBlock(featuresContainer);
    hideBlock(photosContainer);
    cardClone.querySelector('.popup__title').textContent = advert.offer.title;
    cardClone.querySelector('.popup__text--address').textContent = advert.offer.address;
    cardClone.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
    cardClone.querySelector('.popup__type').textContent = getHouseTranslation(advert.offer.type);
    cardClone.querySelector('.popup__text--capacity').textContent = getWordEnding(advert.offer.rooms, ROOM_ENDINGS) + ' для ' + getWordEnding(advert.offer.guests, GUEST_ENDINGS);
    cardClone.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    cardClone.querySelector('.popup__description').textContent = advert.offer.description;
    cardClone.querySelector('.popup__avatar').src = advert.author.avatar;
    return cardClone;
  };

  window.card = {
    render: renderCard
  };

})();