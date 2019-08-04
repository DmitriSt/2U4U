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
