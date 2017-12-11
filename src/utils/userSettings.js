const getUserSettings = function() {
	let promise = new Promise((resolve, reject) => {
		chrome.storage.sync.get('userSettings', items => {
			let error = chrome.runtime.lastError
			if (error) {
				reject(error)
			}
			else {
				resolve(items)
			}
		})
	})
	return promise
}

export { getUserSettings }
