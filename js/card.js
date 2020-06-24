'use strict';

(function () {
  var ROOM_ENDINGS = ['комната', 'комнаты', 'комнат'];
  var GUEST_ENDINGS = ['гостя', 'гостей'];
  var typeToHouseName = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
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

  var fillInCapacity = function (capacity, rooms, guests) {
    if (rooms && guests) {
      capacity.textContent = getWordEnding(rooms, ROOM_ENDINGS) + ' для ' + getWordEnding(guests, GUEST_ENDINGS);
    } else {
      capacity.style.display = 'none';
    }
  };

  var renderCard = function (advert) {
    var card = cardTemplate.cloneNode(true);
    var featuresContainer = card.querySelector('.popup__features');
    var photosContainer = card.querySelector('.popup__photos');
    var photo = card.querySelector('.popup__photo');
    var capacity = card.querySelector('.popup__text--capacity');
    featuresContainer.innerHTML = '';
    photosContainer.innerHTML = '';
    featuresContainer.appendChild(generateFeatures(advert.offer.features));
    photosContainer.appendChild(generatePhotos(advert.offer.photos, photo));
    hideBlock(featuresContainer);
    hideBlock(photosContainer);
    card.querySelector('.popup__title').textContent = advert.offer.title;
    card.querySelector('.popup__text--address').textContent = advert.offer.address;
    card.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = typeToHouseName[advert.offer.type];
    fillInCapacity(capacity, advert.offer.rooms, advert.offer.guests);
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    card.querySelector('.popup__description').textContent = advert.offer.description;
    card.querySelector('.popup__avatar').src = advert.author.avatar;
    return card;
  };


  window.card = {
    render: renderCard
  };

})();
