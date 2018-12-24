(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var keyBase = "vrs_";

var store = {
    _initialize: function _initialize() {
        if (window.localStorage.getItem(keyBase) === null) {
            window.localStorage.setItem(keyBase, "[]");
        }
    },
    set: function set(key, value) {
        if (value === undefined) {
            return this.remove(key);
        }
        // Set value
        window.localStorage.setItem(keyBase + key, this.serialize(value));
        // Store key
        var keys = this.getKeys();
        if (keys.indexOf(key) === -1) {
            keys.push(key);
        }
        window.localStorage.setItem(keyBase, this.serialize(keys));

        return value;
    },
    get: function get(key) {
        var value = window.localStorage.getItem(keyBase + key);
        return value === null ? null : this.deserialize(value);
    },
    remove: function remove(key) {
        var value = this.get(key);
        // Remove value
        window.localStorage.removeItem(keyBase + key);
        // Remove key
        var keys = this.getKeys();
        var index = keys.indexOf("test");
        if (index !== -1) { keys.splice(index, 1); }
        window.localStorage.setItem(keyBase, this.serialize(keys));

        return value;
    },
    getAll: function getAll() {
        var this$1 = this;

        var items = [];
        var keys = this.getKeys();
        for (var i = 0; i < keys.length; i++) {
            items[keys[i]] = this$1.get(keys[i]);
        }
        return items;
    },
    getKeys: function getKeys() {
        return this.deserialize(window.localStorage.getItem(keyBase));
    },
    clear: function clear() {
        var this$1 = this;

        this.set(keyBase, "[]");
        var keys = this.getKeys();
        for (var i = 0; i < keys.length; i++) {
            this$1.remove(keyBase + keys[i]);
        }
    },
    serialize: function (object) {
        return JSON.stringify(object);
    },
    deserialize: function (json, defaultValue) {
        if (!json) {
            return defaultValue;
        }
        var val = JSON.parse(json);
        return val !== undefined ? val : defaultValue;
    }
};

var makeWatchers = function (storage) { return Object.keys(storage).reduce(function (acc, key) {
    var vueKey = "storage." + key;
    // allow .bind
    var handler = function handler(value) {
        store.set(key, value);
    };

    return Object.assign(( obj = {}, obj[vueKey] = {handler: handler}, obj ), acc);
    var obj;
}, {}); };

var ReactiveStorage = {
    install: function install(Vue, options) {
        store._initialize();
        var local = store.getAll();
        var values = Object.keys(options).reduce(function (acc, key) {
            var value = local[key] || options[key];
            return Object.assign(( obj = {}, obj[key] = value, obj ), acc);
            var obj;
        }, {});

        Vue.mixin({
            data: function data() {
                return {
                    get storage() {
                        return values;
                    }
                };
            },
            watch: makeWatchers(values)
        });
    }
};

/* harmony default export */ __webpack_exports__["default"] = (ReactiveStorage);


/***/ })
/******/ ]);
});