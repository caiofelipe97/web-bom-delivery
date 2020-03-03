export const formatMoney = (price)=>{
    if(!price){
        return 'R$ 0,00'
    }
    let formated = parseFloat(price).toFixed(2).replace('.', ',');
    formated = 'R$' + formated;
    return formated;
}

export const getFileBlob = function (url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.addEventListener('load', function() {
      cb(xhr.response);
    });
    xhr.send();
  };