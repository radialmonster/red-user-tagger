// Initialize the storage with an empty list of usernames if it's not already set.
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.get('usernames', function(data) {
    if (Object.keys(data).length === 0) {
      chrome.storage.local.set({usernames: {}});
    }
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'getUsernames') {
    chrome.storage.local.get('usernames', function(data) {
      sendResponse({data: data.usernames});
    });

    // This ensures the response is sent even if the listener returns before `chrome.storage.local.get` completes
    return true; 
  }
});
