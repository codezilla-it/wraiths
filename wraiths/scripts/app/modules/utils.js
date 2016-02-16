// ---------------------------------------------
// @utils
// ---------------------------------------------

var wraith_utils = (function () {

    // Private Methods
    // ---------------------------------------------

    // Public Methods
    // ---------------------------------------------

    function init() {

        $.fn.ajax_submit_form = function (url, options) {

            if (options === undefined) {
                options = {};
            }

            var data = $(this).serialize();

            var ajax_options = {
                type: "POST",
                url: url,
                data: data,
                dataType: 'json'
            };

            var jqXHR = $.ajax($.extend(ajax_options, options));

            if (options.done_fun !== undefined) {
                jqXHR.done(options.done_fun);
            }

            if (options.fail_fun !== undefined) {
                jqXHR.fail(options.fail_fun);
            }
        };

        $.fn.exists = function () {
            return !!this.length;
        };

        $.fn.display_block = function () {

            this.removeClass('u--hide').addClass('u--show');
        };

        $.fn.display_none = function () {

            this.removeClass('u--show').addClass('u--hide');
        };

        $.fn.handle_content_height = function ($content, $main, $footer, options) {

            var params = options || {};

            var window_h = $(window).height();
            var footer_h = $footer.innerHeight();
            var partials_h = ($header.innerHeight() + footer_h);
            var offset_h = window_h - partials_h;

            console.log(window_h);
            console.log($('main').innerHeight());
            console.log($footer.innerHeight());

            if ($('main').innerHeight() - footer_h <= window_h) {
                $content.css({
                    height: offset_h + 'px'
                });
            }
        };

        //$.fn.handle_content_height = function (options) {
        //
        //    var params = options || {};
        //
        //    var window_h = $(window).height();
        //    var footer_h = $('.m--footer').innerHeight();
        //    var partials_h = ($('.m--header').innerHeight() + footer_h);
        //    var offset_h = window_h - partials_h;
        //
        //    if ($('main').innerHeight() - footer_h <= window_h) {
        //        $('.m--content').css({
        //            height: offset_h + 'px'
        //        });
        //    }
        //};

        $.fn.remove_class_except = function (val) {
            return this.each(function (index, el) {
                var keep = val.split(" "),  // list we'd like to keep
                    reAdd = [],          // ones that should be re-added if found
                    $el = $(el);       // element we're working on
                // look for which we re-add (based on them already existing)
                for (var c = 0; c < keep.length; c++) {
                    if ($el.hasClass(keep[c])) reAdd.push(keep[c]);
                }

                // drop all, and only add those confirmed as existing
                $el.removeClass()               // remove existing classes
                    .addClass(reAdd.join(' '));  // re-add the confirmed ones
            });
        };

        $.fn.fill_nav = function (li, dest) {
            $(li).each(function () {
                var cp = $(this).clone();
                cp.remove_class_except('s--active').removeAttr('id');
                cp.appendTo($(dest));
            });
        };

        document.querySelector('.m--navbar__toggle')
            .addEventListener('click', function () {
                this.classList.toggle('active');
            });

        APP.globals.load_scripts = function (array, callback) {
            var loader = function (src, handler) {
                var script = document.createElement("script");
                script.src = src;
                script.onload = script.onreadystatechange = function () {
                    script.onreadystatechange = script.onload = null;
                    handler();
                };
                var head = document.getElementsByTagName("head")[0];
                (head || document.body).appendChild(script);
            };
            (function () {
                if (array.length !== 0) {
                    loader(('https:' === location.protocol ? 'https:' : 'http:') + array.shift(), arguments.callee);
                } else {
                    callback && callback();
                }
            })();
        };

        APP.globals.get_filename = function (path) {
            return path.split('/').reverse()[0].replace(/\.[^/.]+$/, '');
        };

        APP.globals.object_chain = function (chains) {
            var c = Object.prototype;

            while (chains.length) {
                c = Object.create(c);
                $.extend(c, chains.pop()); // some function that does mixin
            }

            return c;
        };
    }

    // Module API
    // ---------------------------------------------

    return {
        init: init
    };

})();

// Module Export
// ---------------------------------------------

module.exports = wraith_utils;