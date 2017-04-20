window.onscroll = function() {
    $('#topScrollButton').css({'display' : document.body.scrollTop > 5 || document.documentElement.scrollTop > 5 ? 'block' : 'none'});
};

function toTop() {
    document.body.scrollTop = 0; // Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // IE and FF
}