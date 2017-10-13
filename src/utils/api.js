import constants from "./../constants"

const getRepositoryContent = (username, repository, path = '', branch = 'master') => {
	return fetch(eval('`' + constants.GITHUB_API_CONTENT + '`'))
		.then((response) => {
			if (response.ok) {
				return response.json()
			} else {
				console.error('WRONG RESPONSE')
			}
		})
		.catch((error) => {
			console.error(error)
		})
}

const getRepositoryTree = (username, repository, branch = 'master') => {
	return fetch(eval('`' + constants.GITHUB_API_TREE + '`'))
		.then((response) => {
			if (response.ok) {
				return response.json()
			} else {
				console.error('WRONG RESPONSE')
			}
		})
		.catch((error) => {
			console.error(error)
		})
}

export { getRepositoryContent, getRepositoryTree }
