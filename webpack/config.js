const path = require('path');
const versionFilePlugin = require('webpack-version-file-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		app: "./src/app.js",
		"hotReload": "./src/extension/hotReload.js",
		"background": "./src/extension/background.js"
	},
	output: {
		path: path.resolve(__dirname, "../build"),
		filename: "./js/[name].js"
	},
	devtool: "source-map",
	watch: true,
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({ fallback: "style-loader", use: ["css-loader", "sass-loader"] })
			},
			{ test: /\.js$/, use: "babel-loader", exclude: "/node_modules" }
		]
	},
	plugins: [
		new versionFilePlugin({
			packageFile: path.resolve(__dirname, "../package.json"),
			template: path.resolve(__dirname, "../src/extension/manifest.json"),
			outputFile: path.resolve(__dirname, "../build/manifest.json")
		}),
		new ExtractTextPlugin("css/app.css")
	],
	resolve: {
		modules: [path.resolve(__dirname, "src"), "./node_modules"],
		extensions: [".js"]
	}
}
