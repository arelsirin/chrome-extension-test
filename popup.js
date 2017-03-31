/**
 * Toggles tool activation
 */
function toggleActivation() {
	var switchElement = document.getElementById('switch');
	storeValue('activated', switchElement.checked);
}

/**
 * Sets the default values for the extension usage
 */
function setDefaultValues() {
	var defaultOptions = null;
	loadJSONFile('config/options.json', function(data){
		defaultOptions = JSON.parse(data);
		storeValue('tabsLimit', defaultOptions.tabsLimit);
	});
}

/**
 * Initializes the extension
 */
function init() {
	var backgroundPage = chrome.extension.getBackgroundPage();
	// store corresponding selection option
	var switchElement = document.getElementById('switch');
	var active = false;
	chrome.storage.sync.get('activated', function(item){
		if (!chrome.runtime.lastError) {
			active = item.activated;
		}
		switchElement.checked = active;
	});

	// toggle activation by click
	switchElement.onclick = function() {
		toggleActivation();
	}

	setDefaultValues();
}

/**
 * When content is loaded, initialize the extension
 */
document.addEventListener('DOMContentLoaded', function() {
	init();
});
