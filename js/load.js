'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    window.utils.setUpRequest(URL, xhr, onSuccess, onError);
    xhr.open('GET', URL);
    xhr.send();
  };

})();
