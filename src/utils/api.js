import constants from "./../constants"

const getRepositoryTree = (username, repository, branch = 'master') => {
	fetch(eval('`' + constants.GITHUB_API_TREE + '`'))
		.then((response) => {
			if (response.ok) {
				console.log(response)
			} else {
				console.error('WRONG RESPONSE')
			}
		})
		.catch((error) => {
			console.error(error)
		})
}

export { getRepositoryTree }
