import constants from "./../constants"

const getRepositoryInformation = (username, repository) => {
	return fetch(buildRequest(eval('`' + constants.GITHUB_API_INFORMATION + '`')))
		.then(checkResponse)
		.then(json)
		.catch((error) => {
			console.error(error)
		})
}

const getRepositoryContent = (username, repository, branch = 'master', path = '') => {
	return fetch(buildRequest(eval('`' + constants.GITHUB_API_CONTENT + '`')))
		.then(checkResponse)
		.then(json)
		.catch((error) => {
			console.error(error)
		})
}

function buildRequest(url) {
	return new Request(url, {
		method: 'GET',
		headers: new Headers({
			'Authorization': 'token 5f44b4ebc5f7e6face52c3bdae8038c665d901b8'
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
