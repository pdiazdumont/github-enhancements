import constants from "./../constants"
import XRegExp from 'xregexp/xregexp-all'

const isCodeExplorer = () => {
	const url = window.location.pathname
	let urlParts = url.split('/')
	urlParts.shift()
	return (isNotReservedPath() &&
	/\/[a-zA-Z-_.]+\/[a-zA-Z-_.]+(\/(tree|blob|find)\/[a-zA-Z-_.]+(\/[a-zA-Z-_.]+)+)?/.test(url))
}

const isNotReservedPath = () => {
	const urlParts = window.location.pathname.split('/')
	return constants.GITHUB_RESERVED_PATHS.indexOf(urlParts[1]) === -1
}

const getUsernameAndRepo = () => {
	if (isCodeExplorer()) {
		let urlParts = window.location.pathname.split('/')
		urlParts.shift()
		return {
			username: urlParts[0],
			repository: urlParts[1]
		}
	}
	return false
}

const getRepositoryInformation = () => {
	if (isCodeExplorer()) {
		const url = window.location.pathname
		let urlParts = url.split('/')
		urlParts.shift()
		
		const expression = '[a-zA-Z0-9-_.]+'
		const regex = new XRegExp(`
		\/(?<username> ${expression}) -?
		\/(?<repository> ${expression}) -?
		(\/(tree|blob)
		\/(?<branch> ${expression}) -?
		(?<path> (\/${expression})+)?)? -?`, 'x')
		const match = XRegExp.exec(url, regex)

		return {
			username: match.username,
			repository: match.repository,
			branch: match.branch || 'master',
			path: match.path ? match.path.substr(1) : ''
		}
	}
	return false
}

export { isCodeExplorer, getUsernameAndRepo, getRepositoryInformation }
