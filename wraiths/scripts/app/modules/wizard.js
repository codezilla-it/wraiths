// ---------------------------------------------
// @wizard
// ---------------------------------------------

require('./bower_components/jquery.steps/build/jquery.steps.min.js');

var wraiths = process.wraith.modules;

wraiths.wizard = (function () {
	
	function init () {
		console.log("Ho fatto l'init!");
    }
	
	return {
        init: init
    };
})();

// Module Export
// ---------------------------------------------

module.exports = wraiths.wizard;