'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AVATAR_IMAGE = 'img/muffin-grey.svg';
  var fileChooserAvatar = document.querySelector('.ad-form-header__upload input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
  var previewContainer = document.querySelector('.ad-form__photo');
  var setElementForLoadPhoto = function (preview, photo) {
    var image = document.createElement('img');
    image.alt = 'Фото жилья';
    image.src = photo;
    var imageStyle = image.style;
    imageStyle.width = '100%';
    imageStyle.height = '100%';
    preview.append(image);
  };

  var setLoadPhoto = function (preview, photo) {
    preview.src = photo;
  };

  var showLoadPhoto = function (fileChooser, preview, setFunction) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        setFunction(preview, reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  var resetPhotos = function () {
    previewAvatar.src = AVATAR_IMAGE;
    previewContainer.innerHTML = '';
  };

  fileChooserAvatar.addEventListener('change', function () {
    showLoadPhoto(fileChooserAvatar, previewAvatar, setLoadPhoto);
  });
  fileChooserPhoto.addEventListener('change', function () {
    showLoadPhoto(fileChooserPhoto, previewContainer, setElementForLoadPhoto);
  });

  window.photo = {
    reset: resetPhotos
  };
})();
