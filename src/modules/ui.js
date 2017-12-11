export default class uiModule {
	constructor() {
		this.key = 'ui'
		this.settings = null
	}

	isIndependent() {
		return true
	}

	setSettings(settings) {
		this.settings = settings
	}
	
	run() {
		if (this.settings.full_width) {
			const containers = document.querySelectorAll('.Header .container-lg, .container')
			if (containers.length !== 0) {
				containers.forEach(node => node.classList.add('gh-container'))
			}
		}
	}
}
