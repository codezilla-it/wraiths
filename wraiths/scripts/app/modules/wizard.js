// ---------------------------------------------
// @wizard
// ---------------------------------------------

require('./bower_components/jquery.steps/build/jquery.steps.min.js');

var Module = (function () {
	
	function init () {
		console.log("Ho fatto l'init!");
    }
	
	return {
        init: init
    };
})();

// Module Export
// ---------------------------------------------

module.exports = Module;