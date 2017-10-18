import * as detection from './../utils/detection'
import * as api from './../utils/api'
import { templates } from './templates'

const sizeModule = {
	repositoryInformation: detection.getRepositoryInformation(),
	init: () => {
		if (sizeModule.repositoryInformation) {
			const repositoryContent = api.getRepositoryContent(
				sizeModule.repositoryInformation.username,
				sizeModule.repositoryInformation.repository,
				sizeModule.repositoryInformation.branch,
				sizeModule.repositoryInformation.path)
			repositoryContent
				.then(sizeModule.groupAndSortElements)
				.then(sizeModule.processElements)
				.then(sizeModule.showRepositorySize)
		}	
	},
	groupAndSortItems: (response) => {
		let folders = [],
			files = [],
			others = []
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
		return folders.sort(sizeModule.orderByNameAscending)
			.concat(files.sort(sizeModule.orderByNameAscending))
			.concat(others.sort(sizeModule.orderByNameAscending))
	},
	processElements: (elements) => {
		if (elements.every(sizeModule.allElementsAreFolders)) {
			return
		}
	
		const rows = document.querySelectorAll('table.files tbody .js-navigation-item:not(.up-tree)')
	
		elements.forEach((item, index) => {
			const fileSizeNode = document.createElement('td')
			const downloadFileNode = document.createElement('td')
	
			if (item.type == 'file') {
				const sizeInformation = sizeModule.getReadableSizeUnit(item.size)
				fileSizeNode.innerHTML = `<span>${sizeInformation.bytes} ${sizeInformation.text}</span>`
				fileSizeNode.classList.add('file-size')
				downloadFileNode.innerHTML = `
					<a href="https://raw.githubusercontent.com/${sizeModule.username}/${sizeModule.repository}/${sizeModule.branch}/${sizeModule.path}/${item.name}" class="tooltipped tooltipped-n" aria-label="Download file" download>
						<svg aria-hidden="true" class="octicon octicon-cloud-download" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"></path></svg>
					</a>`
				downloadFileNode.classList.add('file-download')
			}
	
			rows[index].appendChild(fileSizeNode)
			rows[index].appendChild(downloadFileNode)
		})
		
		return elements
	},
	showRepositorySize: (elements) => {
		let sum = 0
		elements.forEach((item, index) => {
			if (elements[index].type === 'file') {
				sum += elements[index].size
			}
		})
		const sizeInformation = sizeModule.getReadableSizeUnit(sum)
		const container = document.querySelector('.numbers-summary')
		const repositorySizeNode = document.createElement('li')
		repositorySizeNode.innerHTML = `<svg class="octicon octicon-database" aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path d="M6 15c-3.31 0-6-.9-6-2v-2c0-.17.09-.34.21-.5.67.86 3 1.5 5.79 1.5s5.12-.64 5.79-1.5c.13.16.21.33.21.5v2c0 1.1-2.69 2-6 2zm0-4c-3.31 0-6-.9-6-2V7c0-.11.04-.21.09-.31.03-.06.07-.13.12-.19C.88 7.36 3.21 8 6 8s5.12-.64 5.79-1.5c.05.06.09.13.12.19.05.1.09.21.09.31v2c0 1.1-2.69 2-6 2zm0-4c-3.31 0-6-.9-6-2V3c0-1.1 2.69-2 6-2s6 .9 6 2v2c0 1.1-2.69 2-6 2zm0-5c-2.21 0-4 .45-4 1s1.79 1 4 1 4-.45 4-1-1.79-1-4-1z"></path></svg><span class="num text-emphasized">${sizeInformation.bytes}</span> ${sizeInformation.text}`
		container.appendChild(repositorySizeNode)
	},
	allElementsAreFolders: (element, index, array) => {
		return element.type === 'dir'
	},	
	getReadableSizeUnit: (bytes) => {
		if (bytes === 0) {
			return {
				bytes: 0,
				text: 'Bytes'
			}
		}
		let k = 1024,
			sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
			i = Math.floor(Math.log(bytes) / Math.log(k))
		return {
			bytes: parseFloat((bytes / Math.pow(k, i)).toFixed(2)),
			text: sizes[i]
		}
	},
	orderByNameAscending: (first, second) => {
		if (first.name > second.name) return 1
		if (first.name < second.name) return -1
		return 0
	}
}

export { sizeModule }
