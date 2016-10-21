/**
 * Created by serpe on 19/10/16.
 */
// ---------------------------------------------
// @sms-resend
// ---------------------------------------------

module.exports = (function () {
    var limitSeconds = 45;
    var timeout;

    // Private Methods
    // ---------------------------------------------

    function clock(second) {
        var s = second || 0;
        var $s = $(".sms-timer");
        // console.log(s);
        var $smsResend = $(".sms-resend .button--resendCode");
        if (s < limitSeconds) {
            if (!$smsResend.hasClass("not-active")) {
                $smsResend.addClass("not-active");
                $(".button--resendCode__text").html('Aspetta l\'SMS...<br>Arriverà entro <span class="button--resendCode__text-seconds"></span> secondi.');
                $(".sms-resend .button--resendCode div").show();
            }
            $s.val(s).trigger("change");
            $(".button--resendCode__text-seconds").html(limitSeconds - s);
            s++;
            timeout = setTimeout(function () {
                clock(s);
            }, 1000);
        } else {
            $s.val(s).trigger("change");
            $smsResend.removeClass("not-active");
            $(".button--resendCode__text").html("Il codice non è ancora arrivato?<br>Clicca qui per il reinvio.");
            $(".sms-resend .button--resendCode div").hide();
        }

    }

    // Public Methods
    // ---------------------------------------------

    function init() {

        $(".sms-timer").knob({
            'width': '12%',
            'min': 0,
            'max': limitSeconds,
            'readOnly': true,
            'thickness': 1,
            'cursor': false,
            'fgColor': '#295fbb',
            'bgColor': '#D8D1E6',
            'displayinput': false,
            'skin': 'tron',
            'displayInput': false
        });

        $('#CodeSended').on('PhoneNumberModified', function () {
            clearTimeout(timeout);
            clock();
        });
    }

    // Module API
    // ---------------------------------------------

    return {
        init: init,
        clock: clock
    };

})();
