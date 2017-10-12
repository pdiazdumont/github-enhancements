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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var filesInDirectory = function filesInDirectory(dir) {
    return new Promise(function (resolve) {
        return dir.createReader().readEntries(function (entries) {
            return Promise.all(entries.filter(function (e) {
                return e.name[0] !== '.';
            }).map(function (e) {
                return e.isDirectory ? filesInDirectory(e) : new Promise(function (resolve) {
                    return e.file(resolve);
                });
            })).then(function (files) {
                var _ref;

                return (_ref = []).concat.apply(_ref, _toConsumableArray(files));
            }).then(resolve);
        });
    });
};

var timestampForFilesInDirectory = function timestampForFilesInDirectory(dir) {
    return filesInDirectory(dir).then(function (files) {
        return files.map(function (f) {
            return f.name + f.lastModifiedDate;
        }).join();
    });
};

var reload = function reload() {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

        if (tabs[0]) {
            chrome.tabs.reload(tabs[0].id);
        }

        chrome.runtime.reload();
    });
};

var watchChanges = function watchChanges(dir, lastTimestamp) {

    timestampForFilesInDirectory(dir).then(function (timestamp) {

        if (!lastTimestamp || lastTimestamp === timestamp) {

            setTimeout(function () {
                return watchChanges(dir, timestamp);
            }, 1000); // retry after 1s
        } else {

            reload();
        }
    });
};

chrome.management.getSelf(function (self) {

    if (self.installType === 'development') {

        chrome.runtime.getPackageDirectoryEntry(function (dir) {
            return watchChanges(dir);
        });
    }
});

/***/ })

/******/ });
//# sourceMappingURL=hot-reload.js.map