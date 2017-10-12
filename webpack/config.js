const path = require('path');
const versionFilePlugin = require('webpack-version-file-plugin');

module.exports = {
	entry: {
		app: "./src/app.js",
		"hot-reload": "./src/hot-reload.js",
		"background": "./src/background.js"
	},
	output: {
		path: path.resolve(__dirname, "../build"),
		filename: "./js/[name].js"
	},
	devtool: "source-map",
	watch: true,
	module: {
		rules: [
			{ test: /\.js$/, use: "babel-loader", exclude: "/node_modules" }
		]
	},
	plugins: [
		new versionFilePlugin({
			packageFile: path.resolve(__dirname, "../package.json"),
			template: path.resolve(__dirname, "../src/manifest.json"),
			outputFile: path.resolve(__dirname, "../build/manifest.json")
		})
	],
	resolve: {
		modules: [path.resolve(__dirname, "src"), "/node_modules"],
		extensions: [".js"]
	}
}
