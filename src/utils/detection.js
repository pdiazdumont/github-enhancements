import constants from "./../constants"
import XRegExp from 'xregexp/xregexp-all'

const detectionUtils = {
	isCodeExplorer: () => {
		const url = window.location.pathname
		let urlParts = url.split('/')
		urlParts.shift()
		return (constants.GITHUB_RESERVED_PATHS.indexOf(urlParts[0]) === -1 &&
		/\/[a-zA-Z-_.]+\/[a-zA-Z-_.]+\/(tree|blob|find)\/[a-zA-Z-_.]+(\/[a-zA-Z-_.]+)+/.test(url))
	},
	getUsernameAndRepo: () => {
		let urlParts = window.location.pathname.split('/')
		urlParts.shift()
		if (urlParts.length >= 2 && constants.GITHUB_RESERVED_PATHS.indexOf(urlParts[0]) === -1) {
			return {
				username: urlParts[0],
				repository: urlParts[1]
			}
		}
		return false
	},
	getRepositoryInformation: () => {
		const url = window.location.pathname
		let urlParts = url.split('/')
		urlParts.shift()

		if (urlParts.length == 2 && constants.GITHUB_RESERVED_PATHS.indexOf(urlParts[0]) === -1) {
			return {
				username: urlParts[0],
				repository: urlParts[1]
			}
		}
		
		if (urlParts.length > 2 && constants.GITHUB_RESERVED_PATHS.indexOf(urlParts[0]) === -1) {
			const expression = '[a-zA-Z-_.]+'
			const regex = new XRegExp(`
			\/(?<username> ${expression}) -?
			\/(?<repository> ${expression}) -?
			\/(tree|blob)
			\/(?<branch> ${expression}) -?
			(?<path> (\/${expression})+) -?`, 'x')
			const match = XRegExp.exec(url, regex)

			return {
				username: match.username,
				repository: match.repository,
				branch: match.branch,
				path: match.path.substr(1)
			}
		}
		return false
	}
}

export default detectionUtils
