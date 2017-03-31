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
		var switchElement = document.getElementById('switch');
		backgroundPage.storeValue('activated', switchElement.checked);
	}
}

/**
 * When content is loaded, initialize the extension
 */
document.addEventListener('DOMContentLoaded', function() {
	init();
});
