import constants from "./../constants"
import XRegExp from 'xregexp/xregexp-all'

const isCodeExplorer = () => {
	const expression = '[a-zA-Z0-9-_.]+'

	const regex = new XRegExp(`
		\/((?<username> ${expression} -?)+)\/((?<repository> ${expression} -?)+)(\/((?<discriminator> ${expression} -?)+)+)?
	`, 'x')

	const match = XRegExp.exec(window.location.pathname, regex)

	if (match == null) {
		return false
	}

	if (match.discriminator === undefined) {
		return true
	}

	if (constants.GITHUB_ROOT_RESERVED_PATHS.indexOf(match.username) !== -1) {
		return true
	}

	if (constants.GITHUB_CODE_EXPLORER_RESERVED_PATHS.indexOf(match.discriminator) === -1) {
		return true
	}

	return false
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

const getRepositoryParameters = () => {
	if (isCodeExplorer()) {
		console.log('is code explorer')
		const url = window.location.pathname
		let urlParts = url.split('/')
		urlParts.shift()

		return {
			username: urlParts[0],
			repository: urlParts[1],
			branch: urlParts[3],
			path: urlParts[4] ? url.substr(url.indexOf(urlParts[4])) : ''
		}
	}
	return false
}

export { isCodeExplorer, getUsernameAndRepo, getRepositoryParameters }
