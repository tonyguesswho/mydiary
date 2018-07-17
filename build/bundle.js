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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./data/data.js":
/*!**********************!*\
  !*** ./data/data.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar entries = [{\n  id: 1,\n  title: 'sample title',\n  description: 'sample description'\n}, {\n  id: 2,\n  title: 'sample title',\n  description: 'sample description'\n}];\n\nmodule.exports = entries;\n\n//# sourceURL=webpack:///./data/data.js?");

/***/ }),

/***/ "./routes/entries.js":
/*!***************************!*\
  !*** ./routes/entries.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _joi = __webpack_require__(/*! joi */ \"joi\");\n\nvar _joi2 = _interopRequireDefault(_joi);\n\nvar _data = __webpack_require__(/*! ../data/data */ \"./data/data.js\");\n\nvar _data2 = _interopRequireDefault(_data);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar router = (0, _express.Router)();\n\n// data structure for diary entries\n\n// validating entry\nfunction validateEntry(body) {\n  var schema = {\n    title: _joi2.default.string().min(1).required(),\n    description: _joi2.default.string().min(1).required()\n  };\n  return _joi2.default.validate(body, schema);\n}\n\nrouter.get('/', function (req, res) {\n  res.status(200).json(_data2.default);\n});\n\nrouter.get('/:id', function (req, res) {\n  var entryId = req.params.id;\n  var entry = _data2.default.find(function (val) {\n    return val.id === parseInt(entryId, 10);\n  });\n  if (!entry) return res.status(404).send('The entry with this id does not exist');\n  return res.status(200).json(entry);\n});\n\nrouter.post('/', function (req, res) {\n  var _validateEntry = validateEntry(req.body),\n      error = _validateEntry.error;\n\n  if (error) return res.status(400).send(error.details[0].message);\n  var newId = void 0;\n  if (_data2.default.length > 0) {\n    newId = _data2.default[_data2.default.length - 1].id + 1;\n  } else {\n    newId = 1;\n  }\n  var newEntry = {\n    id: newId,\n    title: req.body.title,\n    description: req.body.description\n  };\n  _data2.default.push(newEntry);\n  var entry = _data2.default.find(function (val) {\n    return val.id === newId;\n  });\n  return res.status(201).json(entry);\n});\n\nrouter.put('/:id', function (req, res) {\n  var entryId = req.params.id;\n\n  var entry = _data2.default.find(function (val) {\n    return val.id === parseInt(entryId, 10);\n  });\n  if (!entry) return res.status(404).send('No diary entry with the give id');\n\n  var _validateEntry2 = validateEntry(req.body),\n      error = _validateEntry2.error;\n\n  if (error) return res.status(400).send(error.details[0].message);\n\n  var updatedEntry = {\n    title: req.body.title,\n    description: req.body.description\n  };\n  entry.title = updatedEntry.title;\n  entry.description = updatedEntry.description;\n\n  return res.status(200).json(entry);\n});\n\nrouter.delete('/:id', function (req, res) {\n  var entryId = req.params.id;\n\n  var entry = _data2.default.find(function (val) {\n    return val.id === parseInt(entryId, 10);\n  });\n  if (!entry) return res.status(404).send('No diary entry with the given id');\n\n  var entryIndex = _data2.default.indexOf(entry);\n  _data2.default.splice(entryIndex, 1);\n\n  return res.status(200).json(entry);\n});\n\nrouter.delete('/', function (req, res) {\n  _data2.default.splice(0, _data2.default.length);\n\n  return res.status(200).json(_data2.default);\n});\n\nexports.default = router;\n\n//# sourceURL=webpack:///./routes/entries.js?");

/***/ }),

/***/ "./routes/home.js":
/*!************************!*\
  !*** ./routes/home.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar router = (0, _express.Router)();\nrouter.get('', function (req, res) {\n  res.send('Home page');\n});\n\nexports.default = router;\n\n//# sourceURL=webpack:///./routes/home.js?");

/***/ }),

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _entries = __webpack_require__(/*! ../routes/entries */ \"./routes/entries.js\");\n\nvar _entries2 = _interopRequireDefault(_entries);\n\nvar _home = __webpack_require__(/*! ../routes/home */ \"./routes/home.js\");\n\nvar _home2 = _interopRequireDefault(_home);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar app = (0, _express2.default)();\napp.use(_express2.default.json());\n\napp.use('/api/v1/entries', _entries2.default);\napp.use('/', _home2.default);\n\nvar port = process.env.port || 3000;\n\napp.listen(port, function () {\n  // console.log(`app listening on port ${port}`);\n});\n\n//# sourceURL=webpack:///./server/index.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"joi\");\n\n//# sourceURL=webpack:///external_%22joi%22?");

/***/ })

/******/ });