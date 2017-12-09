import constants from "./../constants"

const getRepositoryInformation = (token, username, repository) => {
	return fetch(buildRequest(eval('`' + constants.GITHUB_API_INFORMATION + '`'), token))
		.then(checkResponse)
		.then(json)
		.catch((error) => {
			console.error(error)
		})
}

const getRepositoryContent = (token, username, repository, branch = 'master', path = '') => {
	return fetch(buildRequest(eval('`' + constants.GITHUB_API_CONTENT + '`'), token))
		.then(checkResponse)
		.then(json)
		.catch((error) => {
			console.error(error)
		})
}

function buildRequest(url, token) {
	return new Request(url, {
		method: 'GET',
		headers: new Headers({
			'Authorization': `token ${token}`
		})
	})
}

function checkResponse(response) {
	if (response.ok && response.status === 200) {
		return Promise.resolve(response)
	}
	return Promise.reject(new Error(`Error: wrong response. "${response.statusText}"`))
}

function json(response) {
	return response.json()
}

export { getRepositoryInformation, getRepositoryContent }
