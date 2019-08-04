// var requestURL = 'http://localhost:3000/catalog.json';
// var request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();

// request.onload = function() {
//     var myJSON = request.response;

//     myJSON.lamps.forEach(item => {
//         $('.catalog__items').append(`
//             <div class="catalog__item">
//                 <div class="catalog__item-inner">
//                     ${item.title} <br>
//                     ${item.author}
//                 </div>
//             </div>
//         `)
//     });
// }

const $filter = $('.catalog__filter');
const $filterClose = $filter.find('i');
const $filterOpen = $('.catalog__filter-open');
const $catalogItems = $('.catalog__items');
$filterClose.click(function() {
    $filter.addClass('catalog__filter_closed');
    $filterOpen.addClass('catalog__filter-open_show');
    $catalogItems.addClass('catalog__items_full-width');
});
$filterOpen.click(function() {
    $filter.removeClass('catalog__filter_closed');
    $filterOpen.removeClass('catalog__filter-open_show');
    $catalogItems.removeClass('catalog__items_full-width');
});
