function init(target, target_type, custom_options) {

    var options = null,
        default_options = {
            dots: true,
            infinite: true,
            lazy: true,
            lazyLoad: 'ondemand',
            speed: 200,
            centerMode: false,
            variableWidth: false,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow: 3,
            slidesToScroll: 1,
            focusOnSelect: false,
            pauseOnHover: true,
            pauseOnDotsHover: true,
            arrows: true,
            fade: false,
            cssEase: 'ease',
            rows: 1,
            touchThreshold: 30,
            waitForAnimate: true,
            useTransform: true,
            touchMove: true,
            swipeToSlide: true,
            swipe: true,
        };

    switch (target_type) {

        case 'single':

            options = {
                slidesToShow: 1,
                slidesToScroll: 1
            };

            break;

        case 'multiple':

            options = {
                //customPaging: function (slick, index) {
                //    var page_number = parseInt(index) + 1;
                //    return '<button class="fa fa-circle page-' + page_number + '">' + '</button>';
                //},
                dots: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: true,
                rows: 1,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            };

            break;

        default:

            options = default_options;
    }

    // set custom options
    if (custom_options !== undefined) {
        options = $.extend(default_options, options, custom_options);
    }
    else {
        options = $.extend(default_options, options);
    }

    target.slick(options);
}

module.exports = {
    init: init
};