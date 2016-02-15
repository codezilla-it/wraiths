// ---------------------------------------------
// @popup
// ---------------------------------------------

var wraith_popup = (function () {

    // Private Methods
    // ---------------------------------------------

    // Public Methods
    // ---------------------------------------------

    function fancybox (target, target_type, custom_options) {

        var options = null,
            default_options = {
                maxWidth: '100%',
                maxHeight: '100%',
                fitToView: false,
                width: '70%',
                height: '70%',
                autoSize: false,
                openEffect: 'none',  // 'elastic', 'fade' or 'none'
                closeEffect: 'none', // 'elastic', 'fade' or 'none'
                prevEffect: 'none',
                nextEffect: 'none',
                padding: 0,
                margin: 50,
                helpers: {
                    title: {
                        type: 'over' // 'float', 'inside', 'outside' or 'over'
                    },
                    media: true
                },
                tpl: {
                    closeBtn: '<a title="Close" class="close-btn icon-cancel-6" href="javascript:"></a>',
                    next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:"><span class="icon-right-open"></span></a>',
                    prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:"><span class="icon-left-open"></span></a>'
                },
                beforeShow: {}
            };

        switch (target_type) {

            case 'group':

                options = {
                    helpers: {
                        title: {
                            type: 'over' // 'float', 'inside', 'outside' or 'over'
                        },
                        thumbs: {
                            width: 50,
                            height: 50
                        }, // requires to include thumbs js and css files
                        media: {
                            youtube: {
                                autoplay: 1,
                                autohide: 1,
                                fs: 1,
                                rel: 0,
                                hd: 1,
                                wmode: 'opaque',
                                enablejsapi: 1
                            },
                            vimeo: {
                                autoplay: 1,
                                hd: 1,
                                show_title: 1,
                                show_byline: 1,
                                show_portrait: 0,
                                fullscreen: 1
                            },
                            dailymotion: {
                                additionalInfos: 0,
                                autoStart: 1
                            },
                            twitpic: {},
                            google_maps: {},
                            instagram: {}
                        }, // requires to include media js file
                        buttons: false // requires to include buttons js and css files
                    }
                };

                break;

            case 'youtube':

                options = {
                    youtube: {
                        autoplay: 1,
                        autohide: 1,
                        fs: 1,
                        rel: 0,
                        hd: 1,
                        wmode: 'opaque',
                        enablejsapi: 1
                    },
                    dailymotion: {
                        additionalInfos: 0,
                        autoStart: 1
                    }
                };

                break;

            case 'vimeo':

                options = {};

                break;

            case 'dailymotion':

                options = {};

                break;

            case 'twitvid':

                options = {
                    twitvid: {
                        autoplay: 0
                    }
                };

                break;

            case 'twitpic':

                options = {
                    twitpic: {}
                };

                break;

            case 'google_maps':

                options = {
                    google_maps: {}
                };

                break;

            case 'instagram':

                options = {
                    instagram: {}
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

        target.fancybox(options);
    }

    function magnific_popup (target, target_type, custom_options) {

        var options = null;

        switch (target_type) {

            case 'single-image':

                options = {

                    type: 'image',
                    removalDelay: 300,
                    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    callbacks: {
                        beforeOpen: function () {
                            // just a hack that adds mfp-anim class to markup
                            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                            this.st.mainClass = this.st.el.attr('data-effect');
                        }
                    },
                    midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
                    image: {
                        verticalFit: true,
                        titleSrc: function (item) {
                            return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
                        }
                    }
                };

                break;

            case 'group-image':

                options = {

                    delegate: 'a',
                    type: 'image',
                    closeBtnInside: false,
                    removalDelay: 500, //delay removal by X to allow out-animation
                    callbacks: {
                        beforeOpen: function () {
                            // just a hack that adds mfp-anim class to markup
                            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                            this.st.mainClass = this.st.el.attr('data-effect');
                        }
                    },
                    closeOnContentClick: true,
                    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
                };

                break;

            case 'group-inline':

                options = {

                    delegate: 'a',
                    closeBtnInside: true,
                    removalDelay: 500, //delay removal by X to allow out-animation
                    callbacks: {
                        beforeOpen: function () {
                            this.st.mainClass = this.st.el.attr('data-effect');
                        }
                    },
                    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
                };

                break;

            case 'gallery-image':

                options = {

                    type: 'image',
                    delegate: 'a:not(.trigger-content)', /* it delegate if is not trigger-content */
                    removalDelay: 300,
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    tLoading: '', // remove text from preloader
                    /* don't add this part, it's just to disable cache on image and test loading indicator */
                    callbacks: {
                        beforeChange: function () {
                            this.items[0].src = this.items[0].src + '?=' + Math.random();
                        },
                        beforeOpen: function () {

                            // just a hack that adds mfp-anim class to markup
                            /*this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');*/
                            this.st.mainClass = this.st.el.attr('data-effect');
                        }
                    },
                    midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
                    image: {
                        verticalFit: true,
                        titleSrc: 'title' // Attribute of the target element that contains caption for the slide.
                        // Or the function that should return the title. For example:
                        // titleSrc: function(item) {
                        //   return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
                        // }
                        //
                    },
                    gallery: {
                        enabled: true, // set to true to enable gallery

                        preload: [0, 2], // read about this option in next Lazy-loading section

                        navigateByImgClick: true,

                        arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button

                        tPrev: 'Previous (Left arrow key)', // title for left button
                        tNext: 'Next (Right arrow key)' // title for right button
                        // tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
                    }
                };

                break;

            case 'with-alert':

                options = {

                    type: 'inline',
                    callbacks: {
                        open: function () {

                            // this part overrides "close" method in MagnificPopup object
                            $.magnificPopup.instance.close = function () {

                                if (!confirm('Are you sure?')) {
                                    return;
                                }

                                // "proto" variable holds MagnificPopup class prototype
                                // The above change that we did to instance is not applied to the prototype,
                                // which allows us to call parent method:
                                $.magnificPopup.proto.close.call(this);

                            };
                            // you may override any method like so, just note that it's applied globally

                        }
                    }
                };

                break;

            case 'hinge':

                options = {

                    mainClass: 'mfp-with-fade',
                    removalDelay: 1000, //delay removal by X to allow out-animation
                    callbacks: {
                        beforeClose: function () {
                            this.content.addClass('hinge');
                        },
                        close: function () {
                            this.content.removeClass('hinge');
                        }
                    },
                    midClick: true
                };

                break;

            case 'iframe':

                options = {
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: true,
                    fixedContentPos: false
                };

                break;

            default:

                options = {
                    type: 'image',
                    closeOnContentClick: true,
                    closeBtnInside: false
                };

        }

        // set custom options
        if (custom_options !== undefined) {

            options = $.extend(options, custom_options);
        }

        // Eccezione
        if (target_type === 'gallery-inline') {

            target.click(function () {

                var items = [];
                $($(this).attr('href')).find('.popup-content').each(function () {
                    items.push({
                        src: $(this)
                    });
                });

                $.magnificPopup.open({
                    items: items,
                    gallery: {
                        enabled: true
                    }
                });
            });
        }

        else {
            target.magnificPopup(options);
        }

    }

    // Module API
    // ---------------------------------------------

    return {
        fancybox: fancybox,
        magnific_popup: magnific_popup
    };

})();

// Module Export
// ---------------------------------------------

module.exports = wraith_popup;