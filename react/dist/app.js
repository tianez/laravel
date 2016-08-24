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

	__webpack_require__(6);

	__webpack_require__(11);
	/**
	 * 路由
	 */

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var IndexRoute = _ReactRouter.IndexRoute;
	var IndexRedirect = _ReactRouter.IndexRedirect;
	var Redirect = _ReactRouter.Redirect;
	var hashHistory = _ReactRouter.hashHistory;
	var browserHistory = _ReactRouter.browserHistory;

	var _require = __webpack_require__(22);

	var Layout = _require.Layout;
	var Nomatch = _require.Nomatch;
	var Home = _require.Home;
	var Post = _require.Post;
	var Post2 = _require.Post2;
	var Weui = _require.Weui;


	function onEnter(nextState, replace) {
	    var pathname = nextState.location.pathname;
	    var user = storedb('user').find() ? true : false;
	    // console.log(storedb('user').find());
	    if (!user && pathname !== 'login' && pathname !== '/login') {
	        ConfigActions.update('msg', '你还没有登录，请先登录！');
	        replace({
	            pathname: '/login'
	        });
	    } else if (user && (pathname == 'login' || pathname == '/login')) {
	        replace({
	            pathname: '/'
	        });
	    }
	}

	var routers = React.createElement(Router, { history: hashHistory }, React.createElement(Route, { path: "/", component: Layout }, React.createElement(IndexRoute, { component: Home }), React.createElement(Route, { path: "post", component: Post }), React.createElement(Route, { path: "post2", component: Post2 }), React.createElement(Route, { path: "weui", component: Weui }), React.createElement(Route, { path: "*", component: Nomatch })));

	ReactDOM.render(routers, document.getElementById('app'));

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * action
	 */

	window.ConfigActions = __webpack_require__(12);

	/**
	 * store
	 */
	window.ConfigStore = __webpack_require__(18);

	__webpack_require__(21);

	window.Reloaded = function () {
	    ConfigActions.update('loaded', true);
	};

	//获取url参数数组
	window.get = function (url) {
	    if (!url) {
	        var url = window.document.location.href.toString();
	    }
	    var u = url.split("?");
	    if (typeof u[1] == "string") {
	        u = u[1].split("&");
	        var get = {};
	        for (var i in u) {
	            var j = u[i].split("=");
	            get[j[0]] = j[1];
	        }
	        return get;
	    } else {
	        return {};
	    }
	};

	//2个对象合并
	window.extend = function (o, n, override) {
	    for (var p in n) {
	        if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override)) o[p] = n[p];
	    }
	};

	window.GetRequest = function GetRequest() {
	    var url = location.search; //获取url中"?"符后的字串
	    var theRequest = new Object();
	    if (url.indexOf("?") != -1) {
	        var str = url.substr(1);
	        strs = str.split("&");
	        for (var i = 0; i < strs.length; i++) {
	            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
	        }
	    }
	    return theRequest;
	};

	// 屏幕旋转
	window.onorientationchange = function () {
	    switch (window.orientation) {
	        case -90:
	        case 90:
	            alert("横屏:" + window.orientation);
	        case 0:
	        case 180:
	            alert("竖屏:" + window.orientation);
	            break;
	    }
	};

	// audio元素和video元素在ios和andriod中无法自动播放
	// 应对方案：触屏即播
	// $('html').one('touchstart', function() {
	//     audio.play()
	// })

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(13);

	var ConfigActions = {

	    init: function init(data) {
	        AppDispatcher.dispatch({
	            actionType: 'init',
	            data: data
	        });
	    },

	    update: function update(id, data) {
	        AppDispatcher.dispatch({
	            id: id,
	            data: data
	        });
	    },
	    updateAll: function updateAll(data) {
	        AppDispatcher.dispatch({
	            actionType: 'updateAll',
	            data: data
	        });
	    },
	    updateArticle: function updateArticle(data) {
	        AppDispatcher.dispatch({
	            actionType: 'updateArticle',
	            data: data
	        });
	    }
	};

	module.exports = ConfigActions;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * AppDispatcher
	 *
	 * A singleton that operates as the central hub for application updates.
	 */

	var Dispatcher = __webpack_require__(14).Dispatcher;

	module.exports = new Dispatcher();

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	module.exports.Dispatcher = __webpack_require__(15);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * 
	 * @preventMunge
	 */

	'use strict';

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var invariant = __webpack_require__(17);

	var _prefix = 'ID_';

	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *         case 'city-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */

	var Dispatcher = function () {
	  function Dispatcher() {
	    _classCallCheck(this, Dispatcher);

	    this._callbacks = {};
	    this._isDispatching = false;
	    this._isHandled = {};
	    this._isPending = {};
	    this._lastID = 1;
	  }

	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   */

	  Dispatcher.prototype.register = function register(callback) {
	    var id = _prefix + this._lastID++;
	    this._callbacks[id] = callback;
	    return id;
	  };

	  /**
	   * Removes a callback based on its token.
	   */

	  Dispatcher.prototype.unregister = function unregister(id) {
	    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	    delete this._callbacks[id];
	  };

	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   */

	  Dispatcher.prototype.waitFor = function waitFor(ids) {
	    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this._isPending[id]) {
	        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
	        continue;
	      }
	      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	      this._invokeCallback(id);
	    }
	  };

	  /**
	   * Dispatches a payload to all registered callbacks.
	   */

	  Dispatcher.prototype.dispatch = function dispatch(payload) {
	    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
	    this._startDispatching(payload);
	    try {
	      for (var id in this._callbacks) {
	        if (this._isPending[id]) {
	          continue;
	        }
	        this._invokeCallback(id);
	      }
	    } finally {
	      this._stopDispatching();
	    }
	  };

	  /**
	   * Is this Dispatcher currently dispatching.
	   */

	  Dispatcher.prototype.isDispatching = function isDispatching() {
	    return this._isDispatching;
	  };

	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
	    this._isPending[id] = true;
	    this._callbacks[id](this._pendingPayload);
	    this._isHandled[id] = true;
	  };

	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
	    for (var id in this._callbacks) {
	      this._isPending[id] = false;
	      this._isHandled[id] = false;
	    }
	    this._pendingPayload = payload;
	    this._isDispatching = true;
	  };

	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
	    delete this._pendingPayload;
	    this._isDispatching = false;
	  };

	  return Dispatcher;
	}();

	module.exports = Dispatcher;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function cachedSetTimeout() {
	            throw new Error('setTimeout is not defined');
	        };
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function cachedClearTimeout() {
	            throw new Error('clearTimeout is not defined');
	        };
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(13);
	var EventEmitter = __webpack_require__(19).EventEmitter;
	var assign = __webpack_require__(20);

	var CHANGE_EVENT = 'change';

	var _todos = {
	    title: '王的理想乡',
	    loaded: true, //下拉刷新
	    alert: {
	        show: false
	    },
	    toast: {
	        show: false
	    }
	};

	var ConfigStore = assign({}, EventEmitter.prototype, {

	    getAll: function getAll() {
	        return _todos;
	    },

	    get: function get(id) {
	        return _todos[id];
	    },

	    getMsg: function getMsg() {
	        var msg = _todos['msg'];
	        if (_todos['msg'] != '') {
	            _todos['msg'] = '';
	        }
	        return msg;
	    },

	    emitChange: function emitChange() {
	        this.emit(CHANGE_EVENT);
	    },

	    /**
	     * @param {function} callback
	     */
	    addChangeListener: function addChangeListener(callback) {
	        this.on(CHANGE_EVENT, callback);
	    },

	    /**
	     * @param {function} callback
	     */
	    removeChangeListener: function removeChangeListener(callback) {
	        this.removeListener(CHANGE_EVENT, callback);
	    }
	});

	module.exports = ConfigStore;

	// Register callback to handle all updates
	AppDispatcher.register(function (action) {
	    var data = action.data;
	    if (_todos[action.id] == data) {
	        return;
	    }
	    switch (action.actionType) {
	        case 'updateAll':
	            for (var key in data) {
	                update(key, data[key]);
	            }
	            break;
	        case 'updateArticle':
	            update(data.id, data);
	            update('title', data.title);
	            break;
	        default:
	            update(action.id, action.data);

	    }
	    ConfigStore.emitChange();
	});

	function update(id, data) {
	    _todos[id] = data;
	}

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function (n) {
	  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function (type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events) this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler)) return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++) {
	      listeners[i].apply(this, args);
	    }
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function (type, listener) {
	  var m;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events) this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function (type, listener) {
	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function (type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type]) return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener || isFunction(list.listener) && list.listener === listener) {
	    delete this._events[type];
	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0) return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function (type) {
	  var key, listeners;

	  if (!this._events) return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length) {
	      this.removeListener(type, listeners[listeners.length - 1]);
	    }
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function (type) {
	  var ret;
	  if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function (type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function (emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc'); // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	window.alert = function (msg) {
	    if (!msg) {
	        msg = [];
	    }
	    msg['show'] = true;
	    ConfigActions.update('alert', msg);
	};

	window.toast = function () {
	    ConfigActions.update('toast', { show: true });
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Layout = __webpack_require__(23);
	var Nomatch = __webpack_require__(53);
	var Home = __webpack_require__(54);
	var Post = __webpack_require__(55);
	var Post2 = __webpack_require__(61);

	var Temp = {
	    Layout: Layout,
	    Nomatch: Nomatch,
	    Home: Home,
	    Post: Post,
	    Post2: Post2,
	    Weui: __webpack_require__(62)
	};
	module.exports = Temp;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter;
	var Link = _ReactRouter.Link;

	var _require = __webpack_require__(24);

	var Header = _require.Header;
	var Content = _require.Content;
	var Footer = _require.Footer;
	var Reload = _require.Reload;

	var _require2 = __webpack_require__(29);

	var Alert = _require2.Alert;
	var Toast = _require2.Toast;

	var Layout = function (_React$Component) {
	    _inherits(Layout, _React$Component);

	    function Layout() {
	        _classCallCheck(this, Layout);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Layout).call(this));
	    }

	    _createClass(Layout, [{
	        key: '_onChange',
	        value: function _onChange() {
	            var config = ConfigStore.getAll();
	            console.log(config);
	            window.document.title = config.title;
	            this.setState(config);
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            ConfigStore.addChangeListener(this._onChange.bind(this));
	            // setTimeout(function() {
	            //     Tip({ title: '23232', content: 'haode aadsa!' })
	            // }, 3000);
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {}
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            ConfigStore.removeChangeListener(this._onChange.bind(this));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement('div', {
	                id: 'warper'
	            }, React.createElement(Header), this.props.children, React.createElement(Footer), React.createElement(Alert, { g: true }), React.createElement(Toast));
	        }
	    }]);

	    return Layout;
	}(React.Component);

	module.exports = Layout;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Header = __webpack_require__(25);
	var Footer = __webpack_require__(28);
	var Content = __webpack_require__(51);
	var Reload = __webpack_require__(52);

	var Layout = {
	    Header: Header,
	    Footer: Footer,
	    Content: Content,
	    Reload: Reload
	};
	module.exports = Layout;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var classNames = __webpack_require__(26);

	var Header = function (_React$Component) {
	    _inherits(Header, _React$Component);

	    function Header() {
	        _classCallCheck(this, Header);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Header).call(this));
	    }

	    _createClass(Header, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement('header', {
	                id: 'header',
	                className: 'header'
	            }, React.createElement('i', {
	                className: 'fa fa-home fa-left'
	            }), React.createElement('div', {
	                className: 'title'
	            }, this.props.title));
	        }
	    }]);

	    return Header;
	}(React.Component);

	Header.defaultProps = {
	    title: '头部'
	};
	module.exports = Header;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames() {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if ("function" === 'function' && _typeof(__webpack_require__(27)) === 'object' && __webpack_require__(27)) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	})();

/***/ },
/* 27 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var classNames = __webpack_require__(26);

	var _require = __webpack_require__(29);

	var Tabbar = _require.Tabbar;

	var Footer = function (_React$Component) {
	    _inherits(Footer, _React$Component);

	    function Footer() {
	        _classCallCheck(this, Footer);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Footer).call(this));
	    }

	    _createClass(Footer, [{
	        key: 'handleSubmit',
	        value: function handleSubmit(e) {
	            e.preventDefault();
	            console.log(this.props.info);
	            if (this.props.onSubmit()) {
	                this.props.onSubmit(e);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement('footer', {
	                id: 'footer',
	                className: 'footer'
	            }, React.createElement(Tabbar));
	        }
	    }]);

	    return Footer;
	}(React.Component);

	Footer.defaultProps = {
	    title: '底部'
	};
	module.exports = Footer;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Forms = {
	    Input: __webpack_require__(30),
	    Textarea: __webpack_require__(31),
	    Checkbox: __webpack_require__(32),
	    Checkbox2: __webpack_require__(33),
	    Radio: __webpack_require__(34),
	    Select: __webpack_require__(35),
	    Select2: __webpack_require__(36),
	    Select3: __webpack_require__(37),
	    Switch: __webpack_require__(38),
	    Uploader: __webpack_require__(39),
	    Button: __webpack_require__(42),
	    Grid: __webpack_require__(43),
	    Alert: __webpack_require__(44),
	    Toast: __webpack_require__(45),
	    Navbar: __webpack_require__(46),
	    Tabbar: __webpack_require__(47),
	    Progress: __webpack_require__(48),
	    Panel: __webpack_require__(49),
	    List: __webpack_require__(50)

	};
	module.exports = Forms;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var classNames = __webpack_require__(26);

	var Input = function (_React$Component) {
	    _inherits(Input, _React$Component);

	    function Input(props) {
	        _classCallCheck(this, Input);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Input).call(this, props));

	        _this.state = {
	            help: props.help,
	            length: props.value.length || 0,
	            error: props.error
	        };
	        return _this;
	    }

	    _createClass(Input, [{
	        key: '_onChange',
	        value: function _onChange(e) {
	            var value = e.target.value;
	            if (this.props.onChange) {
	                this.props.onChange(this.props.name, value);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var error = this.state.error;

	            var ecls = classNames({
	                weui_cell: true,
	                weui_cell_warn: error
	            });
	            return React.createElement('section', {}, React.createElement('div', {
	                className: 'weui_cells_title'
	            }, ' 表单'), React.createElement('div', {
	                className: 'weui_cells weui_cells_form'
	            }, React.createElement('div', {
	                className: ecls
	            }, React.createElement('div', {
	                className: 'weui_cell_hd'
	            }, React.createElement('label', {
	                className: 'weui_label weui_cell_hd'
	            }, this.props.title)), React.createElement('div', {
	                className: 'weui_cell_bd weui_cell_primary'
	            }, React.createElement('input', {
	                className: 'weui_input',
	                type: this.props.type,
	                defaultValue: this.props.value,
	                maxLength: this.props.max ? this.props.max : null,
	                onChange: this._onChange.bind(this),
	                placeholder: this.props.placeholder
	            })), error ? React.createElement('div', {
	                className: 'weui_cell_ft'
	            }, React.createElement('i', {
	                className: 'weui_icon_warn'
	            })) : null)));
	        }
	    }]);

	    return Input;
	}(React.Component);

	Input.defaultProps = {
	    title: '项目名',
	    value: '',
	    name: 'test',
	    type: 'text',
	    placeholder: '请输入qq号',
	    error: false
	};
	module.exports = Input;

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Textarea = function (_React$Component) {
	    _inherits(Textarea, _React$Component);

	    function Textarea(props) {
	        _classCallCheck(this, Textarea);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Textarea).call(this, props));

	        _this.state = {
	            textCounter: props.value ? props.value.length : 0
	        };
	        return _this;
	    }

	    _createClass(Textarea, [{
	        key: '_onChange',
	        value: function _onChange(e) {
	            var value = e.target.value;
	            this.setState({
	                textCounter: value.length
	            });
	            if (this.props.onChange) {
	                this.props.onChange(this.props.name, value);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var title = _props.title;
	            var showCounter = _props.showCounter;
	            var max = _props.max;

	            return React.createElement('section', {}, React.createElement('div', {
	                className: 'weui_cells_title'
	            }, this.props.title), React.createElement('div', {
	                className: 'weui_cells weui_cells_form'
	            }, React.createElement('div', {
	                className: 'weui_cell'
	            }, React.createElement('div', {
	                className: 'weui_cell_bd weui_cell_primary'
	            }, React.createElement('textarea', {
	                className: 'weui_textarea',
	                rows: 3,
	                defaultValue: this.props.value,
	                maxLength: max,
	                onChange: this._onChange.bind(this),
	                placeholder: this.props.placeholder
	            }), showCounter ? React.createElement('div', {
	                className: 'weui_textarea_counter'
	            }, React.createElement('span', {}, this.state.textCounter), max ? '/' + max : null) : null))));
	        }
	    }]);

	    return Textarea;
	}(React.Component);

	Textarea.defaultProps = {
	    title: '项目名',
	    value: '',
	    name: 'textarea',
	    showCounter: true,
	    placeholder: '项目名'
	};

	module.exports = Textarea;

/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Checkbox = function (_React$Component) {
	    _inherits(Checkbox, _React$Component);

	    function Checkbox() {
	        _classCallCheck(this, Checkbox);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).call(this));
	    }

	    _createClass(Checkbox, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement('section', {}, React.createElement('div', {
	                className: 'weui_cells_title'
	            }, ' Checkbox'), React.createElement('div', {
	                className: 'weui_cells weui_cells_radio'
	            }, React.createElement('label', {
	                className: 'weui_cell weui_check_label',
	                htmlFor: 'x13'
	            }, React.createElement('div', {
	                className: 'weui_cell_bd weui_cell_primary'
	            }, React.createElement('div', {}, 'cell standard')), React.createElement('div', {
	                className: 'weui_cell_ft'
	            }, React.createElement('input', {
	                className: 'weui_check',
	                name: 'checkbox',
	                id: 'x13',
	                type: 'checkbox',
	                value: 0
	            }), React.createElement('span', {
	                className: 'weui_icon_checked'
	            }))), React.createElement('label', {
	                className: 'weui_cell weui_check_label',
	                htmlFor: 'x14'
	            }, React.createElement('div', {
	                className: 'weui_cell_bd weui_cell_primary'
	            }, React.createElement('div', {}, 'cell standard')), React.createElement('div', {
	                className: 'weui_cell_ft'
	            }, React.createElement('input', {
	                className: 'weui_check',
	                name: 'checkbox',
	                id: 'x14',
	                type: 'checkbox',
	                value: 1
	            }), React.createElement('span', {
	                className: 'weui_icon_checked'
	            })))));
	        }
	    }]);

	    return Checkbox;
	}(React.Component);

	module.exports = Checkbox;

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Checkbox2 = function (_React$Component) {
	    _inherits(Checkbox2, _React$Component);

	    function Checkbox2() {
	        _classCallCheck(this, Checkbox2);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox2).call(this));
	    }

	    _createClass(Checkbox2, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement('section', {}, React.createElement('div', {
	                className: 'weui_cells_title'
	            }, ' Checkbox'), React.createElement('div', {
	                className: 'weui_cells weui_cells_checkbox'
	            }, React.createElement('label', {
	                className: 'weui_cell weui_check_label',
	                htmlFor: 'x15'
	            }, React.createElement('div', {
	                className: 'weui_cell_hd'
	            }, React.createElement('input', {
	                className: 'weui_check',
	                name: 'checkbox2',
	                id: 'x15',
	                type: 'checkbox',
	                defaultChecked: true,
	                // checked: 'checked',
	                value: 0
	            }), React.createElement('i', {
	                className: 'weui_icon_checked'
	            })), React.createElement('div', {
	                className: 'weui_cell_bd weui_cell_primary'
	            }, React.createElement('p', {}, 'cell standard'))), React.createElement('label', {
	                className: 'weui_cell weui_check_label',
	                htmlFor: 'x16'
	            }, React.createElement('div', {
	                className: 'weui_cell_hd'
	            }, React.createElement('input', {
	                className: 'weui_check',
	                name: 'checkbox2',
	                id: 'x16',
	                type: 'checkbox',
	                value: 0
	            }), React.createElement('i', {
	                className: 'weui_icon_checked'
	            })), React.createElement('div', {
	                className: 'weui_cell_bd weui_cell_primary'
	            }, React.createElement('p', {}, 'cell standard')))));
	        }
	    }]);

	    return Checkbox2;
	}(React.Component);

	module.exports = Checkbox2;

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Radio = function (_React$Component) {
	    _inherits(Radio, _React$Component);

	    function Radio() {
	        _classCallCheck(this, Radio);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Radio).call(this));
	    }

	    _createClass(Radio, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement('section', {}, React.createElement('div', {
	                className: 'weui_cells_title'
	            }, ' radio'), React.createElement('div', {
	                className: 'weui_cells weui_cells_radio'
	            }, React.createElement('label', {
	                className: 'weui_cell weui_check_label',
	                htmlFor: 'x11'
	            }, React.createElement('div', {
	                className: 'weui_cell_bd weui_cell_primary'
	            }, React.createElement('div', {}, 'cell standard')), React.createElement('div', {
	                className: 'weui_cell_ft'
	            }, React.createElement('input', {
	                className: 'weui_check',
	                name: 'radio1',
	                id: 'x11',
	                type: 'radio',
	                defaultChecked: true,
	                value: 0
	            }), React.createElement('span', {
	                className: 'weui_icon_checked'
	            }))), React.createElement('label', {
	                className: 'weui_cell weui_check_label',
	                htmlFor: 'x12'
	            }, React.createElement('div', {
	                className: 'weui_cell_bd weui_cell_primary'
	            }, React.createElement('div', {}, 'cell standard')), React.createElement('div', {
	                className: 'weui_cell_ft'
	            }, React.createElement('input', {
	                className: 'weui_check',
	                name: 'radio1',
	                id: 'x12',
	                type: 'radio',
	                value: 1
	            }), React.createElement('span', {
	                className: 'weui_icon_checked'
	            })))));
	        }
	    }]);

	    return Radio;
	}(React.Component);

	module.exports = Radio;

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Select2 = function (_React$Component) {
	    _inherits(Select2, _React$Component);

	    function Select2() {
	        _classCallCheck(this, Select2);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Select2).call(this));
	    }

	    _createClass(Select2, [{
	        key: '_onChange',
	        value: function _onChange(e) {
	            var value = e.target.value;
	            if (this.props.onChange) {
	                this.props.onChange(this.props.name, value);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement('section', {}, React.createElement('div', {
	                className: 'weui_cells_title'
	            }, ' 选择'), React.createElement('div', {
	                className: 'weui_cells'
	            }, React.createElement('div', {
	                className: 'weui_cell weui_cell_select'
	            }, React.createElement('div', {
	                className: 'weui_cell_bd weui_cell_primary'
	            }, React.createElement('select', {
	                className: 'weui_select',
	                name: 'select',
	                defaultValue: '2',
	                onChange: this._onChange.bind(this)
	            }, React.createElement('option', {
	                value: '1'
	            }, '微信号'), React.createElement('option', {
	                value: '2'
	            }, '+85'))))));
	        }
	    }]);

	    return Select2;
	}(React.Component);

	module.exports = Select2;

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Select2 = function (_React$Component) {
	    _inherits(Select2, _React$Component);

	    function Select2() {
	        _classCallCheck(this, Select2);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Select2).call(this));
	    }

	    _createClass(Select2, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement('section', {}, React.createElement('div', {
	                className: 'weui_cells_title'
	            }, ' 选择'), React.createElement('div', {
	                className: 'weui_cells'
	            }, React.createElement('div', {
	                className: 'weui_cell weui_cell_select weui_select_before'
	            }, React.createElement('div', {
	                className: 'weui_cell_hd'
	            }, React.createElement('select', {
	                className: 'weui_select',
	                name: 'select2'
	            }, React.createElement('option', {
	                value: '1'
	            }, '+86'), React.createElement('option', {
	                value: '2'
	            }, '+85'))), React.createElement('div', {
	                className: 'weui_cell_bd weui_cell_primary'
	            }, React.createElement('input', {
	                className: 'weui_input',
	                type: 'tel',
	                placeholder: '请输入电话号码'
	            })))));
	        }
	    }]);

	    return Select2;
	}(React.Component);

	module.exports = Select2;

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Select2 = function (_React$Component) {
	    _inherits(Select2, _React$Component);

	    function Select2() {
	        _classCallCheck(this, Select2);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Select2).call(this));
	    }

	    _createClass(Select2, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement('section', {}, React.createElement('div', {
	                className: 'weui_cells_title'
	            }, ' 选择'), React.createElement('div', {
	                className: 'weui_cells'
	            }, React.createElement('div', {
	                className: 'weui_cell weui_cell_select  weui_select_after'
	            }, React.createElement('div', {
	                className: 'weui_cell_hd'
	            }, ' 国家/地区'), React.createElement('div', {
	                className: 'weui_cell_bd weui_cell_primary'
	            }, React.createElement('select', {
	                className: 'weui_select',
	                name: 'select2'
	            }, React.createElement('option', {
	                value: '1'
	            }, '+86'), React.createElement('option', {
	                value: '2'
	            }, '+85'))))));
	        }
	    }]);

	    return Select2;
	}(React.Component);

	module.exports = Select2;

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Switch = function (_React$Component) {
	    _inherits(Switch, _React$Component);

	    function Switch(props) {
	        _classCallCheck(this, Switch);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Switch).call(this, props));

	        _this.state = {
	            value: props.value
	        };
	        return _this;
	    }

	    _createClass(Switch, [{
	        key: '_onChange',
	        value: function _onChange(e) {
	            var v = void 0;
	            if (this.state.value == 'on') {
	                v = 'off';
	            } else {
	                v = 'on';
	            }
	            this.setState({
	                value: v
	            });
	            if (this.props.onChange) {
	                this.props.onChange(this.props.name, v);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement('section', {}, React.createElement('div', {
	                className: 'weui_cells_title'
	            }, ' 开关'), React.createElement('div', {
	                className: 'weui_cells weui_cells_form'
	            }, React.createElement('div', {
	                className: 'weui_cell weui_cell_switch'
	            }, React.createElement('div', {
	                className: 'weui_cell_hd weui_cell_primary'
	            }, '声音'), React.createElement('div', {
	                className: 'weui_cell_ft'
	            }, React.createElement('input', {
	                className: 'weui_switch',
	                type: 'radio',
	                name: this.props.name,
	                onChange: this._onChange.bind(this),
	                checked: this.state.value == 'on' ? true : false
	            })))));
	        }
	    }]);

	    return Switch;
	}(React.Component);

	Switch.defaultProps = {
	    value: '',
	    name: 'switch',
	    checked: false
	};

	module.exports = Switch;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ajaxUpload = __webpack_require__(40);

	var _require = __webpack_require__(41);

	var getUpToken = _require.getUpToken;

	var Uploader = function (_React$Component) {
	    _inherits(Uploader, _React$Component);

	    function Uploader() {
	        _classCallCheck(this, Uploader);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Uploader).call(this));

	        _this.state = {
	            files: [],
	            thumbs: []
	        };
	        return _this;
	    }

	    _createClass(Uploader, [{
	        key: '_onChange',
	        value: function _onChange(e) {
	            e.preventDefault();
	            var files = e.target.files;
	            // 文件过滤
	            // 只允许上传图片
	            files = Array.prototype.slice.call(files, 0);
	            files = files.filter(function (file) {
	                return (/image/i.test(file.type)
	                );
	            });
	            var value = void 0;
	            if (this.props.multiple) {
	                value = this.state.files;
	            } else {
	                value = [];
	            }
	            var count = this.props.multiple ? files.length : 1;
	            var i = void 0;
	            for (i = 0; i < count; i++) {
	                files[i].thumb = URL.createObjectURL(files[i]);
	                files[i].state = 0;
	                value = value.concat(files[i]);
	            }
	            this.setState({
	                files: value
	            });
	            var count2 = this.props.multiple ? value.length : 1;
	            for (i = 0; i < count2; i++) {
	                if (value[i].state != 1 && value[i].state != 4) {
	                    this.uploadFile(value, i);
	                }
	            }
	        }
	    }, {
	        key: 'uploadFile',
	        value: function uploadFile(files, id) {
	            var _this2 = this;

	            var qnurl = 'http://7xj11y.com1.z0.glb.clouddn.com';
	            var token = getUpToken();
	            var file = files[id];
	            return ajaxUpload({
	                url: 'http://up.qiniu.com',
	                name: 'file',
	                key: file.name,
	                token: token,
	                cors: this.props.cors,
	                withCredentials: this.props.withCredentials,
	                file: file,
	                onProgress: function onProgress(e) {
	                    console.log(e.loaded / e.total * 100 + '%');
	                },
	                onLoad: function onLoad(e) {
	                    var thumbs = void 0;
	                    var res = JSON.parse(e.currentTarget.responseText);
	                    files[id].state = 1;
	                    // file.url = qnurl + '/' + res.name
	                    if (_this2.props.multiple) {
	                        thumbs = _this2.state.thumbs;
	                    } else {
	                        thumbs = [];
	                    }
	                    thumbs.push(qnurl + '/' + res.name);
	                    _this2.setState({
	                        files: files,
	                        thumbs: thumbs
	                    });
	                    thumbs = JSON.stringify(thumbs);
	                    if (_this2.props.onChange) {
	                        _this2.props.onChange(_this2.props.name, thumbs);
	                    }
	                },
	                onError: function onError() {
	                    files[id].state = 2;
	                    _this2.setState({
	                        files: files
	                    });
	                }
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var files = this.state.files;
	            var thumbs = files.map(function (file, index) {
	                return React.createElement('li', {
	                    key: index,
	                    className: 'weui_uploader_file',
	                    style: {
	                        backgroundImage: 'url(' + file.thumb + ')'
	                    }
	                });
	            });
	            return React.createElement('section', {}, React.createElement('div', {
	                className: 'weui_cells_title'
	            }, ' 表单'), React.createElement('div', {
	                className: 'weui_cells weui_cells_form'
	            }, React.createElement('div', {
	                className: 'weui_cell'
	            }, React.createElement('div', {
	                className: 'weui_cell_bd weui_cell_primary'
	            }, React.createElement('div', {
	                className: 'weui_uploader'
	            }, React.createElement('div', {
	                className: 'weui_uploader_hd weui_cell'
	            }, React.createElement('div', {
	                className: 'weui_cell_bd weui_cell_primary'
	            }, '图片上传'), React.createElement('div', {
	                className: 'weui_cell_ft'
	            }, '0/' + files.length)), React.createElement('div', {
	                className: 'weui_uploader_bd'
	            }, React.createElement('ul', {
	                className: 'weui_uploader_files'
	            }, thumbs, React.createElement('li', {
	                className: 'weui_uploader_file',
	                style: {
	                    backgroundImage: 'url(images/app-icon.png)'
	                }
	            }), React.createElement('li', {
	                className: 'weui_uploader_file weui_uploader_status',
	                style: {
	                    backgroundImage: 'url(images/app-icon.png)'
	                }
	            }, React.createElement('div', {
	                className: 'weui_uploader_status_content'
	            }, React.createElement('i', {
	                className: 'weui_icon_warn'
	            }))), React.createElement('li', {
	                className: 'weui_uploader_file weui_uploader_status',
	                style: {
	                    backgroundImage: 'url(images/app-icon.png)'
	                }
	            }, React.createElement('div', {
	                className: 'weui_uploader_status_content'
	            }, '50%'))), React.createElement('div', {
	                className: 'weui_uploader_input_wrp'
	            }, React.createElement('input', {
	                className: 'weui_uploader_input',
	                type: 'file',
	                accept: 'image/*',
	                multiple: this.props.multiple,
	                onChange: this._onChange.bind(this)
	            }))))))));
	        }
	    }]);

	    return Uploader;
	}(React.Component);

	Uploader.defaultProps = {
	    multiple: false
	};

	module.exports = Uploader;

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';

	function createCORSRequest(method, url) {
	    var xhr = new XMLHttpRequest();
	    if ('withCredentials' in xhr) {
	        // XHR for Chrome/Firefox/Opera/Safari.
	        xhr.open(method, url, true);
	    } else if (typeof XDomainRequest !== 'undefined') {
	        // XDomainRequest for IE.
	        xhr = new XDomainRequest();
	        xhr.open(method, url);
	    } else {
	        // CORS not supported.
	        xhr = null;
	    }
	    return xhr;
	}

	// function ajaxUpload({url, name, cors, file, onProgress, onLoad, onError, withCredentials}) {
	function ajaxUpload(data) {
	    var formData = new FormData();
	    if (data.token !== null && data.token !== undefined) formData.append('token', data.token);
	    if (data.key !== null && data.key !== undefined) formData.append('key', data.key);
	    formData.append(data.name, data.file);
	    var xhr = createCORSRequest('post', data.url, data.cors);
	    xhr.withCredentials = data.withCredentials;
	    xhr.upload.addEventListener('progress', data.onProgress, false);
	    xhr.onload = data.onLoad;
	    xhr.onerror = data.onError;
	    xhr.send(formData);
	    return xhr;
	}

	module.exports = function (args) {
	    return ajaxUpload(args);
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';

	var accessKey = 'Lkve3Zo4h2ZK3iIGMJbwvop2Guy1jIDyJT0Mi9RL';
	var secretKey = 'WF41n8b1LIRk8c6lcBiDzNrFTci2E-cu7ki22W2b';
	var scope = 'wire';
	var getUpToken = function getUpToken() {
	    var returnBody = '{ \"name\":$(fname),\"size\":$(fsize),\"info\":$(imageInfo),\"hash\":$(etag)}';
	    var putPolicy = {
	        "scope": scope,
	        "deadline": Date.now() + 3600,
	        "returnBody": returnBody
	    };
	    var put_policy = JSON.stringify(putPolicy);
	    var encoded = base64encode(utf16to8(put_policy));
	    var hash = CryptoJS.HmacSHA1(encoded, secretKey);
	    var encoded_signed = hash.toString(CryptoJS.enc.Base64);
	    var upload_token = accessKey + ":" + safe64(encoded_signed) + ":" + encoded;
	    return upload_token;
	};

	var Qiniu = {
	    getUpToken: getUpToken
	};
	module.exports = Qiniu;

	function utf16to8(str) {
	    var out, i, len, c;
	    out = "";
	    len = str.length;
	    for (i = 0; i < len; i++) {
	        c = str.charCodeAt(i);
	        if (c >= 0x0001 && c <= 0x007F) {
	            out += str.charAt(i);
	        } else if (c > 0x07FF) {
	            out += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
	            out += String.fromCharCode(0x80 | c >> 6 & 0x3F);
	            out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
	        } else {
	            out += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
	            out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
	        }
	    }
	    return out;
	}

	function utf8to16(str) {
	    var out, i, len, c;
	    var char2, char3;
	    out = "";
	    len = str.length;
	    i = 0;
	    while (i < len) {
	        c = str.charCodeAt(i++);
	        switch (c >> 4) {
	            case 0:
	            case 1:
	            case 2:
	            case 3:
	            case 4:
	            case 5:
	            case 6:
	            case 7:
	                // 0xxxxxxx
	                out += str.charAt(i - 1);
	                break;
	            case 12:
	            case 13:
	                // 110x xxxx 10xx xxxx
	                char2 = str.charCodeAt(i++);
	                out += String.fromCharCode((c & 0x1F) << 6 | char2 & 0x3F);
	                break;
	            case 14:
	                // 1110 xxxx 10xx xxxx 10xx xxxx
	                char2 = str.charCodeAt(i++);
	                char3 = str.charCodeAt(i++);
	                out += String.fromCharCode((c & 0x0F) << 12 | (char2 & 0x3F) << 6 | (char3 & 0x3F) << 0);
	                break;
	        }
	    }
	    return out;
	}

	/*
	 * Interfaces:
	 * b64 = base64encode(data);
	 * data = base64decode(b64);
	 */
	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
	var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

	function base64encode(str) {
	    var out, i, len;
	    var c1, c2, c3;
	    len = str.length;
	    i = 0;
	    out = "";
	    while (i < len) {
	        c1 = str.charCodeAt(i++) & 0xff;
	        if (i == len) {
	            out += base64EncodeChars.charAt(c1 >> 2);
	            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
	            out += "==";
	            break;
	        }
	        c2 = str.charCodeAt(i++);
	        if (i == len) {
	            out += base64EncodeChars.charAt(c1 >> 2);
	            out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
	            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
	            out += "=";
	            break;
	        }
	        c3 = str.charCodeAt(i++);
	        out += base64EncodeChars.charAt(c1 >> 2);
	        out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
	        out += base64EncodeChars.charAt((c2 & 0xF) << 2 | (c3 & 0xC0) >> 6);
	        out += base64EncodeChars.charAt(c3 & 0x3F);
	    }
	    return out;
	}

	function base64decode(str) {
	    var c1, c2, c3, c4;
	    var i, len, out;
	    len = str.length;
	    i = 0;
	    out = "";
	    while (i < len) {
	        /* c1 */
	        do {
	            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
	        } while (i < len && c1 == -1);
	        if (c1 == -1) break;
	        /* c2 */
	        do {
	            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
	        } while (i < len && c2 == -1);
	        if (c2 == -1) break;
	        out += String.fromCharCode(c1 << 2 | (c2 & 0x30) >> 4);
	        /* c3 */
	        do {
	            c3 = str.charCodeAt(i++) & 0xff;
	            if (c3 == 61) return out;
	            c3 = base64DecodeChars[c3];
	        } while (i < len && c3 == -1);
	        if (c3 == -1) break;
	        out += String.fromCharCode((c2 & 0XF) << 4 | (c3 & 0x3C) >> 2);
	        /* c4 */
	        do {
	            c4 = str.charCodeAt(i++) & 0xff;
	            if (c4 == 61) return out;
	            c4 = base64DecodeChars[c4];
	        } while (i < len && c4 == -1);
	        if (c4 == -1) break;
	        out += String.fromCharCode((c3 & 0x03) << 6 | c4);
	    }
	    return out;
	}
	var safe64 = function safe64(base64) {
	    base64 = base64.replace(/\+/g, "-");
	    base64 = base64.replace(/\//g, "_");
	    return base64;
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var classNames = __webpack_require__(26);

	var Button = function (_React$Component) {
	    _inherits(Button, _React$Component);

	    function Button() {
	        _classCallCheck(this, Button);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Button).call(this));
	    }

	    _createClass(Button, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var className = _props.className;
	            var onClick = _props.onClick;

	            var cls = classNames(_defineProperty({
	                weui_btn: true
	            }, className, className));
	            var Component = this.props.href ? 'a' : 'button';
	            return React.createElement('div', {
	                className: 'weui_btn_area'
	            }, React.createElement(Component, {
	                className: cls,
	                onClick: onClick
	            }, this.props.title));
	        }
	    }]);

	    return Button;
	}(React.Component);

	Button.defaultProps = {
	    title: '保存'
	};
	module.exports = Button;

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter;
	var Link = _ReactRouter.Link;

	var Grid = function (_React$Component) {
	    _inherits(Grid, _React$Component);

	    function Grid() {
	        _classCallCheck(this, Grid);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Grid).call(this));
	    }

	    _createClass(Grid, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement('section', {
	                className: 'weui_grids'
	            }, React.createElement(Link, {
	                className: 'weui_grid',
	                to: '/',
	                activeClassName: 'active'
	            }, React.createElement('div', {
	                className: 'weui_grid_icon'
	            }, React.createElement('img', {
	                src: 'images/icon_nav_button.png'
	            })), React.createElement('p', {
	                className: 'weui_grid_label'
	            }, '首页')), React.createElement(Link, {
	                className: 'weui_grid',
	                to: '/post',
	                activeClassName: 'active'
	            }, React.createElement('div', {
	                className: 'weui_grid_icon'
	            }, React.createElement('img', {
	                src: 'images/icon_nav_article.png'
	            })), React.createElement('p', {
	                className: 'weui_grid_label'
	            }, 'post')), React.createElement(Link, {
	                className: 'weui_grid',
	                to: '/post2',
	                activeClassName: 'active'
	            }, React.createElement('div', {
	                className: 'weui_grid_icon'
	            }, React.createElement('img', {
	                src: 'images/icon_nav_button.png'
	            })), React.createElement('p', {
	                className: 'weui_grid_label'
	            }, 'post2')), React.createElement(Link, {
	                className: 'weui_grid',
	                to: '/weui',
	                activeClassName: 'active'
	            }, React.createElement('div', {
	                className: 'weui_grid_icon'
	            }, React.createElement('img', {
	                src: 'images/icon_nav_button.png'
	            })), React.createElement('p', {
	                className: 'weui_grid_label'
	            }, 'weui')));
	        }
	    }]);

	    return Grid;
	}(React.Component);

	module.exports = Grid;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var classNames = __webpack_require__(26);

	var Alert = function (_React$Component) {
	    _inherits(Alert, _React$Component);

	    function Alert(props) {
	        _classCallCheck(this, Alert);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Alert).call(this, props));

	        if (props.g) {
	            _this.state = ConfigStore.get('alert');
	        } else {
	            _this.state = props;
	        }
	        return _this;
	    }

	    _createClass(Alert, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps, nextState) {
	            if (this.props.g) {
	                this.setState(ConfigStore.get('alert'));
	            } else {
	                this.setState(nextProps);
	            }
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps, nextState) {
	            if (this.state == nextState) {
	                return false;
	            }
	            return true;
	        }
	    }, {
	        key: '_onClick',
	        value: function _onClick() {
	            if (this.props.g) {
	                ConfigActions.update('alert', { show: false });
	            } else {
	                this.setState({ show: false });
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var cls = classNames({
	                weui_dialog_confirm: !this.props.alert,
	                weui_dialog_alert: this.props.alert
	            });
	            return React.createElement('div', {
	                className: cls,
	                style: {
	                    display: this.state.show ? 'block' : 'none'
	                }
	            }, React.createElement('div', {
	                className: 'weui_mask'
	            }), React.createElement('div', {
	                className: 'weui_dialog'
	            }, React.createElement('div', {
	                className: 'weui_dialog_hd'
	            }, React.createElement('strong', {
	                className: 'weui_dialog_title'
	            }, this.state.title ? this.state.title : this.props.title)), React.createElement('div', {
	                className: 'weui_dialog_bd'
	            }, this.state.content ? this.state.content : this.props.content), React.createElement('div', {
	                className: 'weui_dialog_ft'
	            }, !this.props.alert ? React.createElement('a', {
	                className: 'weui_btn_dialog default',
	                onClick: this._onClick.bind(this)
	            }, '取消') : null, React.createElement('a', {
	                className: 'weui_btn_dialog primary',
	                onClick: this._onClick.bind(this)
	            }, this.state.action ? this.state.action : this.props.action))));
	        }
	    }]);

	    return Alert;
	}(React.Component);

	Alert.defaultProps = {
	    show: false,
	    title: '弹窗标题',
	    content: '弹窗内容，告知当前页面信息等',
	    action: '确定',
	    alert: true
	};

	module.exports = Alert;

/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Created by jf on 15/10/27.
	 */

	var Toast = function (_React$Component) {
	    _inherits(Toast, _React$Component);

	    function Toast() {
	        _classCallCheck(this, Toast);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Toast).call(this));

	        _this.state = ConfigStore.get('toast');
	        return _this;
	    }

	    _createClass(Toast, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps, nextState) {
	            var toast = ConfigStore.get('toast');
	            if (toast.show == this.state.show) {
	                return;
	            }
	            this.setState(toast);
	            if (toast.show) {
	                setTimeout(function () {
	                    ConfigActions.update('toast', { show: false });
	                }, 3000);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var icon = this.props.icon;

	            return React.createElement('div', {
	                className: icon === 'loading' ? 'weui_loading_toast' : '',
	                style: {
	                    display: this.state.show ? 'block' : 'none'
	                }
	            }, React.createElement('div', {
	                className: 'weui_mask_transparent'
	            }), React.createElement('div', {
	                className: 'weui_toast'
	            }, React.createElement('i', {
	                className: 'weui_icon_toast'
	            }), React.createElement('p', {
	                className: 'weui_toast_content'
	            }, this.state.msg ? this.state.msg : this.props.msg)));
	        }
	    }]);

	    return Toast;
	}(React.Component);

	Toast.defaultProps = {
	    icon: 'toast',
	    show: false,
	    msg: 'OK！'
	};
	module.exports = Toast;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var classNames = __webpack_require__(26);

	var Navbar = function (_React$Component) {
	    _inherits(Navbar, _React$Component);

	    function Navbar() {
	        _classCallCheck(this, Navbar);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Navbar).call(this));
	    }

	    _createClass(Navbar, [{
	        key: 'render',
	        value: function render() {
	            var className = this.props.className;

	            var cls = classNames(_defineProperty({
	                weui_tab: true
	            }, className, className));
	            return React.createElement('div', {
	                className: cls
	            }, React.createElement('div', {
	                className: 'weui_navbar'
	            }, React.createElement('div', {
	                className: 'weui_navbar_item weui_bar_item_on'
	            }, this.props.title), React.createElement('div', {
	                className: 'weui_navbar_item'
	            }, this.props.title), React.createElement('div', {
	                className: 'weui_navbar_item'
	            }, this.props.title)), React.createElement('div', {
	                className: 'weui_tab_bd'
	            }, this.props.title));
	        }
	    }]);

	    return Navbar;
	}(React.Component);

	Navbar.defaultProps = {
	    title: '保存'
	};
	module.exports = Navbar;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var classNames = __webpack_require__(26);

	var Tabbar = function (_React$Component) {
	    _inherits(Tabbar, _React$Component);

	    function Tabbar() {
	        _classCallCheck(this, Tabbar);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Tabbar).call(this));
	    }

	    _createClass(Tabbar, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var className = _props.className;
	            var onClick = _props.onClick;

	            var cls = classNames(_defineProperty({
	                weui_btn: true
	            }, className, className));
	            return React.createElement('div', {
	                className: 'weui_tab'
	            }, React.createElement('div', {
	                className: 'weui_tab_bd'
	            }), React.createElement('div', {
	                className: 'weui_tabbar'
	            }, React.createElement('a', {
	                className: 'weui_tabbar_item weui_bar_item_on',
	                href: 'javascript:;'
	            }, React.createElement('div', {
	                className: 'weui_tabbar_icon',
	                href: 'javascript:;'
	            }, React.createElement('img', {
	                src: 'images/icon_nav_button.png'
	            })), React.createElement('p', {
	                className: 'weui_tabbar_label'
	            }, '微信')), React.createElement('a', {
	                className: 'weui_tabbar_item',
	                href: 'javascript:;'
	            }, React.createElement('div', {
	                className: 'weui_tabbar_icon',
	                href: 'javascript:;'
	            }, React.createElement('img', {
	                src: 'images/icon_nav_msg.png'
	            })), React.createElement('p', {
	                className: 'weui_tabbar_label'
	            }, '通讯录')), React.createElement('a', {
	                className: 'weui_tabbar_item',
	                href: 'javascript:;'
	            }, React.createElement('div', {
	                className: 'weui_tabbar_icon',
	                href: 'javascript:;'
	            }, React.createElement('img', {
	                src: 'images/icon_nav_article.png'
	            })), React.createElement('p', {
	                className: 'weui_tabbar_label'
	            }, '发现')), React.createElement('a', {
	                className: 'weui_tabbar_item',
	                href: 'javascript:;'
	            }, React.createElement('div', {
	                className: 'weui_tabbar_icon',
	                href: 'javascript:;'
	            }, React.createElement('img', {
	                src: 'images/icon_nav_cell.png'
	            })), React.createElement('p', {
	                className: 'weui_tabbar_label'
	            }, '我'))));
	        }
	    }]);

	    return Tabbar;
	}(React.Component);

	Tabbar.defaultProps = {
	    title: '保存'
	};
	module.exports = Tabbar;

/***/ },
/* 48 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Progress = function (_React$Component) {
	    _inherits(Progress, _React$Component);

	    function Progress() {
	        _classCallCheck(this, Progress);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Progress).call(this));
	    }

	    _createClass(Progress, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement('div', {
	                className: 'weui_progress'
	            }, React.createElement('div', {
	                className: 'weui_progress_bar'
	            }, React.createElement('div', {
	                className: 'weui_progress_inner_bar js_progress',
	                style: {
	                    width: '80%'
	                }
	            })), React.createElement('a', {
	                className: 'weui_progress_opr',
	                href: 'javascript:;'
	            }, React.createElement('i', {
	                className: 'weui_icon_cancel'
	            })));
	        }
	    }]);

	    return Progress;
	}(React.Component);

	Progress.defaultProps = {
	    title: '保存'
	};
	module.exports = Progress;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var classNames = __webpack_require__(26);

	var Panel = function (_React$Component) {
	    _inherits(Panel, _React$Component);

	    function Panel() {
	        _classCallCheck(this, Panel);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Panel).call(this));
	    }

	    _createClass(Panel, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement('div', {
	                className: 'weui_panel weui_panel_access'
	            }, React.createElement('div', {
	                className: 'weui_panel_hd'
	            }, '图文组合列表'), React.createElement('div', {
	                className: 'weui_panel_bd'
	            }, React.createElement('a', {
	                className: 'weui_media_box weui_media_appmsg',
	                href: 'javascript:void(0);'
	            }, React.createElement('div', {
	                className: 'weui_media_hd'
	            }, React.createElement('img', {
	                className: 'weui_media_appmsg_thumb',
	                src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAeFBMVEUAwAD///+U5ZTc9twOww7G8MYwzDCH4YcfyR9x23Hw+/DY9dhm2WZG0kbT9NP0/PTL8sux7LFe115T1VM+zz7i+OIXxhes6qxr2mvA8MCe6J6M4oz6/frr+us5zjn2/fa67rqB4IF13XWn6ad83nxa1loqyirn+eccHxx4AAAC/klEQVRo3u2W2ZKiQBBF8wpCNSCyLwri7v//4bRIFVXoTBBB+DAReV5sG6lTXDITiGEYhmEYhmEYhmEYhmEY5v9i5fsZGRx9PyGDne8f6K9cfd+mKXe1yNG/0CcqYE86AkBMBh66f20deBc7wA/1WFiTwvSEpBMA2JJOBsSLxe/4QEEaJRrASP8EVF8Q74GbmevKg0saa0B8QbwBdjRyADYxIhqxAZ++IKYtciPXLQVG+imw+oo4Bu56rjEJ4GYsvPmKOAB+xlz7L5aevqUXuePWVhvWJ4eWiwUQ67mK51qPj4dFDMlRLBZTqF3SDvmr4BwtkECu5gHWPkmDfQh02WLxXuvbvC8ku8F57GsI5e0CmUwLz1kq3kD17R1In5816rGvQ5VMk5FEtIiWislTffuDpl/k/PzscdQsv8r9qWq4LRWX6tQYtTxvI3XyrwdyQxChXioOngH3dLgOFjk0all56XRi/wDFQrGQU3Os5t0wJu1GNtNKHdPqYaGYQuRDfbfDf26AGLYSyGS3ZAK4S8XuoAlxGSdYMKwqZKM9XJMtyqXi7HX/CiAZS6d8bSVUz5J36mEMFDTlAFQzxOT1dzLRljjB6+++ejFqka+mXIe6F59mw22OuOw1F4T6lg/9VjL1rLDoI9Xzl1MSYDNHnPQnt3D1EE7PrXjye/3pVpr1Z45hMUdcACc5NVQI0bOdS1WA0wuz73e7/5TNqBPhQXPEFGJNV2zNqWI7QKBd2Gn6AiBko02zuAOXeWIXjV0jNqdKegaE/kJQ6Bfs4aju04lMLkA2T5wBSYPKDGF3RKhFYEa6A1L1LG2yacmsaZ6YPOSAMKNsO+N5dNTfkc5Aqe26uxHpx7ZirvgCwJpWq/lmX1hA7LyabQ34tt5RiJKXSwQ+0KU0V5xg+hZrd4Bn1n4EID+WkQdgLfRNtvil9SPfwy+WQ7PFBWQz6dGWZBLkeJFXZGCfLUjCgGgqXo5TuSu3cugdcTv/HjqnBTEMwzAMwzAMwzAMwzAMw/zf/AFbXiOA6frlMAAAAABJRU5ErkJggg=='
	            })), React.createElement('div', {
	                className: 'weui_media_bd'
	            }, React.createElement('h4', {
	                className: 'weui_media_title'
	            }, '标题一'), React.createElement('p', {
	                className: 'weui_media_desc'
	            }, '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'))), React.createElement('a', {
	                className: 'weui_media_box weui_media_appmsg',
	                href: 'javascript:void(0);'
	            }, React.createElement('div', {
	                className: 'weui_media_hd'
	            }, React.createElement('img', {
	                className: 'weui_media_appmsg_thumb',
	                src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAeFBMVEUAwAD///+U5ZTc9twOww7G8MYwzDCH4YcfyR9x23Hw+/DY9dhm2WZG0kbT9NP0/PTL8sux7LFe115T1VM+zz7i+OIXxhes6qxr2mvA8MCe6J6M4oz6/frr+us5zjn2/fa67rqB4IF13XWn6ad83nxa1loqyirn+eccHxx4AAAC/klEQVRo3u2W2ZKiQBBF8wpCNSCyLwri7v//4bRIFVXoTBBB+DAReV5sG6lTXDITiGEYhmEYhmEYhmEYhmEY5v9i5fsZGRx9PyGDne8f6K9cfd+mKXe1yNG/0CcqYE86AkBMBh66f20deBc7wA/1WFiTwvSEpBMA2JJOBsSLxe/4QEEaJRrASP8EVF8Q74GbmevKg0saa0B8QbwBdjRyADYxIhqxAZ++IKYtciPXLQVG+imw+oo4Bu56rjEJ4GYsvPmKOAB+xlz7L5aevqUXuePWVhvWJ4eWiwUQ67mK51qPj4dFDMlRLBZTqF3SDvmr4BwtkECu5gHWPkmDfQh02WLxXuvbvC8ku8F57GsI5e0CmUwLz1kq3kD17R1In5816rGvQ5VMk5FEtIiWislTffuDpl/k/PzscdQsv8r9qWq4LRWX6tQYtTxvI3XyrwdyQxChXioOngH3dLgOFjk0all56XRi/wDFQrGQU3Os5t0wJu1GNtNKHdPqYaGYQuRDfbfDf26AGLYSyGS3ZAK4S8XuoAlxGSdYMKwqZKM9XJMtyqXi7HX/CiAZS6d8bSVUz5J36mEMFDTlAFQzxOT1dzLRljjB6+++ejFqka+mXIe6F59mw22OuOw1F4T6lg/9VjL1rLDoI9Xzl1MSYDNHnPQnt3D1EE7PrXjye/3pVpr1Z45hMUdcACc5NVQI0bOdS1WA0wuz73e7/5TNqBPhQXPEFGJNV2zNqWI7QKBd2Gn6AiBko02zuAOXeWIXjV0jNqdKegaE/kJQ6Bfs4aju04lMLkA2T5wBSYPKDGF3RKhFYEa6A1L1LG2yacmsaZ6YPOSAMKNsO+N5dNTfkc5Aqe26uxHpx7ZirvgCwJpWq/lmX1hA7LyabQ34tt5RiJKXSwQ+0KU0V5xg+hZrd4Bn1n4EID+WkQdgLfRNtvil9SPfwy+WQ7PFBWQz6dGWZBLkeJFXZGCfLUjCgGgqXo5TuSu3cugdcTv/HjqnBTEMwzAMwzAMwzAMwzAMw/zf/AFbXiOA6frlMAAAAABJRU5ErkJggg=='
	            })), React.createElement('div', {
	                className: 'weui_media_bd'
	            }, React.createElement('h4', {
	                className: 'weui_media_title'
	            }, '标题一'), React.createElement('p', {
	                className: 'weui_media_desc'
	            }, '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'))), React.createElement('div', {
	                className: 'weui_media_box weui_media_text'
	            }, React.createElement('h4', {
	                className: 'weui_media_title'
	            }, '标题一'), React.createElement('p', {
	                className: 'weui_media_desc'
	            }, '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'), React.createElement('ul', {
	                className: 'weui_media_info'
	            }, React.createElement('li', {
	                className: 'weui_media_info_meta'
	            }, '文字来源'), React.createElement('li', {
	                className: 'weui_media_info_meta'
	            }, '时间'), React.createElement('li', {
	                className: 'weui_media_info_meta weui_media_info_meta_extra'
	            }, '其它信息')))), React.createElement('a', {
	                className: 'weui_panel_ft',
	                href: 'javascript:void(0);'
	            }, '查看更多'));
	        }
	    }]);

	    return Panel;
	}(React.Component);

	module.exports = Panel;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var classNames = __webpack_require__(26);

	var List = function (_React$Component) {
	    _inherits(List, _React$Component);

	    function List() {
	        _classCallCheck(this, List);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(List).call(this));
	    }

	    _createClass(List, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var className = _props.className;
	            var onClick = _props.onClick;

	            var cls = classNames(_defineProperty({
	                weui_btn: true
	            }, className, className));
	            return React.createElement('section', {}, React.createElement('div', {
	                className: 'weui_cells_title'
	            }, '带图标、说明的列表项'), React.createElement('div', {
	                className: 'weui_cells'
	            }, React.createElement('div', {
	                className: 'weui_cell'
	            }, React.createElement('div', {
	                className: 'weui_cell_bd weui_cell_primary'
	            }, React.createElement('p', {}, '标题文字')), React.createElement('div', {
	                className: 'weui_cell_ft'
	            }, '说明文字')), React.createElement('div', {
	                className: 'weui_cell'
	            }, React.createElement('div', {
	                className: 'weui_cell_hd'
	            }, React.createElement('img', {
	                src: 'images/List.png',
	                style: {
	                    width: '20px',
	                    marginRight: '5px',
	                    display: 'block'
	                }
	            })), React.createElement('div', {
	                className: 'weui_cell_bd weui_cell_primary'
	            }, React.createElement('p', {}, '标题文字')), React.createElement('div', {
	                className: 'weui_cell_ft'
	            }, '说明文字')), React.createElement('div', {
	                className: 'weui_cell weui_cells_access'
	            }, React.createElement('div', {
	                className: 'weui_cell_hd'
	            }, React.createElement('img', {
	                src: 'images/List.png',
	                style: {
	                    width: '20px',
	                    marginRight: '5px',
	                    display: 'block'
	                }
	            })), React.createElement('div', {
	                className: 'weui_cell_bd weui_cell_primary'
	            }, React.createElement('p', {}, '标题文字')), React.createElement('div', {
	                className: 'weui_cell_ft'
	            }, '说明文字'))));
	        }
	    }]);

	    return List;
	}(React.Component);

	List.defaultProps = {
	    title: '保存'
	};
	module.exports = List;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var classNames = __webpack_require__(26);
	var Reload = __webpack_require__(52);

	var _require = __webpack_require__(29);

	var Grid = _require.Grid;


	var Content = React.createClass({
	    displayName: 'Content',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            time: ' .3s'
	        };
	    },
	    getInitialState: function getInitialState() {
	        this.dX = 0;
	        this.dY = 0;
	        return {
	            loaded: true
	        };
	    },
	    _onChange: function _onChange() {
	        var loaded = ConfigStore.get('loaded');
	        this.setState({
	            loaded: loaded
	        });
	    },
	    componentDidMount: function componentDidMount() {
	        this.refs.content.style.minHeight = window.screen.height - 48 * 2 + 'px';
	        ConfigStore.addChangeListener(this._onChange);
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        ConfigStore.removeChangeListener(this._onChange);
	    },
	    onTouchStart: function onTouchStart(e) {
	        this.refs.content.style.transitionDuration = "0s";
	        this.refs.reload.style.transitionDuration = "0s";
	        var point = e.touches ? e.touches[0] : e;
	        this.startX = point.pageX;
	        this.startY = point.pageY;
	    },
	    onTouchMove: function onTouchMove(e) {
	        var scrollTop = document.body.scrollTop;
	        if (scrollTop != 0) {
	            return;
	        }
	        var point = e.touches ? e.touches[0] : e;
	        this.endX = point.pageX;
	        this.endY = point.pageY;
	        this.deltaX = point.pageX - this.startX;
	        this.deltaY = point.pageY - this.startY;
	        if (this.deltaY < 48) {
	            return;
	        }
	        var dY = 48;
	        var mcontent = this.deltaY - scrollTop;
	        var mreload = this.deltaY + dY - scrollTop;
	        document.body.scrollTop = 0;
	        var loaded = ConfigStore.get('loaded');
	        if (!loaded) {
	            mcontent = mcontent + dY;
	            mreload = mreload + dY;
	        }
	        this.refs.content.style.transform = 'translateY(' + mcontent + 'px)';
	        this.refs.reload.style.transform = 'translateY(' + mreload / 2 + 'px)';
	    },
	    onTouchEnd: function onTouchEnd(e) {
	        // document.body.scrollTop = 0
	        if (!this.endY) {
	            return;
	        }
	        this.endY = null;
	        var loaded = ConfigStore.get('loaded');
	        this.refs.content.style.transitionDuration = this.props.time;
	        this.refs.reload.style.transitionDuration = this.props.time;
	        if (this.deltaY < 0 || this.deltaY < 40 && loaded) {
	            this.refs.content.style.transform = 'translateY(0)';
	            this.refs.reload.style.transform = 'translateY(0)';
	            return;
	        }
	        this.refs.content.style.transform = 'translateY(48px)';
	        this.refs.reload.style.transform = 'translateY(48px)';
	        if (!this.props.reLoad) {
	            ConfigActions.update('loaded', true);
	            return;
	        }
	        if (loaded) {
	            ConfigActions.update('loaded', false);
	            this.props.reLoad();
	        }
	    },
	    onTouchCancel: function onTouchCancel(e) {
	        this.onTouchEnd;
	    },
	    render: function render() {
	        var loaded = ConfigStore.get('loaded');
	        var style = {};
	        if (loaded) {
	            style = {
	                transitionDuration: this.props.time,
	                transform: 'translateY(0)'
	            };
	        } else {
	            style = {
	                transitionDuration: this.props.time,
	                transform: 'translateY(48px)'
	            };
	        }
	        return React.createElement('section', {
	            id: 'section',
	            className: 'section',
	            onTouchStart: this.onTouchStart,
	            onTouchMove: this.onTouchMove,
	            onTouchEnd: this.onTouchEnd,
	            onTouchCancel: this.onTouchCancel
	        }, React.createElement('section', {
	            ref: 'reload',
	            id: 'reload',
	            className: 'reload',
	            style: style
	        }, React.createElement(Reload, { loaded: loaded })), React.createElement('section', {
	            id: 'content',
	            className: 'content',
	            ref: 'content',
	            style: style,
	            height: this.props.contentheight
	        }, React.createElement(Grid), this.props.children));
	    }
	});
	module.exports = Content;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var classNames = __webpack_require__(26);

	var Reload = function (_React$Component) {
	    _inherits(Reload, _React$Component);

	    function Reload(props) {
	        _classCallCheck(this, Reload);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Reload).call(this, props));
	        // this.state = {
	        //     refresh: props.refresh
	        // }
	    }

	    _createClass(Reload, [{
	        key: 'render',
	        value: function render() {
	            var text = '加载中';
	            if (this.props.loaded) {
	                text = '下拉刷新';
	            }
	            return React.createElement('section', {
	                ref: 'loading',
	                id: 'loading',
	                className: 'loading'
	            }, text);
	        }
	    }]);

	    return Reload;
	}(React.Component);

	Reload.defaultProps = {
	    title: '刷新'
	};
	module.exports = Reload;

/***/ },
/* 53 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Nomatch = function (_React$Component) {
	    _inherits(Nomatch, _React$Component);

	    function Nomatch() {
	        _classCallCheck(this, Nomatch);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Nomatch).apply(this, arguments));
	    }

	    _createClass(Nomatch, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement('div', {
	                className: 'warp'
	            }, '没有发现对应的页面！');
	        }
	    }]);

	    return Nomatch;
	}(React.Component);

	module.exports = Nomatch;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _require = __webpack_require__(29);

	var Input = _require.Input;
	var Textarea = _require.Textarea;
	var Checkbox = _require.Checkbox;
	var Checkbox2 = _require.Checkbox2;
	var Radio = _require.Radio;
	var Select = _require.Select;
	var Select2 = _require.Select2;
	var Select3 = _require.Select3;
	var Switch = _require.Switch;
	var Uploader = _require.Uploader;
	var Button = _require.Button;
	var Grid = _require.Grid;
	var Navbar = _require.Navbar;
	var Tabbar = _require.Tabbar;
	var Panel = _require.Panel;

	var _require2 = __webpack_require__(24);

	var Content = _require2.Content;

	var Home = function (_React$Component) {
	    _inherits(Home, _React$Component);

	    function Home() {
	        _classCallCheck(this, Home);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Home).call(this));

	        _this.state = {
	            kk: '33333333333'
	        };
	        return _this;
	    }

	    _createClass(Home, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            ConfigActions.update('title', '首页');
	            var audio = this.refs.audio;
	            // audio.play()
	            audio.addEventListener('timeupdate', function () {
	                //剩余时间
	                if (!isNaN(audio.duration)) {
	                    var surplus = audio.duration - audio.currentTime;
	                    console.log(surplus);
	                }
	            }, false);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps() {
	            console.log(ConfigStore.get('refresh'));
	        }
	    }, {
	        key: 'click',
	        value: function click() {
	            console.log('3');
	            toast();
	        }
	    }, {
	        key: 'reLoad',
	        value: function reLoad() {
	            setTimeout(function () {
	                Reloaded();
	            }.bind(this), 3000);
	        }
	    }, {
	        key: '_onChange',
	        value: function _onChange(name, value) {
	            console.log(name);
	            console.log(value);
	            this.setState({
	                kk: value
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(Content, {
	                reLoad: this.reLoad.bind(this)
	            }, React.createElement(Input, {
	                onChange: this._onChange.bind(this),
	                type: 'tel'
	            }), React.createElement(Panel), React.createElement(Button, {
	                className: 'weui_btn_primary',
	                onClick: this.click.bind(this)
	            }), React.createElement('div', {
	                className: 'form-group animated bounceInRight'
	            }, React.createElement('div', {
	                className: 'form-control'
	            }, React.createElement('audio', {
	                ref: 'audio',
	                src: '1.mp3',
	                controls: 'controls',
	                loop: 'loop',
	                autoPlay: false
	            }, '亲 您的浏览器不支持html5的audio标签'))));
	        }
	    }]);

	    return Home;
	}(React.Component);

	module.exports = Home;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _require = __webpack_require__(56);

	var Swiper = _require.Swiper;

	var _require2 = __webpack_require__(24);

	var Content = _require2.Content;

	var _require3 = __webpack_require__(29);

	var Button = _require3.Button;
	var Toast = _require3.Toast;

	var Post = function (_React$Component) {
	    _inherits(Post, _React$Component);

	    function Post() {
	        _classCallCheck(this, Post);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Post).call(this));

	        _this.state = {
	            kk: '33333333333',
	            show: false,
	            timer: null
	        };
	        return _this;
	    }

	    _createClass(Post, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            // console.log('0');
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            ConfigActions.update('title', 'post');
	            // storedb('article').insert({ 'id': 1, 'value': '23232323' })
	            // let res = storedb('article').find({ 'id': 1 })
	            // console.log(res)
	            // let timestamp = res[0]['_id'];
	            // // var timestamp = '1425553097';
	            // let d = new Date(timestamp); //根据时间戳生成的时间对象
	            // let date = (d.getFullYear()) + "-" + (d.getMonth() + 1) + "-" + (d.getDate()) + " " + (d.getHours()) + ":" + (d.getMinutes()) + ":" + (d.getSeconds())
	            // console.log(date)
	            // console.log(ConfigStore.get('refresh'))
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            // if ((nextProps.location.pathname !== this.state.hash) || (nextProps.location.search !== this.state.search)) {
	            //     this._req(nextProps)
	            // }
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps, nextState) {
	            if (nextProps.location.search !== this.props.location.search || nextState !== this.state) {
	                return true;
	            }
	            return false;
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {
	            // console.log('1');
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate(prevProps, prevState) {
	            // console.log('2');
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            // console.log('3');
	        }
	    }, {
	        key: 'reLoad',
	        value: function reLoad() {
	            setTimeout(function () {
	                Reloaded();
	            }.bind(this), 3000);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            this.state.timer && clearTimeout(this.state.timer);
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            this.setState({ show: true });
	            alert();
	            // this.state.timer = setTimeout(() => {
	            //     this.setState({ show: false });
	            // }, 3000);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(Content, {
	                reLoad: this.reLoad.bind(this)
	            }, React.createElement(Button, {
	                className: 'weui_btn_primary',
	                onClick: this.show.bind(this)
	            }, '确认'), React.createElement(Toast, {}, 'loading...'), React.createElement('div', {
	                className: 'form-group'
	            }, React.createElement(Swiper, {
	                className: 'form-control'
	            }, React.createElement('div', {
	                className: 'form-control',
	                title: 'title'
	            }, '1111111111111111111111111'), React.createElement('div', {
	                className: 'form-control',
	                title: 'title22'
	            }, '2222222222222222222'), React.createElement('div', {
	                className: 'form-control',
	                title: 'title22'
	            }, '333333333333333333333333'), React.createElement('div', {
	                className: 'form-control',
	                title: 'title22'
	            }, '44444444444444444444')), this.state.kk));
	        }
	    }]);

	    return Post;
	}(React.Component);

	module.exports = Post;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Form = __webpack_require__(57);
	var Input = __webpack_require__(58);
	var Swiper = __webpack_require__(60);

	var Forms = {
	    Form: Form,
	    Input: Input,
	    Swiper: Swiper
	};
	module.exports = Forms;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var classNames = __webpack_require__(26);

	var Form = function (_React$Component) {
	    _inherits(Form, _React$Component);

	    function Form() {
	        _classCallCheck(this, Form);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Form).call(this));
	    }

	    _createClass(Form, [{
	        key: 'handleSubmit',
	        value: function handleSubmit(e) {
	            e.preventDefault();
	            console.log(this.props.info);
	            if (this.props.onSubmit()) {
	                this.props.onSubmit(e);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement('form', {
	                className: 'form-fields form-horizontal',
	                role: 'form',
	                onSubmit: this.handleSubmit
	            }, React.createElement('fieldset', {
	                className: 'form-fieldset'
	            }, React.createElement('legend', {
	                className: 'form-legend'
	            }, this.props.legend), this.props.children));
	        }
	    }]);

	    return Form;
	}(React.Component);

	Form.defaultProps = {
	    value: '保存'
	};
	module.exports = Form;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var classNames = __webpack_require__(26);
	var FormGroup = __webpack_require__(59);

	var Input = function (_React$Component) {
	    _inherits(Input, _React$Component);

	    function Input(props) {
	        _classCallCheck(this, Input);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Input).call(this, props));

	        _this2.state = {
	            value: props.value,
	            help: props.help,
	            length: props.value.length || 0
	        };
	        return _this2;
	    }

	    _createClass(Input, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            var length = this.props.value.length || 0;
	            var help = this.props.help || '请输入' + this.props.title;
	            this.setState({
	                help: help
	            });
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps, nextState) {
	            return nextProps.value !== this.props.value || this.state.value !== nextState.value;
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({
	                value: nextProps.value
	            });
	        }
	    }, {
	        key: 'oo',
	        value: function oo(_this, value) {
	            var error = void 0;
	            var warning = void 0;
	            var success = void 0;
	            value = value.replace(/(^\s*)|(\s*$)/, "");
	            var length = value.length;
	            var help = _this.props.help || '请输入' + _this.props.title;
	            if (length > 0) {
	                if (_this.props.min && length < _this.props.min) {
	                    help = '请输入至少' + _this.props.min + '个字符！';
	                    error = true;
	                } else if (_this.props.max && length > _this.props.max) {
	                    help = '请输入至多' + _this.props.max + '个字符！';
	                    error = true;
	                }
	                if (!error) {
	                    success = true;
	                }
	            } else if (_this.props.required) {
	                help = _this.props.title + '必须填写！';
	                warning = true;
	            }
	            _this.setState({
	                value: value,
	                help: help,
	                length: length,
	                error: error,
	                warning: warning,
	                success: success
	            });
	            if (_this.props.onChange) {
	                _this.props.onChange(_this.props.name, value);
	            }
	        }
	    }, {
	        key: '_onChange',
	        value: function _onChange(e) {
	            var that = this;
	            var value = e.target.value;
	            this.oo(that, value);
	        }
	    }, {
	        key: '_delete',
	        value: function _delete(e) {
	            var that = this;
	            var value = '';
	            this.oo(that, value);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var Class = classNames({
	                'has-error': this.state.error,
	                'has-warning': this.state.warning,
	                'has-success': this.state.success
	            });
	            var limit = ' ' + this.state.length;
	            if (this.props.max) {
	                limit += ' / ' + this.props.max;
	            }
	            return React.createElement(FormGroup, {
	                class: Class,
	                title: this.props.title,
	                limit: limit,
	                help: this.state.help
	            }, React.createElement('input', {
	                className: 'form-input',
	                type: this.props.type,
	                max: this.props.max,
	                min: this.props.min,
	                placeholder: this.props.placeholder,
	                disabled: this.props.disabled,
	                autoComplete: this.props.autoComplete,
	                value: this.state.value,
	                onChange: this._onChange.bind(this)
	            }), React.createElement('span', {
	                className: 'form-delete',
	                onClick: this._delete.bind(this)
	            }, '×'));
	        }
	    }]);

	    return Input;
	}(React.Component);

	Input.defaultProps = {
	    title: '字段名称',
	    type: 'text',
	    value: 'haode',
	    min: 6,
	    autocomplete: 'off',
	    required: 'required',
	    help: '帮助提示'
	};
	module.exports = Input;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var classNames = __webpack_require__(26);

	var FormGroup = function (_React$Component) {
	    _inherits(FormGroup, _React$Component);

	    function FormGroup() {
	        _classCallCheck(this, FormGroup);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(FormGroup).apply(this, arguments));
	    }

	    _createClass(FormGroup, [{
	        key: 'render',
	        value: function render() {
	            var classname = this.props.className ? 'form-group ' + this.props.className : 'form-group';
	            return React.createElement('div', {
	                className: classname
	            }, React.createElement('label', {
	                className: 'form-label'
	            }, this.props.title), React.createElement('div', {
	                className: 'form-control'
	            }, this.props.limit ? React.createElement('i', {
	                className: 'form-ico fa'
	            }, this.props.limit) : null, this.props.children, this.props.help ? React.createElement('span', {
	                className: 'form-help'
	            }, this.props.help) : null));
	        }
	    }]);

	    return FormGroup;
	}(React.Component);

	module.exports = FormGroup;

/***/ },
/* 60 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Tab = function (_React$Component) {
	    _inherits(Tab, _React$Component);

	    function Tab(props) {
	        _classCallCheck(this, Tab);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tab).call(this, props));

	        _this.state = {
	            dotstyle: {
	                top: 0,
	                left: 0
	            },
	            dot: 1
	        };
	        if (props.children && props.children.length) {
	            _this.length = _this.props.children.length;
	        }
	        _this.autoplayTimer = null;
	        return _this;
	    }

	    _createClass(Tab, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            if (this.props.children && this.props.children.length) {
	                // this.autoplay()
	            }
	        }
	    }, {
	        key: 'autoplay',
	        value: function autoplay() {
	            clearInterval(this.autoplayTimer);
	            var length = this.length - 1;
	            this.autoplayTimer = setInterval(function () {
	                var dot = this.state.dot;
	                if (dot < length) {
	                    dot += 1;
	                } else {
	                    dot = 0;
	                }
	                this.setState({
	                    dot: dot
	                });
	            }.bind(this), 1000);
	        }
	    }, {
	        key: 'pause',
	        value: function pause() {
	            clearInterval(this.autoplayTimer);
	        }
	    }, {
	        key: '_onClick',
	        value: function _onClick(index) {
	            this.setState({
	                dot: index
	            });
	        }
	    }, {
	        key: 'onMouseDown',
	        value: function onMouseDown(e) {
	            console.log('鼠标按下了！');
	            e.target.style.transition = "all 0s";
	            console.log(e.clientY);
	            console.log(e.target.getBoundingClientRect().top);
	            console.log(e);
	        }
	    }, {
	        key: 'onMouseMove',
	        value: function onMouseMove(e) {
	            console.log('鼠标移动了！');
	            console.log(e.clientX);
	            console.log(e.target.getBoundingClientRect().left);
	            console.log(e);
	        }
	    }, {
	        key: 'onDragStart',
	        value: function onDragStart(e) {
	            console.log('开始拖动');
	            console.log(e.clientX);
	            console.log(e.target.getBoundingClientRect().left);
	            this.setState({
	                x: e.clientX
	            });
	        }
	    }, {
	        key: 'onDrag',
	        value: function onDrag(e) {
	            console.log('拖动');
	            console.log(this.state.x);
	            console.log(e.clientX);
	            if (e.clientX == 0) {
	                return;
	            }
	            var left = -(this.state.x - e.clientX) + 'px';
	            console.log(left);
	            e.target.style.left = left;
	        }
	    }, {
	        key: 'onDragOver',
	        value: function onDragOver(e) {
	            console.log('拖动结束');
	            var width = e.target.getBoundingClientRect().width;
	            var w = width / 2;
	            var left = this.state.x - e.clientX;
	            console.log(left);
	            if (left > w) {
	                e.target.style.transition = "all .6s";
	                console.log(12121);
	                e.target.style.left = -width + 'px';
	            } else if (-left > w) {
	                e.target.style.transition = "all .6s";
	                console.log(99);
	                e.target.style.left = width + 'px';
	            } else {
	                e.target.style.transition = "all .6s";
	                e.target.style.left = 0;
	            }
	        }
	    }, {
	        key: 'onTouchStart',
	        value: function onTouchStart(e) {
	            this.pause();
	            e.target.style.transition = "all 0s";
	            var point = e.touches ? e.touches[0] : e;
	            this.startX = point.pageX;
	            this.startY = point.pageY;
	        }
	    }, {
	        key: 'onTouchMove',
	        value: function onTouchMove(e) {
	            e.preventDefault();
	            var point = e.touches ? e.touches[0] : e;
	            this.endX = point.pageX;
	            this.endY = point.pageY;
	            var deltaX = point.pageX - this.startX;
	            var deltaY = point.pageY - this.startY;
	            if (Math.abs(deltaX) > Math.abs(deltaY)) {
	                e.stopPropagation();
	            }
	            e.target.style.transform = 'translateX(' + deltaX + 'px)';
	            var dot = this.state.dot;
	            var width = e.target.getBoundingClientRect().width;
	            if (deltaX > 0 && dot != 0) {
	                dot = dot - 1;
	                var refName = "tab" + dot;
	                this.refs[refName].style.transition = "all 0s";
	                this.refs[refName].style.transform = 'translateX(' + (deltaX - width) + 'px)';
	            } else if (deltaX < 0 && dot < this.length - 1) {
	                dot = dot + 1;
	                var _refName = "tab" + dot;
	                this.refs[_refName].style.transition = "all 0s";
	                this.refs[_refName].style.transform = 'translateX(' + (deltaX + width) + 'px)';
	            }
	        }
	    }, {
	        key: 'onTouchEnd',
	        value: function onTouchEnd(e) {
	            if (this.endX == 0) {
	                return;
	            }
	            var dot = this.state.dot;
	            var width = e.target.getBoundingClientRect().width;
	            var w = width / 4;
	            var mv = this.endX - this.startX;
	            var mx = Math.abs(mv);
	            e.target.style.transition = "all .3s";
	            if (mx > w) {
	                if (mv > 0 && dot > 0) {
	                    e.target.style.transform = 'translateX(' + width + 'px)';
	                    dot = dot - 1;
	                } else if (mv < 0 && dot < this.length - 1) {
	                    e.target.style.transform = 'translateX(' + -width + 'px)';
	                    dot = dot + 1;
	                }
	                if (dot != this.state.dot) {
	                    var refName = "tab" + dot;
	                    var ev = this.refs[refName].style;
	                    ev.transition = "all .3s";
	                    ev.transform = 'translateX(0)';
	                    this.refs.dot.innerHTML = dot + 1 + '/' + this.length;
	                    setTimeout(function () {
	                        this.setState({
	                            dot: dot
	                        });
	                    }.bind(this), 600);
	                } else {
	                    e.target.style.transform = 'translateX(0)';
	                }
	            } else {
	                if (mv > 0 && dot > 0) {
	                    dot = dot - 1;
	                    var _refName2 = "tab" + dot;
	                    var _ev = this.refs[_refName2].style;
	                    _ev.transition = "all .3s";
	                    _ev.transform = 'translateX(-100%)';
	                } else if (mv < 0 && dot < this.length - 1) {
	                    dot = dot + 1;
	                    var _refName3 = "tab" + dot;
	                    var _ev2 = this.refs[_refName3].style;
	                    _ev2.transition = "all .3s";
	                    _ev2.transform = 'translateX(100%)';
	                }
	                e.target.style.transform = 'translateX(0)';
	            }
	            this.startX = 0;
	            this.endX = 0;
	        }
	    }, {
	        key: 'onTouchCancel',
	        value: function onTouchCancel(e) {
	            this.onTouchEnd.bind(this);
	            console.log(e);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var dot = this.state.dot;
	            var childs = [];
	            if (this.props.children) {
	                if (this.props.children.length) {
	                    childs = this.props.children;
	                } else {
	                    childs.push(this.props.children);
	                }
	            }
	            return React.createElement('div', {
	                className: 'tab'
	            }, React.createElement('div', {
	                className: 'tab-cards'
	            }, childs.map(function (child, index) {
	                var active = '';
	                if (index == dot) {
	                    active = ' active';
	                }
	                return React.createElement('div', {
	                    key: index,
	                    onClick: this._onClick.bind(this, index),
	                    className: 'tab-card' + active
	                }, child.props.title);
	            }.bind(this))), React.createElement('div', {
	                className: 'tab-cards2',
	                ref: 'cards'
	            }, childs.map(function (child, index) {
	                var style = void 0;
	                if (index == dot) {
	                    style = {
	                        transform: 'translateX(0)'
	                    };
	                } else if (index < dot) {
	                    style = {
	                        transform: 'translateX(-100%)'
	                    };
	                } else if (index > dot) {
	                    style = {
	                        transform: 'translateX(100%)'
	                    };
	                }
	                return React.createElement('div', {
	                    key: index,
	                    ref: 'tab' + index,
	                    // draggable: true,
	                    className: 'tab-card2',
	                    style: style,
	                    // onMouseDown: this.onMouseDown.bind(this),
	                    // onMouseMove: this.onMouseMove.bind(this),
	                    // onDragStart: this.onDragStart.bind(this),
	                    // onDrag: this.onDrag.bind(this),
	                    // onDragOver: this.onDragOver.bind(this),
	                    onTouchStart: this.onTouchStart.bind(this),
	                    onTouchMove: this.onTouchMove.bind(this),
	                    onTouchEnd: this.onTouchEnd.bind(this),
	                    onTouchCancel: this.onTouchCancel.bind(this)
	                }, child.props.children, React.createElement('div', {
	                    className: 'p'
	                }, child.props.title));
	            }.bind(this)), React.createElement('div', {
	                ref: 'dot',
	                className: 'dot'
	            }, this.state.dot + 1 + '/' + this.length)), React.createElement('div', {
	                className: 'dd',
	                onClick: this.pause.bind(this)
	            }, '暂停'), React.createElement('div', {
	                className: 'dd',
	                onClick: this.autoplay.bind(this)
	            }, 'bofang'));
	        }
	    }]);

	    return Tab;
	}(React.Component);

	Tab.defaultProps = {
	    value: '保存'
	};

	module.exports = Tab;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _require = __webpack_require__(24);

	var Content = _require.Content;

	var Post = function (_React$Component) {
	    _inherits(Post, _React$Component);

	    function Post() {
	        _classCallCheck(this, Post);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Post).call(this));
	    }

	    _createClass(Post, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            ConfigActions.update('title', 'post2');
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps() {
	            console.log(ConfigStore.get('refresh'));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(Content, {}, React.createElement('div', {
	                className: 'form-group'
	            }, '22222222222222222223'));
	        }
	    }]);

	    return Post;
	}(React.Component);

	module.exports = Post;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// const {
	//     Form,
	//     Input
	// } = require('../components/Forms')

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _require = __webpack_require__(29);

	var Input = _require.Input;
	var Textarea = _require.Textarea;
	var Checkbox = _require.Checkbox;
	var Checkbox2 = _require.Checkbox2;
	var Radio = _require.Radio;
	var Select = _require.Select;
	var Select2 = _require.Select2;
	var Select3 = _require.Select3;
	var Switch = _require.Switch;
	var Uploader = _require.Uploader;
	var Button = _require.Button;
	var Grid = _require.Grid;
	var Navbar = _require.Navbar;
	var Tabbar = _require.Tabbar;
	var Panel = _require.Panel;
	var Progress = _require.Progress;
	var List = _require.List;

	var _require2 = __webpack_require__(24);

	var Content = _require2.Content;

	var Weui = function (_React$Component) {
	    _inherits(Weui, _React$Component);

	    function Weui() {
	        _classCallCheck(this, Weui);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Weui).call(this));
	    }

	    _createClass(Weui, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            ConfigActions.update('title', 'Weui');
	        }
	    }, {
	        key: 'toast',
	        value: function (_toast) {
	            function toast() {
	                return _toast.apply(this, arguments);
	            }

	            toast.toString = function () {
	                return _toast.toString();
	            };

	            return toast;
	        }(function () {
	            toast();
	        })
	    }, {
	        key: 'alert',
	        value: function (_alert) {
	            function alert() {
	                return _alert.apply(this, arguments);
	            }

	            alert.toString = function () {
	                return _alert.toString();
	            };

	            return alert;
	        }(function () {
	            alert();
	        })
	    }, {
	        key: 'reLoad',
	        value: function reLoad() {
	            setTimeout(function () {
	                Reloaded();
	            }.bind(this), 3000);
	        }
	    }, {
	        key: '_onChange',
	        value: function _onChange(name, value) {
	            console.log(name);
	            console.log(value);
	            this.setState({
	                kk: value
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(Content, {
	                reLoad: this.reLoad.bind(this)
	            }, React.createElement(Input, {
	                onChange: this._onChange.bind(this),
	                type: 'tel'
	            }), React.createElement(Input, {
	                title: '时间',
	                type: 'date',
	                onChange: this._onChange.bind(this)
	            }), React.createElement(Input, {
	                onChange: this._onChange.bind(this),
	                type: 'datetime-local'
	            }), React.createElement(Textarea, { value: 'haod' }), React.createElement(List), React.createElement(Checkbox), React.createElement(Checkbox2), React.createElement(Radio), React.createElement(Select), React.createElement(Select2), React.createElement(Select3), React.createElement(Switch), React.createElement(Uploader), React.createElement(Navbar), React.createElement(Progress), React.createElement(Panel), React.createElement(Button, {
	                className: 'weui_btn_primary',
	                title: 'alert',
	                onClick: this.alert.bind(this)
	            }), React.createElement(Button, {
	                className: 'weui_btn_primary',
	                title: 'toast',
	                onClick: this.toast.bind(this)
	            }));
	        }
	    }]);

	    return Weui;
	}(React.Component);

	module.exports = Weui;

/***/ }
/******/ ]);