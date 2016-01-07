function init() {

    function form_toggle($target_a, $target_b, text) {
        $target_a.display_none();
        $target_b.display_block();
        $('.m--login__header > *').text(text);
    }

    // Handle dynamic content height
    // -----------------------------

    if ($('.m--login').exists()) {
        $(window).on('resize', function () {
            $('body').handle_content_height($('.m--content'), $('.m--navbar'), $('.m--footer'));
        }).resize();
    }

    // -----------------------------
    // Login
    // -----------------------------

    $('.js--forgot-password').on('click', function () {
        form_toggle($('.js--form-login'), $('.js--form-forgot-password'), 'Recupera la tua password');
    });

    $('.js--got-password').on('click', function () {
        form_toggle($('.js--form-forgot-password'), $('.js--form-login'), 'Inserisci i tuoi dati di accesso');
    });
}

module.exports = {
    init: init
};