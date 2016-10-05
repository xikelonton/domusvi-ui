jQuery(document).ready(function($) {
    UIInit();
    //banner
    if( $('#home-banner').length > 0) {
        if( isMobile()) {
            $('#home-banner').parallax({imageSrc: './images/mobile-banner-1.jpg'});
        } else {
            $('#home-banner').parallax({imageSrc: './images/banner-1.jpg'});
        }
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

    var resizeTimer;

    $(window).on('resize', function(e) {

        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {

            onresize();

        }, 250);

    });

    detailSlider();
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

function isMobile() {
    var agent_mobile = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );
    if( agent_mobile == false) {
        return $(window).width() <= 768;
    }
    return true;
}

function onresize() {
    if( isMobile()) {
        $('#home-banner').parallax({imageSrc: './images/mobile-banner-1.jpg'});
    } else {
        $('#home-banner').parallax({imageSrc: './images/banner-1.jpg'});
    }
}

function detailSlider() {
    if( $('#detail-banner').length > 0) {
        var totalSlide = $('#detail-banner .item').length;
        var w = $(window).width();
        bw = w;
        if( w > 1024) {
            var wrapper_w = $('.wrapper').width();
            bw = w / 2 + wrapper_w / 2 - 100;
            $('#detail-banner .item .wrapper').width(wrapper_w - 100);
        }

        $('#detail-banner-slides').width(bw * totalSlide);
        $('#detail-banner .item').width(bw);

        var index = 0;
        var ii = autoplayDetailSlider(index, totalSlide, bw);

        $('#detail-banner-control .nav-left').click(function() {
            var cidx = $('#detail-banner-slides .item.active').index();
            if( cidx > 0) {
                playDetailSlider(cidx - 1, bw);
                clearInterval(ii);
                ii = autoplayDetailSlider(cidx - 1, totalSlide, bw);
            }
        });

        $('#detail-banner-control .nav-right').click(function() {
            var cidx = $('#detail-banner-slides .item.active').index();
            if( cidx < totalSlide - 1) {
                playDetailSlider(cidx + 1, bw);
                clearInterval(ii);
                ii = autoplayDetailSlider(cidx + 1, totalSlide, bw);
            }
        });

        $('#detail-banner-control-wrapper .thumb li').click(function () {
            var idx = $(this).index();
            playDetailSlider(idx, bw);
            clearInterval(ii);
            ii = autoplayDetailSlider(idx, totalSlide, bw);
        });

    }
}

function autoplayDetailSlider(index, totalSlide, bw) {
    return window.setInterval(function() {
        index++;
        if( index >= totalSlide) {
            index = 0;
        }
        playDetailSlider(index, bw);
    }, 3000);
}

function playDetailSlider(index, bw) {
    $('#detail-banner-slides .item').removeClass('active');
    $($('#detail-banner-slides .item').get(index)).addClass('active');

    $('ul.thumb li').removeClass('active');
    $($('ul.thumb li').get(index)).addClass('active');

    var ll = -1 * index * bw + 'px';
    $('#detail-banner-slides').animate({
        'left' : ll
    });
}

function UIInit() {
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

    $('.cb-selection li').click(function() {
        $(this).toggleClass('checked');
    });

    if( isMobile()) {
        $('.tab').each(function () {
            var tab = $(this);
            $(this).prepend('<span>' + tab.find('li.selected').text() + '</span>');

            $(this).find('span').click(function() {
                //console.log('click');
                tab.find('li').show();
            });
        });
    }
    $('.tab li').click(function (e) {
        var ul = $(this).parent();
        $('.tab li').removeClass('selected');
        $(this).addClass('selected');
        var rel = $(this).attr('rel')
        $('.tab-content').removeClass('selected');
        $('.tab-content[rel=' + rel + ']').addClass('selected');
        if( isMobile()) {
            ul.find('span').text($(this).text());
            ul.find('li').hide();
        }
    });
    $('.tag-box span i').click(function() {
        $(this).parent().remove();
    });
}