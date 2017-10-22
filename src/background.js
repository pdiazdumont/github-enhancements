const status = {
	events: []
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	const eventIdentifier = message.text

	if (status.events.indexOf(eventIdentifier) !== -1) {
		return
	}

	switch (eventIdentifier) {
		case 'Generic.TabUpdated':
			chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
				if (tabId === sender.tab.id && changeInfo.url !== undefined) {
					chrome.tabs.sendMessage(tabId, 'trigger')
				}
			})
		break
	}
	status.events.push(eventIdentifier)
});
