/**
 * Setup settings
 */
 function init() {
 	var limitInput = document.getElementById('tabs-limit');

 	// set the default value to the tab limit input
	chrome.storage.sync.get('tabsLimit', function(item){
		if (!chrome.runtime.lastError && item.tabsLimit) {
			limitInput.value = item.tabsLimit;	
		}
	});

	// store selected tabsLimit
 	limitInput.onchange = function () {
 		chrome.extension.getBackgroundPage().storeValue('tabsLimit', limitInput.value);
 	}

 }

document.addEventListener('DOMContentLoaded', init());
