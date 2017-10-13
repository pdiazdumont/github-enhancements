import detection from './utils/detection.js'
import * as api from './utils/api.js'

const response = api.getRepositoryContent('laravel', 'laravel')
const elements = response.then((response) => {
	let folders = []
	let files = []
	let others = []
	for (let element of response) {
		switch (element.type) {
			case 'file':
				files.push(element)
				break
			case 'dir':
				folders.push(element)
				break
			default: others.push(element)
		}
	}
	return folders.sort(orderAscending).concat(files.sort(orderAscending)).concat(others.sort(orderAscending))
})

elements.then((data) => {
	const rows = document.querySelectorAll('table.files tbody .js-navigation-item')
	for (let index in data) {
		if (data[index].type == 'file') {
			const node = document.createElement('td')
			node.innerHTML = `<td>${data[index].size}</td>`
			rows[index].appendChild(node)
		}
	}
})

function orderAscending(first, second) {
	if (first.name > second.name) return 1
	if (first.name < second.name) return -1
	return 0
}


// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
// 	console.log(request)
// })

// chrome.runtime.sendMessage({
// 	text: 'listen'
// })
