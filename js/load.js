'use strict';

(function () {
  var TIMEOUT_MS = 10000;
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var filterValidAdvert = function (advert) {
    return advert.offer && advert.location;
  };
  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response.filter(filterValidAdvert));
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_MS;
    xhr.send();
  };

})();
