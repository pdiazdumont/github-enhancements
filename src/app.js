import detection from './utils/detection.js'
import * as api from './utils/api.js'

api.getRepositoryTree('laravel', 'laravel')

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
// 	console.log(request)
// })

// chrome.runtime.sendMessage({
// 	text: 'listen'
// })
