function getData(onSuccess, onError) {
  fetch('https://25.javascript.htmlacademy.pro/kekstagram/data')
    .then((responce) => {
      if (responce.ok) {
        return responce;
      }
      onError('Не удалось загрузить картинки! Попробуйте перезагрузить!');
    })
    .then((responce) => responce.json())
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch(() => {
      onError('Не удалось загрузить картинки! Попробуйте перезагрузить!');
    });
}

function sendData() {

}

export {getData, sendData};
