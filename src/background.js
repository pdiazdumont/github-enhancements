chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		if (tabId == sender.tab.id) {
			chrome.tabs.sendMessage(tabId, 'trigger')
		}
	})
});
