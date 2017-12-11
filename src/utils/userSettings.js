import defaultUserSettings from './../userSettings.json'

const getDefaultUserSettings = function() {
	chrome.storage.sync.set({ 'userSettings': defaultUserSettings }, items => {
		let error = chrome.runtime.lastError
		if (error) {
			reject(error)
		}
		else {
			resolve(items)
		}
	})
}

const getUserSettings = function() {
	let promise = new Promise((resolve, reject) => {
		chrome.storage.sync.get('userSettings', items => {
			let error = chrome.runtime.lastError
			if (error) {
				reject(error)
			}
			else {
				if (Object.keys(items).length === 0) {
					getDefaultUserSettings()
					resolve(defaultUserSettings)
				}
				else {
					resolve(items)
				}
			}
		})
	})
	return promise
}

export { getDefaultUserSettings, getUserSettings }
