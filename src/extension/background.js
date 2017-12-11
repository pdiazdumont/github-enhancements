import defaultUserSettings from './../userSettings.json'

chrome.runtime.onInstalled.addListener(e => {
	chrome.storage.sync.clear(e => {
		chrome.storage.sync.get('userSettings', items => {
			if (!chrome.runtime.lastError) {
				if (Object.keys(items).length) {
					//TODO MERGE CURRENT SETTINGS WITH NEW ONES
				} else {
					chrome.storage.sync.set({
						'userSettings': defaultUserSettings
					})
				}
			}
			else {
				console.log("NOTHING!!!!")
			}
		})
	})
})
