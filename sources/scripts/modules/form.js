// ---------------------------------------------
// @form
// ---------------------------------------------

module.exports = (function () {

    // Private Methods
    // ---------------------------------------------

    function addInputSuccessClass(objectError, elemId, feedback) {
        $("#error-" + elemId).hide();
        $(objectError).removeClass(feedback + '--error').addClass(feedback + '--success');
    }

    function addInputErrorClass(objectError, feedback) {
        $(objectError).removeClass(feedback + '--success').addClass(feedback + '--error');
    }

    function removeInputClass(objectError, elemId, feedback) {
        var class_success = feedback + '--success';
        var class_error = feedback + '--error';
        $("#error-" + elemId).hide();
        $(objectError).removeClass('class_success class_error');
    }

    // Public Methods
    // ---------------------------------------------

    function validation($input, $errors) {

        var feedback = 's--feedback';

        $.each($errors, function (idx, el) {
            $(el).closest('.' + feedback).addClass(feedback + '--error');
        });

        if ($('.' + feedback)) {
            $('input[data-validation]').on('beforeValidation', function () {
                //				console.log('Input "'+this.name+'" is about to become validated');
                var value = $(this).val();
                var domValue = $(this).attr('value');
                var validation_optional = $(this).attr("data-validation-optional") || false;
                validation_optional = validation_optional === "true" ? true : false;

                if (validation_optional && value === domValue && value === "") {
                    var objectError = $(this).closest('.' + feedback);
                    var elemId = $(this).attr("id");
                    removeInputClass(objectError, elemId, feedback);
                }

            }).on('validation', function (evt, valid) {
                //				console.log('Input "'+this.name+'" is ' + (valid ? 'VALID' : 'NOT VALID'));
            });

            $.validate({
                modules: 'file, logic',
                onElementValidate: function (valid, $el, $form, errorMess) {
                    //					console.log('Input ' +$el.attr('name')+ ' is ' + ( valid ? 'VALID':'NOT VALID') );
                    var objectError = $el.closest('.' + feedback);
                    var elemId = $el.attr("id");

                    if (valid) {
                        addInputSuccessClass(objectError, elemId, feedback);
                    } else {
                        addInputErrorClass(objectError, feedback);

                        // Aggiungo un Fake Error per gli input di tipo File
                        $el.closest('.form__upload').siblings('.form__fake-errors').text(errorMess);
                    }
                },
                borderColorOnError: '',
                errorMessageClass: 'errors'
            });
        }
    }

    function init() {

        $('.form__field').on('change', 'select', function () {
            $(this).blur().focus();
        });

        // $('.form__field').on('keyup', 'input', function () {
        //     $(this).blur().focus();
        // });

        $('.form__upload').on('change', 'input', function () {
            var $that = $(this);
            var file_upload = $that.closest('.form__upload');
            var file_path = $that.val();
            var file_path_array = file_path.split('\\');
            var last_path_element = file_path_array.length - 1;

            if (last_path_element === 0) {
                file_path_array = file_path.split('\/');
                last_path_element = file_path_array.length - 1;
            }

            file_upload.find('.form__fake-input .text').text(file_path_array[last_path_element]);
        });
    }

    // Module API
    // ---------------------------------------------

    return {
        init: init(),
        validation: validation
    };

})();
