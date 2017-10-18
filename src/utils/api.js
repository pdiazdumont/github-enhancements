import constants from "./../constants"

const getRepositoryContent = (username, repository, branch = 'master', path = '') => {
	return fetch(eval('`' + constants.GITHUB_API_CONTENT + '`'))
		.then(checkResponse)
		.then(json)
		.catch((error) => {
			console.error(error)
		})
}

const getRepositoryTree = (username, repository, branch = 'master') => {
	return fetch(eval('`' + constants.GITHUB_API_TREE + '`'))
		.then(checkResponse)
		.then(json)
		.catch((error) => {
			console.error('REQUEST FAILED', error)
		})
}

function checkResponse(response) {
	if (response.ok && response.status === 200) {
		return Promise.resolve(response)
	} else {
		console.error('WRONG RESPONSE')
		return Promise.reject(new Error(response.statusText))
	}
}

function json(response) {
	return response.json()
}

export { getRepositoryContent, getRepositoryTree }
