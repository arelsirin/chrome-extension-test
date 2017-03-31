/**
 * Initializes the extension
 */
function init() {
	var numberTabsSpan = document.getElementById('number-tabs');
	chrome.tabs.query({}, function(tabs) {
		numberTabsSpan.innerHTML = tabs.length;
	});
}

/**
 * When content is loaded, initialize the extension
 */
document.addEventListener('DOMContentLoaded', function() {
	init();
});
