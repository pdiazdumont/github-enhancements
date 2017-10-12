/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var constants = {
	"GITHUB_RESERVED_PATHS": ["marketplace", "issues", "pulls", "notifications", "showcases", "trending", "organizations", "new", "search", "watching", "explore", "contact", "features", "blog", "about"],
	"GITHUB_API_TREE": 'https://api.github.com/repos/${username}/${repository}/git/trees/${branch}?recursive=1'
};

exports.default = constants;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _detection = __webpack_require__(2);

var _detection2 = _interopRequireDefault(_detection);

var _api = __webpack_require__(3);

var api = _interopRequireWildcard(_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

api.getRepositoryTree('laravel', 'laravel');

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
// 	console.log(request)
// })

// chrome.runtime.sendMessage({
// 	text: 'listen'
// })

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var detectionUtils = {
	isCodeExplorer: function isCodeExplorer() {
		var url = window.location.pathname;
		var urlParts = url.split('/');
		urlParts.shift();
		return _constants2.default.GITHUB_RESERVED_PATHS.indexOf(urlParts[0]) === -1 && /\/[a-zA-Z-_.]+\/[a-zA-Z-_.]+\/(tree|blob|find)\/[a-zA-Z-_.]+(\/[a-zA-Z-_.]+)+/.test(url);
	},
	getUsernameAndRepo: function getUsernameAndRepo() {
		var urlParts = window.location.pathname.split('/');
		urlParts.shift();
		if (urlParts.length >= 2 && _constants2.default.GITHUB_RESERVED_PATHS.indexOf(urlParts[0]) === -1) {
			return {
				username: urlParts[0],
				repository: urlParts[1]
			};
		}
		return false;
	}
};

exports.default = detectionUtils;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getRepositoryTree = undefined;

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRepositoryTree = function getRepositoryTree(username, repository) {
	var branch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'master';

	fetch(eval('`' + _constants2.default.GITHUB_API_TREE + '`')).then(function (response) {
		if (response.ok) {
			console.log(response);
		} else {
			console.error('WRONG RESPONSE');
		}
	}).catch(function (error) {
		console.error(error);
	});
};

exports.getRepositoryTree = getRepositoryTree;

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map