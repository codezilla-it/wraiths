// ---------------------------------------------
// @modal
// ---------------------------------------------

module.exports = (function () {

	// Private Methods
	// ---------------------------------------------

	// Public Methods
	// ---------------------------------------------

	function init() {

		// Handle dynamic content height
		// -----------------------------

		if ($('.m--modal').exists()) {
			$(window).on('resize', function () {
				$('body').handle_content_height();
			}).resize();
		}

	}

	// Module API
	// ---------------------------------------------

	return {
		init: init
	};

})();
