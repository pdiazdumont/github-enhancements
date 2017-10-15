import detection from './utils/detection'
import * as api from './utils/api'

const parameters = detection.getRepositoryInformation();

if (parameters) {
	const response = api.getRepositoryContent(parameters.username, parameters.repository, parameters.branch, parameters.path)
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
		const rows = document.querySelectorAll('table.files tbody .js-navigation-item:not(.up-tree)')
		for (let index in data) {
			const fileSizeNode = document.createElement('td')
			const downloadFileNode = document.createElement('td')

			if (data[index].type == 'file') {
				fileSizeNode.innerHTML = `<span>${data[index].size}</span>`
				downloadFileNode.innerHTML = `
					<a href="https://raw.githubusercontent.com/${parameters.username}/${parameters.repository}/${parameters.branch}/${parameters.path}/${data[index].name}" class="tooltipped tooltipped-n" aria-label="Download file" download>
						<svg aria-hidden="true" class="octicon octicon-cloud-download" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"></path></svg>
					</a>`
			}

			rows[index].appendChild(fileSizeNode)
			rows[index].appendChild(downloadFileNode)
		}
	})
}

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
