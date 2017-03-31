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