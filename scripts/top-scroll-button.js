const scrollAmount = 5;

window.onscroll = function() {
    $('#topScrollButton').css({'display' : document.body.scrollTop > 5 || document.documentElement.scrollTop > 5 ? 'block' : 'none'});
};

function toTop() {
    $("html").animate({scrollTop: 0}, 500);
}