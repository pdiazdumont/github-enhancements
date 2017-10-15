const constants = {
	"GITHUB_RESERVED_PATHS": [
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
	"GITHUB_API_CONTENT": 'https://api.github.com/repos/${username}/${repository}/contents/${path}?ref=${branch}',
	"GITHUB_API_TREE": 'https://api.github.com/repos/${username}/${repository}/git/trees/${branch}?recursive=1',
}

export default constants;
