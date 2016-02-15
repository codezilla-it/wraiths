// ---------------------------------------------
// @wizard
// ---------------------------------------------

var wraith_wizard = (function () {
	
	function init (form_id, option) {
		
		var form = $(form_id);
		
		var wizard = form.steps({
			headerTag: option.headerTag,
			bodyTag: option.bodyTag,
			transitionEffect: "slideLeft"
		});
    }
	
	return {
        init: init
    };
})();

// Module Export
// ---------------------------------------------

module.exports = wraith_wizard;