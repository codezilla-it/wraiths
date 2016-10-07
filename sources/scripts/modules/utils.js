// ---------------------------------------------
// @utils
// ---------------------------------------------

module.exports = (function () {

    // Private Methods
    // ---------------------------------------------

    // Public Methods
    // ---------------------------------------------

    function init(projectName) {

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

            this.removeClass('hide').addClass('show');
        };

        $.fn.display_none = function () {

            this.removeClass('show').addClass('hide');
        };

        $.fn.handle_content_height = function (options) {

            var params = options || {};

            var window_h = $(window).height();
            var main_h = $('main').innerHeight();
            var content_h = $('.content').innerHeight();
            var footer_h = $('.footer').innerHeight();

            if (main_h - footer_h <= (window_h - (main_h - content_h))) {
                $('.content').css({
                    height: (window_h - (main_h - content_h)) + 'px'
                });
            }
        };

        $.fn.remove_class_except = function (val) {
            return this.each(function (index, el) {
                var keep = val.split(" "), // list we'd like to keep
                    reAdd = [], // ones that should be re-added if found
                    $el = $(el); // element we're working on
                // look for which we re-add (based on them already existing)
                for (var c = 0; c < keep.length; c++) {
                    if ($el.hasClass(keep[c])) reAdd.push(keep[c]);
                }

                // drop all, and only add those confirmed as existing
                $el.removeClass() // remove existing classes
                    .addClass(reAdd.join(' ')); // re-add the confirmed ones
            });
        };

        $.fn.fill_nav = function (li, dest) {
            $(li).each(function () {
                var cp = $(this).clone();
                cp.remove_class_except('s--active').removeAttr('id');
                cp.appendTo($(dest));
            });
        };

        document.querySelector('.navbar__toggle')
            .addEventListener('click', function () {
                this.classList.toggle('active');
            });

        projectName.globals.get_filename = function (path) {
            return path.split('/').reverse()[0].replace(/\.[^/.]+$/, '');
        };

        projectName.globals.object_chain = function (chains) {
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
