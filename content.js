/** 
 * Receive messages from background
 */
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      alert('Clickearon');
    }
  }
);