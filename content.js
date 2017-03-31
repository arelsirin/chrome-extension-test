// /** 
//  * Receive messages from background page
//  */
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if(request.message === 'first_tab_closed') {
//     	alert('aalala');
//       document.body.innerHTML = 'THE TAB WAS CLOSED';
//     }
//   }
// );

chrome.runtime.sendMessage({message: 'tab_complete'}, function(response) {
	chrome.storage.sync.get('activated', function(item){
		if (!chrome.runtime.lastError && item.activated) {
			if(response.message === 'first_tab_closed') {
				document.body.innerHTML = 'THE TAB WAS CLOSED';
		    }
		}
	});
    
});