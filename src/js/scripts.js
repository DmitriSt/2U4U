var requestURL = 'http://localhost:3000/catalog.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    var myJSON = request.response;

    myJSON.lamps.forEach(item => {
        $('.catalog__items').append(`
            <div class="catalog__item">
                <div class="catalog__item-inner">${item.title}</div>
                <div class="catalog__item-inner">${item.author}</div>
            </div>
        `)
    });
}
