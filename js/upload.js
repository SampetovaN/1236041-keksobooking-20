'use strict';
(function () {
  var URL = 'https://javascript.pages.academy/keksobooking';
  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    window.utils.setUpRequest(URL, xhr, onSuccess, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
