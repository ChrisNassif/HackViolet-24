chrome.tabs.onUpdated.addListener(function(tabId_, changeInfo, tab) {
    chrome.tabs.sendMessage(tabId_, { message: 'TabLoaded' });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request.message);
});
