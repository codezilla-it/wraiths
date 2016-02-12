// ---------------------------------------------
// @modal
// ---------------------------------------------

var Module = (function () {

    // Private Methods
    // ---------------------------------------------

    // Public Methods
    // ---------------------------------------------

    var init = function () {

        // Handle dynamic content height
        // -----------------------------

        if ($('.m--modal').exists()) {
            $(window).on('resize', function () {
                $('body').handle_content_height($('.m--content'), $('.m--navbar'), $('.m--footer'));
            }).resize();
        }

    };

    // Module API
    // ---------------------------------------------

    return {
        init: init
    };

})();

// Module Export
// ---------------------------------------------

module.exports = Module;