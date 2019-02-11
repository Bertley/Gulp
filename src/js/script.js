$('.hamburger').on('click', function() {
    $(this).toggleClass('opened');
    $('.menu-content').toggleClass('menu-open'); 
});

$('#open-search').on('click', function() {
    $(this).toggleClass('closed'); 
    $('#cart-icon').toggleClass('closed'); 
    $('.search').toggleClass('opened-search'); 
    $('.logo').toggleClass('closed-m'); 
    $('.menu-content').removeClass('menu-open'); 
})

$('#close-search').on('click', function(){
    $('.search').removeClass('opened-search'); 
    $('#open-search').removeClass('closed');
    $('#cart-icon').removeClass('closed'); 
    $('.logo').removeClass('closed-m'); 
})