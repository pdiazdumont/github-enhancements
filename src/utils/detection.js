import constants from "./../constants"

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
	}
}

export default detectionUtils
