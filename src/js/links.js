$(document).on('click', 'a', function() {
    const key = $(this).data('key');
    sessionStorage.setItem("type",`${key}`);
});

function checkType() {
    const type = sessionStorage.getItem("type");
    
    var requestURL = 'http://localhost:3000/catalog.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        var myJSON = request.response;
        switch (type) {
            case 'lamp':
                myJSON.lamp.forEach(item => {
                    $('.catalog__items').append(`
                        <div class="catalog__item">
                            <div class="catalog__item-inner">
                                ${item.title} <br>
                                ${item.author}
                            </div>
                        </div>
                    `)
                });
            break;
            case 'light':
                myJSON.light.forEach(item => {
                    $('.catalog__items').append(`
                        <div class="catalog__item">
                            <div class="catalog__item-inner">
                                ${item.title} <br>
                                ${item.author}
                            </div>
                        </div>
                    `)
                });
            break;
            case 'commerce':
                myJSON.commerce.forEach(item => {
                    $('.catalog__items').append(`
                        <div class="catalog__item">
                            <div class="catalog__item-inner">
                                ${item.title} <br>
                                ${item.author}
                            </div>
                        </div>
                    `)
                });
            break;
            case 'decor':
                myJSON.decor.forEach(item => {
                    $('.catalog__items').append(`
                        <div class="catalog__item">
                            <div class="catalog__item-inner">
                                ${item.title} <br>
                                ${item.author}
                            </div>
                        </div>
                    `)
                });
            break;
            case 'kit':
                myJSON.kit.forEach(item => {
                    $('.catalog__items').append(`
                        <div class="catalog__item">
                            <div class="catalog__item-inner">
                                ${item.title} <br>
                                ${item.author}
                            </div>
                        </div>
                    `)
                });
            break;
        }
    }
}

checkType();