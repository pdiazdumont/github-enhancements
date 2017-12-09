import styles from './styles.scss'
import * as api from './utils/api'
import * as detection from './utils/detection'
import sizeModule from './modules/size'
import constants from './constants'

const observer = null
let modules = null

start()

function start() {
	const parameters = detection.getRepositoryParameters()
	
	if (parameters && parameters.isCodeExplorer) {
		const repositoryInformation = api.getRepositoryInformation(parameters.username, parameters.repository)

		if (parameters.branch === undefined) {
			parameters.branch = repositoryInformation.default_branch
		}

		const uiSelectedBranch = document.querySelector('.branch-select-menu span').textContent
		if (uiSelectedBranch.indexOf('/') !== -1) {
			parameters.branch = uiSelectedBranch

			let temporal = uiSelectedBranch.split('/')
			temporal.shift()
			const pathToReplace = temporal.join('/')
	
			parameters.path = parameters.path.replace(pathToReplace, '')
		}

		const repositoryContent = api.getRepositoryContent(parameters.username, parameters.repository, parameters.branch, parameters.path)
		
		Promise
			.all([repositoryInformation, repositoryContent])
			.then(responses => {
				modules = [
					new sizeModule(responses[0], responses[1])
				]
				modules.forEach(module => module.run())
		
				if (observer == null) {
					const config = { attributes: false, childList: true }
					const observer = new MutationObserver(callback)
					// observer.observe(document.getElementById('js-repo-pjax-container'), config)
				}
			})
	}
}

const callback = function(mutations) {
	start()
	// modules.forEach(module => module.run())
}
