/**
 * Stores in chrome storage 
 * @param key - the key of the item
 * @param value - the value of the item
 */
function storeValue(key, value) {
	var obj = {};
	obj[key] = value; 
	chrome.storage.sync.set(obj);
}

/** 
 * Loads a json file and executes a callback upon load success
 * @param file - the url of the file
 * @param callback - a callback function to be executed upon load success
 *
 */
function loadJSONFile(file, callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', file , true);
    xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == '200') {
			callback(xobj.responseText);
		}
    };
    xobj.send(null);  
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
 * Closes the tab with the given id
 * @param tabId - the id of the tab
 */
function closeTab(tabId) {
	chrome.tabs.remove(tabId);
}

/**
 * Sends a single message to the content script(s) in the specified tab
 */
function sendMessage(tabId) {
	chrome.tabs.sendMessage(tabId, {"message": "first_tab_closed"}, function() {
		if (chrome.runtime.lastError) {
			alert(chrome.runtime.lastError.message);
		}
	});
}

setDefaultValues();
var newTabId = 0;

/**
 * When a new tab is opened, check against the limit and close the first one
 * if limit is exceeded.
 */
chrome.tabs.onCreated.addListener(function(tab){
	// first we check if extension is activated 
	chrome.storage.sync.get('activated', function(item){
		if (!chrome.runtime.lastError && item.activated) {
			chrome.storage.sync.get('tabsLimit', function(item){
				if (!chrome.runtime.lastError && item.tabsLimit) {
					chrome.tabs.query({currentWindow: true}, function(tabs) {
						if (tabs.length > item.tabsLimit) {
							// close first tab
							closeTab(tabs[0].id);
							newTabId = tab.id;
						}
					});
				} else {
					alert('ouch! an error ocurred');
				}
			});
		}
	});
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	if (message.message == 'tab_complete' && sender.tab.id == newTabId) {
		sendResponse({"message": "first_tab_closed"});		
	}
});





