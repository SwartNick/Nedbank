var pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./AdvancedAccountSearch/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./AdvancedAccountSearch/index.ts":
/*!****************************************!*\
  !*** ./AdvancedAccountSearch/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.AdvancedAccountSearch = void 0;\n\nvar AdvancedAccountSearch = function () {\n  /**\r\n   * Empty constructor.\r\n   */\n  function AdvancedAccountSearch() {}\n  /**\r\n   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.\r\n   * Data-set values are not initialized here, use updateView.\r\n   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.\r\n   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.\r\n   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.\r\n   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.\r\n   */\n\n\n  AdvancedAccountSearch.prototype.init = function (context, notifyOutputChanged, state, container) {\n    var _a; // Add control initialization code\n\n\n    this.localNotifyOutputChanged = notifyOutputChanged;\n    this.context = context; // @ts-ignore\n\n    this.id = (_a = context.parameters.value.attributes) === null || _a === void 0 ? void 0 : _a.LogicalName;\n    this.container = document.createElement(\"div\");\n    this.container.className = \"ms-SearchBox\";\n    this.container.setAttribute(\"style\", \"width:100%\");\n    this.label = document.createElement(\"label\");\n    this.label.className = \"ms-SearchBox-label\";\n    this.label.innerHTML = \"<i class='ms-SearchBox-icon ms-Icon ms-Icon--Search'></i>\";\n    this.buttonContainer = document.createElement(\"div\");\n    this.buttonContainer.className = \"ms-CommandButton ms-SearchBox-clear ms-CommandButton--noLabel\";\n    this.buttonContainer.setAttribute(\"style\", \"display:block\");\n    this.button = document.createElement(\"button\");\n    this.button.className = \"ms-CommandButton-button\";\n    this.button.innerHTML = '<span class=\"ms-CommandButton-icon\"><i class=\"ms-Icon ms-Icon--Search\"></i></span><span class=\"ms-CommandButton-label\"></span> ';\n    this.button.addEventListener(\"click\", this.clearFields.bind(this));\n    this.inputElement = document.createElement(\"input\");\n    this.inputElement.name = \"autocomplete_\" + this.id;\n    this.inputElement.placeholder = \"Search Companies Database...\";\n    this.inputElement.autocomplete = \"off\";\n    this.inputElement.className = \"ms-SearchBox-field\";\n    this.inputElement.setAttribute(\"list\", \"list_\" + this.id);\n    this.inputElement.setAttribute(\"style\", \"width:100%\"); // Get initial values from field.\n    // @ts-ignore\n\n    this.inputElement.value = this.context.parameters.value.formatted; // Add an eventlistner the element and bind it to a  function.\n\n    this.inputElement.addEventListener(\"keydown\", this.hadleKeyEvents.bind(this)); // creating HTML elements for data list \n\n    this.datalistElement = document.createElement(\"datalist\");\n    this.datalistElement.id = \"list_\" + this.id;\n    var optionsHTML = \"\"; //@ts-ignore \n\n    this.datalistElement.innerHTML = optionsHTML;\n    this.buttonContainer.appendChild(this.button);\n    this.container.appendChild(this.label);\n    this.container.appendChild(this.buttonContainer);\n    this.container.appendChild(this.inputElement);\n    this.container.appendChild(this.datalistElement);\n    container.appendChild(this.container);\n  };\n  /**\r\n   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.\r\n   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions\r\n   */\n\n\n  AdvancedAccountSearch.prototype.updateView = function (context) {// Add code to update control view\n  };\n  /**\r\n   * It is called by the framework prior to a control receiving new data.\r\n   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”\r\n   */\n\n\n  AdvancedAccountSearch.prototype.getOutputs = function () {\n    return {};\n  };\n  /**\r\n   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.\r\n   * i.e. cancelling any pending remote calls, removing listeners, etc.\r\n   */\n\n\n  AdvancedAccountSearch.prototype.destroy = function () {// Add code to cleanup control if necessary\n  };\n\n  AdvancedAccountSearch.prototype.clearFields = function (evt) {\n    console.log(\"Clear Fields\"); // this._companyName = \"\"\n    // this._nzbnNumber = \"\"\n    // this._companyName = \"\"\n    // this._tradingAs = \"\"\n    // this._statusCode = \"\"\n    // this._statusReason = \"\"\n    // // this._registrationDate = None\n    // this._bicCode = \"\"\n\n    this.localNotifyOutputChanged();\n  };\n\n  AdvancedAccountSearch.prototype.hadleKeyEvents = function (evt) {\n    // Connect to an API and get the suggesstion as user key presses and update dropdown.\n    //\n    if (evt.key === \"Enter\") {\n      this.datalistElement.innerHTML = \"\";\n      var input = this.inputElement.value;\n      alert(input); //     let query = \"entities?search-term=\" + encodeURIComponent(input) + \"&page-size=20\";\n      //     let options = {\n      //         host: 'api.business.govt.nz/services/v4/nzbn/',\n      //         path: query,\n      //         headers: {\n      //             'accept': 'application/json',\n      //             'authorization': \"Bearer \" + this._nzbnToken\n      //         }\n      //     }\n      //     const https = require('https');\n      //     https.get(options, (resp: any) => {\n      //         let data = '';\n      //         // A chunk of data has been recieved.\n      //         resp.on('data', (chunk: any) => {\n      //             data += chunk;\n      //         });\n      //         // The whole response has been received. Print out the result.\n      //         resp.on('end', () => {\n      //             var response = JSON.parse(data);\n      //             console.log(response);\n      //             var optionsHTML = \"\";\n      //             var optionsHTMLArray = new Array();\n      //             for (var i = 0; i < response.items.length; i++) {\n      //                 // Build the values for the AutoComplete Array and Add ID for after select use.\n      //                 var lastTradingName = ((response.items[i].tradingNames.length > 0) ? this.titleCase(response.items[i].tradingNames[0].name) : this.titleCase(response.items[i].entityName));\n      //                 optionsHTMLArray.push('<option value=\"');\n      //                 optionsHTMLArray.push(this.titleCase(response.items[i].entityName) + \". NZBN: \" + response.items[i].nzbn);\n      //                 optionsHTMLArray.push('\">  Status: ' + response.items[i].entityStatusDescription + ', T/A: ' + lastTradingName + '</option>');\n      //             }\n      //             this.datalistElement.innerHTML = optionsHTMLArray.join(\"\");\n      //             this.localNotifyOutputChanged\n      //         });\n      //     }).on(\"error\", (err: { message: string; }) => {\n      //         console.log(\"Error: \" + err.message);\n      //     });\n    } // else {\n    //     this.getDetails(this.inputElement.value)\n    // }\n\n  };\n\n  return AdvancedAccountSearch;\n}();\n\nexports.AdvancedAccountSearch = AdvancedAccountSearch;\n\n//# sourceURL=webpack://pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad/./AdvancedAccountSearch/index.ts?");

/***/ })

/******/ });
if (window.ComponentFramework && window.ComponentFramework.registerControl) {
	ComponentFramework.registerControl('Nedbank.AdvancedAccountSearch', pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.AdvancedAccountSearch);
} else {
	var Nedbank = Nedbank || {};
	Nedbank.AdvancedAccountSearch = pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.AdvancedAccountSearch;
	pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = undefined;
}