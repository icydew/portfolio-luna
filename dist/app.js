/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// styles
	__webpack_require__(1);
	__webpack_require__(5);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?importLoaders=1!./../node_modules/postcss-loader/index.js!./minireset.min.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?importLoaders=1!./../node_modules/postcss-loader/index.js!./minireset.min.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "/*! minireset.css v0.0.2 | MIT License | github.com/jgthms/minireset.css */html,body,p,ol,ul,li,dl,dt,dd,blockquote,figure,fieldset,legend,textarea,pre,iframe,hr,h1,h2,h3,h4,h5,h6{margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}ul{list-style:none}button,input,select,textarea{margin:0}html{box-sizing:border-box}*{box-sizing:inherit}*:before,*:after{box-sizing:inherit}img,embed,object,audio,video{height:auto;max-width:100%}iframe{border:0}table{border-collapse:collapse;border-spacing:0}td,th{padding:0;text-align:left}", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?importLoaders=1!./../../node_modules/resolve-url-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?importLoaders=1!./../../node_modules/resolve-url-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Roboto|Roboto+Slab:400,700);", ""]);

	// module
	exports.push([module.id, "body {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  min-height: 100%;\n  font-family: Roboto, \"Open Sans\", serif;\n  font-size: 14px;\n  color: #40485a;\n}\n\n.header {\n  background: url(" + __webpack_require__(7) + ") no-repeat center;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n}\n\n.header .container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  margin: 0 auto;\n  height: 850px;\n  max-width: 1200px;\n}\n\n.header .container .nav-top {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  height: 100px;\n  -ms-flex-align: end;\n  align-items: flex-end;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n}\n\n.header .container .nav-top .logo {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -ms-flex-align: end;\n  align-items: flex-end;\n  font-size: 30px;\n  color: #ffffff;\n}\n\n.header .container .nav-top .logo svg {\n  width: 80px;\n  height: 80px;\n}\n\n.header .container .nav-top .logo .name-logo {\n  margin-bottom: 10px;\n  font-weight: 600;\n}\n\n.header .container .nav-top .menu {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -ms-flex-align: start;\n  align-items: flex-start;\n  color: #ffffff;\n  margin-bottom: 10px;\n}\n\n.header .container .nav-top .menu .logo-menu {\n  margin-left: 15px;\n}\n\n.header .container .nav-top .menu .logo-menu svg {\n  width: 25px;\n  height: 25px;\n  fill: #4890e8;\n}\n\n.header .container .slogan {\n  font-size: 90px;\n  color: white;\n  text-align: center;\n  font-weight: 300;\n}\n\n.header .container .slogan span {\n  color: #4890e8;\n}\n\n.header .container .arrows {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -ms-flex-align: center;\n  align-items: center;\n  height: 120px;\n}\n\n.header .container .arrows .arrow {\n  margin-bottom: -6px;\n  width: 25px;\n  height: 25px;\n}\n\n.header .container .arrows .arrow.-bright {\n  fill: #765cb7;\n}\n\n.header .container .arrows .arrow.-light {\n  fill: #aa9cd2;\n}\n\n.header .container .arrows .arrow.-blue {\n  fill: #4ba9ff;\n}\n\n@media (max-width: 1200px) {\n  .header {\n    background-size: cover;\n  }\n\n  .header .container {\n    max-width: none;\n    margin: 10px 30px;\n    height: 450px;\n  }\n\n  .header .container .nav-top {\n    height: auto;\n  }\n\n  .header .container .nav-top .logo {\n    font-size: 25px;\n  }\n\n  .header .container .slogan {\n    margin-top: 50px;\n    font-size: 60px;\n  }\n\n  .header .container .arrows {\n    height: auto;\n    margin-bottom: 50px;\n  }\n}\n\n@media (max-width: 480px) {\n  .header {\n    background-size: cover;\n  }\n\n  .header .container {\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    margin: 10px 20px;\n    height: 250px;\n    max-width: none;\n  }\n\n  .header .container .nav-top {\n    height: 100px;\n    -ms-flex-align: start;\n    align-items: flex-start;\n  }\n\n  .header .container .nav-top .logo {\n    font-size: 14px;\n  }\n\n  .header .container .nav-top .logo svg {\n    width: 50px;\n    height: 50px;\n  }\n\n  .header .container .nav-top .menu {\n    margin-top: 25px;\n  }\n\n  .header .container .slogan {\n    font-size: 25px;\n    margin: 0 auto;\n  }\n\n  .header .container .arrows {\n    height: auto;\n    margin-top: 30px;\n  }\n}\n\n.about {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  background: #ffffff;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  margin: 100px auto;\n  color: #6a707d;\n}\n\n.about .container-about {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  margin: 0 auto;\n  max-width: 1200px;\n}\n\n.about .container-about .name-about {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  width: 90%;\n  color: #40485a;\n  font-size: 48px;\n  font-weight: 300;\n}\n\n.about .container-about .name-about .line {\n  width: 80px;\n  height: 3px;\n  background: #4a24a8;\n  margin-top: 25px;\n}\n\n.about .container-about .info p {\n  line-height: 1.5;\n}\n\n.photo-work {\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n}\n\n.work {\n  color: #40485a;\n  font-weight: 300;\n  margin: 90px 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n}\n\n.work .container-work {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  margin: 0 auto;\n  max-width: 1200px;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n.work .container-work .name-work {\n  height: 60px;\n  font-size: 48px;\n}\n\n.work .container-work .line {\n  width: 80px;\n  height: 3px;\n  background: #4a24a8;\n  margin-top: 25px;\n}\n\n.work .container-work .we-can {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  padding-top: 70px;\n}\n\n.work .container-work .section {\n  width: 370px;\n  text-align: center;\n  padding: 50px;\n}\n\n.work .container-work .section h2 {\n  font-size: 18px;\n  text-transform: uppercase;\n  line-height: 2.5em;\n}\n\n.work .container-work .section p {\n  font-size: 18px;\n  line-height: 1.5em;\n}\n\n.work .container-work .section .image {\n  height: 151px;\n}\n\n.work .container-work .section.-up {\n  margin-top: -15px;\n  box-shadow: 0 15px 30px rgba(137, 137, 137, 0.3);\n}\n\n.work .container-work .more {\n  height: 50px;\n  margin-top: 60px;\n}\n\n.work .container-work .more a {\n  text-transform: uppercase;\n  font-size: 18px;\n  color: #4ca9ff;\n  font-weight: 400;\n}\n\n.app {\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  background: url(" + __webpack_require__(8) + ") no-repeat center;\n}\n\n.app .container-app {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  margin: 0 auto;\n  max-width: 1200px;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n.app .container-app .mobile {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  height: 510px;\n  width: 1170px;\n  padding-top: 85px;\n}\n\n.app .container-app .mobile .payme {\n  width: 50%;\n  color: #ffffff;\n  font-weight: 300;\n  font-size: 18px;\n  padding-top: 50px;\n}\n\n.app .container-app .mobile .payme .payme-mobile {\n  font-size: 62px;\n  font-weight: 300;\n  padding-bottom: 10px;\n}\n\n.app .container-app .mobile .payme .payme-mobile span {\n  color: #4ca9ff;\n}\n\n.app .container-app .mobile .payme .payme-text {\n  color: #cfd2ff;\n}\n\n.app .container-app .mobile .payme .button {\n  margin-top: 70px;\n  background: #4ca9ff;\n  border-radius: 23px;\n  padding: 10px 30px;\n  width: 230px;\n  text-align: center;\n  box-shadow: 0 25px 30px rgba(76, 169, 255, 0.5);\n}\n\n.app .container-app .mobile .payme .button a {\n  text-decoration: none;\n  color: #ffffff;\n  text-transform: uppercase;\n  font-size: 18px;\n  font-weight: 500;\n}\n\n.app .container-app .mobile .mockups {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-align: baseline;\n  align-items: baseline;\n}\n\n.app .container-app .mobile .mockups .pay-mockup img {\n  margin-right: 70px;\n  box-shadow: 0 30px 30px rgba(0, 0, 0, 0.3);\n}\n\n.app .container-app .mobile .mockups .login-mockup img {\n  margin-bottom: -20px;\n  box-shadow: 0 30px 30px rgba(0, 0, 0, 0.3);\n}\n\n.app .container-app .lines {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  height: 3px;\n  width: 1170px;\n  -ms-flex-align: center;\n  align-items: center;\n  margin-top: 40px;\n}\n\n.app .container-app .lines .bold-line {\n  width: 23%;\n  height: 3px;\n  background: #ffffff;\n}\n\n.app .container-app .lines .thin-line {\n  width: 100%;\n  height: 1px;\n  background: #7e65bb;\n}\n\n.app .container-app .sites {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  margin-top: 45px;\n  width: 1170px;\n}\n\n.app .container-app .sites .ux {\n  font-size: 16px;\n  text-transform: uppercase;\n  color: #cfd2ff;\n}\n\n.app .container-app .sites .name-app {\n  font-size: 24px;\n  color: #ffffff;\n  font-weight: 400;\n  margin-bottom: 50px;\n}\n\n.twitter {\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  overflow: hidden;\n}\n\n.twitter .logo-twit {\n  margin: 50px 0;\n  text-align: center;\n}\n\n.twitter .twits {\n  width: 833px;\n  height: 302px;\n  background: #ffffff;\n  box-shadow: 0 15px 40px rgba(78, 78, 78, 0.21);\n  position: relative;\n  margin: 0 auto 70px;\n  text-align: center;\n  padding: 50px;\n}\n\n.twitter .twits span {\n  color: #4ca9ff;\n}\n\n.twitter .twits .twit-left {\n  position: absolute;\n  width: 833px;\n  height: 302px;\n  background: #ffffff;\n  box-shadow: 0 15px 40px rgba(78, 78, 78, 0.21);\n  margin: 0 auto;\n  text-align: center;\n  padding: 50px;\n  top: 0;\n  left: -1003px;\n  opacity: 0.2;\n}\n\n.twitter .twits .twit-right {\n  position: absolute;\n  width: 833px;\n  height: 302px;\n  background: #ffffff;\n  box-shadow: 0 15px 40px rgba(78, 78, 78, 0.21);\n  margin: 0 auto;\n  text-align: center;\n  padding: 50px;\n  top: 0;\n  right: -1003px;\n  opacity: 0.2;\n}\n\n.twitter .twits .text-twit {\n  color: #40485a;\n  font-size: 24px;\n  font-weight: lighter;\n  padding-bottom: 40px;\n}\n\n.twitter .twits .autor {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-pack: center;\n  justify-content: center;\n}\n\n.twitter .twits .autor span {\n  font-weight: 300;\n}\n\n.twitter .twits .autor .name {\n  margin-left: 10px;\n  margin-top: 5px;\n}\n\n@media (max-width: 1200px) {\n  .about {\n    margin: 50px auto;\n  }\n\n  .about .container-about {\n    max-width: none;\n    margin: 0 30px;\n  }\n\n  .about .container-about .name-about {\n    font-size: 30px;\n  }\n\n  .about .container-about .name-about .line {\n    width: 50%;\n    margin-top: 10px;\n  }\n\n  .work {\n    width: auto;\n    margin: 50px auto;\n  }\n\n  .work .container-work {\n    margin: 0 30px;\n    max-width: none;\n  }\n\n  .work .container-work .name-work {\n    height: auto;\n    font-size: 30px;\n  }\n\n  .work .container-work .line {\n    width: 10%;\n    height: 3px;\n    background: #4a24a8;\n    margin-top: 10px;\n  }\n\n  .work .container-work .we-can {\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    padding-top: 30px;\n  }\n\n  .work .container-work .section {\n    width: auto;\n    text-align: center;\n    padding: 30px;\n  }\n\n  .work .container-work .section h2 {\n    font-size: 18px;\n    text-transform: uppercase;\n    line-height: 1.5em;\n  }\n\n  .work .container-work .section p {\n    font-size: 14px;\n    line-height: 1.5rem;\n  }\n\n  .work .container-work .section .image {\n    margin: 0 auto;\n    height: 100px;\n    width: 100px;\n  }\n\n  .work .container-work .section.-up {\n    margin-top: -15px;\n    box-shadow: 0 15px 30px rgba(137, 137, 137, 0.3);\n  }\n\n  .work .container-work .more {\n    margin-top: 30px;\n    height: auto;\n  }\n\n  .work .container-work .more a {\n    text-transform: uppercase;\n    font-size: 18px;\n    color: #4ca9ff;\n    font-weight: 400;\n  }\n\n  .app .container-app {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    margin: 0 30px;\n    max-width: none;\n  }\n\n  .app .container-app .mobile {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    height: auto;\n    width: auto;\n    padding-top: 85px;\n  }\n\n  .app .container-app .mobile .payme {\n    width: 50%;\n    font-size: 14px;\n    padding-top: 30px;\n  }\n\n  .app .container-app .mobile .payme .payme-mobile {\n    font-size: 30px;\n  }\n\n  .app .container-app .mobile .payme .button {\n    margin-top: 30px;\n    border-radius: 23px;\n    text-align: center;\n    box-shadow: 0 25px 30px rgba(76, 169, 255, 0.5);\n  }\n\n  .app .container-app .mobile .payme .button a {\n    text-decoration: none;\n    color: #ffffff;\n    text-transform: uppercase;\n    font-size: 18px;\n    font-weight: 500;\n  }\n\n  .app .container-app .mobile .mockups {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-align: baseline;\n    align-items: baseline;\n  }\n\n  .app .container-app .mobile .mockups .pay-mockup img {\n    margin-right: 30px;\n    box-shadow: 0 30px 30px rgba(0, 0, 0, 0.3);\n  }\n\n  .app .container-app .mobile .mockups .login-mockup img {\n    margin-bottom: -20px;\n    box-shadow: 0 30px 30px rgba(0, 0, 0, 0.3);\n  }\n\n  .app .container-app .lines {\n    display: none;\n  }\n\n  .app .container-app .sites {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    width: auto;\n    margin-top: 70px;\n    border-top: 1px solid #7e65bb;\n  }\n\n  .app .container-app .sites > div {\n    margin: 0 auto;\n    padding-top: 20px;\n    padding-right: 10px;\n  }\n\n  .app .container-app .sites > div .ux {\n    font-size: 14px;\n    text-transform: uppercase;\n    color: #cfd2ff;\n  }\n\n  .app .container-app .sites > div .name-app {\n    font-size: 18px;\n    color: #ffffff;\n    font-weight: 400;\n    margin-bottom: 50px;\n  }\n\n  .app .container-app .sites > div:first-child {\n    border-top: 3px solid #ffffff;\n    padding-top: 19px;\n    margin-top: -2px;\n  }\n\n  .twitter .logo-twit {\n    margin: 30px 0;\n  }\n\n  .twitter .twits {\n    width: auto;\n    height: auto;\n    background: none;\n    box-shadow: none;\n    position: relative;\n    margin: 0 auto 70px;\n    text-align: center;\n    padding: 0;\n  }\n\n  .twitter .twits span {\n    color: #4ca9ff;\n  }\n\n  .twitter .twits .twit-center {\n    position: relative;\n    width: 60%;\n    height: auto;\n    margin: 0 auto;\n    background: #ffffff;\n    box-shadow: 0 15px 40px rgba(78, 78, 78, 0.21);\n    padding: 20px;\n  }\n\n  .twitter .twits .twit-left {\n    display: none;\n  }\n\n  .twitter .twits .twit-right {\n    display: none;\n  }\n\n  .twitter .twits .text-twit {\n    font-size: 14px;\n    font-weight: 300;\n    padding-bottom: 20px;\n  }\n}\n\n@media (max-width: 480px) {\n  .about {\n    margin: 0 auto;\n  }\n\n  .about .container-about {\n    -ms-flex-direction: column;\n    flex-direction: column;\n    margin: 20px 20px;\n    max-width: none;\n  }\n\n  .about .container-about .name-about {\n    text-align: center;\n    width: auto;\n    font-size: 20px;\n    font-weight: 300;\n    margin-bottom: 10px;\n  }\n\n  .about .container-about .name-about .line {\n    margin: 5px auto;\n    width: 80px;\n  }\n\n  .photo-work {\n    display: none;\n  }\n\n  .work {\n    margin: 30px 0;\n  }\n\n  .work .container-work {\n    margin: 0 auto;\n  }\n\n  .work .container-work .name-work {\n    height: auto;\n    font-size: 20px;\n  }\n\n  .work .container-work .line {\n    width: 80px;\n    height: 3px;\n    background: #4a24a8;\n    margin-top: 5px;\n  }\n\n  .work .container-work .we-can {\n    -ms-flex-direction: column;\n    flex-direction: column;\n    padding-top: 0;\n    margin: 10px;\n  }\n\n  .work .container-work .section {\n    width: auto;\n    padding: 0;\n    margin: 20px auto;\n  }\n\n  .work .container-work .section h2 {\n    font-size: 14px;\n    line-height: 1.5em;\n  }\n\n  .work .container-work .section p {\n    font-size: 14px;\n    line-height: 1.5em;\n  }\n\n  .work .container-work .section .image {\n    height: 70px;\n    width: 70px;\n  }\n\n  .work .container-work .section.-up {\n    margin-top: 0;\n    box-shadow: none;\n  }\n\n  .work .container-work .more {\n    height: auto;\n    margin-top: 0;\n  }\n\n  .work .container-work .more a {\n    font-size: 14px;\n  }\n\n  .app .container-app {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    margin: 0 30px;\n    max-width: none;\n  }\n\n  .app .container-app .mobile {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    height: auto;\n    width: auto;\n    padding-top: 5px;\n  }\n\n  .app .container-app .mobile .payme {\n    width: auto;\n    font-size: 14px;\n    padding-top: 30px;\n    margin: 0 auto;\n    text-align: center;\n  }\n\n  .app .container-app .mobile .payme .payme-mobile {\n    font-size: 20px;\n    text-align: center;\n  }\n\n  .app .container-app .mobile .payme .button {\n    display: inline-block;\n    width: auto;\n    height: auto;\n    margin: 20px auto;\n    padding: 10px 20px;\n    line-height: normal;\n  }\n\n  .app .container-app .mobile .payme .button a {\n    font-size: 14px;\n  }\n\n  .app .container-app .mobile .mockups {\n    display: none;\n  }\n\n  .app .container-app .lines {\n    display: none;\n  }\n\n  .app .container-app .sites {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    width: auto;\n    margin-top: 20px;\n    border-top: 1px solid #7e65bb;\n  }\n\n  .app .container-app .sites > div .ux {\n    display: none;\n  }\n\n  .app .container-app .sites > div .name-app {\n    font-size: 14px;\n    font-weight: 300;\n    margin-bottom: 30px;\n  }\n\n  .twitter .logo-twit {\n    margin: 20px 0;\n  }\n\n  .twitter .logo-twit img {\n    width: 38px;\n    height: 27px;\n  }\n\n  .twitter .twits {\n    width: auto;\n    height: auto;\n    background: none;\n    box-shadow: none;\n    position: relative;\n    margin: 0 auto 30px;\n    text-align: center;\n    padding: 0;\n  }\n\n  .twitter .twits span {\n    color: #4ca9ff;\n  }\n\n  .twitter .twits .twit-center {\n    position: relative;\n    width: 80%;\n    height: auto;\n    margin: 0 auto;\n    background: #ffffff;\n    box-shadow: 0 15px 40px rgba(78, 78, 78, 0.21);\n    padding: 20px;\n  }\n\n  .twitter .twits .twit-left {\n    display: none;\n  }\n\n  .twitter .twits .twit-right {\n    display: none;\n  }\n\n  .twitter .twits .text-twit {\n    font-size: 14px;\n    font-weight: 300;\n    padding-bottom: 20px;\n  }\n}\n\n.footer {\n  background: url(" + __webpack_require__(8) + ") no-repeat center;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-top: 60px;\n}\n\n.footer .container-footer {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  margin: 0 auto;\n  max-width: 1200px;\n  -ms-flex-align: baseline;\n  align-items: baseline;\n}\n\n.footer .container-footer .logo {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -ms-flex-align: end;\n  align-items: flex-end;\n  font-size: 30px;\n  color: #ffffff;\n}\n\n.footer .container-footer .logo svg {\n  width: 80px;\n  height: 80px;\n}\n\n.footer .container-footer .logo .name-logo {\n  margin-bottom: 10px;\n  font-weight: 600;\n}\n\n.footer .container-footer .contact {\n  width: 100%;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  height: 50px;\n  margin-top: 10px;\n  margin-bottom: 100px;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n.footer .container-footer .contact .contact-info {\n  width: 50%;\n  color: #cfd2ff;\n  line-height: 1.5;\n}\n\n.footer .container-footer .contact .button {\n  margin-top: 0;\n  background: #4ca9ff;\n  border-radius: 23px;\n  padding: 10px 30px;\n  width: 230px;\n  text-align: center;\n  box-shadow: 0 25px 30px rgba(76, 169, 255, 0.5);\n}\n\n.footer .container-footer .contact .button a {\n  text-decoration: none;\n  color: #ffffff;\n  text-transform: uppercase;\n  font-size: 18px;\n  font-weight: 500;\n}\n\n.footer .container-footer .thin-line {\n  width: 100%;\n  height: 1px;\n  background: #7e65bb;\n}\n\n.footer .container-footer .copyring {\n  width: 100%;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  height: 45px;\n  font-size: 14px;\n  -ms-flex-align: center;\n  align-items: center;\n  text-transform: uppercase;\n  color: #fafbfc;\n}\n\n.footer .container-footer .copyring span {\n  color: #4890e8;\n}\n\n@media (max-width: 1200px) {\n  .footer {\n    background: url(" + __webpack_require__(8) + ") no-repeat center;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-top: 0;\n  }\n\n  .footer .container-footer {\n    max-width: none;\n    margin: 0 30px;\n  }\n\n  .footer .container-footer .logo {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    -ms-flex-align: end;\n    align-items: flex-end;\n    font-size: 25px;\n    color: #ffffff;\n  }\n\n  .footer .container-footer .logo svg {\n    margin-right: 15px;\n  }\n\n  .footer .container-footer .logo .name-logo {\n    margin-bottom: 10px;\n    font-weight: 600;\n  }\n\n  .footer .container-footer .contact {\n    margin-bottom: 30px;\n  }\n}\n\n@media (max-width: 480px) {\n  .footer .container-footer {\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    margin: 10px 20px;\n  }\n\n  .footer .container-footer .logo {\n    display: none;\n  }\n\n  .footer .container-footer .contact {\n    width: auto;\n    height: auto;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    margin-top: 10px;\n    margin-bottom: 15px;\n    -ms-flex-align: center;\n    align-items: center;\n  }\n\n  .footer .container-footer .contact .contact-info {\n    width: auto;\n    color: #cfd2ff;\n    line-height: 1.5;\n  }\n\n  .footer .container-footer .contact .button {\n    display: inline-block;\n    width: auto;\n    height: auto;\n    margin: 20px auto;\n    padding: 10px 20px;\n    line-height: normal;\n  }\n\n  .footer .container-footer .contact .button a {\n    font-size: 14px;\n  }\n\n  .footer .container-footer .thin-line {\n    display: none;\n  }\n\n  .footer .container-footer .copyring {\n    display: none;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9DU1MvbHVuYS9jc3Mvc2Nzcy9tYWluLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0ZBQWtGO0FBQ2xGO0VBQ0UscUJBQWM7RUFBZCxjQUFjO0VBQ2QsMkJBQXVCO01BQXZCLHVCQUF1QjtFQUN2QixpQkFBaUI7RUFDakIsd0NBQXdDO0VBQ3hDLGdCQUFnQjtFQUNoQixlQUFlLEVBQUU7O0FBRW5CO0VBQ0UseURBQXlEO0VBQ3pELHFCQUFlO01BQWYsZUFBZSxFQUFFO0VBQ2pCO0lBQ0UscUJBQWM7SUFBZCxjQUFjO0lBQ2QsMkJBQXVCO1FBQXZCLHVCQUF1QjtJQUN2Qix1QkFBK0I7UUFBL0IsK0JBQStCO0lBQy9CLGVBQWU7SUFDZixjQUFjO0lBQ2Qsa0JBQWtCLEVBQUU7SUFDcEI7TUFDRSxxQkFBYztNQUFkLGNBQWM7TUFDZCxxQkFBZTtVQUFmLGVBQWU7TUFDZixjQUFjO01BQ2Qsb0JBQXNCO1VBQXRCLHNCQUFzQjtNQUN0Qix1QkFBK0I7VUFBL0IsK0JBQStCLEVBQUU7TUFDakM7UUFDRSxxQkFBYztRQUFkLGNBQWM7UUFDZCxxQkFBZTtZQUFmLGVBQWU7UUFDZixvQkFBc0I7WUFBdEIsc0JBQXNCO1FBQ3RCLGdCQUFnQjtRQUNoQixlQUFlLEVBQUU7UUFDakI7VUFDRSxZQUFZO1VBQ1osYUFBYSxFQUFFO1FBQ2pCO1VBQ0Usb0JBQW9CO1VBQ3BCLGlCQUFpQixFQUFFO01BQ3ZCO1FBQ0UscUJBQWM7UUFBZCxjQUFjO1FBQ2QscUJBQWU7WUFBZixlQUFlO1FBQ2Ysc0JBQXdCO1lBQXhCLHdCQUF3QjtRQUN4QixlQUFlO1FBQ2Ysb0JBQW9CLEVBQUU7UUFDdEI7VUFDRSxrQkFBa0IsRUFBRTtVQUNwQjtZQUNFLFlBQVk7WUFDWixhQUFhO1lBQ2IsY0FBYyxFQUFFO0lBQ3hCO01BQ0UsZ0JBQWdCO01BQ2hCLGFBQWE7TUFDYixtQkFBbUI7TUFDbkIsaUJBQWlCLEVBQUU7TUFDbkI7UUFDRSxlQUFlLEVBQUU7SUFDckI7TUFDRSxx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L0IsYUFBYTtNQUNiLGdCQUFnQjtNQUNoQix1QkFBb0I7VUFBcEIsb0JBQW9CO01BQ3BCLDBCQUEwQjtNQUMxQixlQUFlLEVBQUU7TUFDakI7UUFDRSxlQUFlLEVBQUU7O0FBRXpCO0VBQ0U7SUFDRSxpRUFBaUU7SUFDakUscUJBQWU7UUFBZixlQUFlO0lBQ2YsZUFBZSxFQUFFO0lBQ2pCO01BQ0UsZ0JBQWdCO01BQ2hCLGVBQWUsRUFBRTtNQUNqQjtRQUNFLHFCQUFjO1FBQWQsY0FBYztRQUNkLHFCQUFlO1lBQWYsZUFBZTtRQUNmLG9CQUFzQjtZQUF0QixzQkFBc0I7UUFDdEIsZ0JBQWdCO1FBQ2hCLGVBQWUsRUFBRTtRQUNqQjtVQUNFLG1CQUFtQixFQUFFO1FBQ3ZCO1VBQ0Usb0JBQW9CO1VBQ3BCLGlCQUFpQixFQUFFO01BQ3ZCO1FBQ0Usb0JBQW9CLEVBQUUsRUFBRTs7QUFFaEM7RUFDRTtJQUNFLHFCQUFlO1FBQWYsZUFBZTtJQUNmLGtCQUFrQixFQUFFO0lBQ3BCO01BQ0UsY0FBYyxFQUFFO0lBQ2xCO01BQ0UsWUFBWTtNQUNaLGFBQWE7TUFDYixxQkFBYztNQUFkLGNBQWM7TUFDZCwyQkFBdUI7VUFBdkIsdUJBQXVCO01BQ3ZCLGlCQUFpQjtNQUNqQixvQkFBb0I7TUFDcEIsdUJBQW9CO1VBQXBCLG9CQUFvQixFQUFFO01BQ3RCO1FBQ0UsWUFBWTtRQUNaLGVBQWU7UUFDZixpQkFBaUIsRUFBRTtNQUNyQjtRQUNFLHNCQUFzQjtRQUN0QixZQUFZO1FBQ1osYUFBYTtRQUNiLGtCQUFrQjtRQUNsQixtQkFBbUI7UUFDbkIsb0JBQW9CLEVBQUU7UUFDdEI7VUFDRSxnQkFBZ0IsRUFBRTtJQUN4QjtNQUNFLGNBQWMsRUFBRTtJQUNsQjtNQUNFLGNBQWMsRUFBRSxFQUFFIiwiZmlsZSI6Im1haW4uc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgdXJsKFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVJvYm90b3xSb2JvdG8rU2xhYjo0MDAsNzAwXCIpO1xuYm9keSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiT3BlbiBTYW5zXCIsIHNlcmlmO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiAjNDA0ODVhOyB9XG5cbi5oZWFkZXIge1xuICBiYWNrZ3JvdW5kOiB1cmwoXCIuL2ltYWdlcy9kaWdpdGFsLmpwZ1wiKSBuby1yZXBlYXQgY2VudGVyO1xuICBmbGV4LXNocmluazogMDsgfVxuICAuaGVhZGVyIC5jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgaGVpZ2h0OiA4NTBweDtcbiAgICBtYXgtd2lkdGg6IDEyMDBweDsgfVxuICAgIC5oZWFkZXIgLmNvbnRhaW5lciAubmF2LXRvcCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgICBoZWlnaHQ6IDEwMHB4O1xuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyB9XG4gICAgICAuaGVhZGVyIC5jb250YWluZXIgLm5hdi10b3AgLmxvZ28ge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LXNocmluazogMDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuICAgICAgICBmb250LXNpemU6IDMwcHg7XG4gICAgICAgIGNvbG9yOiAjZmZmZmZmOyB9XG4gICAgICAgIC5oZWFkZXIgLmNvbnRhaW5lciAubmF2LXRvcCAubG9nbyBzdmcge1xuICAgICAgICAgIHdpZHRoOiA4MHB4O1xuICAgICAgICAgIGhlaWdodDogODBweDsgfVxuICAgICAgICAuaGVhZGVyIC5jb250YWluZXIgLm5hdi10b3AgLmxvZ28gLm5hbWUtbG9nbyB7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNjAwOyB9XG4gICAgICAuaGVhZGVyIC5jb250YWluZXIgLm5hdi10b3AgLm1lbnUge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LXNocmluazogMDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICAgIGNvbG9yOiAjZmZmZmZmO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4OyB9XG4gICAgICAgIC5oZWFkZXIgLmNvbnRhaW5lciAubmF2LXRvcCAubWVudSAubG9nby1tZW51IHtcbiAgICAgICAgICBtYXJnaW4tbGVmdDogMTVweDsgfVxuICAgICAgICAgIC5oZWFkZXIgLmNvbnRhaW5lciAubmF2LXRvcCAubWVudSAubG9nby1tZW51IHN2ZyB7XG4gICAgICAgICAgICB3aWR0aDogMjVweDtcbiAgICAgICAgICAgIGhlaWdodDogMjVweDtcbiAgICAgICAgICAgIGZpbGw6ICM0ODkwZTg7IH1cbiAgICAuaGVhZGVyIC5jb250YWluZXIgLnNsb2dhbiB7XG4gICAgICBmb250LXNpemU6IDkwcHg7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBmb250LXdlaWdodDogMzAwOyB9XG4gICAgICAuaGVhZGVyIC5jb250YWluZXIgLnNsb2dhbiBzcGFuIHtcbiAgICAgICAgY29sb3I6ICM0ODkwZTg7IH1cbiAgICAuaGVhZGVyIC5jb250YWluZXIgLmFycm93cyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGhlaWdodDogMTIwcHg7IH1cbiAgICAgIC5oZWFkZXIgLmNvbnRhaW5lciAuYXJyb3dzIC5hcnJvdyB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IC02cHg7XG4gICAgICAgIHdpZHRoOiAyNXB4O1xuICAgICAgICBoZWlnaHQ6IDI1cHg7IH1cbiAgICAgICAgLmhlYWRlciAuY29udGFpbmVyIC5hcnJvd3MgLmFycm93Li1icmlnaHQge1xuICAgICAgICAgIGZpbGw6ICM3NjVjYjc7IH1cbiAgICAgICAgLmhlYWRlciAuY29udGFpbmVyIC5hcnJvd3MgLmFycm93Li1saWdodCB7XG4gICAgICAgICAgZmlsbDogI2FhOWNkMjsgfVxuICAgICAgICAuaGVhZGVyIC5jb250YWluZXIgLmFycm93cyAuYXJyb3cuLWJsdWUge1xuICAgICAgICAgIGZpbGw6ICM0YmE5ZmY7IH1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDEyMDBweCkge1xuICAuaGVhZGVyIHtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyOyB9XG4gICAgLmhlYWRlciAuY29udGFpbmVyIHtcbiAgICAgIG1heC13aWR0aDogbm9uZTtcbiAgICAgIG1hcmdpbjogMTBweCAzMHB4O1xuICAgICAgaGVpZ2h0OiA0NTBweDsgfVxuICAgICAgLmhlYWRlciAuY29udGFpbmVyIC5uYXYtdG9wIHtcbiAgICAgICAgaGVpZ2h0OiBhdXRvOyB9XG4gICAgICAgIC5oZWFkZXIgLmNvbnRhaW5lciAubmF2LXRvcCAubG9nbyB7XG4gICAgICAgICAgZm9udC1zaXplOiAyNXB4OyB9XG4gICAgICAuaGVhZGVyIC5jb250YWluZXIgLnNsb2dhbiB7XG4gICAgICAgIG1hcmdpbi10b3A6IDUwcHg7XG4gICAgICAgIGZvbnQtc2l6ZTogNjBweDsgfVxuICAgICAgLmhlYWRlciAuY29udGFpbmVyIC5hcnJvd3Mge1xuICAgICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDUwcHg7IH0gfVxuXG5AbWVkaWEgKG1heC13aWR0aDogNDgwcHgpIHtcbiAgLmhlYWRlciB7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjsgfVxuICAgIC5oZWFkZXIgLmNvbnRhaW5lciB7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBtYXJnaW46IDEwcHggMjBweDtcbiAgICAgIGhlaWdodDogMjUwcHg7XG4gICAgICBtYXgtd2lkdGg6IG5vbmU7IH1cbiAgICAgIC5oZWFkZXIgLmNvbnRhaW5lciAubmF2LXRvcCB7XG4gICAgICAgIGhlaWdodDogMTAwcHg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0OyB9XG4gICAgICAgIC5oZWFkZXIgLmNvbnRhaW5lciAubmF2LXRvcCAubG9nbyB7XG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4OyB9XG4gICAgICAgICAgLmhlYWRlciAuY29udGFpbmVyIC5uYXYtdG9wIC5sb2dvIHN2ZyB7XG4gICAgICAgICAgICB3aWR0aDogNTBweDtcbiAgICAgICAgICAgIGhlaWdodDogNTBweDsgfVxuICAgICAgICAuaGVhZGVyIC5jb250YWluZXIgLm5hdi10b3AgLm1lbnUge1xuICAgICAgICAgIG1hcmdpbi10b3A6IDI1cHg7IH1cbiAgICAgIC5oZWFkZXIgLmNvbnRhaW5lciAuc2xvZ2FuIHtcbiAgICAgICAgZm9udC1zaXplOiAyNXB4O1xuICAgICAgICBtYXJnaW46IDAgYXV0bzsgfVxuICAgICAgLmhlYWRlciAuY29udGFpbmVyIC5hcnJvd3Mge1xuICAgICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICAgIG1hcmdpbi10b3A6IDMwcHg7IH0gfVxuXG4uYWJvdXQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBmbGV4LXNocmluazogMDtcbiAgbWFyZ2luOiAxMDBweCBhdXRvO1xuICBjb2xvcjogIzZhNzA3ZDsgfVxuICAuYWJvdXQgLmNvbnRhaW5lci1hYm91dCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICBtYXgtd2lkdGg6IDEyMDBweDsgfVxuICAgIC5hYm91dCAuY29udGFpbmVyLWFib3V0IC5uYW1lLWFib3V0IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgd2lkdGg6IDkwJTtcbiAgICAgIGNvbG9yOiAjNDA0ODVhO1xuICAgICAgZm9udC1zaXplOiA0OHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDMwMDsgfVxuICAgICAgLmFib3V0IC5jb250YWluZXItYWJvdXQgLm5hbWUtYWJvdXQgLmxpbmUge1xuICAgICAgICB3aWR0aDogODBweDtcbiAgICAgICAgaGVpZ2h0OiAzcHg7XG4gICAgICAgIGJhY2tncm91bmQ6ICM0YTI0YTg7XG4gICAgICAgIG1hcmdpbi10b3A6IDI1cHg7IH1cbiAgICAuYWJvdXQgLmNvbnRhaW5lci1hYm91dCAuaW5mbyBwIHtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7IH1cblxuLnBob3RvLXdvcmsge1xuICBmbGV4LXNocmluazogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdzsgfVxuXG4ud29yayB7XG4gIGNvbG9yOiAjNDA0ODVhO1xuICBmb250LXdlaWdodDogMzAwO1xuICBtYXJnaW46IDkwcHggMDtcbiAgZmxleC1zaHJpbms6IDA7IH1cbiAgLndvcmsgLmNvbnRhaW5lci13b3JrIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgbWF4LXdpZHRoOiAxMjAwcHg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjsgfVxuICAgIC53b3JrIC5jb250YWluZXItd29yayAubmFtZS13b3JrIHtcbiAgICAgIGhlaWdodDogNjBweDtcbiAgICAgIGZvbnQtc2l6ZTogNDhweDsgfVxuICAgIC53b3JrIC5jb250YWluZXItd29yayAubGluZSB7XG4gICAgICB3aWR0aDogODBweDtcbiAgICAgIGhlaWdodDogM3B4O1xuICAgICAgYmFja2dyb3VuZDogIzRhMjRhODtcbiAgICAgIG1hcmdpbi10b3A6IDI1cHg7IH1cbiAgICAud29yayAuY29udGFpbmVyLXdvcmsgLndlLWNhbiB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgcGFkZGluZy10b3A6IDcwcHg7IH1cbiAgICAud29yayAuY29udGFpbmVyLXdvcmsgLnNlY3Rpb24ge1xuICAgICAgd2lkdGg6IDM3MHB4O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgcGFkZGluZzogNTBweDsgfVxuICAgICAgLndvcmsgLmNvbnRhaW5lci13b3JrIC5zZWN0aW9uIGgyIHtcbiAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICBsaW5lLWhlaWdodDogMi41ZW07IH1cbiAgICAgIC53b3JrIC5jb250YWluZXItd29yayAuc2VjdGlvbiBwIHtcbiAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICBsaW5lLWhlaWdodDogMS41ZW07IH1cbiAgICAgIC53b3JrIC5jb250YWluZXItd29yayAuc2VjdGlvbiAuaW1hZ2Uge1xuICAgICAgICBoZWlnaHQ6IDE1MXB4OyB9XG4gICAgICAud29yayAuY29udGFpbmVyLXdvcmsgLnNlY3Rpb24uLXVwIHtcbiAgICAgICAgbWFyZ2luLXRvcDogLTE1cHg7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMTVweCAzMHB4IHJnYmEoMTM3LCAxMzcsIDEzNywgMC4zKTsgfVxuICAgIC53b3JrIC5jb250YWluZXItd29yayAubW9yZSB7XG4gICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICBtYXJnaW4tdG9wOiA2MHB4OyB9XG4gICAgICAud29yayAuY29udGFpbmVyLXdvcmsgLm1vcmUgYSB7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgY29sb3I6ICM0Y2E5ZmY7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7IH1cblxuLmFwcCB7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICBiYWNrZ3JvdW5kOiB1cmwoXCIuL2ltYWdlcy9wYXltZWJhY2tncm91bmQucG5nXCIpIG5vLXJlcGVhdCBjZW50ZXI7IH1cbiAgLmFwcCAuY29udGFpbmVyLWFwcCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIG1heC13aWR0aDogMTIwMHB4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cbiAgICAuYXBwIC5jb250YWluZXItYXBwIC5tb2JpbGUge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBoZWlnaHQ6IDUxMHB4O1xuICAgICAgd2lkdGg6IDExNzBweDtcbiAgICAgIHBhZGRpbmctdG9wOiA4NXB4OyB9XG4gICAgICAuYXBwIC5jb250YWluZXItYXBwIC5tb2JpbGUgLnBheW1lIHtcbiAgICAgICAgd2lkdGg6IDUwJTtcbiAgICAgICAgY29sb3I6ICNmZmZmZmY7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgcGFkZGluZy10b3A6IDUwcHg7IH1cbiAgICAgICAgLmFwcCAuY29udGFpbmVyLWFwcCAubW9iaWxlIC5wYXltZSAucGF5bWUtbW9iaWxlIHtcbiAgICAgICAgICBmb250LXNpemU6IDYycHg7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTBweDsgfVxuICAgICAgICAgIC5hcHAgLmNvbnRhaW5lci1hcHAgLm1vYmlsZSAucGF5bWUgLnBheW1lLW1vYmlsZSBzcGFuIHtcbiAgICAgICAgICAgIGNvbG9yOiAjNGNhOWZmOyB9XG4gICAgICAgIC5hcHAgLmNvbnRhaW5lci1hcHAgLm1vYmlsZSAucGF5bWUgLnBheW1lLXRleHQge1xuICAgICAgICAgIGNvbG9yOiAjY2ZkMmZmOyB9XG4gICAgICAgIC5hcHAgLmNvbnRhaW5lci1hcHAgLm1vYmlsZSAucGF5bWUgLmJ1dHRvbiB7XG4gICAgICAgICAgbWFyZ2luLXRvcDogNzBweDtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjNGNhOWZmO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDIzcHg7XG4gICAgICAgICAgcGFkZGluZzogMTBweCAzMHB4O1xuICAgICAgICAgIHdpZHRoOiAyMzBweDtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgYm94LXNoYWRvdzogMCAyNXB4IDMwcHggcmdiYSg3NiwgMTY5LCAyNTUsIDAuNSk7IH1cbiAgICAgICAgICAuYXBwIC5jb250YWluZXItYXBwIC5tb2JpbGUgLnBheW1lIC5idXR0b24gYSB7XG4gICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgICAgICBjb2xvcjogI2ZmZmZmZjtcbiAgICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICAgICAgICBmb250LXdlaWdodDogNTAwOyB9XG4gICAgICAuYXBwIC5jb250YWluZXItYXBwIC5tb2JpbGUgLm1vY2t1cHMge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7IH1cbiAgICAgICAgLmFwcCAuY29udGFpbmVyLWFwcCAubW9iaWxlIC5tb2NrdXBzIC5wYXktbW9ja3VwIGltZyB7XG4gICAgICAgICAgbWFyZ2luLXJpZ2h0OiA3MHB4O1xuICAgICAgICAgIGJveC1zaGFkb3c6IDAgMzBweCAzMHB4IHJnYmEoMCwgMCwgMCwgMC4zKTsgfVxuICAgICAgICAuYXBwIC5jb250YWluZXItYXBwIC5tb2JpbGUgLm1vY2t1cHMgLmxvZ2luLW1vY2t1cCBpbWcge1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IC0yMHB4O1xuICAgICAgICAgIGJveC1zaGFkb3c6IDAgMzBweCAzMHB4IHJnYmEoMCwgMCwgMCwgMC4zKTsgfVxuICAgIC5hcHAgLmNvbnRhaW5lci1hcHAgLmxpbmVzIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgaGVpZ2h0OiAzcHg7XG4gICAgICB3aWR0aDogMTE3MHB4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIG1hcmdpbi10b3A6IDQwcHg7IH1cbiAgICAgIC5hcHAgLmNvbnRhaW5lci1hcHAgLmxpbmVzIC5ib2xkLWxpbmUge1xuICAgICAgICB3aWR0aDogMjMlO1xuICAgICAgICBoZWlnaHQ6IDNweDtcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmZmZmZjsgfVxuICAgICAgLmFwcCAuY29udGFpbmVyLWFwcCAubGluZXMgLnRoaW4tbGluZSB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDFweDtcbiAgICAgICAgYmFja2dyb3VuZDogIzdlNjViYjsgfVxuICAgIC5hcHAgLmNvbnRhaW5lci1hcHAgLnNpdGVzIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgbWFyZ2luLXRvcDogNDVweDtcbiAgICAgIHdpZHRoOiAxMTcwcHg7IH1cbiAgICAgIC5hcHAgLmNvbnRhaW5lci1hcHAgLnNpdGVzIC51eCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgY29sb3I6ICNjZmQyZmY7IH1cbiAgICAgIC5hcHAgLmNvbnRhaW5lci1hcHAgLnNpdGVzIC5uYW1lLWFwcCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICAgICAgY29sb3I6ICNmZmZmZmY7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDUwcHg7IH1cblxuLnR3aXR0ZXIge1xuICBmbGV4LXNocmluazogMDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxuICAudHdpdHRlciAubG9nby10d2l0IHtcbiAgICBtYXJnaW46IDUwcHggMDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cbiAgLnR3aXR0ZXIgLnR3aXRzIHtcbiAgICB3aWR0aDogODMzcHg7XG4gICAgaGVpZ2h0OiAzMDJweDtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICAgIGJveC1zaGFkb3c6IDAgMTVweCA0MHB4IHJnYmEoNzgsIDc4LCA3OCwgMC4yMSk7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG1hcmdpbjogMCBhdXRvIDcwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHBhZGRpbmc6IDUwcHg7IH1cbiAgICAudHdpdHRlciAudHdpdHMgc3BhbiB7XG4gICAgICBjb2xvcjogIzRjYTlmZjsgfVxuICAgIC50d2l0dGVyIC50d2l0cyAudHdpdC1sZWZ0IHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHdpZHRoOiA4MzNweDtcbiAgICAgIGhlaWdodDogMzAycHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICAgICAgYm94LXNoYWRvdzogMCAxNXB4IDQwcHggcmdiYSg3OCwgNzgsIDc4LCAwLjIxKTtcbiAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgcGFkZGluZzogNTBweDtcbiAgICAgIHRvcDogMDtcbiAgICAgIGxlZnQ6IC0xMDAzcHg7XG4gICAgICBvcGFjaXR5OiAwLjI7IH1cbiAgICAudHdpdHRlciAudHdpdHMgLnR3aXQtcmlnaHQge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgd2lkdGg6IDgzM3B4O1xuICAgICAgaGVpZ2h0OiAzMDJweDtcbiAgICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gICAgICBib3gtc2hhZG93OiAwIDE1cHggNDBweCByZ2JhKDc4LCA3OCwgNzgsIDAuMjEpO1xuICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiA1MHB4O1xuICAgICAgdG9wOiAwO1xuICAgICAgcmlnaHQ6IC0xMDAzcHg7XG4gICAgICBvcGFjaXR5OiAwLjI7IH1cbiAgICAudHdpdHRlciAudHdpdHMgLnRleHQtdHdpdCB7XG4gICAgICBjb2xvcjogIzQwNDg1YTtcbiAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiBsaWdodGVyO1xuICAgICAgcGFkZGluZy1ib3R0b206IDQwcHg7IH1cbiAgICAudHdpdHRlciAudHdpdHMgLmF1dG9yIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IH1cbiAgICAgIC50d2l0dGVyIC50d2l0cyAuYXV0b3Igc3BhbiB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7IH1cbiAgICAgIC50d2l0dGVyIC50d2l0cyAuYXV0b3IgLm5hbWUge1xuICAgICAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgICAgICAgbWFyZ2luLXRvcDogNXB4OyB9XG5cbkBtZWRpYSAobWF4LXdpZHRoOiAxMjAwcHgpIHtcbiAgLmFib3V0IHtcbiAgICBtYXJnaW46IDUwcHggYXV0bzsgfVxuICAgIC5hYm91dCAuY29udGFpbmVyLWFib3V0IHtcbiAgICAgIG1heC13aWR0aDogbm9uZTtcbiAgICAgIG1hcmdpbjogMCAzMHB4OyB9XG4gICAgICAuYWJvdXQgLmNvbnRhaW5lci1hYm91dCAubmFtZS1hYm91dCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMzBweDsgfVxuICAgICAgICAuYWJvdXQgLmNvbnRhaW5lci1hYm91dCAubmFtZS1hYm91dCAubGluZSB7XG4gICAgICAgICAgd2lkdGg6IDUwJTtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4OyB9XG4gIC53b3JrIHtcbiAgICB3aWR0aDogYXV0bztcbiAgICBtYXJnaW46IDUwcHggYXV0bzsgfVxuICAgIC53b3JrIC5jb250YWluZXItd29yayB7XG4gICAgICBtYXJnaW46IDAgMzBweDtcbiAgICAgIG1heC13aWR0aDogbm9uZTsgfVxuICAgICAgLndvcmsgLmNvbnRhaW5lci13b3JrIC5uYW1lLXdvcmsge1xuICAgICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICAgIGZvbnQtc2l6ZTogMzBweDsgfVxuICAgICAgLndvcmsgLmNvbnRhaW5lci13b3JrIC5saW5lIHtcbiAgICAgICAgd2lkdGg6IDEwJTtcbiAgICAgICAgaGVpZ2h0OiAzcHg7XG4gICAgICAgIGJhY2tncm91bmQ6ICM0YTI0YTg7XG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7IH1cbiAgICAgIC53b3JrIC5jb250YWluZXItd29yayAud2UtY2FuIHtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICBwYWRkaW5nLXRvcDogMzBweDsgfVxuICAgICAgLndvcmsgLmNvbnRhaW5lci13b3JrIC5zZWN0aW9uIHtcbiAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgcGFkZGluZzogMzBweDsgfVxuICAgICAgICAud29yayAuY29udGFpbmVyLXdvcmsgLnNlY3Rpb24gaDIge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjVlbTsgfVxuICAgICAgICAud29yayAuY29udGFpbmVyLXdvcmsgLnNlY3Rpb24gcCB7XG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjVyZW07IH1cbiAgICAgICAgLndvcmsgLmNvbnRhaW5lci13b3JrIC5zZWN0aW9uIC5pbWFnZSB7XG4gICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgaGVpZ2h0OiAxMDBweDtcbiAgICAgICAgICB3aWR0aDogMTAwcHg7IH1cbiAgICAgICAgLndvcmsgLmNvbnRhaW5lci13b3JrIC5zZWN0aW9uLi11cCB7XG4gICAgICAgICAgbWFyZ2luLXRvcDogLTE1cHg7XG4gICAgICAgICAgYm94LXNoYWRvdzogMCAxNXB4IDMwcHggcmdiYSgxMzcsIDEzNywgMTM3LCAwLjMpOyB9XG4gICAgICAud29yayAuY29udGFpbmVyLXdvcmsgLm1vcmUge1xuICAgICAgICBtYXJnaW4tdG9wOiAzMHB4O1xuICAgICAgICBoZWlnaHQ6IGF1dG87IH1cbiAgICAgICAgLndvcmsgLmNvbnRhaW5lci13b3JrIC5tb3JlIGEge1xuICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICAgIGNvbG9yOiAjNGNhOWZmO1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7IH1cbiAgLmFwcCAuY29udGFpbmVyLWFwcCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIG1hcmdpbjogMCAzMHB4O1xuICAgIG1heC13aWR0aDogbm9uZTsgfVxuICAgIC5hcHAgLmNvbnRhaW5lci1hcHAgLm1vYmlsZSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGhlaWdodDogYXV0bztcbiAgICAgIHdpZHRoOiBhdXRvO1xuICAgICAgcGFkZGluZy10b3A6IDg1cHg7IH1cbiAgICAgIC5hcHAgLmNvbnRhaW5lci1hcHAgLm1vYmlsZSAucGF5bWUge1xuICAgICAgICB3aWR0aDogNTAlO1xuICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgIHBhZGRpbmctdG9wOiAzMHB4OyB9XG4gICAgICAgIC5hcHAgLmNvbnRhaW5lci1hcHAgLm1vYmlsZSAucGF5bWUgLnBheW1lLW1vYmlsZSB7XG4gICAgICAgICAgZm9udC1zaXplOiAzMHB4OyB9XG4gICAgICAgIC5hcHAgLmNvbnRhaW5lci1hcHAgLm1vYmlsZSAucGF5bWUgLmJ1dHRvbiB7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMzBweDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAyM3B4O1xuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDI1cHggMzBweCByZ2JhKDc2LCAxNjksIDI1NSwgMC41KTsgfVxuICAgICAgICAgIC5hcHAgLmNvbnRhaW5lci1hcHAgLm1vYmlsZSAucGF5bWUgLmJ1dHRvbiBhIHtcbiAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmZmZmO1xuICAgICAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7IH1cbiAgICAgIC5hcHAgLmNvbnRhaW5lci1hcHAgLm1vYmlsZSAubW9ja3VwcyB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTsgfVxuICAgICAgICAuYXBwIC5jb250YWluZXItYXBwIC5tb2JpbGUgLm1vY2t1cHMgLnBheS1tb2NrdXAgaW1nIHtcbiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDMwcHg7XG4gICAgICAgICAgYm94LXNoYWRvdzogMCAzMHB4IDMwcHggcmdiYSgwLCAwLCAwLCAwLjMpOyB9XG4gICAgICAgIC5hcHAgLmNvbnRhaW5lci1hcHAgLm1vYmlsZSAubW9ja3VwcyAubG9naW4tbW9ja3VwIGltZyB7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogLTIwcHg7XG4gICAgICAgICAgYm94LXNoYWRvdzogMCAzMHB4IDMwcHggcmdiYSgwLCAwLCAwLCAwLjMpOyB9XG4gICAgLmFwcCAuY29udGFpbmVyLWFwcCAubGluZXMge1xuICAgICAgZGlzcGxheTogbm9uZTsgfVxuICAgIC5hcHAgLmNvbnRhaW5lci1hcHAgLnNpdGVzIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgd2lkdGg6IGF1dG87XG4gICAgICBtYXJnaW4tdG9wOiA3MHB4O1xuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM3ZTY1YmI7IH1cbiAgICAgIC5hcHAgLmNvbnRhaW5lci1hcHAgLnNpdGVzID4gZGl2IHtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIHBhZGRpbmctdG9wOiAyMHB4O1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4OyB9XG4gICAgICAgIC5hcHAgLmNvbnRhaW5lci1hcHAgLnNpdGVzID4gZGl2IC51eCB7XG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgICAgY29sb3I6ICNjZmQyZmY7IH1cbiAgICAgICAgLmFwcCAuY29udGFpbmVyLWFwcCAuc2l0ZXMgPiBkaXYgLm5hbWUtYXBwIHtcbiAgICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICAgICAgY29sb3I6ICNmZmZmZmY7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiA1MHB4OyB9XG4gICAgICAuYXBwIC5jb250YWluZXItYXBwIC5zaXRlcyA+IGRpdjpmaXJzdC1jaGlsZCB7XG4gICAgICAgIGJvcmRlci10b3A6IDNweCBzb2xpZCAjZmZmZmZmO1xuICAgICAgICBwYWRkaW5nLXRvcDogMTlweDtcbiAgICAgICAgbWFyZ2luLXRvcDogLTJweDsgfVxuICAudHdpdHRlciAubG9nby10d2l0IHtcbiAgICBtYXJnaW46IDMwcHggMDsgfVxuICAudHdpdHRlciAudHdpdHMge1xuICAgIHdpZHRoOiBhdXRvO1xuICAgIGhlaWdodDogYXV0bztcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG1hcmdpbjogMCBhdXRvIDcwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHBhZGRpbmc6IDA7IH1cbiAgICAudHdpdHRlciAudHdpdHMgc3BhbiB7XG4gICAgICBjb2xvcjogIzRjYTlmZjsgfVxuICAgIC50d2l0dGVyIC50d2l0cyAudHdpdC1jZW50ZXIge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgd2lkdGg6IDYwJTtcbiAgICAgIGhlaWdodDogYXV0bztcbiAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgICAgIGJveC1zaGFkb3c6IDAgMTVweCA0MHB4IHJnYmEoNzgsIDc4LCA3OCwgMC4yMSk7XG4gICAgICBwYWRkaW5nOiAyMHB4OyB9XG4gICAgLnR3aXR0ZXIgLnR3aXRzIC50d2l0LWxlZnQge1xuICAgICAgZGlzcGxheTogbm9uZTsgfVxuICAgIC50d2l0dGVyIC50d2l0cyAudHdpdC1yaWdodCB7XG4gICAgICBkaXNwbGF5OiBub25lOyB9XG4gICAgLnR3aXR0ZXIgLnR3aXRzIC50ZXh0LXR3aXQge1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgIHBhZGRpbmctYm90dG9tOiAyMHB4OyB9IH1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDQ4MHB4KSB7XG4gIC5hYm91dCB7XG4gICAgbWFyZ2luOiAwIGF1dG87IH1cbiAgICAuYWJvdXQgLmNvbnRhaW5lci1hYm91dCB7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgbWFyZ2luOiAyMHB4IDIwcHg7XG4gICAgICBtYXgtd2lkdGg6IG5vbmU7IH1cbiAgICAgIC5hYm91dCAuY29udGFpbmVyLWFib3V0IC5uYW1lLWFib3V0IHtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB3aWR0aDogYXV0bztcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgICBmb250LXdlaWdodDogMzAwO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4OyB9XG4gICAgICAgIC5hYm91dCAuY29udGFpbmVyLWFib3V0IC5uYW1lLWFib3V0IC5saW5lIHtcbiAgICAgICAgICBtYXJnaW46IDVweCBhdXRvO1xuICAgICAgICAgIHdpZHRoOiA4MHB4OyB9XG4gIC5waG90by13b3JrIHtcbiAgICBkaXNwbGF5OiBub25lOyB9XG4gIC53b3JrIHtcbiAgICBtYXJnaW46IDMwcHggMDsgfVxuICAgIC53b3JrIC5jb250YWluZXItd29yayB7XG4gICAgICBtYXJnaW46IDAgYXV0bzsgfVxuICAgICAgLndvcmsgLmNvbnRhaW5lci13b3JrIC5uYW1lLXdvcmsge1xuICAgICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDsgfVxuICAgICAgLndvcmsgLmNvbnRhaW5lci13b3JrIC5saW5lIHtcbiAgICAgICAgd2lkdGg6IDgwcHg7XG4gICAgICAgIGhlaWdodDogM3B4O1xuICAgICAgICBiYWNrZ3JvdW5kOiAjNGEyNGE4O1xuICAgICAgICBtYXJnaW4tdG9wOiA1cHg7IH1cbiAgICAgIC53b3JrIC5jb250YWluZXItd29yayAud2UtY2FuIHtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgcGFkZGluZy10b3A6IDA7XG4gICAgICAgIG1hcmdpbjogMTBweDsgfVxuICAgICAgLndvcmsgLmNvbnRhaW5lci13b3JrIC5zZWN0aW9uIHtcbiAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIG1hcmdpbjogMjBweCBhdXRvOyB9XG4gICAgICAgIC53b3JrIC5jb250YWluZXItd29yayAuc2VjdGlvbiBoMiB7XG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjVlbTsgfVxuICAgICAgICAud29yayAuY29udGFpbmVyLXdvcmsgLnNlY3Rpb24gcCB7XG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjVlbTsgfVxuICAgICAgICAud29yayAuY29udGFpbmVyLXdvcmsgLnNlY3Rpb24gLmltYWdlIHtcbiAgICAgICAgICBoZWlnaHQ6IDcwcHg7XG4gICAgICAgICAgd2lkdGg6IDcwcHg7IH1cbiAgICAgICAgLndvcmsgLmNvbnRhaW5lci13b3JrIC5zZWN0aW9uLi11cCB7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICAgICAgICBib3gtc2hhZG93OiBub25lOyB9XG4gICAgICAud29yayAuY29udGFpbmVyLXdvcmsgLm1vcmUge1xuICAgICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICAgIG1hcmdpbi10b3A6IDA7IH1cbiAgICAgICAgLndvcmsgLmNvbnRhaW5lci13b3JrIC5tb3JlIGEge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDsgfVxuICAuYXBwIC5jb250YWluZXItYXBwIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgbWFyZ2luOiAwIDMwcHg7XG4gICAgbWF4LXdpZHRoOiBub25lOyB9XG4gICAgLmFwcCAuY29udGFpbmVyLWFwcCAubW9iaWxlIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgd2lkdGg6IGF1dG87XG4gICAgICBwYWRkaW5nLXRvcDogNXB4OyB9XG4gICAgICAuYXBwIC5jb250YWluZXItYXBwIC5tb2JpbGUgLnBheW1lIHtcbiAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgcGFkZGluZy10b3A6IDMwcHg7XG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cbiAgICAgICAgLmFwcCAuY29udGFpbmVyLWFwcCAubW9iaWxlIC5wYXltZSAucGF5bWUtbW9iaWxlIHtcbiAgICAgICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XG4gICAgICAgIC5hcHAgLmNvbnRhaW5lci1hcHAgLm1vYmlsZSAucGF5bWUgLmJ1dHRvbiB7XG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgIHdpZHRoOiBhdXRvO1xuICAgICAgICAgIGhlaWdodDogYXV0bztcbiAgICAgICAgICBtYXJnaW46IDIwcHggYXV0bztcbiAgICAgICAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IG5vcm1hbDsgfVxuICAgICAgICAgIC5hcHAgLmNvbnRhaW5lci1hcHAgLm1vYmlsZSAucGF5bWUgLmJ1dHRvbiBhIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDsgfVxuICAgICAgLmFwcCAuY29udGFpbmVyLWFwcCAubW9iaWxlIC5tb2NrdXBzIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTsgfVxuICAgIC5hcHAgLmNvbnRhaW5lci1hcHAgLmxpbmVzIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7IH1cbiAgICAuYXBwIC5jb250YWluZXItYXBwIC5zaXRlcyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIHdpZHRoOiBhdXRvO1xuICAgICAgbWFyZ2luLXRvcDogMjBweDtcbiAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjN2U2NWJiOyB9XG4gICAgICAuYXBwIC5jb250YWluZXItYXBwIC5zaXRlcyA+IGRpdiAudXgge1xuICAgICAgICBkaXNwbGF5OiBub25lOyB9XG4gICAgICAuYXBwIC5jb250YWluZXItYXBwIC5zaXRlcyA+IGRpdiAubmFtZS1hcHAge1xuICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDMwcHg7IH1cbiAgLnR3aXR0ZXIgLmxvZ28tdHdpdCB7XG4gICAgbWFyZ2luOiAyMHB4IDA7IH1cbiAgICAudHdpdHRlciAubG9nby10d2l0IGltZyB7XG4gICAgICB3aWR0aDogMzhweDtcbiAgICAgIGhlaWdodDogMjdweDsgfVxuICAudHdpdHRlciAudHdpdHMge1xuICAgIHdpZHRoOiBhdXRvO1xuICAgIGhlaWdodDogYXV0bztcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG1hcmdpbjogMCBhdXRvIDMwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHBhZGRpbmc6IDA7IH1cbiAgICAudHdpdHRlciAudHdpdHMgc3BhbiB7XG4gICAgICBjb2xvcjogIzRjYTlmZjsgfVxuICAgIC50d2l0dGVyIC50d2l0cyAudHdpdC1jZW50ZXIge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgd2lkdGg6IDgwJTtcbiAgICAgIGhlaWdodDogYXV0bztcbiAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgICAgIGJveC1zaGFkb3c6IDAgMTVweCA0MHB4IHJnYmEoNzgsIDc4LCA3OCwgMC4yMSk7XG4gICAgICBwYWRkaW5nOiAyMHB4OyB9XG4gICAgLnR3aXR0ZXIgLnR3aXRzIC50d2l0LWxlZnQge1xuICAgICAgZGlzcGxheTogbm9uZTsgfVxuICAgIC50d2l0dGVyIC50d2l0cyAudHdpdC1yaWdodCB7XG4gICAgICBkaXNwbGF5OiBub25lOyB9XG4gICAgLnR3aXR0ZXIgLnR3aXRzIC50ZXh0LXR3aXQge1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgIHBhZGRpbmctYm90dG9tOiAyMHB4OyB9IH1cblxuLmZvb3RlciB7XG4gIGJhY2tncm91bmQ6IHVybChcIi4vaW1hZ2VzL3BheW1lYmFja2dyb3VuZC5wbmdcIikgbm8tcmVwZWF0IGNlbnRlcjtcbiAgZmxleC1zaHJpbms6IDA7XG4gIHBhZGRpbmctdG9wOiA2MHB4OyB9XG4gIC5mb290ZXIgLmNvbnRhaW5lci1mb290ZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBmbGV4LXNocmluazogMDtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICBtYXgtd2lkdGg6IDEyMDBweDtcbiAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7IH1cbiAgICAuZm9vdGVyIC5jb250YWluZXItZm9vdGVyIC5sb2dvIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LXNocmluazogMDtcbiAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgICAgIGNvbG9yOiAjZmZmZmZmOyB9XG4gICAgICAuZm9vdGVyIC5jb250YWluZXItZm9vdGVyIC5sb2dvIHN2ZyB7XG4gICAgICAgIHdpZHRoOiA4MHB4O1xuICAgICAgICBoZWlnaHQ6IDgwcHg7IH1cbiAgICAgIC5mb290ZXIgLmNvbnRhaW5lci1mb290ZXIgLmxvZ28gLm5hbWUtbG9nbyB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7IH1cbiAgICAuZm9vdGVyIC5jb250YWluZXItZm9vdGVyIC5jb250YWN0IHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICBmbGV4LXNocmluazogMDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGhlaWdodDogNTBweDtcbiAgICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxMDBweDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cbiAgICAgIC5mb290ZXIgLmNvbnRhaW5lci1mb290ZXIgLmNvbnRhY3QgLmNvbnRhY3QtaW5mbyB7XG4gICAgICAgIHdpZHRoOiA1MCU7XG4gICAgICAgIGNvbG9yOiAjY2ZkMmZmO1xuICAgICAgICBsaW5lLWhlaWdodDogMS41OyB9XG4gICAgICAuZm9vdGVyIC5jb250YWluZXItZm9vdGVyIC5jb250YWN0IC5idXR0b24ge1xuICAgICAgICBtYXJnaW4tdG9wOiAwO1xuICAgICAgICBiYWNrZ3JvdW5kOiAjNGNhOWZmO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAyM3B4O1xuICAgICAgICBwYWRkaW5nOiAxMHB4IDMwcHg7XG4gICAgICAgIHdpZHRoOiAyMzBweDtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBib3gtc2hhZG93OiAwIDI1cHggMzBweCByZ2JhKDc2LCAxNjksIDI1NSwgMC41KTsgfVxuICAgICAgICAuZm9vdGVyIC5jb250YWluZXItZm9vdGVyIC5jb250YWN0IC5idXR0b24gYSB7XG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICAgIGNvbG9yOiAjZmZmZmZmO1xuICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7IH1cbiAgICAuZm9vdGVyIC5jb250YWluZXItZm9vdGVyIC50aGluLWxpbmUge1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBoZWlnaHQ6IDFweDtcbiAgICAgIGJhY2tncm91bmQ6ICM3ZTY1YmI7IH1cbiAgICAuZm9vdGVyIC5jb250YWluZXItZm9vdGVyIC5jb3B5cmluZyB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBoZWlnaHQ6IDQ1cHg7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgIGNvbG9yOiAjZmFmYmZjOyB9XG4gICAgICAuZm9vdGVyIC5jb250YWluZXItZm9vdGVyIC5jb3B5cmluZyBzcGFuIHtcbiAgICAgICAgY29sb3I6ICM0ODkwZTg7IH1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDEyMDBweCkge1xuICAuZm9vdGVyIHtcbiAgICBiYWNrZ3JvdW5kOiB1cmwoXCIuL2ltYWdlcy9wYXltZWJhY2tncm91bmQucG5nXCIpIG5vLXJlcGVhdCBjZW50ZXI7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgcGFkZGluZy10b3A6IDA7IH1cbiAgICAuZm9vdGVyIC5jb250YWluZXItZm9vdGVyIHtcbiAgICAgIG1heC13aWR0aDogbm9uZTtcbiAgICAgIG1hcmdpbjogMCAzMHB4OyB9XG4gICAgICAuZm9vdGVyIC5jb250YWluZXItZm9vdGVyIC5sb2dvIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgICAgICAgZm9udC1zaXplOiAyNXB4O1xuICAgICAgICBjb2xvcjogI2ZmZmZmZjsgfVxuICAgICAgICAuZm9vdGVyIC5jb250YWluZXItZm9vdGVyIC5sb2dvIHN2ZyB7XG4gICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxNXB4OyB9XG4gICAgICAgIC5mb290ZXIgLmNvbnRhaW5lci1mb290ZXIgLmxvZ28gLm5hbWUtbG9nbyB7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNjAwOyB9XG4gICAgICAuZm9vdGVyIC5jb250YWluZXItZm9vdGVyIC5jb250YWN0IHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDsgfSB9XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA0ODBweCkge1xuICAuZm9vdGVyIC5jb250YWluZXItZm9vdGVyIHtcbiAgICBmbGV4LXNocmluazogMDtcbiAgICBtYXJnaW46IDEwcHggMjBweDsgfVxuICAgIC5mb290ZXIgLmNvbnRhaW5lci1mb290ZXIgLmxvZ28ge1xuICAgICAgZGlzcGxheTogbm9uZTsgfVxuICAgIC5mb290ZXIgLmNvbnRhaW5lci1mb290ZXIgLmNvbnRhY3Qge1xuICAgICAgd2lkdGg6IGF1dG87XG4gICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxNXB4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjsgfVxuICAgICAgLmZvb3RlciAuY29udGFpbmVyLWZvb3RlciAuY29udGFjdCAuY29udGFjdC1pbmZvIHtcbiAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgICAgIGNvbG9yOiAjY2ZkMmZmO1xuICAgICAgICBsaW5lLWhlaWdodDogMS41OyB9XG4gICAgICAuZm9vdGVyIC5jb250YWluZXItZm9vdGVyIC5jb250YWN0IC5idXR0b24ge1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIHdpZHRoOiBhdXRvO1xuICAgICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICAgIG1hcmdpbjogMjBweCBhdXRvO1xuICAgICAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiBub3JtYWw7IH1cbiAgICAgICAgLmZvb3RlciAuY29udGFpbmVyLWZvb3RlciAuY29udGFjdCAuYnV0dG9uIGEge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDsgfVxuICAgIC5mb290ZXIgLmNvbnRhaW5lci1mb290ZXIgLnRoaW4tbGluZSB7XG4gICAgICBkaXNwbGF5OiBub25lOyB9XG4gICAgLmZvb3RlciAuY29udGFpbmVyLWZvb3RlciAuY29weXJpbmcge1xuICAgICAgZGlzcGxheTogbm9uZTsgfSB9XG4iXX0= */", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "869531d61e63ef9f7b723ebe5caf344e.jpg";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "c4f727d8ca1959aba0f55792ca6abe45.png";

/***/ }
/******/ ]);