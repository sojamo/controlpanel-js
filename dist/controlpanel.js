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

	'use strict';

	var _ControlPanel = __webpack_require__(1);

	var _ControlPanel2 = _interopRequireDefault(_ControlPanel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* make class ControlPanel available inside the window */
	window.ControlPanel = _ControlPanel2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* ControlPanel */

	var _Builder = __webpack_require__(2);

	var _Builder2 = _interopRequireDefault(_Builder);

	var _Common = __webpack_require__(3);

	var _Common2 = _interopRequireDefault(_Common);

	var _Events = __webpack_require__(5);

	var _Events2 = _interopRequireDefault(_Events);

	var _Observer = __webpack_require__(21);

	var _Observer2 = _interopRequireDefault(_Observer);

	var _Styles = __webpack_require__(22);

	var _Styles2 = _interopRequireDefault(_Styles);

	var _Shapes = __webpack_require__(7);

	var _controllers = __webpack_require__(8);

	var controllers = _interopRequireWildcard(_controllers);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	  * @classdesc
	  */
	var ControlPanel = function () {

	  /**
	    * @constructor
	    */
	  function ControlPanel(theApp, theParams) {
	    _classCallCheck(this, ControlPanel);

	    var params = _Common2.default.merge({ name: '', width: 400, height: 300, parent: document.body }, theParams);

	    this.app = theApp;
	    this.name = params.name;
	    this.styles = new _Styles2.default(this);
	    this.builder = new _Builder2.default(this);
	    this.observer = new _Observer2.default(this);
	    this.events = new _Events2.default(this);
	    this.controllers = {};

	    /* define the root element */
	    var root = this.builder.init(params);

	    /* initialize the control-panel and TODO: assign panel to DOM element */
	    document.getElementById('p5-overlay').appendChild(root);

	    /* setup controller-events */
	    this.events.configure(root, this.name);

	    /* The minimize/maximize Icon TODO: where should this go? */
	    // const minimize = createTriangle({points: '-5,-4, 5,-4, 0,4'});
	    var minimize = (0, _Shapes.createTriangle)({ points: [-5, -4, 5, -4, 0, 4] });
	    (0, _Builder.setAttributesFor)(minimize, { transform: 'translate(12,12) rotate(0)', class: 'menubar' });
	    minimize.value = false;

	    (0, _Events.addEventListener)(minimize, _Events2.default.click, function (ev) {
	      minimize.value = !minimize.value;
	      var r = minimize.value ? -90 : 0;
	      var height = minimize.value ? 24 : params.height;
	      var width = minimize.value ? 64 : params.width;
	      (0, _Builder.setAttributesFor)(root, { height: height, width: width });
	      (0, _Builder.setAttributesFor)(minimize, { transform: 'translate(12,12) rotate(' + r + ')' });
	    });

	    root.appendChild(minimize);
	  }

	  /**
	   * @desc
	   * @param {String} theId
	   * @param {Object} theParams
	   * @returns {ControlPanel} self
	   */


	  _createClass(ControlPanel, [{
	    key: 'create',
	    value: function create(theId, theParams) {
	      /* 1. create a new controller */
	      this.controllers[theId] = this.builder.create(theId, theParams);
	      /* 2. add observer */
	      console.log('created controller:', this.controllers[theId], this.controllers);
	      return this;
	    }

	    /**
	     * @desc
	     * @param {String} theId
	     * @param {Object} theParams
	     * @returns {ControlPanel} self
	     */

	  }, {
	    key: 'change',
	    value: function change(theId, theParams) {
	      var controller = this.controllers[theId]; // FIXME: could be undefined
	      controller.setState(theParams);
	      controller.build();

	      var _theParams$value = theParams.value,
	          value = _theParams$value === undefined ? undefined : _theParams$value;


	      if (value !== undefined) {
	        this.app[controller.id] = controller.getValue();
	        this.app.controlEvent(_Common2.default.merge(theParams, { id: controller.id }));
	      }
	      return this;
	    }

	    /**
	     * @desc
	     * @param {String} theId
	     * @returns {ControlPanel} self
	     */

	  }, {
	    key: 'remove',
	    value: function remove(theId) {
	      /*TODO: implement */
	      console.log("remove", theTarget, "removes theTarget and all children and observers accordingly.");
	      return this;
	    }

	    /**
	     * @desc
	     * @param {String} theId
	     */

	  }, {
	    key: 'print',
	    value: function print(theId) {
	      this.controllers[theId].print();
	    }
	  }]);

	  return ControlPanel;
	}();

	exports.default = ControlPanel;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createElement = exports.setAttributesFor = exports.updateElementFor = exports.buildElementsFor = exports.assignUpdateFor = exports.assignTemplateFor = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Common = __webpack_require__(3);

	var _Common2 = _interopRequireDefault(_Common);

	var _Controller = __webpack_require__(4);

	var _Controller2 = _interopRequireDefault(_Controller);

	var _AHelper2 = __webpack_require__(6);

	var _AHelper3 = _interopRequireDefault(_AHelper2);

	var _Shapes = __webpack_require__(7);

	var _controllers = __webpack_require__(8);

	var controllers = _interopRequireWildcard(_controllers);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	  * @classdesc
	  */
	var Builder = function (_AHelper) {
	  _inherits(Builder, _AHelper);

	  function Builder(theBase) {
	    _classCallCheck(this, Builder);

	    var _this = _possibleConstructorReturn(this, (Builder.__proto__ || Object.getPrototypeOf(Builder)).call(this, theBase));

	    _this.rootRef = undefined;
	    return _this;
	  }

	  /**
	    * @static
	    * @desc returns the svg namespace used in this project
	    * @returns {String} svg name space
	    */


	  _createClass(Builder, [{
	    key: 'create',


	    /**
	      * @desc
	      * @param {Object} theParams
	      * @returns {Object} newly created Controller
	      */
	    value: function create(theId, theParams) {
	      var type = theParams.type;

	      if (templates.hasOwnProperty(type)) return templates[type](theId, theParams);
	    }

	    /**
	      * @desc initializes the Builder and creates the root element
	      * @param {Object} theParams the initial parameters passed on from the ControlPanel
	      * @returns {Object} root element
	      */

	  }, {
	    key: 'init',
	    value: function init(theParams) {
	      var _this2 = this;

	      // const {top=0, left=0, name='?', position='absolute', background='rgba(0,0,0,0.25)'} = theParams;
	      var _theParams$name = theParams.name,
	          name = _theParams$name === undefined ? '?' : _theParams$name,
	          _theParams$background = theParams.background,
	          background = _theParams$background === undefined ? 'rgba(0,0,0,0.2)' : _theParams$background;


	      var defaultAttributes = {
	        id: 'cp5-' + name,
	        class: 'cp5',
	        style: { background: background } };

	      this.rootRef = setAttributesFor(createElement('svg'), _Common2.default.merge(defaultAttributes, theParams));

	      Object.entries(controllers).forEach(function (v) {
	        /* v = [name of the Controller class, Controller class function] */
	        assignUpdateFor(v[0], function (theController, theParams) {
	          v[1].update(theController, theParams);
	        });
	        assignTemplateFor(v[0], function (theId, theParams) {
	          return v[1].create(_this2, theId, theParams);
	        });
	      });

	      return this.rootRef;
	    }

	    /**
	      * @desc creates a new controller based on type and parameters
	      * @param {String} theType the type of controller to be created
	      * @returns {Object} root element
	      */

	  }, {
	    key: 'createControllerFor',
	    value: function createControllerFor(theId, theType) {
	      var controller = new _Controller2.default(theId, theType, this.events());
	      return controller;
	    }

	    /**
	      * @desc
	      * @returns {Object}
	      */

	  }, {
	    key: 'root',
	    value: function root() {
	      return this.rootRef;
	    }
	  }], [{
	    key: 'svgns',
	    value: function svgns() {
	      return 'http://www.w3.org/2000/svg';
	    }
	  }]);

	  return Builder;
	}(_AHelper3.default);

	var templates = {};

	/**
	  * @desc
	  * @param {Object} theName
	  * @param {Object} theFunction
	  * @returns {Object} self
	  */
	var assignTemplateFor = exports.assignTemplateFor = function assignTemplateFor(theName, theFunction) {
	  templates[theName] = theFunction;
	};

	var updates = {};

	/**
	 * [buildController description]
	 * @param  {[type]} theControllerType [description]
	 * @param  {[type]} theUpdateFunction [description]
	 * @return [type]                     [description]
	 */
	var assignUpdateFor = exports.assignUpdateFor = function assignUpdateFor(theControllerType, theUpdateFunction) {
	  updates[theControllerType] = theUpdateFunction;
	};

	/**
	  * @desc
	  * @param {Object} theElement  svg element
	  * @param {Object} theParams  object with attributes
	  * @returns {Object} svg element based on type
	  */
	var buildElementsFor = exports.buildElementsFor = function buildElementsFor(theController, theParams) {
	  var type = theController.type;
	  var attributes = _Common2.default.merge(theController.state, theParams);
	  var element = updates[type](theController, attributes);
	  return element;
	};

	/**
	  * @desc updates or creates a controller's svg element
	  * @param {Controller} theController  the controller
	  * @param {String} theIndex  the index of the svg element
	  * @param {Function} theFn  a function that will be called to create an svg element
	  * @param {Object} theParams  the svg element's parameters
	  */
	var updateElementFor = exports.updateElementFor = function updateElementFor(theController, theIndex, theFn, theParams) {
	  var text = theParams.text;

	  /* first check if the svg element for the given controller exists */

	  if (theController.getElement(theIndex) === undefined) {
	    /* if the element doesn't exist yet, create it by applying theFn and the given parameters */
	    theController.getElement()[theIndex] = theFn(theParams);
	    theController.getElement().insertBefore(theController.getElement(theIndex), theController.getElement('area'));
	  }

	  if (text !== undefined) {
	    (0, _Shapes.setText)(theController.getElement(theIndex), text);
	    /* delete text property from theParams, we do not want to add it as an attribute */
	    delete theParams.text;
	  }

	  /* then make changes to the controller's attributes where necessary */
	  setAttributesFor(theController.getElement(theIndex), theParams);
	};

	/**
	  * @desc helper function to set attributes of a svg element
	  * @param {Object} theElement  svg element
	  * @param {Object} theParams  object with attributes
	  * @returns {Object}  svg element with attributes changed
	  */
	var setAttributesFor = exports.setAttributesFor = function setAttributesFor(theElement, theParams) {
	  // TODO: transform is a special case here, how should we go about it.
	  Object.keys(theParams).forEach(function (key) {
	    theElement.setAttribute(key, _Common2.default.isObject(theParams[key]) ? _Common2.default.objectToString(theParams[key]) : theParams[key]);
	  });
	  return theElement;
	};

	/**
	  * @desc helper function to creating svg elements
	  * @param {String} theType the svg type
	  * @returns {Object} svg element
	  */
	var createElement = exports.createElement = function createElement(theType) {
	  return document.createElementNS(Builder.svgns(), theType);
	};

	exports.default = Builder;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	  * @classdesc
	  */
	var Common = function () {
	  function Common() {
	    _classCallCheck(this, Common);
	  }

	  _createClass(Common, null, [{
	    key: 'b',
	    value: function b(o, d) {
	      return typeof o === 'boolean' ? o : d;
	    }
	  }, {
	    key: 'i',
	    value: function i(o, d) {
	      return Math.round(typeof o === 'number' ? o : d);
	    }
	  }, {
	    key: 's',
	    value: function s(o, d) {
	      return typeof o === 'string' ? o : d;
	    }
	  }, {
	    key: 'f',
	    value: function f(o, d) {
	      return typeof o === 'number' ? o : d;
	    }
	  }, {
	    key: 'constrainValue',
	    value: function constrainValue(theValue, theMin, theMax) {
	      return theValue < theMin ? theMin : theValue > theMax ? theMax : theValue;
	    }
	  }, {
	    key: 'inside',
	    value: function inside(theValue, theMin, theMax) {
	      return theValue >= theMin && theValue <= theMax;
	    }
	  }, {
	    key: 'outside',
	    value: function outside(theValue, theMin, theMax) {
	      return theValue < theMin || theValue > theMax;
	    }
	  }, {
	    key: 'mapValue',
	    value: function mapValue(theValue, theStart0, theStop0, theStart1, theStop1) {
	      return theStart1 + (theStop1 - theStart1) * ((theValue - theStart0) / (theStop0 - theStart0));
	    }
	  }, {
	    key: 'objectToString',
	    value: function objectToString(o) {
	      var str = '';
	      Object.keys(o).forEach(function (key) {
	        str = str + ' ' + key + ':' + o[key] + ';';
	      });
	      return str;
	    }
	  }, {
	    key: 'elementToObject',
	    value: function elementToObject(elem) {
	      var data = {};
	      [].forEach.call(elem.attributes, function (attr) {
	        data[attr.name] = attr.value;
	      });
	      return data;
	    }
	  }, {
	    key: 'isObject',
	    value: function isObject(item) {
	      return item && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && !Array.isArray(item) && item !== null;
	    }

	    /**
	     * deep merge from  https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
	     * TODO: multiple sources ...sources
	     */

	  }, {
	    key: 'merge',
	    value: function merge(target, source) {
	      var _this = this;

	      var output = Object.assign({}, target);
	      if (this.isObject(target) && this.isObject(source)) {
	        Object.keys(source).forEach(function (key) {
	          if (_this.isObject(source[key])) {
	            if (!(key in target)) Object.assign(output, _defineProperty({}, key, source[key]));else output[key] = _this.merge(target[key], source[key]);
	          } else {
	            Object.assign(output, _defineProperty({}, key, source[key]));
	          }
	        });
	      }
	      return output;
	    }
	  }]);

	  return Common;
	}();

	exports.default = Common;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Common = __webpack_require__(3);

	var _Common2 = _interopRequireDefault(_Common);

	var _Events = __webpack_require__(5);

	var _Builder = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	  * @class
	  * @classdesc
	  */
	var Controller = function () {

	  /**
	    * @constructor
	    * @desc creates a Controller object used to build a controller
	    * @param {Object} theId a unique Id
	    * @param {String} theType which type of controller will be created
	    * @param {Object} theBase the reference to the controlpanel the controller belongs to
	    */
	  function Controller(theId, theType, theEventHandler) {
	    var _this = this;

	    _classCallCheck(this, Controller);

	    var id = theId,
	        type = theType,
	        events = theEventHandler;

	    this.id = id;
	    this.type = type;
	    this.state = {};
	    this.events = events;

	    /* a svg element that contains all svg elements belonging to this controller  */
	    this.element = (0, _Builder.setAttributesFor)((0, _Builder.createElement)('g'), { type: type, id: id });
	    this.element.request = function () {
	      return _this;
	    };

	    /* area is a svg element used as overlay to handle mouse and touch input */
	    this.element.area = (0, _Builder.setAttributesFor)((0, _Builder.createElement)('rect'), { fill: 'rgba(0,0,0,0)' });
	    this.element.appendChild(this.element.area);
	  }

	  /**
	    * @desc
	    * @param {String} theIndex
	    * @returns {Object} an svg element
	    */


	  _createClass(Controller, [{
	    key: 'getElement',
	    value: function getElement(theIndex) {
	      return theIndex === undefined ? this.element : this.element[theIndex];
	    }

	    /**
	     *
	     * @return Events
	     */

	  }, {
	    key: 'getEventHandler',
	    value: function getEventHandler() {
	      return this.events;
	    }

	    /**
	     * [getValue description]
	     * @return {Object} [description]
	     */

	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.state.value;
	    }

	    /**
	      * @desc
	      * @param {Object} theIndex
	      * @returns {Object} a specific controller attribute
	      */

	  }, {
	    key: 'getStateFor',
	    value: function getStateFor(theIndex) {
	      return this.state[theIndex];
	    }
	  }, {
	    key: 'getState',
	    value: function getState() {
	      return this.state;
	    }

	    /**
	      * @desc
	      * @param {Object} theParams
	      * @returns {Object} self
	      */

	  }, {
	    key: 'setState',
	    value: function setState(theParams) {
	      this.state = _Common2.default.merge(this.state, theParams);
	      return this;
	    }
	  }, {
	    key: 'removeStateFor',
	    value: function removeStateFor(theKey) {
	      delete this.state[theKey];
	      return this;
	    }

	    /**
	      * @desc
	      * @param {Object} theEvent
	      * @param {Object} theParams
	      * @returns {Object} self
	      */

	  }, {
	    key: 'addEventFor',
	    value: function addEventFor(theEvent, theParams) {
	      var _this2 = this;

	      Object.keys(theParams).forEach(function (key) {
	        (0, _Events.addEventListener)(_this2.getElement('area'), theEvent, function (input) {
	          var params = _Common2.default.merge({}, theParams[key]);
	          var element = params['element'];
	          var event = params['event'];
	          var get = params['get'];
	          params['element'] = element === undefined ? _this2.getElement() : _this2.getElement(element);
	          params['event'] = event === undefined ? input : getEvent(event);
	          params['inputValue'] = get === undefined ? 0 : input[get];
	          (0, _Events.callEventFor)(key)(_this2.getEventHandler(), _this2, params); /* FIXME: call Events.apply() here instead. */
	        });
	      });
	      return this;
	    }

	    /**
	      * @desc
	      * @param {Object} theParent
	      * @returns {Object} self
	      */
	    /* FIXME: make sure we don't allow this to be called more than once to avoid multiple parents */

	  }, {
	    key: 'setParent',
	    value: function setParent(theParent) {
	      theParent.appendChild(this.getElement());
	      return this;
	    }

	    /**
	      * @desc
	      * @returns {Object}
	      */

	  }, {
	    key: 'build',
	    value: function build() {
	      var _state = this.state,
	          width = _state.width,
	          height = _state.height,
	          x = _state.x,
	          y = _state.y,
	          r = _state.r;

	      (0, _Builder.setAttributesFor)(this.getElement(), { transform: 'translate(' + x + ',' + y + ')', width: width, height: height });
	      (0, _Builder.buildElementsFor)(this, this.state);
	    }
	  }, {
	    key: 'print',
	    value: function print() {
	      console.log(this.getElement(), this.state);
	    }
	  }]);

	  return Controller;
	}();

	exports.default = Controller;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.addEventListener = exports.callEventFor = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Common = __webpack_require__(3);

	var _Common2 = _interopRequireDefault(_Common);

	var _AHelper2 = __webpack_require__(6);

	var _AHelper3 = _interopRequireDefault(_AHelper2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	  * @classdesc
	  */
	var Event = function (_AHelper) {
	  _inherits(Event, _AHelper);

	  /**
	    * @constructor
	    */
	  function Event(theBase) {
	    _classCallCheck(this, Event);

	    var _this = _possibleConstructorReturn(this, (Event.__proto__ || Object.getPrototypeOf(Event)).call(this, theBase));

	    _this.dragTarget = undefined;
	    _this.viewTarget = undefined;
	    return _this;
	  }

	  /**
	    * @desc
	    * @param {Object} theRoot
	    */


	  _createClass(Event, [{
	    key: 'configure',
	    value: function configure(theRoot, theName) {
	      var _this2 = this;

	      /* prevent Event to be configured multiple times */
	      if (this.viewTarget !== undefined) return;

	      this.viewTarget = document;

	      /* window events */
	      addEventListener(window, Event.resize, function (event) {});

	      /* mouse events */

	      /* call events when the mouse is moved, in case a drag-target is defined, call drag */
	      addEventListener(this.viewTarget, Event.mouseMove, function (event) {
	        if (_this2.dragTarget === undefined) return;
	        _this2.dragTarget.params['event'] = event;
	        _this2.apply(_this2.dragTarget.controller, 'drag', _this2.dragTarget.params);
	      });

	      /* when the mouse is up, release the drag-target */
	      addEventListener(this.viewTarget, Event.mouseUp, function (event) {
	        _this2.apply(_this2.dragTarget !== undefined ? _this2.dragTarget.controller : undefined, 'stopDrag', { event: event });
	      });

	      /* wheel events */
	      var wheel = function wheel() {
	        return Event.onWheel in _this2.viewTarget ? Event.wheel : Event.mouseWheel;
	      };
	      addEventListener(theRoot, wheel(), function (event) {
	        event.preventDefault();
	      });

	      /* TODO: key events */
	      // addEventListener(this.viewTarget, Event.keyUp, event => {this.handleKeyEvent(Event.keyUp, event);});
	      // addEventListener(this.viewTarget, Event.keyPress, event => {this.handleKeyEvent(Event.keyPressed, event);});


	      /* TODO: touch events, for mobile devices */
	      /* NOTE: how to extract touch info, see https://github.com/processing/p5.js/blob/master/src/events/touch.js */

	      /* when a touch-event is detected, treat as mouseDown. */
	      addEventListener(this.viewTarget, Event.touchStart, function (event) {
	        _this2.apply(_this2.dragTarget !== undefined ? _this2.dragTarget.controller : undefined, 'stopDrag', { event: event });
	      }, true);

	      /* when a touch-pointer is moved, treat as mouseMove. Only use 1 touch-pointer, ignore the others. */
	      addEventListener(theRoot, Event.touchMove, function (event) {
	        _this2.base().app.a = event.clientX;
	        event.preventDefault();
	      });

	      /* when a touch-event ends, do ... */
	      addEventListener(this.viewTarget, Event.touchEnd, function (event) {
	        _this2.apply(_this2.dragTarget !== undefined ? _this2.dragTarget.controller : undefined, 'stopDrag', { event: event });
	      });
	    }

	    /**
	      * @desc
	      * @param {Object} theName
	      * @param {Object} theFunction
	      * @returns {Object} self
	      */

	  }, {
	    key: 'set',
	    value: function set(theEvent, theFunction) {
	      setEvent(theEvent, theFunction);
	      return this;
	    }

	    /**
	      * @desc request an event
	      * @param {Object} theEvent
	      * @returns {Object} an event function from the pool of events
	      */

	  }, {
	    key: 'get',
	    value: function get(theEvent) {
	      return events[theEvent] || function () {
	        console.log('Event', theEvent, 'does not exist.');
	      };
	    }

	    /**
	      * @desc
	      * @param {Object} theController
	      * @param {Object} theEvent
	      * @param {Object} theParams
	      * @returns {Object} self
	      */

	  }, {
	    key: 'apply',
	    value: function apply(theController, theEvent, theParams) {
	      events[theEvent](this, theController, theParams);
	      return this;
	    }

	    /* FIXME: EXPERIMENTAL checks all elements for mouse-over when key is pressed,
	     * then finds the most-top one and changes the text of its label.
	     * uses Controller.element.request() to access the Controller assigned to the element. */

	  }, {
	    key: 'handleKeyEvent',
	    value: function handleKeyEvent(theEventType, theEvent) {
	      /* gather all elements that are under the mouse pointer when a key gets pressed */
	      var arr = [].concat(_toConsumableArray(document.querySelectorAll(":hover")));
	      /* check if we are dealing with an svg element */
	      if (!!arr.filter(function (el) {
	        return el.nodeName === 'svg';
	      }).filter(function (el) {
	        return el === theRoot;
	      }).length) {
	        /* check if the element implements request */
	        var target = arr.filter(function (el) {
	          return el.request !== undefined;
	        });
	        /* if this is the case and the target is not empty, then reduce the target and request it */
	        if (!!target.length) target.reduce(function (el) {
	          return el;
	        }).request().change({ label: 'hello' });
	      }
	    }
	  }]);

	  return Event;
	}(_AHelper3.default);

	var events = {};

	var setEvent = function setEvent(theEvent, theFunction) {
	  events[theEvent] = theFunction;
	};

	var callEventFor = exports.callEventFor = function callEventFor(theEvent) {
	  return events[theEvent];
	};

	/**
	  * @desc
	  * @param {Object} theElement
	  * @param {String} theType
	  * @param {Function} theCallback
	  */
	var addEventListener = exports.addEventListener = function addEventListener(theElement, theType, theCallback) {
	  var theFlag = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	  if (theElement.addEventListener) {
	    theElement.addEventListener(theType, theCallback, theFlag);
	  } else if (theElement.attachEvent) {
	    theElement.attachEvent('on' + theType, theCallback);
	  }
	};

	/* setup default events */

	/**
	 * [dragTarget description]
	 * @type {Object}
	 */
	setEvent('call', function (theEventHandler, theController, theParams) {
	  var fn = theParams.fn;

	  fn(theEventHandler, theController, theParams);
	});

	/**
	 * [dragTarget description]
	 * @type {Object}
	 */
	setEvent('startDrag', function (theEventHandler, theController, theParams) {
	  theEventHandler.dragTarget = { controller: theController, params: theParams };
	});

	/**
	 * [dragTarget description]
	 * @type {[type]}
	 */
	setEvent('stopDrag', function (theEventHandler, theController, theParams) {
	  theEventHandler.dragTarget = undefined; /* FIXME: should not be undefined but an empty controller */
	});

	/**
	 * [v0 description]
	 * @type {[type]}
	 */
	setEvent('drag', function (theEventHandler, theController, theParams) {
	  var then = theParams.then,
	      get = theParams.get;

	  theParams['inputValue'] = get !== undefined ? theParams.event[get] : 0;
	  callEventFor(then)(theEventHandler, theController, theParams);
	});

	/**
	 * [v0 description]
	 * @type {[type]}
	 */
	setEvent('preventDefault', function (theEventHandler, theController, theParams) {
	  var event = theParams.event;

	  event.preventDefault();
	});

	/**
	 * [v0 description]
	 * @type {[type]}
	 */
	setEvent('sliderDown', function (theEventHandler, theController, theParams) {
	  var event = theParams.event,
	      element = theParams.element;
	  var _theController$state = theController.state,
	      min = _theController$state.min,
	      max = _theController$state.max,
	      width = _theController$state.width;

	  var pointer = event.clientX - element.area.getBoundingClientRect().left;
	  var v0 = _Common2.default.mapValue(pointer, 0, width, min, max);
	  var value = _Common2.default.constrainValue(v0, min, max);
	  theEventHandler.base().change(theController.id, { value: value });
	});

	/**
	 * [v0 description]
	 * @type {[type]}
	 */
	setEvent('sliderDrag', function (theEventHandler, theController, theParams) {
	  var event = theParams.event,
	      inputValue = theParams.inputValue;
	  var _theController$state2 = theController.state,
	      min = _theController$state2.min,
	      max = _theController$state2.max,
	      width = _theController$state2.width,
	      val = _theController$state2.value;

	  var v0 = val + _Common2.default.mapValue(inputValue, 0, width, 0, max - min);
	  var value = _Common2.default.constrainValue(v0, min, max);
	  theEventHandler.base().change(theController.id, { value: value });
	});

	/**
	 * [v0 description]
	 * @type {[type]}
	 */
	setEvent('rangeDown', function (theEventHandler, theController, theParams) {
	  var event = theParams.event,
	      element = theParams.element;
	  var _theController$state3 = theController.state,
	      min = _theController$state3.min,
	      max = _theController$state3.max,
	      value = _theController$state3.value,
	      width = _theController$state3.width,
	      handleWidth = _theController$state3.handleWidth;

	  var left = _Common2.default.mapValue(value.min, min, max, handleWidth, width - handleWidth);
	  var right = _Common2.default.mapValue(value.max, min, max, handleWidth, width - handleWidth);
	  var pointer = event.clientX - element.area.getBoundingClientRect().left;
	  var which = _Common2.default.inside(pointer, left - handleWidth, left) ? 'left' : _Common2.default.inside(pointer, right, right + handleWidth) ? 'right' : !_Common2.default.outside(pointer, left, right) ? 'center' : undefined;
	  theEventHandler.dragTarget['applyTo'] = which;
	});

	/**
	 * [setEvent description]
	 * @param {[type]} rangeDrag       [description]
	 * @param {[type]} theEventHandler [description]
	 * @param {[type]} inputValue      [description]
	 * @param {[type]} min             [description]
	 * @param {[type]} max             [description]
	 * @param {[type]} value           [description]
	 */
	setEvent('rangeDrag', function (theEventHandler, theController, theParams) {
	  var event = theParams.event,
	      inputValue = theParams.inputValue;
	  var _theController$state4 = theController.state,
	      width = _theController$state4.width,
	      minValue = _theController$state4.min,
	      maxValue = _theController$state4.max,
	      val = _theController$state4.value;

	  var range = val.max - val.min;
	  var dist = _Common2.default.mapValue(inputValue, 0, width, 0, maxValue - minValue);
	  var applyTo = theEventHandler.dragTarget === undefined ? 'scroll' : theEventHandler.dragTarget.applyTo;

	  switch (applyTo) {
	    case 'center':
	    case 'scroll':
	      {
	        var min = _Common2.default.constrainValue(val.min + dist, minValue, maxValue - range);
	        var max = min + range;
	        theEventHandler.base().change(theController.id, { value: { min: min, max: max } });
	      }
	      break;
	    case 'left':
	      {
	        var _min = _Common2.default.constrainValue(val.min + dist, minValue, val.max);
	        theEventHandler.base().change(theController.id, { value: { min: _min } });
	      }
	      break;
	    case 'right':
	      {
	        var _max = _Common2.default.constrainValue(val.max + dist, val.min, maxValue);
	        theEventHandler.base().change(theController.id, { value: { max: _max } });
	      }
	      break;
	  }
	});

	/**
	 * [hover description]
	 * @type {[type]}
	 */
	setEvent('hover', function (theEventHandler, theController, theParams) {
	  var is = theParams.is;

	  theEventHandler.base().change(theController.id, { hover: is });
	});

	Event.change = 'change';
	Event.blur = 'blur';
	Event.click = 'click';
	Event.focus = 'focus';
	Event.keyDown = 'keydown';
	Event.keyPress = 'keypress';
	Event.keyUp = 'keyup';
	Event.mouseDown = 'mousedown';
	Event.mouseEnter = 'mouseenter';
	Event.mouseLeave = 'mouseleave';
	Event.mouseMove = 'mousemove';
	Event.mouseUp = 'mouseup';
	Event.mouseWheel = 'mousewheel';
	Event.onWheel = 'onwheel';
	Event.resize = 'resize';
	Event.touchEnd = 'touchend';
	Event.touchMove = 'touchmove';
	Event.touchStart = 'touchstart';
	Event.wheel = 'wheel';

	exports.default = Event;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AHelper = function () {
	  function AHelper(theBase) {
	    _classCallCheck(this, AHelper);

	    this.baseRef = theBase;
	  }

	  /**
	    * @desc
	    * @returns {ControlPanel}
	    */


	  _createClass(AHelper, [{
	    key: "base",
	    value: function base() {
	      return this.baseRef;
	    }

	    /**
	      * @desc
	      * @returns {Builder}
	      */

	  }, {
	    key: "builder",
	    value: function builder() {
	      return this.baseRef.builder;
	    }

	    /**
	      * @desc
	      * @returns {Events}
	      */

	  }, {
	    key: "events",
	    value: function events() {
	      return this.baseRef.events;
	    }

	    /**
	      * @desc
	      * @returns {Object}
	      */

	  }, {
	    key: "properties",
	    value: function properties() {
	      return this.baseRef.properties;
	    }
	  }]);

	  return AHelper;
	}();

	exports.default = AHelper;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setText = exports.createCanvas = exports.createChart = exports.createTriangle = exports.createInput = exports.createCircle = exports.createLabel = exports.createRect = undefined;

	var _Builder = __webpack_require__(2);

	var _Common = __webpack_require__(3);

	var _Common2 = _interopRequireDefault(_Common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	  * @desc helper function to create a svg rectangle
	  * @param {Object} theParams  the parameters to be used to style the rectangle
	  * @returns {Object} svg rect with attributes added
	  */
	var createRect = exports.createRect = function createRect(theParams) {
	  var _theParams$width = theParams.width,
	      width = _theParams$width === undefined ? 100 : _theParams$width,
	      _theParams$height = theParams.height,
	      height = _theParams$height === undefined ? 100 : _theParams$height,
	      _theParams$rx = theParams.rx,
	      rx = _theParams$rx === undefined ? 0 : _theParams$rx,
	      _theParams$ry = theParams.ry,
	      ry = _theParams$ry === undefined ? 0 : _theParams$ry;

	  var defaultAttributes = { width: width, height: height, rx: rx, ry: ry };
	  var shape = (0, _Builder.setAttributesFor)((0, _Builder.createElement)('rect'), _Common2.default.merge(defaultAttributes, theParams));
	  return shape;
	};

	/**
	  * @desc helper function to create a svg text element
	  * @param {Object} theParams  the parameters to be used to style a text label
	  * @returns {Object} svg text with attributes added
	  */
	var createLabel = exports.createLabel = function createLabel(theParams) {
	  var _theParams$textAnchor = theParams.textAnchor,
	      textAnchor = _theParams$textAnchor === undefined ? 'start' : _theParams$textAnchor,
	      _theParams$alignmentB = theParams.alignmentBaseline,
	      alignmentBaseline = _theParams$alignmentB === undefined ? 'central' : _theParams$alignmentB,
	      text = theParams.text;

	  var defaultAttributes = { 'alignment-baseline': alignmentBaseline, 'text-anchor': textAnchor };
	  delete theParams.text;
	  var label = (0, _Builder.setAttributesFor)(setText((0, _Builder.createElement)('text'), text), _Common2.default.merge(defaultAttributes, theParams));
	  return label;
	};

	/**
	 * @desc
	 * @param  {Object} theParams
	 * @returns {Object}
	 */
	var createCircle = exports.createCircle = function createCircle(theParams) {
	  var _theParams$r = theParams.r,
	      r = _theParams$r === undefined ? 20 : _theParams$r,
	      _theParams$cx = theParams.cx,
	      cx = _theParams$cx === undefined ? 20 : _theParams$cx,
	      _theParams$cy = theParams.cy,
	      cy = _theParams$cy === undefined ? 20 : _theParams$cy;

	  var defaultAttributes = { r: r, cx: cx, cy: cy };
	  var shape = (0, _Builder.setAttributesFor)((0, _Builder.createElement)('circle'), _Common2.default.merge(defaultAttributes, theParams));
	  return shape;
	};

	/* TODO implement triangle */
	var createInput = exports.createInput = function createInput(theParams) {
	  var _theParams$x = theParams.x,
	      x = _theParams$x === undefined ? 0 : _theParams$x,
	      _theParams$y = theParams.y,
	      y = _theParams$y === undefined ? 0 : _theParams$y,
	      _theParams$width2 = theParams.width,
	      width = _theParams$width2 === undefined ? 100 : _theParams$width2,
	      _theParams$height2 = theParams.height,
	      height = _theParams$height2 === undefined ? 20 : _theParams$height2;

	  var defaultAttributes = { x: x, y: y, width: width, height: height };
	  console.log('createInput', defaultAttributes);
	  var blur = function blur(target) {
	    (0, _Builder.setAttributesFor)(target, { contenteditable: 'false' });
	  };
	  var shape = (0, _Builder.setAttributesFor)((0, _Builder.createElement)('foreignObject'), _Common2.default.merge(defaultAttributes, theParams));
	  var div = (0, _Builder.setAttributesFor)(document.createElement('div'), {
	    class: 'single',
	    xmlns: 'http://www.w3.org/1999/xhtml' });
	  var span = (0, _Builder.setAttributesFor)(document.createElement('span'), {
	    onblur: 'this.setAttribute("contenteditable", false)',
	    style: 'font-size:20px; color:rgba(255,255,255,1); line-height: normal; height: ' + height + 'px',
	    contenteditable: 'false' });
	  div.appendChild(span);
	  shape.appendChild(div);
	  return shape;
	};

	/* TODO implement triangle */
	var createTriangle = exports.createTriangle = function createTriangle(theParams) {
	  var _theParams$points = theParams.points,
	      points = _theParams$points === undefined ? [0, 0, 100, 0, 50, 100] : _theParams$points;

	  var defaultAttributes = { points: points };
	  var shape = (0, _Builder.setAttributesFor)((0, _Builder.createElement)('polygon'), _Common2.default.merge(defaultAttributes, theParams));
	  return shape;
	};

	/* TODO implement chart */
	var createChart = exports.createChart = function createChart(theParams) {
	  var chart = (0, _Builder.createElement)('svg');
	  var line = (0, _Builder.createElement)('polyline');
	  return chart;
	};

	/* TODO implement canvas */
	var createCanvas = exports.createCanvas = function createCanvas(theParams) {};

	/**
	 * [setText description]
	 * @param {[type]} theElem [description]
	 * @param {[type]} theText [description]
	 */
	var setText = exports.setText = function setText(theElem, theText) {
	  theElem.innerHTML = theText;
	  return theElem;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Toggle = exports.TextField = exports.Slider = exports.Range = exports.ColorPicker = exports.Chart = exports.Button = undefined;

	var _Button = __webpack_require__(9);

	var _Button2 = _interopRequireDefault(_Button);

	var _ButtonBar = __webpack_require__(10);

	var _ButtonBar2 = _interopRequireDefault(_ButtonBar);

	var _Chart = __webpack_require__(11);

	var _Chart2 = _interopRequireDefault(_Chart);

	var _ColorPicker = __webpack_require__(12);

	var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

	var _Knob = __webpack_require__(13);

	var _Knob2 = _interopRequireDefault(_Knob);

	var _NumberBox = __webpack_require__(14);

	var _NumberBox2 = _interopRequireDefault(_NumberBox);

	var _RadioButton = __webpack_require__(15);

	var _RadioButton2 = _interopRequireDefault(_RadioButton);

	var _Range = __webpack_require__(16);

	var _Range2 = _interopRequireDefault(_Range);

	var _Slider = __webpack_require__(17);

	var _Slider2 = _interopRequireDefault(_Slider);

	var _TextField = __webpack_require__(18);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _TextLabel = __webpack_require__(19);

	var _TextLabel2 = _interopRequireDefault(_TextLabel);

	var _Toggle = __webpack_require__(20);

	var _Toggle2 = _interopRequireDefault(_Toggle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Button = _Button2.default;
	exports.Chart = _Chart2.default;
	exports.ColorPicker = _ColorPicker2.default;
	exports.Range = _Range2.default;
	exports.Slider = _Slider2.default;
	exports.TextField = _TextField2.default;
	exports.Toggle = _Toggle2.default;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Events = __webpack_require__(5);

	var _Events2 = _interopRequireDefault(_Events);

	var _Common = __webpack_require__(3);

	var _Common2 = _interopRequireDefault(_Common);

	var _Controller = __webpack_require__(4);

	var _Controller2 = _interopRequireDefault(_Controller);

	var _Shapes = __webpack_require__(7);

	var _Builder = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Button = function () {
	  function Button() {
	    _classCallCheck(this, Button);
	  }

	  _createClass(Button, null, [{
	    key: 'create',


	    /**
	     * [create description]
	     * @param  {[type]} theBuilder  [description]
	     * @param  {[type]} theId       [description]
	     * @param  {[type]} theParams   [description]
	     * @return [type]               [description]
	     */
	    value: function create(theBuilder, theId, theParams) {
	      /* 1. set default parameters*/
	      var _theParams$value = theParams.value,
	          value = _theParams$value === undefined ? 1 : _theParams$value,
	          _theParams$x = theParams.x,
	          x = _theParams$x === undefined ? 0 : _theParams$x,
	          _theParams$y = theParams.y,
	          y = _theParams$y === undefined ? 0 : _theParams$y,
	          _theParams$r = theParams.r,
	          r = _theParams$r === undefined ? 0 : _theParams$r,
	          _theParams$width = theParams.width,
	          width = _theParams$width === undefined ? 100 : _theParams$width,
	          _theParams$height = theParams.height,
	          height = _theParams$height === undefined ? 20 : _theParams$height;

	      /* 2. create a Controller object */

	      var controller = theBuilder.createControllerFor(theId, this.name);

	      /* 3. initialize the controller's state and events, also assign it's parent */
	      controller.setState(_Common2.default.merge({ value: value, width: width, height: height, x: x, y: y, r: r }, theParams)).addEventFor(_Events2.default.click, { call: { fn: function fn(e, c, p) {
	            console.log('hello click', c);
	          } } }).addEventFor(_Events2.default.mouseDown, { call: { fn: function fn(e, c, p) {
	            (0, _Builder.setAttributesFor)(c.getElement('bg'), { class: Button.active });
	          } } }).addEventFor(_Events2.default.mouseUp, { call: { fn: function fn(e, c, p) {
	            (0, _Builder.setAttributesFor)(c.getElement('bg'), { class: Button.hover });
	          } } }).addEventFor(_Events2.default.mouseEnter, { hover: { is: true } }).addEventFor(_Events2.default.mouseLeave, { hover: { is: false } }).setParent(theBuilder.root()).build();

	      /* 4. after building is completed, return the controller */
	      return controller;
	    }

	    /**
	     * A controller is updated when changes are made
	     * @param  {Controller} theController [description]
	     * @param  {Object} theParams         [description]
	     * @return Controller                 [description]
	     */

	  }, {
	    key: 'update',
	    value: function update(theController, theParams) {
	      var width = theParams.width,
	          height = theParams.height,
	          label = theParams.label,
	          hover = theParams.hover,
	          option = theParams.option,
	          icon = theParams.icon,
	          _theParams$rx = theParams.rx,
	          rx = _theParams$rx === undefined ? 4 : _theParams$rx,
	          _theParams$ry = theParams.ry,
	          ry = _theParams$ry === undefined ? 4 : _theParams$ry;

	      var c0 = hover ? Button.hover : Button.normal;
	      var x = width / 2;
	      var y = height / 2;
	      (0, _Builder.updateElementFor)(theController, 'bg', _Shapes.createRect, { width: width, height: height, class: c0, rx: rx, ry: ry });
	      switch (option) {
	        case 'icon':
	          (0, _Builder.updateElementFor)(theController, 'icon', _Shapes.createLabel, { x: x, y: y, textAnchor: 'middle', class: Button.icon, text: icon });
	          break;
	        default:
	          (0, _Builder.updateElementFor)(theController, 'label', _Shapes.createLabel, { x: x, y: y, textAnchor: 'middle', class: Button.label, text: label });
	      }
	      (0, _Builder.updateElementFor)(theController, 'area', _Shapes.createRect, { width: width, height: height, class: _Controller2.default.area });
	      return theController;
	    }
	  }]);

	  return Button;
	}();

	Button.normal = 'button bg';
	Button.hover = 'button fg';
	Button.active = 'button active';
	Button.label = 'button label';
	Button.icon = 'button icon';

	exports.default = Button;

/***/ },
/* 10 */
/***/ function(module, exports) {

	/* TODO */
	"use strict";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* TODO */


	var _Events = __webpack_require__(5);

	var _Events2 = _interopRequireDefault(_Events);

	var _Common = __webpack_require__(3);

	var _Common2 = _interopRequireDefault(_Common);

	var _Controller = __webpack_require__(4);

	var _Controller2 = _interopRequireDefault(_Controller);

	var _Shapes = __webpack_require__(7);

	var _Builder = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Chart = function () {
	  function Chart() {
	    _classCallCheck(this, Chart);
	  }

	  _createClass(Chart, null, [{
	    key: 'create',
	    value: function create(theBuilder, theId, theParams) {
	      /* 1. configure default parameters first */
	      var _theParams$value = theParams.value,
	          value = _theParams$value === undefined ? [] : _theParams$value,
	          _theParams$x = theParams.x,
	          x = _theParams$x === undefined ? 0 : _theParams$x,
	          _theParams$y = theParams.y,
	          y = _theParams$y === undefined ? 0 : _theParams$y,
	          _theParams$width = theParams.width,
	          width = _theParams$width === undefined ? 100 : _theParams$width,
	          _theParams$height = theParams.height,
	          height = _theParams$height === undefined ? 50 : _theParams$height;

	      /* 2. create a new controller of type slider */

	      var controller = theBuilder.createControllerFor(theId, this.name);

	      /* 3. now set the state for the slider */
	      controller.setState(_Common2.default.merge({ value: value, width: width, height: height, x: x, y: y }, theParams)).setParent(theBuilder.root()).build();

	      /* 4. finally return the newly created controller */
	      return controller;
	    }
	  }, {
	    key: 'test',
	    value: function test() {
	      console.log("testing static call");
	    }
	  }, {
	    key: 'update',
	    value: function update(theController, theParams) {
	      var width = theParams.width,
	          height = theParams.height,
	          label = theParams.label,
	          option = theParams.option,
	          value = theParams.value;

	      (0, _Builder.updateElementFor)(theController, 'bg', _Shapes.createRect, { width: width, height: height, class: 'chart bg' });
	      (0, _Builder.updateElementFor)(theController, 'chart', _Shapes.createChart, { width: width, height: height, value: value });
	      (0, _Builder.updateElementFor)(theController, 'area', _Shapes.createRect, { width: width, height: height, class: _Controller2.default.area });
	      return theController;
	    }
	  }]);

	  return Chart;
	}();

	exports.default = Chart;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Events = __webpack_require__(5);

	var _Events2 = _interopRequireDefault(_Events);

	var _Common = __webpack_require__(3);

	var _Common2 = _interopRequireDefault(_Common);

	var _Controller = __webpack_require__(4);

	var _Controller2 = _interopRequireDefault(_Controller);

	var _Shapes = __webpack_require__(7);

	var _Builder = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ColorPicker = function () {
	  function ColorPicker() {
	    _classCallCheck(this, ColorPicker);
	  }

	  _createClass(ColorPicker, null, [{
	    key: 'create',


	    /**
	     * [create description]
	     * @param  {[type]} theBuilder  [description]
	     * @param  {[type]} theId       [description]
	     * @param  {[type]} theParams   [description]
	     * @return [type]               [description]
	     */
	    value: function create(theBuilder, theId, theParams) {
	      /* 1. configure default parameters first */
	      var _theParams$x = theParams.x,
	          x = _theParams$x === undefined ? 0 : _theParams$x,
	          _theParams$y = theParams.y,
	          y = _theParams$y === undefined ? 0 : _theParams$y,
	          _theParams$r = theParams.r,
	          r = _theParams$r === undefined ? 0 : _theParams$r,
	          _theParams$width = theParams.width,
	          width = _theParams$width === undefined ? 100 : _theParams$width,
	          _theParams$height = theParams.height,
	          height = _theParams$height === undefined ? 20 : _theParams$height,
	          _theParams$spacing = theParams.spacing,
	          spacing = _theParams$spacing === undefined ? 10 : _theParams$spacing,
	          _theParams$pickerHeig = theParams.pickerHeight,
	          pickerHeight = _theParams$pickerHeig === undefined ? 100 : _theParams$pickerHeig,
	          _theParams$value = theParams.value,
	          value = _theParams$value === undefined ? [255, 0, 0, 255] : _theParams$value,
	          _theParams$hue = theParams.hue,
	          hue = _theParams$hue === undefined ? [255, 255, 255, 255] : _theParams$hue;

	      /* 2. create a new controller of type button */

	      var controller = theBuilder.createControllerFor(theId, this.name);

	      /* 3. now set the state, events, parent for the button */
	      controller.setState(_Common2.default.merge({ value: value, hue: hue, width: width, height: height, x: x, y: y, r: r }, theParams)).addEventFor(_Events2.default.click, { call: { fn: ColorPicker.togglePicker } }).addEventFor(_Events2.default.mouseEnter, { hover: { is: true } }).addEventFor(_Events2.default.mouseLeave, { hover: { is: false } }).setParent(theBuilder.root()).build();

	      /* 4. finally return the newly created controller */
	      return controller;
	    }

	    /**
	     * [togglePicker description]
	     * @param  {[type]} theController [description]
	     * @param  {[type]} theParams     [description]
	     * @return [type]                 [description]
	     */

	  }, {
	    key: 'togglePicker',
	    value: function togglePicker(theEventHandler, theController) {

	      var k0 = 'picker';

	      /* the root element of the ControlPanel
	       * the color-picker, when opened, will be rendered on top of all other elements */
	      var root = theController.element.nearestViewportElement;

	      /* v0 is either undefined or a foreignObject element */
	      var v0 = theController.getStateFor(k0);

	      /* if v0 is undefined, lets open the picker */
	      if (v0 === undefined) {
	        (function () {

	          /* local parameters we will need */
	          var params = {
	            x: theController.getStateFor('x') || 0,
	            y: theController.getStateFor('y') + theController.getStateFor('height') || 20,
	            width: theController.getStateFor('width') || 200,
	            height: theController.getStateFor('pickerHeight') || 100,
	            spacing: theController.getStateFor('spacing') || 10,
	            hue: theController.getStateFor('hue')
	          };

	          /* create a foreignObject to store a canvas */
	          var f0 = (0, _Builder.setAttributesFor)((0, _Builder.createElement)('foreignObject'), params);

	          /* create a canvas that we can use to render colors in HSB */
	          var canvas = (0, _Builder.setAttributesFor)(document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas'), params);

	          /* add the canvas to the foreignObject */
	          f0.appendChild(canvas);

	          /* on click, change color */
	          (0, _Events.addEventListener)(canvas, _Events2.default.click, function (event) {
	            ColorPicker.changeColorFor(theController, theEventHandler, canvas, _Common2.default.merge(params, { sx: event.layerX, sy: event.layerY }));
	          });

	          /* when dragging the mouse inside the foreignObject, update color */
	          (0, _Events.addEventListener)(canvas, _Events2.default.mouseMove, function (event) {
	            if (event.buttons !== 0) {
	              ColorPicker.changeColorFor(theController, theEventHandler, canvas, _Common2.default.merge(params, { sx: event.layerX, sy: event.layerY }));
	            }
	          });

	          /* an outside click will close the foreignObject */
	          (0, _Events.addEventListener)(f0, _Events2.default.blur, function (event) {
	            ColorPicker.togglePicker(theEventHandler, theController);
	          });

	          /* add the foreignObject to the ColorPicker object and set focus */
	          theEventHandler.base().change(theController.id, _defineProperty({}, k0, f0));
	          root.appendChild(f0);
	          f0.focus();

	          /* render the color spectrum*/
	          ColorPicker.renderColorInto(canvas, params);
	        })();
	      } else {
	        /* remove */
	        root.removeChild(v0);
	        theController.removeStateFor(k0);
	      }
	    }
	  }, {
	    key: 'changeColorFor',


	    /**
	     * [changeColorFor description]
	     * @param  {[type]} theController [description]
	     * @param  {[type]} theElement    [description]
	     * @param  {[type]} theParams     [description]
	     * @return [type]                 [description]
	     */
	    value: function changeColorFor(theController, theEventHandler, theElement, theParams) {

	      /* render the color spectrum*/
	      var hue = theController.getStateFor('hue');
	      var ctx = ColorPicker.renderColorInto(theElement, _Common2.default.merge(theParams, { hue: hue }));

	      /* check the color under the cursor */
	      var selectedColor = [].concat(_toConsumableArray(ctx.getImageData(theParams.sx, theParams.sy, 1, 1).data));

	      if (theParams.sx < theParams.spacing) {
	        /* select a new hue value */
	        ColorPicker.renderColorInto(theElement, _Common2.default.merge(theParams, { hue: selectedColor }));
	        theEventHandler.base().change(theController.id, { hue: selectedColor });
	      } else {
	        /* otherwise change the brightness/saturation based on the color selected */
	        var style = 'fill: rgba(' + selectedColor[0] + ', ' + selectedColor[1] + ', ' + selectedColor[2] + ', 1.0)';
	        (0, _Builder.setAttributesFor)(theController.getElement().childNodes[0], { style: style });
	        theEventHandler.base().change(theController.id, { value: selectedColor });
	      }
	    }
	  }, {
	    key: 'update',


	    /**
	     * [update description]
	     * @param  {[type]} theController [description]
	     * @param  {[type]} theParams     [description]
	     * @return [type]                 [description]
	     */
	    value: function update(theController, theParams) {
	      var width = theParams.width,
	          height = theParams.height,
	          label = theParams.label,
	          hover = theParams.hover;

	      var c0 = hover ? ColorPicker.active : ColorPicker.normal;
	      var x = width / 2;
	      var y = height / 2;
	      (0, _Builder.updateElementFor)(theController, 'fg', _Shapes.createRect, { width: width, height: height, class: c0 });
	      (0, _Builder.updateElementFor)(theController, 'label', _Shapes.createLabel, { x: x, y: y, textAnchor: 'middle', class: ColorPicker.label, text: label });
	      (0, _Builder.updateElementFor)(theController, 'area', _Shapes.createRect, { width: width, height: height, class: _Controller2.default.area });
	      return theController;
	    }

	    /**
	     * [renderColorInto description]
	     * @param  {[type]} theElement [description]
	     * @param  {[type]} theParams  [description]
	     * @return [type]              [description]
	     */

	  }, {
	    key: 'renderColorInto',
	    value: function renderColorInto(theElement, theParams) {
	      var _theParams$hue2 = theParams.hue,
	          hue = _theParams$hue2 === undefined ? [255, 255, 255, 255] : _theParams$hue2,
	          _theParams$width2 = theParams.width,
	          width = _theParams$width2 === undefined ? 200 : _theParams$width2,
	          _theParams$height2 = theParams.height,
	          height = _theParams$height2 === undefined ? 100 : _theParams$height2,
	          _theParams$spacing2 = theParams.spacing,
	          spacing = _theParams$spacing2 === undefined ? 10 : _theParams$spacing2;


	      var ctx = theElement.getContext("2d");
	      ctx.beginPath();
	      ctx.rect(0, 0, width, height);
	      ctx.fillStyle = ColorPicker.toRgba([255, 255, 255, 0.5]);
	      ctx.fill();

	      ctx.beginPath();
	      ctx.rect(0, 0, spacing, height);
	      var spectrum = ctx.createLinearGradient(0, 0, 0, height);
	      spectrum.addColorStop(0.00, ColorPicker.toRgba([255, 0, 0, 1]));
	      spectrum.addColorStop(0.17, ColorPicker.toRgba([255, 255, 0, 1]));
	      spectrum.addColorStop(0.34, ColorPicker.toRgba([0, 255, 0, 1]));
	      spectrum.addColorStop(0.51, ColorPicker.toRgba([0, 255, 255, 1]));
	      spectrum.addColorStop(0.68, ColorPicker.toRgba([0, 0, 255, 1]));
	      spectrum.addColorStop(0.85, ColorPicker.toRgba([255, 0, 255, 1]));
	      spectrum.addColorStop(1.00, ColorPicker.toRgba([255, 0, 0, 1]));
	      ctx.fillStyle = spectrum;
	      ctx.fill();

	      ctx.fillStyle = ColorPicker.toRgba(hue);
	      ctx.fillRect(spacing, 0, width, height);

	      var white = ctx.createLinearGradient(spacing, 0, width, 0);
	      white.addColorStop(0, ColorPicker.toRgba([255, 255, 255, 1]));
	      white.addColorStop(1, ColorPicker.toRgba([255, 255, 255, 0]));
	      ctx.fillStyle = white;
	      ctx.fillRect(spacing, 0, width, height);

	      var black = ctx.createLinearGradient(spacing, 0, spacing, height);
	      black.addColorStop(0, ColorPicker.toRgba([0, 0, 0, 0]));
	      black.addColorStop(1, ColorPicker.toRgba([0, 0, 0, 1]));
	      ctx.fillStyle = black;
	      ctx.fillRect(spacing, 0, width, height);
	      return ctx;
	    }
	  }, {
	    key: 'toRgba',
	    value: function toRgba(theColor) {
	      return 'rgba(' + theColor[0] + ', ' + theColor[1] + ', ' + theColor[2] + ', ' + theColor[3] + ')';
	    }
	  }]);

	  return ColorPicker;
	}();

	ColorPicker.normal = 'colorPicker bg';
	ColorPicker.hover = 'colorPicker fg';
	ColorPicker.active = 'colorPicker active';
	ColorPicker.label = 'colorPicker label';

	exports.default = ColorPicker;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* TODO */


	var _Events = __webpack_require__(5);

	var _Events2 = _interopRequireDefault(_Events);

	var _Common = __webpack_require__(3);

	var _Common2 = _interopRequireDefault(_Common);

	var _Controller = __webpack_require__(4);

	var _Controller2 = _interopRequireDefault(_Controller);

	var _Shapes = __webpack_require__(7);

	var _Builder = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Knob = function () {
	  function Knob() {
	    _classCallCheck(this, Knob);
	  }

	  _createClass(Knob, null, [{
	    key: 'create',
	    value: function create(theBuilder, theId, theParams) {
	      /* 1. configure default parameters first */
	      var _theParams$value = theParams.value,
	          value = _theParams$value === undefined ? [] : _theParams$value,
	          _theParams$x = theParams.x,
	          x = _theParams$x === undefined ? 0 : _theParams$x,
	          _theParams$y = theParams.y,
	          y = _theParams$y === undefined ? 0 : _theParams$y,
	          _theParams$radius = theParams.radius,
	          radius = _theParams$radius === undefined ? 20 : _theParams$radius;

	      /* 2. create a new controller of type slider */

	      var controller = theBuilder.createControllerFor(theId, this.name);

	      /* 3. now set the state for the slider */
	      controller.setState(_Common2.default.merge({ value: value, radius: radius, x: x, y: y, r: r }, theParams)).setParent(theBuilder.root()).build();

	      /* 4. finally return the newly created controller */
	      return controller;
	    }
	  }, {
	    key: 'update',
	    value: function update(theController, theParams) {
	      var radius = theParams.radius,
	          label = theParams.label,
	          value = theParams.value;

	      (0, _Builder.updateElementFor)(theController, 'bg', _Shapes.createCircle, { radius: radius, class: Knob.normal, rx: rx, ry: ry });
	      (0, _Builder.updateElementFor)(theController, 'fg', createArc, { radius: radius, value: value, class: Knob.hover });
	      (0, _Builder.updateElementFor)(theController, 'area', _Shapes.createRect, { width: radius * 2, height: radius * 2, class: _Controller2.default.area });
	      return theController;
	    }
	  }]);

	  return Knob;
	}();

	Knob.normal = 'knob bg';
	Knob.hover = 'knob fg';
	Knob.active = 'knob active';
	Knob.label = 'knob label';

	exports.default = Knob;

/***/ },
/* 14 */
/***/ function(module, exports) {

	/* TODO */
	"use strict";

/***/ },
/* 15 */
/***/ function(module, exports) {

	/* TODO */
	"use strict";

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Events = __webpack_require__(5);

	var _Events2 = _interopRequireDefault(_Events);

	var _Common = __webpack_require__(3);

	var _Common2 = _interopRequireDefault(_Common);

	var _Controller = __webpack_require__(4);

	var _Controller2 = _interopRequireDefault(_Controller);

	var _Shapes = __webpack_require__(7);

	var _Builder = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Range = function () {
	  function Range() {
	    _classCallCheck(this, Range);
	  }

	  _createClass(Range, null, [{
	    key: 'create',


	    /**
	     * [create description]
	     * @param  {[type]} theBuilder  [description]
	     * @param  {[type]} theId       [description]
	     * @param  {[type]} theParams   [description]
	     * @return [type]               [description]
	     */
	    value: function create(theBuilder, theId, theParams) {
	      /* 1. configure default parameters first */
	      var _theParams$value = theParams.value,
	          value = _theParams$value === undefined ? { min: 0.25, max: 0.75 } : _theParams$value,
	          _theParams$min = theParams.min,
	          min = _theParams$min === undefined ? 0 : _theParams$min,
	          _theParams$max = theParams.max,
	          max = _theParams$max === undefined ? 1 : _theParams$max,
	          _theParams$x = theParams.x,
	          x = _theParams$x === undefined ? 0 : _theParams$x,
	          _theParams$y = theParams.y,
	          y = _theParams$y === undefined ? 0 : _theParams$y,
	          _theParams$r = theParams.r,
	          r = _theParams$r === undefined ? 0 : _theParams$r,
	          _theParams$width = theParams.width,
	          width = _theParams$width === undefined ? 100 : _theParams$width,
	          _theParams$height = theParams.height,
	          height = _theParams$height === undefined ? 20 : _theParams$height,
	          _theParams$handleWidt = theParams.handleWidth,
	          handleWidth = _theParams$handleWidt === undefined ? 10 : _theParams$handleWidt;

	      /* 2. create a new controller of type slider */

	      var controller = theBuilder.createControllerFor(theId, this.name);

	      /* 3. now set the state for the range, order matters! see mouseDown.
	       * startDrag needs to be called before RangeDown so that dragTarget gets initialized. */
	      controller.setState(_Common2.default.merge({ value: value, min: min, max: max, width: width, height: height, handleWidth: handleWidth, x: x, y: y, r: r }, theParams)).addEventFor(_Events2.default.wheel, { rangeDrag: { get: 'deltaY' } }).addEventFor(_Events2.default.mouseDown, { startDrag: { then: 'rangeDrag', get: 'movementX' }, rangeDown: {} }).addEventFor(_Events2.default.mouseEnter, { hover: { is: true } }).addEventFor(_Events2.default.mouseLeave, { hover: { is: false } }).setParent(theBuilder.root()).build();

	      /* 4. finally return the newly created controller */
	      return controller;
	    }

	    /**
	     * [build description]
	     * @param  {[type]} theController [description]
	     * @param  {[type]} theParams     [description]
	     * @return [type]                 [description]
	     */

	  }, {
	    key: 'update',
	    value: function update(theController, theParams) {
	      var width = theParams.width,
	          height = theParams.height,
	          label = theParams.label,
	          value = theParams.value,
	          min = theParams.min,
	          max = theParams.max,
	          hover = theParams.hover,
	          handleWidth = theParams.handleWidth;

	      var v0 = _Common2.default.mapValue(value.min, min, max, handleWidth, width - handleWidth);
	      var v1 = _Common2.default.mapValue(value.max, min, max, handleWidth, width - handleWidth);
	      var w0 = v1 - v0;
	      var valueMin = value.min.toFixed(2);
	      var valueMax = value.max.toFixed(2);
	      var c0 = hover ? Range.active : Range.hover;
	      var spacing = 4;
	      (0, _Builder.updateElementFor)(theController, 'bg', _Shapes.createRect, { width: width, height: height, class: Range.normal });
	      (0, _Builder.updateElementFor)(theController, 'fg', _Shapes.createRect, { x: v0, width: w0, height: height, class: c0 });
	      (0, _Builder.updateElementFor)(theController, 'min', _Shapes.createRect, { x: v0 - handleWidth, width: handleWidth, height: height, class: Range.hover });
	      (0, _Builder.updateElementFor)(theController, 'max', _Shapes.createRect, { x: v1, width: handleWidth, height: height, class: Range.hover });
	      (0, _Builder.updateElementFor)(theController, 'label', _Shapes.createLabel, { x: width + spacing, y: height / 2, 'text-anchor': 'start', class: Range.label, text: label });
	      (0, _Builder.updateElementFor)(theController, 'labelMin', _Shapes.createLabel, { x: spacing, y: height / 2, 'text-anchor': 'start', class: Range.label, text: valueMin });
	      (0, _Builder.updateElementFor)(theController, 'labelMax', _Shapes.createLabel, { x: width - spacing, y: height / 2, 'text-anchor': 'end', class: Range.label, text: valueMax });
	      (0, _Builder.updateElementFor)(theController, 'area', _Shapes.createRect, { width: width, height: height, class: _Controller2.default.area });
	      return theController;
	    }
	  }]);

	  return Range;
	}();

	Range.normal = 'range bg';
	Range.hover = 'range fg';
	Range.active = 'range active';
	Range.label = 'range label';

	exports.default = Range;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Events = __webpack_require__(5);

	var _Events2 = _interopRequireDefault(_Events);

	var _Common = __webpack_require__(3);

	var _Common2 = _interopRequireDefault(_Common);

	var _Controller = __webpack_require__(4);

	var _Controller2 = _interopRequireDefault(_Controller);

	var _Builder = __webpack_require__(2);

	var _Builder2 = _interopRequireDefault(_Builder);

	var _Shapes = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Slider = function () {
	  function Slider() {
	    _classCallCheck(this, Slider);
	  }

	  _createClass(Slider, null, [{
	    key: 'create',


	    /**
	     * [create description]
	     * @param  {[type]} theBuilder  [description]
	     * @param  {[type]} theId       [description]
	     * @param  {[type]} theParams   [description]
	     * @return [type]               [description]
	     */
	    value: function create(theBuilder, theId, theParams) {

	      /* 1. configure default parameters first */
	      var _theParams$value = theParams.value,
	          value = _theParams$value === undefined ? 0.5 : _theParams$value,
	          _theParams$min = theParams.min,
	          min = _theParams$min === undefined ? 0 : _theParams$min,
	          _theParams$max = theParams.max,
	          max = _theParams$max === undefined ? 1 : _theParams$max,
	          _theParams$x = theParams.x,
	          x = _theParams$x === undefined ? 0 : _theParams$x,
	          _theParams$y = theParams.y,
	          y = _theParams$y === undefined ? 0 : _theParams$y,
	          _theParams$r = theParams.r,
	          r = _theParams$r === undefined ? 0 : _theParams$r,
	          _theParams$width = theParams.width,
	          width = _theParams$width === undefined ? 100 : _theParams$width,
	          _theParams$height = theParams.height,
	          height = _theParams$height === undefined ? 20 : _theParams$height;

	      /* 2. create a new controller of type slider */

	      var controller = theBuilder.createControllerFor(theId, this.name);

	      /* 3. now set the state for the slider */
	      controller.setState(_Common2.default.merge({ value: value, min: min, max: max, width: width, height: height, x: x, y: y, r: r }, theParams)).addEventFor(_Events2.default.wheel, { sliderDrag: { get: 'deltaY' } }).addEventFor(_Events2.default.mouseDown, { startDrag: { then: 'sliderDrag', get: 'movementX' }, sliderDown: {} }).addEventFor(_Events2.default.mouseEnter, { hover: { is: true } }).addEventFor(_Events2.default.mouseLeave, { hover: { is: false } }).setParent(theBuilder.root()).build();

	      /* 4. finally return the newly created controller */
	      return controller;
	    }

	    /**
	     * [build description]
	     * @param  {[type]} theController [description]
	     * @param  {[type]} theParams     [description]
	     * @return [type]                 [description]
	     */

	  }, {
	    key: 'update',
	    value: function update(theController, theParams) {
	      var width = theParams.width,
	          height = theParams.height,
	          label = theParams.label,
	          min = theParams.min,
	          max = theParams.max,
	          value = theParams.value,
	          hover = theParams.hover;

	      var v0 = _Common2.default.constrainValue(value, min, max);
	      var v1 = _Common2.default.mapValue(v0, min, max, 0, width);
	      var v2 = v0.toFixed(2);
	      var c0 = hover ? Slider.active : Slider.hover;
	      var spacing = 4;
	      (0, _Builder.updateElementFor)(theController, 'bg', _Shapes.createRect, { width: width, height: height, class: Slider.normal });
	      (0, _Builder.updateElementFor)(theController, 'fg', _Shapes.createRect, { width: v1, height: height, class: c0 });
	      (0, _Builder.updateElementFor)(theController, 'label', _Shapes.createLabel, { x: width + spacing, y: height / 2, 'text-anchor': 'start', class: Slider.label, text: label });
	      (0, _Builder.updateElementFor)(theController, 'value', _Shapes.createLabel, { x: spacing, y: height / 2, 'text-anchor': 'start', class: Slider.label, text: v2 });
	      (0, _Builder.updateElementFor)(theController, 'area', _Shapes.createRect, { width: width, height: height, class: _Controller2.default.area });
	      return theController;
	    }
	  }]);

	  return Slider;
	}();

	Slider.normal = 'slider bg';
	Slider.hover = 'slider fg';
	Slider.active = 'slider active';
	Slider.label = 'slider label';
	Slider.icon = 'slider icon';

	exports.default = Slider;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Events = __webpack_require__(5);

	var _Events2 = _interopRequireDefault(_Events);

	var _Common = __webpack_require__(3);

	var _Common2 = _interopRequireDefault(_Common);

	var _Controller = __webpack_require__(4);

	var _Controller2 = _interopRequireDefault(_Controller);

	var _Shapes = __webpack_require__(7);

	var _Builder = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TextField = function () {
	  function TextField() {
	    _classCallCheck(this, TextField);
	  }

	  _createClass(TextField, null, [{
	    key: 'create',


	    /**
	     * [create description]
	     * @param  {[type]} theBuilder  [description]
	     * @param  {[type]} theId       [description]
	     * @param  {[type]} theParams   [description]
	     * @return [type]               [description]
	     */
	    value: function create(theBuilder, theId, theParams) {
	      /* set default parameters*/
	      var _theParams$value = theParams.value,
	          value = _theParams$value === undefined ? 1 : _theParams$value,
	          _theParams$x = theParams.x,
	          x = _theParams$x === undefined ? 0 : _theParams$x,
	          _theParams$y = theParams.y,
	          y = _theParams$y === undefined ? 0 : _theParams$y,
	          _theParams$r = theParams.r,
	          r = _theParams$r === undefined ? 0 : _theParams$r,
	          _theParams$width = theParams.width,
	          width = _theParams$width === undefined ? 100 : _theParams$width,
	          _theParams$height = theParams.height,
	          height = _theParams$height === undefined ? 20 : _theParams$height;
	      /* create a Controller object */

	      var controller = theBuilder.createControllerFor(theId, this.name);
	      /* assign input specific events */
	      var input = function input() {
	        var div = controller.getElement('input').childNodes[0].childNodes[0]; /* FIXME: optimize */
	        div.setAttribute('contenteditable', true);
	        div.onkeypress = function (event) {
	          if (event.charCode === 13) div.blur();console.log(div.innerHTML);
	        };
	        return div;
	      };
	      /* build the controller */
	      controller.setState(_Common2.default.merge({ value: value, width: width, height: height, x: x, y: y, r: r }, theParams)).addEventFor(_Events2.default.focus, { call: { fn: function fn() {
	            input().focus();
	          } } }).addEventFor(_Events2.default.mouseEnter, { hover: { is: true } }).addEventFor(_Events2.default.mouseLeave, { hover: { is: false } }).setParent(theBuilder.root()).build();
	      /* after building is completed, return the controller */
	      return controller;
	    }

	    /**
	     * A controller is updated when changes are made
	     * @param  {Controller} theController [description]
	     * @param  {Object} theParams         [description]
	     * @return Controller                 [description]
	     */

	  }, {
	    key: 'update',
	    value: function update(theController, theParams) {
	      var width = theParams.width,
	          height = theParams.height,
	          text = theParams.label,
	          hover = theParams.hover,
	          _theParams$rx = theParams.rx,
	          rx = _theParams$rx === undefined ? 0 : _theParams$rx,
	          _theParams$ry = theParams.ry,
	          ry = _theParams$ry === undefined ? 0 : _theParams$ry;

	      var c0 = hover ? TextField.active : TextField.hover;
	      (0, _Builder.updateElementFor)(theController, 'bg', _Shapes.createRect, { width: width, height: height, class: TextField.normal, rx: rx, ry: ry });
	      (0, _Builder.updateElementFor)(theController, 'baseline', _Shapes.createRect, { width: width, height: 2, y: height - 2, class: c0, rx: rx, ry: ry });
	      (0, _Builder.updateElementFor)(theController, 'input', _Shapes.createInput, { width: width, height: height, class: TextField.label });
	      (0, _Builder.updateElementFor)(theController, 'label', _Shapes.createLabel, { x: width + 4, y: height / 2, textAnchor: 'start', alignmentBaseline: 'central', class: TextField.label, text: text });
	      (0, _Builder.updateElementFor)(theController, 'area', _Shapes.createRect, { width: width, height: height, class: _Controller2.default.area });
	      return theController;
	    }
	  }]);

	  return TextField;
	}();

	TextField.normal = 'textField bg';
	TextField.hover = 'textField fg';
	TextField.active = 'textField active';
	TextField.label = 'textField label';

	exports.default = TextField;

/***/ },
/* 19 */
/***/ function(module, exports) {

	/* TODO */
	"use strict";

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Events = __webpack_require__(5);

	var _Events2 = _interopRequireDefault(_Events);

	var _Common = __webpack_require__(3);

	var _Common2 = _interopRequireDefault(_Common);

	var _Controller = __webpack_require__(4);

	var _Controller2 = _interopRequireDefault(_Controller);

	var _Shapes = __webpack_require__(7);

	var _Builder = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Toggle = function () {
	  function Toggle() {
	    _classCallCheck(this, Toggle);
	  }

	  _createClass(Toggle, null, [{
	    key: 'create',


	    /**
	     * [create description]
	     * @param  {[type]} theBuilder  [description]
	     * @param  {[type]} theId       [description]
	     * @param  {[type]} theParams   [description]
	     * @return [type]               [description]
	     */
	    value: function create(theBuilder, theId, theParams) {

	      /* 1. configure default parameters first */
	      var _theParams$value = theParams.value,
	          value = _theParams$value === undefined ? false : _theParams$value,
	          _theParams$x = theParams.x,
	          x = _theParams$x === undefined ? 0 : _theParams$x,
	          _theParams$y = theParams.y,
	          y = _theParams$y === undefined ? 0 : _theParams$y,
	          _theParams$r = theParams.r,
	          r = _theParams$r === undefined ? 0 : _theParams$r,
	          _theParams$width = theParams.width,
	          width = _theParams$width === undefined ? 20 : _theParams$width,
	          _theParams$height = theParams.height,
	          height = _theParams$height === undefined ? 20 : _theParams$height;

	      /* 2. create a new controller of type slider */

	      var controller = theBuilder.createControllerFor(theId, this.name);

	      /* 3. now set the state for the slider */
	      controller.setState(_Common2.default.merge({ value: value, width: width, height: height, x: x, y: y, r: r }, theParams)).addEventFor(_Events2.default.click, { call: { fn: function fn(e, c, p) {
	            e.base().change(c.id, { value: !controller.getValue() });
	          } } }).addEventFor(_Events2.default.focus, { call: { fn: function fn(e, c, p) {
	            e.base().change(c.id, { focus: true });
	          } } }).addEventFor(_Events2.default.blur, { call: { fn: function fn(e, c, p) {
	            e.base().change(c.id, { focus: false });
	          } } }).setParent(theBuilder.root()).build();

	      /* 4. finally return the newly created controller */
	      return controller;
	    }

	    /**
	     * [build description]
	     * @param  {[type]} theController [description]
	     * @param  {[type]} theParams     [description]
	     * @return [type]                 [description]
	     */

	  }, {
	    key: 'update',
	    value: function update(theController, theParams) {
	      var value = theParams.value,
	          width = theParams.width,
	          height = theParams.height,
	          _theParams$label = theParams.label,
	          label = _theParams$label === undefined ? '' : _theParams$label,
	          option = theParams.option,
	          _theParams$rx = theParams.rx,
	          rx = _theParams$rx === undefined ? 4 : _theParams$rx,
	          _theParams$ry = theParams.ry,
	          ry = _theParams$ry === undefined ? 4 : _theParams$ry,
	          icon = theParams.icon;

	      var isLabel = true;
	      var c0 = value ? Toggle.active : Toggle.normal;
	      switch (option) {
	        case 'block':
	          {
	            (0, _Builder.updateElementFor)(theController, 'bg', _Shapes.createRect, { width: width, height: height, class: Toggle.normal });
	            (0, _Builder.updateElementFor)(theController, 'fg', _Shapes.createRect, { x: value ? width / 2 : 0, width: width / 2, height: height, class: c0 });
	            (0, _Builder.updateElementFor)(theController, 'label', _Shapes.createLabel, { x: width + 4, y: height / 2, class: Toggle.label, text: label });
	          }
	          break;
	        case 'circular':
	          {
	            var n = 2;
	            var r = height / 2;
	            var _c = value ? Toggle.active : Toggle.hover;
	            (0, _Builder.updateElementFor)(theController, 'bg', _Shapes.createRect, { rx: r, ry: r, width: width, height: height, class: Toggle.normal });
	            (0, _Builder.updateElementFor)(theController, 'fg', _Shapes.createCircle, { r: r - n, cx: value ? width - r : r, cy: r, class: _c });
	            (0, _Builder.updateElementFor)(theController, 'label', _Shapes.createLabel, { x: width + 4, y: height / 2, class: Toggle.label, text: label });
	          }
	          break;
	        case 'icon':
	          {
	            isLabel = false;
	            (0, _Builder.updateElementFor)(theController, 'bg', _Shapes.createRect, { rx: rx, ry: ry, width: width, height: height, class: c0 });
	            (0, _Builder.updateElementFor)(theController, 'icon', _Shapes.createLabel, { x: width / 2, y: height / 2, textAnchor: 'middle', class: Toggle.icon, text: icon });
	          }
	          break;
	        default:
	          {
	            (0, _Builder.updateElementFor)(theController, 'bg', _Shapes.createRect, { width: width, height: height, class: c0 });
	          }
	      }
	      if (isLabel) (0, _Builder.updateElementFor)(theController, 'label', _Shapes.createLabel, { x: width + 4, y: height / 2, class: Toggle.label, text: label });
	      (0, _Builder.updateElementFor)(theController, 'area', _Shapes.createRect, { width: width, height: height, class: _Controller2.default.area });
	      return theController;
	    }
	  }]);

	  return Toggle;
	}();

	Toggle.normal = 'toggle bg';
	Toggle.hover = 'toggle fg';
	Toggle.active = 'toggle active';
	Toggle.label = 'toggle label';
	Toggle.icon = 'toggle icon';

	exports.default = Toggle;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Common = __webpack_require__(3);

	var _Common2 = _interopRequireDefault(_Common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	  * @classdesc
	  */
	var Observer = function () {

	  /* https://developer.mozilla.org/en/docs/Web/API/MutationObserver */

	  /**
	    * @constructor
	    */
	  function Observer() {
	    _classCallCheck(this, Observer);

	    /* observer function */
	    this.observer = new MutationObserver(function (mutations) {
	      mutations.map(function (mutation) {
	        console.log(">", mutation.attributeName);
	        switch (mutation.attributeName) {
	          case 'x':
	            var x = _Common2.default.i(Math.random() * 100, 0);
	            mutation.target.setAttribute('transform', 'translate(' + x + ', 0)');
	            break;
	        }
	        return mutation;
	      });
	    });

	    /* configuration of the observer */
	    this.config = { attributes: true, childList: true, characterData: true };
	  }

	  _createClass(Observer, [{
	    key: 'observe',
	    value: function observe(theTarget) {
	      this.observer.observe(theTarget, this.config);
	    }
	  }]);

	  return Observer;
	}();

	exports.default = Observer;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	  * @classdesc
	  */
	var Styles =

	/**
	  * @constructor
	  */

	/* FIXME: careful! should only be called once.
	 * otherwise each ControlPanel will add the style again.
	 * maybe add to main.js? */
	function Styles() {
	  _classCallCheck(this, Styles);

	  var fonts = ['libraries/assets/styles.css', 'http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'];
	  fonts.forEach(function (font) {
	    var styles = document.createElement('link');
	    styles.rel = 'stylesheet';
	    styles.type = 'text/css';
	    styles.media = 'screen';
	    styles.href = font;
	    document.getElementsByTagName('head')[0].appendChild(styles);
	  });
	};

	exports.default = Styles;

/***/ }
/******/ ]);