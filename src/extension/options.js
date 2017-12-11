import styles from './options.scss'
import defaultSettings from './../userSettings.json'

let settings = {
	modules: {
		size: {},
		ui: {}
	}
}
document.querySelectorAll('.checkbox').forEach(node => {
	node.addEventListener('change', e => {
		const key = e.srcElement.name.split('|')
		settings.modules[key[0]][key[1]] = e.srcElement.checked
	})
})

document.getElementById('submit').addEventListener('click', e => {
	chrome.storage.sync.set({
		'userSettings': settings
	})
})

document.getElementById('defaults').addEventListener('click', e => {
	chrome.storage.sync.set({
		'userSettings': defaultSettings
	})
})
