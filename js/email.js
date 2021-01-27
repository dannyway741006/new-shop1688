$(document).ready(function () {
    $('#tab1').css('display', 'block');
    $('.tab__item').click(function () {
        let current = $(this).data('tab');
        console.log(current)
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        $('#' + current).fadeIn();
        $('#' + current).siblings().css('display', 'none');

    })
});