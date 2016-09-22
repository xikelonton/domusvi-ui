jQuery(document).ready(function($) {
    $('.d-selection .drop, .d-selection span.selected').click(function() {
        var select = $(this).parent();
        var list = $(select).find('ul:first');
        list.slideToggle();
    });
    $('.d-selection ul li').click(function() {
        var select = $(this).parent().parent();
        var active_e = select.find('span.selected');
        $(active_e).text($(this).text());
        select.find('ul').slideToggle();
    });

    //banner
    if( $('#home-banner').length > 0) {
        var total_slide = $('#home-banner .slide').length;
        $('#home-banner .banner-nav').append('<span class="active"></span>');
        for( var i = 1; i < total_slide; i++) {
            $('#home-banner .banner-nav').append('<span></span>');
        }
        initHomeSlider();
        $('.banner-nav span').click(function (e) {
            clearInterval(intervalBanner);
            $('.banner-nav span').removeClass('active');
            $('#home-banner .slide').hide();
            var index = $(this).index();
            //console.log(index);
            $(this).addClass('active');
            var new_img_src = $($('#home-banner .slide').get(index)).attr('data-image-src');
            //console.log(new_img_src);
            //$('#home-banner').parallax({imageSrc: new_img_src});
            var parallax_img = $($('.parallax-slider').get(1));
            parallax_img.hide();
            parallax_img.attr('src', new_img_src );
            parallax_img.fadeIn(800);
            //$('#home-banner').attr('data-image-src', new_img_src);
            //$($('#home-banner .slide').get(index)).fadeIn('800');
            initHomeSlider();
        });
    }

    $('.account-icon').mouseover(function() {
        $('#account-menu').fadeIn();
        $(this).addClass('show');
    });
    $('#account-menu').mouseleave(function () {
        $('#account-menu').fadeOut();
        $('.account-icon').removeClass('show');
    });

    //mobile
    $('.mobile-nav').click(function (e) {
        e.preventDefault();
        $('nav').slideToggle();
    });
});
var intervalBanner;
function initHomeSlider() {
    intervalBanner = window.setInterval(function () {
        var currentIndex = $('.banner-nav span.active').index();
        var nextIndex = currentIndex + 1;

        if( nextIndex == $('#home-banner .slide').length) {
            nextIndex = 0;
        }
        console.log(nextIndex + 'a');
        $($('.banner-nav span').get(nextIndex)).trigger('click');
    }, 5000);
};
