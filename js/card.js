'use strict';

(function () {
  var typeToHouseName = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };
  var onCardRemove = null;
  var currentCard = null;
  var removeCard = function () {
    if (currentCard === null) {
      return;
    }
    window.utils.removeElement(currentCard);
    currentCard = null;
    if (window.utils.isFunction(onCardRemove)) {

      onCardRemove();
      onCardRemove = null;
    }
  };

  var setOnCardRemove = function (onRemove) {
    onCardRemove = onRemove;
  };

  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var createFeature = function (item) {
    var newItem = document.createElement('li');
    newItem.className = 'popup__feature popup__feature--' + item;
    return newItem;
  };

  var generateFeatures = function (items) {
    var fragment = document.createDocumentFragment();
    items.forEach(function (item) {
      fragment.appendChild(createFeature(item));
    });
    return fragment;
  };


  var renderPhoto = function (item, photo) {
    var clonePhoto = photo.cloneNode(true);
    clonePhoto.src = item;
    return clonePhoto;
  };

  var generatePhotos = function (items, photo) {
    var fragment = document.createDocumentFragment();
    items.forEach(function (item) {
      fragment.appendChild(renderPhoto(item, photo));
    });
    return fragment;
  };

  var hideBlock = function (block) {
    block.style.display = 'none';
  };

  var fillInCapacity = function (capacity, rooms, guests) {
    if (rooms && guests) {
      capacity.textContent = rooms + ' комнат(ы/а) для ' + guests + ' гостя/ей';
    } else {
      hideBlock(capacity);
    }
  };


  var setText = function (block, content) {
    block.textContent = content;
  };
  var setImage = function (block, image) {
    block.src = image;
  };
  var setContent = function (block, content, setFunction) {
    if (content) {
      setFunction(block, content);
    } else {
      hideBlock(block);
    }
  };
  var setItems = function setItems(generateFunction, block, items, item) {
    if (items.length > 0) {
      block.appendChild(generateFunction(items, item));
    } else {
      hideBlock(block);
    }
  };
  var createCard = function (advert) {
    var card = cardTemplate.cloneNode(true);
    var offer = advert.offer;
    var featuresContainer = card.querySelector('.popup__features');
    var photosContainer = card.querySelector('.popup__photos');
    var photo = card.querySelector('.popup__photo');
    var capacity = card.querySelector('.popup__text--capacity');
    featuresContainer.innerHTML = '';
    photosContainer.innerHTML = '';
    setItems(generateFeatures, featuresContainer, offer.features);
    setItems(generatePhotos, photosContainer, offer.photos, photo);
    setContent(card.querySelector('.popup__title'), offer.title, setText);
    setContent(card.querySelector('.popup__text--address'), offer.address, setText);
    setContent(card.querySelector('.popup__text--price'), offer.price + '₽/ночь', setText);
    setContent(card.querySelector('.popup__type'), typeToHouseName[offer.type], setText);
    fillInCapacity(capacity, offer.rooms, offer.guests);
    setContent(card.querySelector('.popup__text--time'), 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout, setText);
    setContent(card.querySelector('.popup__description'), offer.description, setText);
    setContent(card.querySelector('.popup__avatar'), advert.author.avatar, setImage);
    card.querySelector('.popup__close').addEventListener('click', function () {
      removeCard();
    });
    return card;
  };

  var renderCard = function (container, advert) {
    currentCard = createCard(advert);
    container.append(currentCard);
  };


  window.card = {
    render: renderCard,
    remove: removeCard,
    setOnRemove: setOnCardRemove,
  };

})();
