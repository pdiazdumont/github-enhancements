import constants from './../constants'
import XRegExp from 'xregexp/xregexp-all'

const getRepositoryParameters = function() {
	const repositoryParameters = {}
	
	const expression = '[a-zA-Z0-9-_.]+'
	const regex = new XRegExp(`
		\/$|
		\/(?<rootFirstDiscriminator> ${expression} -?)$|
		\/(?<multipleFirstDiscriminator> ${expression} -?)\/(?<multipleSecondDiscriminator> ${expression} -?)$|
		\/(?<codeExplorerFullFirstDiscriminator> ${expression} -?)\/(?<codeExplorerFullSecondDiscriminator> ${expression} -?)(\/(tree|blob)\/(?<codeExplorerFullThirdDiscriminator> ${expression} -?)(?<codeExplorerFullFourthDiscriminator> ((\/${expression})+)?)+ -?)$|
		\/(?<codeExplorerToolsFirstDiscriminator> ${expression} -?)\/(?<codeExplorerToolsSecondDiscriminator> ${expression} -?)\/(?<codeExplorerToolsThirdDiscriminator> ${expression} -?)((\/${expression})+)?$
	`, 'x');
	
	const match = XRegExp.exec(window.location.pathname, regex)

	const type = getTypeOfPage(match)

	return getParametersForPage(type, match)
}

function getTypeOfPage(match) {
	if (match.rootFirstDiscriminator !== undefined) {
		return constants.PAGES.GENERIC
	}

	if (match.multipleFirstDiscriminator !== undefined) {
		return constants.PAGES.CODE_EXPLORER_ROOT
	}
	
	if (match.codeExplorerToolsFirstDiscriminator !== undefined) {
		return constants.PAGES.CODE_EXPLORER_TOOLS
	}

	if (match.codeExplorerFullFirstDiscriminator !== undefined) {
		return constants.PAGES.CODE_EXPLORER_FULL
	}

	return constants.PAGES.ROOT
}

function getParametersForPage(pageType, match) {
	switch (pageType) {
		case constants.PAGES.ROOT:
			return false
		break
		case constants.PAGES.GENERIC:
			if (constants.GITHUB_ROOT_RESERVED_PATHS.indexOf(match.rootFirstDiscriminator) !== -1) {
				return false
			}

			return {
				isCodeExplorer: false,
				username: match.rootFirstDiscriminator
			}
		break
		case constants.PAGES.CODE_EXPLORER_ROOT:
			if (constants.GITHUB_ROOT_RESERVED_PATHS.indexOf(match.multipleFirstDiscriminator) !== -1) {
				return false
			}

			return {
				isCodeExplorer: true,
				username: match.multipleFirstDiscriminator,
				repository: match. multipleSecondDiscriminator
			}
		break
		case constants.PAGES.CODE_EXPLORER_FULL:
			return {
				isCodeExplorer: true,
				username: match.codeExplorerFullFirstDiscriminator,
				repository: match.codeExplorerFullSecondDiscriminator,
				branch: match.codeExplorerFullThirdDiscriminator,
				path: match.codeExplorerFullFourthDiscriminator
			}
		break
		case constants.PAGES.CODE_EXPLORER_TOOLS:
			if (constants.GITHUB_CODE_EXPLORER_RESERVED_PATHS.indexOf(match.codeExplorerToolsThirdDiscriminator) !== -1) {
				return false
			}

			return {
				isCodeExplorer: false,
				username: match.codeExplorerToolsFirstDiscriminator,
				repository: match.codeExplorerToolsSecondDiscriminator
			}
		break
		default:
			return false
		break
	}
}

export { getRepositoryParameters }
