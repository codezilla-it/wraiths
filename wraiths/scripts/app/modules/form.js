// ---------------------------------------------
// @form
// ---------------------------------------------

var wraith_form = (function () {

    // Private Methods
    // ---------------------------------------------

    function open_select(elem) {
        if (document.createEvent) {
            var e = document.createEvent("MouseEvents");
            e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            elem[0].dispatchEvent(e);
        } else if (elem.fireEvent) {
            elem[0].fireEvent("onmousedown");
        }
    }

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
                modules: 'file',
                onElementValidate: function (valid, $el, $form, errorMess) {
                    //					console.log('Input ' +$el.attr('name')+ ' is ' + ( valid ? 'VALID':'NOT VALID') );
                    var objectError = $el.closest('.' + feedback);
                    var elemId = $el.attr("id");

                    if (valid) {
                        addInputSuccessClass(objectError, elemId, feedback);
                    } else {
                        addInputErrorClass(objectError, feedback);

                        // Aggiungo un Fake Error per gli input di tipo File
                        $el.closest('.o--form__upload').siblings('.o--form__fake-errors').text(errorMess);
                    }
                },
                borderColorOnError: '',
                errorMessageClass: 'errors'
            });
        }
    }

    function init () {

        $('.o--form__upload .o--form__input').on('change', function () {
            var $that = $(this);
            var file_upload = $that.closest('.o--form__upload');
            var file_path = $that.val();
            var file_path_array = file_path.split('\\');
            var last_path_element = file_path_array.length - 1;

            if (last_path_element === 0) {
                file_path_array = file_path.split('\/');
                last_path_element = file_path_array.length - 1;
            }

            file_upload.find('.o--form__fake-input .o--text').text(file_path_array[last_path_element]);
        });

        $('.o--form__icon-select, .o--form__field .o--icon').each(function (idx, el) {
            $(el).on('click', function () {
                open_select($(el).siblings("select"));
            });
        });
    }

    // Module API
    // ---------------------------------------------

    return {
        init: init(),
        validation: validation
    };

})();

// Module Export
// ---------------------------------------------

module.exports = wraith_form;