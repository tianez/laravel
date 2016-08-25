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
	// const React = require('react');
	// const ReactDOM = require('react-dom');
	// const ReactRouter = require('react-router');
	// import './less/style.less' //webpack编译时导入

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var IndexRoute = _ReactRouter.IndexRoute;
	var IndexRedirect = _ReactRouter.IndexRedirect;
	var Redirect = _ReactRouter.Redirect;
	var hashHistory = _ReactRouter.hashHistory;
	var browserHistory = _ReactRouter.browserHistory;

	var _require = __webpack_require__(1);

	var Layout = _require.Layout;

	var _require2 = __webpack_require__(13);

	var Nomatch = _require2.Nomatch;
	var Home = _require2.Home;
	var Drag = _require2.Drag;
	var ApiCloudsIndex = _require2.ApiCloudsIndex;
	var ApiClouds = _require2.ApiClouds;
	var ApiCloud = _require2.ApiCloud;
	var Pages = _require2.Pages;
	var Page = _require2.Page;
	var Login = _require2.Login;
	var Logout = _require2.Logout;
	var Import = _require2.Import;


	__webpack_require__(44);

	function onEnter(nextState, replace) {
	    var pathname = nextState.location.pathname;
	    var user = storedb('user').find() ? true : false;
	    console.log('当前用户:' + storedb('user').find());
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

	var routers = React.createElement(Router, {
	    history: hashHistory
	}, React.createElement(Route, {
	    path: "/",
	    component: Layout
	},
	// React.createElement(IndexRedirect, {
	//     to: 'apicloud/article'
	// }),
	React.createElement(IndexRoute, {
	    component: Home,
	    onEnter: onEnter
	}), React.createElement(Route, {
	    path: "import",
	    component: Import
	}), React.createElement(Route, {
	    path: "drag",
	    component: Drag
	}), React.createElement(Route, {
	    path: "apicloud"
	}, React.createElement(IndexRoute, {
	    component: ApiCloudsIndex,
	    onEnter: onEnter
	}), React.createElement(Route, {
	    path: ":clouds"
	}, React.createElement(IndexRoute, {
	    component: ApiClouds,
	    onEnter: onEnter
	}), React.createElement(Route, {
	    path: ":articleId",
	    component: ApiCloud
	}))), React.createElement(Route, {
	    path: "api"
	}, React.createElement(IndexRoute, {
	    component: ApiCloudsIndex
	}), React.createElement(Redirect, {
	    from: ':pages',
	    to: ':pages/index'
	}), React.createElement(Route, {
	    path: ":pages"
	}, React.createElement(Route, {
	    path: "index",
	    component: Pages
	}), React.createElement(Route, {
	    path: ":page",
	    component: Page
	})))), React.createElement(Route, {
	    path: "login",
	    component: Login,
	    onEnter: onEnter
	}), React.createElement(Route, {
	    path: "logout",
	    component: Logout
	}), React.createElement(Route, {
	    path: "*",
	    component: Nomatch
	}));
	ReactDOM.render(routers, document.getElementById('app'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Layout = __webpack_require__(2);
	var Header = __webpack_require__(9);
	var Footer = __webpack_require__(11);
	var Temp = {
	    Layout: Layout,
	    Header: Header,
	    Footer: Footer
	};
	module.exports = Temp;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

	var Apicloud = __webpack_require__(3);
	var Header = __webpack_require__(9);
	var Sidebar = __webpack_require__(10);
	var Footer = __webpack_require__(11);
	var Layout = React.createClass({
	    displayName: 'Layout',

	    _onChange: function _onChange() {
	        var config = ConfigStore.getAll();
	        console.log(config);
	        window.document.title = config.title;
	        this.setState(config);
	    },
	    componentDidMount: function componentDidMount() {
	        ConfigStore.addChangeListener(this._onChange);
	        var filter = {
	            where: {
	                state: 1
	            },
	            order: ['order DESC', 'createdAt DESC'],
	            limit: 100
	        };
	        Apicloud.get('role', filter, function (err, res) {
	            var roles = JSON.parse(res.text);
	            ConfigActions.update('roles', roles);
	        });
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        ConfigStore.removeChangeListener(this._onChange);
	    },
	    render: function render() {
	        return (
	            // React.createElement(ReactCSSTransitionGroup, {
	            //         component: 'div',
	            //         id: 'warper',
	            //         className: 'pure-g',
	            //         transitionName: 'switch',
	            //         transitionEnterTimeout: 500,
	            //         transitionLeaveTimeout: 500
	            //     },
	            React.createElement('div', {
	                id: 'warper',
	                className: 'pure-g'
	            },
	            // React.createElement('div', {
	            //         className: 'switch',
	            //         key: this.props.location.pathname
	            //     },
	            React.createElement(Header), React.createElement('section', {
	                id: 'main'
	            }, React.createElement(Sidebar), React.createElement('section', {
	                id: 'content',
	                className: 'pure-u-1'
	            }, this.props.children)), React.createElement(Footer)
	            // )
	            )
	        );
	    }
	});
	module.exports = Layout;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var request = __webpack_require__(4);
	var AppId = 'A6984077246442';
	var AppKey = '7F7872C0-8EB2-D116-C9AF-AF02A4B65BA0';
	var AppUrl = 'https://d.apicloud.com/mcm/api/';
	var get = function get(url, filter, cb) {
	    if (window.navigator.onLine == true) {
	        var now = Date.now();
	        var key = SHA1(AppId + 'UZ' + AppKey + 'UZ' + now) + "." + now;
	        var token = storedb('user').find() ? storedb('user').find()[0].id : '';
	        token = '';
	        request.get(AppUrl + url).set('X-APICloud-AppId', AppId).set('X-APICloud-AppKey', key).set('authorization', token).query({
	            filter: JSON.stringify(filter)
	        }).end(cb);
	    } else {
	        console.log('网络出现故障！');
	    }
	};

	var post = function post(url, info, cb) {
	    if (window.navigator.onLine == true) {
	        var now = Date.now();
	        var key = SHA1(AppId + 'UZ' + AppKey + 'UZ' + now) + "." + now;
	        var token = storedb('user').find() ? storedb('user').find()[0].id : '';
	        request.post(AppUrl + url).set('X-APICloud-AppId', AppId).set('X-APICloud-AppKey', key).set('authorization', token).send(info).end(cb);
	    } else {
	        console.log('网络出现故障！');
	    }
	};
	var Apicloud = {
	    get: get,
	    post: post
	};
	module.exports = Apicloud;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Root reference for iframes.
	 */

	var root;
	if (typeof window !== 'undefined') {
	  // Browser window
	  root = window;
	} else if (typeof self !== 'undefined') {
	  // Web Worker
	  root = self;
	} else {
	  // Other environments
	  console.warn("Using browser-only version of superagent in non-browser environment");
	  root = undefined;
	}

	var Emitter = __webpack_require__(5);
	var requestBase = __webpack_require__(6);
	var isObject = __webpack_require__(7);

	/**
	 * Noop.
	 */

	function noop() {};

	/**
	 * Expose `request`.
	 */

	var request = module.exports = __webpack_require__(8).bind(null, Request);

	/**
	 * Determine XHR.
	 */

	request.getXHR = function () {
	  if (root.XMLHttpRequest && (!root.location || 'file:' != root.location.protocol || !root.ActiveXObject)) {
	    return new XMLHttpRequest();
	  } else {
	    try {
	      return new ActiveXObject('Microsoft.XMLHTTP');
	    } catch (e) {}
	    try {
	      return new ActiveXObject('Msxml2.XMLHTTP.6.0');
	    } catch (e) {}
	    try {
	      return new ActiveXObject('Msxml2.XMLHTTP.3.0');
	    } catch (e) {}
	    try {
	      return new ActiveXObject('Msxml2.XMLHTTP');
	    } catch (e) {}
	  }
	  throw Error("Browser-only verison of superagent could not find XHR");
	};

	/**
	 * Removes leading and trailing whitespace, added to support IE.
	 *
	 * @param {String} s
	 * @return {String}
	 * @api private
	 */

	var trim = ''.trim ? function (s) {
	  return s.trim();
	} : function (s) {
	  return s.replace(/(^\s*|\s*$)/g, '');
	};

	/**
	 * Serialize the given `obj`.
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api private
	 */

	function serialize(obj) {
	  if (!isObject(obj)) return obj;
	  var pairs = [];
	  for (var key in obj) {
	    pushEncodedKeyValuePair(pairs, key, obj[key]);
	  }
	  return pairs.join('&');
	}

	/**
	 * Helps 'serialize' with serializing arrays.
	 * Mutates the pairs array.
	 *
	 * @param {Array} pairs
	 * @param {String} key
	 * @param {Mixed} val
	 */

	function pushEncodedKeyValuePair(pairs, key, val) {
	  if (val != null) {
	    if (Array.isArray(val)) {
	      val.forEach(function (v) {
	        pushEncodedKeyValuePair(pairs, key, v);
	      });
	    } else if (isObject(val)) {
	      for (var subkey in val) {
	        pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
	      }
	    } else {
	      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
	    }
	  } else if (val === null) {
	    pairs.push(encodeURIComponent(key));
	  }
	}

	/**
	 * Expose serialization method.
	 */

	request.serializeObject = serialize;

	/**
	 * Parse the given x-www-form-urlencoded `str`.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function parseString(str) {
	  var obj = {};
	  var pairs = str.split('&');
	  var pair;
	  var pos;

	  for (var i = 0, len = pairs.length; i < len; ++i) {
	    pair = pairs[i];
	    pos = pair.indexOf('=');
	    if (pos == -1) {
	      obj[decodeURIComponent(pair)] = '';
	    } else {
	      obj[decodeURIComponent(pair.slice(0, pos))] = decodeURIComponent(pair.slice(pos + 1));
	    }
	  }

	  return obj;
	}

	/**
	 * Expose parser.
	 */

	request.parseString = parseString;

	/**
	 * Default MIME type map.
	 *
	 *     superagent.types.xml = 'application/xml';
	 *
	 */

	request.types = {
	  html: 'text/html',
	  json: 'application/json',
	  xml: 'application/xml',
	  urlencoded: 'application/x-www-form-urlencoded',
	  'form': 'application/x-www-form-urlencoded',
	  'form-data': 'application/x-www-form-urlencoded'
	};

	/**
	 * Default serialization map.
	 *
	 *     superagent.serialize['application/xml'] = function(obj){
	 *       return 'generated xml here';
	 *     };
	 *
	 */

	request.serialize = {
	  'application/x-www-form-urlencoded': serialize,
	  'application/json': JSON.stringify
	};

	/**
	 * Default parsers.
	 *
	 *     superagent.parse['application/xml'] = function(str){
	 *       return { object parsed from str };
	 *     };
	 *
	 */

	request.parse = {
	  'application/x-www-form-urlencoded': parseString,
	  'application/json': JSON.parse
	};

	/**
	 * Parse the given header `str` into
	 * an object containing the mapped fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function parseHeader(str) {
	  var lines = str.split(/\r?\n/);
	  var fields = {};
	  var index;
	  var line;
	  var field;
	  var val;

	  lines.pop(); // trailing CRLF

	  for (var i = 0, len = lines.length; i < len; ++i) {
	    line = lines[i];
	    index = line.indexOf(':');
	    field = line.slice(0, index).toLowerCase();
	    val = trim(line.slice(index + 1));
	    fields[field] = val;
	  }

	  return fields;
	}

	/**
	 * Check if `mime` is json or has +json structured syntax suffix.
	 *
	 * @param {String} mime
	 * @return {Boolean}
	 * @api private
	 */

	function isJSON(mime) {
	  return (/[\/+]json\b/.test(mime)
	  );
	}

	/**
	 * Return the mime type for the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */

	function type(str) {
	  return str.split(/ *; */).shift();
	};

	/**
	 * Return header field parameters.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function params(str) {
	  return str.split(/ *; */).reduce(function (obj, str) {
	    var parts = str.split(/ *= */),
	        key = parts.shift(),
	        val = parts.shift();

	    if (key && val) obj[key] = val;
	    return obj;
	  }, {});
	};

	/**
	 * Initialize a new `Response` with the given `xhr`.
	 *
	 *  - set flags (.ok, .error, etc)
	 *  - parse header
	 *
	 * Examples:
	 *
	 *  Aliasing `superagent` as `request` is nice:
	 *
	 *      request = superagent;
	 *
	 *  We can use the promise-like API, or pass callbacks:
	 *
	 *      request.get('/').end(function(res){});
	 *      request.get('/', function(res){});
	 *
	 *  Sending data can be chained:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' })
	 *        .end(function(res){});
	 *
	 *  Or passed to `.send()`:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' }, function(res){});
	 *
	 *  Or passed to `.post()`:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' })
	 *        .end(function(res){});
	 *
	 * Or further reduced to a single call for simple cases:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' }, function(res){});
	 *
	 * @param {XMLHTTPRequest} xhr
	 * @param {Object} options
	 * @api private
	 */

	function Response(req, options) {
	  options = options || {};
	  this.req = req;
	  this.xhr = this.req.xhr;
	  // responseText is accessible only if responseType is '' or 'text' and on older browsers
	  this.text = this.req.method != 'HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text') || typeof this.xhr.responseType === 'undefined' ? this.xhr.responseText : null;
	  this.statusText = this.req.xhr.statusText;
	  this._setStatusProperties(this.xhr.status);
	  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
	  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
	  // getResponseHeader still works. so we get content-type even if getting
	  // other headers fails.
	  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
	  this._setHeaderProperties(this.header);
	  this.body = this.req.method != 'HEAD' ? this._parseBody(this.text ? this.text : this.xhr.response) : null;
	}

	/**
	 * Get case-insensitive `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */

	Response.prototype.get = function (field) {
	  return this.header[field.toLowerCase()];
	};

	/**
	 * Set header related properties:
	 *
	 *   - `.type` the content type without params
	 *
	 * A response of "Content-Type: text/plain; charset=utf-8"
	 * will provide you with a `.type` of "text/plain".
	 *
	 * @param {Object} header
	 * @api private
	 */

	Response.prototype._setHeaderProperties = function (header) {
	  // content-type
	  var ct = this.header['content-type'] || '';
	  this.type = type(ct);

	  // params
	  var obj = params(ct);
	  for (var key in obj) {
	    this[key] = obj[key];
	  }
	};

	/**
	 * Parse the given body `str`.
	 *
	 * Used for auto-parsing of bodies. Parsers
	 * are defined on the `superagent.parse` object.
	 *
	 * @param {String} str
	 * @return {Mixed}
	 * @api private
	 */

	Response.prototype._parseBody = function (str) {
	  var parse = request.parse[this.type];
	  if (!parse && isJSON(this.type)) {
	    parse = request.parse['application/json'];
	  }
	  return parse && str && (str.length || str instanceof Object) ? parse(str) : null;
	};

	/**
	 * Set flags such as `.ok` based on `status`.
	 *
	 * For example a 2xx response will give you a `.ok` of __true__
	 * whereas 5xx will be __false__ and `.error` will be __true__. The
	 * `.clientError` and `.serverError` are also available to be more
	 * specific, and `.statusType` is the class of error ranging from 1..5
	 * sometimes useful for mapping respond colors etc.
	 *
	 * "sugar" properties are also defined for common cases. Currently providing:
	 *
	 *   - .noContent
	 *   - .badRequest
	 *   - .unauthorized
	 *   - .notAcceptable
	 *   - .notFound
	 *
	 * @param {Number} status
	 * @api private
	 */

	Response.prototype._setStatusProperties = function (status) {
	  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
	  if (status === 1223) {
	    status = 204;
	  }

	  var type = status / 100 | 0;

	  // status / class
	  this.status = this.statusCode = status;
	  this.statusType = type;

	  // basics
	  this.info = 1 == type;
	  this.ok = 2 == type;
	  this.clientError = 4 == type;
	  this.serverError = 5 == type;
	  this.error = 4 == type || 5 == type ? this.toError() : false;

	  // sugar
	  this.accepted = 202 == status;
	  this.noContent = 204 == status;
	  this.badRequest = 400 == status;
	  this.unauthorized = 401 == status;
	  this.notAcceptable = 406 == status;
	  this.notFound = 404 == status;
	  this.forbidden = 403 == status;
	};

	/**
	 * Return an `Error` representative of this response.
	 *
	 * @return {Error}
	 * @api public
	 */

	Response.prototype.toError = function () {
	  var req = this.req;
	  var method = req.method;
	  var url = req.url;

	  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
	  var err = new Error(msg);
	  err.status = this.status;
	  err.method = method;
	  err.url = url;

	  return err;
	};

	/**
	 * Expose `Response`.
	 */

	request.Response = Response;

	/**
	 * Initialize a new `Request` with the given `method` and `url`.
	 *
	 * @param {String} method
	 * @param {String} url
	 * @api public
	 */

	function Request(method, url) {
	  var self = this;
	  this._query = this._query || [];
	  this.method = method;
	  this.url = url;
	  this.header = {}; // preserves header name case
	  this._header = {}; // coerces header names to lowercase
	  this.on('end', function () {
	    var err = null;
	    var res = null;

	    try {
	      res = new Response(self);
	    } catch (e) {
	      err = new Error('Parser is unable to parse the response');
	      err.parse = true;
	      err.original = e;
	      // issue #675: return the raw response if the response parsing fails
	      err.rawResponse = self.xhr && self.xhr.responseText ? self.xhr.responseText : null;
	      // issue #876: return the http status code if the response parsing fails
	      err.statusCode = self.xhr && self.xhr.status ? self.xhr.status : null;
	      return self.callback(err);
	    }

	    self.emit('response', res);

	    var new_err;
	    try {
	      if (res.status < 200 || res.status >= 300) {
	        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
	        new_err.original = err;
	        new_err.response = res;
	        new_err.status = res.status;
	      }
	    } catch (e) {
	      new_err = e; // #985 touching res may cause INVALID_STATE_ERR on old Android
	    }

	    // #1000 don't catch errors from the callback to avoid double calling it
	    if (new_err) {
	      self.callback(new_err, res);
	    } else {
	      self.callback(null, res);
	    }
	  });
	}

	/**
	 * Mixin `Emitter` and `requestBase`.
	 */

	Emitter(Request.prototype);
	for (var key in requestBase) {
	  Request.prototype[key] = requestBase[key];
	}

	/**
	 * Set Content-Type to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.xml = 'application/xml';
	 *
	 *      request.post('/')
	 *        .type('xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 *      request.post('/')
	 *        .type('application/xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 * @param {String} type
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.type = function (type) {
	  this.set('Content-Type', request.types[type] || type);
	  return this;
	};

	/**
	 * Set responseType to `val`. Presently valid responseTypes are 'blob' and
	 * 'arraybuffer'.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .responseType('blob')
	 *        .end(callback);
	 *
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.responseType = function (val) {
	  this._responseType = val;
	  return this;
	};

	/**
	 * Set Accept to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.json = 'application/json';
	 *
	 *      request.get('/agent')
	 *        .accept('json')
	 *        .end(callback);
	 *
	 *      request.get('/agent')
	 *        .accept('application/json')
	 *        .end(callback);
	 *
	 * @param {String} accept
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.accept = function (type) {
	  this.set('Accept', request.types[type] || type);
	  return this;
	};

	/**
	 * Set Authorization field value with `user` and `pass`.
	 *
	 * @param {String} user
	 * @param {String} pass
	 * @param {Object} options with 'type' property 'auto' or 'basic' (default 'basic')
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.auth = function (user, pass, options) {
	  if (!options) {
	    options = {
	      type: 'basic'
	    };
	  }

	  switch (options.type) {
	    case 'basic':
	      var str = btoa(user + ':' + pass);
	      this.set('Authorization', 'Basic ' + str);
	      break;

	    case 'auto':
	      this.username = user;
	      this.password = pass;
	      break;
	  }
	  return this;
	};

	/**
	* Add query-string `val`.
	*
	* Examples:
	*
	*   request.get('/shoes')
	*     .query('size=10')
	*     .query({ color: 'blue' })
	*
	* @param {Object|String} val
	* @return {Request} for chaining
	* @api public
	*/

	Request.prototype.query = function (val) {
	  if ('string' != typeof val) val = serialize(val);
	  if (val) this._query.push(val);
	  return this;
	};

	/**
	 * Queue the given `file` as an attachment to the specified `field`,
	 * with optional `filename`.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} field
	 * @param {Blob|File} file
	 * @param {String} filename
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.attach = function (field, file, filename) {
	  this._getFormData().append(field, file, filename || file.name);
	  return this;
	};

	Request.prototype._getFormData = function () {
	  if (!this._formData) {
	    this._formData = new root.FormData();
	  }
	  return this._formData;
	};

	/**
	 * Invoke the callback with `err` and `res`
	 * and handle arity check.
	 *
	 * @param {Error} err
	 * @param {Response} res
	 * @api private
	 */

	Request.prototype.callback = function (err, res) {
	  var fn = this._callback;
	  this.clearTimeout();
	  fn(err, res);
	};

	/**
	 * Invoke callback with x-domain error.
	 *
	 * @api private
	 */

	Request.prototype.crossDomainError = function () {
	  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
	  err.crossDomain = true;

	  err.status = this.status;
	  err.method = this.method;
	  err.url = this.url;

	  this.callback(err);
	};

	/**
	 * Invoke callback with timeout error.
	 *
	 * @api private
	 */

	Request.prototype._timeoutError = function () {
	  var timeout = this._timeout;
	  var err = new Error('timeout of ' + timeout + 'ms exceeded');
	  err.timeout = timeout;
	  this.callback(err);
	};

	/**
	 * Compose querystring to append to req.url
	 *
	 * @api private
	 */

	Request.prototype._appendQueryString = function () {
	  var query = this._query.join('&');
	  if (query) {
	    this.url += ~this.url.indexOf('?') ? '&' + query : '?' + query;
	  }
	};

	/**
	 * Initiate request, invoking callback `fn(res)`
	 * with an instanceof `Response`.
	 *
	 * @param {Function} fn
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.end = function (fn) {
	  var self = this;
	  var xhr = this.xhr = request.getXHR();
	  var timeout = this._timeout;
	  var data = this._formData || this._data;

	  // store callback
	  this._callback = fn || noop;

	  // state change
	  xhr.onreadystatechange = function () {
	    if (4 != xhr.readyState) return;

	    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
	    // result in the error "Could not complete the operation due to error c00c023f"
	    var status;
	    try {
	      status = xhr.status;
	    } catch (e) {
	      status = 0;
	    }

	    if (0 == status) {
	      if (self.timedout) return self._timeoutError();
	      if (self._aborted) return;
	      return self.crossDomainError();
	    }
	    self.emit('end');
	  };

	  // progress
	  var handleProgress = function handleProgress(e) {
	    if (e.total > 0) {
	      e.percent = e.loaded / e.total * 100;
	    }
	    e.direction = 'download';
	    self.emit('progress', e);
	  };
	  if (this.hasListeners('progress')) {
	    xhr.onprogress = handleProgress;
	  }
	  try {
	    if (xhr.upload && this.hasListeners('progress')) {
	      xhr.upload.onprogress = handleProgress;
	    }
	  } catch (e) {}
	  // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
	  // Reported here:
	  // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context


	  // timeout
	  if (timeout && !this._timer) {
	    this._timer = setTimeout(function () {
	      self.timedout = true;
	      self.abort();
	    }, timeout);
	  }

	  // querystring
	  this._appendQueryString();

	  // initiate request
	  if (this.username && this.password) {
	    xhr.open(this.method, this.url, true, this.username, this.password);
	  } else {
	    xhr.open(this.method, this.url, true);
	  }

	  // CORS
	  if (this._withCredentials) xhr.withCredentials = true;

	  // body
	  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
	    // serialize stuff
	    var contentType = this._header['content-type'];
	    var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
	    if (!serialize && isJSON(contentType)) serialize = request.serialize['application/json'];
	    if (serialize) data = serialize(data);
	  }

	  // set header fields
	  for (var field in this.header) {
	    if (null == this.header[field]) continue;
	    xhr.setRequestHeader(field, this.header[field]);
	  }

	  if (this._responseType) {
	    xhr.responseType = this._responseType;
	  }

	  // send stuff
	  this.emit('request', this);

	  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
	  // We need null here if data is undefined
	  xhr.send(typeof data !== 'undefined' ? data : null);
	  return this;
	};

	/**
	 * Expose `Request`.
	 */

	request.Request = Request;

	/**
	 * GET `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.get = function (url, data, fn) {
	  var req = request('GET', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.query(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * HEAD `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.head = function (url, data, fn) {
	  var req = request('HEAD', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * OPTIONS query to `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.options = function (url, data, fn) {
	  var req = request('OPTIONS', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * DELETE `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	function del(url, fn) {
	  var req = request('DELETE', url);
	  if (fn) req.end(fn);
	  return req;
	};

	request['del'] = del;
	request['delete'] = del;

	/**
	 * PATCH `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} [data]
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.patch = function (url, data, fn) {
	  var req = request('PATCH', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * POST `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} [data]
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.post = function (url, data, fn) {
	  var req = request('POST', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * PUT `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.put = function (url, data, fn) {
	  var req = request('PUT', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Expose `Emitter`.
	 */

	if (true) {
	  module.exports = Emitter;
	}

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function (event, fn) {
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function (event) {
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1),
	      callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function (event) {
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function (event) {
	  return !!this.listeners(event).length;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Module of mixed-in functions shared between node and client code
	 */
	var isObject = __webpack_require__(7);

	/**
	 * Clear previous timeout.
	 *
	 * @return {Request} for chaining
	 * @api public
	 */

	exports.clearTimeout = function _clearTimeout() {
	  this._timeout = 0;
	  clearTimeout(this._timer);
	  return this;
	};

	/**
	 * Override default response body parser
	 *
	 * This function will be called to convert incoming data into request.body
	 *
	 * @param {Function}
	 * @api public
	 */

	exports.parse = function parse(fn) {
	  this._parser = fn;
	  return this;
	};

	/**
	 * Override default request body serializer
	 *
	 * This function will be called to convert data set via .send or .attach into payload to send
	 *
	 * @param {Function}
	 * @api public
	 */

	exports.serialize = function serialize(fn) {
	  this._serializer = fn;
	  return this;
	};

	/**
	 * Set timeout to `ms`.
	 *
	 * @param {Number} ms
	 * @return {Request} for chaining
	 * @api public
	 */

	exports.timeout = function timeout(ms) {
	  this._timeout = ms;
	  return this;
	};

	/**
	 * Promise support
	 *
	 * @param {Function} resolve
	 * @param {Function} reject
	 * @return {Request}
	 */

	exports.then = function then(resolve, reject) {
	  if (!this._fullfilledPromise) {
	    var self = this;
	    this._fullfilledPromise = new Promise(function (innerResolve, innerReject) {
	      self.end(function (err, res) {
	        if (err) innerReject(err);else innerResolve(res);
	      });
	    });
	  }
	  return this._fullfilledPromise.then(resolve, reject);
	};

	/**
	 * Allow for extension
	 */

	exports.use = function use(fn) {
	  fn(this);
	  return this;
	};

	/**
	 * Get request header `field`.
	 * Case-insensitive.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */

	exports.get = function (field) {
	  return this._header[field.toLowerCase()];
	};

	/**
	 * Get case-insensitive header `field` value.
	 * This is a deprecated internal API. Use `.get(field)` instead.
	 *
	 * (getHeader is no longer used internally by the superagent code base)
	 *
	 * @param {String} field
	 * @return {String}
	 * @api private
	 * @deprecated
	 */

	exports.getHeader = exports.get;

	/**
	 * Set header `field` to `val`, or multiple fields with one object.
	 * Case-insensitive.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .set('Accept', 'application/json')
	 *        .set('X-API-Key', 'foobar')
	 *        .end(callback);
	 *
	 *      req.get('/')
	 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
	 *        .end(callback);
	 *
	 * @param {String|Object} field
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */

	exports.set = function (field, val) {
	  if (isObject(field)) {
	    for (var key in field) {
	      this.set(key, field[key]);
	    }
	    return this;
	  }
	  this._header[field.toLowerCase()] = val;
	  this.header[field] = val;
	  return this;
	};

	/**
	 * Remove header `field`.
	 * Case-insensitive.
	 *
	 * Example:
	 *
	 *      req.get('/')
	 *        .unset('User-Agent')
	 *        .end(callback);
	 *
	 * @param {String} field
	 */
	exports.unset = function (field) {
	  delete this._header[field.toLowerCase()];
	  delete this.header[field];
	  return this;
	};

	/**
	 * Write the field `name` and `val` for "multipart/form-data"
	 * request bodies.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .field('foo', 'bar')
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} name
	 * @param {String|Blob|File|Buffer|fs.ReadStream} val
	 * @return {Request} for chaining
	 * @api public
	 */
	exports.field = function (name, val) {
	  this._getFormData().append(name, val);
	  return this;
	};

	/**
	 * Abort the request, and clear potential timeout.
	 *
	 * @return {Request}
	 * @api public
	 */
	exports.abort = function () {
	  if (this._aborted) {
	    return this;
	  }
	  this._aborted = true;
	  this.xhr && this.xhr.abort(); // browser
	  this.req && this.req.abort(); // node
	  this.clearTimeout();
	  this.emit('abort');
	  return this;
	};

	/**
	 * Enable transmission of cookies with x-domain requests.
	 *
	 * Note that for this to work the origin must not be
	 * using "Access-Control-Allow-Origin" with a wildcard,
	 * and also must set "Access-Control-Allow-Credentials"
	 * to "true".
	 *
	 * @api public
	 */

	exports.withCredentials = function () {
	  // This is browser-only functionality. Node side is no-op.
	  this._withCredentials = true;
	  return this;
	};

	/**
	 * Set the max redirects to `n`. Does noting in browser XHR implementation.
	 *
	 * @param {Number} n
	 * @return {Request} for chaining
	 * @api public
	 */

	exports.redirects = function (n) {
	  this._maxRedirects = n;
	  return this;
	};

	/**
	 * Convert to a plain javascript object (not JSON string) of scalar properties.
	 * Note as this method is designed to return a useful non-this value,
	 * it cannot be chained.
	 *
	 * @return {Object} describing method, url, and data of this request
	 * @api public
	 */

	exports.toJSON = function () {
	  return {
	    method: this.method,
	    url: this.url,
	    data: this._data,
	    headers: this._header
	  };
	};

	/**
	 * Check if `obj` is a host object,
	 * we don't want to serialize these :)
	 *
	 * TODO: future proof, move to compoent land
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	exports._isHost = function _isHost(obj) {
	  var str = {}.toString.call(obj);

	  switch (str) {
	    case '[object File]':
	    case '[object Blob]':
	    case '[object FormData]':
	      return true;
	    default:
	      return false;
	  }
	};

	/**
	 * Send `data` as the request body, defaulting the `.type()` to "json" when
	 * an object is given.
	 *
	 * Examples:
	 *
	 *       // manual json
	 *       request.post('/user')
	 *         .type('json')
	 *         .send('{"name":"tj"}')
	 *         .end(callback)
	 *
	 *       // auto json
	 *       request.post('/user')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // manual x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send('name=tj')
	 *         .end(callback)
	 *
	 *       // auto x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // defaults to x-www-form-urlencoded
	 *      request.post('/user')
	 *        .send('name=tobi')
	 *        .send('species=ferret')
	 *        .end(callback)
	 *
	 * @param {String|Object} data
	 * @return {Request} for chaining
	 * @api public
	 */

	exports.send = function (data) {
	  var obj = isObject(data);
	  var type = this._header['content-type'];

	  // merge
	  if (obj && isObject(this._data)) {
	    for (var key in data) {
	      this._data[key] = data[key];
	    }
	  } else if ('string' == typeof data) {
	    // default to x-www-form-urlencoded
	    if (!type) this.type('form');
	    type = this._header['content-type'];
	    if ('application/x-www-form-urlencoded' == type) {
	      this._data = this._data ? this._data + '&' + data : data;
	    } else {
	      this._data = (this._data || '') + data;
	    }
	  } else {
	    this._data = data;
	  }

	  if (!obj || this._isHost(data)) return this;

	  // default to json
	  if (!type) this.type('json');
	  return this;
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Check if `obj` is an object.
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	function isObject(obj) {
	  return null !== obj && 'object' === (typeof obj === 'undefined' ? 'undefined' : _typeof(obj));
	}

	module.exports = isObject;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	// The node and browser modules expose versions of this with the
	// appropriate constructor function bound as first argument
	/**
	 * Issue a request:
	 *
	 * Examples:
	 *
	 *    request('GET', '/users').end(callback)
	 *    request('/users').end(callback)
	 *    request('/users', callback)
	 *
	 * @param {String} method
	 * @param {String|Function} url or callback
	 * @return {Request}
	 * @api public
	 */

	function request(RequestConstructor, method, url) {
	  // callback
	  if ('function' == typeof url) {
	    return new RequestConstructor('GET', method).end(url);
	  }

	  // url first
	  if (2 == arguments.length) {
	    return new RequestConstructor('GET', method);
	  }

	  return new RequestConstructor(method, url);
	}

	module.exports = request;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter;
	var Link = _ReactRouter.Link;


	var Apicloud = __webpack_require__(3);

	var A = function (_React$Component) {
	    _inherits(A, _React$Component);

	    function A() {
	        _classCallCheck(this, A);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(A).apply(this, arguments));
	    }

	    _createClass(A, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement('li', {
	                className: 'pure-menu-item'
	            }, React.createElement(Link, {
	                className: 'pure-menu-link',
	                to: '/' + this.props.to,
	                activeClassName: 'active'
	            }, this.props.title));
	        }
	    }]);

	    return A;
	}(React.Component);

	var Header = function (_React$Component2) {
	    _inherits(Header, _React$Component2);

	    function Header() {
	        _classCallCheck(this, Header);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Header).call(this));

	        _this2.state = {
	            menu: null
	        };
	        return _this2;
	    }

	    _createClass(Header, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var filter = {
	                where: {
	                    state: 1
	                },
	                order: ['order DESC', 'createdAt DESC'],
	                limit: 20
	            };
	            var that = this;
	            new Promise(function (resolve, reject) {
	                Apicloud.get('menu', filter, function (err, res) {
	                    if (err) {
	                        reject('error');
	                    } else {
	                        var menu = JSON.parse(res.text);
	                        resolve(menu);
	                        that.setState({
	                            menu: menu
	                        });
	                    }
	                });
	            }).then(function (r) {
	                // console.log('Done: ' + r);
	                return new Promise(function (resolve, reject) {
	                    // console.log('calculating');
	                    resolve('2000 OK');
	                });
	            }).then(function (r) {
	                console.log('Done: ' + r);
	            }).catch(function (reason) {
	                console.log('Failed: ' + reason);
	            });
	            // Apicloud.get('menu', filter, function(err, res) {
	            //     let menu = JSON.parse(res.text)
	            //     this.setState({
	            //         menu: menu
	            //     })
	            // }.bind(this))
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var menus = void 0;
	            if (this.state.menu) {
	                menus = this.state.menu.map(function (d, index) {
	                    return React.createElement(A, {
	                        key: index,
	                        to: d.link,
	                        title: d.title
	                    });
	                });
	            }
	            return React.createElement('header', {
	                id: 'header',
	                className: 'pure-u-1 pure-menu pure-menu-horizontal pure-menu-fixed'
	            }, React.createElement(Link, {
	                className: 'pure-menu-heading pure-menu-link left',
	                to: '/'
	            }, '我的理想乡'), React.createElement('ul', {
	                className: 'pure-menu-list left'
	            }, React.createElement(A, {
	                to: 'login',
	                title: 'login'
	            }), React.createElement(A, {
	                to: 'logout',
	                title: 'logout'
	            }), menus));
	        }
	    }]);

	    return Header;
	}(React.Component);

	module.exports = Header;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter;
	var Link = _ReactRouter.Link;


	var Apicloud = __webpack_require__(3);

	var A = function (_React$Component) {
	    _inherits(A, _React$Component);

	    function A() {
	        _classCallCheck(this, A);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(A).apply(this, arguments));
	    }

	    _createClass(A, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement('li', {
	                className: 'pure-menu-item'
	            }, React.createElement(Link, {
	                className: 'pure-menu-link',
	                to: '/' + this.props.to,
	                activeClassName: 'active'
	            }, React.createElement("i", {
	                className: this.props.icon || 'fa fa-home'
	            }), React.createElement("span", {}, this.props.title)), this.props.children);
	        }
	    }]);

	    return A;
	}(React.Component);

	var Children = function (_React$Component2) {
	    _inherits(Children, _React$Component2);

	    function Children() {
	        _classCallCheck(this, Children);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Children).call(this));

	        _this2.state = {
	            data: []
	        };
	        return _this2;
	    }

	    _createClass(Children, [{
	        key: '_onClick',
	        value: function _onClick(e) {
	            this.setState({
	                curl: e.currentTarget.id
	            });
	            e.preventDefault();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var list = void 0;
	            var lists = this.props.data.lists;
	            if (lists) {
	                return React.createElement("ul", {
	                    className: 'pure-menu-sub'
	                }, lists.map(function (d, index) {
	                    return React.createElement(A, {
	                        key: index,
	                        to: 'api/' + d.curl,
	                        title: d.title,
	                        icon: d.icon
	                    }, React.createElement(Children, {
	                        data: d
	                    }));
	                }.bind(this)));
	            } else {
	                return null;
	            }
	        }
	    }]);

	    return Children;
	}(React.Component);

	var Sidebar = function (_React$Component3) {
	    _inherits(Sidebar, _React$Component3);

	    function Sidebar() {
	        _classCallCheck(this, Sidebar);

	        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Sidebar).call(this));

	        _this3.state = {
	            menu: []
	        };
	        return _this3;
	    }

	    _createClass(Sidebar, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var filter = {
	                where: {
	                    state: 1
	                },
	                order: ['order DESC', 'createdAt DESC'],
	                limit: 20
	            };
	            Apicloud.get('menu', filter, function (err, res) {
	                var menu = JSON.parse(res.text);
	                this.setState({
	                    menu2: menu
	                });
	            }.bind(this));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var menus = void 0;
	            if (this.state.menu) {
	                menus = this.state.menu.map(function (d, index) {
	                    return React.createElement(A, {
	                        key: index,
	                        to: 'api/' + d.curl,
	                        title: d.title,
	                        icon: d.icon
	                    }, React.createElement(Children, {
	                        data: d
	                    }));
	                });
	            }
	            var menus2 = void 0;
	            if (this.state.menu2) {
	                menus = this.state.menu2.map(function (d, index) {
	                    return React.createElement(A, {
	                        key: index,
	                        to: d.link,
	                        title: d.title
	                    });
	                });
	            }
	            return React.createElement('aside', {
	                id: 'sidebar',
	                className: 'pure-u-1 pure-menu sidebar'
	            }, React.createElement(Link, {
	                className: 'pure-menu-heading pure-menu-link',
	                to: '/'
	            }, '我的理想乡'), React.createElement('ul', {
	                className: 'pure-menu-list'
	            }, React.createElement(A, {
	                to: 'drag',
	                title: 'drag'
	            }), React.createElement(A, {
	                to: 'import',
	                title: 'import'
	            }), menus, menus2));
	        }
	    }]);

	    return Sidebar;
	}(React.Component);

	module.exports = Sidebar;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ApiStore = __webpack_require__(12);

	var Footer = function (_React$Component) {
	    _inherits(Footer, _React$Component);

	    function Footer(props) {
	        _classCallCheck(this, Footer);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Footer).call(this, props));

	        _this.state = {
	            info: {}
	        };
	        return _this;
	    }

	    _createClass(Footer, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            ApiStore.get('acman/zhaiyanapi/tcrand?fangfa=json', function (err, res) {
	                var data = JSON.parse(res.text);
	                this.setState({
	                    info: data
	                });
	            }.bind(this));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement('footer', {
	                id: 'footer',
	                className: 'footer pure-u-1'
	            }, this.state.info.taici, '—— ', this.state.info.source);
	        }
	    }]);

	    return Footer;
	}(React.Component);

	module.exports = Footer;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var request = __webpack_require__(4);
	var AppUrl = 'http://apis.baidu.com/';
	var apikey = 'c01ea8775f1c2620b7dd6f5b6bcec93b';
	var get = function get(url, cb) {
	    if (window.navigator.onLine == true) {
	        request.get(AppUrl + url).set('apikey', apikey).end(cb);
	    } else {
	        console.log('网络出现故障！');
	    }
	};

	var post = function post(url, info, cb) {
	    console.log(window.navigator.onLine);
	    if (window.navigator.onLine == true) {
	        var now = Date.now();
	        var key = SHA1(AppId + 'UZ' + AppKey + 'UZ' + now) + "." + now;
	        request.post(AppUrl + url).set('X-APICloud-AppId', AppId).set('X-APICloud-AppKey', key).send(info).end(cb);
	    } else {
	        console.log('网络出现故障！');
	    }
	};
	var ApiStore = {
	    get: get,
	    post: post
	};
	module.exports = ApiStore;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Nomatch = __webpack_require__(14);
	var Home = __webpack_require__(15);
	var Drag = __webpack_require__(16);
	var ApiCloudsIndex = __webpack_require__(17);
	var ApiClouds = __webpack_require__(18);
	var ApiCloud = __webpack_require__(19);
	var Pages = __webpack_require__(39);
	var Page = __webpack_require__(40);
	var Login = __webpack_require__(41);
	var Logout = __webpack_require__(42);
	var Import = __webpack_require__(43);

	var Temp = {
	    Nomatch: Nomatch,
	    Home: Home,
	    Drag: Drag,
	    ApiCloudsIndex: ApiCloudsIndex,
	    ApiClouds: ApiClouds,
	    ApiCloud: ApiCloud,
	    Pages: Pages,
	    Page: Page,
	    Login: Login,
	    Logout: Logout,
	    Import: Import
	};
	module.exports = Temp;

/***/ },
/* 14 */
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

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Nomatch).call(this));
	    }

	    _createClass(Nomatch, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement('h3', null, 'Nomatch');
	        }
	    }]);

	    return Nomatch;
	}(React.Component);

	module.exports = Nomatch;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	var Home = React.createClass({
	    displayName: 'Home',

	    getInitialState: function getInitialState() {
	        return {
	            items: ['hello', 'world', 'click', 'me']
	        };
	    },
	    componentDidMount: function componentDidMount() {},
	    handleSelect: function handleSelect(data) {
	        console.log(data); // Momentjs object
	        console.log(data.format('YYYY-MM-D HH d')); // Momentjs object
	    },
	    updateHtml: function updateHtml(html) {
	        this.setState({
	            html: html
	        });
	    },
	    render: function render() {
	        return React.createElement('div', {
	            className: 'container pure-g'
	        }, React.createElement('div', {
	            className: 'pure-u-1'
	        }));
	    }
	});

	module.exports = Home;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

	var placeholder = document.createElement("div");
	placeholder.className = "placeholder";
	var Drag = React.createClass({
	    displayName: "Drag",

	    getInitialState: function getInitialState() {
	        return {
	            items: ['hello', 'world', 'click', 'me']
	        };
	    },
	    handleAdd: function handleAdd() {
	        // var name = prompt("Please enter your name", "")
	        var add = 'add:' + Math.random();
	        var newItems = this.state.items.concat([add]);
	        this.setState({
	            items: newItems
	        });
	    },
	    handleRemove: function handleRemove(i) {
	        var newItems = this.state.items;
	        newItems.splice(i, 1);
	        this.setState({
	            items: newItems
	        });
	    },
	    dragStart: function dragStart(e) {
	        this.dragged = e.currentTarget;
	        e.dataTransfer.effectAllowed = 'move';
	        // // Firefox requires dataTransfer data to be set
	        e.dataTransfer.setData("text/html", e.currentTarget);
	    },
	    dragEnd: function dragEnd(e) {
	        this.dragged.style.display = "block";
	        this.dragged.parentNode.removeChild(placeholder);
	        // Update data
	        var items = this.state.items;
	        var from = Number(this.dragged.dataset.id);
	        var to = Number(this.over.dataset.id);
	        if (from < to) to--;
	        if (this.nodePlacement == "after") to++;
	        items.splice(to, 0, items.splice(from, 1)[0]);
	        this.setState({
	            items: items
	        });
	    },
	    dragOver: function dragOver(e) {
	        e.preventDefault();
	        this.dragged.style.display = "none";
	        if (e.target.className == "placeholder") return;
	        this.over = e.target;
	        // Inside the dragOver method
	        var relY = e.clientY - this.over.offsetTop;
	        var height = this.over.offsetHeight / 2;
	        var parent = e.target.parentNode;
	        if (relY > height) {
	            this.nodePlacement = "after";
	            parent.insertBefore(placeholder, e.target.nextElementSibling);
	        } else if (relY < height) {
	            this.nodePlacement = "before";
	            parent.insertBefore(placeholder, e.target);
	        }
	    },
	    handleSelect: function handleSelect(date) {
	        console.log(date); // Momentjs object
	    },
	    render: function render() {
	        var items = this.state.items.map(function (item, i) {
	            return React.createElement('div', {
	                key: item,
	                className: "item",
	                onClick: this.handleRemove.bind(this, i),
	                'data-id': i,
	                draggable: true,
	                onDragEnd: this.dragEnd,
	                onDragStart: this.dragStart
	            }, item);
	        }.bind(this));
	        return React.createElement('div', {
	            className: 'container pure-g'
	        }, React.createElement('div', {
	            className: 'pure-u-1'
	        }, React.createElement('h3', null, 'Hello, world2!'), React.createElement('button', {
	            onClick: this.handleAdd
	        }, 'Add Item'), React.createElement(ReactCSSTransitionGroup, {
	            transitionName: 'example',
	            transitionEnter: false,
	            onDragOver: this.dragOver
	            // transitionLeave: false
	        }, items)));
	    }
	});

	module.exports = Drag;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	var ApiCloudsIndex = React.createClass({
	    displayName: 'ApiCloudsIndex',

	    render: function render() {
	        return React.createElement('a', {
	            className: 'pure-menu-heading pure-menu-link left'
	        }, 'ApiCloudsIndex');
	    }
	});

	module.exports = ApiCloudsIndex;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Link = ReactRouter.Link;
	var Apicloud = __webpack_require__(3);
	var ApiClouds = React.createClass({
	    displayName: 'ApiClouds',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            article: {
	                title: '文章管理',
	                thead: ['id', '标题', '状态', '操作'],
	                tbody: ['title', 'state']
	            },
	            menu: {
	                title: '菜单管理',
	                thead: ['id', '菜单名称', '排序', '状态', '操作'],
	                tbody: ['title', 'order', 'state']
	            },
	            model: {
	                title: '模块字段管理',
	                thead: ['id', '菜单名称', '所属模块', '排序', '状态', '操作'],
	                tbody: ['title', 'model', 'order', 'state']
	            },
	            title: '+45689'
	        };
	    },
	    componentWillMount: function componentWillMount() {
	        var clouds = this.props.params.clouds;
	        this.setState({
	            table: this.props[clouds]
	        });
	    },
	    componentDidMount: function componentDidMount() {
	        this._req(this.props);
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        if (nextProps.location.pathname !== this.state.hash || nextProps.location.search !== this.state.search) {
	            this._req(nextProps);
	        }
	    },
	    _req: function _req(props) {
	        var action = props.params.clouds;
	        var title = this.props[action] ? this.props[action].title : '田恩仲开发设计';
	        ConfigActions.update('title', title);
	        var where = {};
	        var $_GET = get(props.location.search);
	        extend(where, $_GET);
	        delete where['_k'];
	        var rep = {};
	        extend(where, rep, true);
	        var filter = {
	            where: where,
	            order: ['model DESC', 'order DESC', 'createdAt DESC'],
	            limit: $_GET['limit'] ? parseInt($_GET['limit']) : 20,
	            skip: $_GET['skip'] ? parseInt($_GET['skip']) : 0
	        };
	        Apicloud.get(props.params.clouds, filter, function (err, res) {
	            if (err) {
	                ConfigActions.msg(res.status + 'error');
	            } else {
	                var data = JSON.parse(res.text);
	                if (data.res == 404) {
	                    ConfigActions.update('title', data.msg);
	                    this.setState({
	                        hash: props.location.pathname,
	                        search: props.location.search,
	                        title: data.msg,
	                        table: props[action]
	                    });
	                    return;
	                }
	                this.setState({
	                    hash: props.location.pathname,
	                    search: props.location.search,
	                    info: data,
	                    table: props[action]
	                });
	            }
	        }.bind(this));
	    },
	    render: function render() {
	        var thead = void 0;
	        if (this.state.table.thead) {
	            thead = this.state.table.thead.map(function (d, index) {
	                return React.createElement('th', {
	                    key: index
	                }, d);
	            });
	        }
	        var lists = void 0;
	        if (this.state.info) {
	            lists = this.state.info.map(function (d, index) {
	                var curl = '/apicloud/' + this.props.params.clouds + '/' + d.id;
	                return React.createElement('tr', {
	                    className: index % 2 == 0 ? 'pure-table-odd' : '',
	                    key: index
	                }, React.createElement('td', {}, '#'), this.state.table.tbody.map(function (t, i) {
	                    return React.createElement('td', {
	                        key: i
	                    }, d[t]);
	                }), React.createElement('td', {}, React.createElement(Link, {
	                    to: curl
	                }, '编辑')));
	            }.bind(this));
	        }
	        return React.createElement('section', {
	            className: 'warp'
	        }, React.createElement('section', {
	            className: 'pure-g'
	        }, React.createElement('h3', {
	            className: 'pure-u-1'
	        }, this.state.table.title), React.createElement('div', {
	            className: 'pure-u-1 filter'
	        }, React.createElement('a', {
	            className: 'pure-menu-link'
	        }, '筛选'), React.createElement(Link, {
	            to: '/apicloud/' + this.props.params.clouds,
	            className: 'pure-menu-link',
	            activeClassName: 'active'
	        }, '全部'), React.createElement(Link, {
	            to: '/apicloud/' + this.props.params.clouds,
	            className: 'pure-menu-link',
	            activeClassName: 'active',
	            query: {
	                state: 1
	            }
	        }, '正常'), React.createElement(Link, {
	            to: '/apicloud/' + this.props.params.clouds,
	            className: 'pure-menu-link',
	            activeClassName: 'active',
	            query: {
	                state: 0
	            }
	        }, '删除')), React.createElement('div', {
	            className: 'pure-u-1'
	        }, React.createElement('table', {
	            className: 'pure-table',
	            style: {
	                width: "100%"
	            }
	        }, React.createElement('thead', {}, React.createElement('tr', {}, thead)), React.createElement('tbody', {
	            id: 'uid'
	        }, lists)))));
	    }
	});

	module.exports = ApiClouds;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Apicloud = __webpack_require__(3);

	var _require = __webpack_require__(20);

	var Form = _require.Form;
	var Input = _require.Input;
	var Textarea = _require.Textarea;
	var Radio = _require.Radio;
	var Checkbox = _require.Checkbox;
	var Upload = _require.Upload;
	var Range = _require.Range;
	var Button = _require.Button;
	var Hidden = _require.Hidden;

	var ApiCloud = React.createClass({
	    displayName: 'ApiCloud',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            article: '文章',
	            menu: '菜单',
	            model: '字段'
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            info: null
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        this._req(this.props);
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        if (nextProps.location.pathname !== this.state.hash) {
	            this._req(nextProps);
	        }
	    },
	    _req: function _req(props) {
	        var action = props.params.clouds;
	        var title = this.props[action] ? this.props[action] : '田恩仲开发设计';
	        var articleId = props.params.articleId;

	        var where = {
	            state: 1
	        };
	        var $_GET = get(props.location.search);
	        extend(where, $_GET);
	        delete where['_k'];
	        var rep = {
	            model: props.params.clouds
	        };
	        extend(where, rep, true);
	        var filter = {
	            where: where,
	            order: ['order DESC', 'createdAt DESC'],
	            limit: $_GET['limit'] ? parseInt($_GET['limit']) : 100
	        };
	        Apicloud.get('model', filter, function (err, res) {
	            var _this = this;

	            var model = JSON.parse(res.text);
	            if (articleId !== 'add') {
	                (function () {
	                    action = action + '/' + articleId;
	                    var article = storedb('article').find({ 'id': articleId });
	                    if (article && article.length !== 0) {
	                        article = article[0]['value'];
	                        article._method = 'PUT';
	                        ConfigActions.update('title', article.title + '-编辑' + title);
	                        _this.setState({
	                            hash: props.location.pathname,
	                            model: model,
	                            title: '编辑' + title,
	                            info: article,
	                            action: action,
	                            id: articleId
	                        });
	                    } else {
	                        Apicloud.get(props.params.clouds + '/' + articleId, '', function (err, res) {
	                            article = JSON.parse(res.text);
	                            storedb('article').insert({ 'id': articleId, 'value': article });
	                            article._method = 'PUT';
	                            ConfigActions.update('title', article.title + '-编辑' + title);
	                            this.setState({
	                                hash: props.location.pathname,
	                                model: model,
	                                title: '编辑' + title,
	                                info: article,
	                                action: action,
	                                id: articleId
	                            });
	                        }.bind(_this));
	                    }
	                })();
	            } else {
	                var userId = storedb('user').find()[0].userId;
	                var info = {
	                    userId: userId
	                };
	                ConfigActions.update('title', '新增' + title);
	                this.setState({
	                    hash: props.location.pathname,
	                    model: model,
	                    title: '新增' + title,
	                    action: action,
	                    info: info
	                });
	            }
	        }.bind(this));
	    },
	    _onChange: function _onChange(name, value) {
	        var info = this.state.info;
	        info[name] = value;
	        this.setState({
	            info: info
	        });
	    },
	    _onSubmit: function _onSubmit(data) {
	        ConfigActions.update('title', data.title);
	        ConfigActions.update(data.id, data);
	        if (!this.state.id) {
	            ConfigActions.update('msg', '发布成功！');
	            window.location.href = '/#/apicloud/' + this.props.params.clouds + '/' + data.id;
	        } else {
	            ConfigActions.update('msg', '保存成功！');
	        }
	    },
	    render: function render() {
	        var _this2 = this;

	        var render = void 0;
	        var forms = void 0;
	        var info = this.state.info;
	        var model = this.state.model;
	        if (model) {
	            (function () {
	                var onChange = _this2._onChange;
	                forms = model.map(function (d, index) {
	                    if (info[d.name] || info[d.name] == 0) {
	                        d.value = info[d.name];
	                    } else {
	                        d.value = d.default || '';
	                    }
	                    d.key = d.name;
	                    d.onChange = onChange;
	                    switch (d.type) {
	                        case "text":
	                            return React.createElement(Input, d);
	                            break;
	                        case "password":
	                            return React.createElement(Input, d);
	                            break;
	                        case "email":
	                            return React.createElement(Input, d);
	                            break;
	                        case "textarea":
	                            return React.createElement(Textarea, d);
	                            break;
	                        case "upload":
	                            return React.createElement(Upload, d);
	                            break;
	                        case "image":
	                            return React.createElement(Upload, d);
	                            break;
	                        // case "editer":
	                        //     return (React.createElement(Editer, d))
	                        //     break;
	                        case "radio":
	                            return React.createElement(Radio, d);
	                            break;
	                        case "checkbox":
	                            return React.createElement(Checkbox, d);
	                            break;
	                        case "hidden":
	                            return React.createElement(Hidden, d);
	                            break;
	                        default:
	                            break;
	                    }
	                });
	            })();
	        }
	        if (info) {
	            render = React.createElement('section', {
	                className: 'container'
	            }, React.createElement('h3', null, this.state.title), React.createElement(Form, {
	                action: this.state.action,
	                info: info,
	                legend: this.state.title,
	                onSubmit: this._onSubmit
	            }, forms, React.createElement(Button)));
	        }
	        return React.createElement('section', {
	            className: 'warp'
	        }, render);
	    }
	});

	module.exports = ApiCloud;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Form = __webpack_require__(21);
	var FormGroup = __webpack_require__(24);
	var Input = __webpack_require__(25);
	var Textarea = __webpack_require__(26);
	// const Editer = require('../editer')
	var Canvas = __webpack_require__(27);
	var Upload = __webpack_require__(28);
	var Radio = __webpack_require__(31);
	var Checkbox = __webpack_require__(32);
	var Range = __webpack_require__(33);
	var Button = __webpack_require__(34);
	var Hidden = __webpack_require__(35);
	// const ColorPicker = require('./ColorPicker')
	var Select = __webpack_require__(36);
	var Tab = __webpack_require__(37);
	var Audio = __webpack_require__(38);
	// const {
	//     Calendar,
	//     DateRange
	// } = require('react-date-range')

	var Forms = {
	    Form: Form,
	    FormGroup: FormGroup,
	    Input: Input,
	    Textarea: Textarea,
	    // Editer: Editer,
	    Canvas: Canvas,
	    Upload: Upload,
	    Radio: Radio,
	    Checkbox: Checkbox,
	    Range: Range,
	    Button: Button,
	    Hidden: Hidden,
	    // Calendar: Calendar,
	    // DateRange: DateRange,
	    // ColorPicker: ColorPicker,
	    Select: Select,
	    Tab: Tab,
	    Audio: Audio
	};
	module.exports = Forms;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Apicloud = __webpack_require__(3);
	var classNames = __webpack_require__(22);

	var Form = React.createClass({
	    displayName: 'Form',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            apiSubmit: true
	        };
	    },
	    handleSubmit: function handleSubmit(e) {
	        e.preventDefault();
	        if (this.props.locked) {
	            return;
	        }
	        if (this.props.apiSubmit) {
	            Apicloud.post(this.props.action, this.props.info, function (err, res) {
	                var data = JSON.parse(res.text);
	                console.log(res);
	                if (data.error) {
	                    ConfigActions.update('msg', data.error.message);
	                } else {
	                    this.props.onSubmit(data);
	                }
	            }.bind(this));
	        } else {
	            this.props.onSubmit(e);
	        }
	    },
	    render: function render() {
	        return React.createElement('form', {
	            className: 'form-fields form-horizontal',
	            role: 'form',
	            // encType: 'multipart/form-data',
	            onSubmit: this.handleSubmit
	        }, React.createElement('fieldset', {
	            className: 'form-fieldset'
	        }, React.createElement('legend', {
	            className: 'form-legend'
	        }, this.props.legend), this.props.children));
	    }
	});
	module.exports = Form;

/***/ },
/* 22 */
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
		} else if ("function" === 'function' && _typeof(__webpack_require__(23)) === 'object' && __webpack_require__(23)) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	})();

/***/ },
/* 23 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var classNames = __webpack_require__(22);

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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var classNames = __webpack_require__(22);
	var FormGroup = __webpack_require__(24);

	var Input = React.createClass({
	    displayName: 'Input',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            type: 'text',
	            value: '',
	            autocomplete: 'off',
	            required: 'required'
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            value: this.props.value,
	            help: this.props.help,
	            length: this.props.value.length || 0
	        };
	    },
	    componentWillMount: function componentWillMount() {
	        var length = this.props.value.length || 0;
	        var help = this.props.help || '请输入' + this.props.title;
	        this.setState({
	            help: help
	        });
	    },
	    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	        return nextProps.value !== this.props.value;
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.state = {
	            value: nextProps.value
	        };
	    },
	    _onChange: function _onChange(e) {
	        var error = void 0;
	        var warning = void 0;
	        var success = void 0;
	        var value = e.target.value.replace(/(^\s*)|(\s*$)/, "");
	        var length = value.length;
	        var help = this.props.help || '请输入' + this.props.title;
	        if (length > 0) {
	            if (this.props.min && length < this.props.min) {
	                help = '请输入至少' + this.props.min + '个字符！';
	                error = true;
	            } else if (this.props.max && length > this.props.max) {
	                help = '请输入至多' + this.props.max + '个字符！';
	                error = true;
	            }
	            if (!error) {
	                success = true;
	            }
	        } else if (this.props.required) {
	            help = this.props.title + '必须填写！';
	            warning = true;
	        }
	        this.setState({
	            value: value,
	            help: help,
	            length: length,
	            error: error,
	            warning: warning,
	            success: success
	        });
	        if (this.props.onChange) {
	            this.props.onChange(this.props.name, value);
	        }
	    },
	    render: function render() {
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
	            onChange: this._onChange
	        }));
	    }
	});

	module.exports = Input;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var classNames = __webpack_require__(22);
	var FormGroup = __webpack_require__(24);

	var Textarea = React.createClass({
	    displayName: 'Textarea',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            title: '字段名称',
	            value: '',
	            placeholder: '',
	            help: '',
	            disabled: '',
	            autocomplete: 'off',
	            required: 'required',
	            min: 2,
	            rows: 2
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            value: this.props.value,
	            help: this.props.help,
	            error: false,
	            warning: false,
	            success: false
	        };
	    },
	    componentWillMount: function componentWillMount() {
	        var length = this.props.value.length;
	        var help = this.props.help || '请输入' + this.props.title;
	        this.setState({
	            help: help,
	            length: length
	        });
	    },
	    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	        return nextProps.value !== this.props.value;
	    },
	    _onChange: function _onChange(e) {
	        var error = void 0;
	        var warning = void 0;
	        var success = void 0;
	        var value = e.target.value.replace(/(^\s*)|(\s*$)/, "");
	        var length = value.length;
	        var help = this.props.help || '请输入' + this.props.title;
	        if (length > 0) {
	            if (this.props.min && length < this.props.min) {
	                help = '请输入至少' + this.props.min + '个字符！';
	                error = true;
	            } else if (this.props.max && length > this.props.max) {
	                help = '请输入至多' + this.props.max + '个字符！';
	                error = true;
	            }
	            if (!error) {
	                success = true;
	            }
	        } else if (this.props.required) {
	            help = this.props.title + '必须填写！';
	            warning = true;
	        }
	        this.setState({
	            value: value,
	            help: help,
	            length: length,
	            error: error,
	            warning: warning,
	            success: success
	        });
	        if (this.props.onChange) {
	            this.props.onChange(this.props.name, value);
	        }
	    },
	    onWheel: function onWheel(obj) {
	        console.log(obj);
	        console.log(obj.currentTarget.offsetTop);
	    },
	    onKeyPress: function onKeyPress(obj) {
	        console.log(obj);
	        console.log(obj.nativeEvent.charCode);
	    },
	    onCopy: function onCopy(obj) {
	        console.log(obj);
	    },
	    render: function render() {
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
	            help: this.state.help,
	            onWheel: this.onWheel,
	            onCopy: this.onCopy,
	            onKeyPress: this.onKeyPress
	        }, React.createElement('textarea', {
	            className: 'form-textarea',
	            rows: this.props.rows,
	            placeholder: this.props.placeholder,
	            disabled: this.props.disabled,
	            autoComplete: this.props.autoComplete,
	            value: this.state.value,
	            onChange: this._onChange
	        }));
	    }
	});

	module.exports = Textarea;

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	var Canvas = React.createClass({
	    displayName: 'Canvas',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            width: 200
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            width: this.props.width,
	            height: this.props.height || this.props.width
	        };
	    },
	    render: function render() {
	        return React.createElement('div', {
	            style: {
	                width: this.state.width,
	                height: this.state.height
	            }
	        }, React.createElement('img', {
	            style: {
	                width: this.state.width,
	                height: this.state.height,
	                display: 'block'
	            },
	            src: this.props.src
	        }));
	    }
	});
	module.exports = Canvas;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var classNames = __webpack_require__(22);
	var ajaxUpload = __webpack_require__(29);
	var FormGroup = __webpack_require__(24);
	var Canvas = __webpack_require__(27);

	var _require = __webpack_require__(30);

	var getUpToken = _require.getUpToken;
	var getHash = _require.getHash;


	var Upload = React.createClass({
	    displayName: 'Upload',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            title: '上传图片',
	            value: '',
	            files: [],
	            thumbs: [],
	            multiple: true,
	            help: ''
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            files: this.props.files,
	            thumbs: this.props.thumbs,
	            help: this.props.help,
	            multiple: this.props.multiple,
	            shownum: 0
	        };
	    },
	    componentWillMount: function componentWillMount() {
	        var thumbs = this.props.value;
	        if (thumbs) {
	            thumbs = JSON.parse(thumbs);
	        } else {
	            thumbs = [];
	        }
	        var files = [];
	        var count = thumbs.length;
	        if (count == 0) {
	            return;
	        }
	        if (this.props.multiple) {
	            var i = void 0;
	            for (i = 0; i < count; i++) {
	                var file = [];
	                file.thumb = thumbs[i];
	                file.state = 4;
	                files[i] = file;
	            }
	        } else {
	            var _file = [];
	            var thumb = [];
	            _file.thumb = thumbs[0];
	            _file.state = 4;
	            files[0] = _file;
	            thumb.concat(thumbs[0]);
	            thumbs = thumb;
	        }
	        this.setState({
	            files: files,
	            thumbs: thumbs
	        });
	    },
	    componentDidMount: function componentDidMount() {},
	    componentDidUpdate: function componentDidUpdate() {},
	    _onChange: function _onChange(e) {
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
	    },
	    uploadFile: function uploadFile(files, id) {
	        var _this = this;

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
	                if (_this.props.multiple) {
	                    thumbs = _this.state.thumbs;
	                } else {
	                    thumbs = [];
	                }
	                thumbs.push(qnurl + '/' + res.name);
	                _this.setState({
	                    files: files,
	                    thumbs: thumbs
	                });
	                thumbs = JSON.stringify(thumbs);
	                if (_this.props.onChange) {
	                    _this.props.onChange(_this.props.name, thumbs);
	                }
	            },
	            onError: function onError() {
	                files[id].state = 2;
	                _this.setState({
	                    files: files
	                });
	            }
	        });
	    },
	    _hide: function _hide() {
	        this.setState({
	            isshow: false
	        });
	    },
	    _show: function _show(e) {
	        e.stopPropagation();
	        var no = e.currentTarget.id.split("-")[1];
	        this.setState({
	            isshow: true,
	            shownum: no
	        });
	    },
	    _next: function _next(e) {
	        e.stopPropagation();
	        var shownum = parseInt(this.state.shownum) + 1;
	        if (shownum > this.state.files.length - 1) {
	            shownum = 0;
	        }
	        this.setState({
	            shownum: shownum
	        });
	    },
	    _prev: function _prev(e) {
	        e.stopPropagation();
	        var shownum = parseInt(this.state.shownum) - 1;
	        if (shownum < 0) {
	            shownum = this.state.files.length - 1;
	        }
	        this.setState({
	            shownum: shownum
	        });
	    },
	    render: function render() {
	        var thumbs = void 0;
	        var pics = void 0;
	        var bullets = void 0;
	        var shownum = this.state.shownum;
	        if (this.state.files.length > 0) {
	            thumbs = this.state.files.map(function (file, index) {
	                var msg = void 0;
	                switch (file.state) {
	                    case 0:
	                        msg = '等待上传';
	                        break;
	                    case 1:
	                        msg = '上传成功';
	                        break;
	                    case 2:
	                        msg = '上传失败';
	                        break;
	                    case 3:
	                        msg = '上传中';
	                        break;
	                    case 4:
	                        msg = '已上传';
	                        break;
	                    default:
	                        break;
	                }
	                var style = {
	                    float: 'left',
	                    animationDelay: 50 * index + 'ms',
	                    animationDuration: '500ms',
	                    paddingRight: '5px'
	                };
	                var thumb = file.thumb;
	                var patt1 = new RegExp("blob:http");
	                var patt2 = new RegExp("blob:file");
	                if (!patt1.test(thumb) && !patt2.test(thumb)) {
	                    thumb += '-thumb';
	                }
	                var id = 'swiper-' + index;
	                return React.createElement('div', {
	                    key: index,
	                    className: 'animated zoomIn',
	                    id: id,
	                    style: style,
	                    onClick: this._show
	                }, React.createElement(Canvas, {
	                    className: 'form-canva',
	                    src: thumb
	                }), React.createElement('div', null, msg));
	            }.bind(this));
	            pics = this.state.files.map(function (file, index) {
	                var thumb = file.thumb;
	                var patt1 = new RegExp("blob:http");
	                var patt2 = new RegExp("blob:file");
	                if (!patt1.test(thumb) && !patt2.test(thumb)) {
	                    thumb += '-max';
	                }
	                var show = classNames({
	                    'swiper-slide': true,
	                    'slide-show': shownum == index
	                });
	                return React.createElement('div', {
	                    key: index,
	                    className: show
	                }, React.createElement('img', {
	                    className: 'swiper-lazy',
	                    src: thumb
	                })
	                // React.createElement('div', {
	                //     className: 'swiper-lazy-preloader swiper-lazy-preloader-white'
	                // })
	                );
	            }.bind(this));
	            bullets = this.state.files.map(function (file, index) {
	                var bullet = classNames({
	                    'swiper-pagination-bullet': true,
	                    'swiper-pagination-bullet-active': shownum == index
	                });
	                return React.createElement('span', {
	                    key: index,
	                    className: bullet
	                });
	            }.bind(this));
	        } else {
	            thumbs = '';
	            pics = '';
	            bullets = '';
	        }
	        var swiperClass = classNames({
	            'swiper-container': true,
	            'swiper-container-horizontal': true,
	            'swiper-show': this.state.isshow
	        });
	        return React.createElement(FormGroup, {
	            title: this.props.title
	        }, React.createElement('input', {
	            id: 'file',
	            name: 'file',
	            className: 'ipt',
	            type: 'file',
	            multiple: 'multiple',
	            onChange: this._onChange
	        }), React.createElement('div', {
	            className: 'form-canvas'
	        }, thumbs), React.createElement('div', {
	            className: 'clear'
	        }), React.createElement('section', {
	            className: swiperClass
	        }, React.createElement('div', {
	            className: 'swiper-wrapper',
	            onClick: this._hide
	        }, pics), React.createElement('div', {
	            className: 'swiper-pagination swiper-pagination-white swiper-pagination-clickable swiper-pagination-bullets'
	        }, bullets), React.createElement('div', {
	            className: 'swiper-button-next swiper-button-white',
	            onClick: this._next
	        }), React.createElement('div', {
	            className: 'swiper-button-prev swiper-button-white',
	            onClick: this._prev
	        })));
	    }
	});

	module.exports = Upload;

/***/ },
/* 29 */
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
	    if (data.data !== null && data.data !== undefined) {
	        for (var x in data.data) {
	            formData.append(x, data.data[x]);
	        }
	    }
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
/* 30 */
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var classNames = __webpack_require__(22);
	var FormGroup = __webpack_require__(24);

	var Radio = React.createClass({
	    displayName: 'Radio',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            title: '单选框',
	            type: 'radio',
	            value: 2,
	            options: [{
	                title: '选项1',
	                value: 1
	            }, {
	                title: '选项2',
	                value: 2
	            }],
	            name: 'state',
	            placeholder: '',
	            help: '',
	            disabled: '',
	            required: 'required'
	        };
	    },
	    getInitialState: function getInitialState() {
	        var option = void 0;
	        switch (this.props.options) {
	            case "roles":
	                option = [];
	                ConfigStore.get(this.props.options).map(function (d, index) {
	                    var op = {
	                        title: d.name,
	                        value: d.id
	                    };
	                    option.push(op);
	                });
	                break;
	            default:
	                option = JSON.parse(this.props.options);
	        }
	        return {
	            files: this.props.files,
	            value: this.props.value,
	            help: this.props.help,
	            option: option
	        };
	    },
	    _onChange: function _onChange(e) {
	        var value = e.target.value;
	        this.setState({
	            value: value
	        });
	        if (this.props.onChange) {
	            this.props.onChange(this.props.name, value);
	        }
	    },
	    render: function render() {
	        var value = this.state.value;
	        var name = this.props.name;
	        var options = this.state.option.map(function (d, index) {
	            var checked = '';
	            if (value == d.value) {
	                checked = 'checked';
	            }
	            var typeClass = 'radio';
	            return React.createElement('label', {
	                key: index,
	                className: 'form-radio',
	                title: this.props.title,
	                help: this.state.help
	            }, React.createElement('div', {
	                className: typeClass
	            }, React.createElement('span', {
	                className: checked
	            }, React.createElement('input', {
	                type: 'radio',
	                name: name,
	                value: d.value,
	                checked: checked,
	                onChange: this._onChange
	            }))), React.createElement('span', null, d.title));
	        }.bind(this));
	        return React.createElement(FormGroup, {
	            title: this.props.title,
	            help: this.state.help
	        }, options);
	    }
	});

	module.exports = Radio;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var classNames = __webpack_require__(22);
	var FormGroup = __webpack_require__(24);

	var Checkbox = React.createClass({
	    displayName: 'Checkbox',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            title: '多选框',
	            type: 'checkbox',
	            value: [2],
	            options: [{
	                title: '选项1',
	                value: 1
	            }, {
	                title: '选项2',
	                value: 2
	            }],
	            name: 'state',
	            placeholder: '',
	            help: '',
	            disabled: '',
	            required: 'required'
	        };
	    },
	    getInitialState: function getInitialState() {
	        var option = void 0;
	        switch (this.props.options) {
	            case "roles":
	                option = [];
	                ConfigStore.get(this.props.options).map(function (d, index) {
	                    var op = {
	                        title: d.name,
	                        value: d.id
	                    };
	                    option.push(op);
	                });
	                break;
	            default:
	                option = JSON.parse(this.props.options);
	        }
	        var value = this.props.value;
	        if (value) {
	            value = JSON.parse(value);
	        } else {
	            value = [];
	        }
	        return {
	            value: value,
	            help: this.props.help,
	            option: option
	        };
	    },
	    _onChange: function _onChange(e) {
	        var type = this.props.type;
	        var v = e.target.value;
	        var value = this.state.value;
	        var index = value.indexOf(v);
	        if (index == -1) {
	            value.push(v);
	        } else {
	            value.splice(index, 1);
	        }
	        this.setState({
	            value: value
	        });
	        value = JSON.stringify(value);
	        if (this.props.onChange) {
	            this.props.onChange(this.props.name, value);
	        }
	    },
	    render: function render() {
	        var value = this.state.value;
	        var name = this.props.name;
	        // let option = JSON.parse(this.props.options)
	        // let option = this.props.options
	        var options = this.state.option.map(function (d, index) {
	            var checked = '';
	            if (value.indexOf(d.value) > -1) {
	                checked = 'checked';
	            }
	            var typeClass = 'checker';
	            return React.createElement('label', {
	                key: index,
	                className: 'form-radio',
	                title: this.props.title,
	                help: this.state.help
	            }, React.createElement('div', {
	                className: typeClass
	            }, React.createElement('span', {
	                className: checked
	            }, React.createElement('input', {
	                type: 'checkbox',
	                name: name,
	                value: d.value,
	                checked: checked,
	                onChange: this._onChange
	            }))), React.createElement('span', null, d.title));
	        }.bind(this));
	        return React.createElement(FormGroup, {
	            title: this.props.title,
	            help: this.state.help
	        }, options);
	    }
	});
	module.exports = Checkbox;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var classNames = __webpack_require__(22);
	var FormGroup = __webpack_require__(24);

	var Range = React.createClass({
	    displayName: 'Range',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            title: '滑条',
	            type: 'range',
	            value: '',
	            help: '滑动滑条选择你的值！',
	            disabled: '',
	            required: 'required',
	            max: 10,
	            min: 6
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            value: this.props.value,
	            help: this.props.help
	        };
	    },
	    componentWillMount: function componentWillMount() {
	        var help = '滑块值域' + this.props.min + '~' + this.props.max + '，' + this.props.help;
	        this.setState({
	            help: help
	        });
	    },
	    _onChange: function _onChange(e) {
	        var value = e.target.value;
	        if (value == this.state.value) {
	            return;
	        }
	        var help = '滑块值域' + this.props.min + '~' + this.props.max + '，当前值：' + value;
	        this.setState({
	            value: value,
	            help: help
	        });
	        if (this.props.onChange) {
	            this.props.onChange(this.props.name, value);
	        }
	    },
	    render: function render() {
	        return React.createElement(FormGroup, {
	            title: this.props.title,
	            help: this.state.help
	        }, React.createElement('input', {
	            className: 'form-range',
	            type: this.props.type,
	            max: this.props.max,
	            min: this.props.min,
	            disabled: this.props.disabled,
	            value: this.state.value,
	            onChange: this._onChange
	        }));
	    }
	});
	module.exports = Range;

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Botton = function (_React$Component) {
	    _inherits(Botton, _React$Component);

	    function Botton() {
	        _classCallCheck(this, Botton);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Botton).call(this));

	        _this.state = {
	            dotstyle: {
	                top: 0,
	                left: 0
	            },
	            dot: false
	        };
	        return _this;
	    }

	    _createClass(Botton, [{
	        key: 'onClick',
	        value: function onClick(e) {
	            var top = e.clientY - e.target.getBoundingClientRect().top;
	            var left = e.clientX - e.target.getBoundingClientRect().left;
	            this.setState({
	                dotstyle: {
	                    top: top + 'px',
	                    left: left + 'px'
	                },
	                dot: true
	            });
	            setTimeout(function () {
	                this.setState({
	                    dot: false
	                });
	            }.bind(this), 3000);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement('div', {
	                className: 'form-group'
	            }, React.createElement('div', {
	                className: 'form-control'
	            }, React.createElement('div', {
	                className: 'form-button-dot',
	                onClick: this.onClick.bind(this)
	            }, React.createElement('input', {
	                className: 'pure-button pure-button-primary form-button',
	                type: 'submit',
	                disabled: this.props.disabled,
	                value: this.props.value
	            }), this.state.dot ? React.createElement('div', {
	                className: 'pure-dot',
	                style: this.state.dotstyle
	            }) : '')));
	        }
	    }]);

	    return Botton;
	}(React.Component);

	Botton.defaultProps = {
	    value: '保存'
	};

	module.exports = Botton;

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';

	var Hidden = React.createClass({
	    displayName: 'Hidden',

	    render: function render() {
	        return React.createElement('input', {
	            type: 'hidden',
	            disabled: this.props.disabled,
	            value: this.props.value
	        });
	    }
	});

	module.exports = Hidden;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var classNames = __webpack_require__(22);
	var FormGroup = __webpack_require__(24);

	var Select = function (_React$Component) {
	    _inherits(Select, _React$Component);

	    function Select(props) {
	        _classCallCheck(this, Select);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Select).call(this, props));

	        _this.state = {
	            files: props.files,
	            value: props.value,
	            name: props.name,
	            help: props.help,
	            options: props.options,
	            show: false
	        };
	        return _this;
	    }

	    _createClass(Select, [{
	        key: '_toggleShow',
	        value: function _toggleShow(e) {
	            this.setState({
	                show: !this.state.show
	            });
	        }
	    }, {
	        key: '_changeChoose',
	        value: function _changeChoose(value, titie) {
	            this.setState({
	                value: value,
	                name: titie,
	                show: false
	            });
	            if (this.props.onChange) {
	                this.props.onChange(this.props.name, value);
	            }
	        }
	    }, {
	        key: '_onChange',
	        value: function _onChange(e) {
	            e.preventDefault();
	            var value = e.target.value;
	            console.log(value);
	            this.setState({
	                value: value
	            });
	            if (this.props.onChange) {
	                this.props.onChange(this.props.name, value);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var value = this.state.value;
	            var name = this.props.name;
	            var options = this.state.options.map(function (d, index) {
	                var isActive = value == d.value ? ' active' : '';
	                return React.createElement('div', {
	                    key: index,
	                    className: 'form-option' + isActive,
	                    onClick: this._changeChoose.bind(this, d.value, d.title)
	                }, d.title);
	            }.bind(this));
	            return React.createElement(FormGroup, {
	                title: this.props.title,
	                help: this.state.help,
	                className: 'form-select'
	            }, React.createElement('div', {
	                className: 'form-input',
	                value: this.state.name,
	                onClick: this._toggleShow.bind(this)
	            }, this.state.name), React.createElement('div', {
	                className: 'form-choose',
	                style: {
	                    display: this.state.show ? 'block' : 'none'
	                }
	            }, React.createElement('div', {
	                className: 'form-select-search'
	            }, React.createElement('input', {
	                className: 'form-input',
	                value: this.state.search,
	                placeholder: 'Search',
	                onChange: this._onChange.bind(this)
	            })), React.createElement('div', {
	                className: 'form-select-choose'
	            }, options)));
	        }
	    }]);

	    return Select;
	}(React.Component);

	Select.defaultProps = {
	    title: '单选框',
	    type: 'radio',
	    value: 2,
	    options: [{
	        title: '选项1',
	        value: 1
	    }, {
	        title: '选项2',
	        value: 2
	    }, {
	        title: '选项3',
	        value: 3
	    }, {
	        title: '选项4',
	        value: 4
	    }],
	    name: 'state',
	    placeholder: '',
	    help: '',
	    disabled: '',
	    required: 'required'
	};
	module.exports = Select;

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Tab = function (_React$Component) {
	    _inherits(Tab, _React$Component);

	    function Tab() {
	        _classCallCheck(this, Tab);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tab).call(this));

	        _this.state = {
	            dotstyle: {
	                top: 0,
	                left: 0
	            },
	            dot: 0
	        };
	        return _this;
	    }

	    _createClass(Tab, [{
	        key: '_onClick',
	        value: function _onClick(index) {
	            this.setState({
	                dot: index
	            });
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
	                var active = index == dot ? ' active' : '';
	                return React.createElement('div', {
	                    key: index,
	                    onClick: this._onClick.bind(this, index),
	                    className: 'tab-card' + active
	                }, child.props.title);
	            }.bind(this)), React.createElement('div', {
	                className: 'tab-cardsw',
	                style: {
	                    width: '5rem'
	                }
	            })), React.createElement('div', {
	                className: 'tab-cards2'
	            }, childs.map(function (child, index) {
	                var active = index == dot ? ' active' : '';
	                return React.createElement('div', {
	                    key: index,
	                    className: 'tab-card2 ' + active
	                }, child.props.children);
	            })));
	        }
	    }]);

	    return Tab;
	}(React.Component);

	Tab.defaultProps = {
	    value: '保存'
	};

	module.exports = Tab;

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Audio = function (_React$Component) {
	    _inherits(Audio, _React$Component);

	    function Audio() {
	        _classCallCheck(this, Audio);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Audio).call(this));
	    }

	    _createClass(Audio, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var audio = this.refs.audio;
	            // let audio = React.findDOMNode(this.refs.audio);
	            // console.log(audio);
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
	        key: 'render',
	        value: function render() {
	            return React.createElement('div', {
	                className: 'form-group'
	            }, React.createElement('div', {
	                className: 'form-control'
	            }, React.createElement('audio', {
	                ref: 'audio',
	                src: '1.mp3',
	                controls: 'controls',
	                loop: 'loop',
	                autoPlay: false
	            }, '亲 您的浏览器不支持html5的audio标签')));
	        }
	    }]);

	    return Audio;
	}(React.Component);

	Audio.defaultProps = {
	    value: '保存'
	};

	module.exports = Audio;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter;
	var Link = _ReactRouter.Link;


	var request = __webpack_require__(4);

	var L = function (_React$Component) {
	    _inherits(L, _React$Component);

	    function L() {
	        _classCallCheck(this, L);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(L).call(this));
	    }

	    _createClass(L, [{
	        key: 'render',
	        value: function render() {
	            var p = void 0;
	            var page = this.props.page;
	            if (page == this.props.current_page) {
	                p = React.createElement('span', {
	                    className: 'pure-button active'
	                }, page);
	            } else {
	                p = React.createElement(Link, {
	                    className: 'pure-button',
	                    to: '/api/' + this.props.url + '?page=' + page
	                }, page);
	            }
	            return React.createElement("li", {
	                key: page
	            }, p);
	        }
	    }]);

	    return L;
	}(React.Component);

	var Page = function (_React$Component2) {
	    _inherits(Page, _React$Component2);

	    function Page() {
	        _classCallCheck(this, Page);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Page).call(this));
	    }

	    _createClass(Page, [{
	        key: 'render',
	        value: function render() {
	            var i = 1;
	            var prev = 4;
	            var total = this.props.page.total || '';
	            var last_page = this.props.page.last_page || '';
	            var current_page = this.props.page.current_page || '';
	            var items = [];
	            if (prev > last_page + 1) {
	                prev = last_page + 1;
	            }
	            for (i; i < prev; i++) {
	                var p = React.createElement(L, {
	                    url: this.props.url,
	                    page: i,
	                    current_page: current_page
	                });
	                items.push(p);
	            }
	            var j = current_page - 1;
	            var c = current_page + 2;
	            if (c > last_page + 1) {
	                c = last_page + 1;
	            }
	            if (j > i && j > prev - 1) {
	                var _p = React.createElement("li", {}, React.createElement('span', {
	                    className: 'pure-button'
	                }, '...'));
	                items.push(_p);
	                for (j; j < c; j++) {
	                    var _p2 = React.createElement(L, {
	                        url: this.props.url,
	                        page: j,
	                        current_page: current_page
	                    });
	                    items.push(_p2);
	                }
	            } else {
	                j = i;
	                for (j; j < c; j++) {
	                    var _p3 = React.createElement(L, {
	                        url: this.props.url,
	                        page: j,
	                        current_page: current_page
	                    });
	                    items.push(_p3);
	                }
	            }
	            var k = last_page - prev + 2;
	            if (k > j) {
	                var _p4 = React.createElement("li", {}, React.createElement('span', {
	                    className: 'pure-button'
	                }, '...'));
	                items.push(_p4);
	            } else {
	                k = j;
	            }
	            for (k; k < last_page + 1; k++) {
	                var _p5 = React.createElement(L, {
	                    url: this.props.url,
	                    page: k,
	                    current_page: current_page
	                });
	                items.push(_p5);
	            }
	            return React.createElement("nav", {
	                className: 'pure-menu pure-menu-open pure-menu-horizontal'
	            }, React.createElement("ul", {
	                className: "pure-paginator"
	            }, React.createElement("li", {}, React.createElement("span", {
	                className: 'pure-button',
	                "aria-hidden": "true"
	            }, '共查询到' + total + '条数据')), items, React.createElement("li", {}, React.createElement("span", {
	                className: 'pure-button totle'
	            }, '共' + last_page + '页'))));
	        }
	    }]);

	    return Page;
	}(React.Component);

	var Pages = React.createClass({
	    displayName: 'Pages',

	    getInitialState: function getInitialState() {
	        return {
	            items: [],
	            del_id: [],
	            del_all: [],
	            isdel_all: false,
	            thead_key: [],
	            thead_name: [],
	            title: '',
	            pages: {},
	            url: this.props.params.pages
	        };
	    },

	    getDefaultProps: function getDefaultProps() {},

	    componentDidMount: function componentDidMount() {
	        var query = this.props.location.query;
	        var page = query.page || 1;
	        var url = this.props.params.pages;
	        this._reQuest(url, page);
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        var page = nextProps.location.query.page || 1;
	        var page2 = this.props.location.query.page || 1;
	        if (this.props.params.pages != nextProps.params.pages || page != page2) {
	            var url = nextProps.params.pages;
	            this._reQuest(url, page);
	        }
	    },
	    _reQuest: function _reQuest(url, page) {
	        url = 'http://www.mycms.com/' + url;
	        request.get(url).query({
	            page: page
	        }).end(function (err, res) {
	            if (err) {
	                var msg = [res.status + 'error'];
	            } else {
	                var data = JSON.parse(res.text);
	                if (data.res == 404) {
	                    this.setState({
	                        mods: [],
	                        info: data.info,
	                        title: data.msg
	                    });
	                    return;
	                }
	                ConfigActions.update('title', data.title);
	                var items = [];
	                this.setState({
	                    pages: data.pages,
	                    items: items.concat(data.pages.data),
	                    del_all: this._set_del_all(data.info),
	                    thead: data.thead,
	                    thead_key: data.thead.th,
	                    thead_name: data.thead.td,
	                    title: data.title
	                });
	            }
	        }.bind(this));
	    },
	    _set_del_all: function _set_del_all(items) {
	        var del_all = [];
	        var x = void 0;
	        for (x in items) {
	            del_all.push(items[x]['id']);
	        }
	        return del_all;
	    },
	    _del: function _del(e) {
	        console.log(e.target);
	        console.log(e.target.value);
	    },
	    _thead: function _thead() {
	        var thead_name = this.state.thead_name;
	        var list = thead_name.map(function (d) {
	            return React.createElement("th", {
	                key: d
	            }, d);
	        }.bind(this));
	        var isdel_all = this.state.isdel_all;
	        var checked = void 0;
	        if (isdel_all) {
	            checked = 'checked';
	        } else {
	            checked = '';
	        }
	        return React.createElement("thead", {}, React.createElement("tr", {}, React.createElement("th", {
	            colSpan: "1",
	            rowSpan: "1",
	            className: "table-checkbox sorting_disabled"
	        }, React.createElement("div", {
	            className: "checker"
	        }, React.createElement("span", {
	            className: checked
	        }, React.createElement("input", {
	            className: "group-checkable",
	            type: "checkbox",
	            onClick: this._isdel_all
	        })))), list, React.createElement("th", {}, '操作')));
	    },
	    _isdel_all: function _isdel_all() {
	        var isdel_all = this.state.isdel_all;
	        var del_all = this.state.del_all;
	        var del_id = [];
	        if (isdel_all) {
	            isdel_all = false;
	        } else {
	            isdel_all = true;
	            del_id = del_id.concat(del_all);
	        }
	        this.setState({
	            isdel_all: isdel_all,
	            del_id: del_id
	        });
	    },
	    _list: function _list(data) {
	        var url = this.props.params.list;
	        var td = this.state.thead_key;
	        var list = td.map(function (d) {
	            return React.createElement("td", {
	                key: d + data.id
	            }, data[d]);
	        }.bind(this));
	        return list;
	    },
	    _click: function _click(e) {
	        var del_id = this.state.del_id;
	        var k = parseInt(e.target.value);
	        var index = del_id.indexOf(k);
	        if (index == -1) {
	            del_id.push(k);
	        } else {
	            del_id.splice(index, 1);
	        }
	        this.setState({
	            del_id: del_id
	        });
	    },
	    _onDel: function _onDel(e) {
	        e.preventDefault();
	        var id = e.target.id;
	        id = id.split("_");
	        id = id[1];
	        var url = '../' + this.props.params.list + '/del/' + id;
	        request.get(url).end(function (err, res) {
	            if (err) {
	                ConfigActions.msg(res.status + 'error');
	            } else {
	                var data = JSON.parse(res.text);
	                if (data.res == 404) {
	                    this.setState({
	                        mods: [],
	                        info: data.info,
	                        title: data.msg
	                    });
	                    return;
	                }
	                this.componentDidMount();
	                ConfigActions.msg(data.msg);
	            }
	        }.bind(this));
	    },
	    render: function render() {
	        var url = this.props.params.pages;
	        var list = this.state.items.map(function (data) {
	            var curl = '/api/' + url + '/' + data.id;
	            var arr = this.state.del_id;
	            var k = data.id;
	            var checked = void 0;
	            if (arr.indexOf(k) != -1) {
	                checked = 'checked';
	            } else {
	                checked = '';
	            }
	            var role = void 0;
	            if (url == 'roles') {
	                role = React.createElement(Link, {
	                    activeClassName: "active",
	                    to: '/permissions/' + data.id,
	                    style: {
	                        marginLeft: '20px'
	                    }
	                }, "用户组权限");
	            }
	            return React.createElement("tr", {
	                key: data.id
	            }, React.createElement("td", {}, React.createElement("div", {
	                className: "checker"
	            }, React.createElement("span", {
	                className: checked
	            }, React.createElement("input", {
	                className: "checkboxes",
	                value: data.id,
	                name: 'del_id[]',
	                type: "checkbox",
	                onClick: this._click
	            })))), this._list(data), React.createElement("td", {}, React.createElement(Link, {
	                activeClassName: "active",
	                to: curl
	            }, "编辑"), ' | ', React.createElement('a', {
	                activeClassName: "active",
	                id: 'del_' + data.id,
	                onClick: this._onDel
	            }, "删除"), role));
	        }.bind(this));
	        return React.createElement("section", {
	            className: "pure-u-1"
	        }, React.createElement("h3", {
	            className: "page-title"
	        }, this.state.title), React.createElement("table", {
	            className: "pure-table pure-table-bordered",
	            style: {
	                width: '100%'
	            }
	        }, this._thead(), React.createElement("tbody", null, list)), React.createElement(Page, {
	            page: this.state.pages,
	            url: this.props.params.pages
	        }));
	    }
	});

	module.exports = Pages;

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Page = function (_React$Component) {
	    _inherits(Page, _React$Component);

	    function Page(props) {
	        _classCallCheck(this, Page);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Page).call(this, props));
	    }

	    _createClass(Page, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement('section', {
	                className: 'pure-u-1'
	            }, 'page');
	        }
	    }]);

	    return Page;
	}(React.Component);

	module.exports = Page;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var request = __webpack_require__(4);
	var _ReactRouter = ReactRouter;
	var Link = _ReactRouter.Link;

	var _require = __webpack_require__(20);

	var Form = _require.Form;
	var Input = _require.Input;
	var Button = _require.Button;

	var Login = function (_React$Component) {
	    _inherits(Login, _React$Component);

	    function Login(props) {
	        _classCallCheck(this, Login);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Login).call(this, props));

	        _this.state = {
	            info: {
	                username: '',
	                password: ''
	            }
	        };
	        return _this;
	    }

	    _createClass(Login, [{
	        key: '_onChange',
	        value: function _onChange(name, value) {
	            var info = this.state.info;
	            info[name] = value;
	            this.setState({
	                info: info
	            });
	        }
	    }, {
	        key: '_onSubmit',
	        value: function _onSubmit(e) {
	            e.preventDefault();
	            request.post('admin2/login').send(this.state.info).set('Accept', 'application/json').end(function (err, res) {
	                if (err) throw err;
	                var data = JSON.parse(res.text);
	                if (data.state == 'ok') {
	                    storedb('user').insert(data.data);
	                    this.props.history.pushState(null, '/');
	                } else {
	                    this.setState({ 'msg': data.msg });
	                    console.log(data);
	                }
	            }.bind(this));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement('section', {
	                className: 'pure-g'
	            }, React.createElement('section', {
	                className: 'pure-u-1 login'
	            }, React.createElement('section', {
	                className: 'login_t pure-u-1'
	            }, React.createElement(Link, {
	                to: '/',
	                title: '首页'
	            }, '首页'), React.createElement(Link, {
	                to: 'login',
	                title: '登录'
	            }, '登录')), this.state.msg ? React.createElement('div', {
	                className: 'alert alert-warning'
	            }, this.state.msg) : null, React.createElement(Form, {
	                action: 'user/login',
	                info: this.state.info,
	                apiSubmit: false,
	                legend: '用户登录',
	                onSubmit: this._onSubmit.bind(this)
	            }, React.createElement(Input, {
	                type: 'text',
	                title: '用户名',
	                name: 'username',
	                placeholder: '请输入您的用户名！',
	                value: this.state.info.username,
	                onChange: this._onChange.bind(this)
	            }), React.createElement(Input, {
	                type: 'password',
	                title: '密码',
	                name: 'password',
	                placeholder: '请输入您的密码！',
	                value: this.state.info.password,
	                onChange: this._onChange.bind(this)
	            }), React.createElement(Button, {
	                value: '登录'
	            }))));
	        }
	    }]);

	    return Login;
	}(React.Component);

	module.exports = Login;

/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Logout = function (_React$Component) {
	    _inherits(Logout, _React$Component);

	    function Logout() {
	        _classCallCheck(this, Logout);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Logout).call(this));
	    }

	    _createClass(Logout, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            storedb('user').remove();
	            this.props.history.pushState(null, 'login');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return null;
	        }
	    }]);

	    return Logout;
	}(React.Component);

	module.exports = Logout;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _require = __webpack_require__(20);

	var Form = _require.Form;
	var FormGroup = _require.FormGroup;
	var Input = _require.Input;
	var Button = _require.Button;
	var Hidden = _require.Hidden;


	var ajaxUpload = __webpack_require__(29);

	var _require2 = __webpack_require__(30);

	var getUpToken = _require2.getUpToken;

	var Import = function (_React$Component) {
	    _inherits(Import, _React$Component);

	    function Import() {
	        _classCallCheck(this, Import);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Import).call(this));

	        _this.state = {};
	        return _this;
	    }

	    _createClass(Import, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            ConfigActions.update('title', '数据导入');
	        }
	    }, {
	        key: '_onSubmit',
	        value: function _onSubmit() {
	            var files = this.refs.file2.files;
	            console.log(files);
	            console.log('12');
	            var token = getUpToken();
	            var file = files[0];
	            return ajaxUpload({
	                url: 'admin2/uploads',
	                name: 'file',
	                key: file.name,
	                file: file,
	                data: {
	                    table: 'member'
	                },
	                onProgress: function onProgress(e) {
	                    console.log(e.loaded / e.total * 100 + '%');
	                },
	                onLoad: function onLoad(e) {
	                    var res = JSON.parse(e.currentTarget.responseText);
	                    console.log(res);
	                },
	                onError: function onError() {}
	            });
	        }
	    }, {
	        key: '_onSubmit2',
	        value: function _onSubmit2() {
	            var files = this.refs.result.files;
	            var token = getUpToken();
	            var file = files[0];
	            return ajaxUpload({
	                url: 'admin2/uploads',
	                name: 'file',
	                key: file.name,
	                file: file,
	                data: {
	                    table: 'result'
	                },
	                onProgress: function onProgress(e) {
	                    console.log(e.loaded / e.total * 100 + '%');
	                },
	                onLoad: function onLoad(e) {
	                    var res = JSON.parse(e.currentTarget.responseText);
	                    console.log(res);
	                },
	                onError: function onError() {}
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement('div', {
	                className: 'container pure-g'
	            }, React.createElement('div', {
	                className: 'pure-u-1'
	            }, React.createElement(Form, {
	                action: 'user/login',
	                apiSubmit: false,
	                legend: '人员数据上传',
	                onSubmit: this._onSubmit.bind(this)
	            }, React.createElement(FormGroup, {
	                title: '文件上传'
	            }, React.createElement('input', {
	                id: 'file',
	                name: 'file',
	                ref: 'file2',
	                className: 'ipt',
	                type: 'file',
	                multiple: false
	            })), React.createElement(Button, {
	                value: '文件上传'
	            })), React.createElement(Form, {
	                action: 'user/login',
	                apiSubmit: false,
	                legend: '人员数据上传',
	                onSubmit: this._onSubmit2.bind(this)
	            }, React.createElement(FormGroup, {
	                title: '文件上传'
	            }, React.createElement('input', {
	                id: 'file',
	                name: 'file',
	                ref: 'result',
	                className: 'ipt',
	                type: 'file',
	                multiple: false
	            })), React.createElement(Button, {
	                value: '文件上传'
	            }))));
	        }
	    }]);

	    return Import;
	}(React.Component);

	Import.defaultProps = {
	    value: '保存'
	};

	module.exports = Import;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * action
	 */
	window.ConfigActions = __webpack_require__(45);

	/**
	 * store
	 */
	window.ConfigStore = __webpack_require__(51);

	/** 
	 * 请求数据
	*/
	window.request = __webpack_require__(4);

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

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(46);

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
/* 46 */
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

	var Dispatcher = __webpack_require__(47).Dispatcher;

	module.exports = new Dispatcher();

/***/ },
/* 47 */
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

	module.exports.Dispatcher = __webpack_require__(48);

/***/ },
/* 48 */
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

	var invariant = __webpack_require__(50);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(49)))

/***/ },
/* 49 */
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
/* 50 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(49)))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(46);
	var EventEmitter = __webpack_require__(52).EventEmitter;
	var assign = __webpack_require__(53);

	var CHANGE_EVENT = 'config';

	var _todos = {
	    transition: 'example',
	    msg: '',
	    msg_n: 0,
	    loading: true,
	    title: '王的理想乡',
	    pics: ''
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
/* 52 */
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
/* 53 */
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

/***/ }
/******/ ]);