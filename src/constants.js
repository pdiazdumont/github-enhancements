const constants = {
	"GITHUB_ROOT_RESERVED_PATHS": [
		"marketplace",
		"issues",
		"pulls",
		"notifications",
		"showcases",
		"trending",
		"organizations",
		"new",
		"search",
		"watching",
		"explore",
		"contact",
		"features",
		"blog",
		"about",
	],
	"GITHUB_CODE_EXPLORER_RESERVED_PATHS": [
		"commits",
		"community",
		"graphs",
		"issues",
		"labels",
		"milestones",
		"network",
		"projects",
		"pulls",
		"pulse",
		"wiki"
	],
	"GITHUB_API_INFORMATION": "https://api.github.com/repos/${username}/${repository}",
	"GITHUB_API_CONTENT": 'https://api.github.com/repos/${username}/${repository}/contents/${path}?ref=${branch}',
	"GITHUB_API_TREE": 'https://api.github.com/repos/${username}/${repository}/git/trees/${branch}?recursive=1',
}

export default constants;
