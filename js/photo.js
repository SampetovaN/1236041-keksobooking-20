'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AVATAR_IMAGE = 'img/muffin-grey.svg';
  var fileChooserAvatar = document.querySelector('.ad-form-header__upload input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
  var previewContainer = document.querySelector('.ad-form__photo');
  var previewPhoto = null;
  var setPreviewElement = function () {
    previewPhoto = document.createElement('img');
    previewPhoto.alt = 'Фото жилья';
    var photoStyle = previewPhoto.style;
    photoStyle.width = '100%';
    photoStyle.height = '100%';
    previewContainer.append(previewPhoto);
  };
  var onFirstChangeFileChooserPhoto = function () {
    if (!previewPhoto) {
      setPreviewElement();
    }
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
    previewPhoto = null;
  };

  fileChooserAvatar.addEventListener('change', function () {
    showUploadPhoto(fileChooserAvatar, previewAvatar);
  });

  fileChooserPhoto.addEventListener('change', function () {
    onFirstChangeFileChooserPhoto();
    showUploadPhoto(fileChooserPhoto, previewPhoto);
  });

  window.photo = {
    reset: resetPhotos
  };
})();
