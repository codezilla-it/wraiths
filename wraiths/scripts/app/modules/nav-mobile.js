// ---------------------------------------------
// @nav-mobile
// ---------------------------------------------

var wraiths = process.wraith.modules;

wraiths.nav_mobile = (function () {

    // Private Methods
    // ---------------------------------------------

    function nav_open(button, overlay) {
        $(overlay + ',' + button).addClass('s--active');
    }

    function nav_close(button, overlay) {
        $(overlay + ',' + button).removeClass('s--active');
    }

    function nav_toggle(slideout, button, overlay) {

        slideout.on('open', function () {
            nav_open(button, overlay);
        });

        slideout.on('beforeopen', function () {
            nav_open(button, overlay);
        });

        slideout.on('close', function () {
            nav_close(button, overlay);
        });

        slideout.on('beforeclose', function () {
            nav_close(button, overlay);
        });
    }

    // Public Methods
    // ---------------------------------------------

    function slide_out (button, main, menu, overlay) {

        var slideout = new Slideout({
            'panel': document.getElementById(main),
            'menu': document.getElementById(menu),
            'padding': 256,
            'tolerance': 70
        });

        $(button + ',' + overlay).on('click', function () {
            slideout.toggle();
            nav_toggle(slideout, button, overlay);
        });
    }

    // Module API
    // ---------------------------------------------

    return {
        slide_out: slide_out
    };

})();

// Module Export
// ---------------------------------------------

module.exports = wraiths.nav_mobile;