import styles from './styles.scss'
import * as api from './utils/api'
import * as detection from './utils/detection'
import sizeModule from './modules/size'
import config from './config.json'

class GithubEnhancements {
	constructor(configuration) {
		this.configuration = configuration
		this.modules = [
			new sizeModule()
		]
		this.parameters = {}
		this.observer = null
	}

	updateParameters() {
		this.parameters = detection.getRepositoryParameters()
		
		if (this.parameters.isCodeExplorer) {
			const uiSelectedBranch = document.querySelector('.branch-select-menu span').textContent
			this.fixForBranchesWithSlashes(uiSelectedBranch)
			this.fixForEmptyBranch(uiSelectedBranch)
		}
	}

	fixForBranchesWithSlashes() {
		const uiSelectedBranch = document.querySelector('.branch-select-menu span').textContent
		if (uiSelectedBranch.indexOf('/') !== -1) {
			this.parameters.branch = uiSelectedBranch

			let temporal = uiSelectedBranch.split('/')
			temporal.shift()
			const pathToReplace = temporal.join('/')
	
			this.parameters.path = this.parameters.path.replace(pathToReplace, '')
		}
	}

	fixForEmptyBranch(selectedBranch) {
		if (this.parameters.branch === undefined) {
			this.parameters.branch = selectedBranch
		}
	}

	run() {
		this.updateParameters()

		if (this.parameters.isCodeExplorer) {
			const repositoryInformation = api.getRepositoryInformation(this.configuration.API_TOKEN, this.parameters.username, this.parameters.repository)
			const repositoryContents = api.getRepositoryContent(this.configuration.API_TOKEN, this.parameters.username, this.parameters.repository, this.parameters.branch, this.parameters.path)
	
			Promise
				.all([repositoryInformation, repositoryContents])
				.then(responses => {
					this.modules.forEach(module => {
						module.setParameters(responses[0], responses[1])
						module.run()
					})
			
					if (this.observer == null) {
						const config = { attributes: false, childList: true }
						this.observer = new MutationObserver(this.run.bind(this))
						this.observer.observe(document.getElementById('js-repo-pjax-container'), config)
					}
				})
		}
	}
}

const app = new GithubEnhancements(config)
app.run()
