// ---------------------------------------------
// @modal
// ---------------------------------------------

var wraiths = process.wraith.modules;

wraiths.modal = (function () {

    // Private Methods
    // ---------------------------------------------

    // Public Methods
    // ---------------------------------------------

    function init () {

        // Handle dynamic content height
        // -----------------------------

        if ($('.m--modal').exists()) {
            $(window).on('resize', function () {
                $('body').handle_content_height($('.m--content'), $('.m--navbar'), $('.m--footer'));
            }).resize();
        }

    }

    // Module API
    // ---------------------------------------------

    return {
        init: init
    };

})();

// Module Export
// ---------------------------------------------

module.exports = wraiths.modal;