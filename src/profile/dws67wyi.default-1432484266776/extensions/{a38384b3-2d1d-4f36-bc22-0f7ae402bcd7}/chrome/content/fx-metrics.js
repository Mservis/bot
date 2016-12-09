(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.distributionModule = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "shortTermCookie": {
    "url": "https://inline.go.mail.ru",
    "name": "go_install_data_vbm"
  },
  "longTermCookie": {
    "url": "https://inline.go.mail.ru",
    "name": "go_req_data_vbm"
  },
  "localStorage": {
    "key": "info"
  },
  "nativeMessaging": {
    "host": "ru.mail.go.ext_info_host"
  },
  "uninstall": {
    "url": "https://data.amigo.mail.ru/newtab/uninstall.html"
  },
  "notifications": {
    "configUrl": "http://ad.mail.ru/adi/45568",
    "storageKey": "ru.mail.vbm.notifications_history"
  },
  "metrics": {
    "mrds": {
      "url": "http://mrds.mail.ru/update/2/version.txt",
      "parameters": {}
    },
    "go": {
      "url": "http://go.mail.ru/distib/mark/",
      "parameters": {}
    },
    "partnerInstall": {
      "parameters": {}
    }
  },
  "extensionData": {
    "comp": "vbm",
    "product_type": "ch_xtnvbm"
  }
}

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eachLimit = require('./eachLimit');

var _eachLimit2 = _interopRequireDefault(_eachLimit);

var _doLimit = require('./internal/doLimit');

var _doLimit2 = _interopRequireDefault(_doLimit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _doLimit2.default)(_eachLimit2.default, Infinity);

},{"./eachLimit":3,"./internal/doLimit":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = eachLimit;

var _eachOfLimit = require('./internal/eachOfLimit');

var _eachOfLimit2 = _interopRequireDefault(_eachOfLimit);

var _withoutIndex = require('./internal/withoutIndex');

var _withoutIndex2 = _interopRequireDefault(_withoutIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function eachLimit(arr, limit, iteratee, cb) {
    return (0, _eachOfLimit2.default)(limit)(arr, (0, _withoutIndex2.default)(iteratee), cb);
}

},{"./internal/eachOfLimit":5,"./internal/withoutIndex":10}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = doLimit;
function doLimit(fn, limit) {
    return function (iterable, iteratee, callback) {
        return fn(iterable, limit, iteratee, callback);
    };
}

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _eachOfLimit;

var _noop = require('lodash-es/noop');

var _noop2 = _interopRequireDefault(_noop);

var _once = require('./once');

var _once2 = _interopRequireDefault(_once);

var _iterator = require('./iterator');

var _iterator2 = _interopRequireDefault(_iterator);

var _onlyOnce = require('./onlyOnce');

var _onlyOnce2 = _interopRequireDefault(_onlyOnce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _eachOfLimit(limit) {
    return function (obj, iteratee, callback) {
        callback = (0, _once2.default)(callback || _noop2.default);
        obj = obj || [];
        var nextElem = (0, _iterator2.default)(obj);
        if (limit <= 0) {
            return callback(null);
        }
        var done = false;
        var running = 0;
        var errored = false;

        (function replenish() {
            if (done && running <= 0) {
                return callback(null);
            }

            while (running < limit && !errored) {
                var elem = nextElem();
                if (elem === null) {
                    done = true;
                    if (running <= 0) {
                        callback(null);
                    }
                    return;
                }
                running += 1;
                iteratee(elem.value, elem.key, (0, _onlyOnce2.default)(function (err) {
                    running -= 1;
                    if (err) {
                        callback(err);
                        errored = true;
                    } else {
                        replenish();
                    }
                }));
            }
        })();
    };
}

},{"./iterator":7,"./once":8,"./onlyOnce":9,"lodash-es/noop":40}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (coll) {
    return iteratorSymbol && coll[iteratorSymbol] && coll[iteratorSymbol]();
};

var iteratorSymbol = typeof Symbol === 'function' && Symbol.iterator;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = iterator;

var _isArrayLike = require('lodash-es/isArrayLike');

var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

var _getIterator = require('./getIterator');

var _getIterator2 = _interopRequireDefault(_getIterator);

var _keys = require('lodash-es/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function iterator(coll) {
    var i = -1;
    var len;
    if ((0, _isArrayLike2.default)(coll)) {
        len = coll.length;
        return function next() {
            i++;
            return i < len ? { value: coll[i], key: i } : null;
        };
    }

    var iterate = (0, _getIterator2.default)(coll);
    if (iterate) {
        return function next() {
            var item = iterate.next();
            if (item.done) return null;
            i++;
            return { value: item.value, key: i };
        };
    }

    var okeys = (0, _keys2.default)(coll);
    len = okeys.length;
    return function next() {
        i++;
        var key = okeys[i];
        return i < len ? { value: coll[key], key: key } : null;
    };
}

},{"./getIterator":6,"lodash-es/isArrayLike":31,"lodash-es/keys":39}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = once;
function once(fn) {
    return function () {
        if (fn === null) return;
        fn.apply(this, arguments);
        fn = null;
    };
}

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = onlyOnce;
function onlyOnce(fn) {
    return function () {
        if (fn === null) throw new Error("Callback was already called.");
        fn.apply(this, arguments);
        fn = null;
    };
}

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _withoutIndex;
function _withoutIndex(iteratee) {
    return function (value, index, callback) {
        return iteratee(value, callback);
    };
}

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = whilst;

var _noop = require('lodash-es/noop');

var _noop2 = _interopRequireDefault(_noop);

var _rest = require('lodash-es/rest');

var _rest2 = _interopRequireDefault(_rest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function whilst(test, iteratee, cb) {
    cb = cb || _noop2.default;
    if (!test()) return cb(null);
    var next = (0, _rest2.default)(function (err, args) {
        if (err) return cb(err);
        if (test.apply(this, args)) return iteratee(next);
        cb.apply(null, [null].concat(args));
    });
    iteratee(next);
}

},{"lodash-es/noop":40,"lodash-es/rest":41}],12:[function(require,module,exports){
'use strict';

exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

function init() {
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }

  revLookup['-'.charCodeAt(0)] = 62;
  revLookup['_'.charCodeAt(0)] = 63;
}

init();

function toByteArray(b64) {
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

  // base64 is 4/3 + up to two characters of the original data
  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = tmp >> 16 & 0xFF;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
    output.push(tripletToBase64(tmp));
  }
  return output.join('');
}

function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[tmp << 4 & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup[tmp >> 10];
    output += lookup[tmp >> 4 & 0x3F];
    output += lookup[tmp << 2 & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('');
}

},{}],13:[function(require,module,exports){
(function (Buffer){
'use strict';

function bufferToBytes(data) {
  var rs = [];
  for (var i = 0; i < data.length; i++) {
    rs.push(data[i]);
  }
  return rs;
}

var binString = module.exports = function binString(data, options) {
  // Set default options
  options = options || {};
  if (Array.isArray(data)) {
    data = new Buffer(data);
  } else if (typeof data == 'number') {
    data = new Buffer(data.toString(16), 'hex');
  } else if (typeof data == 'string') {
    if (!options.in) {
      // Quack, quack! Duck-type the input
      if (data.slice(0, 2) == '0x') {
        data = new Buffer(data.slice(2), 'hex');
      } else {
        // Binary string
        data = new Buffer(data, 'binary');
      }
    } else {
      data = new Buffer(data, options.in);
    }
  }
  if (!options.out) options.out = 'buffer';

  // Convert
  switch (options.out) {
    case 'buffer':
      return data;
    case 'hex':
      return data.toString('hex');
    case 'binary':
      return data.toString('binary');
    case 'utf8':
      return data.toString('utf8');
    case 'base64':
      return data.toString('base64');
    case 'bytes':
      return bufferToBytes(data);
    default:
      throw new Error('Output format "' + options.out + '" not understood');
  }
};

}).call(this,require("buffer").Buffer)
},{"buffer":14}],14:[function(require,module,exports){
(function (global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict';

var base64 = require('base64-js');
var ieee754 = require('ieee754');
var isArray = require('isarray');

exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength();

function typedArraySupport() {
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function foo() {
        return 42;
      } };
    return arr.foo() === 42 && // typed array instances can be augmented
    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
  } catch (e) {
    return false;
  }
}

function kMaxLength() {
  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
}

function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length');
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }

  return that;
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer(arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length);
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error('If encoding is specified then the first argument must be a string');
    }
    return allocUnsafe(this, arg);
  }
  return from(this, arg, encodingOrOffset, length);
}

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr;
};

function from(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset);
  }

  return fromObject(that, value);
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length);
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    });
  }
}

function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  }
}

function alloc(that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size);
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
  }
  return createBuffer(that, size);
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding);
};

function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that;
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size);
};

function fromString(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  that.write(string, encoding);
  return that;
}

function fromArrayLike(that, array) {
  var length = checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that;
}

function fromObject(that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that;
    }

    obj.copy(that, 0, 0, len);
    return that;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }
      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function checked(length) {
  // Note: cannot use `length < kMaxLength` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
  }
  return length | 0;
}

function SlowBuffer(length) {
  if (+length != length) {
    // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length);
}

Buffer.isBuffer = function isBuffer(b) {
  return !!(b != null && b._isBuffer);
};

Buffer.compare = function compare(a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers');
  }

  if (a === b) return 0;

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

Buffer.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;
    default:
      return false;
  }
};

Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return Buffer.alloc(0);
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
};

function byteLength(string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0;

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'binary':
      case 'raw':
      case 'raws':
        return len;
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length;
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;
      case 'hex':
        return len >>> 1;
      case 'base64':
        return base64ToBytes(string).length;
      default:
        if (loweredCase) return utf8ToBytes(string).length; // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString(encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return '';
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return '';
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return '';
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);

      case 'ascii':
        return asciiSlice(this, start, end);

      case 'binary':
        return binarySlice(this, start, end);

      case 'base64':
        return base64Slice(this, start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16() {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this;
};

Buffer.prototype.swap32 = function swap32() {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this;
};

Buffer.prototype.toString = function toString() {
  var length = this.length | 0;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};

Buffer.prototype.equals = function equals(b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};

Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>';
};

Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer');
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }
  if (thisStart >= thisEnd) {
    return -1;
  }
  if (start >= end) {
    return 1;
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0;

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

function arrayIndexOf(arr, val, byteOffset, encoding) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }

  var foundIndex = -1;
  for (var i = byteOffset; i < arrLength; ++i) {
    if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
      if (foundIndex === -1) foundIndex = i;
      if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
    } else {
      if (foundIndex !== -1) i -= i - foundIndex;
      foundIndex = -1;
    }
  }

  return -1;
}

Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset >>= 0;

  if (this.length === 0) return -1;
  if (byteOffset >= this.length) return -1;

  // Negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0);

  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  if (Buffer.isBuffer(val)) {
    // special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf(this, val, byteOffset, encoding);
  }
  if (typeof val === 'number') {
    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
      return Uint8Array.prototype.indexOf.call(this, val, byteOffset);
    }
    return arrayIndexOf(this, [val], byteOffset, encoding);
  }

  throw new TypeError('val must be string, number or Buffer');
};

Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};

function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new Error('Invalid hex string');

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }
  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}

function binaryWrite(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}

function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}

function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}

Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
    // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
    // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);

      case 'ascii':
        return asciiWrite(this, string, offset, length);

      case 'binary':
        return binaryWrite(this, string, offset, length);

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};

function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf);
  } else {
    return base64.fromByteArray(buf.slice(start, end));
  }
}

function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res);
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }
  return res;
}

function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret;
}

function binarySlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret;
}

function hexSlice(buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out;
}

function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res;
}

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val;
};

Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val;
};

Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};

Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};

Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};

Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};

Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};

Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
};

Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
};

Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};

Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};

Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};

Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4);
};

Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4);
};

Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8);
};

Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8);
};

function checkInt(buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}

Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 0xff;
  return offset + 1;
};

function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};

function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};

Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};

Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};

Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};

Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};

Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};

function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}

function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}

Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};

Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};

function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0;

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds');

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean(str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return '';
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str;
}

function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        }

        // valid lead
        leadSurrogate = codePoint;

        continue;
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function asciiToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray;
}

function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray;
}

function base64ToBytes(str) {
  return base64.toByteArray(base64clean(str));
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }
  return i;
}

function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"base64-js":12,"ieee754":17,"isarray":15}],15:[function(require,module,exports){
'use strict';

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],16:[function(require,module,exports){
'use strict';

var isObj = require('is-obj');
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Sources cannot be null or undefined');
	}

	return Object(val);
}

function assignKey(to, from, key) {
	var val = from[key];

	if (val === undefined || val === null) {
		return;
	}

	if (hasOwnProperty.call(to, key)) {
		if (to[key] === undefined || to[key] === null) {
			throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
		}
	}

	if (!hasOwnProperty.call(to, key) || !isObj(val)) {
		to[key] = val;
	} else {
		to[key] = assign(Object(to[key]), from[key]);
	}
}

function assign(to, from) {
	if (to === from) {
		return to;
	}

	from = Object(from);

	for (var key in from) {
		if (hasOwnProperty.call(from, key)) {
			assignKey(to, from, key);
		}
	}

	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(from);

		for (var i = 0; i < symbols.length; i++) {
			if (propIsEnumerable.call(from, symbols[i])) {
				assignKey(to, from, symbols[i]);
			}
		}
	}

	return to;
}

module.exports = function deepAssign(target) {
	target = toObject(target);

	for (var s = 1; s < arguments.length; s++) {
		assign(target, arguments[s]);
	}

	return target;
};

},{"is-obj":18}],17:[function(require,module,exports){
"use strict";

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

},{}],18:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

module.exports = function (x) {
	var type = typeof x === 'undefined' ? 'undefined' : _typeof(x);
	return x !== null && (type === 'object' || type === 'function');
};

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  var length = args.length;
  switch (length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

exports.default = apply;

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _getPrototype = require('./_getPrototype.js');

var _getPrototype2 = _interopRequireDefault(_getPrototype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
  // that are composed entirely of index properties, return `false` for
  // `hasOwnProperty` checks of them.
  return object != null && (hasOwnProperty.call(object, key) || (typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object' && key in object && (0, _getPrototype2.default)(object) === null);
}

exports.default = baseHas;

},{"./_getPrototype.js":25}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = Object.keys;

/**
 * The base implementation of `_.keys` which doesn't skip the constructor
 * property of prototypes or treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  return nativeKeys(Object(object));
}

exports.default = baseKeys;

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function (object) {
    return object == null ? undefined : object[key];
  };
}

exports.default = baseProperty;

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

exports.default = baseTimes;

},{}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseProperty = require('./_baseProperty.js');

var _baseProperty2 = _interopRequireDefault(_baseProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a
 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
 * Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = (0, _baseProperty2.default)('length');

exports.default = getLength;

},{"./_baseProperty.js":22}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetPrototype = Object.getPrototypeOf;

/**
 * Gets the `[[Prototype]]` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {null|Object} Returns the `[[Prototype]]`.
 */
function getPrototype(value) {
  return nativeGetPrototype(Object(value));
}

exports.default = getPrototype;

},{}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseTimes = require('./_baseTimes.js');

var _baseTimes2 = _interopRequireDefault(_baseTimes);

var _isArguments = require('./isArguments.js');

var _isArguments2 = _interopRequireDefault(_isArguments);

var _isArray = require('./isArray.js');

var _isArray2 = _interopRequireDefault(_isArray);

var _isLength = require('./isLength.js');

var _isLength2 = _interopRequireDefault(_isLength);

var _isString = require('./isString.js');

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates an array of index keys for `object` values of arrays,
 * `arguments` objects, and strings, otherwise `null` is returned.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array|null} Returns index keys, else `null`.
 */
function indexKeys(object) {
  var length = object ? object.length : undefined;
  if ((0, _isLength2.default)(length) && ((0, _isArray2.default)(object) || (0, _isString2.default)(object) || (0, _isArguments2.default)(object))) {
    return (0, _baseTimes2.default)(length, String);
  }
  return null;
}

exports.default = indexKeys;

},{"./_baseTimes.js":23,"./isArguments.js":29,"./isArray.js":30,"./isLength.js":34,"./isString.js":37}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

exports.default = isIndex;

},{}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;

  return value === proto;
}

exports.default = isPrototype;

},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isArrayLikeObject = require('./isArrayLikeObject.js');

var _isArrayLikeObject2 = _interopRequireDefault(_isArrayLikeObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
  return (0, _isArrayLikeObject2.default)(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

exports.default = isArguments;

},{"./isArrayLikeObject.js":32}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @type {Function}
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

exports.default = isArray;

},{}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getLength = require('./_getLength.js');

var _getLength2 = _interopRequireDefault(_getLength);

var _isFunction = require('./isFunction.js');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isLength = require('./isLength.js');

var _isLength2 = _interopRequireDefault(_isLength);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && (0, _isLength2.default)((0, _getLength2.default)(value)) && !(0, _isFunction2.default)(value);
}

exports.default = isArrayLike;

},{"./_getLength.js":24,"./isFunction.js":33,"./isLength.js":34}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isArrayLike = require('./isArrayLike.js');

var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

var _isObjectLike = require('./isObjectLike.js');

var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return (0, _isObjectLike2.default)(value) && (0, _isArrayLike2.default)(value);
}

exports.default = isArrayLikeObject;

},{"./isArrayLike.js":31,"./isObjectLike.js":36}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isObject = require('./isObject.js');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array and weak map constructors,
  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = (0, _isObject2.default)(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

exports.default = isFunction;

},{"./isObject.js":35}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length,
 *  else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

exports.default = isLength;

},{}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return !!value && (type == 'object' || type == 'function');
}

exports.default = isObject;

},{}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

exports.default = isObjectLike;

},{}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isArray = require('./isArray.js');

var _isArray2 = _interopRequireDefault(_isArray);

var _isObjectLike = require('./isObjectLike.js');

var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' || !(0, _isArray2.default)(value) && (0, _isObjectLike2.default)(value) && objectToString.call(value) == stringTag;
}

exports.default = isString;

},{"./isArray.js":30,"./isObjectLike.js":36}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _isObjectLike = require('./isObjectLike.js');

var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || (0, _isObjectLike2.default)(value) && objectToString.call(value) == symbolTag;
}

exports.default = isSymbol;

},{"./isObjectLike.js":36}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseHas = require('./_baseHas.js');

var _baseHas2 = _interopRequireDefault(_baseHas);

var _baseKeys = require('./_baseKeys.js');

var _baseKeys2 = _interopRequireDefault(_baseKeys);

var _indexKeys = require('./_indexKeys.js');

var _indexKeys2 = _interopRequireDefault(_indexKeys);

var _isArrayLike = require('./isArrayLike.js');

var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

var _isIndex = require('./_isIndex.js');

var _isIndex2 = _interopRequireDefault(_isIndex);

var _isPrototype = require('./_isPrototype.js');

var _isPrototype2 = _interopRequireDefault(_isPrototype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  var isProto = (0, _isPrototype2.default)(object);
  if (!(isProto || (0, _isArrayLike2.default)(object))) {
    return (0, _baseKeys2.default)(object);
  }
  var indexes = (0, _indexKeys2.default)(object),
      skipIndexes = !!indexes,
      result = indexes || [],
      length = result.length;

  for (var key in object) {
    if ((0, _baseHas2.default)(object, key) && !(skipIndexes && (key == 'length' || (0, _isIndex2.default)(key, length))) && !(isProto && key == 'constructor')) {
      result.push(key);
    }
  }
  return result;
}

exports.default = keys;

},{"./_baseHas.js":20,"./_baseKeys.js":21,"./_indexKeys.js":26,"./_isIndex.js":27,"./_isPrototype.js":28,"./isArrayLike.js":31}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * A method that returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

exports.default = noop;

},{}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apply = require('./_apply.js');

var _apply2 = _interopRequireDefault(_apply);

var _toInteger = require('./toInteger.js');

var _toInteger2 = _interopRequireDefault(_toInteger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as
 * an array.
 *
 * **Note:** This method is based on the
 * [rest parameter](https://mdn.io/rest_parameters).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.rest(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function rest(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? func.length - 1 : (0, _toInteger2.default)(start), 0);
  return function () {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    switch (start) {
      case 0:
        return func.call(this, array);
      case 1:
        return func.call(this, args[0], array);
      case 2:
        return func.call(this, args[0], args[1], array);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return (0, _apply2.default)(func, this, otherArgs);
  };
}

exports.default = rest;

},{"./_apply.js":19,"./toInteger.js":43}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toNumber = require('./toNumber.js');

var _toNumber2 = _interopRequireDefault(_toNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = (0, _toNumber2.default)(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

exports.default = toFinite;

},{"./toNumber.js":44}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toFinite = require('./toFinite.js');

var _toFinite2 = _interopRequireDefault(_toFinite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = (0, _toFinite2.default)(value),
      remainder = result % 1;

  return result === result ? remainder ? result - remainder : result : 0;
}

exports.default = toInteger;

},{"./toFinite.js":42}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFunction = require('./isFunction.js');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isObject = require('./isObject.js');

var _isObject2 = _interopRequireDefault(_isObject);

var _isSymbol = require('./isSymbol.js');

var _isSymbol2 = _interopRequireDefault(_isSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if ((0, _isSymbol2.default)(value)) {
    return NAN;
  }
  if ((0, _isObject2.default)(value)) {
    var other = (0, _isFunction2.default)(value.valueOf) ? value.valueOf() : value;
    value = (0, _isObject2.default)(other) ? other + '' : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

exports.default = toNumber;

},{"./isFunction.js":33,"./isObject.js":35,"./isSymbol.js":38}],45:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (root, factory) {
  if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    root.urltemplate = factory();
  }
})(undefined, function () {
  /**
   * @constructor
   */
  function UrlTemplate() {}

  /**
   * @private
   * @param {string} str
   * @return {string}
   */
  UrlTemplate.prototype.encodeReserved = function (str) {
    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
      if (!/%[0-9A-Fa-f]/.test(part)) {
        part = encodeURI(part);
      }
      return part;
    }).join('');
  };

  /**
   * @private
   * @param {string} operator
   * @param {string} value
   * @param {string} key
   * @return {string}
   */
  UrlTemplate.prototype.encodeValue = function (operator, value, key) {
    value = operator === '+' || operator === '#' ? this.encodeReserved(value) : encodeURIComponent(value);

    if (key) {
      return encodeURIComponent(key) + '=' + value;
    } else {
      return value;
    }
  };

  /**
   * @private
   * @param {*} value
   * @return {boolean}
   */
  UrlTemplate.prototype.isDefined = function (value) {
    return value !== undefined && value !== null;
  };

  /**
   * @private
   * @param {string}
   * @return {boolean}
   */
  UrlTemplate.prototype.isKeyOperator = function (operator) {
    return operator === ';' || operator === '&' || operator === '?';
  };

  /**
   * @private
   * @param {Object} context
   * @param {string} operator
   * @param {string} key
   * @param {string} modifier
   */
  UrlTemplate.prototype.getValues = function (context, operator, key, modifier) {
    var value = context[key],
        result = [];

    if (this.isDefined(value) && value !== '') {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        value = value.toString();

        if (modifier && modifier !== '*') {
          value = value.substring(0, parseInt(modifier, 10));
        }

        result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));
      } else {
        if (modifier === '*') {
          if (Array.isArray(value)) {
            value.filter(this.isDefined).forEach(function (value) {
              result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));
            }, this);
          } else {
            Object.keys(value).forEach(function (k) {
              if (this.isDefined(value[k])) {
                result.push(this.encodeValue(operator, value[k], k));
              }
            }, this);
          }
        } else {
          var tmp = [];

          if (Array.isArray(value)) {
            value.filter(this.isDefined).forEach(function (value) {
              tmp.push(this.encodeValue(operator, value));
            }, this);
          } else {
            Object.keys(value).forEach(function (k) {
              if (this.isDefined(value[k])) {
                tmp.push(encodeURIComponent(k));
                tmp.push(this.encodeValue(operator, value[k].toString()));
              }
            }, this);
          }

          if (this.isKeyOperator(operator)) {
            result.push(encodeURIComponent(key) + '=' + tmp.join(','));
          } else if (tmp.length !== 0) {
            result.push(tmp.join(','));
          }
        }
      }
    } else {
      if (operator === ';') {
        result.push(encodeURIComponent(key));
      } else if (value === '' && (operator === '&' || operator === '?')) {
        result.push(encodeURIComponent(key) + '=');
      } else if (value === '') {
        result.push('');
      }
    }
    return result;
  };

  /**
   * @param {string} template
   * @return {function(Object):string}
   */
  UrlTemplate.prototype.parse = function (template) {
    var that = this;
    var operators = ['+', '#', '.', '/', ';', '?', '&'];

    return {
      expand: function expand(context) {
        return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
          if (expression) {
            var operator = null,
                values = [];

            if (operators.indexOf(expression.charAt(0)) !== -1) {
              operator = expression.charAt(0);
              expression = expression.substr(1);
            }

            expression.split(/,/g).forEach(function (variable) {
              var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
              values.push.apply(values, that.getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
            });

            if (operator && operator !== '+') {
              var separator = ',';

              if (operator === '?') {
                separator = '&';
              } else if (operator !== '#') {
                separator = operator;
              }
              return (values.length !== 0 ? operator : '') + values.join(separator);
            } else {
              return values.join(',');
            }
          } else {
            return that.encodeReserved(literal);
          }
        });
      }
    };
  };

  return new UrlTemplate();
});

},{}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chromeUtils = require('../utils/chrome-utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var namespace = function namespace() {
  return chrome.cookies;
};

var CookieFacade = function () {
  function CookieFacade(url, name) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, CookieFacade);

    this.__url = url;
    this.__name = name;
    this.__baseOptions = options;
  }

  _createClass(CookieFacade, [{
    key: 'setCookie',
    value: function setCookie(value) {
      var options = _extends({ url: this.__url, name: this.__name, value: value }, this.__baseOptions);
      return (0, _chromeUtils.wrapChromeApi)(namespace(), 'set', options);
    }
  }, {
    key: 'getCookie',
    value: function getCookie() {
      return (0, _chromeUtils.wrapChromeApi)(namespace(), 'get', { url: this.__url, name: this.__name });
    }
  }]);

  return CookieFacade;
}();

exports.default = CookieFacade;

},{"../utils/chrome-utils":105}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var details = function () {
  try {
    // Chrome
    return chrome.app.getDetails();
  } catch (e) {
    try {
      var _require = require('sdk/self');

      var id = _require.id;
      var version = _require.version;
      var name = _require.name;

      return { id: id, version: version, name: name };
    } catch (e) {
      return {};
    }
  }
}();

exports.default = details;

},{"sdk/self":"sdk/self"}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _binstring = require('binstring');

var _binstring2 = _interopRequireDefault(_binstring);

var _firefoxUtils = require('../utils/firefox-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RootKeys = {
  HKEY_CLASSES_ROOT: 'ROOT_KEY_CLASSES_ROOT',
  HKEY_CURRENT_USER: 'ROOT_KEY_CURRENT_USER',
  HKEY_LOCAL_MACHINE: 'ROOT_KEY_LOCAL_MACHINE'
};

var FirefoxRegistryFacade = function () {
  function FirefoxRegistryFacade(path) {
    _classCallCheck(this, FirefoxRegistryFacade);

    // Части пути
    var parts = path.split(/\\/);

    // Название корневого раздела
    var hKey = parts.shift();

    // Полный путь
    this.path = path;
    this.root = RootKeys[hKey];
    this.section = parts.join('\\');
    this.wrk = null;
  }

  _createClass(FirefoxRegistryFacade, [{
    key: 'open',
    value: function open() {
      if (this.wrk !== null) {
        throw new Error('Registry path "' + this.path + '" already open.');
      }

      var wrk = _firefoxUtils.Cc['@mozilla.org/windows-registry-key;1'].createInstance(_firefoxUtils.Ci.nsIWindowsRegKey);

      wrk.open(wrk[this.root], this.section, wrk.ACCESS_READ);
      this.wrk = wrk;

      return this;
    }
  }, {
    key: 'readBinary',
    value: function readBinary(name /* undefined for default key */) {
      if (this.wrk === null) {
        throw new Error('readBinary: call "open" method before read.');
      }

      var bytes = this.wrk.readBinaryValue(name);
      var value = (0, _binstring2.default)(bytes, { in: 'binary', out: 'utf8' });

      return value;
    }
  }, {
    key: 'readString',
    value: function readString(name /* undefined for default key */) {
      if (this.wrk === null) {
        throw new Error('readString: call "open" method before read.');
      }

      var value = this.wrk.readStringValue(name);

      return value;
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.wrk === null) {
        throw new Error('Registry path "' + this.path + '" already close.');
      }

      this.wrk.close();
      this.wrk = null;
    }
  }]);

  return FirefoxRegistryFacade;
}();

exports.default = FirefoxRegistryFacade;

},{"../utils/firefox-utils":108,"binstring":13}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _firefoxUtils = require('../utils/firefox-utils');

var _extensionDetails = require('./extension-details');

var _extensionDetails2 = _interopRequireDefault(_extensionDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocalStorageFacade = function () {
  function LocalStorageFacade(key) {
    _classCallCheck(this, LocalStorageFacade);

    this.__key = key;
  }

  _createClass(LocalStorageFacade, [{
    key: 'hasData',
    value: function hasData() {
      var _this = this;

      return new Promise(function (resolve) {
        var data = localStorage.getItem(_this.__key);
        resolve(data !== null);
      });
    }
  }, {
    key: 'setData',
    value: function setData(data) {
      var _this2 = this;

      console.info('Saving data to storage under key', this.__key, ':', data);
      return new Promise(function (resolve) {
        localStorage.setItem(_this2.__key, JSON.stringify(data));
        resolve(data);
      });
    }
  }, {
    key: 'getData',
    value: function getData() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var data = localStorage.getItem(_this3.__key);
        if (data === null) {
          return reject('Data not found');
        }
        resolve(JSON.parse(data));
      });
    }
  }]);

  return LocalStorageFacade;
}();

var MozillaPreferencesFacade = function () {
  function MozillaPreferencesFacade(key) {
    _classCallCheck(this, MozillaPreferencesFacade);

    this.__key = key;
    this.__storage = _firefoxUtils.Cc["@mozilla.org/preferences;1"].getService(_firefoxUtils.Ci.nsIPrefBranch);
  }

  _createClass(MozillaPreferencesFacade, [{
    key: 'hasData',
    value: function hasData() {
      return this.getData().then(function (_) {
        return true;
      }, function (_) {
        return false;
      });
    }
  }, {
    key: 'setData',
    value: function setData(data) {
      var _this4 = this;

      console.info('Saving data to storage under key', this.__key, ':', data);
      return new Promise(function (resolve) {
        var str = _firefoxUtils.Cc["@mozilla.org/supports-string;1"].createInstance(_firefoxUtils.Ci.nsISupportsString);
        str.data = JSON.stringify(data);

        _this4.__storage.setComplexValue(_this4.storageKey, _firefoxUtils.Ci.nsISupportsString, str);
        resolve(data);
      });
    }
  }, {
    key: 'getData',
    value: function getData() {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        var data = void 0;

        try {
          data = JSON.parse(_this5.__storage.getComplexValue(_this5.storageKey, _firefoxUtils.Ci.nsISupportsString).data);
        } catch (e) {
          // nope
        }

        if (data === undefined) {
          return reject('Data not found');
        }

        resolve(data);
      });
    }
  }, {
    key: 'storageKey',
    get: function get() {
      return 'extensions.' + _extensionDetails2.default.id + '.' + this.__key;
    }
  }]);

  return MozillaPreferencesFacade;
}();

var StorageFacade = void 0;

if (typeof localStorage !== 'undefined') {
  StorageFacade = LocalStorageFacade;
} else {
  StorageFacade = MozillaPreferencesFacade;
}

exports.default = StorageFacade;

},{"../utils/firefox-utils":108,"./extension-details":47}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cookieFacade = require('./cookie-facade');

var _cookieFacade2 = _interopRequireDefault(_cookieFacade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MultiCookieReader = function () {
  function MultiCookieReader() {
    _classCallCheck(this, MultiCookieReader);

    for (var _len = arguments.length, pairs = Array(_len), _key = 0; _key < _len; _key++) {
      pairs[_key] = arguments[_key];
    }

    this.__facades = pairs.map(function (_ref) {
      var url = _ref.url;
      var name = _ref.name;
      return new _cookieFacade2.default(url, name);
    });
  }

  _createClass(MultiCookieReader, [{
    key: 'getAllCookies',
    value: function getAllCookies() {
      return Promise.all(this.__facades.map(function (facade) {
        return facade.getCookie();
      }));
    }
  }]);

  return MultiCookieReader;
}();

exports.default = MultiCookieReader;

},{"./cookie-facade":46}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var namespace = function namespace() {
  try {
    return chrome.alarms;
  } catch (e) {
    return null;
  }
};

var ScheduleManagerChrome = function () {
  function ScheduleManagerChrome() {
    var _this = this;

    _classCallCheck(this, ScheduleManagerChrome);

    this.__schedulers = new Map();

    namespace().onAlarm.addListener(function (alarm) {
      var name = alarm.name;
      if (_this.__schedulers.has(name)) {
        var handler = _this.__schedulers.get(name);
        handler();
        _this.__clear(name);
      }
    });
  }

  _createClass(ScheduleManagerChrome, [{
    key: 'schedule',
    value: function schedule(name, when, callback) {
      console.info('Setting up alarm', name, 'at', when);
      if (this.__schedulers.has(name)) {
        return console.error('Alarm already set');
      }
      namespace().create(name, { when: when.getTime() });
      this.__schedulers.set(name, callback);
    }
  }, {
    key: '__clear',
    value: function __clear(name) {
      if (this.__schedulers.has(name)) {
        namespace().clear(name);
        this.__schedulers.delete(name);
      }
    }
  }]);

  return ScheduleManagerChrome;
}();

var ScheduleManagerStub = function () {
  function ScheduleManagerStub() {
    _classCallCheck(this, ScheduleManagerStub);
  }

  _createClass(ScheduleManagerStub, [{
    key: 'schedule',
    value: function schedule() {}
  }, {
    key: '__clear',
    value: function __clear() {}
  }]);

  return ScheduleManagerStub;
}();

var ScheduleManager = void 0;

if (namespace()) {
  ScheduleManager = ScheduleManagerChrome;
} else {
  ScheduleManager = ScheduleManagerStub;
}

exports.default = ScheduleManager;

},{}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoCacheMixin = exports.CredentialsMixin = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _fetch2 = require('../utils/fetch');

var _fetch3 = _interopRequireDefault(_fetch2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function optionsMixinFactory(options) {
  return function (Clazz) {
    return function (_Clazz) {
      _inherits(_class, _Clazz);

      function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
      }

      _createClass(_class, [{
        key: 'fetch',
        value: function fetch() {
          var additionalOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

          return _get(Object.getPrototypeOf(_class.prototype), 'fetch', this).call(this, _extends({}, additionalOptions, options));
        }
      }]);

      return _class;
    }(Clazz);
  };
}

var CredentialsMixin = exports.CredentialsMixin = optionsMixinFactory({ credentials: 'include' });

var NoCacheMixin = exports.NoCacheMixin = optionsMixinFactory({ cache: 'no-store' });

var UrlFetcher = function () {
  function UrlFetcher(url) {
    var baseOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, UrlFetcher);

    this.__url = url;
    this.__baseOptions = baseOptions;
  }

  _createClass(UrlFetcher, [{
    key: 'fetch',
    value: function fetch() {
      var additionalOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return (0, _fetch3.default)(this.__url, _extends({}, this.__baseOptions, additionalOptions));
    }
  }]);

  return UrlFetcher;
}();

exports.default = UrlFetcher;

},{"../utils/fetch":107}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _guid = require('../utils/guid');

var _guid2 = _interopRequireDefault(_guid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var event = function event() {
  return chrome.webRequest.onCompleted;
};

var UrlWatcher = function () {
  function UrlWatcher() {
    _classCallCheck(this, UrlWatcher);

    this.__callbacks = new Map();
  }

  _createClass(UrlWatcher, [{
    key: 'watch',
    value: function watch(urls, callback) {
      var id = (0, _guid2.default)();
      var listener = function listener(details) {
        return callback.call();
      };
      try {
        event().addListener(listener, { urls: urls, types: ['main_frame'] });
        this.__callbacks.set(id, listener);
      } catch (err) {}
      return id;
    }
  }, {
    key: 'unwatch',
    value: function unwatch(id) {
      if (this.__callbacks.has(id)) {
        var listener = this.__callbacks.get(id);
        event().removeListener(listener);
        this.__callbacks.delete(id);
      }
    }
  }, {
    key: 'unwatchAll',
    value: function unwatchAll() {
      var _this = this;

      this.__callbacks.keys().forEach(function (id) {
        return _this.unwatch(id);
      });
    }
  }]);

  return UrlWatcher;
}();

exports.default = UrlWatcher;

},{"../utils/guid":109}],54:[function(require,module,exports){
"use strict";

var config = require("../configs/fx-config.json");
module.exports = config;

},{"../configs/fx-config.json":1}],55:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var MAPPINGS = exports.MAPPINGS = {
  'product_type': 'kind'
};

var EXCLUDED_FIELDS = exports.EXCLUDED_FIELDS = ['fr', 'go_parameters', 'go_metric_url', 'mrds_parameters', 'mrds_metric_url', 'partner_product_online_url', 'partner_install_parameters'];

},{}],56:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _each = require('async-es/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DistributionCommonModule = function () {
  function DistributionCommonModule(extensionDataGenerator, extensionDataStorage) {
    var additionalExtensionData = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, DistributionCommonModule);

    this.__extensionDataStorage = extensionDataStorage;
    this.__extensionDataGenerator = extensionDataGenerator;
    this.__additionalExtensionData = additionalExtensionData;
    this.__plugins = new Map();
  }

  _createClass(DistributionCommonModule, [{
    key: 'getExtensionData',
    value: function getExtensionData() {
      return this.__extensionDataStorage.getData();
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      return this.__generateExtensionData().then(function () {
        return _this.__runPlugins();
      });
    }
  }, {
    key: 'registerPlugin',
    value: function registerPlugin(plugin) {
      plugin.setHost(this);
      this.__plugins.set(plugin.getName(), plugin);
      return this;
    }
  }, {
    key: '__generateExtensionData',
    value: function __generateExtensionData() {
      var _this2 = this;

      return this.__extensionDataStorage.hasData().then(function (hasData) {
        if (hasData) {
          return;
        }
        return _this2.__extensionDataGenerator.generateExtensionData().then(function (extensionData) {
          return _extends({}, extensionData, _this2.__additionalExtensionData);
        }).then(function (extensionData) {
          return _this2.__extensionDataStorage.setData(extensionData);
        });
      });
    }
  }, {
    key: '__runPlugins',
    value: function __runPlugins() {
      var _this3 = this;

      (0, _each2.default)(this.__plugins.keys(), function (key, callback) {
        var plugin = _this3.__plugins.get(key);
        console.info('>>> RUN', plugin.getName());
        plugin.run().then(callback);
      });
    }
  }]);

  return DistributionCommonModule;
}();

exports.default = DistributionCommonModule;

},{"async-es/each":2}],57:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _deepAssign = require('deep-assign');

var _deepAssign2 = _interopRequireDefault(_deepAssign);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _extensionDetails = require('./common/extension-details');

var _extensionDetails2 = _interopRequireDefault(_extensionDetails);

var _dataGenerators = require('./modules/data-generators');

var _dataGenerators2 = _interopRequireDefault(_dataGenerators);

var _metricSenders = require('./modules/metric-senders');

var _metricSenders2 = _interopRequireDefault(_metricSenders);

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

var _guid = require('./utils/guid');

var _guid2 = _interopRequireDefault(_guid);

var _localStorageFacade = require('./common/local-storage-facade');

var _localStorageFacade2 = _interopRequireDefault(_localStorageFacade);

var _cookieFacade = require('./common/cookie-facade');

var _cookieFacade2 = _interopRequireDefault(_cookieFacade);

var _multiCookieReader = require('./common/multi-cookie-reader');

var _multiCookieReader2 = _interopRequireDefault(_multiCookieReader);

var _scheduleManager = require('./common/schedule-manager');

var _scheduleManager2 = _interopRequireDefault(_scheduleManager);

var _urlFetcher = require('./common/url-fetcher');

var _urlFetcher2 = _interopRequireDefault(_urlFetcher);

var _urlWatcher = require('./common/url-watcher');

var _urlWatcher2 = _interopRequireDefault(_urlWatcher);

var _metricManager = require('./modules/metric-manager');

var _metricManager2 = _interopRequireDefault(_metricManager);

var _oneLinkExtensionDataGenerator = require('./modules/one-link-extension-data-generator');

var _oneLinkExtensionDataGenerator2 = _interopRequireDefault(_oneLinkExtensionDataGenerator);

var _extensionDataGenerator = require('./modules/extension-data-generator');

var _extensionDataGenerator2 = _interopRequireDefault(_extensionDataGenerator);

var _nativeMessageSender = require('./modules/native-message-sender');

var _nativeMessageSender2 = _interopRequireDefault(_nativeMessageSender);

var _notificationConfigService = require('./modules/notifications/notification-config-service');

var _notificationConfigService2 = _interopRequireDefault(_notificationConfigService);

var _notificationHistoryManager = require('./modules/notifications/notification-history-manager');

var _notificationHistoryManager2 = _interopRequireDefault(_notificationHistoryManager);

var _distributionCommonModule = require('./distribution-common-module');

var _distributionCommonModule2 = _interopRequireDefault(_distributionCommonModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function factory() {
  var extensionData = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var additionalConfig = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var createMetricConfiguration = function createMetricConfiguration(url, parameters, storageKey) {
    return { url: url, parameters: parameters, storage: new _localStorageFacade2.default(storageKey) };
  };

  var getPermissions = function getPermissions() {
    var permissions = new Set();
    try {
      var manifest = chrome.runtime.getManifest();
      manifest.permissions.forEach(permissions.add.bind(permissions));
    } catch (e) {}
    return permissions;
  };

  var convertMixinsToSet = function convertMixinsToSet() {
    var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    var result = new Set();
    items.forEach(result.add.bind(result));
    return result;
  };

  var supportsCookies = function supportsCookies(permissions) {
    return permissions.has('cookies');
  };

  var supportsNativeMessaging = function supportsNativeMessaging(permissions) {
    return permissions.has('nativeMessaging');
  };

  var supportsNotifications = function supportsNotifications(permissions) {
    return permissions.has('notifications');
  };

  var supportsWebRequest = function supportsWebRequest(permissions) {
    return permissions.has('webRequest');
  };

  var createExtensionDataGenerator = function createExtensionDataGenerator(permissions, options, data) {
    if (options.oneLink === true && supportsCookies(permissions)) {
      var _ret = function () {
        var oneLinkUrl = 'https://mail.ru';
        var pairs = ['mr1lad', 'mr1luid', 'mr1lext', 'VID'].map(function (name) {
          return { url: oneLinkUrl, name: name };
        });
        var multiCookieReader = new (Function.prototype.bind.apply(_multiCookieReader2.default, [null].concat(_toConsumableArray(pairs))))();
        return {
          v: new _oneLinkExtensionDataGenerator2.default(multiCookieReader, data)
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
    return new _extensionDataGenerator2.default(data);
  };

  var moduleClass = _distributionCommonModule2.default;

  var permissions = getPermissions();
  var options = (0, _deepAssign2.default)({}, _config2.default, additionalConfig);
  var mixinSet = convertMixinsToSet(options.mixins);
  console.info('All options:', options);
  console.info('All mixins:', mixinSet);

  var extensionDataStorage = new _localStorageFacade2.default(options.localStorage.key);
  var additionalExtensionData = _extends({}, options.extensionData, extensionData);
  var extensionDataGenerator = createExtensionDataGenerator(permissions, options, additionalExtensionData);

  extensionDataGenerator.addGenerator(new _dataGenerators2.default.FirefoxPrefsGenerator(_extensionDetails2.default.id));
  extensionDataGenerator.addGenerator(new _dataGenerators2.default.FirefoxRegistryGenerator(_extensionDetails2.default.id));
  extensionDataGenerator.addGenerator(new _dataGenerators2.default.LegacyDataGenerator());

  if (supportsNativeMessaging(permissions) && options.nativeMessaging) {
    var nativeMessageSender = new _nativeMessageSender2.default(options.nativeMessaging.host);
    extensionDataGenerator.addGenerator(new _dataGenerators2.default.NativeMessagingDataGenerator(_extensionDetails2.default.id, nativeMessageSender));
    if (mixinSet.has('nativeMessaging')) {
      moduleClass = _mixins2.default.NativeMessagingMixin(moduleClass, nativeMessageSender);
    }
  }

  if (supportsCookies(permissions) && options.shortTermCookie) {
    var shortTermCookieFacade = new _cookieFacade2.default(options.shortTermCookie.url, options.shortTermCookie.name);
    extensionDataGenerator.addGenerator(new _dataGenerators2.default.CookieDataGenerator(shortTermCookieFacade));
  }

  extensionDataGenerator.addGenerator(new _dataGenerators2.default.DefaultDataGenerator());

  var mrdsSender = options.metrics ? new _metricSenders2.default.MetricSender(options.metrics.mrds.url, options.metrics.mrds.parameters) : new _metricSenders2.default.DummyMetricSender();

  if (mixinSet.has('mrdsMetrics')) {
    moduleClass = _mixins2.default.MrdsMetricsMixin(moduleClass, mrdsSender);
  }

  if (supportsNotifications(permissions) && mixinSet.has('notifications')) {
    moduleClass = _mixins2.default.NotificationsMixin(moduleClass);
  }

  var module = new moduleClass(extensionDataGenerator, extensionDataStorage);
  var scheduler = new _scheduleManager2.default();

  if (options.metrics) {
    var metricManager = new _metricManager2.default();
    var metrics = options.metrics;
    var mrdsMetricConfiguration = createMetricConfiguration(metrics.mrds.url, metrics.mrds.parameters, 'metric_state_mrds_metric');
    var goMetricConfiguration = createMetricConfiguration(metrics.go.url, metrics.go.parameters, 'metric_state_go_metric');
    var partnerMetricConfiguration = createMetricConfiguration(null, metrics.partnerInstall.parameters, 'metric_state_installPartnerMetric');

    module.registerPlugin(new _plugins2.default.OnlineMetricsPlugin(metricManager, scheduler, mrdsMetricConfiguration, goMetricConfiguration, partnerMetricConfiguration));
  }

  if (supportsCookies(permissions) && options.longTermCookie) {
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    var cookieOptions = { expirationDate: expirationDate.getTime() / 1000 };
    var longTermCookieFacade = new _cookieFacade2.default(options.longTermCookie.url, options.longTermCookie.name, cookieOptions);

    module.registerPlugin(new _plugins2.default.LongTermCookiePlugin(longTermCookieFacade, scheduler));
  }

  if (options.rbTargeting) {
    module.registerPlugin(new _plugins2.default.PixelFetcherPlugin(options.rbTargeting.url, scheduler));
  }

  if (supportsCookies(permissions) && options.uninstall) {
    var cookieName = 'uninstall_' + (0, _guid2.default)();
    var uninstallCookieFacade = new _cookieFacade2.default(options.uninstall.url, cookieName);
    module.registerPlugin(new _plugins2.default.UninstallUrlPlugin(options.uninstall.url, cookieName, uninstallCookieFacade));
  }

  if (supportsWebRequest(permissions) && supportsNotifications(permissions) && options.notifications) {
    var FetcherClass = (0, _urlFetcher.CredentialsMixin)(_urlFetcher2.default);
    var urlFetcher = new FetcherClass(options.notifications.configUrl + '?rnd=' + Date.now().toString());
    var notificationHistoryStorage = new _localStorageFacade2.default(options.notifications.storageKey || 'notifications_history');
    var notificationConfigService = new _notificationConfigService2.default(urlFetcher);
    var notificationHistoryManager = new _notificationHistoryManager2.default(notificationHistoryStorage);
    var urlWatcher = new _urlWatcher2.default();

    module.registerPlugin(new _plugins2.default.NotificationsPlugin(notificationConfigService, notificationHistoryManager, scheduler, urlWatcher, mrdsSender));
  }

  return module;
};

if (typeof window !== 'undefined') {
  window.distributionModuleFactory = factory;
}

module.exports = factory;

},{"./common/cookie-facade":46,"./common/extension-details":47,"./common/local-storage-facade":49,"./common/multi-cookie-reader":50,"./common/schedule-manager":51,"./common/url-fetcher":52,"./common/url-watcher":53,"./config":54,"./distribution-common-module":56,"./mixins":58,"./modules/data-generators":67,"./modules/extension-data-generator":70,"./modules/metric-manager":71,"./modules/metric-senders":74,"./modules/native-message-sender":78,"./modules/notifications/notification-config-service":85,"./modules/notifications/notification-history-manager":87,"./modules/one-link-extension-data-generator":97,"./plugins":99,"./utils/guid":109,"deep-assign":16}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mrdsMetricMixin = require('./mrds-metric-mixin');

var _mrdsMetricMixin2 = _interopRequireDefault(_mrdsMetricMixin);

var _nativeMessagingMixin = require('./native-messaging-mixin');

var _nativeMessagingMixin2 = _interopRequireDefault(_nativeMessagingMixin);

var _notificationsMixin = require('./notifications-mixin');

var _notificationsMixin2 = _interopRequireDefault(_notificationsMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  MrdsMetricsMixin: _mrdsMetricMixin2.default,
  NotificationsMixin: _notificationsMixin2.default,
  NativeMessagingMixin: _nativeMessagingMixin2.default
};

},{"./mrds-metric-mixin":59,"./native-messaging-mixin":60,"./notifications-mixin":61}],59:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports.default = function (Clazz, metricSender) {
  return function (_Clazz) {
    _inherits(_class, _Clazz);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'sendMrdsMetric',
      value: function sendMrdsMetric(additionalParameters) {
        return _get(Object.getPrototypeOf(_class.prototype), 'getExtensionData', this).call(this).then(function (extensionData) {
          var parameters = _extends({}, (0, _paramUtils.createMapper)(mrdsSettings.MAPPINGS)(_paramUtils.filter.apply(undefined, [extensionData].concat(_toConsumableArray(mrdsSettings.EXCLUDED_FIELDS)))), (0, _paramUtils.subset)(_extensionDetails2.default, 'version'), additionalParameters);
          return metricSender.send(parameters);
        });
      }
    }]);

    return _class;
  }(Clazz);
};

var _mrdsSettings = require('../constants/mrds-settings');

var mrdsSettings = _interopRequireWildcard(_mrdsSettings);

var _extensionDetails = require('../common/extension-details');

var _extensionDetails2 = _interopRequireDefault(_extensionDetails);

var _paramUtils = require('../utils/param-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

},{"../common/extension-details":47,"../constants/mrds-settings":55,"../utils/param-utils":111}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (Clazz, nativeMessageSender) {
  return function (_Clazz) {
    _inherits(_class, _Clazz);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
    }

    _createClass(_class, [{
      key: "sendNativeMessage",
      value: function sendNativeMessage(message) {
        return nativeMessageSender.sendNativeMessage(message);
      }
    }]);

    return _class;
  }(Clazz);
};

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

},{}],61:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (Clazz) {
  return function (_Clazz) {
    _inherits(_class, _Clazz);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'createNotification',
      value: function createNotification(options) {
        var handlers = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        return (0, _notificationFactory2.default)(_extends({ options: options }, handlers));
      }
    }]);

    return _class;
  }(Clazz);
};

var _notificationFactory = require('../modules/notifications/factory/notification-factory');

var _notificationFactory2 = _interopRequireDefault(_notificationFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

},{"../modules/notifications/factory/notification-factory":81}],62:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseDataGenerator = function () {
  function BaseDataGenerator() {
    _classCallCheck(this, BaseDataGenerator);
  }

  _createClass(BaseDataGenerator, [{
    key: 'generate',
    value: function generate() {
      return Promise.reject('Method should be overridden');
    }
  }]);

  return BaseDataGenerator;
}();

exports.default = BaseDataGenerator;

},{}],63:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseDataGenerator = require('./base-data-generator');

var _baseDataGenerator2 = _interopRequireDefault(_baseDataGenerator);

var _guid = require('../../utils/guid');

var _guid2 = _interopRequireDefault(_guid);

var _paramUtils = require('../../utils/param-utils');

var _queryString = require('../../utils/query-string');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mappings = {
  online_callback: 'partner_product_online_url'
};

var CookieDataGenerator = function (_BaseDataGenerator) {
  _inherits(CookieDataGenerator, _BaseDataGenerator);

  function CookieDataGenerator(cookieFacade) {
    _classCallCheck(this, CookieDataGenerator);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CookieDataGenerator).call(this));

    _this.__cookieFacade = cookieFacade;
    return _this;
  }

  _createClass(CookieDataGenerator, [{
    key: 'generate',
    value: function generate() {
      return this.__cookieFacade.getCookie().then(function (cookie) {
        if (cookie === null) {
          throw new Error('Specified cookie does not exist');
        }

        var generatedId = (0, _guid2.default)();
        var parsedCookie = (0, _queryString.parseQueryString)(cookie.value);

        return _extends({}, (0, _paramUtils.createMapper)(mappings)(parsedCookie), {
          product_id: generatedId,
          install_id: generatedId
        });
      });
    }
  }]);

  return CookieDataGenerator;
}(_baseDataGenerator2.default);

exports.default = CookieDataGenerator;

},{"../../utils/guid":109,"../../utils/param-utils":111,"../../utils/query-string":112,"./base-data-generator":62}],64:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseDataGenerator = require('./base-data-generator');

var _baseDataGenerator2 = _interopRequireDefault(_baseDataGenerator);

var _guid = require('../../utils/guid');

var _guid2 = _interopRequireDefault(_guid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultDataGenerator = function (_BaseDataGenerator) {
  _inherits(DefaultDataGenerator, _BaseDataGenerator);

  function DefaultDataGenerator() {
    _classCallCheck(this, DefaultDataGenerator);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DefaultDataGenerator).apply(this, arguments));
  }

  _createClass(DefaultDataGenerator, [{
    key: 'generate',
    value: function generate() {
      var generatedId = (0, _guid2.default)();

      return Promise.resolve({
        gp: 800000,
        product_id: generatedId,
        install_id: generatedId
      });
    }
  }]);

  return DefaultDataGenerator;
}(_baseDataGenerator2.default);

exports.default = DefaultDataGenerator;

},{"../../utils/guid":109,"./base-data-generator":62}],65:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _firefoxUtils = require('../../utils/firefox-utils');

var _paramUtils = require('../../utils/param-utils');

var _baseDataGenerator = require('./base-data-generator');

var _baseDataGenerator2 = _interopRequireDefault(_baseDataGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mappings = {
  rfr: 'gp',
  online_callback: 'partner_product_online_url',
  product_type: 'kind'
};

var parameterList = ['rfr', 'product_id', 'install_id', 'go_metric_url', 'mrds_metric_url', 'online_callback', 'product_type'];

var FirefoxPrefsGenerator = function (_BaseDataGenerator) {
  _inherits(FirefoxPrefsGenerator, _BaseDataGenerator);

  function FirefoxPrefsGenerator(extensionId) {
    _classCallCheck(this, FirefoxPrefsGenerator);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FirefoxPrefsGenerator).call(this));

    _this.__extensionId = extensionId;
    return _this;
  }

  _createClass(FirefoxPrefsGenerator, [{
    key: 'generate',
    value: function generate() {
      var _this2 = this;

      var branch = _firefoxUtils.Cc['@mozilla.org/preferences;1'].getService(_firefoxUtils.Ci.nsIPrefBranch);

      var getValue = function getValue(key) {
        try {
          return branch.getComplexValue('extensions.' + _this2.__extensionId + '.' + key, _firefoxUtils.Ci.nsISupportsString).data || '';
        } catch (e) {
          return '';
        }
      };

      try {
        var data = parameterList.reduce(function (data, key) {
          data[key] = getValue(key);
          return data;
        }, {});

        if (data.product_id !== '') {
          console.info('Firefox prefs gets data.');
          var result = (0, _paramUtils.createMapper)(mappings)(data);

          return Promise.resolve(result);
        } else {
          throw new Error('Prefs has no product_id');
        }
      } catch (e) {
        return Promise.reject(e);
      }
    }
  }]);

  return FirefoxPrefsGenerator;
}(_baseDataGenerator2.default);

exports.default = FirefoxPrefsGenerator;

},{"../../utils/firefox-utils":108,"../../utils/param-utils":111,"./base-data-generator":62}],66:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _firefoxUtils = require('../../utils/firefox-utils');

var _paramUtils = require('../../utils/param-utils');

var _baseDataGenerator = require('./base-data-generator');

var _baseDataGenerator2 = _interopRequireDefault(_baseDataGenerator);

var _firefoxRegistryFacade = require('../../common/firefox-registry-facade');

var _firefoxRegistryFacade2 = _interopRequireDefault(_firefoxRegistryFacade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mappings = {
  rfr: 'gp',
  online_callback: 'partner_product_online_url',
  product_type: 'kind'
};

var parameterList = ['rfr', 'product_id', 'install_id', 'go_metric_url', 'mrds_metric_url', 'online_callback', 'product_type', 'mrds_parameters'];

var sputnikParams = ['partner_product_online_url', 'rfr', 'product_id', 'install_id', 'product_type', 'mrds_metric_url', 'go_metric_url'];

/*{
  "install_id":"{424D3858-353C-4E55-A262-858923F3F289}",
  "mrds_parameters":[{"Id":"browser_class1","Value":true},{"Id":"browser_class2","Value":false},{"Id":"pa","Value":true},{"Id":"pb","Value":true},{"Id":"pd","Value":true}],
  "online_callback":"",
  "product_id":"{5A4610CF-2518-47E5-9582-16C1D367D1BB}",
  "rfr":"amigo"
}*/

var FirefoxRegistryGenerator = function (_BaseDataGenerator) {
  _inherits(FirefoxRegistryGenerator, _BaseDataGenerator);

  function FirefoxRegistryGenerator(extensionId) {
    _classCallCheck(this, FirefoxRegistryGenerator);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FirefoxRegistryGenerator).call(this));

    _this.__extensionId = extensionId;
    return _this;
  }

  _createClass(FirefoxRegistryGenerator, [{
    key: 'generate',
    value: function generate() {
      var _this2 = this;

      var registry = void 0;

      var registryKey = 'HKEY_CURRENT_USER\\Software\\Mail.Ru\\Tech\\ExternalES\\ff\\' + this.__extensionId;
      var branch = _firefoxUtils.Cc['@mozilla.org/preferences;1'].getService(_firefoxUtils.Ci.nsIPrefBranch);

      var setValue = function setValue(key, value) {
        var str = _firefoxUtils.Cc["@mozilla.org/supports-string;1"].createInstance(_firefoxUtils.Ci.nsISupportsString);
        str.data = String(value);

        branch.setComplexValue('extensions.' + _this2.__extensionId + '.' + key, _firefoxUtils.Ci.nsISupportsString, str);
      };

      try {
        var _ret = function () {
          registry = new _firefoxRegistryFacade2.default(registryKey).open();
          var regData = registry.readBinary();
          var jsonData = JSON.parse(regData);

          var data = parameterList.reduce(function (data, key) {
            var value = jsonData[key];

            if (value !== undefined) {
              data[key] = value;

              if (sputnikParams.indexOf(key) !== -1) {
                setValue(key, value); // сохраняем в префс для обратной совместимости со спутником
              }
            }

            return data;
          }, {});

          if (data.product_id !== '') {
            console.info('Firefox registry gets data.');
            var result = (0, _paramUtils.createMapper)(mappings)(data);

            return {
              v: Promise.resolve(result)
            };
          } else {
            throw new Error('Registry has no product_id');
          }
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      } catch (e) {
        return Promise.reject(e);
      } finally {
        if (registry) {
          registry.close();
        }
      }
    }
  }]);

  return FirefoxRegistryGenerator;
}(_baseDataGenerator2.default);

exports.default = FirefoxRegistryGenerator;

},{"../../common/firefox-registry-facade":48,"../../utils/firefox-utils":108,"../../utils/param-utils":111,"./base-data-generator":62}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cookieDataGenerator = require('./cookie-data-generator');

var _cookieDataGenerator2 = _interopRequireDefault(_cookieDataGenerator);

var _defaultDataGenerator = require('./default-data-generator');

var _defaultDataGenerator2 = _interopRequireDefault(_defaultDataGenerator);

var _nativeMessagingDataGenerator = require('./native-messaging-data-generator');

var _nativeMessagingDataGenerator2 = _interopRequireDefault(_nativeMessagingDataGenerator);

var _legacyDataGenerator = require('./legacy-data-generator');

var _legacyDataGenerator2 = _interopRequireDefault(_legacyDataGenerator);

var _firefoxPrefsGenerator = require('./firefox-prefs-generator');

var _firefoxPrefsGenerator2 = _interopRequireDefault(_firefoxPrefsGenerator);

var _firefoxRegistryGenerator = require('./firefox-registry-generator');

var _firefoxRegistryGenerator2 = _interopRequireDefault(_firefoxRegistryGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    CookieDataGenerator: _cookieDataGenerator2.default,
    NativeMessagingDataGenerator: _nativeMessagingDataGenerator2.default,
    LegacyDataGenerator: _legacyDataGenerator2.default,
    DefaultDataGenerator: _defaultDataGenerator2.default,
    FirefoxRegistryGenerator: _firefoxRegistryGenerator2.default,
    FirefoxPrefsGenerator: _firefoxPrefsGenerator2.default
};

},{"./cookie-data-generator":63,"./default-data-generator":64,"./firefox-prefs-generator":65,"./firefox-registry-generator":66,"./legacy-data-generator":68,"./native-messaging-data-generator":69}],68:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _paramUtils = require('../../utils/param-utils');

var _baseDataGenerator = require('./base-data-generator');

var _baseDataGenerator2 = _interopRequireDefault(_baseDataGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mappings = {
  rfr: 'gp'
};

var parameterList = ['rfr', 'product_id', 'install_id', 'go_metric_url', 'mrds_metric_url', 'partner_product_online_url', 'mrds_parameters'];

var LegacyDataGenerator = function (_BaseDataGenerator) {
  _inherits(LegacyDataGenerator, _BaseDataGenerator);

  function LegacyDataGenerator() {
    _classCallCheck(this, LegacyDataGenerator);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(LegacyDataGenerator).apply(this, arguments));
  }

  _createClass(LegacyDataGenerator, [{
    key: 'generate',
    value: function generate() {
      var data = {};
      try {
        parameterList.forEach(function (key) {
          var value = localStorage.getItem(key);
          if (value !== null) {
            data[key] = value;
          }
        });
      } catch (e) {
        console.error(e.message);
      }

      if (data.hasOwnProperty('product_id') && data.product_id !== '') {
        return Promise.resolve((0, _paramUtils.createMapper)(mappings)(data));
      }
      return Promise.reject(new Error('Legacy Sputnik data not found'));
    }
  }]);

  return LegacyDataGenerator;
}(_baseDataGenerator2.default);

exports.default = LegacyDataGenerator;

},{"../../utils/param-utils":111,"./base-data-generator":62}],69:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _paramUtils = require('../../utils/param-utils');

var _baseDataGenerator = require('./base-data-generator');

var _baseDataGenerator2 = _interopRequireDefault(_baseDataGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mappings = {
  rfr: 'gp',
  online_callback: 'partner_product_online_url'
};

var NativeMessagingDataGenerator = function (_BaseDataGenerator) {
  _inherits(NativeMessagingDataGenerator, _BaseDataGenerator);

  function NativeMessagingDataGenerator(extensionId, nativeMessagingModule) {
    _classCallCheck(this, NativeMessagingDataGenerator);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NativeMessagingDataGenerator).call(this));

    _this.__extensionId = extensionId;
    _this.__nativeMessageSender = nativeMessagingModule;
    return _this;
  }

  _createClass(NativeMessagingDataGenerator, [{
    key: 'generate',
    value: function generate() {
      return this.__nativeMessageSender.sendNativeMessage({ Action: 'GetExtInfo', ExtensionId: this.__extensionId }).then(function (response) {
        if (response.Error !== 0) {
          throw new Error('Native messaging error. Code: ' + response.Error);
        }
        return (0, _paramUtils.createMapper)(mappings)(response.InstallData);
      });
    }
  }]);

  return NativeMessagingDataGenerator;
}(_baseDataGenerator2.default);

exports.default = NativeMessagingDataGenerator;

},{"../../utils/param-utils":111,"./base-data-generator":62}],70:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _whilst = require('async-es/whilst');

var _whilst2 = _interopRequireDefault(_whilst);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExtensionDataGenerator = function () {
  function ExtensionDataGenerator(additionalExtensionData) {
    _classCallCheck(this, ExtensionDataGenerator);

    this.__generators = [];
    this.__additionalExtensionData = additionalExtensionData;
  }

  _createClass(ExtensionDataGenerator, [{
    key: 'addGenerator',
    value: function addGenerator(generator) {
      this.__generators.push(generator);
      return this;
    }
  }, {
    key: 'generateExtensionData',
    value: function generateExtensionData() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var queue = _this.__generators.reverse();
        var proceed = true;

        var iteratee = function iteratee(callback) {
          var generator = queue.pop();
          generator.generate().then(function (data) {
            console.info('Received extension data', data);
            proceed = false;
            callback(null, data);
          }).catch(function (err) {
            console.error('Extension data not available. Reason:', err);
            callback(null, null);
          });
        };

        var test = function test() {
          return proceed && queue.length > 0;
        };

        (0, _whilst2.default)(test, iteratee, function (err, data) {
          if (err) {
            return reject(err);
          }
          if (data === null) {
            return reject(new Error('No data was generated'));
          }
          console.info('Extension data generated', data);
          resolve(_extends({}, data, _this.__additionalExtensionData));
        });
      });
    }
  }]);

  return ExtensionDataGenerator;
}();

exports.default = ExtensionDataGenerator;

},{"async-es/whilst":11}],71:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _each = require('async-es/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MetricManager = function () {
  function MetricManager() {
    _classCallCheck(this, MetricManager);

    this.__senders = [];
  }

  _createClass(MetricManager, [{
    key: 'addSender',
    value: function addSender(metricSender) {
      this.__senders.push(metricSender);
      return this;
    }
  }, {
    key: 'sendMetrics',
    value: function sendMetrics() {
      var _this = this;

      var additionalParameters = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return new Promise(function (resolve) {
        (0, _each2.default)(_this.__senders, function (metricSender, callback) {
          metricSender.shouldBeSent().then(function (should) {
            if (should) {
              return metricSender.send(additionalParameters).then(function () {
                return callback(null);
              });
            }
            callback(null);
          });
        }, function () {
          return resolve(true);
        });
      });
    }
  }]);

  return MetricManager;
}();

exports.default = MetricManager;

},{"async-es/each":2}],72:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _statefulMetricSender = require('./stateful-metric-sender');

var _statefulMetricSender2 = _interopRequireDefault(_statefulMetricSender);

var _dateUtils = require('../../utils/date-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DailyMetricSender = function (_StatefulMetricSender) {
  _inherits(DailyMetricSender, _StatefulMetricSender);

  function DailyMetricSender(baseUrl, parameters, urlIsTemplate, sendCredentials, stateStorage) {
    var sendStateParameters = arguments.length <= 5 || arguments[5] === undefined ? true : arguments[5];

    _classCallCheck(this, DailyMetricSender);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DailyMetricSender).call(this, baseUrl, parameters, urlIsTemplate, sendCredentials, stateStorage));

    _this.__sendStateParameters = sendStateParameters;
    return _this;
  }

  _createClass(DailyMetricSender, [{
    key: 'send',
    value: function send(additionalParameters) {
      var _this2 = this;

      return this.__getState().then(function (state) {
        var currentDayNumber = state.lastDayNumber + 1;
        var parameters = _this2.__sendStateParameters ? _extends({}, additionalParameters, { day_num: currentDayNumber }) : _extends({}, additionalParameters);

        return _get(Object.getPrototypeOf(DailyMetricSender.prototype), 'send', _this2).call(_this2, parameters).then(function () {
          return _this2.__setState({
            lastDayNumber: currentDayNumber,
            lastDayDate: (0, _dateUtils.today)()
          });
        });
      });
    }
  }, {
    key: 'shouldBeSent',
    value: function shouldBeSent() {
      return this.__getState().then(function (state) {
        return !state.lastDayDate || (0, _dateUtils.today)() > new Date(state.lastDayDate);
      });
    }
  }, {
    key: '__getDefaultState',
    value: function __getDefaultState() {
      return Promise.resolve({
        lastDayNumber: 0,
        lastDayDate: undefined
      });
    }
  }]);

  return DailyMetricSender;
}(_statefulMetricSender2.default);

exports.default = DailyMetricSender;

},{"../../utils/date-utils":106,"./stateful-metric-sender":77}],73:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DummyMetricSender = function () {
  function DummyMetricSender() {
    _classCallCheck(this, DummyMetricSender);
  }

  _createClass(DummyMetricSender, [{
    key: 'send',
    value: function send() {
      console.log('Dummy metric sender');
      return Promise.resolve(true);
    }
  }]);

  return DummyMetricSender;
}();

exports.default = DummyMetricSender;

},{}],74:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dummyMetricSender = require('./dummy-metric-sender');

var _dummyMetricSender2 = _interopRequireDefault(_dummyMetricSender);

var _dailyMetricSender = require('./daily-metric-sender');

var _dailyMetricSender2 = _interopRequireDefault(_dailyMetricSender);

var _onceMetricSender = require('./once-metric-sender');

var _onceMetricSender2 = _interopRequireDefault(_onceMetricSender);

var _metricSender = require('./metric-sender');

var _metricSender2 = _interopRequireDefault(_metricSender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { MetricSender: _metricSender2.default, DailyMetricSender: _dailyMetricSender2.default, OnceMetricSender: _onceMetricSender2.default, DummyMetricSender: _dummyMetricSender2.default };

},{"./daily-metric-sender":72,"./dummy-metric-sender":73,"./metric-sender":75,"./once-metric-sender":76}],75:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _paramUtils = require('../../utils/param-utils');

var _fetch = require('../../utils/fetch');

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mappings = {
  day_num: 'DAYNUM',
  version: 'VERSION'
};

var MetricSender = function () {
  function MetricSender(baseUrl) {
    var baseParameters = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var urlIsTemplate = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
    var sendCredentials = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

    _classCallCheck(this, MetricSender);

    this.__baseUrl = baseUrl;
    this.__baseParameters = baseParameters;
    this.__urlIsTemplate = urlIsTemplate;
    this.__sendCredentials = sendCredentials;
  }

  _createClass(MetricSender, [{
    key: 'send',
    value: function send() {
      var additionalParameters = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var parameters = _extends({}, this.__baseParameters, additionalParameters);
      var url = this.__urlIsTemplate ? (0, _paramUtils.addParametersToUrlTemplate)((0, _paramUtils.normalizeUrlTemplate)(this.__baseUrl), (0, _paramUtils.createMapper)(mappings)(parameters)) : this.__baseUrl + '?' + (0, _paramUtils.convertParametersToQueryString)((0, _paramUtils.convertParametersToArray)(parameters));
      var options = this.__sendCredentials ? { credentials: 'include' } : {};
      return (0, _fetch2.default)(url, options).then(function () {
        return true;
      }).catch(function () {
        return false;
      });
    }
  }]);

  return MetricSender;
}();

exports.default = MetricSender;

},{"../../utils/fetch":107,"../../utils/param-utils":111}],76:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _statefulMetricSender = require('./stateful-metric-sender');

var _statefulMetricSender2 = _interopRequireDefault(_statefulMetricSender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OnceMetricSender = function (_StatefulMetricSender) {
  _inherits(OnceMetricSender, _StatefulMetricSender);

  function OnceMetricSender() {
    _classCallCheck(this, OnceMetricSender);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(OnceMetricSender).apply(this, arguments));
  }

  _createClass(OnceMetricSender, [{
    key: 'send',
    value: function send(additionalParameters) {
      var _this2 = this;

      return _get(Object.getPrototypeOf(OnceMetricSender.prototype), 'send', this).call(this, additionalParameters).then(function (success) {
        return _this2.__setState({ wasSent: success });
      });
    }
  }, {
    key: 'shouldBeSent',
    value: function shouldBeSent() {
      return this.__getState().then(function (state) {
        return !state.wasSent;
      });
    }
  }, {
    key: '__getDefaultState',
    value: function __getDefaultState() {
      return Promise.resolve({ wasSent: false });
    }
  }]);

  return OnceMetricSender;
}(_statefulMetricSender2.default);

exports.default = OnceMetricSender;

},{"./stateful-metric-sender":77}],77:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _metricSender = require('./metric-sender');

var _metricSender2 = _interopRequireDefault(_metricSender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StatefulMetricSender = function (_MetricSender) {
  _inherits(StatefulMetricSender, _MetricSender);

  function StatefulMetricSender(baseUrl, parameters, urlIsTemplate, sendCredentials, stateStorage) {
    _classCallCheck(this, StatefulMetricSender);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StatefulMetricSender).call(this, baseUrl, parameters, urlIsTemplate, sendCredentials));

    _this.__stateStorage = stateStorage;
    return _this;
  }

  _createClass(StatefulMetricSender, [{
    key: 'shouldBeSent',
    value: function shouldBeSent() {
      return Promise.reject('Method should be overridden');
    }
  }, {
    key: '__getState',
    value: function __getState() {
      var _this2 = this;

      return this.__stateStorage.getData().catch(function () {
        return _this2.__getDefaultState();
      });
    }
  }, {
    key: '__setState',
    value: function __setState(state) {
      return this.__stateStorage.setData(state);
    }
  }, {
    key: '__getDefaultState',
    value: function __getDefaultState() {
      return Promise.reject('Method should be overridden');
    }
  }]);

  return StatefulMetricSender;
}(_metricSender2.default);

exports.default = StatefulMetricSender;

},{"./metric-sender":75}],78:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chromeUtils = require('../utils/chrome-utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NativeMessageSender = function () {
   function NativeMessageSender(host) {
      _classCallCheck(this, NativeMessageSender);

      this.__host = host;
   }

   _createClass(NativeMessageSender, [{
      key: 'sendNativeMessage',
      value: function sendNativeMessage(data) {
         return (0, _chromeUtils.wrapChromeApi)(chrome.runtime, 'sendNativeMessage', this.__host, data);

         /*const sampleResponse = JSON.parse(`
           {
              "install_id":"0516EC29E88B4736884143FEB69A5645",
              "mrds_parameters":[
                 {
                    "Id":"browser_class1",
                    "Value":true
                 },
                 {
                    "Id":"browser_class2",
                    "Value":false
                 },
                 {
                    "Id":"pa",
                    "Value":true
                 },
                 {
                    "Id":"pb",
                    "Value":true
                 },
                 {
                    "Id":"pd",
                    "Value":true
                 }
              ],
              "online_callback":"http://httpstat.us/200?0516EC29E88B4736884143FEB69A5645/0516EC29E88B4736884143FEB69A5645/1/zver/ch/1/0",
              "product_id":"{DC3EAB88-DB29-48E4-97E8-D3563C6955A1}",
              "rfr":"821716"
           }
         `);
           return Promise.resolve({
           Error: 0,
           InstallData: sampleResponse
         });*/
      }
   }]);

   return NativeMessageSender;
}();

exports.default = NativeMessageSender;

},{"../utils/chrome-utils":105}],79:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var NotificationEventTypes = {
  onClosed: 'onClosed',
  onClicked: 'onClicked',
  onButtonClicked: 'onButtonClicked'
};
exports.default = NotificationEventTypes;

},{}],80:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var NotificationScheduleTypes = {
  AFTER: 'after',
  URL: 'url',
  RANGE: 'range',
  DUMMY: 'dummy'
};
exports.default = NotificationScheduleTypes;

},{}],81:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _notificationBuilder = require('../notification-builder');

var _notificationBuilder2 = _interopRequireDefault(_notificationBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var notificationFactory = function notificationFactory(_ref) {
  var notificationId = _ref.notificationId;
  var options = _ref.options;
  var onClicked = _ref.onClicked;
  var onButtonClicked = _ref.onButtonClicked;
  var onClosed = _ref.onClosed;

  var builder = new _notificationBuilder2.default();
  if (notificationId) {
    builder.setId(notificationId);
  }
  if (options) {
    builder.setOptions(options);
  }
  if (onClicked) {
    builder.setOnClicked(onClicked);
  }
  if (onButtonClicked) {
    builder.setOnButtonClicked(onButtonClicked);
  }
  if (onClosed) {
    builder.setOnClosed(onClosed);
  }
  return builder.build();
};

exports.default = notificationFactory;

},{"../notification-builder":83}],82:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createNotificationSchedule;

var _notificationScheduleTypes = require('../constants/notification-schedule-types');

var _notificationScheduleTypes2 = _interopRequireDefault(_notificationScheduleTypes);

var _schedule = require('../schedule');

var _schedule2 = _interopRequireDefault(_schedule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createNotificationSchedule(_ref) {
  var type = _ref.type;
  var options = _ref.options;

  switch (type) {
    case _notificationScheduleTypes2.default.AFTER:
      return new _schedule2.default.AfterNotificationSchedule(options);
    case _notificationScheduleTypes2.default.RANGE:
      return new _schedule2.default.RangeNotificationSchedule(options);
    case _notificationScheduleTypes2.default.URL:
      return new _schedule2.default.UrlNotificationSchedule(options);
    default:
      return new _schedule2.default.DummyNotificationSchedule(options);
  }
}

},{"../constants/notification-schedule-types":80,"../schedule":94}],83:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _notificationEventTypes = require('./constants/notification-event-types');

var _notificationEventTypes2 = _interopRequireDefault(_notificationEventTypes);

var _notificationHandlerRegistry = require('./notification-handler-registry');

var _notificationHandlerRegistry2 = _interopRequireDefault(_notificationHandlerRegistry);

var _guid = require('../../utils/guid');

var _guid2 = _interopRequireDefault(_guid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotificationBuilder = function () {
  function NotificationBuilder() {
    _classCallCheck(this, NotificationBuilder);

    this.__notificationId = (0, _guid2.default)();
    this.__baseOptions = {};
  }

  _createClass(NotificationBuilder, [{
    key: 'setId',
    value: function setId(notificationId) {
      this.__notificationId = notificationId;
      return this;
    }
  }, {
    key: 'setOptions',
    value: function setOptions(options) {
      this.__baseOptions = options;
      return this;
    }
  }, {
    key: 'setOnButtonClicked',
    value: function setOnButtonClicked(handler) {
      _notificationHandlerRegistry2.default.registerHandler(this.__notificationId, _notificationEventTypes2.default.onButtonClicked, handler);
      return this;
    }
  }, {
    key: 'setOnClicked',
    value: function setOnClicked(handler) {
      _notificationHandlerRegistry2.default.registerHandler(this.__notificationId, _notificationEventTypes2.default.onClicked, handler);
      return this;
    }
  }, {
    key: 'setOnClosed',
    value: function setOnClosed(handler) {
      _notificationHandlerRegistry2.default.registerHandler(this.__notificationId, _notificationEventTypes2.default.onClosed, handler);
      return this;
    }
  }, {
    key: 'build',
    value: function build() {
      return {
        id: this.__notificationId,
        options: this.__baseOptions
      };
    }
  }]);

  return NotificationBuilder;
}();

exports.default = NotificationBuilder;

},{"../../utils/guid":109,"./constants/notification-event-types":79,"./notification-handler-registry":86}],84:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _urlFetcher = require('../../common/url-fetcher');

var _urlFetcher2 = _interopRequireDefault(_urlFetcher);

var _notificationScheduleFactory = require('./factory/notification-schedule-factory');

var _notificationScheduleFactory2 = _interopRequireDefault(_notificationScheduleFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FetcherClass = (0, _urlFetcher.CredentialsMixin)(_urlFetcher2.default);

var NotificationConfigEntry = function () {
  function NotificationConfigEntry(_ref) {
    var confId = _ref.confId;
    var enabled = _ref.enabled;
    var schedule = _ref.schedule;
    var contentUrl = _ref.contentUrl;

    _classCallCheck(this, NotificationConfigEntry);

    this.__id = confId;
    this.__enabled = enabled || true;
    this.__schedule = (0, _notificationScheduleFactory2.default)(schedule);
    this.__contentFetcher = new FetcherClass(contentUrl + '?rnd=' + Date.now().toString());
  }

  _createClass(NotificationConfigEntry, [{
    key: 'getContent',
    value: function getContent() {
      return this.__contentFetcher.fetch().then(function (response) {
        return response.json();
      }).catch(function () {
        return null;
      });
    }
  }, {
    key: 'id',
    get: function get() {
      return this.__id;
    }
  }, {
    key: 'enabled',
    get: function get() {
      return this.__enabled;
    }
  }, {
    key: 'schedule',
    get: function get() {
      return this.__schedule;
    }
  }]);

  return NotificationConfigEntry;
}();

exports.default = NotificationConfigEntry;

},{"../../common/url-fetcher":52,"./factory/notification-schedule-factory":82}],85:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _notificationConfigEntry = require('./notification-config-entry');

var _notificationConfigEntry2 = _interopRequireDefault(_notificationConfigEntry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*const DEMO_CONFIG = {
  notifications: [
    {
      conf_id: 'aaa',
      enabled: true,
      contentUrl: 'http://httpstat.us/200',
      schedule: {
        type: 'after',
        options: {
          count: 5,
          limit: '3m',
          after: '1m'
        }
      }
    },
    {
      conf_id: 'bbb',
      enabled: true,
      contentUrl: 'http://httpstat.us/200',
      schedule: {
        type: 'url',
        options: {
          count: 3,
          limit: '1d',
          urls: [
            'http://vk.com'
          ]
        }
      }
    },
    {
      conf_id: 'ccc',
      enabled: true,
      contentUrl: 'http://httpstat.us/200',
      schedule: {
        type: 'range',
        options: {
          count: 3,
          limit: '1m',
          ranges: [
            {
              startDate: '2016-07-11',
              endDate: '2016-07-15',
              startTime: '11:00',
              endTime: '20:59'
            }
          ]
        }
      }
    }
  ]
};*/

var NotificationConfigService = function () {
  function NotificationConfigService(slotFetcher) {
    _classCallCheck(this, NotificationConfigService);

    this.__fetcher = slotFetcher;
  }

  _createClass(NotificationConfigService, [{
    key: 'getConfig',
    value: function getConfig() {
      return this.__fetcher.fetch().then(function (response) {
        return response.json();
      }).then(function (_ref) {
        var notifications = _ref.notifications;
        return notifications.map(function (entry) {
          return new _notificationConfigEntry2.default(entry);
        });
      }).catch(function (err) {
        console.error(err);
        return [];
      });
    }
  }]);

  return NotificationConfigService;
}();

exports.default = NotificationConfigService;

},{"./notification-config-entry":84}],86:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _notificationEventTypes = require('./constants/notification-event-types');

var _notificationEventTypes2 = _interopRequireDefault(_notificationEventTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var namespace = function namespace() {
  return chrome.notifications;
};

var NotificationHandlerRegistry = function () {
  function NotificationHandlerRegistry() {
    var _this = this;

    _classCallCheck(this, NotificationHandlerRegistry);

    this.__closedHandlers = new Map();
    this.__clickedHandlers = new Map();
    this.__buttonClickedHandlers = new Map();

    namespace().onClicked.addListener(function (notificationId) {
      if (_this.__clickedHandlers.has(notificationId)) {
        _this.__clickedHandlers.get(notificationId)(notificationId);
      }
    });

    namespace().onButtonClicked.addListener(function (notificationId, buttonIndex) {
      if (_this.__buttonClickedHandlers.has(notificationId)) {
        _this.__buttonClickedHandlers.get(notificationId)(buttonIndex, notificationId);
      }
    });

    namespace().onClosed.addListener(function (notificationId, byUser) {
      if (_this.__closedHandlers.has(notificationId)) {
        _this.__closedHandlers.get(notificationId)(byUser, notificationId);
      }
    });
  }

  _createClass(NotificationHandlerRegistry, [{
    key: 'registerHandler',
    value: function registerHandler(notificationId, event, handler) {
      this.__getMapByEvent(event).set(notificationId, handler);
    }
  }, {
    key: 'unregisterHandler',
    value: function unregisterHandler(notificationId, event) {
      var map = this.__getMapByEvent(event);
      if (map.has(notificationId)) {
        console.info('>> Has handler for ' + event + ', remove');
        map.delete(notificationId);
      }
    }
  }, {
    key: 'unregisterAllHandlers',
    value: function unregisterAllHandlers(notificationId) {
      var _this2 = this;

      Object.keys(_notificationEventTypes2.default).forEach(function (event) {
        return _this2.unregisterHandler(notificationId, event);
      });
    }
  }, {
    key: '__getMapByEvent',
    value: function __getMapByEvent(event) {
      switch (event) {
        case _notificationEventTypes2.default.onClosed:
          return this.__closedHandlers;
        case _notificationEventTypes2.default.onClicked:
          return this.__clickedHandlers;
        case _notificationEventTypes2.default.onButtonClicked:
          return this.__buttonClickedHandlers;
      }
    }
  }]);

  return NotificationHandlerRegistry;
}();

var notificationHandlerRegistry = void 0;

try {
  notificationHandlerRegistry = new NotificationHandlerRegistry();
} catch (e) {}

exports.default = notificationHandlerRegistry;

},{"./constants/notification-event-types":79}],87:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _notificationHistoryObject = require('./notification-history-object');

var _notificationHistoryObject2 = _interopRequireDefault(_notificationHistoryObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotificationHistoryManager = function () {
  function NotificationHistoryManager(notificationHistoryStorage) {
    _classCallCheck(this, NotificationHistoryManager);

    this.__notificationHistoryStorage = notificationHistoryStorage;
  }

  _createClass(NotificationHistoryManager, [{
    key: 'getNotificationHistory',
    value: function getNotificationHistory(notificationId) {
      return this.__loadData().then(function (history) {
        return history[notificationId];
      }).then(function (source) {
        return new _notificationHistoryObject2.default(source);
      });
    }
  }, {
    key: 'logNotificationDisplay',
    value: function logNotificationDisplay(notificationId) {
      var _this = this;

      return this.__loadData().then(function (history) {
        if (history.hasOwnProperty(notificationId)) {
          history[notificationId].lastDisplayDate = new Date();
          history[notificationId].displayCount += 1;
        } else {
          history[notificationId] = {
            lastDisplayDate: new Date(),
            displayCount: 1
          };
        }
        return _this.__saveData(history);
      });
    }
  }, {
    key: '__loadData',
    value: function __loadData() {
      return this.__notificationHistoryStorage.getData().catch(function () {
        return {};
      });
    }
  }, {
    key: '__saveData',
    value: function __saveData(value) {
      return this.__notificationHistoryStorage.setData(value);
    }
  }]);

  return NotificationHistoryManager;
}();

exports.default = NotificationHistoryManager;

},{"./notification-history-object":88}],88:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_HISTORY = { lastDisplayDate: new Date(0), displayCount: 0 };

var NotificationHistoryObject = function () {
  function NotificationHistoryObject() {
    var source = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_HISTORY : arguments[0];

    _classCallCheck(this, NotificationHistoryObject);

    this.__lastDisplayDate = new Date(source.lastDisplayDate);
    this.__displayCount = source.displayCount;
  }

  _createClass(NotificationHistoryObject, [{
    key: "lastDisplayDate",
    get: function get() {
      return this.__lastDisplayDate;
    }
  }, {
    key: "displayCount",
    get: function get() {
      return this.__displayCount;
    }
  }]);

  return NotificationHistoryObject;
}();

exports.default = NotificationHistoryObject;

},{}],89:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chromeUtils = require('../../utils/chrome-utils');

var _notificationHandlerRegistry = require('./notification-handler-registry');

var _notificationHandlerRegistry2 = _interopRequireDefault(_notificationHandlerRegistry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var namespace = function namespace() {
  return chrome.notifications;
};

var NotificationManager = function () {
  function NotificationManager() {
    _classCallCheck(this, NotificationManager);
  }

  _createClass(NotificationManager, [{
    key: 'getAllVisibleNotifications',
    value: function getAllVisibleNotifications() {
      return (0, _chromeUtils.wrapChromeApi)(namespace(), 'getAll');
    }
  }, {
    key: 'create',
    value: function create(notificationId, options) {
      return (0, _chromeUtils.wrapChromeApi)(namespace(), 'create', notificationId, options);
    }
  }, {
    key: 'update',
    value: function update(notificationId, options) {
      return (0, _chromeUtils.wrapChromeApi)(namespace(), 'update', notificationId, options);
    }
  }, {
    key: 'clear',
    value: function clear(notificationId) {
      return (0, _chromeUtils.wrapChromeApi)(namespace(), 'clear', notificationId);
    }
  }, {
    key: 'destroy',
    value: function destroy(notificationId) {
      _notificationHandlerRegistry2.default.unregisterAllHandlers(notificationId);
      return this.clear(notificationId);
    }
  }]);

  return NotificationManager;
}();

exports.default = new NotificationManager();

},{"../../utils/chrome-utils":105,"./notification-handler-registry":86}],90:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.parseTime = parseTime;
exports.parseInterval = parseInterval;
exports.addTime = addTime;
exports.calculateIntervalInMilliseconds = calculateIntervalInMilliseconds;

exports.default = function (_ref3) {
  var after = _ref3.after;
  var at = _ref3.at;
  var every = _ref3.every;
  var lastDate = arguments.length <= 1 || arguments[1] === undefined ? new Date(0) : arguments[1];

  if (after !== undefined) {
    return parseRelative(after);
  }
  return parseRecurring(at, every, lastDate);
};

var _dateUtils = require('../../utils/date-utils');

function parseTime(when) {
  var TIME_PATTERN = /([0-2]{0,1}[0-9]{1}):([0-5]{0,1}[0-9]{1})/gi;

  var _TIME_PATTERN$exec$sl = TIME_PATTERN.exec(when).slice(1).map(function (i) {
    return parseInt(i, 10);
  });

  var _TIME_PATTERN$exec$sl2 = _slicedToArray(_TIME_PATTERN$exec$sl, 2);

  var hours = _TIME_PATTERN$exec$sl2[0];
  var minutes = _TIME_PATTERN$exec$sl2[1];

  return { hours: hours, minutes: minutes };
}

function parseInterval(intervalStr) {
  var INTERVAL_PATTERN = /(\d{1,2})([s,m,h,d,w]{1})/gi;

  var _INTERVAL_PATTERN$exe = INTERVAL_PATTERN.exec(intervalStr);

  var _INTERVAL_PATTERN$exe2 = _slicedToArray(_INTERVAL_PATTERN$exe, 3);

  var countStr = _INTERVAL_PATTERN$exe2[1];
  var units = _INTERVAL_PATTERN$exe2[2];

  var count = parseInt(countStr, 10);
  return { count: count, units: units };
}

function addTime(date, _ref) {
  var units = _ref.units;
  var count = _ref.count;

  var clone = new Date(date.getTime());
  switch (units) {
    case 's':
      clone.setSeconds(clone.getSeconds() + count);
      break;
    case 'm':
      clone.setMinutes(clone.getMinutes() + count);
      break;
    case 'h':
      clone.setHours(clone.getHours() + count);
      break;
    case 'd':
      clone.setDate(clone.getDate() + count);
      break;
    case 'w':
      clone.setDate(clone.getDate() + count * 7);
      break;
  }
  return clone;
}

function parseRelative(intervalStr) {
  return addTime(new Date(), parseInterval(intervalStr));
}

function parseRecurring(timeStr, intervalStr, lastDate) {
  var interval = parseInterval(intervalStr);
  var nextScheduledDate = addTime(lastDate, interval);

  if ((0, _dateUtils.isInFuture)(nextScheduledDate)) {
    return nextScheduledDate;
  }

  var nextAvailableDate = new Date();

  var _parseTime = parseTime(timeStr);

  var hours = _parseTime.hours;
  var minutes = _parseTime.minutes;

  nextDate.setHours(hours);
  nextDate.setMinutes(minutes);
  nextDate.setSeconds(0);
  nextDate.setMilliseconds(0);
  return addTime(new Date(), { count: 1, units: 'd' });

  /*const interval = parseInterval(intervalStr);
  const intervalInMilliseconds = calculateIntervalInMilliseconds(interval);
    if (nextDate.getTime() - lastDate.getTime() >= intervalInMilliseconds) {
    return nextDate;
  }
  return addTime(nextDate, interval);*/
}

function calculateIntervalInMilliseconds(_ref2) {
  var units = _ref2.units;
  var count = _ref2.count;

  var result = count;
  switch (units) {
    case 'w':
      result *= 7;
    case 'd':
      result *= 24;
    case 'h':
      result *= 60;
    case 'm':
      result *= 60;
    case 's':
    default:
      result *= 1000;
  }
  return result;
}

},{"../../utils/date-utils":106}],91:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseNotificationSchedule = require('./base-notification-schedule');

var _baseNotificationSchedule2 = _interopRequireDefault(_baseNotificationSchedule);

var _notificationScheduleTypes = require('../constants/notification-schedule-types');

var _notificationScheduleTypes2 = _interopRequireDefault(_notificationScheduleTypes);

var _notificationScheduleParser = require('../notification-schedule-parser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AfterNotificationSchedule = function (_BaseNotificationSche) {
  _inherits(AfterNotificationSchedule, _BaseNotificationSche);

  function AfterNotificationSchedule(source) {
    _classCallCheck(this, AfterNotificationSchedule);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AfterNotificationSchedule).call(this, _notificationScheduleTypes2.default.AFTER, source));
  }

  _createClass(AfterNotificationSchedule, [{
    key: 'getNextDate',
    value: function getNextDate() {
      return (0, _notificationScheduleParser.addTime)(new Date(), (0, _notificationScheduleParser.parseInterval)(this.__source.after));
    }
  }]);

  return AfterNotificationSchedule;
}(_baseNotificationSchedule2.default);

exports.default = AfterNotificationSchedule;

},{"../constants/notification-schedule-types":80,"../notification-schedule-parser":90,"./base-notification-schedule":92}],92:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _notificationScheduleParser = require('../notification-schedule-parser');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseNotificationSchedule = function () {
  function BaseNotificationSchedule(type, source) {
    _classCallCheck(this, BaseNotificationSchedule);

    this.__type = type;
    this.__source = source;
  }

  _createClass(BaseNotificationSchedule, [{
    key: 'getNextDate',
    value: function getNextDate() {
      return new Date();
    }
  }, {
    key: 'isAllowed',
    value: function isAllowed(_ref) {
      var displayCount = _ref.displayCount;
      var lastDisplayDate = _ref.lastDisplayDate;

      var withinLimits = this.__isWithinLimits(displayCount);
      var withinAllowedTimeInterval = this.__isWithinAllowedTimeInterval(lastDisplayDate);
      return withinLimits && withinAllowedTimeInterval;
    }
  }, {
    key: '__isWithinLimits',
    value: function __isWithinLimits(displayCount) {
      return this.__source.count > displayCount;
    }
  }, {
    key: '__isWithinAllowedTimeInterval',
    value: function __isWithinAllowedTimeInterval(lastDisplayDate) {
      return new Date().getTime() - lastDisplayDate.getTime() >= (0, _notificationScheduleParser.calculateIntervalInMilliseconds)((0, _notificationScheduleParser.parseInterval)(this.__source.limit));
    }
  }, {
    key: 'type',
    get: function get() {
      return this.__type;
    }
  }]);

  return BaseNotificationSchedule;
}();

exports.default = BaseNotificationSchedule;

},{"../notification-schedule-parser":90}],93:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseNotificationSchedule = require('./base-notification-schedule');

var _baseNotificationSchedule2 = _interopRequireDefault(_baseNotificationSchedule);

var _notificationScheduleTypes = require('../constants/notification-schedule-types');

var _notificationScheduleTypes2 = _interopRequireDefault(_notificationScheduleTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DummyNotificationSchedule = function (_BaseNotificationSche) {
  _inherits(DummyNotificationSchedule, _BaseNotificationSche);

  function DummyNotificationSchedule(source) {
    _classCallCheck(this, DummyNotificationSchedule);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DummyNotificationSchedule).call(this, _notificationScheduleTypes2.default.DUMMY, source));
  }

  _createClass(DummyNotificationSchedule, [{
    key: 'getNextDate',
    value: function getNextDate() {
      return new Date();
    }
  }]);

  return DummyNotificationSchedule;
}(_baseNotificationSchedule2.default);

exports.default = DummyNotificationSchedule;

},{"../constants/notification-schedule-types":80,"./base-notification-schedule":92}],94:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dummyNotificationSchedule = require('./dummy-notification-schedule');

var _dummyNotificationSchedule2 = _interopRequireDefault(_dummyNotificationSchedule);

var _afterNotificationSchedule = require('./after-notification-schedule');

var _afterNotificationSchedule2 = _interopRequireDefault(_afterNotificationSchedule);

var _rangeNotificationSchedule = require('./range-notification-schedule');

var _rangeNotificationSchedule2 = _interopRequireDefault(_rangeNotificationSchedule);

var _urlNotificationSchedule = require('./url-notification-schedule');

var _urlNotificationSchedule2 = _interopRequireDefault(_urlNotificationSchedule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { DummyNotificationSchedule: _dummyNotificationSchedule2.default, AfterNotificationSchedule: _afterNotificationSchedule2.default, RangeNotificationSchedule: _rangeNotificationSchedule2.default, UrlNotificationSchedule: _urlNotificationSchedule2.default };

},{"./after-notification-schedule":91,"./dummy-notification-schedule":93,"./range-notification-schedule":95,"./url-notification-schedule":96}],95:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _baseNotificationSchedule = require('./base-notification-schedule');

var _baseNotificationSchedule2 = _interopRequireDefault(_baseNotificationSchedule);

var _notificationScheduleTypes = require('../constants/notification-schedule-types');

var _notificationScheduleTypes2 = _interopRequireDefault(_notificationScheduleTypes);

var _notificationScheduleParser = require('../notification-schedule-parser');

var _dateUtils = require('../../../utils/date-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RangeNotificationSchedule = function (_BaseNotificationSche) {
  _inherits(RangeNotificationSchedule, _BaseNotificationSche);

  function RangeNotificationSchedule(source) {
    _classCallCheck(this, RangeNotificationSchedule);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RangeNotificationSchedule).call(this, _notificationScheduleTypes2.default.RANGE, source));
  }

  _createClass(RangeNotificationSchedule, [{
    key: 'isAllowed',
    value: function isAllowed(_ref) {
      var displayCount = _ref.displayCount;
      var lastDisplayDate = _ref.lastDisplayDate;

      var rangeIndex = this.__source.ranges.findIndex(function (range) {
        var now = new Date();
        return (0, _dateUtils.isWithinRange)(now, new Date(range.startDate), new Date(range.endDate)) && (0, _dateUtils.isWithinRange)(now, (0, _notificationScheduleParser.addTime)(now, (0, _notificationScheduleParser.parseTime)(range.startTime)), (0, _notificationScheduleParser.addTime)(now, (0, _notificationScheduleParser.parseTime)(range.startTime)));
      });
      return _get(Object.getPrototypeOf(RangeNotificationSchedule.prototype), 'isAllowed', this).call(this, { displayCount: displayCount, lastDisplayDate: lastDisplayDate }) && rangeIndex > -1;
    }
  }]);

  return RangeNotificationSchedule;
}(_baseNotificationSchedule2.default);

exports.default = RangeNotificationSchedule;

},{"../../../utils/date-utils":106,"../constants/notification-schedule-types":80,"../notification-schedule-parser":90,"./base-notification-schedule":92}],96:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseNotificationSchedule = require('./base-notification-schedule');

var _baseNotificationSchedule2 = _interopRequireDefault(_baseNotificationSchedule);

var _notificationScheduleTypes = require('../constants/notification-schedule-types');

var _notificationScheduleTypes2 = _interopRequireDefault(_notificationScheduleTypes);

var _notificationScheduleParser = require('../notification-schedule-parser');

var _mathUtils = require('../../../utils/math-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UrlNotificationSchedule = function (_BaseNotificationSche) {
  _inherits(UrlNotificationSchedule, _BaseNotificationSche);

  function UrlNotificationSchedule(source) {
    _classCallCheck(this, UrlNotificationSchedule);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UrlNotificationSchedule).call(this, _notificationScheduleTypes2.default.URL, source));
  }

  _createClass(UrlNotificationSchedule, [{
    key: 'getNextDate',
    value: function getNextDate() {
      return (0, _notificationScheduleParser.addTime)(new Date(), { count: (0, _mathUtils.getRandomInt)(2, 10), units: 's' });
    }
  }, {
    key: 'urls',
    get: function get() {
      return this.__source.urls;
    }
  }]);

  return UrlNotificationSchedule;
}(_baseNotificationSchedule2.default);

exports.default = UrlNotificationSchedule;

},{"../../../utils/math-utils":110,"../constants/notification-schedule-types":80,"../notification-schedule-parser":90,"./base-notification-schedule":92}],97:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _extensionDataGenerator = require('./extension-data-generator');

var _extensionDataGenerator2 = _interopRequireDefault(_extensionDataGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OneLinkExtensionDataGenerator = function (_ExtensionDataGenerat) {
  _inherits(OneLinkExtensionDataGenerator, _ExtensionDataGenerat);

  function OneLinkExtensionDataGenerator(cookieReader) {
    var additionalExtensionData = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, OneLinkExtensionDataGenerator);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OneLinkExtensionDataGenerator).call(this, additionalExtensionData));

    _this.__cookieReader = cookieReader;
    return _this;
  }

  _createClass(OneLinkExtensionDataGenerator, [{
    key: 'generateExtensionData',
    value: function generateExtensionData() {
      var _this2 = this;

      return _get(Object.getPrototypeOf(OneLinkExtensionDataGenerator.prototype), 'generateExtensionData', this).call(this).then(function (extensionData) {
        return _this2.__cookieReader.getAllCookies().then(function (cookies) {
          var data = cookies.filter(function (cookie) {
            return cookie !== null;
          }).reduce(function (accumulator, cookie) {
            return _extends({}, accumulator, _defineProperty({}, 'old_' + cookie.name.toLowerCase(), decodeURIComponent(cookie.value)));
          }, {});
          return _extends({}, extensionData, data);
        });
      });
    }
  }]);

  return OneLinkExtensionDataGenerator;
}(_extensionDataGenerator2.default);

exports.default = OneLinkExtensionDataGenerator;

},{"./extension-data-generator":70}],98:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BasePlugin = function () {
  function BasePlugin(name) {
    _classCallCheck(this, BasePlugin);

    this.__name = name;
    this.__host = null;
  }

  _createClass(BasePlugin, [{
    key: 'getName',
    value: function getName() {
      return this.__name;
    }
  }, {
    key: 'getHost',
    value: function getHost() {
      return this.__host;
    }
  }, {
    key: 'setHost',
    value: function setHost(host) {
      this.__host = host;
    }
  }, {
    key: 'run',
    value: function run() {
      return Promise.reject(new Error('Method should be overridden'));
    }
  }]);

  return BasePlugin;
}();

exports.default = BasePlugin;

},{}],99:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _longTermCookiePlugin = require('./long-term-cookie-plugin');

var _longTermCookiePlugin2 = _interopRequireDefault(_longTermCookiePlugin);

var _notificationsPlugin = require('./notifications-plugin');

var _notificationsPlugin2 = _interopRequireDefault(_notificationsPlugin);

var _onlineMetricsPlugin = require('./online-metrics-plugin');

var _onlineMetricsPlugin2 = _interopRequireDefault(_onlineMetricsPlugin);

var _pixelFetcherPlugin = require('./pixel-fetcher-plugin');

var _pixelFetcherPlugin2 = _interopRequireDefault(_pixelFetcherPlugin);

var _uninstallUrlPlugin = require('./uninstall-url-plugin');

var _uninstallUrlPlugin2 = _interopRequireDefault(_uninstallUrlPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  LongTermCookiePlugin: _longTermCookiePlugin2.default,
  NotificationsPlugin: _notificationsPlugin2.default,
  OnlineMetricsPlugin: _onlineMetricsPlugin2.default,
  PixelFetcherPlugin: _pixelFetcherPlugin2.default,
  UninstallUrlPlugin: _uninstallUrlPlugin2.default
};

},{"./long-term-cookie-plugin":100,"./notifications-plugin":101,"./online-metrics-plugin":102,"./pixel-fetcher-plugin":103,"./uninstall-url-plugin":104}],100:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _basePlugin = require('./base-plugin');

var _basePlugin2 = _interopRequireDefault(_basePlugin);

var _dateUtils = require('../utils/date-utils');

var _paramUtils = require('../utils/param-utils');

var _queryString = require('../utils/query-string');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LongTermCookiePlugin = function (_BasePlugin) {
  _inherits(LongTermCookiePlugin, _BasePlugin);

  function LongTermCookiePlugin(cookieFacade, scheduler) {
    _classCallCheck(this, LongTermCookiePlugin);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LongTermCookiePlugin).call(this, 'LongTermCookiePlugin'));

    _this.__cookieFacade = cookieFacade;
    _this.__scheduler = scheduler;
    return _this;
  }

  _createClass(LongTermCookiePlugin, [{
    key: 'run',
    value: function run() {
      var _this2 = this;

      return this.getHost().getExtensionData().then(function (extensionData) {
        var cookieObject = { gp: extensionData.gp };
        if ((0, _paramUtils.isNotEmpty)(extensionData, 'hp_cnt')) {
          cookieObject.hp_cnt = extensionData.hp_cnt;
        }
        return _this2.__updateLongTermCookie((0, _queryString.convertObjectToQueryString)(cookieObject));
      });
    }
  }, {
    key: '__updateLongTermCookie',
    value: function __updateLongTermCookie(cookie) {
      var _this3 = this;

      return this.__cookieFacade.setCookie(cookie).then(function () {
        var alarmTime = (0, _dateUtils.tomorrowWithRandomTime)();
        _this3.__scheduler.schedule('UpdateCookie', alarmTime, _this3.__updateLongTermCookie.bind(_this3, cookie));
      });
    }
  }]);

  return LongTermCookiePlugin;
}(_basePlugin2.default);

exports.default = LongTermCookiePlugin;

},{"../utils/date-utils":106,"../utils/param-utils":111,"../utils/query-string":112,"./base-plugin":98}],101:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _each = require('async-es/each');

var _each2 = _interopRequireDefault(_each);

var _mrdsSettings = require('../constants/mrds-settings');

var _basePlugin = require('./base-plugin');

var _basePlugin2 = _interopRequireDefault(_basePlugin);

var _urlFetcher = require('../common/url-fetcher');

var _urlFetcher2 = _interopRequireDefault(_urlFetcher);

var _notificationScheduleTypes = require('../modules/notifications/constants/notification-schedule-types');

var _notificationScheduleTypes2 = _interopRequireDefault(_notificationScheduleTypes);

var _notificationFactory = require('../modules/notifications/factory/notification-factory');

var _notificationFactory2 = _interopRequireDefault(_notificationFactory);

var _notificationManager = require('../modules/notifications/notification-manager');

var _notificationManager2 = _interopRequireDefault(_notificationManager);

var _paramUtils = require('../utils/param-utils');

var _chromeUtils = require('../utils/chrome-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FetcherClass = (0, _urlFetcher.CredentialsMixin)(_urlFetcher2.default);
var BASE_NOTIFICATION_OPTIONS = {
  type: 'basic',
  isClickable: true,
  requireInteraction: false
};

var NotificationsPlugin = function (_BasePlugin) {
  _inherits(NotificationsPlugin, _BasePlugin);

  function NotificationsPlugin(notificationConfigService, notificationHistoryManager, scheduler, urlWatcher, metricSender) {
    _classCallCheck(this, NotificationsPlugin);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NotificationsPlugin).call(this, 'NotificationsPlugin'));

    _this.__notificationConfigService = notificationConfigService;
    _this.__notificationHistoryManager = notificationHistoryManager;
    _this.__scheduler = scheduler;
    _this.__urlWatcher = urlWatcher;
    _this.__metricSender = metricSender;
    _this.__baseMetricOptions = {};
    return _this;
  }

  _createClass(NotificationsPlugin, [{
    key: 'run',
    value: function run() {
      var _this2 = this;

      return this.getHost().getExtensionData().then(function (extensionData) {
        _this2.__baseMetricOptions = (0, _paramUtils.createMapper)(_mrdsSettings.MAPPINGS)(_paramUtils.filter.apply(undefined, [extensionData].concat(_toConsumableArray(_mrdsSettings.EXCLUDED_FIELDS))));
        return _this2.__notificationConfigService.getConfig().then(function (notifications) {
          return new Promise(function (resolve) {
            // Filter out disabled configurations
            var enabledNotifications = notifications.filter(function (configuration) {
              return configuration.enabled;
            });
            var iteratee = function iteratee(configuration, callback) {
              switch (configuration.schedule.type) {
                case _notificationScheduleTypes2.default.URL:
                  _this2.__scheduleNotificationByUrl(configuration);
                  break;
                case _notificationScheduleTypes2.default.RANGE:
                  _this2.__scheduleNotificationByDateRange(configuration);
                  break;
                case _notificationScheduleTypes2.default.AFTER:
                default:
                  _this2.__scheduleNotificationOnce(configuration);
              }
              callback(null);
            };
            // Loop through all notification entries asynchronously
            (0, _each2.default)(enabledNotifications, iteratee, resolve);
          });
        });
      });
    }
  }, {
    key: '__createAndDisplayNotification',
    value: function __createAndDisplayNotification(configurationId, notificationOptions) {
      var notification = this.__createNotificationObject(notificationOptions);
      return this.__displayNotification(configurationId, notification, notificationOptions.onCreated);
    }
  }, {
    key: '__createNotificationObject',
    value: function __createNotificationObject(_ref) {
      var _this3 = this;

      var options = _ref.options;
      var url = _ref.url;

      return (0, _notificationFactory2.default)({
        options: options,
        onClicked: function onClicked(notificationId) {
          _this3.__createTab(url).then(function () {
            return _this3.__sendMetric('click');
          }).then(function () {
            return _notificationManager2.default.destroy(notificationId);
          });
        },
        onClosed: function onClosed(byUser, notificationId) {
          _this3.__sendMetric('close').then(function () {
            return _notificationManager2.default.destroy(notificationId);
          });
        }
      });
    }
  }, {
    key: '__displayNotification',
    value: function __displayNotification(configurationId, _ref2, onCreated) {
      var _this4 = this;

      var id = _ref2.id;
      var options = _ref2.options;

      return _notificationManager2.default.create(id, options).then(function () {
        return _this4.__fetchRbUrl(onCreated);
      }).then(function () {
        return _this4.__sendMetric('show');
      }).then(function () {
        return _this4.__notificationHistoryManager.logNotificationDisplay(configurationId);
      });
    }
  }, {
    key: '__configurationIsAllowed',
    value: function __configurationIsAllowed(configuration) {
      return this.__notificationHistoryManager.getNotificationHistory(configuration.id).then(function (history) {
        return configuration.schedule.isAllowed(history);
      });
    }
  }, {
    key: '__getConfigurationContent',
    value: function __getConfigurationContent(configuration) {
      return configuration.getContent().then(function (content) {
        if (content === null) {
          return null;
        }
        var type = content.type;
        var title = content.title;
        var message = content.message;
        var iconUrl = content.iconUrl;
        var url = content.url;
        var onCreated = content.onCreated;

        var options = _extends({}, BASE_NOTIFICATION_OPTIONS, { type: type, title: title, message: message, iconUrl: iconUrl });
        return { options: options, url: url, onCreated: onCreated };
      });
    }
  }, {
    key: '__prepareNotification',
    value: function __prepareNotification(configuration) {
      var _this5 = this;

      return this.__getConfigurationContent(configuration).then(function (content) {
        if (content === null) {
          return console.error('Notification content is not available');
        }
        console.info('Notification content is available', content);
        return _this5.__createAndDisplayNotification(configuration.id, content);
      });
    }
  }, {
    key: '__scheduleNotificationByDateRange',
    value: function __scheduleNotificationByDateRange(configuration) {
      var _this6 = this;

      return this.__scheduleNotificationOnce(configuration).then(function () {
        console.info('Scheduling next range notification check');
        var date = new Date();
        date.setHours(date.getHours() + 3);
        _this6.__scheduler.schedule('next_range_check', date, _this6.__scheduleNotificationByDateRange.bind(_this6, configuration));
      });
    }
  }, {
    key: '__scheduleNotificationByUrl',
    value: function __scheduleNotificationByUrl(configuration) {
      var _this7 = this;

      this.__urlWatcher.watch(configuration.schedule.urls /*[ '*://mail.ru/!*', '*://www.mail.ru/!*' ]*/, function () {
        console.info('URL pattern match, schedule notifications');
        _this7.__scheduleNotificationOnce(configuration);
      });
      return Promise.resolve(true);
    }
  }, {
    key: '__scheduleNotificationOnce',
    value: function __scheduleNotificationOnce(configuration) {
      var _this8 = this;

      return this.__configurationIsAllowed(configuration).then(function (isAllowed) {
        if (!isAllowed) {
          return console.error('Configuration is not allowed');
        }
        console.info('Configuration is allowed');
        _this8.__scheduler.schedule('notification:' + configuration.id, configuration.schedule.getNextDate(), _this8.__prepareNotification.bind(_this8, configuration));
      });
    }
  }, {
    key: '__createTab',
    value: function __createTab(url) {
      return (0, _chromeUtils.wrapChromeApi)(chrome.tabs, 'create', { url: url });
    }
  }, {
    key: '__fetchRbUrl',
    value: function __fetchRbUrl(url) {
      return new FetcherClass(url + '?rnd=' + Date.now().toString()).fetch();
    }
  }, {
    key: '__sendMetric',
    value: function __sendMetric(action) {
      return this.__metricSender.send(_extends({ action: action }, this.__baseMetricOptions));
    }
  }]);

  return NotificationsPlugin;
}(_basePlugin2.default);

exports.default = NotificationsPlugin;

},{"../common/url-fetcher":52,"../constants/mrds-settings":55,"../modules/notifications/constants/notification-schedule-types":80,"../modules/notifications/factory/notification-factory":81,"../modules/notifications/notification-manager":89,"../utils/chrome-utils":105,"../utils/param-utils":111,"./base-plugin":98,"async-es/each":2}],102:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _basePlugin = require('./base-plugin');

var _basePlugin2 = _interopRequireDefault(_basePlugin);

var _mrdsSettings = require('../constants/mrds-settings');

var mrdsSettings = _interopRequireWildcard(_mrdsSettings);

var _extensionDetails = require('../common/extension-details');

var _extensionDetails2 = _interopRequireDefault(_extensionDetails);

var _metricSenders = require('../modules/metric-senders');

var _metricSenders2 = _interopRequireDefault(_metricSenders);

var _dateUtils = require('../utils/date-utils');

var _paramUtils = require('../utils/param-utils');

var paramUtils = _interopRequireWildcard(_paramUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GO_URL_KEY = 'go_metric_url';
var MRDS_URL_KEY = 'mrds_metric_url';
var PARTNER_URL_KEY = 'partner_product_online_url';

var OnlineMetricsPlugin = function (_BasePlugin) {
  _inherits(OnlineMetricsPlugin, _BasePlugin);

  function OnlineMetricsPlugin(metricManager, scheduler, mrdsConfig, goConfig, partnerInstallConfig) {
    _classCallCheck(this, OnlineMetricsPlugin);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OnlineMetricsPlugin).call(this, 'OnlineMetricsPlugin'));

    _this.__metricManager = metricManager;
    _this.__scheduler = scheduler;
    _this.__mrdsConfig = mrdsConfig;
    _this.__goConfig = goConfig;
    _this.__partnerInstallConfig = partnerInstallConfig;
    return _this;
  }

  _createClass(OnlineMetricsPlugin, [{
    key: 'run',
    value: function run() {
      var _this2 = this;

      return this.__configureMetrics().then(function () {
        return _this2.__sendMetrics();
      });
    }
  }, {
    key: '__configureMetrics',
    value: function __configureMetrics() {
      var _this3 = this;

      return this.getHost().getExtensionData().then(function (extensionData) {
        var distributionParameters = paramUtils.createMapper(mrdsSettings.MAPPINGS)(paramUtils.filter.apply(paramUtils, [extensionData].concat(_toConsumableArray(mrdsSettings.EXCLUDED_FIELDS))));
        var extensionParameters = paramUtils.createMapper({ id: 'extid' })(paramUtils.subset(_extensionDetails2.default, 'version', 'id'));
        var commonParameters = _extends({}, extensionParameters, distributionParameters);

        _this3.__metricManager.addSender(_this3.__createMrdsMetricSender(_this3.__mrdsConfig, extensionData, commonParameters)).addSender(_this3.__createGoMetricSender(_this3.__goConfig, extensionData, commonParameters));

        if (paramUtils.isNotEmpty(extensionData, PARTNER_URL_KEY)) {
          _this3.__metricManager.addSender(_this3.__createPartnerOnlineMetricSender(_this3.__partnerInstallConfig, extensionData, commonParameters));
        }
      });
    }
  }, {
    key: '__sendMetrics',
    value: function __sendMetrics() {
      var _this4 = this;

      this.__metricManager.sendMetrics().then(function () {
        var alarmTime = (0, _dateUtils.tomorrowWithRandomTime)();
        _this4.__scheduler.schedule('SendOnlineMetric', alarmTime, _this4.__sendMetrics.bind(_this4));
      });
    }
  }, {
    key: '__createMrdsMetricSender',
    value: function __createMrdsMetricSender(config, extensionData) {
      var commonParameters = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var _ref = paramUtils.isNotEmpty(extensionData, MRDS_URL_KEY) ? [extensionData[MRDS_URL_KEY], true] : [config.url, paramUtils.isUrlTemplate(config.url)];

      var _ref2 = _slicedToArray(_ref, 2);

      var url = _ref2[0];
      var isTemplate = _ref2[1];

      var parameters = _extends({
        type: 'product_online_metric'
      }, commonParameters, paramUtils.generateTargetParameters(extensionData.mrds_parameters || []), config.parameters);
      return new _metricSenders2.default.DailyMetricSender(url, parameters, isTemplate, false, config.storage);
    }
  }, {
    key: '__createGoMetricSender',
    value: function __createGoMetricSender(config, extensionData) {
      var commonParameters = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var _ref3 = paramUtils.isNotEmpty(extensionData, GO_URL_KEY) ? [extensionData[GO_URL_KEY], true] : [config.url, paramUtils.isUrlTemplate(config.url)];

      var _ref4 = _slicedToArray(_ref3, 2);

      var url = _ref4[0];
      var isTemplate = _ref4[1];

      var parameters = _extends({}, paramUtils.subset(commonParameters, 'install_id', 'product_id', 'gp', 'kind'), paramUtils.generateTargetParameters(extensionData.go_parameters || []), config.parameters);
      return new _metricSenders2.default.DailyMetricSender(url, parameters, isTemplate, true, config.storage, false);
    }
  }, {
    key: '__createPartnerOnlineMetricSender',
    value: function __createPartnerOnlineMetricSender(config, extensionData) {
      var commonParameters = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var url = extensionData[PARTNER_URL_KEY];
      var parameters = _extends({}, commonParameters, paramUtils.generateTargetParameters(extensionData.partner_install_parameters || []), this.__partnerInstallConfig.parameters);
      return new _metricSenders2.default.OnceMetricSender(url, parameters, true, false, config.storage);
    }
  }]);

  return OnlineMetricsPlugin;
}(_basePlugin2.default);

exports.default = OnlineMetricsPlugin;

},{"../common/extension-details":47,"../constants/mrds-settings":55,"../modules/metric-senders":74,"../utils/date-utils":106,"../utils/param-utils":111,"./base-plugin":98}],103:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _basePlugin = require('./base-plugin');

var _basePlugin2 = _interopRequireDefault(_basePlugin);

var _dateUtils = require('../utils/date-utils');

var _fetch = require('../utils/fetch');

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PixelFetcherPlugin = function (_BasePlugin) {
  _inherits(PixelFetcherPlugin, _BasePlugin);

  function PixelFetcherPlugin(pixelUrl, scheduler) {
    _classCallCheck(this, PixelFetcherPlugin);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PixelFetcherPlugin).call(this, 'PixelFetcherPlugin'));

    _this.__pixelUrl = pixelUrl;
    _this.__scheduler = scheduler;
    return _this;
  }

  _createClass(PixelFetcherPlugin, [{
    key: 'run',
    value: function run() {
      return this.__fetchPixel(this.__pixelUrl);
    }
  }, {
    key: '__fetchPixel',
    value: function __fetchPixel(url) {
      var _this2 = this;

      return (0, _fetch2.default)(url, { cache: 'no-store', credentials: 'include' }).then(function () {
        var alarmTime = (0, _dateUtils.tomorrow)();
        alarmTime.setSeconds(Math.floor(Math.random() * 60 * 60 * 2));
        _this2.__scheduler.schedule('FetchRbPixel', alarmTime, _this2.__fetchPixel.bind(_this2, url));
      });
    }
  }]);

  return PixelFetcherPlugin;
}(_basePlugin2.default);

exports.default = PixelFetcherPlugin;

},{"../utils/date-utils":106,"../utils/fetch":107,"./base-plugin":98}],104:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _basePlugin = require('./base-plugin');

var _basePlugin2 = _interopRequireDefault(_basePlugin);

var _paramUtils = require('../utils/param-utils');

var _queryString = require('../utils/query-string');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EXCLUDED_FIELDS = ['fr', 'product_type', 'go_parameters', 'go_metric_url', 'mrds_parameters', 'mrds_metric_url', 'partner_product_online_url', 'partner_install_parameters'];

var UninstallUrlPlugin = function (_BasePlugin) {
  _inherits(UninstallUrlPlugin, _BasePlugin);

  function UninstallUrlPlugin(uninstallUrl, cookieName, cookieFacade) {
    _classCallCheck(this, UninstallUrlPlugin);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UninstallUrlPlugin).call(this, 'UninstallUrlPlugin'));

    _this.__cookieName = cookieName;
    _this.__cookieFacade = cookieFacade;
    _this.__uninstallUrl = uninstallUrl;
    return _this;
  }

  _createClass(UninstallUrlPlugin, [{
    key: 'run',
    value: function run() {
      var _this2 = this;

      return this.getHost().getExtensionData().then(function (extensionData) {
        var parameters = _paramUtils.filter.apply(undefined, [extensionData].concat(EXCLUDED_FIELDS));
        var queryString = (0, _queryString.convertObjectToQueryString)(parameters);
        return _this2.__cookieFacade.setCookie(queryString).then(function () {
          var url = _this2.__uninstallUrl + '?cookie=' + encodeURIComponent(_this2.__cookieName);
          chrome.runtime.setUninstallURL(url);
        });
      });
    }
  }]);

  return UninstallUrlPlugin;
}(_basePlugin2.default);

exports.default = UninstallUrlPlugin;

},{"../utils/param-utils":111,"../utils/query-string":112,"./base-plugin":98}],105:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapChromeApi = wrapChromeApi;
function wrapChromeApi(namespace, method) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  console.log('Chrome API called', namespace, method, args);
  return new Promise(function (resolve, reject) {
    var callback = function callback(result) {
      if (chrome.runtime.lastError) {
        console.error('Chrome API Error:', chrome.runtime.lastError);
        return reject(chrome.runtime.lastError);
      }
      console.info('Chrome API Response', result);
      return resolve(result);
    };
    namespace[method].apply(namespace, args.concat(callback));
  });
}

},{}],106:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.today = today;
exports.tomorrow = tomorrow;
exports.tomorrowWithRandomTime = tomorrowWithRandomTime;
exports.isInFuture = isInFuture;
exports.isWithinRange = isWithinRange;
exports.isWithinTimeInterval = isWithinTimeInterval;
function today() {
  var date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

function tomorrow() {
  var date = today();
  date.setDate(date.getDate() + 1);
  return date;
}

function tomorrowWithRandomTime() {
  var date = tomorrow();
  date.setSeconds(Math.floor(Math.random() * 60 * 60 * 2));
  return date;
}

function isInFuture(date) {
  var now = new Date();
  return date.getTime() >= now.getTime();
}

function isWithinRange(currentDate, dateStart, dateEnd) {
  var currentTime = currentDate.getTime();
  return currentTime >= dateStart.getTime() && currentTime <= dateEnd.getTime();
}

function isWithinTimeInterval(currentDate, startTime, endTime) {
  var currentHours = currentDate.getHours();
  var currentMinutes = currentDate.getMinutes();
  return currentHours >= startTime.hours && currentMinutes >= startTime.minutes && currentHours <= endTime.hours && currentMinutes <= endTime.minutes;
}

},{}],107:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _firefoxUtils = require('./firefox-utils');

var fetchFunc = void 0;

if (typeof fetch === 'function') {
  fetchFunc = fetch;
} else {
  fetchFunc = function fetchFunc(url) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var method = options.method;
    var credentials = options.credentials;
    var cache = options.cache;
    var headers = options.headers;


    return new Promise(function (resolve, reject) {
      var requestMethod = method || 'get';
      var anonymous = credentials !== 'include';
      var requestHeaders = _extends({}, headers);

      if (cache === 'no-store') {
        requestHeaders['Pragma'] = 'no-cache';
        requestHeaders['Cache-Control'] = 'no-cache';
      }

      var params = {
        url: url,
        headers: requestHeaders,
        anonymous: anonymous,
        onComplete: function onComplete(_ref) {
          var status = _ref.status;

          if (status === 0) {
            reject();
          } else {
            resolve(true);
          }
        }
      };

      var request = (0, _firefoxUtils.Request)(params);
      request[requestMethod.toLowerCase()]();
    });
  };
}

exports.default = fetchFunc;

},{"./firefox-utils":108}],108:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Cc = exports.Cc = void 0;
var Ci = exports.Ci = void 0;
var Cu = exports.Cu = void 0;
var Request = exports.Request = void 0;

if (typeof chrome === 'undefined') {
  var c = require('chrome');
  exports.Cc = Cc = c.Cc;
  exports.Ci = Ci = c.Ci;
  exports.Cu = Cu = c.Cu;

  exports.Request = Request = function Request(options) {
    function send(method) {
      var url = options.url;
      var anonymous = options.anonymous;
      var onComplete = options.onComplete;
      var headers = options.headers;

      var xhr = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);

      xhr.mozBackgroundRequest = true;
      xhr.open(method, url, true);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          onComplete(xhr);
        }
      };

      var loadFlags = 0;

      if (anonymous) {
        loadFlags |= Ci.nsIRequest.LOAD_ANONYMOUS;
      }

      if (headers.Pragma && headers.Pragma === 'no-cache') {
        loadFlags |= Ci.nsIRequest.LOAD_BYPASS_CACHE;
      }

      xhr.channel.loadFlags |= loadFlags;
      xhr.send(null);
    }

    return {
      get: function get() {
        send('GET');
      },
      post: function post() {
        send('POST');
      }
    };
  };
}

},{"chrome":"chrome"}],109:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
    var r = Math.random() * 16 | 0;
    var v = char === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};

;

},{}],110:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomArbitrary = getRandomArbitrary;
exports.getRandomInt = getRandomInt;
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

},{}],111:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMapper = createMapper;
exports.generateTargetParameters = generateTargetParameters;
exports.getRandomRnd = getRandomRnd;
exports.formatValue = formatValue;
exports.convertParametersToArray = convertParametersToArray;
exports.convertParametersToQueryString = convertParametersToQueryString;
exports.addParametersToUrlTemplate = addParametersToUrlTemplate;
exports.normalizeUrlTemplate = normalizeUrlTemplate;
exports.subset = subset;
exports.filter = filter;
exports.isNotEmpty = isNotEmpty;
exports.getIfNotEmpty = getIfNotEmpty;
exports.isUrlTemplate = isUrlTemplate;

var _urlTemplate = require('url-template');

var _urlTemplate2 = _interopRequireDefault(_urlTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMapper(mappings) {
  return function (source) {
    var result = {};
    Object.keys(source).forEach(function (key) {
      if (mappings.hasOwnProperty(key)) {
        result[mappings[key]] = source[key];
      } else {
        result[key] = source[key];
      }
    });
    return result;
  };
}

function generateTargetParameters(source) {
  var result = {};
  source.forEach(function (item) {
    result[item.Id] = item.Value;
  });
  return result;
}

function getRandomRnd() {
  return Math.floor(Math.random() * 100 * 1000 * 1000);
}

function formatValue(value) {
  if (typeof value === 'boolean') {
    return value ? 1 : 0;
  }
  return value;
}

function convertParametersToArray(source) {
  var result = [];
  Object.keys(source).forEach(function (key) {
    result.push({ key: key, value: source[key] });
  });
  return result;
}

function convertParametersToQueryString(parameters) {
  return parameters.filter(function (param) {
    return param.value !== undefined;
  }).map(function (param) {
    return encodeURIComponent(param.key) + '=' + encodeURIComponent(formatValue(param.value));
  }).join('&');
}

function addParametersToUrlTemplate(template, parameters) {
  return _urlTemplate2.default.parse(template).expand(parameters);
}

function normalizeUrlTemplate(template) {
  return template.replace(/\$(\{\w+\})/gi, '$1');
}

function subset(source) {
  var result = {};

  for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  keys.forEach(function (key) {
    if (source.hasOwnProperty(key) && source[key] !== undefined) {
      result[key] = source[key];
    }
  });
  return result;
}

function filter(source) {
  for (var _len2 = arguments.length, keys = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    keys[_key2 - 1] = arguments[_key2];
  }

  var result = {};
  Object.keys(source).forEach(function (key) {
    if (keys.indexOf(key) === -1) {
      result[key] = source[key];
    }
  });
  return result;
}

function isNotEmpty(source, prop) {
  return source.hasOwnProperty(prop) && source[prop] !== undefined && source[prop] !== '';
}

function getIfNotEmpty(source, prop, defaultValue) {
  return isNotEmpty(source, prop) ? source[prop] : defaultValue;
}

function isUrlTemplate(source) {
  return (/\{\w+\}/gi.test(source)
  );
}

},{"url-template":45}],112:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.convertObjectToQueryString = convertObjectToQueryString;
exports.parseQueryString = parseQueryString;
function convertObjectToQueryString(source) {
  var result = [];
  Object.keys(source).forEach(function (key) {
    if (source[key] !== undefined) {
      result.push(encodeURIComponent(key) + '=' + encodeURIComponent(source[key]));
    }
  });
  return result.join('&');
}

function parseQueryString(string) {
  var pairs = string.split('&');
  var result = {};
  pairs.forEach(function (item) {
    var pair = item.split('=');

    var _pair = _slicedToArray(pair, 2);

    var name = _pair[0];
    var value = _pair[1];

    if (value !== undefined) {
      result[name] = decodeURIComponent(value);
    }
  });
  return result;
}

},{}]},{},[57])(57)
});