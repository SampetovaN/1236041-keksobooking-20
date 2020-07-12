'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AVATAR_IMAGE = 'img/muffin-grey.svg';
  var fileChooserAvatar = document.querySelector('.ad-form-header__upload input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
  var previewContainer = document.querySelector('.ad-form__photo');
  var setElementForUploadPhoto = function () {
    var imageContainer = document.createElement('img');
    imageContainer.alt = 'Фото жилья';
    var imageStyle = imageContainer.style;
    imageStyle.width = '100%';
    imageStyle.height = '100%';
    previewContainer.append(imageContainer);
  };
  var showUploadPhoto = function (fileChooser, preview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var resetPhotos = function () {
    previewAvatar.src = AVATAR_IMAGE;
    previewContainer.innerHTML = '';
  };

  fileChooserAvatar.addEventListener('change', function () {
    showUploadPhoto(fileChooserAvatar, previewAvatar);
  });

  fileChooserPhoto.addEventListener('change', function () {
    if (!previewContainer.querySelector('img')) {
      setElementForUploadPhoto();
    }
    showUploadPhoto(fileChooserPhoto, previewContainer.querySelector('img'));
  });

  window.photo = {
    reset: resetPhotos
  };
})();
