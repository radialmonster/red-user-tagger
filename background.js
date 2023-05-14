// Initialize the storage with an empty list of usernames if it's not already set.
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.get('usernames', function(data) {
    if (Object.keys(data).length === 0) {
      chrome.storage.local.set({usernames: {}});
    }
  });
});
