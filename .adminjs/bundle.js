(function (designSystem, React) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  function bind(fn, thisArg) {
    return function wrap() {
      return fn.apply(thisArg, arguments);
    };
  }

  // utils is a library of generic helper functions non-specific to axios

  const {toString} = Object.prototype;
  const {getPrototypeOf} = Object;

  const kindOf = (cache => thing => {
      const str = toString.call(thing);
      return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  })(Object.create(null));

  const kindOfTest = (type) => {
    type = type.toLowerCase();
    return (thing) => kindOf(thing) === type
  };

  const typeOfTest = type => thing => typeof thing === type;

  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   *
   * @returns {boolean} True if value is an Array, otherwise false
   */
  const {isArray} = Array;

  /**
   * Determine if a value is undefined
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if the value is undefined, otherwise false
   */
  const isUndefined = typeOfTest('undefined');

  /**
   * Determine if a value is a Buffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Buffer, otherwise false
   */
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
      && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
  }

  /**
   * Determine if a value is an ArrayBuffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */
  const isArrayBuffer = kindOfTest('ArrayBuffer');


  /**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */
  function isArrayBufferView(val) {
    let result;
    if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
      result = ArrayBuffer.isView(val);
    } else {
      result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
    }
    return result;
  }

  /**
   * Determine if a value is a String
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a String, otherwise false
   */
  const isString = typeOfTest('string');

  /**
   * Determine if a value is a Function
   *
   * @param {*} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
  const isFunction = typeOfTest('function');

  /**
   * Determine if a value is a Number
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Number, otherwise false
   */
  const isNumber = typeOfTest('number');

  /**
   * Determine if a value is an Object
   *
   * @param {*} thing The value to test
   *
   * @returns {boolean} True if value is an Object, otherwise false
   */
  const isObject = (thing) => thing !== null && typeof thing === 'object';

  /**
   * Determine if a value is a Boolean
   *
   * @param {*} thing The value to test
   * @returns {boolean} True if value is a Boolean, otherwise false
   */
  const isBoolean = thing => thing === true || thing === false;

  /**
   * Determine if a value is a plain Object
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a plain Object, otherwise false
   */
  const isPlainObject = (val) => {
    if (kindOf(val) !== 'object') {
      return false;
    }

    const prototype = getPrototypeOf(val);
    return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
  };

  /**
   * Determine if a value is a Date
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Date, otherwise false
   */
  const isDate = kindOfTest('Date');

  /**
   * Determine if a value is a File
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a File, otherwise false
   */
  const isFile = kindOfTest('File');

  /**
   * Determine if a value is a Blob
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Blob, otherwise false
   */
  const isBlob = kindOfTest('Blob');

  /**
   * Determine if a value is a FileList
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a File, otherwise false
   */
  const isFileList = kindOfTest('FileList');

  /**
   * Determine if a value is a Stream
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Stream, otherwise false
   */
  const isStream = (val) => isObject(val) && isFunction(val.pipe);

  /**
   * Determine if a value is a FormData
   *
   * @param {*} thing The value to test
   *
   * @returns {boolean} True if value is an FormData, otherwise false
   */
  const isFormData = (thing) => {
    let kind;
    return thing && (
      (typeof FormData === 'function' && thing instanceof FormData) || (
        isFunction(thing.append) && (
          (kind = kindOf(thing)) === 'formdata' ||
          // detect form-data instance
          (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
        )
      )
    )
  };

  /**
   * Determine if a value is a URLSearchParams object
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
  const isURLSearchParams = kindOfTest('URLSearchParams');

  const [isReadableStream, isRequest, isResponse, isHeaders] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(kindOfTest);

  /**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   *
   * @returns {String} The String freed of excess whitespace
   */
  const trim = (str) => str.trim ?
    str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

  /**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   *
   * @param {Boolean} [allOwnKeys = false]
   * @returns {any}
   */
  function forEach(obj, fn, {allOwnKeys = false} = {}) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    }

    let i;
    let l;

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }

    if (isArray(obj)) {
      // Iterate over array values
      for (i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
      const len = keys.length;
      let key;

      for (i = 0; i < len; i++) {
        key = keys[i];
        fn.call(null, obj[key], key, obj);
      }
    }
  }

  function findKey(obj, key) {
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i = keys.length;
    let _key;
    while (i-- > 0) {
      _key = keys[i];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }

  const _global = (() => {
    /*eslint no-undef:0*/
    if (typeof globalThis !== "undefined") return globalThis;
    return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
  })();

  const isContextDefined = (context) => !isUndefined(context) && context !== _global;

  /**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   *
   * @returns {Object} Result of all merge properties
   */
  function merge(/* obj1, obj2, obj3, ... */) {
    const {caseless} = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = (val, key) => {
      const targetKey = caseless && findKey(result, key) || key;
      if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
        result[targetKey] = merge(result[targetKey], val);
      } else if (isPlainObject(val)) {
        result[targetKey] = merge({}, val);
      } else if (isArray(val)) {
        result[targetKey] = val.slice();
      } else {
        result[targetKey] = val;
      }
    };

    for (let i = 0, l = arguments.length; i < l; i++) {
      arguments[i] && forEach(arguments[i], assignValue);
    }
    return result;
  }

  /**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   *
   * @param {Boolean} [allOwnKeys]
   * @returns {Object} The resulting value of object a
   */
  const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
    forEach(b, (val, key) => {
      if (thisArg && isFunction(val)) {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    }, {allOwnKeys});
    return a;
  };

  /**
   * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
   *
   * @param {string} content with BOM
   *
   * @returns {string} content value without BOM
   */
  const stripBOM = (content) => {
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    return content;
  };

  /**
   * Inherit the prototype methods from one constructor into another
   * @param {function} constructor
   * @param {function} superConstructor
   * @param {object} [props]
   * @param {object} [descriptors]
   *
   * @returns {void}
   */
  const inherits = (constructor, superConstructor, props, descriptors) => {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors);
    constructor.prototype.constructor = constructor;
    Object.defineProperty(constructor, 'super', {
      value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
  };

  /**
   * Resolve object with deep prototype chain to a flat object
   * @param {Object} sourceObj source object
   * @param {Object} [destObj]
   * @param {Function|Boolean} [filter]
   * @param {Function} [propFilter]
   *
   * @returns {Object}
   */
  const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
    let props;
    let i;
    let prop;
    const merged = {};

    destObj = destObj || {};
    // eslint-disable-next-line no-eq-null,eqeqeq
    if (sourceObj == null) return destObj;

    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i = props.length;
      while (i-- > 0) {
        prop = props[i];
        if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = filter !== false && getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

    return destObj;
  };

  /**
   * Determines whether a string ends with the characters of a specified string
   *
   * @param {String} str
   * @param {String} searchString
   * @param {Number} [position= 0]
   *
   * @returns {boolean}
   */
  const endsWith = (str, searchString, position) => {
    str = String(str);
    if (position === undefined || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };


  /**
   * Returns new array from array like object or null if failed
   *
   * @param {*} [thing]
   *
   * @returns {?Array}
   */
  const toArray = (thing) => {
    if (!thing) return null;
    if (isArray(thing)) return thing;
    let i = thing.length;
    if (!isNumber(i)) return null;
    const arr = new Array(i);
    while (i-- > 0) {
      arr[i] = thing[i];
    }
    return arr;
  };

  /**
   * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
   * thing passed in is an instance of Uint8Array
   *
   * @param {TypedArray}
   *
   * @returns {Array}
   */
  // eslint-disable-next-line func-names
  const isTypedArray = (TypedArray => {
    // eslint-disable-next-line func-names
    return thing => {
      return TypedArray && thing instanceof TypedArray;
    };
  })(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

  /**
   * For each entry in the object, call the function with the key and value.
   *
   * @param {Object<any, any>} obj - The object to iterate over.
   * @param {Function} fn - The function to call for each entry.
   *
   * @returns {void}
   */
  const forEachEntry = (obj, fn) => {
    const generator = obj && obj[Symbol.iterator];

    const iterator = generator.call(obj);

    let result;

    while ((result = iterator.next()) && !result.done) {
      const pair = result.value;
      fn.call(obj, pair[0], pair[1]);
    }
  };

  /**
   * It takes a regular expression and a string, and returns an array of all the matches
   *
   * @param {string} regExp - The regular expression to match against.
   * @param {string} str - The string to search.
   *
   * @returns {Array<boolean>}
   */
  const matchAll = (regExp, str) => {
    let matches;
    const arr = [];

    while ((matches = regExp.exec(str)) !== null) {
      arr.push(matches);
    }

    return arr;
  };

  /* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
  const isHTMLForm = kindOfTest('HTMLFormElement');

  const toCamelCase = str => {
    return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
      function replacer(m, p1, p2) {
        return p1.toUpperCase() + p2;
      }
    );
  };

  /* Creating a function that will check if an object has a property. */
  const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

  /**
   * Determine if a value is a RegExp object
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a RegExp object, otherwise false
   */
  const isRegExp = kindOfTest('RegExp');

  const reduceDescriptors = (obj, reducer) => {
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};

    forEach(descriptors, (descriptor, name) => {
      let ret;
      if ((ret = reducer(descriptor, name, obj)) !== false) {
        reducedDescriptors[name] = ret || descriptor;
      }
    });

    Object.defineProperties(obj, reducedDescriptors);
  };

  /**
   * Makes all methods read-only
   * @param {Object} obj
   */

  const freezeMethods = (obj) => {
    reduceDescriptors(obj, (descriptor, name) => {
      // skip restricted props in strict mode
      if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
        return false;
      }

      const value = obj[name];

      if (!isFunction(value)) return;

      descriptor.enumerable = false;

      if ('writable' in descriptor) {
        descriptor.writable = false;
        return;
      }

      if (!descriptor.set) {
        descriptor.set = () => {
          throw Error('Can not rewrite read-only method \'' + name + '\'');
        };
      }
    });
  };

  const toObjectSet = (arrayOrString, delimiter) => {
    const obj = {};

    const define = (arr) => {
      arr.forEach(value => {
        obj[value] = true;
      });
    };

    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

    return obj;
  };

  const noop = () => {};

  const toFiniteNumber = (value, defaultValue) => {
    return value != null && Number.isFinite(value = +value) ? value : defaultValue;
  };

  const ALPHA = 'abcdefghijklmnopqrstuvwxyz';

  const DIGIT = '0123456789';

  const ALPHABET = {
    DIGIT,
    ALPHA,
    ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
  };

  const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
    let str = '';
    const {length} = alphabet;
    while (size--) {
      str += alphabet[Math.random() * length|0];
    }

    return str;
  };

  /**
   * If the thing is a FormData object, return true, otherwise return false.
   *
   * @param {unknown} thing - The thing to check.
   *
   * @returns {boolean}
   */
  function isSpecCompliantForm(thing) {
    return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
  }

  const toJSONObject = (obj) => {
    const stack = new Array(10);

    const visit = (source, i) => {

      if (isObject(source)) {
        if (stack.indexOf(source) >= 0) {
          return;
        }

        if(!('toJSON' in source)) {
          stack[i] = source;
          const target = isArray(source) ? [] : {};

          forEach(source, (value, key) => {
            const reducedValue = visit(value, i + 1);
            !isUndefined(reducedValue) && (target[key] = reducedValue);
          });

          stack[i] = undefined;

          return target;
        }
      }

      return source;
    };

    return visit(obj, 0);
  };

  const isAsyncFn = kindOfTest('AsyncFunction');

  const isThenable = (thing) =>
    thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

  // original code
  // https://github.com/DigitalBrainJS/AxiosPromise/blob/16deab13710ec09779922131f3fa5954320f83ab/lib/utils.js#L11-L34

  const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
    if (setImmediateSupported) {
      return setImmediate;
    }

    return postMessageSupported ? ((token, callbacks) => {
      _global.addEventListener("message", ({source, data}) => {
        if (source === _global && data === token) {
          callbacks.length && callbacks.shift()();
        }
      }, false);

      return (cb) => {
        callbacks.push(cb);
        _global.postMessage(token, "*");
      }
    })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
  })(
    typeof setImmediate === 'function',
    isFunction(_global.postMessage)
  );

  const asap = typeof queueMicrotask !== 'undefined' ?
    queueMicrotask.bind(_global) : ( typeof process !== 'undefined' && process.nextTick || _setImmediate);

  // *********************

  var utils$1 = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject,
    isReadableStream,
    isRequest,
    isResponse,
    isHeaders,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isRegExp,
    isFunction,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    ALPHABET,
    generateString,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable,
    setImmediate: _setImmediate,
    asap
  };

  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */
  function AxiosError(message, code, config, request, response) {
    Error.call(this);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error()).stack;
    }

    this.message = message;
    this.name = 'AxiosError';
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    response && (this.response = response);
  }

  utils$1.inherits(AxiosError, Error, {
    toJSON: function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: utils$1.toJSONObject(this.config),
        code: this.code,
        status: this.response && this.response.status ? this.response.status : null
      };
    }
  });

  const prototype$1 = AxiosError.prototype;
  const descriptors = {};

  [
    'ERR_BAD_OPTION_VALUE',
    'ERR_BAD_OPTION',
    'ECONNABORTED',
    'ETIMEDOUT',
    'ERR_NETWORK',
    'ERR_FR_TOO_MANY_REDIRECTS',
    'ERR_DEPRECATED',
    'ERR_BAD_RESPONSE',
    'ERR_BAD_REQUEST',
    'ERR_CANCELED',
    'ERR_NOT_SUPPORT',
    'ERR_INVALID_URL'
  // eslint-disable-next-line func-names
  ].forEach(code => {
    descriptors[code] = {value: code};
  });

  Object.defineProperties(AxiosError, descriptors);
  Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

  // eslint-disable-next-line func-names
  AxiosError.from = (error, code, config, request, response, customProps) => {
    const axiosError = Object.create(prototype$1);

    utils$1.toFlatObject(error, axiosError, function filter(obj) {
      return obj !== Error.prototype;
    }, prop => {
      return prop !== 'isAxiosError';
    });

    AxiosError.call(axiosError, error.message, code, config, request, response);

    axiosError.cause = error;

    axiosError.name = error.name;

    customProps && Object.assign(axiosError, customProps);

    return axiosError;
  };

  // eslint-disable-next-line strict
  var httpAdapter = null;

  /**
   * Determines if the given thing is a array or js object.
   *
   * @param {string} thing - The object or array to be visited.
   *
   * @returns {boolean}
   */
  function isVisitable(thing) {
    return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
  }

  /**
   * It removes the brackets from the end of a string
   *
   * @param {string} key - The key of the parameter.
   *
   * @returns {string} the key without the brackets.
   */
  function removeBrackets(key) {
    return utils$1.endsWith(key, '[]') ? key.slice(0, -2) : key;
  }

  /**
   * It takes a path, a key, and a boolean, and returns a string
   *
   * @param {string} path - The path to the current key.
   * @param {string} key - The key of the current object being iterated over.
   * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
   *
   * @returns {string} The path to the current key.
   */
  function renderKey(path, key, dots) {
    if (!path) return key;
    return path.concat(key).map(function each(token, i) {
      // eslint-disable-next-line no-param-reassign
      token = removeBrackets(token);
      return !dots && i ? '[' + token + ']' : token;
    }).join(dots ? '.' : '');
  }

  /**
   * If the array is an array and none of its elements are visitable, then it's a flat array.
   *
   * @param {Array<any>} arr - The array to check
   *
   * @returns {boolean}
   */
  function isFlatArray(arr) {
    return utils$1.isArray(arr) && !arr.some(isVisitable);
  }

  const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
    return /^is[A-Z]/.test(prop);
  });

  /**
   * Convert a data object to FormData
   *
   * @param {Object} obj
   * @param {?Object} [formData]
   * @param {?Object} [options]
   * @param {Function} [options.visitor]
   * @param {Boolean} [options.metaTokens = true]
   * @param {Boolean} [options.dots = false]
   * @param {?Boolean} [options.indexes = false]
   *
   * @returns {Object}
   **/

  /**
   * It converts an object into a FormData object
   *
   * @param {Object<any, any>} obj - The object to convert to form data.
   * @param {string} formData - The FormData object to append to.
   * @param {Object<string, any>} options
   *
   * @returns
   */
  function toFormData(obj, formData, options) {
    if (!utils$1.isObject(obj)) {
      throw new TypeError('target must be an object');
    }

    // eslint-disable-next-line no-param-reassign
    formData = formData || new (FormData)();

    // eslint-disable-next-line no-param-reassign
    options = utils$1.toFlatObject(options, {
      metaTokens: true,
      dots: false,
      indexes: false
    }, false, function defined(option, source) {
      // eslint-disable-next-line no-eq-null,eqeqeq
      return !utils$1.isUndefined(source[option]);
    });

    const metaTokens = options.metaTokens;
    // eslint-disable-next-line no-use-before-define
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
    const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);

    if (!utils$1.isFunction(visitor)) {
      throw new TypeError('visitor must be a function');
    }

    function convertValue(value) {
      if (value === null) return '';

      if (utils$1.isDate(value)) {
        return value.toISOString();
      }

      if (!useBlob && utils$1.isBlob(value)) {
        throw new AxiosError('Blob is not supported. Use a Buffer instead.');
      }

      if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
        return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
      }

      return value;
    }

    /**
     * Default visitor.
     *
     * @param {*} value
     * @param {String|Number} key
     * @param {Array<String|Number>} path
     * @this {FormData}
     *
     * @returns {boolean} return true to visit the each prop of the value recursively
     */
    function defaultVisitor(value, key, path) {
      let arr = value;

      if (value && !path && typeof value === 'object') {
        if (utils$1.endsWith(key, '{}')) {
          // eslint-disable-next-line no-param-reassign
          key = metaTokens ? key : key.slice(0, -2);
          // eslint-disable-next-line no-param-reassign
          value = JSON.stringify(value);
        } else if (
          (utils$1.isArray(value) && isFlatArray(value)) ||
          ((utils$1.isFileList(value) || utils$1.endsWith(key, '[]')) && (arr = utils$1.toArray(value))
          )) {
          // eslint-disable-next-line no-param-reassign
          key = removeBrackets(key);

          arr.forEach(function each(el, index) {
            !(utils$1.isUndefined(el) || el === null) && formData.append(
              // eslint-disable-next-line no-nested-ternary
              indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
              convertValue(el)
            );
          });
          return false;
        }
      }

      if (isVisitable(value)) {
        return true;
      }

      formData.append(renderKey(path, key, dots), convertValue(value));

      return false;
    }

    const stack = [];

    const exposedHelpers = Object.assign(predicates, {
      defaultVisitor,
      convertValue,
      isVisitable
    });

    function build(value, path) {
      if (utils$1.isUndefined(value)) return;

      if (stack.indexOf(value) !== -1) {
        throw Error('Circular reference detected in ' + path.join('.'));
      }

      stack.push(value);

      utils$1.forEach(value, function each(el, key) {
        const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
          formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers
        );

        if (result === true) {
          build(el, path ? path.concat(key) : [key]);
        }
      });

      stack.pop();
    }

    if (!utils$1.isObject(obj)) {
      throw new TypeError('data must be an object');
    }

    build(obj);

    return formData;
  }

  /**
   * It encodes a string by replacing all characters that are not in the unreserved set with
   * their percent-encoded equivalents
   *
   * @param {string} str - The string to encode.
   *
   * @returns {string} The encoded string.
   */
  function encode$1(str) {
    const charMap = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+',
      '%00': '\x00'
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
      return charMap[match];
    });
  }

  /**
   * It takes a params object and converts it to a FormData object
   *
   * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
   * @param {Object<string, any>} options - The options object passed to the Axios constructor.
   *
   * @returns {void}
   */
  function AxiosURLSearchParams(params, options) {
    this._pairs = [];

    params && toFormData(params, this, options);
  }

  const prototype = AxiosURLSearchParams.prototype;

  prototype.append = function append(name, value) {
    this._pairs.push([name, value]);
  };

  prototype.toString = function toString(encoder) {
    const _encode = encoder ? function(value) {
      return encoder.call(this, value, encode$1);
    } : encode$1;

    return this._pairs.map(function each(pair) {
      return _encode(pair[0]) + '=' + _encode(pair[1]);
    }, '').join('&');
  };

  /**
   * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
   * URI encoded counterparts
   *
   * @param {string} val The value to be encoded.
   *
   * @returns {string} The encoded value.
   */
  function encode(val) {
    return encodeURIComponent(val).
      replace(/%3A/gi, ':').
      replace(/%24/g, '$').
      replace(/%2C/gi, ',').
      replace(/%20/g, '+').
      replace(/%5B/gi, '[').
      replace(/%5D/gi, ']');
  }

  /**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @param {?object} options
   *
   * @returns {string} The formatted url
   */
  function buildURL(url, params, options) {
    /*eslint no-param-reassign:0*/
    if (!params) {
      return url;
    }
    
    const _encode = options && options.encode || encode;

    const serializeFn = options && options.serialize;

    let serializedParams;

    if (serializeFn) {
      serializedParams = serializeFn(params, options);
    } else {
      serializedParams = utils$1.isURLSearchParams(params) ?
        params.toString() :
        new AxiosURLSearchParams(params, options).toString(_encode);
    }

    if (serializedParams) {
      const hashmarkIndex = url.indexOf("#");

      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }

    return url;
  }

  class InterceptorManager {
    constructor() {
      this.handlers = [];
    }

    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    }

    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     *
     * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
     */
    eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    }

    /**
     * Clear all interceptors from the stack
     *
     * @returns {void}
     */
    clear() {
      if (this.handlers) {
        this.handlers = [];
      }
    }

    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     *
     * @returns {void}
     */
    forEach(fn) {
      utils$1.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    }
  }

  var transitionalDefaults = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  };

  var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

  var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

  var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

  var platform$1 = {
    isBrowser: true,
    classes: {
      URLSearchParams: URLSearchParams$1,
      FormData: FormData$1,
      Blob: Blob$1
    },
    protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
  };

  const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

  /**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   * nativescript
   *  navigator.product -> 'NativeScript' or 'NS'
   *
   * @returns {boolean}
   */
  const hasStandardBrowserEnv = (
    (product) => {
      return hasBrowserEnv && ['ReactNative', 'NativeScript', 'NS'].indexOf(product) < 0
    })(typeof navigator !== 'undefined' && navigator.product);

  /**
   * Determine if we're running in a standard browser webWorker environment
   *
   * Although the `isStandardBrowserEnv` method indicates that
   * `allows axios to run in a web worker`, the WebWorker will still be
   * filtered out due to its judgment standard
   * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
   * This leads to a problem when axios post `FormData` in webWorker
   */
  const hasStandardBrowserWebWorkerEnv = (() => {
    return (
      typeof WorkerGlobalScope !== 'undefined' &&
      // eslint-disable-next-line no-undef
      self instanceof WorkerGlobalScope &&
      typeof self.importScripts === 'function'
    );
  })();

  const origin = hasBrowserEnv && window.location.href || 'http://localhost';

  var utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    hasBrowserEnv: hasBrowserEnv,
    hasStandardBrowserEnv: hasStandardBrowserEnv,
    hasStandardBrowserWebWorkerEnv: hasStandardBrowserWebWorkerEnv,
    origin: origin
  });

  var platform = {
    ...utils,
    ...platform$1
  };

  function toURLEncodedForm(data, options) {
    return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
      visitor: function(value, key, path, helpers) {
        if (platform.isNode && utils$1.isBuffer(value)) {
          this.append(key, value.toString('base64'));
          return false;
        }

        return helpers.defaultVisitor.apply(this, arguments);
      }
    }, options));
  }

  /**
   * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
   *
   * @param {string} name - The name of the property to get.
   *
   * @returns An array of strings.
   */
  function parsePropPath(name) {
    // foo[x][y][z]
    // foo.x.y.z
    // foo-x-y-z
    // foo x y z
    return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
      return match[0] === '[]' ? '' : match[1] || match[0];
    });
  }

  /**
   * Convert an array to an object.
   *
   * @param {Array<any>} arr - The array to convert to an object.
   *
   * @returns An object with the same keys and values as the array.
   */
  function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i;
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      obj[key] = arr[key];
    }
    return obj;
  }

  /**
   * It takes a FormData object and returns a JavaScript object
   *
   * @param {string} formData The FormData object to convert to JSON.
   *
   * @returns {Object<string, any> | null} The converted object.
   */
  function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
      let name = path[index++];

      if (name === '__proto__') return true;

      const isNumericKey = Number.isFinite(+name);
      const isLast = index >= path.length;
      name = !name && utils$1.isArray(target) ? target.length : name;

      if (isLast) {
        if (utils$1.hasOwnProp(target, name)) {
          target[name] = [target[name], value];
        } else {
          target[name] = value;
        }

        return !isNumericKey;
      }

      if (!target[name] || !utils$1.isObject(target[name])) {
        target[name] = [];
      }

      const result = buildPath(path, value, target[name], index);

      if (result && utils$1.isArray(target[name])) {
        target[name] = arrayToObject(target[name]);
      }

      return !isNumericKey;
    }

    if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
      const obj = {};

      utils$1.forEachEntry(formData, (name, value) => {
        buildPath(parsePropPath(name), value, obj, 0);
      });

      return obj;
    }

    return null;
  }

  /**
   * It takes a string, tries to parse it, and if it fails, it returns the stringified version
   * of the input
   *
   * @param {any} rawValue - The value to be stringified.
   * @param {Function} parser - A function that parses a string into a JavaScript object.
   * @param {Function} encoder - A function that takes a value and returns a string.
   *
   * @returns {string} A stringified version of the rawValue.
   */
  function stringifySafely(rawValue, parser, encoder) {
    if (utils$1.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils$1.trim(rawValue);
      } catch (e) {
        if (e.name !== 'SyntaxError') {
          throw e;
        }
      }
    }

    return (encoder || JSON.stringify)(rawValue);
  }

  const defaults = {

    transitional: transitionalDefaults,

    adapter: ['xhr', 'http', 'fetch'],

    transformRequest: [function transformRequest(data, headers) {
      const contentType = headers.getContentType() || '';
      const hasJSONContentType = contentType.indexOf('application/json') > -1;
      const isObjectPayload = utils$1.isObject(data);

      if (isObjectPayload && utils$1.isHTMLForm(data)) {
        data = new FormData(data);
      }

      const isFormData = utils$1.isFormData(data);

      if (isFormData) {
        return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
      }

      if (utils$1.isArrayBuffer(data) ||
        utils$1.isBuffer(data) ||
        utils$1.isStream(data) ||
        utils$1.isFile(data) ||
        utils$1.isBlob(data) ||
        utils$1.isReadableStream(data)
      ) {
        return data;
      }
      if (utils$1.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils$1.isURLSearchParams(data)) {
        headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
        return data.toString();
      }

      let isFileList;

      if (isObjectPayload) {
        if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString();
        }

        if ((isFileList = utils$1.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
          const _FormData = this.env && this.env.FormData;

          return toFormData(
            isFileList ? {'files[]': data} : data,
            _FormData && new _FormData(),
            this.formSerializer
          );
        }
      }

      if (isObjectPayload || hasJSONContentType ) {
        headers.setContentType('application/json', false);
        return stringifySafely(data);
      }

      return data;
    }],

    transformResponse: [function transformResponse(data) {
      const transitional = this.transitional || defaults.transitional;
      const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
      const JSONRequested = this.responseType === 'json';

      if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
        return data;
      }

      if (data && utils$1.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
        const silentJSONParsing = transitional && transitional.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;

        try {
          return JSON.parse(data);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === 'SyntaxError') {
              throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }

      return data;
    }],

    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,

    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',

    maxContentLength: -1,
    maxBodyLength: -1,

    env: {
      FormData: platform.classes.FormData,
      Blob: platform.classes.Blob
    },

    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },

    headers: {
      common: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': undefined
      }
    }
  };

  utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
    defaults.headers[method] = {};
  });

  // RawAxiosHeaders whose duplicates are ignored by node
  // c.f. https://nodejs.org/api/http.html#http_message_headers
  const ignoreDuplicateOf = utils$1.toObjectSet([
    'age', 'authorization', 'content-length', 'content-type', 'etag',
    'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
    'last-modified', 'location', 'max-forwards', 'proxy-authorization',
    'referer', 'retry-after', 'user-agent'
  ]);

  /**
   * Parse headers into an object
   *
   * ```
   * Date: Wed, 27 Aug 2014 08:58:49 GMT
   * Content-Type: application/json
   * Connection: keep-alive
   * Transfer-Encoding: chunked
   * ```
   *
   * @param {String} rawHeaders Headers needing to be parsed
   *
   * @returns {Object} Headers parsed into an object
   */
  var parseHeaders = rawHeaders => {
    const parsed = {};
    let key;
    let val;
    let i;

    rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
      i = line.indexOf(':');
      key = line.substring(0, i).trim().toLowerCase();
      val = line.substring(i + 1).trim();

      if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
        return;
      }

      if (key === 'set-cookie') {
        if (parsed[key]) {
          parsed[key].push(val);
        } else {
          parsed[key] = [val];
        }
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    });

    return parsed;
  };

  const $internals = Symbol('internals');

  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }

  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }

    return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
  }

  function parseTokens(str) {
    const tokens = Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;

    while ((match = tokensRE.exec(str))) {
      tokens[match[1]] = match[2];
    }

    return tokens;
  }

  const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

  function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
    if (utils$1.isFunction(filter)) {
      return filter.call(this, value, header);
    }

    if (isHeaderNameFilter) {
      value = header;
    }

    if (!utils$1.isString(value)) return;

    if (utils$1.isString(filter)) {
      return value.indexOf(filter) !== -1;
    }

    if (utils$1.isRegExp(filter)) {
      return filter.test(value);
    }
  }

  function formatHeader(header) {
    return header.trim()
      .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
        return char.toUpperCase() + str;
      });
  }

  function buildAccessors(obj, header) {
    const accessorName = utils$1.toCamelCase(' ' + header);

    ['get', 'set', 'has'].forEach(methodName => {
      Object.defineProperty(obj, methodName + accessorName, {
        value: function(arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        },
        configurable: true
      });
    });
  }

  class AxiosHeaders {
    constructor(headers) {
      headers && this.set(headers);
    }

    set(header, valueOrRewrite, rewrite) {
      const self = this;

      function setHeader(_value, _header, _rewrite) {
        const lHeader = normalizeHeader(_header);

        if (!lHeader) {
          throw new Error('header name must be a non-empty string');
        }

        const key = utils$1.findKey(self, lHeader);

        if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
          self[key || _header] = normalizeValue(_value);
        }
      }

      const setHeaders = (headers, _rewrite) =>
        utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

      if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
        setHeaders(header, valueOrRewrite);
      } else if(utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
        setHeaders(parseHeaders(header), valueOrRewrite);
      } else if (utils$1.isHeaders(header)) {
        for (const [key, value] of header.entries()) {
          setHeader(value, key, rewrite);
        }
      } else {
        header != null && setHeader(valueOrRewrite, header, rewrite);
      }

      return this;
    }

    get(header, parser) {
      header = normalizeHeader(header);

      if (header) {
        const key = utils$1.findKey(this, header);

        if (key) {
          const value = this[key];

          if (!parser) {
            return value;
          }

          if (parser === true) {
            return parseTokens(value);
          }

          if (utils$1.isFunction(parser)) {
            return parser.call(this, value, key);
          }

          if (utils$1.isRegExp(parser)) {
            return parser.exec(value);
          }

          throw new TypeError('parser must be boolean|regexp|function');
        }
      }
    }

    has(header, matcher) {
      header = normalizeHeader(header);

      if (header) {
        const key = utils$1.findKey(this, header);

        return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
      }

      return false;
    }

    delete(header, matcher) {
      const self = this;
      let deleted = false;

      function deleteHeader(_header) {
        _header = normalizeHeader(_header);

        if (_header) {
          const key = utils$1.findKey(self, _header);

          if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
            delete self[key];

            deleted = true;
          }
        }
      }

      if (utils$1.isArray(header)) {
        header.forEach(deleteHeader);
      } else {
        deleteHeader(header);
      }

      return deleted;
    }

    clear(matcher) {
      const keys = Object.keys(this);
      let i = keys.length;
      let deleted = false;

      while (i--) {
        const key = keys[i];
        if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
          delete this[key];
          deleted = true;
        }
      }

      return deleted;
    }

    normalize(format) {
      const self = this;
      const headers = {};

      utils$1.forEach(this, (value, header) => {
        const key = utils$1.findKey(headers, header);

        if (key) {
          self[key] = normalizeValue(value);
          delete self[header];
          return;
        }

        const normalized = format ? formatHeader(header) : String(header).trim();

        if (normalized !== header) {
          delete self[header];
        }

        self[normalized] = normalizeValue(value);

        headers[normalized] = true;
      });

      return this;
    }

    concat(...targets) {
      return this.constructor.concat(this, ...targets);
    }

    toJSON(asStrings) {
      const obj = Object.create(null);

      utils$1.forEach(this, (value, header) => {
        value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(', ') : value);
      });

      return obj;
    }

    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }

    toString() {
      return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
    }

    get [Symbol.toStringTag]() {
      return 'AxiosHeaders';
    }

    static from(thing) {
      return thing instanceof this ? thing : new this(thing);
    }

    static concat(first, ...targets) {
      const computed = new this(first);

      targets.forEach((target) => computed.set(target));

      return computed;
    }

    static accessor(header) {
      const internals = this[$internals] = (this[$internals] = {
        accessors: {}
      });

      const accessors = internals.accessors;
      const prototype = this.prototype;

      function defineAccessor(_header) {
        const lHeader = normalizeHeader(_header);

        if (!accessors[lHeader]) {
          buildAccessors(prototype, _header);
          accessors[lHeader] = true;
        }
      }

      utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

      return this;
    }
  }

  AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

  // reserved names hotfix
  utils$1.reduceDescriptors(AxiosHeaders.prototype, ({value}, key) => {
    let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
    return {
      get: () => value,
      set(headerValue) {
        this[mapped] = headerValue;
      }
    }
  });

  utils$1.freezeMethods(AxiosHeaders);

  /**
   * Transform the data for a request or a response
   *
   * @param {Array|Function} fns A single function or Array of functions
   * @param {?Object} response The response object
   *
   * @returns {*} The resulting transformed data
   */
  function transformData(fns, response) {
    const config = this || defaults;
    const context = response || config;
    const headers = AxiosHeaders.from(context.headers);
    let data = context.data;

    utils$1.forEach(fns, function transform(fn) {
      data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
    });

    headers.normalize();

    return data;
  }

  function isCancel(value) {
    return !!(value && value.__CANCEL__);
  }

  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  function CanceledError(message, config, request) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
    this.name = 'CanceledError';
  }

  utils$1.inherits(CanceledError, AxiosError, {
    __CANCEL__: true
  });

  /**
   * Resolve or reject a Promise based on response status.
   *
   * @param {Function} resolve A function that resolves the promise.
   * @param {Function} reject A function that rejects the promise.
   * @param {object} response The response.
   *
   * @returns {object} The response.
   */
  function settle(resolve, reject, response) {
    const validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError(
        'Request failed with status code ' + response.status,
        [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      ));
    }
  }

  function parseProtocol(url) {
    const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || '';
  }

  /**
   * Calculate data maxRate
   * @param {Number} [samplesCount= 10]
   * @param {Number} [min= 1000]
   * @returns {Function}
   */
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;

    min = min !== undefined ? min : 1000;

    return function push(chunkLength) {
      const now = Date.now();

      const startedAt = timestamps[tail];

      if (!firstSampleTS) {
        firstSampleTS = now;
      }

      bytes[head] = chunkLength;
      timestamps[head] = now;

      let i = tail;
      let bytesCount = 0;

      while (i !== head) {
        bytesCount += bytes[i++];
        i = i % samplesCount;
      }

      head = (head + 1) % samplesCount;

      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }

      if (now - firstSampleTS < min) {
        return;
      }

      const passed = startedAt && now - startedAt;

      return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
    };
  }

  /**
   * Throttle decorator
   * @param {Function} fn
   * @param {Number} freq
   * @return {Function}
   */
  function throttle(fn, freq) {
    let timestamp = 0;
    let threshold = 1000 / freq;
    let lastArgs;
    let timer;

    const invoke = (args, now = Date.now()) => {
      timestamp = now;
      lastArgs = null;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(null, args);
    };

    const throttled = (...args) => {
      const now = Date.now();
      const passed = now - timestamp;
      if ( passed >= threshold) {
        invoke(args, now);
      } else {
        lastArgs = args;
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            invoke(lastArgs);
          }, threshold - passed);
        }
      }
    };

    const flush = () => lastArgs && invoke(lastArgs);

    return [throttled, flush];
  }

  const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
    let bytesNotified = 0;
    const _speedometer = speedometer(50, 250);

    return throttle(e => {
      const loaded = e.loaded;
      const total = e.lengthComputable ? e.total : undefined;
      const progressBytes = loaded - bytesNotified;
      const rate = _speedometer(progressBytes);
      const inRange = loaded <= total;

      bytesNotified = loaded;

      const data = {
        loaded,
        total,
        progress: total ? (loaded / total) : undefined,
        bytes: progressBytes,
        rate: rate ? rate : undefined,
        estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
        event: e,
        lengthComputable: total != null,
        [isDownloadStream ? 'download' : 'upload']: true
      };

      listener(data);
    }, freq);
  };

  const progressEventDecorator = (total, throttled) => {
    const lengthComputable = total != null;

    return [(loaded) => throttled[0]({
      lengthComputable,
      total,
      loaded
    }), throttled[1]];
  };

  const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));

  var isURLSameOrigin = platform.hasStandardBrowserEnv ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      const msie = /(msie|trident)/i.test(navigator.userAgent);
      const urlParsingNode = document.createElement('a');
      let originURL;

      /**
      * Parse a URL to discover its components
      *
      * @param {String} url The URL to be parsed
      * @returns {Object}
      */
      function resolveURL(url) {
        let href = url;

        if (msie) {
          // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
      * Determine if a URL shares the same origin as the current location
      *
      * @param {String} requestURL The URL to test
      * @returns {boolean} True if URL shares the same origin, otherwise false
      */
      return function isURLSameOrigin(requestURL) {
        const parsed = (utils$1.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

    // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })();

  var cookies = platform.hasStandardBrowserEnv ?

    // Standard browser envs support document.cookie
    {
      write(name, value, expires, path, domain, secure) {
        const cookie = [name + '=' + encodeURIComponent(value)];

        utils$1.isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());

        utils$1.isString(path) && cookie.push('path=' + path);

        utils$1.isString(domain) && cookie.push('domain=' + domain);

        secure === true && cookie.push('secure');

        document.cookie = cookie.join('; ');
      },

      read(name) {
        const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    }

    :

    // Non-standard browser env (web workers, react-native) lack needed support.
    {
      write() {},
      read() {
        return null;
      },
      remove() {}
    };

  /**
   * Determines whether the specified URL is absolute
   *
   * @param {string} url The URL to test
   *
   * @returns {boolean} True if the specified URL is absolute, otherwise false
   */
  function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }

  /**
   * Creates a new URL by combining the specified URLs
   *
   * @param {string} baseURL The base URL
   * @param {string} relativeURL The relative URL
   *
   * @returns {string} The combined URL
   */
  function combineURLs(baseURL, relativeURL) {
    return relativeURL
      ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '')
      : baseURL;
  }

  /**
   * Creates a new URL by combining the baseURL with the requestedURL,
   * only when the requestedURL is not already an absolute URL.
   * If the requestURL is absolute, this function returns the requestedURL untouched.
   *
   * @param {string} baseURL The base URL
   * @param {string} requestedURL Absolute or relative URL to combine
   *
   * @returns {string} The combined full path
   */
  function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }

  const headersToObject = (thing) => thing instanceof AxiosHeaders ? { ...thing } : thing;

  /**
   * Config-specific merge-function which creates a new config-object
   * by merging two configuration objects together.
   *
   * @param {Object} config1
   * @param {Object} config2
   *
   * @returns {Object} New object resulting from merging config2 to config1
   */
  function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {};
    const config = {};

    function getMergedValue(target, source, caseless) {
      if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
        return utils$1.merge.call({caseless}, target, source);
      } else if (utils$1.isPlainObject(source)) {
        return utils$1.merge({}, source);
      } else if (utils$1.isArray(source)) {
        return source.slice();
      }
      return source;
    }

    // eslint-disable-next-line consistent-return
    function mergeDeepProperties(a, b, caseless) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(a, b, caseless);
      } else if (!utils$1.isUndefined(a)) {
        return getMergedValue(undefined, a, caseless);
      }
    }

    // eslint-disable-next-line consistent-return
    function valueFromConfig2(a, b) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(undefined, b);
      }
    }

    // eslint-disable-next-line consistent-return
    function defaultToConfig2(a, b) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(undefined, b);
      } else if (!utils$1.isUndefined(a)) {
        return getMergedValue(undefined, a);
      }
    }

    // eslint-disable-next-line consistent-return
    function mergeDirectKeys(a, b, prop) {
      if (prop in config2) {
        return getMergedValue(a, b);
      } else if (prop in config1) {
        return getMergedValue(undefined, a);
      }
    }

    const mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      withXSRFToken: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      beforeRedirect: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
    };

    utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
      const merge = mergeMap[prop] || mergeDeepProperties;
      const configValue = merge(config1[prop], config2[prop], prop);
      (utils$1.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
    });

    return config;
  }

  var resolveConfig = (config) => {
    const newConfig = mergeConfig({}, config);

    let {data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth} = newConfig;

    newConfig.headers = headers = AxiosHeaders.from(headers);

    newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url), config.params, config.paramsSerializer);

    // HTTP basic authentication
    if (auth) {
      headers.set('Authorization', 'Basic ' +
        btoa((auth.username || '') + ':' + (auth.password ? unescape(encodeURIComponent(auth.password)) : ''))
      );
    }

    let contentType;

    if (utils$1.isFormData(data)) {
      if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
        headers.setContentType(undefined); // Let the browser set it
      } else if ((contentType = headers.getContentType()) !== false) {
        // fix semicolon duplication issue for ReactNative FormData implementation
        const [type, ...tokens] = contentType ? contentType.split(';').map(token => token.trim()).filter(Boolean) : [];
        headers.setContentType([type || 'multipart/form-data', ...tokens].join('; '));
      }
    }

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.

    if (platform.hasStandardBrowserEnv) {
      withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));

      if (withXSRFToken || (withXSRFToken !== false && isURLSameOrigin(newConfig.url))) {
        // Add xsrf header
        const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);

        if (xsrfValue) {
          headers.set(xsrfHeaderName, xsrfValue);
        }
      }
    }

    return newConfig;
  };

  const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

  var xhrAdapter = isXHRAdapterSupported && function (config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      const _config = resolveConfig(config);
      let requestData = _config.data;
      const requestHeaders = AxiosHeaders.from(_config.headers).normalize();
      let {responseType, onUploadProgress, onDownloadProgress} = _config;
      let onCanceled;
      let uploadThrottled, downloadThrottled;
      let flushUpload, flushDownload;

      function done() {
        flushUpload && flushUpload(); // flush events
        flushDownload && flushDownload(); // flush events

        _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);

        _config.signal && _config.signal.removeEventListener('abort', onCanceled);
      }

      let request = new XMLHttpRequest();

      request.open(_config.method.toUpperCase(), _config.url, true);

      // Set the request timeout in MS
      request.timeout = _config.timeout;

      function onloadend() {
        if (!request) {
          return;
        }
        // Prepare the response
        const responseHeaders = AxiosHeaders.from(
          'getAllResponseHeaders' in request && request.getAllResponseHeaders()
        );
        const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
          request.responseText : request.response;
        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };

        settle(function _resolve(value) {
          resolve(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);

        // Clean up request
        request = null;
      }

      if ('onloadend' in request) {
        // Use onloadend if available
        request.onloadend = onloadend;
      } else {
        // Listen for ready state to emulate onloadend
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }

          // The request errored out and we didn't get a response, this will be
          // handled by onerror instead
          // With one exception: request that using file: protocol, most browsers
          // will return status as 0 even though it's a successful request
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
            return;
          }
          // readystate handler is calling before onerror or ontimeout handlers,
          // so we should call onloadend on the next 'tick'
          setTimeout(onloadend);
        };
      }

      // Handle browser request cancellation (as opposed to a manual cancellation)
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }

        reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

        // Clean up request
        request = null;
      };

      // Handle low level network errors
      request.onerror = function handleError() {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request));

        // Clean up request
        request = null;
      };

      // Handle timeout
      request.ontimeout = function handleTimeout() {
        let timeoutErrorMessage = _config.timeout ? 'timeout of ' + _config.timeout + 'ms exceeded' : 'timeout exceeded';
        const transitional = _config.transitional || transitionalDefaults;
        if (_config.timeoutErrorMessage) {
          timeoutErrorMessage = _config.timeoutErrorMessage;
        }
        reject(new AxiosError(
          timeoutErrorMessage,
          transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
          config,
          request));

        // Clean up request
        request = null;
      };

      // Remove Content-Type if data is undefined
      requestData === undefined && requestHeaders.setContentType(null);

      // Add headers to the request
      if ('setRequestHeader' in request) {
        utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
          request.setRequestHeader(key, val);
        });
      }

      // Add withCredentials to request if needed
      if (!utils$1.isUndefined(_config.withCredentials)) {
        request.withCredentials = !!_config.withCredentials;
      }

      // Add responseType to request if needed
      if (responseType && responseType !== 'json') {
        request.responseType = _config.responseType;
      }

      // Handle progress if needed
      if (onDownloadProgress) {
        ([downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true));
        request.addEventListener('progress', downloadThrottled);
      }

      // Not all browsers support upload events
      if (onUploadProgress && request.upload) {
        ([uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress));

        request.upload.addEventListener('progress', uploadThrottled);

        request.upload.addEventListener('loadend', flushUpload);
      }

      if (_config.cancelToken || _config.signal) {
        // Handle cancellation
        // eslint-disable-next-line func-names
        onCanceled = cancel => {
          if (!request) {
            return;
          }
          reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
          request.abort();
          request = null;
        };

        _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
        if (_config.signal) {
          _config.signal.aborted ? onCanceled() : _config.signal.addEventListener('abort', onCanceled);
        }
      }

      const protocol = parseProtocol(_config.url);

      if (protocol && platform.protocols.indexOf(protocol) === -1) {
        reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
        return;
      }


      // Send the request
      request.send(requestData || null);
    });
  };

  const composeSignals = (signals, timeout) => {
    let controller = new AbortController();

    let aborted;

    const onabort = function (cancel) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = cancel instanceof Error ? cancel : this.reason;
        controller.abort(err instanceof AxiosError ? err : new CanceledError(err instanceof Error ? err.message : err));
      }
    };

    let timer = timeout && setTimeout(() => {
      onabort(new AxiosError(`timeout ${timeout} of ms exceeded`, AxiosError.ETIMEDOUT));
    }, timeout);

    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach(signal => {
          signal &&
          (signal.removeEventListener ? signal.removeEventListener('abort', onabort) : signal.unsubscribe(onabort));
        });
        signals = null;
      }
    };

    signals.forEach((signal) => signal && signal.addEventListener && signal.addEventListener('abort', onabort));

    const {signal} = controller;

    signal.unsubscribe = unsubscribe;

    return [signal, () => {
      timer && clearTimeout(timer);
      timer = null;
    }];
  };

  const streamChunk = function* (chunk, chunkSize) {
    let len = chunk.byteLength;

    if (!chunkSize || len < chunkSize) {
      yield chunk;
      return;
    }

    let pos = 0;
    let end;

    while (pos < len) {
      end = pos + chunkSize;
      yield chunk.slice(pos, end);
      pos = end;
    }
  };

  const readBytes = async function* (iterable, chunkSize, encode) {
    for await (const chunk of iterable) {
      yield* streamChunk(ArrayBuffer.isView(chunk) ? chunk : (await encode(String(chunk))), chunkSize);
    }
  };

  const trackStream = (stream, chunkSize, onProgress, onFinish, encode) => {
    const iterator = readBytes(stream, chunkSize, encode);

    let bytes = 0;
    let done;
    let _onFinish = (e) => {
      if (!done) {
        done = true;
        onFinish && onFinish(e);
      }
    };

    return new ReadableStream({
      async pull(controller) {
        try {
          const {done, value} = await iterator.next();

          if (done) {
           _onFinish();
            controller.close();
            return;
          }

          let len = value.byteLength;
          if (onProgress) {
            let loadedBytes = bytes += len;
            onProgress(loadedBytes);
          }
          controller.enqueue(new Uint8Array(value));
        } catch (err) {
          _onFinish(err);
          throw err;
        }
      },
      cancel(reason) {
        _onFinish(reason);
        return iterator.return();
      }
    }, {
      highWaterMark: 2
    })
  };

  const isFetchSupported = typeof fetch === 'function' && typeof Request === 'function' && typeof Response === 'function';
  const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === 'function';

  // used only inside the fetch adapter
  const encodeText = isFetchSupported && (typeof TextEncoder === 'function' ?
      ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) :
      async (str) => new Uint8Array(await new Response(str).arrayBuffer())
  );

  const test = (fn, ...args) => {
    try {
      return !!fn(...args);
    } catch (e) {
      return false
    }
  };

  const supportsRequestStream = isReadableStreamSupported && test(() => {
    let duplexAccessed = false;

    const hasContentType = new Request(platform.origin, {
      body: new ReadableStream(),
      method: 'POST',
      get duplex() {
        duplexAccessed = true;
        return 'half';
      },
    }).headers.has('Content-Type');

    return duplexAccessed && !hasContentType;
  });

  const DEFAULT_CHUNK_SIZE = 64 * 1024;

  const supportsResponseStream = isReadableStreamSupported &&
    test(() => utils$1.isReadableStream(new Response('').body));


  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };

  isFetchSupported && (((res) => {
    ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(type => {
      !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? (res) => res[type]() :
        (_, config) => {
          throw new AxiosError(`Response type '${type}' is not supported`, AxiosError.ERR_NOT_SUPPORT, config);
        });
    });
  })(new Response));

  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }

    if(utils$1.isBlob(body)) {
      return body.size;
    }

    if(utils$1.isSpecCompliantForm(body)) {
      return (await new Request(body).arrayBuffer()).byteLength;
    }

    if(utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
      return body.byteLength;
    }

    if(utils$1.isURLSearchParams(body)) {
      body = body + '';
    }

    if(utils$1.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };

  const resolveBodyLength = async (headers, body) => {
    const length = utils$1.toFiniteNumber(headers.getContentLength());

    return length == null ? getBodyLength(body) : length;
  };

  var fetchAdapter = isFetchSupported && (async (config) => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = 'same-origin',
      fetchOptions
    } = resolveConfig(config);

    responseType = responseType ? (responseType + '').toLowerCase() : 'text';

    let [composedSignal, stopTimeout] = (signal || cancelToken || timeout) ?
      composeSignals([signal, cancelToken], timeout) : [];

    let finished, request;

    const onFinish = () => {
      !finished && setTimeout(() => {
        composedSignal && composedSignal.unsubscribe();
      });

      finished = true;
    };

    let requestContentLength;

    try {
      if (
        onUploadProgress && supportsRequestStream && method !== 'get' && method !== 'head' &&
        (requestContentLength = await resolveBodyLength(headers, data)) !== 0
      ) {
        let _request = new Request(url, {
          method: 'POST',
          body: data,
          duplex: "half"
        });

        let contentTypeHeader;

        if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) {
          headers.setContentType(contentTypeHeader);
        }

        if (_request.body) {
          const [onProgress, flush] = progressEventDecorator(
            requestContentLength,
            progressEventReducer(asyncDecorator(onUploadProgress))
          );

          data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush, encodeText);
        }
      }

      if (!utils$1.isString(withCredentials)) {
        withCredentials = withCredentials ? 'include' : 'omit';
      }

      request = new Request(url, {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        credentials: withCredentials
      });

      let response = await fetch(request);

      const isStreamResponse = supportsResponseStream && (responseType === 'stream' || responseType === 'response');

      if (supportsResponseStream && (onDownloadProgress || isStreamResponse)) {
        const options = {};

        ['status', 'statusText', 'headers'].forEach(prop => {
          options[prop] = response[prop];
        });

        const responseContentLength = utils$1.toFiniteNumber(response.headers.get('content-length'));

        const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
          responseContentLength,
          progressEventReducer(asyncDecorator(onDownloadProgress), true)
        ) || [];

        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
            flush && flush();
            isStreamResponse && onFinish();
          }, encodeText),
          options
        );
      }

      responseType = responseType || 'text';

      let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || 'text'](response, config);

      !isStreamResponse && onFinish();

      stopTimeout && stopTimeout();

      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        });
      })
    } catch (err) {
      onFinish();

      if (err && err.name === 'TypeError' && /fetch/i.test(err.message)) {
        throw Object.assign(
          new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request),
          {
            cause: err.cause || err
          }
        )
      }

      throw AxiosError.from(err, err && err.code, config, request);
    }
  });

  const knownAdapters = {
    http: httpAdapter,
    xhr: xhrAdapter,
    fetch: fetchAdapter
  };

  utils$1.forEach(knownAdapters, (fn, value) => {
    if (fn) {
      try {
        Object.defineProperty(fn, 'name', {value});
      } catch (e) {
        // eslint-disable-next-line no-empty
      }
      Object.defineProperty(fn, 'adapterName', {value});
    }
  });

  const renderReason = (reason) => `- ${reason}`;

  const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;

  var adapters = {
    getAdapter: (adapters) => {
      adapters = utils$1.isArray(adapters) ? adapters : [adapters];

      const {length} = adapters;
      let nameOrAdapter;
      let adapter;

      const rejectedReasons = {};

      for (let i = 0; i < length; i++) {
        nameOrAdapter = adapters[i];
        let id;

        adapter = nameOrAdapter;

        if (!isResolvedHandle(nameOrAdapter)) {
          adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

          if (adapter === undefined) {
            throw new AxiosError(`Unknown adapter '${id}'`);
          }
        }

        if (adapter) {
          break;
        }

        rejectedReasons[id || '#' + i] = adapter;
      }

      if (!adapter) {

        const reasons = Object.entries(rejectedReasons)
          .map(([id, state]) => `adapter ${id} ` +
            (state === false ? 'is not supported by the environment' : 'is not available in the build')
          );

        let s = length ?
          (reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
          'as no adapter specified';

        throw new AxiosError(
          `There is no suitable adapter to dispatch the request ` + s,
          'ERR_NOT_SUPPORT'
        );
      }

      return adapter;
    },
    adapters: knownAdapters
  };

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   *
   * @param {Object} config The config that is to be used for the request
   *
   * @returns {void}
   */
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }

    if (config.signal && config.signal.aborted) {
      throw new CanceledError(null, config);
    }
  }

  /**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  function dispatchRequest(config) {
    throwIfCancellationRequested(config);

    config.headers = AxiosHeaders.from(config.headers);

    // Transform request data
    config.data = transformData.call(
      config,
      config.transformRequest
    );

    if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
      config.headers.setContentType('application/x-www-form-urlencoded', false);
    }

    const adapter = adapters.getAdapter(config.adapter || defaults.adapter);

    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);

      // Transform response data
      response.data = transformData.call(
        config,
        config.transformResponse,
        response
      );

      response.headers = AxiosHeaders.from(response.headers);

      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);

        // Transform response data
        if (reason && reason.response) {
          reason.response.data = transformData.call(
            config,
            config.transformResponse,
            reason.response
          );
          reason.response.headers = AxiosHeaders.from(reason.response.headers);
        }
      }

      return Promise.reject(reason);
    });
  }

  const VERSION = "1.7.4";

  const validators$1 = {};

  // eslint-disable-next-line func-names
  ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
    validators$1[type] = function validator(thing) {
      return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
    };
  });

  const deprecatedWarnings = {};

  /**
   * Transitional option validator
   *
   * @param {function|boolean?} validator - set to false if the transitional option has been removed
   * @param {string?} version - deprecated version / removed since version
   * @param {string?} message - some message with additional info
   *
   * @returns {function}
   */
  validators$1.transitional = function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
      return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
    }

    // eslint-disable-next-line func-names
    return (value, opt, opts) => {
      if (validator === false) {
        throw new AxiosError(
          formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
          AxiosError.ERR_DEPRECATED
        );
      }

      if (version && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        // eslint-disable-next-line no-console
        console.warn(
          formatMessage(
            opt,
            ' has been deprecated since v' + version + ' and will be removed in the near future'
          )
        );
      }

      return validator ? validator(value, opt, opts) : true;
    };
  };

  /**
   * Assert object's properties type
   *
   * @param {object} options
   * @param {object} schema
   * @param {boolean?} allowUnknown
   *
   * @returns {object}
   */

  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== 'object') {
      throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
    }
    const keys = Object.keys(options);
    let i = keys.length;
    while (i-- > 0) {
      const opt = keys[i];
      const validator = schema[opt];
      if (validator) {
        const value = options[opt];
        const result = value === undefined || validator(value, opt, options);
        if (result !== true) {
          throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
      }
    }
  }

  var validator = {
    assertOptions,
    validators: validators$1
  };

  const validators = validator.validators;

  /**
   * Create a new instance of Axios
   *
   * @param {Object} instanceConfig The default config for the instance
   *
   * @return {Axios} A new instance of Axios
   */
  class Axios {
    constructor(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }

    /**
     * Dispatch a request
     *
     * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
     * @param {?Object} config
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    async request(configOrUrl, config) {
      try {
        return await this._request(configOrUrl, config);
      } catch (err) {
        if (err instanceof Error) {
          let dummy;

          Error.captureStackTrace ? Error.captureStackTrace(dummy = {}) : (dummy = new Error());

          // slice off the Error: ... line
          const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : '';
          try {
            if (!err.stack) {
              err.stack = stack;
              // match without the 2 top stack lines
            } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
              err.stack += '\n' + stack;
            }
          } catch (e) {
            // ignore the case where "stack" is an un-writable property
          }
        }

        throw err;
      }
    }

    _request(configOrUrl, config) {
      /*eslint no-param-reassign:0*/
      // Allow for axios('example/url'[, config]) a la fetch API
      if (typeof configOrUrl === 'string') {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }

      config = mergeConfig(this.defaults, config);

      const {transitional, paramsSerializer, headers} = config;

      if (transitional !== undefined) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }

      if (paramsSerializer != null) {
        if (utils$1.isFunction(paramsSerializer)) {
          config.paramsSerializer = {
            serialize: paramsSerializer
          };
        } else {
          validator.assertOptions(paramsSerializer, {
            encode: validators.function,
            serialize: validators.function
          }, true);
        }
      }

      // Set config.method
      config.method = (config.method || this.defaults.method || 'get').toLowerCase();

      // Flatten headers
      let contextHeaders = headers && utils$1.merge(
        headers.common,
        headers[config.method]
      );

      headers && utils$1.forEach(
        ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
        (method) => {
          delete headers[method];
        }
      );

      config.headers = AxiosHeaders.concat(contextHeaders, headers);

      // filter out skipped interceptors
      const requestInterceptorChain = [];
      let synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
          return;
        }

        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });

      const responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });

      let promise;
      let i = 0;
      let len;

      if (!synchronousRequestInterceptors) {
        const chain = [dispatchRequest.bind(this), undefined];
        chain.unshift.apply(chain, requestInterceptorChain);
        chain.push.apply(chain, responseInterceptorChain);
        len = chain.length;

        promise = Promise.resolve(config);

        while (i < len) {
          promise = promise.then(chain[i++], chain[i++]);
        }

        return promise;
      }

      len = requestInterceptorChain.length;

      let newConfig = config;

      i = 0;

      while (i < len) {
        const onFulfilled = requestInterceptorChain[i++];
        const onRejected = requestInterceptorChain[i++];
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected.call(this, error);
          break;
        }
      }

      try {
        promise = dispatchRequest.call(this, newConfig);
      } catch (error) {
        return Promise.reject(error);
      }

      i = 0;
      len = responseInterceptorChain.length;

      while (i < len) {
        promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
      }

      return promise;
    }

    getUri(config) {
      config = mergeConfig(this.defaults, config);
      const fullPath = buildFullPath(config.baseURL, config.url);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    }
  }

  // Provide aliases for supported request methods
  utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function(url, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        url,
        data: (config || {}).data
      }));
    };
  });

  utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    /*eslint func-names:0*/

    function generateHTTPMethod(isForm) {
      return function httpMethod(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          headers: isForm ? {
            'Content-Type': 'multipart/form-data'
          } : {},
          url,
          data
        }));
      };
    }

    Axios.prototype[method] = generateHTTPMethod();

    Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
  });

  /**
   * A `CancelToken` is an object that can be used to request cancellation of an operation.
   *
   * @param {Function} executor The executor function.
   *
   * @returns {CancelToken}
   */
  class CancelToken {
    constructor(executor) {
      if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function.');
      }

      let resolvePromise;

      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });

      const token = this;

      // eslint-disable-next-line func-names
      this.promise.then(cancel => {
        if (!token._listeners) return;

        let i = token._listeners.length;

        while (i-- > 0) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });

      // eslint-disable-next-line func-names
      this.promise.then = onfulfilled => {
        let _resolve;
        // eslint-disable-next-line func-names
        const promise = new Promise(resolve => {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);

        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };

        return promise;
      };

      executor(function cancel(message, config, request) {
        if (token.reason) {
          // Cancellation has already been requested
          return;
        }

        token.reason = new CanceledError(message, config, request);
        resolvePromise(token.reason);
      });
    }

    /**
     * Throws a `CanceledError` if cancellation has been requested.
     */
    throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    }

    /**
     * Subscribe to the cancel signal
     */

    subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }

      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    }

    /**
     * Unsubscribe from the cancel signal
     */

    unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      const index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    }

    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    static source() {
      let cancel;
      const token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    }
  }

  /**
   * Syntactic sugar for invoking a function and expanding an array for arguments.
   *
   * Common use case would be to use `Function.prototype.apply`.
   *
   *  ```js
   *  function f(x, y, z) {}
   *  var args = [1, 2, 3];
   *  f.apply(null, args);
   *  ```
   *
   * With `spread` this example can be re-written.
   *
   *  ```js
   *  spread(function(x, y, z) {})([1, 2, 3]);
   *  ```
   *
   * @param {Function} callback
   *
   * @returns {Function}
   */
  function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  }

  /**
   * Determines whether the payload is an error thrown by Axios
   *
   * @param {*} payload The value to test
   *
   * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
   */
  function isAxiosError(payload) {
    return utils$1.isObject(payload) && (payload.isAxiosError === true);
  }

  const HttpStatusCode = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511,
  };

  Object.entries(HttpStatusCode).forEach(([key, value]) => {
    HttpStatusCode[value] = key;
  });

  /**
   * Create an instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   *
   * @returns {Axios} A new instance of Axios
   */
  function createInstance(defaultConfig) {
    const context = new Axios(defaultConfig);
    const instance = bind(Axios.prototype.request, context);

    // Copy axios.prototype to instance
    utils$1.extend(instance, Axios.prototype, context, {allOwnKeys: true});

    // Copy context to instance
    utils$1.extend(instance, context, null, {allOwnKeys: true});

    // Factory for creating new instances
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };

    return instance;
  }

  // Create the default instance to be exported
  const axios = createInstance(defaults);

  // Expose Axios class to allow class inheritance
  axios.Axios = Axios;

  // Expose Cancel & CancelToken
  axios.CanceledError = CanceledError;
  axios.CancelToken = CancelToken;
  axios.isCancel = isCancel;
  axios.VERSION = VERSION;
  axios.toFormData = toFormData;

  // Expose AxiosError class
  axios.AxiosError = AxiosError;

  // alias for CanceledError for backward compatibility
  axios.Cancel = axios.CanceledError;

  // Expose all/spread
  axios.all = function all(promises) {
    return Promise.all(promises);
  };

  axios.spread = spread;

  // Expose isAxiosError
  axios.isAxiosError = isAxiosError;

  // Expose mergeConfig
  axios.mergeConfig = mergeConfig;

  axios.AxiosHeaders = AxiosHeaders;

  axios.formToJSON = thing => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);

  axios.getAdapter = adapters.getAdapter;

  axios.HttpStatusCode = HttpStatusCode;

  axios.default = axios;

  const camposImagensResources = {
    Usuarios: 'avatar',
    Eventos: 'imagem',
    Igrejas: 'logo'
  };
  var UPLOAD = (props => {
    const [file, setFile] = React.useState(null);
    const [uploading, setUploading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(null);
    const {
      record,
      resource
    } = props;
    const handleDrop = files => {
      setFile(files[0]);
    };
    const handleSubmit = async () => {
      try {
        if (!file) throw new Error('Selecione um arquivo para enviar!');
        if (!resource.id) throw new Error('Sua sessão expirou, faça login novamente.');
        // @ts-ignore
        if (file.size / (1024 * 1024) > 100) throw new Error('Tamanho de arquivo inválido.\nLimite: 100MB.');
        // @ts-ignore
        if (file.name.length > 50) throw new Error('Nome de arquivo inválido.\nLimite: 50 caracteres.');
        setUploading(true);
        const formData = new FormData();
        formData.append('id', record?.id);
        formData.append('path', resource.id);
        //@ts-ignore
        formData.append('attribute', camposImagensResources[resource.id]);
        formData.append('file', file);
        const response = await axios.post('/painel/arquivo/upload', formData);
        alert(response.data.message);
        setUploading(false);
        setTimeout(() => {
          window.location.href = `/admin/resources/${resource.id}`;
        }, 1000);
      } catch (erro) {
        const {
          message
        } = erro;
        if (message) setErrorMessage(message);else setErrorMessage('Erro ao processar o envio do arquivo. Por favor, entre em contato com o suporte.');
        setUploading(false);
      }
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh'
      }
    }, /*#__PURE__*/React__default.default.createElement("h3", {
      style: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 16
      }
    }, "Upload de Arquivo"), /*#__PURE__*/React__default.default.createElement(designSystem.DropZone, {
      onChange: handleDrop,
      multiple: false,
      translations: {
        placeholder: 'Selecione ou arraste o arquivo aqui'
      }
    }), errorMessage && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        color: 'red',
        marginTop: 20
      }
    }, errorMessage), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      onClick: handleSubmit,
      mt: "lg",
      disabled: !file || uploading,
      style: {
        fontSize: '1rem',
        marginTop: '2rem',
        padding: '0.8rem 1.6rem',
        backgroundColor: 'rgb(254, 97, 0)',
        borderRadius: '8px',
        color: 'white'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
      icon: "Send"
    }), uploading ? 'Enviando...' : 'Enviar'));
  });

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.UPLOAD = UPLOAD;

})(AdminJSDesignSystem, React);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NFcnJvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9udWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RvRm9ybURhdGEuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy90cmFuc2l0aW9uYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9VUkxTZWFyY2hQYXJhbXMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9Gb3JtRGF0YS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vYnJvd3Nlci9jbGFzc2VzL0Jsb2IuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2NvbW1vbi91dGlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdG9VUkxFbmNvZGVkRm9ybS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zSGVhZGVycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZVByb3RvY29sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwZWVkb21ldGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3Rocm90dGxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3Byb2dyZXNzRXZlbnRSZWR1Y2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvYnVpbGRGdWxsUGF0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9tZXJnZUNvbmZpZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9yZXNvbHZlQ29uZmlnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tcG9zZVNpZ25hbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdHJhY2tTdHJlYW0uanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL2ZldGNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy9hZGFwdGVycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2Vudi9kYXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3ZhbGlkYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0F4aW9zRXJyb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvSHR0cFN0YXR1c0NvZGUuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzIiwiLi4vYXBwL2FkbWluL2NvbXBvbmVudHMvdXBsb2FkLnRzeCIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGJpbmQgZnJvbSAnLi9oZWxwZXJzL2JpbmQuanMnO1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG5jb25zdCB7dG9TdHJpbmd9ID0gT2JqZWN0LnByb3RvdHlwZTtcbmNvbnN0IHtnZXRQcm90b3R5cGVPZn0gPSBPYmplY3Q7XG5cbmNvbnN0IGtpbmRPZiA9IChjYWNoZSA9PiB0aGluZyA9PiB7XG4gICAgY29uc3Qgc3RyID0gdG9TdHJpbmcuY2FsbCh0aGluZyk7XG4gICAgcmV0dXJuIGNhY2hlW3N0cl0gfHwgKGNhY2hlW3N0cl0gPSBzdHIuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCkpO1xufSkoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG5cbmNvbnN0IGtpbmRPZlRlc3QgPSAodHlwZSkgPT4ge1xuICB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKHRoaW5nKSA9PiBraW5kT2YodGhpbmcpID09PSB0eXBlXG59XG5cbmNvbnN0IHR5cGVPZlRlc3QgPSB0eXBlID0+IHRoaW5nID0+IHR5cGVvZiB0aGluZyA9PT0gdHlwZTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IHtpc0FycmF5fSA9IEFycmF5O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVW5kZWZpbmVkID0gdHlwZU9mVGVzdCgndW5kZWZpbmVkJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbCkgJiYgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpXG4gICAgJiYgaXNGdW5jdGlvbih2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIpICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQXJyYXlCdWZmZXIgPSBraW5kT2ZUZXN0KCdBcnJheUJ1ZmZlcicpO1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgbGV0IHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAoaXNBcnJheUJ1ZmZlcih2YWwuYnVmZmVyKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1N0cmluZyA9IHR5cGVPZlRlc3QoJ3N0cmluZycpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRnVuY3Rpb24gPSB0eXBlT2ZUZXN0KCdmdW5jdGlvbicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzTnVtYmVyID0gdHlwZU9mVGVzdCgnbnVtYmVyJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpbmcgPT09ICdvYmplY3QnO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQm9vbGVhblxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQm9vbGVhbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQm9vbGVhbiA9IHRoaW5nID0+IHRoaW5nID09PSB0cnVlIHx8IHRoaW5nID09PSBmYWxzZTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1BsYWluT2JqZWN0ID0gKHZhbCkgPT4ge1xuICBpZiAoa2luZE9mKHZhbCkgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgcHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YodmFsKTtcbiAgcmV0dXJuIChwcm90b3R5cGUgPT09IG51bGwgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90b3R5cGUpID09PSBudWxsKSAmJiAhKFN5bWJvbC50b1N0cmluZ1RhZyBpbiB2YWwpICYmICEoU3ltYm9sLml0ZXJhdG9yIGluIHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0RhdGUgPSBraW5kT2ZUZXN0KCdEYXRlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGUgPSBraW5kT2ZUZXN0KCdGaWxlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jsb2IgPSBraW5kT2ZUZXN0KCdCbG9iJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlTGlzdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGaWxlTGlzdCA9IGtpbmRPZlRlc3QoJ0ZpbGVMaXN0Jyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNTdHJlYW0gPSAodmFsKSA9PiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Zvcm1EYXRhID0gKHRoaW5nKSA9PiB7XG4gIGxldCBraW5kO1xuICByZXR1cm4gdGhpbmcgJiYgKFxuICAgICh0eXBlb2YgRm9ybURhdGEgPT09ICdmdW5jdGlvbicgJiYgdGhpbmcgaW5zdGFuY2VvZiBGb3JtRGF0YSkgfHwgKFxuICAgICAgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIChcbiAgICAgICAgKGtpbmQgPSBraW5kT2YodGhpbmcpKSA9PT0gJ2Zvcm1kYXRhJyB8fFxuICAgICAgICAvLyBkZXRlY3QgZm9ybS1kYXRhIGluc3RhbmNlXG4gICAgICAgIChraW5kID09PSAnb2JqZWN0JyAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRvU3RyaW5nKSAmJiB0aGluZy50b1N0cmluZygpID09PSAnW29iamVjdCBGb3JtRGF0YV0nKVxuICAgICAgKVxuICAgIClcbiAgKVxufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNVUkxTZWFyY2hQYXJhbXMgPSBraW5kT2ZUZXN0KCdVUkxTZWFyY2hQYXJhbXMnKTtcblxuY29uc3QgW2lzUmVhZGFibGVTdHJlYW0sIGlzUmVxdWVzdCwgaXNSZXNwb25zZSwgaXNIZWFkZXJzXSA9IFsnUmVhZGFibGVTdHJlYW0nLCAnUmVxdWVzdCcsICdSZXNwb25zZScsICdIZWFkZXJzJ10ubWFwKGtpbmRPZlRlc3QpO1xuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5jb25zdCB0cmltID0gKHN0cikgPT4gc3RyLnRyaW0gP1xuICBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLCAnJyk7XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxPd25LZXlzID0gZmFsc2VdXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4sIHthbGxPd25LZXlzID0gZmFsc2V9ID0ge30pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgaTtcbiAgbGV0IGw7XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGNvbnN0IGtleXMgPSBhbGxPd25LZXlzID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKSA6IE9iamVjdC5rZXlzKG9iaik7XG4gICAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGtleTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZEtleShvYmosIGtleSkge1xuICBrZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIGxldCBfa2V5O1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIF9rZXkgPSBrZXlzW2ldO1xuICAgIGlmIChrZXkgPT09IF9rZXkudG9Mb3dlckNhc2UoKSkge1xuICAgICAgcmV0dXJuIF9rZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5jb25zdCBfZ2xvYmFsID0gKCgpID0+IHtcbiAgLyplc2xpbnQgbm8tdW5kZWY6MCovXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGdsb2JhbFRoaXM7XG4gIHJldHVybiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpXG59KSgpO1xuXG5jb25zdCBpc0NvbnRleHREZWZpbmVkID0gKGNvbnRleHQpID0+ICFpc1VuZGVmaW5lZChjb250ZXh0KSAmJiBjb250ZXh0ICE9PSBfZ2xvYmFsO1xuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIGNvbnN0IHtjYXNlbGVzc30gPSBpc0NvbnRleHREZWZpbmVkKHRoaXMpICYmIHRoaXMgfHwge307XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBjb25zdCBhc3NpZ25WYWx1ZSA9ICh2YWwsIGtleSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldEtleSA9IGNhc2VsZXNzICYmIGZpbmRLZXkocmVzdWx0LCBrZXkpIHx8IGtleTtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRbdGFyZ2V0S2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHJlc3VsdFt0YXJnZXRLZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBhcmd1bWVudHNbaV0gJiYgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbYWxsT3duS2V5c11cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuY29uc3QgZXh0ZW5kID0gKGEsIGIsIHRoaXNBcmcsIHthbGxPd25LZXlzfT0ge30pID0+IHtcbiAgZm9yRWFjaChiLCAodmFsLCBrZXkpID0+IHtcbiAgICBpZiAodGhpc0FyZyAmJiBpc0Z1bmN0aW9uKHZhbCkpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSwge2FsbE93bktleXN9KTtcbiAgcmV0dXJuIGE7XG59XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmNvbnN0IHN0cmlwQk9NID0gKGNvbnRlbnQpID0+IHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtwcm9wc11cbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVzY3JpcHRvcnNdXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGluaGVyaXRzID0gKGNvbnN0cnVjdG9yLCBzdXBlckNvbnN0cnVjdG9yLCBwcm9wcywgZGVzY3JpcHRvcnMpID0+IHtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZSwgZGVzY3JpcHRvcnMpO1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvcjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnN0cnVjdG9yLCAnc3VwZXInLCB7XG4gICAgdmFsdWU6IHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlXG4gIH0pO1xuICBwcm9wcyAmJiBPYmplY3QuYXNzaWduKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvcHMpO1xufVxuXG4vKipcbiAqIFJlc29sdmUgb2JqZWN0IHdpdGggZGVlcCBwcm90b3R5cGUgY2hhaW4gdG8gYSBmbGF0IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZU9iaiBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gW2Rlc3RPYmpdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufEJvb2xlYW59IFtmaWx0ZXJdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJvcEZpbHRlcl1cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5jb25zdCB0b0ZsYXRPYmplY3QgPSAoc291cmNlT2JqLCBkZXN0T2JqLCBmaWx0ZXIsIHByb3BGaWx0ZXIpID0+IHtcbiAgbGV0IHByb3BzO1xuICBsZXQgaTtcbiAgbGV0IHByb3A7XG4gIGNvbnN0IG1lcmdlZCA9IHt9O1xuXG4gIGRlc3RPYmogPSBkZXN0T2JqIHx8IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgaWYgKHNvdXJjZU9iaiA9PSBudWxsKSByZXR1cm4gZGVzdE9iajtcblxuICBkbyB7XG4gICAgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VPYmopO1xuICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgIGlmICgoIXByb3BGaWx0ZXIgfHwgcHJvcEZpbHRlcihwcm9wLCBzb3VyY2VPYmosIGRlc3RPYmopKSAmJiAhbWVyZ2VkW3Byb3BdKSB7XG4gICAgICAgIGRlc3RPYmpbcHJvcF0gPSBzb3VyY2VPYmpbcHJvcF07XG4gICAgICAgIG1lcmdlZFtwcm9wXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvdXJjZU9iaiA9IGZpbHRlciAhPT0gZmFsc2UgJiYgZ2V0UHJvdG90eXBlT2Yoc291cmNlT2JqKTtcbiAgfSB3aGlsZSAoc291cmNlT2JqICYmICghZmlsdGVyIHx8IGZpbHRlcihzb3VyY2VPYmosIGRlc3RPYmopKSAmJiBzb3VyY2VPYmogIT09IE9iamVjdC5wcm90b3R5cGUpO1xuXG4gIHJldHVybiBkZXN0T2JqO1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhIHN0cmluZyBlbmRzIHdpdGggdGhlIGNoYXJhY3RlcnMgb2YgYSBzcGVjaWZpZWQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IFtwb3NpdGlvbj0gMF1cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgZW5kc1dpdGggPSAoc3RyLCBzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSA9PiB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCB8fCBwb3NpdGlvbiA+IHN0ci5sZW5ndGgpIHtcbiAgICBwb3NpdGlvbiA9IHN0ci5sZW5ndGg7XG4gIH1cbiAgcG9zaXRpb24gLT0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgY29uc3QgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG59XG5cblxuLyoqXG4gKiBSZXR1cm5zIG5ldyBhcnJheSBmcm9tIGFycmF5IGxpa2Ugb2JqZWN0IG9yIG51bGwgaWYgZmFpbGVkXG4gKlxuICogQHBhcmFtIHsqfSBbdGhpbmddXG4gKlxuICogQHJldHVybnMgez9BcnJheX1cbiAqL1xuY29uc3QgdG9BcnJheSA9ICh0aGluZykgPT4ge1xuICBpZiAoIXRoaW5nKSByZXR1cm4gbnVsbDtcbiAgaWYgKGlzQXJyYXkodGhpbmcpKSByZXR1cm4gdGhpbmc7XG4gIGxldCBpID0gdGhpbmcubGVuZ3RoO1xuICBpZiAoIWlzTnVtYmVyKGkpKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgYXJyID0gbmV3IEFycmF5KGkpO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGFycltpXSA9IHRoaW5nW2ldO1xuICB9XG4gIHJldHVybiBhcnI7XG59XG5cbi8qKlxuICogQ2hlY2tpbmcgaWYgdGhlIFVpbnQ4QXJyYXkgZXhpc3RzIGFuZCBpZiBpdCBkb2VzLCBpdCByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgaWYgdGhlXG4gKiB0aGluZyBwYXNzZWQgaW4gaXMgYW4gaW5zdGFuY2Ugb2YgVWludDhBcnJheVxuICpcbiAqIEBwYXJhbSB7VHlwZWRBcnJheX1cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5jb25zdCBpc1R5cGVkQXJyYXkgPSAoVHlwZWRBcnJheSA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiB0aGluZyA9PiB7XG4gICAgcmV0dXJuIFR5cGVkQXJyYXkgJiYgdGhpbmcgaW5zdGFuY2VvZiBUeXBlZEFycmF5O1xuICB9O1xufSkodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIGdldFByb3RvdHlwZU9mKFVpbnQ4QXJyYXkpKTtcblxuLyoqXG4gKiBGb3IgZWFjaCBlbnRyeSBpbiB0aGUgb2JqZWN0LCBjYWxsIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBrZXkgYW5kIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGVudHJ5LlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5jb25zdCBmb3JFYWNoRW50cnkgPSAob2JqLCBmbikgPT4ge1xuICBjb25zdCBnZW5lcmF0b3IgPSBvYmogJiYgb2JqW1N5bWJvbC5pdGVyYXRvcl07XG5cbiAgY29uc3QgaXRlcmF0b3IgPSBnZW5lcmF0b3IuY2FsbChvYmopO1xuXG4gIGxldCByZXN1bHQ7XG5cbiAgd2hpbGUgKChyZXN1bHQgPSBpdGVyYXRvci5uZXh0KCkpICYmICFyZXN1bHQuZG9uZSkge1xuICAgIGNvbnN0IHBhaXIgPSByZXN1bHQudmFsdWU7XG4gICAgZm4uY2FsbChvYmosIHBhaXJbMF0sIHBhaXJbMV0pO1xuICB9XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSByZWd1bGFyIGV4cHJlc3Npb24gYW5kIGEgc3RyaW5nLCBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdGhlIG1hdGNoZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVnRXhwIC0gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBhZ2FpbnN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gc2VhcmNoLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheTxib29sZWFuPn1cbiAqL1xuY29uc3QgbWF0Y2hBbGwgPSAocmVnRXhwLCBzdHIpID0+IHtcbiAgbGV0IG1hdGNoZXM7XG4gIGNvbnN0IGFyciA9IFtdO1xuXG4gIHdoaWxlICgobWF0Y2hlcyA9IHJlZ0V4cC5leGVjKHN0cikpICE9PSBudWxsKSB7XG4gICAgYXJyLnB1c2gobWF0Y2hlcyk7XG4gIH1cblxuICByZXR1cm4gYXJyO1xufVxuXG4vKiBDaGVja2luZyBpZiB0aGUga2luZE9mVGVzdCBmdW5jdGlvbiByZXR1cm5zIHRydWUgd2hlbiBwYXNzZWQgYW4gSFRNTEZvcm1FbGVtZW50LiAqL1xuY29uc3QgaXNIVE1MRm9ybSA9IGtpbmRPZlRlc3QoJ0hUTUxGb3JtRWxlbWVudCcpO1xuXG5jb25zdCB0b0NhbWVsQ2FzZSA9IHN0ciA9PiB7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bLV9cXHNdKFthLXpcXGRdKShcXHcqKS9nLFxuICAgIGZ1bmN0aW9uIHJlcGxhY2VyKG0sIHAxLCBwMikge1xuICAgICAgcmV0dXJuIHAxLnRvVXBwZXJDYXNlKCkgKyBwMjtcbiAgICB9XG4gICk7XG59O1xuXG4vKiBDcmVhdGluZyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBjaGVjayBpZiBhbiBvYmplY3QgaGFzIGEgcHJvcGVydHkuICovXG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9ICgoe2hhc093blByb3BlcnR5fSkgPT4gKG9iaiwgcHJvcCkgPT4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKShPYmplY3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUmVnRXhwID0ga2luZE9mVGVzdCgnUmVnRXhwJyk7XG5cbmNvbnN0IHJlZHVjZURlc2NyaXB0b3JzID0gKG9iaiwgcmVkdWNlcikgPT4ge1xuICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaik7XG4gIGNvbnN0IHJlZHVjZWREZXNjcmlwdG9ycyA9IHt9O1xuXG4gIGZvckVhY2goZGVzY3JpcHRvcnMsIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgbGV0IHJldDtcbiAgICBpZiAoKHJldCA9IHJlZHVjZXIoZGVzY3JpcHRvciwgbmFtZSwgb2JqKSkgIT09IGZhbHNlKSB7XG4gICAgICByZWR1Y2VkRGVzY3JpcHRvcnNbbmFtZV0gPSByZXQgfHwgZGVzY3JpcHRvcjtcbiAgICB9XG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9iaiwgcmVkdWNlZERlc2NyaXB0b3JzKTtcbn1cblxuLyoqXG4gKiBNYWtlcyBhbGwgbWV0aG9kcyByZWFkLW9ubHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqL1xuXG5jb25zdCBmcmVlemVNZXRob2RzID0gKG9iaikgPT4ge1xuICByZWR1Y2VEZXNjcmlwdG9ycyhvYmosIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgLy8gc2tpcCByZXN0cmljdGVkIHByb3BzIGluIHN0cmljdCBtb2RlXG4gICAgaWYgKGlzRnVuY3Rpb24ob2JqKSAmJiBbJ2FyZ3VtZW50cycsICdjYWxsZXInLCAnY2FsbGVlJ10uaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9IG9ialtuYW1lXTtcblxuICAgIGlmICghaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybjtcblxuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGZhbHNlO1xuXG4gICAgaWYgKCd3cml0YWJsZScgaW4gZGVzY3JpcHRvcikge1xuICAgICAgZGVzY3JpcHRvci53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZGVzY3JpcHRvci5zZXQpIHtcbiAgICAgIGRlc2NyaXB0b3Iuc2V0ID0gKCkgPT4ge1xuICAgICAgICB0aHJvdyBFcnJvcignQ2FuIG5vdCByZXdyaXRlIHJlYWQtb25seSBtZXRob2QgXFwnJyArIG5hbWUgKyAnXFwnJyk7XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59XG5cbmNvbnN0IHRvT2JqZWN0U2V0ID0gKGFycmF5T3JTdHJpbmcsIGRlbGltaXRlcikgPT4ge1xuICBjb25zdCBvYmogPSB7fTtcblxuICBjb25zdCBkZWZpbmUgPSAoYXJyKSA9PiB7XG4gICAgYXJyLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgb2JqW3ZhbHVlXSA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBpc0FycmF5KGFycmF5T3JTdHJpbmcpID8gZGVmaW5lKGFycmF5T3JTdHJpbmcpIDogZGVmaW5lKFN0cmluZyhhcnJheU9yU3RyaW5nKS5zcGxpdChkZWxpbWl0ZXIpKTtcblxuICByZXR1cm4gb2JqO1xufVxuXG5jb25zdCBub29wID0gKCkgPT4ge31cblxuY29uc3QgdG9GaW5pdGVOdW1iZXIgPSAodmFsdWUsIGRlZmF1bHRWYWx1ZSkgPT4ge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUgPSArdmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG59XG5cbmNvbnN0IEFMUEhBID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6J1xuXG5jb25zdCBESUdJVCA9ICcwMTIzNDU2Nzg5JztcblxuY29uc3QgQUxQSEFCRVQgPSB7XG4gIERJR0lULFxuICBBTFBIQSxcbiAgQUxQSEFfRElHSVQ6IEFMUEhBICsgQUxQSEEudG9VcHBlckNhc2UoKSArIERJR0lUXG59XG5cbmNvbnN0IGdlbmVyYXRlU3RyaW5nID0gKHNpemUgPSAxNiwgYWxwaGFiZXQgPSBBTFBIQUJFVC5BTFBIQV9ESUdJVCkgPT4ge1xuICBsZXQgc3RyID0gJyc7XG4gIGNvbnN0IHtsZW5ndGh9ID0gYWxwaGFiZXQ7XG4gIHdoaWxlIChzaXplLS0pIHtcbiAgICBzdHIgKz0gYWxwaGFiZXRbTWF0aC5yYW5kb20oKSAqIGxlbmd0aHwwXVxuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBJZiB0aGUgdGhpbmcgaXMgYSBGb3JtRGF0YSBvYmplY3QsIHJldHVybiB0cnVlLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gdGhpbmcgLSBUaGUgdGhpbmcgdG8gY2hlY2suXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzU3BlY0NvbXBsaWFudEZvcm0odGhpbmcpIHtcbiAgcmV0dXJuICEhKHRoaW5nICYmIGlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSAmJiB0aGluZ1tTeW1ib2wudG9TdHJpbmdUYWddID09PSAnRm9ybURhdGEnICYmIHRoaW5nW1N5bWJvbC5pdGVyYXRvcl0pO1xufVxuXG5jb25zdCB0b0pTT05PYmplY3QgPSAob2JqKSA9PiB7XG4gIGNvbnN0IHN0YWNrID0gbmV3IEFycmF5KDEwKTtcblxuICBjb25zdCB2aXNpdCA9IChzb3VyY2UsIGkpID0+IHtcblxuICAgIGlmIChpc09iamVjdChzb3VyY2UpKSB7XG4gICAgICBpZiAoc3RhY2suaW5kZXhPZihzb3VyY2UpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZighKCd0b0pTT04nIGluIHNvdXJjZSkpIHtcbiAgICAgICAgc3RhY2tbaV0gPSBzb3VyY2U7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGlzQXJyYXkoc291cmNlKSA/IFtdIDoge307XG5cbiAgICAgICAgZm9yRWFjaChzb3VyY2UsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVkdWNlZFZhbHVlID0gdmlzaXQodmFsdWUsIGkgKyAxKTtcbiAgICAgICAgICAhaXNVbmRlZmluZWQocmVkdWNlZFZhbHVlKSAmJiAodGFyZ2V0W2tleV0gPSByZWR1Y2VkVmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdGFja1tpXSA9IHVuZGVmaW5lZDtcblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICByZXR1cm4gdmlzaXQob2JqLCAwKTtcbn1cblxuY29uc3QgaXNBc3luY0ZuID0ga2luZE9mVGVzdCgnQXN5bmNGdW5jdGlvbicpO1xuXG5jb25zdCBpc1RoZW5hYmxlID0gKHRoaW5nKSA9PlxuICB0aGluZyAmJiAoaXNPYmplY3QodGhpbmcpIHx8IGlzRnVuY3Rpb24odGhpbmcpKSAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRoZW4pICYmIGlzRnVuY3Rpb24odGhpbmcuY2F0Y2gpO1xuXG4vLyBvcmlnaW5hbCBjb2RlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vRGlnaXRhbEJyYWluSlMvQXhpb3NQcm9taXNlL2Jsb2IvMTZkZWFiMTM3MTBlYzA5Nzc5OTIyMTMxZjNmYTU5NTQzMjBmODNhYi9saWIvdXRpbHMuanMjTDExLUwzNFxuXG5jb25zdCBfc2V0SW1tZWRpYXRlID0gKChzZXRJbW1lZGlhdGVTdXBwb3J0ZWQsIHBvc3RNZXNzYWdlU3VwcG9ydGVkKSA9PiB7XG4gIGlmIChzZXRJbW1lZGlhdGVTdXBwb3J0ZWQpIHtcbiAgICByZXR1cm4gc2V0SW1tZWRpYXRlO1xuICB9XG5cbiAgcmV0dXJuIHBvc3RNZXNzYWdlU3VwcG9ydGVkID8gKCh0b2tlbiwgY2FsbGJhY2tzKSA9PiB7XG4gICAgX2dsb2JhbC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoe3NvdXJjZSwgZGF0YX0pID0+IHtcbiAgICAgIGlmIChzb3VyY2UgPT09IF9nbG9iYWwgJiYgZGF0YSA9PT0gdG9rZW4pIHtcbiAgICAgICAgY2FsbGJhY2tzLmxlbmd0aCAmJiBjYWxsYmFja3Muc2hpZnQoKSgpO1xuICAgICAgfVxuICAgIH0sIGZhbHNlKTtcblxuICAgIHJldHVybiAoY2IpID0+IHtcbiAgICAgIGNhbGxiYWNrcy5wdXNoKGNiKTtcbiAgICAgIF9nbG9iYWwucG9zdE1lc3NhZ2UodG9rZW4sIFwiKlwiKTtcbiAgICB9XG4gIH0pKGBheGlvc0Ake01hdGgucmFuZG9tKCl9YCwgW10pIDogKGNiKSA9PiBzZXRUaW1lb3V0KGNiKTtcbn0pKFxuICB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nLFxuICBpc0Z1bmN0aW9uKF9nbG9iYWwucG9zdE1lc3NhZ2UpXG4pO1xuXG5jb25zdCBhc2FwID0gdHlwZW9mIHF1ZXVlTWljcm90YXNrICE9PSAndW5kZWZpbmVkJyA/XG4gIHF1ZXVlTWljcm90YXNrLmJpbmQoX2dsb2JhbCkgOiAoIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLm5leHRUaWNrIHx8IF9zZXRJbW1lZGlhdGUpO1xuXG4vLyAqKioqKioqKioqKioqKioqKioqKipcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nLFxuICBpc051bWJlcixcbiAgaXNCb29sZWFuLFxuICBpc09iamVjdCxcbiAgaXNQbGFpbk9iamVjdCxcbiAgaXNSZWFkYWJsZVN0cmVhbSxcbiAgaXNSZXF1ZXN0LFxuICBpc1Jlc3BvbnNlLFxuICBpc0hlYWRlcnMsXG4gIGlzVW5kZWZpbmVkLFxuICBpc0RhdGUsXG4gIGlzRmlsZSxcbiAgaXNCbG9iLFxuICBpc1JlZ0V4cCxcbiAgaXNGdW5jdGlvbixcbiAgaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1R5cGVkQXJyYXksXG4gIGlzRmlsZUxpc3QsXG4gIGZvckVhY2gsXG4gIG1lcmdlLFxuICBleHRlbmQsXG4gIHRyaW0sXG4gIHN0cmlwQk9NLFxuICBpbmhlcml0cyxcbiAgdG9GbGF0T2JqZWN0LFxuICBraW5kT2YsXG4gIGtpbmRPZlRlc3QsXG4gIGVuZHNXaXRoLFxuICB0b0FycmF5LFxuICBmb3JFYWNoRW50cnksXG4gIG1hdGNoQWxsLFxuICBpc0hUTUxGb3JtLFxuICBoYXNPd25Qcm9wZXJ0eSxcbiAgaGFzT3duUHJvcDogaGFzT3duUHJvcGVydHksIC8vIGFuIGFsaWFzIHRvIGF2b2lkIEVTTGludCBuby1wcm90b3R5cGUtYnVpbHRpbnMgZGV0ZWN0aW9uXG4gIHJlZHVjZURlc2NyaXB0b3JzLFxuICBmcmVlemVNZXRob2RzLFxuICB0b09iamVjdFNldCxcbiAgdG9DYW1lbENhc2UsXG4gIG5vb3AsXG4gIHRvRmluaXRlTnVtYmVyLFxuICBmaW5kS2V5LFxuICBnbG9iYWw6IF9nbG9iYWwsXG4gIGlzQ29udGV4dERlZmluZWQsXG4gIEFMUEhBQkVULFxuICBnZW5lcmF0ZVN0cmluZyxcbiAgaXNTcGVjQ29tcGxpYW50Rm9ybSxcbiAgdG9KU09OT2JqZWN0LFxuICBpc0FzeW5jRm4sXG4gIGlzVGhlbmFibGUsXG4gIHNldEltbWVkaWF0ZTogX3NldEltbWVkaWF0ZSxcbiAgYXNhcFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtjb25maWddIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIEF4aW9zRXJyb3IobWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBFcnJvci5jYWxsKHRoaXMpO1xuXG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc3RhY2sgPSAobmV3IEVycm9yKCkpLnN0YWNrO1xuICB9XG5cbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgdGhpcy5uYW1lID0gJ0F4aW9zRXJyb3InO1xuICBjb2RlICYmICh0aGlzLmNvZGUgPSBjb2RlKTtcbiAgY29uZmlnICYmICh0aGlzLmNvbmZpZyA9IGNvbmZpZyk7XG4gIHJlcXVlc3QgJiYgKHRoaXMucmVxdWVzdCA9IHJlcXVlc3QpO1xuICByZXNwb25zZSAmJiAodGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlKTtcbn1cblxudXRpbHMuaW5oZXJpdHMoQXhpb3NFcnJvciwgRXJyb3IsIHtcbiAgdG9KU09OOiBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdXRpbHMudG9KU09OT2JqZWN0KHRoaXMuY29uZmlnKSxcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIHN0YXR1czogdGhpcy5yZXNwb25zZSAmJiB0aGlzLnJlc3BvbnNlLnN0YXR1cyA/IHRoaXMucmVzcG9uc2Uuc3RhdHVzIDogbnVsbFxuICAgIH07XG4gIH1cbn0pO1xuXG5jb25zdCBwcm90b3R5cGUgPSBBeGlvc0Vycm9yLnByb3RvdHlwZTtcbmNvbnN0IGRlc2NyaXB0b3JzID0ge307XG5cbltcbiAgJ0VSUl9CQURfT1BUSU9OX1ZBTFVFJyxcbiAgJ0VSUl9CQURfT1BUSU9OJyxcbiAgJ0VDT05OQUJPUlRFRCcsXG4gICdFVElNRURPVVQnLFxuICAnRVJSX05FVFdPUksnLFxuICAnRVJSX0ZSX1RPT19NQU5ZX1JFRElSRUNUUycsXG4gICdFUlJfREVQUkVDQVRFRCcsXG4gICdFUlJfQkFEX1JFU1BPTlNFJyxcbiAgJ0VSUl9CQURfUkVRVUVTVCcsXG4gICdFUlJfQ0FOQ0VMRUQnLFxuICAnRVJSX05PVF9TVVBQT1JUJyxcbiAgJ0VSUl9JTlZBTElEX1VSTCdcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5dLmZvckVhY2goY29kZSA9PiB7XG4gIGRlc2NyaXB0b3JzW2NvZGVdID0ge3ZhbHVlOiBjb2RlfTtcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhBeGlvc0Vycm9yLCBkZXNjcmlwdG9ycyk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG90eXBlLCAnaXNBeGlvc0Vycm9yJywge3ZhbHVlOiB0cnVlfSk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5BeGlvc0Vycm9yLmZyb20gPSAoZXJyb3IsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UsIGN1c3RvbVByb3BzKSA9PiB7XG4gIGNvbnN0IGF4aW9zRXJyb3IgPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XG5cbiAgdXRpbHMudG9GbGF0T2JqZWN0KGVycm9yLCBheGlvc0Vycm9yLCBmdW5jdGlvbiBmaWx0ZXIob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAhPT0gRXJyb3IucHJvdG90eXBlO1xuICB9LCBwcm9wID0+IHtcbiAgICByZXR1cm4gcHJvcCAhPT0gJ2lzQXhpb3NFcnJvcic7XG4gIH0pO1xuXG4gIEF4aW9zRXJyb3IuY2FsbChheGlvc0Vycm9yLCBlcnJvci5tZXNzYWdlLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKTtcblxuICBheGlvc0Vycm9yLmNhdXNlID0gZXJyb3I7XG5cbiAgYXhpb3NFcnJvci5uYW1lID0gZXJyb3IubmFtZTtcblxuICBjdXN0b21Qcm9wcyAmJiBPYmplY3QuYXNzaWduKGF4aW9zRXJyb3IsIGN1c3RvbVByb3BzKTtcblxuICByZXR1cm4gYXhpb3NFcnJvcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zRXJyb3I7XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgc3RyaWN0XG5leHBvcnQgZGVmYXVsdCBudWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbi8vIHRlbXBvcmFyeSBob3RmaXggdG8gYXZvaWQgY2lyY3VsYXIgcmVmZXJlbmNlcyB1bnRpbCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBpcyByZWZhY3RvcmVkXG5pbXBvcnQgUGxhdGZvcm1Gb3JtRGF0YSBmcm9tICcuLi9wbGF0Zm9ybS9ub2RlL2NsYXNzZXMvRm9ybURhdGEuanMnO1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgdGhlIGdpdmVuIHRoaW5nIGlzIGEgYXJyYXkgb3IganMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGluZyAtIFRoZSBvYmplY3Qgb3IgYXJyYXkgdG8gYmUgdmlzaXRlZC5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNWaXNpdGFibGUodGhpbmcpIHtcbiAgcmV0dXJuIHV0aWxzLmlzUGxhaW5PYmplY3QodGhpbmcpIHx8IHV0aWxzLmlzQXJyYXkodGhpbmcpO1xufVxuXG4vKipcbiAqIEl0IHJlbW92ZXMgdGhlIGJyYWNrZXRzIGZyb20gdGhlIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBwYXJhbWV0ZXIuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gdGhlIGtleSB3aXRob3V0IHRoZSBicmFja2V0cy5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQnJhY2tldHMoa2V5KSB7XG4gIHJldHVybiB1dGlscy5lbmRzV2l0aChrZXksICdbXScpID8ga2V5LnNsaWNlKDAsIC0yKSA6IGtleTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhdGgsIGEga2V5LCBhbmQgYSBib29sZWFuLCBhbmQgcmV0dXJucyBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgb2YgdGhlIGN1cnJlbnQgb2JqZWN0IGJlaW5nIGl0ZXJhdGVkIG92ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gZG90cyAtIElmIHRydWUsIHRoZSBrZXkgd2lsbCBiZSByZW5kZXJlZCB3aXRoIGRvdHMgaW5zdGVhZCBvZiBicmFja2V0cy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgY3VycmVudCBrZXkuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpIHtcbiAgaWYgKCFwYXRoKSByZXR1cm4ga2V5O1xuICByZXR1cm4gcGF0aC5jb25jYXQoa2V5KS5tYXAoZnVuY3Rpb24gZWFjaCh0b2tlbiwgaSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHRva2VuID0gcmVtb3ZlQnJhY2tldHModG9rZW4pO1xuICAgIHJldHVybiAhZG90cyAmJiBpID8gJ1snICsgdG9rZW4gKyAnXScgOiB0b2tlbjtcbiAgfSkuam9pbihkb3RzID8gJy4nIDogJycpO1xufVxuXG4vKipcbiAqIElmIHRoZSBhcnJheSBpcyBhbiBhcnJheSBhbmQgbm9uZSBvZiBpdHMgZWxlbWVudHMgYXJlIHZpc2l0YWJsZSwgdGhlbiBpdCdzIGEgZmxhdCBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFyciAtIFRoZSBhcnJheSB0byBjaGVja1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0ZsYXRBcnJheShhcnIpIHtcbiAgcmV0dXJuIHV0aWxzLmlzQXJyYXkoYXJyKSAmJiAhYXJyLnNvbWUoaXNWaXNpdGFibGUpO1xufVxuXG5jb25zdCBwcmVkaWNhdGVzID0gdXRpbHMudG9GbGF0T2JqZWN0KHV0aWxzLCB7fSwgbnVsbCwgZnVuY3Rpb24gZmlsdGVyKHByb3ApIHtcbiAgcmV0dXJuIC9eaXNbQS1aXS8udGVzdChwcm9wKTtcbn0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSBkYXRhIG9iamVjdCB0byBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7P09iamVjdH0gW2Zvcm1EYXRhXVxuICogQHBhcmFtIHs/T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnZpc2l0b3JdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1ldGFUb2tlbnMgPSB0cnVlXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kb3RzID0gZmFsc2VdXG4gKiBAcGFyYW0gez9Cb29sZWFufSBbb3B0aW9ucy5pbmRleGVzID0gZmFsc2VdXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqKi9cblxuLyoqXG4gKiBJdCBjb252ZXJ0cyBhbiBvYmplY3QgaW50byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBjb252ZXJ0IHRvIGZvcm0gZGF0YS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRGF0YSAtIFRoZSBGb3JtRGF0YSBvYmplY3QgdG8gYXBwZW5kIHRvLlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zXG4gKlxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gdG9Gb3JtRGF0YShvYmosIGZvcm1EYXRhLCBvcHRpb25zKSB7XG4gIGlmICghdXRpbHMuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RhcmdldCBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGZvcm1EYXRhID0gZm9ybURhdGEgfHwgbmV3IChQbGF0Zm9ybUZvcm1EYXRhIHx8IEZvcm1EYXRhKSgpO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBvcHRpb25zID0gdXRpbHMudG9GbGF0T2JqZWN0KG9wdGlvbnMsIHtcbiAgICBtZXRhVG9rZW5zOiB0cnVlLFxuICAgIGRvdHM6IGZhbHNlLFxuICAgIGluZGV4ZXM6IGZhbHNlXG4gIH0sIGZhbHNlLCBmdW5jdGlvbiBkZWZpbmVkKG9wdGlvbiwgc291cmNlKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gICAgcmV0dXJuICF1dGlscy5pc1VuZGVmaW5lZChzb3VyY2Vbb3B0aW9uXSk7XG4gIH0pO1xuXG4gIGNvbnN0IG1ldGFUb2tlbnMgPSBvcHRpb25zLm1ldGFUb2tlbnM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICBjb25zdCB2aXNpdG9yID0gb3B0aW9ucy52aXNpdG9yIHx8IGRlZmF1bHRWaXNpdG9yO1xuICBjb25zdCBkb3RzID0gb3B0aW9ucy5kb3RzO1xuICBjb25zdCBpbmRleGVzID0gb3B0aW9ucy5pbmRleGVzO1xuICBjb25zdCBfQmxvYiA9IG9wdGlvbnMuQmxvYiB8fCB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgQmxvYjtcbiAgY29uc3QgdXNlQmxvYiA9IF9CbG9iICYmIHV0aWxzLmlzU3BlY0NvbXBsaWFudEZvcm0oZm9ybURhdGEpO1xuXG4gIGlmICghdXRpbHMuaXNGdW5jdGlvbih2aXNpdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3Zpc2l0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBmdW5jdGlvbiBjb252ZXJ0VmFsdWUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHJldHVybiAnJztcblxuICAgIGlmICh1dGlscy5pc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAoIXVzZUJsb2IgJiYgdXRpbHMuaXNCbG9iKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ0Jsb2IgaXMgbm90IHN1cHBvcnRlZC4gVXNlIGEgQnVmZmVyIGluc3RlYWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIodmFsdWUpIHx8IHV0aWxzLmlzVHlwZWRBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB1c2VCbG9iICYmIHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nID8gbmV3IEJsb2IoW3ZhbHVlXSkgOiBCdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmlzaXRvci5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGtleVxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZ3xOdW1iZXI+fSBwYXRoXG4gICAqIEB0aGlzIHtGb3JtRGF0YX1cbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHJldHVybiB0cnVlIHRvIHZpc2l0IHRoZSBlYWNoIHByb3Agb2YgdGhlIHZhbHVlIHJlY3Vyc2l2ZWx5XG4gICAqL1xuICBmdW5jdGlvbiBkZWZhdWx0VmlzaXRvcih2YWx1ZSwga2V5LCBwYXRoKSB7XG4gICAgbGV0IGFyciA9IHZhbHVlO1xuXG4gICAgaWYgKHZhbHVlICYmICFwYXRoICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh1dGlscy5lbmRzV2l0aChrZXksICd7fScpKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSBtZXRhVG9rZW5zID8ga2V5IDoga2V5LnNsaWNlKDAsIC0yKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgKHV0aWxzLmlzQXJyYXkodmFsdWUpICYmIGlzRmxhdEFycmF5KHZhbHVlKSkgfHxcbiAgICAgICAgKCh1dGlscy5pc0ZpbGVMaXN0KHZhbHVlKSB8fCB1dGlscy5lbmRzV2l0aChrZXksICdbXScpKSAmJiAoYXJyID0gdXRpbHMudG9BcnJheSh2YWx1ZSkpXG4gICAgICAgICkpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IHJlbW92ZUJyYWNrZXRzKGtleSk7XG5cbiAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24gZWFjaChlbCwgaW5kZXgpIHtcbiAgICAgICAgICAhKHV0aWxzLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiYgZm9ybURhdGEuYXBwZW5kKFxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG4gICAgICAgICAgICBpbmRleGVzID09PSB0cnVlID8gcmVuZGVyS2V5KFtrZXldLCBpbmRleCwgZG90cykgOiAoaW5kZXhlcyA9PT0gbnVsbCA/IGtleSA6IGtleSArICdbXScpLFxuICAgICAgICAgICAgY29udmVydFZhbHVlKGVsKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzVmlzaXRhYmxlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZm9ybURhdGEuYXBwZW5kKHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpLCBjb252ZXJ0VmFsdWUodmFsdWUpKTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHN0YWNrID0gW107XG5cbiAgY29uc3QgZXhwb3NlZEhlbHBlcnMgPSBPYmplY3QuYXNzaWduKHByZWRpY2F0ZXMsIHtcbiAgICBkZWZhdWx0VmlzaXRvcixcbiAgICBjb252ZXJ0VmFsdWUsXG4gICAgaXNWaXNpdGFibGVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gYnVpbGQodmFsdWUsIHBhdGgpIHtcbiAgICBpZiAodXRpbHMuaXNVbmRlZmluZWQodmFsdWUpKSByZXR1cm47XG5cbiAgICBpZiAoc3RhY2suaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4gICAgICB0aHJvdyBFcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGRldGVjdGVkIGluICcgKyBwYXRoLmpvaW4oJy4nKSk7XG4gICAgfVxuXG4gICAgc3RhY2sucHVzaCh2YWx1ZSk7XG5cbiAgICB1dGlscy5mb3JFYWNoKHZhbHVlLCBmdW5jdGlvbiBlYWNoKGVsLCBrZXkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9ICEodXRpbHMuaXNVbmRlZmluZWQoZWwpIHx8IGVsID09PSBudWxsKSAmJiB2aXNpdG9yLmNhbGwoXG4gICAgICAgIGZvcm1EYXRhLCBlbCwgdXRpbHMuaXNTdHJpbmcoa2V5KSA/IGtleS50cmltKCkgOiBrZXksIHBhdGgsIGV4cG9zZWRIZWxwZXJzXG4gICAgICApO1xuXG4gICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgIGJ1aWxkKGVsLCBwYXRoID8gcGF0aC5jb25jYXQoa2V5KSA6IFtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHN0YWNrLnBvcCgpO1xuICB9XG5cbiAgaWYgKCF1dGlscy5pc09iamVjdChvYmopKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZGF0YSBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgYnVpbGQob2JqKTtcblxuICByZXR1cm4gZm9ybURhdGE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvRm9ybURhdGE7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vdG9Gb3JtRGF0YS5qcyc7XG5cbi8qKlxuICogSXQgZW5jb2RlcyBhIHN0cmluZyBieSByZXBsYWNpbmcgYWxsIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IGluIHRoZSB1bnJlc2VydmVkIHNldCB3aXRoXG4gKiB0aGVpciBwZXJjZW50LWVuY29kZWQgZXF1aXZhbGVudHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBlbmNvZGUuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGVuY29kZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBlbmNvZGUoc3RyKSB7XG4gIGNvbnN0IGNoYXJNYXAgPSB7XG4gICAgJyEnOiAnJTIxJyxcbiAgICBcIidcIjogJyUyNycsXG4gICAgJygnOiAnJTI4JyxcbiAgICAnKSc6ICclMjknLFxuICAgICd+JzogJyU3RScsXG4gICAgJyUyMCc6ICcrJyxcbiAgICAnJTAwJzogJ1xceDAwJ1xuICB9O1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnKCl+XXwlMjB8JTAwL2csIGZ1bmN0aW9uIHJlcGxhY2VyKG1hdGNoKSB7XG4gICAgcmV0dXJuIGNoYXJNYXBbbWF0Y2hdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhcmFtcyBvYmplY3QgYW5kIGNvbnZlcnRzIGl0IHRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBwYXJhbXMgLSBUaGUgcGFyYW1ldGVycyB0byBiZSBjb252ZXJ0ZWQgdG8gYSBGb3JtRGF0YSBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgcGFzc2VkIHRvIHRoZSBBeGlvcyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKSB7XG4gIHRoaXMuX3BhaXJzID0gW107XG5cbiAgcGFyYW1zICYmIHRvRm9ybURhdGEocGFyYW1zLCB0aGlzLCBvcHRpb25zKTtcbn1cblxuY29uc3QgcHJvdG90eXBlID0gQXhpb3NVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlO1xuXG5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gYXBwZW5kKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMuX3BhaXJzLnB1c2goW25hbWUsIHZhbHVlXSk7XG59O1xuXG5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhlbmNvZGVyKSB7XG4gIGNvbnN0IF9lbmNvZGUgPSBlbmNvZGVyID8gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZW5jb2Rlci5jYWxsKHRoaXMsIHZhbHVlLCBlbmNvZGUpO1xuICB9IDogZW5jb2RlO1xuXG4gIHJldHVybiB0aGlzLl9wYWlycy5tYXAoZnVuY3Rpb24gZWFjaChwYWlyKSB7XG4gICAgcmV0dXJuIF9lbmNvZGUocGFpclswXSkgKyAnPScgKyBfZW5jb2RlKHBhaXJbMV0pO1xuICB9LCAnJykuam9pbignJicpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3NVUkxTZWFyY2hQYXJhbXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NVUkxTZWFyY2hQYXJhbXMgZnJvbSAnLi4vaGVscGVycy9BeGlvc1VSTFNlYXJjaFBhcmFtcy5qcyc7XG5cbi8qKlxuICogSXQgcmVwbGFjZXMgYWxsIGluc3RhbmNlcyBvZiB0aGUgY2hhcmFjdGVycyBgOmAsIGAkYCwgYCxgLCBgK2AsIGBbYCwgYW5kIGBdYCB3aXRoIHRoZWlyXG4gKiBVUkkgZW5jb2RlZCBjb3VudGVycGFydHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsIFRoZSB2YWx1ZSB0byBiZSBlbmNvZGVkLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHBhcmFtIHs/b2JqZWN0fSBvcHRpb25zXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIG9wdGlvbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICBcbiAgY29uc3QgX2VuY29kZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmNvZGUgfHwgZW5jb2RlO1xuXG4gIGNvbnN0IHNlcmlhbGl6ZUZuID0gb3B0aW9ucyAmJiBvcHRpb25zLnNlcmlhbGl6ZTtcblxuICBsZXQgc2VyaWFsaXplZFBhcmFtcztcblxuICBpZiAoc2VyaWFsaXplRm4pIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gc2VyaWFsaXplRm4ocGFyYW1zLCBvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gdXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSA/XG4gICAgICBwYXJhbXMudG9TdHJpbmcoKSA6XG4gICAgICBuZXcgQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKS50b1N0cmluZyhfZW5jb2RlKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgY29uc3QgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKFwiI1wiKTtcblxuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5cbmNsYXNzIEludGVyY2VwdG9yTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICAgKi9cbiAgdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgICAgZnVsZmlsbGVkLFxuICAgICAgcmVqZWN0ZWQsXG4gICAgICBzeW5jaHJvbm91czogb3B0aW9ucyA/IG9wdGlvbnMuc3luY2hyb25vdXMgOiBmYWxzZSxcbiAgICAgIHJ1bldoZW46IG9wdGlvbnMgPyBvcHRpb25zLnJ1bldoZW4gOiBudWxsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBpbnRlcmNlcHRvciB3YXMgcmVtb3ZlZCwgYGZhbHNlYCBvdGhlcndpc2VcbiAgICovXG4gIGVqZWN0KGlkKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFsbCBpbnRlcmNlcHRvcnMgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBjbGVhcigpIHtcbiAgICBpZiAodGhpcy5oYW5kbGVycykge1xuICAgICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICAgKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmb3JFYWNoKGZuKSB7XG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgICBmbihoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2lsZW50SlNPTlBhcnNpbmc6IHRydWUsXG4gIGZvcmNlZEpTT05QYXJzaW5nOiB0cnVlLFxuICBjbGFyaWZ5VGltZW91dEVycm9yOiBmYWxzZVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMnO1xuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgPyBVUkxTZWFyY2hQYXJhbXMgOiBBeGlvc1VSTFNlYXJjaFBhcmFtcztcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyA/IEZvcm1EYXRhIDogbnVsbDtcbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgPyBCbG9iIDogbnVsbFxuIiwiaW1wb3J0IFVSTFNlYXJjaFBhcmFtcyBmcm9tICcuL2NsYXNzZXMvVVJMU2VhcmNoUGFyYW1zLmpzJ1xuaW1wb3J0IEZvcm1EYXRhIGZyb20gJy4vY2xhc3Nlcy9Gb3JtRGF0YS5qcydcbmltcG9ydCBCbG9iIGZyb20gJy4vY2xhc3Nlcy9CbG9iLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQnJvd3NlcjogdHJ1ZSxcbiAgY2xhc3Nlczoge1xuICAgIFVSTFNlYXJjaFBhcmFtcyxcbiAgICBGb3JtRGF0YSxcbiAgICBCbG9iXG4gIH0sXG4gIHByb3RvY29sczogWydodHRwJywgJ2h0dHBzJywgJ2ZpbGUnLCAnYmxvYicsICd1cmwnLCAnZGF0YSddXG59O1xuIiwiY29uc3QgaGFzQnJvd3NlckVudiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJFbnYgPSAoXG4gIChwcm9kdWN0KSA9PiB7XG4gICAgcmV0dXJuIGhhc0Jyb3dzZXJFbnYgJiYgWydSZWFjdE5hdGl2ZScsICdOYXRpdmVTY3JpcHQnLCAnTlMnXS5pbmRleE9mKHByb2R1Y3QpIDwgMFxuICB9KSh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIHdlYldvcmtlciBlbnZpcm9ubWVudFxuICpcbiAqIEFsdGhvdWdoIHRoZSBgaXNTdGFuZGFyZEJyb3dzZXJFbnZgIG1ldGhvZCBpbmRpY2F0ZXMgdGhhdFxuICogYGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyYCwgdGhlIFdlYldvcmtlciB3aWxsIHN0aWxsIGJlXG4gKiBmaWx0ZXJlZCBvdXQgZHVlIHRvIGl0cyBqdWRnbWVudCBzdGFuZGFyZFxuICogYHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdgLlxuICogVGhpcyBsZWFkcyB0byBhIHByb2JsZW0gd2hlbiBheGlvcyBwb3N0IGBGb3JtRGF0YWAgaW4gd2ViV29ya2VyXG4gKi9cbmNvbnN0IGhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudiA9ICgoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSAmJlxuICAgIHR5cGVvZiBzZWxmLmltcG9ydFNjcmlwdHMgPT09ICdmdW5jdGlvbidcbiAgKTtcbn0pKCk7XG5cbmNvbnN0IG9yaWdpbiA9IGhhc0Jyb3dzZXJFbnYgJiYgd2luZG93LmxvY2F0aW9uLmhyZWYgfHwgJ2h0dHA6Ly9sb2NhbGhvc3QnO1xuXG5leHBvcnQge1xuICBoYXNCcm93c2VyRW52LFxuICBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYsXG4gIGhhc1N0YW5kYXJkQnJvd3NlckVudixcbiAgb3JpZ2luXG59XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi9ub2RlL2luZGV4LmpzJztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vY29tbW9uL3V0aWxzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAuLi51dGlscyxcbiAgLi4ucGxhdGZvcm1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vdG9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHRvRm9ybURhdGEoZGF0YSwgbmV3IHBsYXRmb3JtLmNsYXNzZXMuVVJMU2VhcmNoUGFyYW1zKCksIE9iamVjdC5hc3NpZ24oe1xuICAgIHZpc2l0b3I6IGZ1bmN0aW9uKHZhbHVlLCBrZXksIHBhdGgsIGhlbHBlcnMpIHtcbiAgICAgIGlmIChwbGF0Zm9ybS5pc05vZGUgJiYgdXRpbHMuaXNCdWZmZXIodmFsdWUpKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKGtleSwgdmFsdWUudG9TdHJpbmcoJ2Jhc2U2NCcpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGVscGVycy5kZWZhdWx0VmlzaXRvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfSwgb3B0aW9ucykpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIEl0IHRha2VzIGEgc3RyaW5nIGxpa2UgYGZvb1t4XVt5XVt6XWAgYW5kIHJldHVybnMgYW4gYXJyYXkgbGlrZSBgWydmb28nLCAneCcsICd5JywgJ3onXVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqXG4gKiBAcmV0dXJucyBBbiBhcnJheSBvZiBzdHJpbmdzLlxuICovXG5mdW5jdGlvbiBwYXJzZVByb3BQYXRoKG5hbWUpIHtcbiAgLy8gZm9vW3hdW3ldW3pdXG4gIC8vIGZvby54LnkuelxuICAvLyBmb28teC15LXpcbiAgLy8gZm9vIHggeSB6XG4gIHJldHVybiB1dGlscy5tYXRjaEFsbCgvXFx3K3xcXFsoXFx3KildL2csIG5hbWUpLm1hcChtYXRjaCA9PiB7XG4gICAgcmV0dXJuIG1hdGNoWzBdID09PSAnW10nID8gJycgOiBtYXRjaFsxXSB8fCBtYXRjaFswXTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBhcnJheSB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY29udmVydCB0byBhbiBvYmplY3QuXG4gKlxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggdGhlIHNhbWUga2V5cyBhbmQgdmFsdWVzIGFzIHRoZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb09iamVjdChhcnIpIHtcbiAgY29uc3Qgb2JqID0ge307XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuICBsZXQgaTtcbiAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gIGxldCBrZXk7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGtleSA9IGtleXNbaV07XG4gICAgb2JqW2tleV0gPSBhcnJba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgRm9ybURhdGEgb2JqZWN0IGFuZCByZXR1cm5zIGEgSmF2YVNjcmlwdCBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgVGhlIEZvcm1EYXRhIG9iamVjdCB0byBjb252ZXJ0IHRvIEpTT04uXG4gKlxuICogQHJldHVybnMge09iamVjdDxzdHJpbmcsIGFueT4gfCBudWxsfSBUaGUgY29udmVydGVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZm9ybURhdGFUb0pTT04oZm9ybURhdGEpIHtcbiAgZnVuY3Rpb24gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXQsIGluZGV4KSB7XG4gICAgbGV0IG5hbWUgPSBwYXRoW2luZGV4KytdO1xuXG4gICAgaWYgKG5hbWUgPT09ICdfX3Byb3RvX18nKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IGlzTnVtZXJpY0tleSA9IE51bWJlci5pc0Zpbml0ZSgrbmFtZSk7XG4gICAgY29uc3QgaXNMYXN0ID0gaW5kZXggPj0gcGF0aC5sZW5ndGg7XG4gICAgbmFtZSA9ICFuYW1lICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0KSA/IHRhcmdldC5sZW5ndGggOiBuYW1lO1xuXG4gICAgaWYgKGlzTGFzdCkge1xuICAgICAgaWYgKHV0aWxzLmhhc093blByb3AodGFyZ2V0LCBuYW1lKSkge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSBbdGFyZ2V0W25hbWVdLCB2YWx1ZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXRbbmFtZV0gfHwgIXV0aWxzLmlzT2JqZWN0KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0W25hbWVdLCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0ICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gYXJyYXlUb09iamVjdCh0YXJnZXRbbmFtZV0pO1xuICAgIH1cblxuICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZm9ybURhdGEpICYmIHV0aWxzLmlzRnVuY3Rpb24oZm9ybURhdGEuZW50cmllcykpIHtcbiAgICBjb25zdCBvYmogPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2hFbnRyeShmb3JtRGF0YSwgKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBidWlsZFBhdGgocGFyc2VQcm9wUGF0aChuYW1lKSwgdmFsdWUsIG9iaiwgMCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1EYXRhVG9KU09OO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCB0cmFuc2l0aW9uYWxEZWZhdWx0cyBmcm9tICcuL3RyYW5zaXRpb25hbC5qcyc7XG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuLi9oZWxwZXJzL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IHRvVVJMRW5jb2RlZEZvcm0gZnJvbSAnLi4vaGVscGVycy90b1VSTEVuY29kZWRGb3JtLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5pbXBvcnQgZm9ybURhdGFUb0pTT04gZnJvbSAnLi4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5cbi8qKlxuICogSXQgdGFrZXMgYSBzdHJpbmcsIHRyaWVzIHRvIHBhcnNlIGl0LCBhbmQgaWYgaXQgZmFpbHMsIGl0IHJldHVybnMgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb25cbiAqIG9mIHRoZSBpbnB1dFxuICpcbiAqIEBwYXJhbSB7YW55fSByYXdWYWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzdHJpbmdpZmllZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcnNlciAtIEEgZnVuY3Rpb24gdGhhdCBwYXJzZXMgYSBzdHJpbmcgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZW5jb2RlciAtIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHZhbHVlIGFuZCByZXR1cm5zIGEgc3RyaW5nLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiB0aGUgcmF3VmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ2lmeVNhZmVseShyYXdWYWx1ZSwgcGFyc2VyLCBlbmNvZGVyKSB7XG4gIGlmICh1dGlscy5pc1N0cmluZyhyYXdWYWx1ZSkpIHtcbiAgICB0cnkge1xuICAgICAgKHBhcnNlciB8fCBKU09OLnBhcnNlKShyYXdWYWx1ZSk7XG4gICAgICByZXR1cm4gdXRpbHMudHJpbShyYXdWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubmFtZSAhPT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZW5jb2RlciB8fCBKU09OLnN0cmluZ2lmeSkocmF3VmFsdWUpO1xufVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcblxuICB0cmFuc2l0aW9uYWw6IHRyYW5zaXRpb25hbERlZmF1bHRzLFxuXG4gIGFkYXB0ZXI6IFsneGhyJywgJ2h0dHAnLCAnZmV0Y2gnXSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgY29uc3QgY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkgfHwgJyc7XG4gICAgY29uc3QgaGFzSlNPTkNvbnRlbnRUeXBlID0gY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpID4gLTE7XG4gICAgY29uc3QgaXNPYmplY3RQYXlsb2FkID0gdXRpbHMuaXNPYmplY3QoZGF0YSk7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkICYmIHV0aWxzLmlzSFRNTEZvcm0oZGF0YSkpIHtcbiAgICAgIGRhdGEgPSBuZXcgRm9ybURhdGEoZGF0YSk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNGb3JtRGF0YSA9IHV0aWxzLmlzRm9ybURhdGEoZGF0YSk7XG5cbiAgICBpZiAoaXNGb3JtRGF0YSkge1xuICAgICAgcmV0dXJuIGhhc0pTT05Db250ZW50VHlwZSA/IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhVG9KU09OKGRhdGEpKSA6IGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzUmVhZGFibGVTdHJlYW0oZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsIGZhbHNlKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgbGV0IGlzRmlsZUxpc3Q7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkKSB7XG4gICAgICBpZiAoY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCB0aGlzLmZvcm1TZXJpYWxpemVyKS50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoKGlzRmlsZUxpc3QgPSB1dGlscy5pc0ZpbGVMaXN0KGRhdGEpKSB8fCBjb250ZW50VHlwZS5pbmRleE9mKCdtdWx0aXBhcnQvZm9ybS1kYXRhJykgPiAtMSkge1xuICAgICAgICBjb25zdCBfRm9ybURhdGEgPSB0aGlzLmVudiAmJiB0aGlzLmVudi5Gb3JtRGF0YTtcblxuICAgICAgICByZXR1cm4gdG9Gb3JtRGF0YShcbiAgICAgICAgICBpc0ZpbGVMaXN0ID8geydmaWxlc1tdJzogZGF0YX0gOiBkYXRhLFxuICAgICAgICAgIF9Gb3JtRGF0YSAmJiBuZXcgX0Zvcm1EYXRhKCksXG4gICAgICAgICAgdGhpcy5mb3JtU2VyaWFsaXplclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgfHwgaGFzSlNPTkNvbnRlbnRUeXBlICkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicsIGZhbHNlKTtcbiAgICAgIHJldHVybiBzdHJpbmdpZnlTYWZlbHkoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICBjb25zdCBmb3JjZWRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuZm9yY2VkSlNPTlBhcnNpbmc7XG4gICAgY29uc3QgSlNPTlJlcXVlc3RlZCA9IHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICBpZiAodXRpbHMuaXNSZXNwb25zZShkYXRhKSB8fCB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSAmJiB1dGlscy5pc1N0cmluZyhkYXRhKSAmJiAoKGZvcmNlZEpTT05QYXJzaW5nICYmICF0aGlzLnJlc3BvbnNlVHlwZSkgfHwgSlNPTlJlcXVlc3RlZCkpIHtcbiAgICAgIGNvbnN0IHNpbGVudEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5zaWxlbnRKU09OUGFyc2luZztcbiAgICAgIGNvbnN0IHN0cmljdEpTT05QYXJzaW5nID0gIXNpbGVudEpTT05QYXJzaW5nICYmIEpTT05SZXF1ZXN0ZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcpIHtcbiAgICAgICAgICBpZiAoZS5uYW1lID09PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgICAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZSwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLCB0aGlzLCBudWxsLCB0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgZW52OiB7XG4gICAgRm9ybURhdGE6IHBsYXRmb3JtLmNsYXNzZXMuRm9ybURhdGEsXG4gICAgQmxvYjogcGxhdGZvcm0uY2xhc3Nlcy5CbG9iXG4gIH0sXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfSxcblxuICBoZWFkZXJzOiB7XG4gICAgY29tbW9uOiB7XG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC1UeXBlJzogdW5kZWZpbmVkXG4gICAgfVxuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIChtZXRob2QpID0+IHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcblxuLy8gUmF3QXhpb3NIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xuY29uc3QgaWdub3JlRHVwbGljYXRlT2YgPSB1dGlscy50b09iamVjdFNldChbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXSk7XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByYXdIZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5leHBvcnQgZGVmYXVsdCByYXdIZWFkZXJzID0+IHtcbiAgY29uc3QgcGFyc2VkID0ge307XG4gIGxldCBrZXk7XG4gIGxldCB2YWw7XG4gIGxldCBpO1xuXG4gIHJhd0hlYWRlcnMgJiYgcmF3SGVhZGVycy5zcGxpdCgnXFxuJykuZm9yRWFjaChmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSBsaW5lLnN1YnN0cmluZygwLCBpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSBsaW5lLnN1YnN0cmluZyhpICsgMSkudHJpbSgpO1xuXG4gICAgaWYgKCFrZXkgfHwgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mW2tleV0pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0pIHtcbiAgICAgICAgcGFyc2VkW2tleV0ucHVzaCh2YWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBbdmFsXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IHBhcnNlSGVhZGVycyBmcm9tICcuLi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyc7XG5cbmNvbnN0ICRpbnRlcm5hbHMgPSBTeW1ib2woJ2ludGVybmFscycpO1xuXG5mdW5jdGlvbiBub3JtYWxpemVIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIgJiYgU3RyaW5nKGhlYWRlcikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB1dGlscy5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLm1hcChub3JtYWxpemVWYWx1ZSkgOiBTdHJpbmcodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVRva2VucyhzdHIpIHtcbiAgY29uc3QgdG9rZW5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgY29uc3QgdG9rZW5zUkUgPSAvKFteXFxzLDs9XSspXFxzKig/Oj1cXHMqKFteLDtdKykpPy9nO1xuICBsZXQgbWF0Y2g7XG5cbiAgd2hpbGUgKChtYXRjaCA9IHRva2Vuc1JFLmV4ZWMoc3RyKSkpIHtcbiAgICB0b2tlbnNbbWF0Y2hbMV1dID0gbWF0Y2hbMl07XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuXG5jb25zdCBpc1ZhbGlkSGVhZGVyTmFtZSA9IChzdHIpID0+IC9eWy1fYS16QS1aMC05XmB8fiwhIyQlJicqKy5dKyQvLnRlc3Qoc3RyLnRyaW0oKSk7XG5cbmZ1bmN0aW9uIG1hdGNoSGVhZGVyVmFsdWUoY29udGV4dCwgdmFsdWUsIGhlYWRlciwgZmlsdGVyLCBpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgaWYgKHV0aWxzLmlzRnVuY3Rpb24oZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIuY2FsbCh0aGlzLCB2YWx1ZSwgaGVhZGVyKTtcbiAgfVxuXG4gIGlmIChpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgICB2YWx1ZSA9IGhlYWRlcjtcbiAgfVxuXG4gIGlmICghdXRpbHMuaXNTdHJpbmcodmFsdWUpKSByZXR1cm47XG5cbiAgaWYgKHV0aWxzLmlzU3RyaW5nKGZpbHRlcikpIHtcbiAgICByZXR1cm4gdmFsdWUuaW5kZXhPZihmaWx0ZXIpICE9PSAtMTtcbiAgfVxuXG4gIGlmICh1dGlscy5pc1JlZ0V4cChmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIGZpbHRlci50ZXN0KHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JtYXRIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIudHJpbSgpXG4gICAgLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvKFthLXpcXGRdKShcXHcqKS9nLCAodywgY2hhciwgc3RyKSA9PiB7XG4gICAgICByZXR1cm4gY2hhci50b1VwcGVyQ2FzZSgpICsgc3RyO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBidWlsZEFjY2Vzc29ycyhvYmosIGhlYWRlcikge1xuICBjb25zdCBhY2Nlc3Nvck5hbWUgPSB1dGlscy50b0NhbWVsQ2FzZSgnICcgKyBoZWFkZXIpO1xuXG4gIFsnZ2V0JywgJ3NldCcsICdoYXMnXS5mb3JFYWNoKG1ldGhvZE5hbWUgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG1ldGhvZE5hbWUgKyBhY2Nlc3Nvck5hbWUsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICAgIHJldHVybiB0aGlzW21ldGhvZE5hbWVdLmNhbGwodGhpcywgaGVhZGVyLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNsYXNzIEF4aW9zSGVhZGVycyB7XG4gIGNvbnN0cnVjdG9yKGhlYWRlcnMpIHtcbiAgICBoZWFkZXJzICYmIHRoaXMuc2V0KGhlYWRlcnMpO1xuICB9XG5cbiAgc2V0KGhlYWRlciwgdmFsdWVPclJld3JpdGUsIHJld3JpdGUpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWxIZWFkZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoZWFkZXIgbmFtZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHNlbGYsIGxIZWFkZXIpO1xuXG4gICAgICBpZigha2V5IHx8IHNlbGZba2V5XSA9PT0gdW5kZWZpbmVkIHx8IF9yZXdyaXRlID09PSB0cnVlIHx8IChfcmV3cml0ZSA9PT0gdW5kZWZpbmVkICYmIHNlbGZba2V5XSAhPT0gZmFsc2UpKSB7XG4gICAgICAgIHNlbGZba2V5IHx8IF9oZWFkZXJdID0gbm9ybWFsaXplVmFsdWUoX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRIZWFkZXJzID0gKGhlYWRlcnMsIF9yZXdyaXRlKSA9PlxuICAgICAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCAoX3ZhbHVlLCBfaGVhZGVyKSA9PiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkpO1xuXG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QoaGVhZGVyKSB8fCBoZWFkZXIgaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yKSB7XG4gICAgICBzZXRIZWFkZXJzKGhlYWRlciwgdmFsdWVPclJld3JpdGUpXG4gICAgfSBlbHNlIGlmKHV0aWxzLmlzU3RyaW5nKGhlYWRlcikgJiYgKGhlYWRlciA9IGhlYWRlci50cmltKCkpICYmICFpc1ZhbGlkSGVhZGVyTmFtZShoZWFkZXIpKSB7XG4gICAgICBzZXRIZWFkZXJzKHBhcnNlSGVhZGVycyhoZWFkZXIpLCB2YWx1ZU9yUmV3cml0ZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0hlYWRlcnMoaGVhZGVyKSkge1xuICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgaGVhZGVyLmVudHJpZXMoKSkge1xuICAgICAgICBzZXRIZWFkZXIodmFsdWUsIGtleSwgcmV3cml0ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRlciAhPSBudWxsICYmIHNldEhlYWRlcih2YWx1ZU9yUmV3cml0ZSwgaGVhZGVyLCByZXdyaXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChoZWFkZXIsIHBhcnNlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpc1trZXldO1xuXG4gICAgICAgIGlmICghcGFyc2VyKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnNlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZVRva2Vucyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5jYWxsKHRoaXMsIHZhbHVlLCBrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzUmVnRXhwKHBhcnNlcikpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VyLmV4ZWModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyc2VyIG11c3QgYmUgYm9vbGVhbnxyZWdleHB8ZnVuY3Rpb24nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXMoaGVhZGVyLCBtYXRjaGVyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHRoaXMsIGhlYWRlcik7XG5cbiAgICAgIHJldHVybiAhIShrZXkgJiYgdGhpc1trZXldICE9PSB1bmRlZmluZWQgJiYgKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZGVsZXRlKGhlYWRlciwgbWF0Y2hlcikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGxldCBkZWxldGVkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBkZWxldGVIZWFkZXIoX2hlYWRlcikge1xuICAgICAgX2hlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKF9oZWFkZXIpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShzZWxmLCBfaGVhZGVyKTtcblxuICAgICAgICBpZiAoa2V5ICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHNlbGYsIHNlbGZba2V5XSwga2V5LCBtYXRjaGVyKSkpIHtcbiAgICAgICAgICBkZWxldGUgc2VsZltrZXldO1xuXG4gICAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheShoZWFkZXIpKSB7XG4gICAgICBoZWFkZXIuZm9yRWFjaChkZWxldGVIZWFkZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGVIZWFkZXIoaGVhZGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVsZXRlZDtcbiAgfVxuXG4gIGNsZWFyKG1hdGNoZXIpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XG4gICAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIsIHRydWUpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzW2tleV07XG4gICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgbm9ybWFsaXplKGZvcm1hdCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2godGhpcywgKHZhbHVlLCBoZWFkZXIpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoaGVhZGVycywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBzZWxmW2tleV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IGZvcm1hdCA/IGZvcm1hdEhlYWRlcihoZWFkZXIpIDogU3RyaW5nKGhlYWRlcikudHJpbSgpO1xuXG4gICAgICBpZiAobm9ybWFsaXplZCAhPT0gaGVhZGVyKSB7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICB9XG5cbiAgICAgIHNlbGZbbm9ybWFsaXplZF0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZF0gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb25jYXQoLi4udGFyZ2V0cykge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmNvbmNhdCh0aGlzLCAuLi50YXJnZXRzKTtcbiAgfVxuXG4gIHRvSlNPTihhc1N0cmluZ3MpIHtcbiAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgdmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gZmFsc2UgJiYgKG9ialtoZWFkZXJdID0gYXNTdHJpbmdzICYmIHV0aWxzLmlzQXJyYXkodmFsdWUpID8gdmFsdWUuam9pbignLCAnKSA6IHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSlbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMudG9KU09OKCkpLm1hcCgoW2hlYWRlciwgdmFsdWVdKSA9PiBoZWFkZXIgKyAnOiAnICsgdmFsdWUpLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiAnQXhpb3NIZWFkZXJzJztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tKHRoaW5nKSB7XG4gICAgcmV0dXJuIHRoaW5nIGluc3RhbmNlb2YgdGhpcyA/IHRoaW5nIDogbmV3IHRoaXModGhpbmcpO1xuICB9XG5cbiAgc3RhdGljIGNvbmNhdChmaXJzdCwgLi4udGFyZ2V0cykge1xuICAgIGNvbnN0IGNvbXB1dGVkID0gbmV3IHRoaXMoZmlyc3QpO1xuXG4gICAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IGNvbXB1dGVkLnNldCh0YXJnZXQpKTtcblxuICAgIHJldHVybiBjb21wdXRlZDtcbiAgfVxuXG4gIHN0YXRpYyBhY2Nlc3NvcihoZWFkZXIpIHtcbiAgICBjb25zdCBpbnRlcm5hbHMgPSB0aGlzWyRpbnRlcm5hbHNdID0gKHRoaXNbJGludGVybmFsc10gPSB7XG4gICAgICBhY2Nlc3NvcnM6IHt9XG4gICAgfSk7XG5cbiAgICBjb25zdCBhY2Nlc3NvcnMgPSBpbnRlcm5hbHMuYWNjZXNzb3JzO1xuICAgIGNvbnN0IHByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuXG4gICAgZnVuY3Rpb24gZGVmaW5lQWNjZXNzb3IoX2hlYWRlcikge1xuICAgICAgY29uc3QgbEhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKCFhY2Nlc3NvcnNbbEhlYWRlcl0pIHtcbiAgICAgICAgYnVpbGRBY2Nlc3NvcnMocHJvdG90eXBlLCBfaGVhZGVyKTtcbiAgICAgICAgYWNjZXNzb3JzW2xIZWFkZXJdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1dGlscy5pc0FycmF5KGhlYWRlcikgPyBoZWFkZXIuZm9yRWFjaChkZWZpbmVBY2Nlc3NvcikgOiBkZWZpbmVBY2Nlc3NvcihoZWFkZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQXhpb3NIZWFkZXJzLmFjY2Vzc29yKFsnQ29udGVudC1UeXBlJywgJ0NvbnRlbnQtTGVuZ3RoJywgJ0FjY2VwdCcsICdBY2NlcHQtRW5jb2RpbmcnLCAnVXNlci1BZ2VudCcsICdBdXRob3JpemF0aW9uJ10pO1xuXG4vLyByZXNlcnZlZCBuYW1lcyBob3RmaXhcbnV0aWxzLnJlZHVjZURlc2NyaXB0b3JzKEF4aW9zSGVhZGVycy5wcm90b3R5cGUsICh7dmFsdWV9LCBrZXkpID0+IHtcbiAgbGV0IG1hcHBlZCA9IGtleVswXS50b1VwcGVyQ2FzZSgpICsga2V5LnNsaWNlKDEpOyAvLyBtYXAgYHNldGAgPT4gYFNldGBcbiAgcmV0dXJuIHtcbiAgICBnZXQ6ICgpID0+IHZhbHVlLFxuICAgIHNldChoZWFkZXJWYWx1ZSkge1xuICAgICAgdGhpc1ttYXBwZWRdID0gaGVhZGVyVmFsdWU7XG4gICAgfVxuICB9XG59KTtcblxudXRpbHMuZnJlZXplTWV0aG9kcyhBeGlvc0hlYWRlcnMpO1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc0hlYWRlcnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuLi9kZWZhdWx0cy9pbmRleC5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHBhcmFtIHs/T2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2Ugb2JqZWN0XG4gKlxuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGZucywgcmVzcG9uc2UpIHtcbiAgY29uc3QgY29uZmlnID0gdGhpcyB8fCBkZWZhdWx0cztcbiAgY29uc3QgY29udGV4dCA9IHJlc3BvbnNlIHx8IGNvbmZpZztcbiAgY29uc3QgaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKGNvbnRleHQuaGVhZGVycyk7XG4gIGxldCBkYXRhID0gY29udGV4dC5kYXRhO1xuXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4uY2FsbChjb25maWcsIGRhdGEsIGhlYWRlcnMubm9ybWFsaXplKCksIHJlc3BvbnNlID8gcmVzcG9uc2Uuc3RhdHVzIDogdW5kZWZpbmVkKTtcbiAgfSk7XG5cbiAgaGVhZGVycy5ub3JtYWxpemUoKTtcblxuICByZXR1cm4gZGF0YTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBBIGBDYW5jZWxlZEVycm9yYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3Q9fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gcmVxdWVzdCBUaGUgcmVxdWVzdC5cbiAqXG4gKiBAcmV0dXJucyB7Q2FuY2VsZWRFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbGVkRXJyb3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBBeGlvc0Vycm9yLmNhbGwodGhpcywgbWVzc2FnZSA9PSBudWxsID8gJ2NhbmNlbGVkJyA6IG1lc3NhZ2UsIEF4aW9zRXJyb3IuRVJSX0NBTkNFTEVELCBjb25maWcsIHJlcXVlc3QpO1xuICB0aGlzLm5hbWUgPSAnQ2FuY2VsZWRFcnJvcic7XG59XG5cbnV0aWxzLmluaGVyaXRzKENhbmNlbGVkRXJyb3IsIEF4aW9zRXJyb3IsIHtcbiAgX19DQU5DRUxfXzogdHJ1ZVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENhbmNlbGVkRXJyb3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vQXhpb3NFcnJvci5qcyc7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybnMge29iamVjdH0gVGhlIHJlc3BvbnNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICBjb25zdCB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgW0F4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0VdW01hdGguZmxvb3IocmVzcG9uc2Uuc3RhdHVzIC8gMTAwKSAtIDRdLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VQcm90b2NvbCh1cmwpIHtcbiAgY29uc3QgbWF0Y2ggPSAvXihbLStcXHddezEsMjV9KSg6P1xcL1xcL3w6KS8uZXhlYyh1cmwpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2hbMV0gfHwgJyc7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ2FsY3VsYXRlIGRhdGEgbWF4UmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFtzYW1wbGVzQ291bnQ9IDEwXVxuICogQHBhcmFtIHtOdW1iZXJ9IFttaW49IDEwMDBdXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHNwZWVkb21ldGVyKHNhbXBsZXNDb3VudCwgbWluKSB7XG4gIHNhbXBsZXNDb3VudCA9IHNhbXBsZXNDb3VudCB8fCAxMDtcbiAgY29uc3QgYnl0ZXMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgY29uc3QgdGltZXN0YW1wcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBsZXQgaGVhZCA9IDA7XG4gIGxldCB0YWlsID0gMDtcbiAgbGV0IGZpcnN0U2FtcGxlVFM7XG5cbiAgbWluID0gbWluICE9PSB1bmRlZmluZWQgPyBtaW4gOiAxMDAwO1xuXG4gIHJldHVybiBmdW5jdGlvbiBwdXNoKGNodW5rTGVuZ3RoKSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IHRpbWVzdGFtcHNbdGFpbF07XG5cbiAgICBpZiAoIWZpcnN0U2FtcGxlVFMpIHtcbiAgICAgIGZpcnN0U2FtcGxlVFMgPSBub3c7XG4gICAgfVxuXG4gICAgYnl0ZXNbaGVhZF0gPSBjaHVua0xlbmd0aDtcbiAgICB0aW1lc3RhbXBzW2hlYWRdID0gbm93O1xuXG4gICAgbGV0IGkgPSB0YWlsO1xuICAgIGxldCBieXRlc0NvdW50ID0gMDtcblxuICAgIHdoaWxlIChpICE9PSBoZWFkKSB7XG4gICAgICBieXRlc0NvdW50ICs9IGJ5dGVzW2krK107XG4gICAgICBpID0gaSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBoZWFkID0gKGhlYWQgKyAxKSAlIHNhbXBsZXNDb3VudDtcblxuICAgIGlmIChoZWFkID09PSB0YWlsKSB7XG4gICAgICB0YWlsID0gKHRhaWwgKyAxKSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBpZiAobm93IC0gZmlyc3RTYW1wbGVUUyA8IG1pbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhc3NlZCA9IHN0YXJ0ZWRBdCAmJiBub3cgLSBzdGFydGVkQXQ7XG5cbiAgICByZXR1cm4gcGFzc2VkID8gTWF0aC5yb3VuZChieXRlc0NvdW50ICogMTAwMCAvIHBhc3NlZCkgOiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNwZWVkb21ldGVyO1xuIiwiLyoqXG4gKiBUaHJvdHRsZSBkZWNvcmF0b3JcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge051bWJlcn0gZnJlcVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZuLCBmcmVxKSB7XG4gIGxldCB0aW1lc3RhbXAgPSAwO1xuICBsZXQgdGhyZXNob2xkID0gMTAwMCAvIGZyZXE7XG4gIGxldCBsYXN0QXJncztcbiAgbGV0IHRpbWVyO1xuXG4gIGNvbnN0IGludm9rZSA9IChhcmdzLCBub3cgPSBEYXRlLm5vdygpKSA9PiB7XG4gICAgdGltZXN0YW1wID0gbm93O1xuICAgIGxhc3RBcmdzID0gbnVsbDtcbiAgICBpZiAodGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgfVxuICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICB9XG5cbiAgY29uc3QgdGhyb3R0bGVkID0gKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHBhc3NlZCA9IG5vdyAtIHRpbWVzdGFtcDtcbiAgICBpZiAoIHBhc3NlZCA+PSB0aHJlc2hvbGQpIHtcbiAgICAgIGludm9rZShhcmdzLCBub3cpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0QXJncyA9IGFyZ3M7XG4gICAgICBpZiAoIXRpbWVyKSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICAgIGludm9rZShsYXN0QXJncylcbiAgICAgICAgfSwgdGhyZXNob2xkIC0gcGFzc2VkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBmbHVzaCA9ICgpID0+IGxhc3RBcmdzICYmIGludm9rZShsYXN0QXJncyk7XG5cbiAgcmV0dXJuIFt0aHJvdHRsZWQsIGZsdXNoXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGhyb3R0bGU7XG4iLCJpbXBvcnQgc3BlZWRvbWV0ZXIgZnJvbSBcIi4vc3BlZWRvbWV0ZXIuanNcIjtcbmltcG9ydCB0aHJvdHRsZSBmcm9tIFwiLi90aHJvdHRsZS5qc1wiO1xuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy5qc1wiO1xuXG5leHBvcnQgY29uc3QgcHJvZ3Jlc3NFdmVudFJlZHVjZXIgPSAobGlzdGVuZXIsIGlzRG93bmxvYWRTdHJlYW0sIGZyZXEgPSAzKSA9PiB7XG4gIGxldCBieXRlc05vdGlmaWVkID0gMDtcbiAgY29uc3QgX3NwZWVkb21ldGVyID0gc3BlZWRvbWV0ZXIoNTAsIDI1MCk7XG5cbiAgcmV0dXJuIHRocm90dGxlKGUgPT4ge1xuICAgIGNvbnN0IGxvYWRlZCA9IGUubG9hZGVkO1xuICAgIGNvbnN0IHRvdGFsID0gZS5sZW5ndGhDb21wdXRhYmxlID8gZS50b3RhbCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwcm9ncmVzc0J5dGVzID0gbG9hZGVkIC0gYnl0ZXNOb3RpZmllZDtcbiAgICBjb25zdCByYXRlID0gX3NwZWVkb21ldGVyKHByb2dyZXNzQnl0ZXMpO1xuICAgIGNvbnN0IGluUmFuZ2UgPSBsb2FkZWQgPD0gdG90YWw7XG5cbiAgICBieXRlc05vdGlmaWVkID0gbG9hZGVkO1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGxvYWRlZCxcbiAgICAgIHRvdGFsLFxuICAgICAgcHJvZ3Jlc3M6IHRvdGFsID8gKGxvYWRlZCAvIHRvdGFsKSA6IHVuZGVmaW5lZCxcbiAgICAgIGJ5dGVzOiBwcm9ncmVzc0J5dGVzLFxuICAgICAgcmF0ZTogcmF0ZSA/IHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBlc3RpbWF0ZWQ6IHJhdGUgJiYgdG90YWwgJiYgaW5SYW5nZSA/ICh0b3RhbCAtIGxvYWRlZCkgLyByYXRlIDogdW5kZWZpbmVkLFxuICAgICAgZXZlbnQ6IGUsXG4gICAgICBsZW5ndGhDb21wdXRhYmxlOiB0b3RhbCAhPSBudWxsLFxuICAgICAgW2lzRG93bmxvYWRTdHJlYW0gPyAnZG93bmxvYWQnIDogJ3VwbG9hZCddOiB0cnVlXG4gICAgfTtcblxuICAgIGxpc3RlbmVyKGRhdGEpO1xuICB9LCBmcmVxKTtcbn1cblxuZXhwb3J0IGNvbnN0IHByb2dyZXNzRXZlbnREZWNvcmF0b3IgPSAodG90YWwsIHRocm90dGxlZCkgPT4ge1xuICBjb25zdCBsZW5ndGhDb21wdXRhYmxlID0gdG90YWwgIT0gbnVsbDtcblxuICByZXR1cm4gWyhsb2FkZWQpID0+IHRocm90dGxlZFswXSh7XG4gICAgbGVuZ3RoQ29tcHV0YWJsZSxcbiAgICB0b3RhbCxcbiAgICBsb2FkZWRcbiAgfSksIHRocm90dGxlZFsxXV07XG59XG5cbmV4cG9ydCBjb25zdCBhc3luY0RlY29yYXRvciA9IChmbikgPT4gKC4uLmFyZ3MpID0+IHV0aWxzLmFzYXAoKCkgPT4gZm4oLi4uYXJncykpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgP1xuXG4vLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3Rcbi8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIGNvbnN0IG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIGNvbnN0IHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGxldCBvcmlnaW5VUkw7XG5cbiAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0cyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICBsZXQgaHJlZiA9IHVybDtcblxuICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICB9XG5cbiAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICByZXR1cm4ge1xuICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgY29uc3QgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKTtcbiIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudiA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIHtcbiAgICB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgIGNvbnN0IGNvb2tpZSA9IFtuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKV07XG5cbiAgICAgIHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpICYmIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcblxuICAgICAgdXRpbHMuaXNTdHJpbmcocGF0aCkgJiYgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuXG4gICAgICB1dGlscy5pc1N0cmluZyhkb21haW4pICYmIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG5cbiAgICAgIHNlY3VyZSA9PT0gdHJ1ZSAmJiBjb29raWUucHVzaCgnc2VjdXJlJyk7XG5cbiAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgIH0sXG5cbiAgICByZWFkKG5hbWUpIHtcbiAgICAgIGNvbnN0IG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgfSxcblxuICAgIHJlbW92ZShuYW1lKSB7XG4gICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgIH1cbiAgfVxuXG4gIDpcblxuICAvLyBOb24tc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIHtcbiAgICB3cml0ZSgpIHt9LFxuICAgIHJlYWQoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIHJlbW92ZSgpIHt9XG4gIH07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGQrXFwtLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvP1xcLyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGlzQWJzb2x1dGVVUkwgZnJvbSAnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMLmpzJztcbmltcG9ydCBjb21iaW5lVVJMcyBmcm9tICcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKSB7XG4gIGlmIChiYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi9BeGlvc0hlYWRlcnMuanNcIjtcblxuY29uc3QgaGVhZGVyc1RvT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyBpbnN0YW5jZW9mIEF4aW9zSGVhZGVycyA/IHsgLi4udGhpbmcgfSA6IHRoaW5nO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICBjb25zdCBjb25maWcgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSwgY2FzZWxlc3MpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlLmNhbGwoe2Nhc2VsZXNzfSwgdGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKGEsIGIsIGNhc2VsZXNzKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIsIGNhc2VsZXNzKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChhKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSwgY2FzZWxlc3MpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKGEsIGIpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURpcmVjdEtleXMoYSwgYiwgcHJvcCkge1xuICAgIGlmIChwcm9wIGluIGNvbmZpZzIpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWVyZ2VNYXAgPSB7XG4gICAgdXJsOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIG1ldGhvZDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBkYXRhOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGJhc2VVUkw6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVxdWVzdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXNwb25zZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBwYXJhbXNTZXJpYWxpemVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dE1lc3NhZ2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aENyZWRlbnRpYWxzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHdpdGhYU1JGVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYWRhcHRlcjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICByZXNwb25zZVR5cGU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkNvb2tpZU5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkhlYWRlck5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgb25VcGxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvbkRvd25sb2FkUHJvZ3Jlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgZGVjb21wcmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBtYXhDb250ZW50TGVuZ3RoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heEJvZHlMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYmVmb3JlUmVkaXJlY3Q6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNwb3J0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBBZ2VudDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBodHRwc0FnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGNhbmNlbFRva2VuOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHNvY2tldFBhdGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VFbmNvZGluZzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB2YWxpZGF0ZVN0YXR1czogbWVyZ2VEaXJlY3RLZXlzLFxuICAgIGhlYWRlcnM6IChhLCBiKSA9PiBtZXJnZURlZXBQcm9wZXJ0aWVzKGhlYWRlcnNUb09iamVjdChhKSwgaGVhZGVyc1RvT2JqZWN0KGIpLCB0cnVlKVxuICB9O1xuXG4gIHV0aWxzLmZvckVhY2goT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnMSwgY29uZmlnMikpLCBmdW5jdGlvbiBjb21wdXRlQ29uZmlnVmFsdWUocHJvcCkge1xuICAgIGNvbnN0IG1lcmdlID0gbWVyZ2VNYXBbcHJvcF0gfHwgbWVyZ2VEZWVwUHJvcGVydGllcztcbiAgICBjb25zdCBjb25maWdWYWx1ZSA9IG1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0sIHByb3ApO1xuICAgICh1dGlscy5pc1VuZGVmaW5lZChjb25maWdWYWx1ZSkgJiYgbWVyZ2UgIT09IG1lcmdlRGlyZWN0S2V5cykgfHwgKGNvbmZpZ1twcm9wXSA9IGNvbmZpZ1ZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cbiIsImltcG9ydCBwbGF0Zm9ybSBmcm9tIFwiLi4vcGxhdGZvcm0vaW5kZXguanNcIjtcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMuanNcIjtcbmltcG9ydCBpc1VSTFNhbWVPcmlnaW4gZnJvbSBcIi4vaXNVUkxTYW1lT3JpZ2luLmpzXCI7XG5pbXBvcnQgY29va2llcyBmcm9tIFwiLi9jb29raWVzLmpzXCI7XG5pbXBvcnQgYnVpbGRGdWxsUGF0aCBmcm9tIFwiLi4vY29yZS9idWlsZEZ1bGxQYXRoLmpzXCI7XG5pbXBvcnQgbWVyZ2VDb25maWcgZnJvbSBcIi4uL2NvcmUvbWVyZ2VDb25maWcuanNcIjtcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSBcIi4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzXCI7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSBcIi4vYnVpbGRVUkwuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgKGNvbmZpZykgPT4ge1xuICBjb25zdCBuZXdDb25maWcgPSBtZXJnZUNvbmZpZyh7fSwgY29uZmlnKTtcblxuICBsZXQge2RhdGEsIHdpdGhYU1JGVG9rZW4sIHhzcmZIZWFkZXJOYW1lLCB4c3JmQ29va2llTmFtZSwgaGVhZGVycywgYXV0aH0gPSBuZXdDb25maWc7XG5cbiAgbmV3Q29uZmlnLmhlYWRlcnMgPSBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oaGVhZGVycyk7XG5cbiAgbmV3Q29uZmlnLnVybCA9IGJ1aWxkVVJMKGJ1aWxkRnVsbFBhdGgobmV3Q29uZmlnLmJhc2VVUkwsIG5ld0NvbmZpZy51cmwpLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG5cbiAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICBpZiAoYXV0aCkge1xuICAgIGhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0Jhc2ljICcgK1xuICAgICAgYnRvYSgoYXV0aC51c2VybmFtZSB8fCAnJykgKyAnOicgKyAoYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChhdXRoLnBhc3N3b3JkKSkgOiAnJykpXG4gICAgKTtcbiAgfVxuXG4gIGxldCBjb250ZW50VHlwZTtcblxuICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSkge1xuICAgIGlmIChwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgfHwgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52KSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKHVuZGVmaW5lZCk7IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9IGVsc2UgaWYgKChjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKSkgIT09IGZhbHNlKSB7XG4gICAgICAvLyBmaXggc2VtaWNvbG9uIGR1cGxpY2F0aW9uIGlzc3VlIGZvciBSZWFjdE5hdGl2ZSBGb3JtRGF0YSBpbXBsZW1lbnRhdGlvblxuICAgICAgY29uc3QgW3R5cGUsIC4uLnRva2Vuc10gPSBjb250ZW50VHlwZSA/IGNvbnRlbnRUeXBlLnNwbGl0KCc7JykubWFwKHRva2VuID0+IHRva2VuLnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pIDogW107XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKFt0eXBlIHx8ICdtdWx0aXBhcnQvZm9ybS1kYXRhJywgLi4udG9rZW5zXS5qb2luKCc7ICcpKTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG5cbiAgaWYgKHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudikge1xuICAgIHdpdGhYU1JGVG9rZW4gJiYgdXRpbHMuaXNGdW5jdGlvbih3aXRoWFNSRlRva2VuKSAmJiAod2l0aFhTUkZUb2tlbiA9IHdpdGhYU1JGVG9rZW4obmV3Q29uZmlnKSk7XG5cbiAgICBpZiAod2l0aFhTUkZUb2tlbiB8fCAod2l0aFhTUkZUb2tlbiAhPT0gZmFsc2UgJiYgaXNVUkxTYW1lT3JpZ2luKG5ld0NvbmZpZy51cmwpKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICBjb25zdCB4c3JmVmFsdWUgPSB4c3JmSGVhZGVyTmFtZSAmJiB4c3JmQ29va2llTmFtZSAmJiBjb29raWVzLnJlYWQoeHNyZkNvb2tpZU5hbWUpO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0KHhzcmZIZWFkZXJOYW1lLCB4c3JmVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdDb25maWc7XG59XG5cbiIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBzZXR0bGUgZnJvbSAnLi8uLi9jb3JlL3NldHRsZS5qcyc7XG5pbXBvcnQgdHJhbnNpdGlvbmFsRGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyc7XG5pbXBvcnQgcGFyc2VQcm90b2NvbCBmcm9tICcuLi9oZWxwZXJzL3BhcnNlUHJvdG9jb2wuanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IHtwcm9ncmVzc0V2ZW50UmVkdWNlcn0gZnJvbSAnLi4vaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyc7XG5pbXBvcnQgcmVzb2x2ZUNvbmZpZyBmcm9tIFwiLi4vaGVscGVycy9yZXNvbHZlQ29uZmlnLmpzXCI7XG5cbmNvbnN0IGlzWEhSQWRhcHRlclN1cHBvcnRlZCA9IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGlzWEhSQWRhcHRlclN1cHBvcnRlZCAmJiBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgY29uc3QgX2NvbmZpZyA9IHJlc29sdmVDb25maWcoY29uZmlnKTtcbiAgICBsZXQgcmVxdWVzdERhdGEgPSBfY29uZmlnLmRhdGE7XG4gICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShfY29uZmlnLmhlYWRlcnMpLm5vcm1hbGl6ZSgpO1xuICAgIGxldCB7cmVzcG9uc2VUeXBlLCBvblVwbG9hZFByb2dyZXNzLCBvbkRvd25sb2FkUHJvZ3Jlc3N9ID0gX2NvbmZpZztcbiAgICBsZXQgb25DYW5jZWxlZDtcbiAgICBsZXQgdXBsb2FkVGhyb3R0bGVkLCBkb3dubG9hZFRocm90dGxlZDtcbiAgICBsZXQgZmx1c2hVcGxvYWQsIGZsdXNoRG93bmxvYWQ7XG5cbiAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgZmx1c2hVcGxvYWQgJiYgZmx1c2hVcGxvYWQoKTsgLy8gZmx1c2ggZXZlbnRzXG4gICAgICBmbHVzaERvd25sb2FkICYmIGZsdXNoRG93bmxvYWQoKTsgLy8gZmx1c2ggZXZlbnRzXG5cbiAgICAgIF9jb25maWcuY2FuY2VsVG9rZW4gJiYgX2NvbmZpZy5jYW5jZWxUb2tlbi51bnN1YnNjcmliZShvbkNhbmNlbGVkKTtcblxuICAgICAgX2NvbmZpZy5zaWduYWwgJiYgX2NvbmZpZy5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICB9XG5cbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgcmVxdWVzdC5vcGVuKF9jb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIF9jb25maWcudXJsLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gX2NvbmZpZy50aW1lb3V0O1xuXG4gICAgZnVuY3Rpb24gb25sb2FkZW5kKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICBjb25zdCByZXNwb25zZUhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShcbiAgICAgICAgJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCAmJiByZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG4gICAgICApO1xuICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gIXJlc3BvbnNlVHlwZSB8fCByZXNwb25zZVR5cGUgPT09ICd0ZXh0JyB8fCByZXNwb25zZVR5cGUgPT09ICdqc29uJyA/XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShmdW5jdGlvbiBfcmVzb2x2ZSh2YWx1ZSkge1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSwgZnVuY3Rpb24gX3JlamVjdChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCdvbmxvYWRlbmQnIGluIHJlcXVlc3QpIHtcbiAgICAgIC8vIFVzZSBvbmxvYWRlbmQgaWYgYXZhaWxhYmxlXG4gICAgICByZXF1ZXN0Lm9ubG9hZGVuZCA9IG9ubG9hZGVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZSB0byBlbXVsYXRlIG9ubG9hZGVuZFxuICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlYWR5c3RhdGUgaGFuZGxlciBpcyBjYWxsaW5nIGJlZm9yZSBvbmVycm9yIG9yIG9udGltZW91dCBoYW5kbGVycyxcbiAgICAgICAgLy8gc28gd2Ugc2hvdWxkIGNhbGwgb25sb2FkZW5kIG9uIHRoZSBuZXh0ICd0aWNrJ1xuICAgICAgICBzZXRUaW1lb3V0KG9ubG9hZGVuZCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsIGNvbmZpZywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignTmV0d29yayBFcnJvcicsIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIGNvbmZpZywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICBsZXQgdGltZW91dEVycm9yTWVzc2FnZSA9IF9jb25maWcudGltZW91dCA/ICd0aW1lb3V0IG9mICcgKyBfY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnIDogJ3RpbWVvdXQgZXhjZWVkZWQnO1xuICAgICAgY29uc3QgdHJhbnNpdGlvbmFsID0gX2NvbmZpZy50cmFuc2l0aW9uYWwgfHwgdHJhbnNpdGlvbmFsRGVmYXVsdHM7XG4gICAgICBpZiAoX2NvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBfY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIHRyYW5zaXRpb25hbC5jbGFyaWZ5VGltZW91dEVycm9yID8gQXhpb3NFcnJvci5FVElNRURPVVQgOiBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgcmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCAmJiByZXF1ZXN0SGVhZGVycy5zZXRDb250ZW50VHlwZShudWxsKTtcblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLnRvSlNPTigpLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChfY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gISFfY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKHJlc3BvbnNlVHlwZSAmJiByZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBfY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKG9uRG93bmxvYWRQcm9ncmVzcykge1xuICAgICAgKFtkb3dubG9hZFRocm90dGxlZCwgZmx1c2hEb3dubG9hZF0gPSBwcm9ncmVzc0V2ZW50UmVkdWNlcihvbkRvd25sb2FkUHJvZ3Jlc3MsIHRydWUpKTtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBkb3dubG9hZFRocm90dGxlZCk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAob25VcGxvYWRQcm9ncmVzcyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgKFt1cGxvYWRUaHJvdHRsZWQsIGZsdXNoVXBsb2FkXSA9IHByb2dyZXNzRXZlbnRSZWR1Y2VyKG9uVXBsb2FkUHJvZ3Jlc3MpKTtcblxuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCB1cGxvYWRUaHJvdHRsZWQpO1xuXG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZW5kJywgZmx1c2hVcGxvYWQpO1xuICAgIH1cblxuICAgIGlmIChfY29uZmlnLmNhbmNlbFRva2VuIHx8IF9jb25maWcuc2lnbmFsKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgb25DYW5jZWxlZCA9IGNhbmNlbCA9PiB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZWplY3QoIWNhbmNlbCB8fCBjYW5jZWwudHlwZSA/IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZywgcmVxdWVzdCkgOiBjYW5jZWwpO1xuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfTtcblxuICAgICAgX2NvbmZpZy5jYW5jZWxUb2tlbiAmJiBfY29uZmlnLmNhbmNlbFRva2VuLnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgIGlmIChfY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBfY29uZmlnLnNpZ25hbC5hYm9ydGVkID8gb25DYW5jZWxlZCgpIDogX2NvbmZpZy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwcm90b2NvbCA9IHBhcnNlUHJvdG9jb2woX2NvbmZpZy51cmwpO1xuXG4gICAgaWYgKHByb3RvY29sICYmIHBsYXRmb3JtLnByb3RvY29scy5pbmRleE9mKHByb3RvY29sKSA9PT0gLTEpIHtcbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignVW5zdXBwb3J0ZWQgcHJvdG9jb2wgJyArIHByb3RvY29sICsgJzonLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCwgY29uZmlnKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhIHx8IG51bGwpO1xuICB9KTtcbn1cbiIsImltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gXCIuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qc1wiO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSBcIi4uL2NvcmUvQXhpb3NFcnJvci5qc1wiO1xuXG5jb25zdCBjb21wb3NlU2lnbmFscyA9IChzaWduYWxzLCB0aW1lb3V0KSA9PiB7XG4gIGxldCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gIGxldCBhYm9ydGVkO1xuXG4gIGNvbnN0IG9uYWJvcnQgPSBmdW5jdGlvbiAoY2FuY2VsKSB7XG4gICAgaWYgKCFhYm9ydGVkKSB7XG4gICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgIHVuc3Vic2NyaWJlKCk7XG4gICAgICBjb25zdCBlcnIgPSBjYW5jZWwgaW5zdGFuY2VvZiBFcnJvciA/IGNhbmNlbCA6IHRoaXMucmVhc29uO1xuICAgICAgY29udHJvbGxlci5hYm9ydChlcnIgaW5zdGFuY2VvZiBBeGlvc0Vycm9yID8gZXJyIDogbmV3IENhbmNlbGVkRXJyb3IoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6IGVycikpO1xuICAgIH1cbiAgfVxuXG4gIGxldCB0aW1lciA9IHRpbWVvdXQgJiYgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgb25hYm9ydChuZXcgQXhpb3NFcnJvcihgdGltZW91dCAke3RpbWVvdXR9IG9mIG1zIGV4Y2VlZGVkYCwgQXhpb3NFcnJvci5FVElNRURPVVQpKVxuICB9LCB0aW1lb3V0KVxuXG4gIGNvbnN0IHVuc3Vic2NyaWJlID0gKCkgPT4ge1xuICAgIGlmIChzaWduYWxzKSB7XG4gICAgICB0aW1lciAmJiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgc2lnbmFscy5mb3JFYWNoKHNpZ25hbCA9PiB7XG4gICAgICAgIHNpZ25hbCAmJlxuICAgICAgICAoc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIgPyBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbmFib3J0KSA6IHNpZ25hbC51bnN1YnNjcmliZShvbmFib3J0KSk7XG4gICAgICB9KTtcbiAgICAgIHNpZ25hbHMgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsKSA9PiBzaWduYWwgJiYgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25hYm9ydCkpO1xuXG4gIGNvbnN0IHtzaWduYWx9ID0gY29udHJvbGxlcjtcblxuICBzaWduYWwudW5zdWJzY3JpYmUgPSB1bnN1YnNjcmliZTtcblxuICByZXR1cm4gW3NpZ25hbCwgKCkgPT4ge1xuICAgIHRpbWVyICYmIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgdGltZXIgPSBudWxsO1xuICB9XTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tcG9zZVNpZ25hbHM7XG4iLCJcbmV4cG9ydCBjb25zdCBzdHJlYW1DaHVuayA9IGZ1bmN0aW9uKiAoY2h1bmssIGNodW5rU2l6ZSkge1xuICBsZXQgbGVuID0gY2h1bmsuYnl0ZUxlbmd0aDtcblxuICBpZiAoIWNodW5rU2l6ZSB8fCBsZW4gPCBjaHVua1NpemUpIHtcbiAgICB5aWVsZCBjaHVuaztcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgcG9zID0gMDtcbiAgbGV0IGVuZDtcblxuICB3aGlsZSAocG9zIDwgbGVuKSB7XG4gICAgZW5kID0gcG9zICsgY2h1bmtTaXplO1xuICAgIHlpZWxkIGNodW5rLnNsaWNlKHBvcywgZW5kKTtcbiAgICBwb3MgPSBlbmQ7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlYWRCeXRlcyA9IGFzeW5jIGZ1bmN0aW9uKiAoaXRlcmFibGUsIGNodW5rU2l6ZSwgZW5jb2RlKSB7XG4gIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgaXRlcmFibGUpIHtcbiAgICB5aWVsZCogc3RyZWFtQ2h1bmsoQXJyYXlCdWZmZXIuaXNWaWV3KGNodW5rKSA/IGNodW5rIDogKGF3YWl0IGVuY29kZShTdHJpbmcoY2h1bmspKSksIGNodW5rU2l6ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHRyYWNrU3RyZWFtID0gKHN0cmVhbSwgY2h1bmtTaXplLCBvblByb2dyZXNzLCBvbkZpbmlzaCwgZW5jb2RlKSA9PiB7XG4gIGNvbnN0IGl0ZXJhdG9yID0gcmVhZEJ5dGVzKHN0cmVhbSwgY2h1bmtTaXplLCBlbmNvZGUpO1xuXG4gIGxldCBieXRlcyA9IDA7XG4gIGxldCBkb25lO1xuICBsZXQgX29uRmluaXNoID0gKGUpID0+IHtcbiAgICBpZiAoIWRvbmUpIHtcbiAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgb25GaW5pc2ggJiYgb25GaW5pc2goZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBSZWFkYWJsZVN0cmVhbSh7XG4gICAgYXN5bmMgcHVsbChjb250cm9sbGVyKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7ZG9uZSwgdmFsdWV9ID0gYXdhaXQgaXRlcmF0b3IubmV4dCgpO1xuXG4gICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICBfb25GaW5pc2goKTtcbiAgICAgICAgICBjb250cm9sbGVyLmNsb3NlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxlbiA9IHZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgICAgIGlmIChvblByb2dyZXNzKSB7XG4gICAgICAgICAgbGV0IGxvYWRlZEJ5dGVzID0gYnl0ZXMgKz0gbGVuO1xuICAgICAgICAgIG9uUHJvZ3Jlc3MobG9hZGVkQnl0ZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShuZXcgVWludDhBcnJheSh2YWx1ZSkpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9vbkZpbmlzaChlcnIpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfSxcbiAgICBjYW5jZWwocmVhc29uKSB7XG4gICAgICBfb25GaW5pc2gocmVhc29uKTtcbiAgICAgIHJldHVybiBpdGVyYXRvci5yZXR1cm4oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBoaWdoV2F0ZXJNYXJrOiAyXG4gIH0pXG59XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSBcIi4uL3BsYXRmb3JtL2luZGV4LmpzXCI7XG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzLmpzXCI7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tIFwiLi4vY29yZS9BeGlvc0Vycm9yLmpzXCI7XG5pbXBvcnQgY29tcG9zZVNpZ25hbHMgZnJvbSBcIi4uL2hlbHBlcnMvY29tcG9zZVNpZ25hbHMuanNcIjtcbmltcG9ydCB7dHJhY2tTdHJlYW19IGZyb20gXCIuLi9oZWxwZXJzL3RyYWNrU3RyZWFtLmpzXCI7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gXCIuLi9jb3JlL0F4aW9zSGVhZGVycy5qc1wiO1xuaW1wb3J0IHtwcm9ncmVzc0V2ZW50UmVkdWNlciwgcHJvZ3Jlc3NFdmVudERlY29yYXRvciwgYXN5bmNEZWNvcmF0b3J9IGZyb20gXCIuLi9oZWxwZXJzL3Byb2dyZXNzRXZlbnRSZWR1Y2VyLmpzXCI7XG5pbXBvcnQgcmVzb2x2ZUNvbmZpZyBmcm9tIFwiLi4vaGVscGVycy9yZXNvbHZlQ29uZmlnLmpzXCI7XG5pbXBvcnQgc2V0dGxlIGZyb20gXCIuLi9jb3JlL3NldHRsZS5qc1wiO1xuXG5jb25zdCBpc0ZldGNoU3VwcG9ydGVkID0gdHlwZW9mIGZldGNoID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBSZXF1ZXN0ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBSZXNwb25zZSA9PT0gJ2Z1bmN0aW9uJztcbmNvbnN0IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgPSBpc0ZldGNoU3VwcG9ydGVkICYmIHR5cGVvZiBSZWFkYWJsZVN0cmVhbSA9PT0gJ2Z1bmN0aW9uJztcblxuLy8gdXNlZCBvbmx5IGluc2lkZSB0aGUgZmV0Y2ggYWRhcHRlclxuY29uc3QgZW5jb2RlVGV4dCA9IGlzRmV0Y2hTdXBwb3J0ZWQgJiYgKHR5cGVvZiBUZXh0RW5jb2RlciA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgKChlbmNvZGVyKSA9PiAoc3RyKSA9PiBlbmNvZGVyLmVuY29kZShzdHIpKShuZXcgVGV4dEVuY29kZXIoKSkgOlxuICAgIGFzeW5jIChzdHIpID0+IG5ldyBVaW50OEFycmF5KGF3YWl0IG5ldyBSZXNwb25zZShzdHIpLmFycmF5QnVmZmVyKCkpXG4pO1xuXG5jb25zdCB0ZXN0ID0gKGZuLCAuLi5hcmdzKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZm4oLi4uYXJncyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5jb25zdCBzdXBwb3J0c1JlcXVlc3RTdHJlYW0gPSBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkICYmIHRlc3QoKCkgPT4ge1xuICBsZXQgZHVwbGV4QWNjZXNzZWQgPSBmYWxzZTtcblxuICBjb25zdCBoYXNDb250ZW50VHlwZSA9IG5ldyBSZXF1ZXN0KHBsYXRmb3JtLm9yaWdpbiwge1xuICAgIGJvZHk6IG5ldyBSZWFkYWJsZVN0cmVhbSgpLFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGdldCBkdXBsZXgoKSB7XG4gICAgICBkdXBsZXhBY2Nlc3NlZCA9IHRydWU7XG4gICAgICByZXR1cm4gJ2hhbGYnO1xuICAgIH0sXG4gIH0pLmhlYWRlcnMuaGFzKCdDb250ZW50LVR5cGUnKTtcblxuICByZXR1cm4gZHVwbGV4QWNjZXNzZWQgJiYgIWhhc0NvbnRlbnRUeXBlO1xufSk7XG5cbmNvbnN0IERFRkFVTFRfQ0hVTktfU0laRSA9IDY0ICogMTAyNDtcblxuY29uc3Qgc3VwcG9ydHNSZXNwb25zZVN0cmVhbSA9IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgJiZcbiAgdGVzdCgoKSA9PiB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKG5ldyBSZXNwb25zZSgnJykuYm9keSkpO1xuXG5cbmNvbnN0IHJlc29sdmVycyA9IHtcbiAgc3RyZWFtOiBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmICgocmVzKSA9PiByZXMuYm9keSlcbn07XG5cbmlzRmV0Y2hTdXBwb3J0ZWQgJiYgKCgocmVzKSA9PiB7XG4gIFsndGV4dCcsICdhcnJheUJ1ZmZlcicsICdibG9iJywgJ2Zvcm1EYXRhJywgJ3N0cmVhbSddLmZvckVhY2godHlwZSA9PiB7XG4gICAgIXJlc29sdmVyc1t0eXBlXSAmJiAocmVzb2x2ZXJzW3R5cGVdID0gdXRpbHMuaXNGdW5jdGlvbihyZXNbdHlwZV0pID8gKHJlcykgPT4gcmVzW3R5cGVdKCkgOlxuICAgICAgKF8sIGNvbmZpZykgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihgUmVzcG9uc2UgdHlwZSAnJHt0eXBlfScgaXMgbm90IHN1cHBvcnRlZGAsIEF4aW9zRXJyb3IuRVJSX05PVF9TVVBQT1JULCBjb25maWcpO1xuICAgICAgfSlcbiAgfSk7XG59KShuZXcgUmVzcG9uc2UpKTtcblxuY29uc3QgZ2V0Qm9keUxlbmd0aCA9IGFzeW5jIChib2R5KSA9PiB7XG4gIGlmIChib2R5ID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmKHV0aWxzLmlzQmxvYihib2R5KSkge1xuICAgIHJldHVybiBib2R5LnNpemU7XG4gIH1cblxuICBpZih1dGlscy5pc1NwZWNDb21wbGlhbnRGb3JtKGJvZHkpKSB7XG4gICAgcmV0dXJuIChhd2FpdCBuZXcgUmVxdWVzdChib2R5KS5hcnJheUJ1ZmZlcigpKS5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgaWYodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkgfHwgdXRpbHMuaXNBcnJheUJ1ZmZlcihib2R5KSkge1xuICAgIHJldHVybiBib2R5LmJ5dGVMZW5ndGg7XG4gIH1cblxuICBpZih1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhib2R5KSkge1xuICAgIGJvZHkgPSBib2R5ICsgJyc7XG4gIH1cblxuICBpZih1dGlscy5pc1N0cmluZyhib2R5KSkge1xuICAgIHJldHVybiAoYXdhaXQgZW5jb2RlVGV4dChib2R5KSkuYnl0ZUxlbmd0aDtcbiAgfVxufVxuXG5jb25zdCByZXNvbHZlQm9keUxlbmd0aCA9IGFzeW5jIChoZWFkZXJzLCBib2R5KSA9PiB7XG4gIGNvbnN0IGxlbmd0aCA9IHV0aWxzLnRvRmluaXRlTnVtYmVyKGhlYWRlcnMuZ2V0Q29udGVudExlbmd0aCgpKTtcblxuICByZXR1cm4gbGVuZ3RoID09IG51bGwgPyBnZXRCb2R5TGVuZ3RoKGJvZHkpIDogbGVuZ3RoO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0ZldGNoU3VwcG9ydGVkICYmIChhc3luYyAoY29uZmlnKSA9PiB7XG4gIGxldCB7XG4gICAgdXJsLFxuICAgIG1ldGhvZCxcbiAgICBkYXRhLFxuICAgIHNpZ25hbCxcbiAgICBjYW5jZWxUb2tlbixcbiAgICB0aW1lb3V0LFxuICAgIG9uRG93bmxvYWRQcm9ncmVzcyxcbiAgICBvblVwbG9hZFByb2dyZXNzLFxuICAgIHJlc3BvbnNlVHlwZSxcbiAgICBoZWFkZXJzLFxuICAgIHdpdGhDcmVkZW50aWFscyA9ICdzYW1lLW9yaWdpbicsXG4gICAgZmV0Y2hPcHRpb25zXG4gIH0gPSByZXNvbHZlQ29uZmlnKGNvbmZpZyk7XG5cbiAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlID8gKHJlc3BvbnNlVHlwZSArICcnKS50b0xvd2VyQ2FzZSgpIDogJ3RleHQnO1xuXG4gIGxldCBbY29tcG9zZWRTaWduYWwsIHN0b3BUaW1lb3V0XSA9IChzaWduYWwgfHwgY2FuY2VsVG9rZW4gfHwgdGltZW91dCkgP1xuICAgIGNvbXBvc2VTaWduYWxzKFtzaWduYWwsIGNhbmNlbFRva2VuXSwgdGltZW91dCkgOiBbXTtcblxuICBsZXQgZmluaXNoZWQsIHJlcXVlc3Q7XG5cbiAgY29uc3Qgb25GaW5pc2ggPSAoKSA9PiB7XG4gICAgIWZpbmlzaGVkICYmIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29tcG9zZWRTaWduYWwgJiYgY29tcG9zZWRTaWduYWwudW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcblxuICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGxldCByZXF1ZXN0Q29udGVudExlbmd0aDtcblxuICB0cnkge1xuICAgIGlmIChcbiAgICAgIG9uVXBsb2FkUHJvZ3Jlc3MgJiYgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtICYmIG1ldGhvZCAhPT0gJ2dldCcgJiYgbWV0aG9kICE9PSAnaGVhZCcgJiZcbiAgICAgIChyZXF1ZXN0Q29udGVudExlbmd0aCA9IGF3YWl0IHJlc29sdmVCb2R5TGVuZ3RoKGhlYWRlcnMsIGRhdGEpKSAhPT0gMFxuICAgICkge1xuICAgICAgbGV0IF9yZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBkYXRhLFxuICAgICAgICBkdXBsZXg6IFwiaGFsZlwiXG4gICAgICB9KTtcblxuICAgICAgbGV0IGNvbnRlbnRUeXBlSGVhZGVyO1xuXG4gICAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSAmJiAoY29udGVudFR5cGVIZWFkZXIgPSBfcmVxdWVzdC5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoY29udGVudFR5cGVIZWFkZXIpXG4gICAgICB9XG5cbiAgICAgIGlmIChfcmVxdWVzdC5ib2R5KSB7XG4gICAgICAgIGNvbnN0IFtvblByb2dyZXNzLCBmbHVzaF0gPSBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yKFxuICAgICAgICAgIHJlcXVlc3RDb250ZW50TGVuZ3RoLFxuICAgICAgICAgIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGFzeW5jRGVjb3JhdG9yKG9uVXBsb2FkUHJvZ3Jlc3MpKVxuICAgICAgICApO1xuXG4gICAgICAgIGRhdGEgPSB0cmFja1N0cmVhbShfcmVxdWVzdC5ib2R5LCBERUZBVUxUX0NIVU5LX1NJWkUsIG9uUHJvZ3Jlc3MsIGZsdXNoLCBlbmNvZGVUZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXV0aWxzLmlzU3RyaW5nKHdpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHdpdGhDcmVkZW50aWFscyA9IHdpdGhDcmVkZW50aWFscyA/ICdpbmNsdWRlJyA6ICdvbWl0JztcbiAgICB9XG5cbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCB7XG4gICAgICAuLi5mZXRjaE9wdGlvbnMsXG4gICAgICBzaWduYWw6IGNvbXBvc2VkU2lnbmFsLFxuICAgICAgbWV0aG9kOiBtZXRob2QudG9VcHBlckNhc2UoKSxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMubm9ybWFsaXplKCkudG9KU09OKCksXG4gICAgICBib2R5OiBkYXRhLFxuICAgICAgZHVwbGV4OiBcImhhbGZcIixcbiAgICAgIGNyZWRlbnRpYWxzOiB3aXRoQ3JlZGVudGlhbHNcbiAgICB9KTtcblxuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcXVlc3QpO1xuXG4gICAgY29uc3QgaXNTdHJlYW1SZXNwb25zZSA9IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKHJlc3BvbnNlVHlwZSA9PT0gJ3N0cmVhbScgfHwgcmVzcG9uc2VUeXBlID09PSAncmVzcG9uc2UnKTtcblxuICAgIGlmIChzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmIChvbkRvd25sb2FkUHJvZ3Jlc3MgfHwgaXNTdHJlYW1SZXNwb25zZSkpIHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcblxuICAgICAgWydzdGF0dXMnLCAnc3RhdHVzVGV4dCcsICdoZWFkZXJzJ10uZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgb3B0aW9uc1twcm9wXSA9IHJlc3BvbnNlW3Byb3BdO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlQ29udGVudExlbmd0aCA9IHV0aWxzLnRvRmluaXRlTnVtYmVyKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LWxlbmd0aCcpKTtcblxuICAgICAgY29uc3QgW29uUHJvZ3Jlc3MsIGZsdXNoXSA9IG9uRG93bmxvYWRQcm9ncmVzcyAmJiBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yKFxuICAgICAgICByZXNwb25zZUNvbnRlbnRMZW5ndGgsXG4gICAgICAgIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGFzeW5jRGVjb3JhdG9yKG9uRG93bmxvYWRQcm9ncmVzcyksIHRydWUpXG4gICAgICApIHx8IFtdO1xuXG4gICAgICByZXNwb25zZSA9IG5ldyBSZXNwb25zZShcbiAgICAgICAgdHJhY2tTdHJlYW0ocmVzcG9uc2UuYm9keSwgREVGQVVMVF9DSFVOS19TSVpFLCBvblByb2dyZXNzLCAoKSA9PiB7XG4gICAgICAgICAgZmx1c2ggJiYgZmx1c2goKTtcbiAgICAgICAgICBpc1N0cmVhbVJlc3BvbnNlICYmIG9uRmluaXNoKCk7XG4gICAgICAgIH0sIGVuY29kZVRleHQpLFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICAgIH1cblxuICAgIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSB8fCAndGV4dCc7XG5cbiAgICBsZXQgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzb2x2ZXJzW3V0aWxzLmZpbmRLZXkocmVzb2x2ZXJzLCByZXNwb25zZVR5cGUpIHx8ICd0ZXh0J10ocmVzcG9uc2UsIGNvbmZpZyk7XG5cbiAgICAhaXNTdHJlYW1SZXNwb25zZSAmJiBvbkZpbmlzaCgpO1xuXG4gICAgc3RvcFRpbWVvdXQgJiYgc3RvcFRpbWVvdXQoKTtcblxuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgaGVhZGVyczogQXhpb3NIZWFkZXJzLmZyb20ocmVzcG9uc2UuaGVhZGVycyksXG4gICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3RcbiAgICAgIH0pXG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgb25GaW5pc2goKTtcblxuICAgIGlmIChlcnIgJiYgZXJyLm5hbWUgPT09ICdUeXBlRXJyb3InICYmIC9mZXRjaC9pLnRlc3QoZXJyLm1lc3NhZ2UpKSB7XG4gICAgICB0aHJvdyBPYmplY3QuYXNzaWduKFxuICAgICAgICBuZXcgQXhpb3NFcnJvcignTmV0d29yayBFcnJvcicsIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIGNvbmZpZywgcmVxdWVzdCksXG4gICAgICAgIHtcbiAgICAgICAgICBjYXVzZTogZXJyLmNhdXNlIHx8IGVyclxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGVyciwgZXJyICYmIGVyci5jb2RlLCBjb25maWcsIHJlcXVlc3QpO1xuICB9XG59KTtcblxuXG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IGh0dHBBZGFwdGVyIGZyb20gJy4vaHR0cC5qcyc7XG5pbXBvcnQgeGhyQWRhcHRlciBmcm9tICcuL3hoci5qcyc7XG5pbXBvcnQgZmV0Y2hBZGFwdGVyIGZyb20gJy4vZmV0Y2guanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSBcIi4uL2NvcmUvQXhpb3NFcnJvci5qc1wiO1xuXG5jb25zdCBrbm93bkFkYXB0ZXJzID0ge1xuICBodHRwOiBodHRwQWRhcHRlcixcbiAgeGhyOiB4aHJBZGFwdGVyLFxuICBmZXRjaDogZmV0Y2hBZGFwdGVyXG59XG5cbnV0aWxzLmZvckVhY2goa25vd25BZGFwdGVycywgKGZuLCB2YWx1ZSkgPT4ge1xuICBpZiAoZm4pIHtcbiAgICB0cnkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnbmFtZScsIHt2YWx1ZX0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sICdhZGFwdGVyTmFtZScsIHt2YWx1ZX0pO1xuICB9XG59KTtcblxuY29uc3QgcmVuZGVyUmVhc29uID0gKHJlYXNvbikgPT4gYC0gJHtyZWFzb259YDtcblxuY29uc3QgaXNSZXNvbHZlZEhhbmRsZSA9IChhZGFwdGVyKSA9PiB1dGlscy5pc0Z1bmN0aW9uKGFkYXB0ZXIpIHx8IGFkYXB0ZXIgPT09IG51bGwgfHwgYWRhcHRlciA9PT0gZmFsc2U7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0QWRhcHRlcjogKGFkYXB0ZXJzKSA9PiB7XG4gICAgYWRhcHRlcnMgPSB1dGlscy5pc0FycmF5KGFkYXB0ZXJzKSA/IGFkYXB0ZXJzIDogW2FkYXB0ZXJzXTtcblxuICAgIGNvbnN0IHtsZW5ndGh9ID0gYWRhcHRlcnM7XG4gICAgbGV0IG5hbWVPckFkYXB0ZXI7XG4gICAgbGV0IGFkYXB0ZXI7XG5cbiAgICBjb25zdCByZWplY3RlZFJlYXNvbnMgPSB7fTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIG5hbWVPckFkYXB0ZXIgPSBhZGFwdGVyc1tpXTtcbiAgICAgIGxldCBpZDtcblxuICAgICAgYWRhcHRlciA9IG5hbWVPckFkYXB0ZXI7XG5cbiAgICAgIGlmICghaXNSZXNvbHZlZEhhbmRsZShuYW1lT3JBZGFwdGVyKSkge1xuICAgICAgICBhZGFwdGVyID0ga25vd25BZGFwdGVyc1soaWQgPSBTdHJpbmcobmFtZU9yQWRhcHRlcikpLnRvTG93ZXJDYXNlKCldO1xuXG4gICAgICAgIGlmIChhZGFwdGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihgVW5rbm93biBhZGFwdGVyICcke2lkfSdgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYWRhcHRlcikge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgcmVqZWN0ZWRSZWFzb25zW2lkIHx8ICcjJyArIGldID0gYWRhcHRlcjtcbiAgICB9XG5cbiAgICBpZiAoIWFkYXB0ZXIpIHtcblxuICAgICAgY29uc3QgcmVhc29ucyA9IE9iamVjdC5lbnRyaWVzKHJlamVjdGVkUmVhc29ucylcbiAgICAgICAgLm1hcCgoW2lkLCBzdGF0ZV0pID0+IGBhZGFwdGVyICR7aWR9IGAgK1xuICAgICAgICAgIChzdGF0ZSA9PT0gZmFsc2UgPyAnaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgZW52aXJvbm1lbnQnIDogJ2lzIG5vdCBhdmFpbGFibGUgaW4gdGhlIGJ1aWxkJylcbiAgICAgICAgKTtcblxuICAgICAgbGV0IHMgPSBsZW5ndGggP1xuICAgICAgICAocmVhc29ucy5sZW5ndGggPiAxID8gJ3NpbmNlIDpcXG4nICsgcmVhc29ucy5tYXAocmVuZGVyUmVhc29uKS5qb2luKCdcXG4nKSA6ICcgJyArIHJlbmRlclJlYXNvbihyZWFzb25zWzBdKSkgOlxuICAgICAgICAnYXMgbm8gYWRhcHRlciBzcGVjaWZpZWQnO1xuXG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgYFRoZXJlIGlzIG5vIHN1aXRhYmxlIGFkYXB0ZXIgdG8gZGlzcGF0Y2ggdGhlIHJlcXVlc3QgYCArIHMsXG4gICAgICAgICdFUlJfTk9UX1NVUFBPUlQnXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBhZGFwdGVyO1xuICB9LFxuICBhZGFwdGVyczoga25vd25BZGFwdGVyc1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdHJhbnNmb3JtRGF0YSBmcm9tICcuL3RyYW5zZm9ybURhdGEuanMnO1xuaW1wb3J0IGlzQ2FuY2VsIGZyb20gJy4uL2NhbmNlbC9pc0NhbmNlbC5qcyc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQgYWRhcHRlcnMgZnJvbSBcIi4uL2FkYXB0ZXJzL2FkYXB0ZXJzLmpzXCI7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cblxuICBpZiAoY29uZmlnLnNpZ25hbCAmJiBjb25maWcuc2lnbmFsLmFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgQ2FuY2VsZWRFcnJvcihudWxsLCBjb25maWcpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShjb25maWcuaGVhZGVycyk7XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICBjb25maWcsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICBpZiAoWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLmluZGV4T2YoY29uZmlnLm1ldGhvZCkgIT09IC0xKSB7XG4gICAgY29uZmlnLmhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsIGZhbHNlKTtcbiAgfVxuXG4gIGNvbnN0IGFkYXB0ZXIgPSBhZGFwdGVycy5nZXRBZGFwdGVyKGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXIpO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgICAgY29uZmlnLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgcmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZVxuICAgICAgICApO1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59XG4iLCJleHBvcnQgY29uc3QgVkVSU0lPTiA9IFwiMS43LjRcIjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7VkVSU0lPTn0gZnJvbSAnLi4vZW52L2RhdGEuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcblxuY29uc3QgdmFsaWRhdG9ycyA9IHt9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuWydvYmplY3QnLCAnYm9vbGVhbicsICdudW1iZXInLCAnZnVuY3Rpb24nLCAnc3RyaW5nJywgJ3N5bWJvbCddLmZvckVhY2goKHR5cGUsIGkpID0+IHtcbiAgdmFsaWRhdG9yc1t0eXBlXSA9IGZ1bmN0aW9uIHZhbGlkYXRvcih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IHR5cGUgfHwgJ2EnICsgKGkgPCAxID8gJ24gJyA6ICcgJykgKyB0eXBlO1xuICB9O1xufSk7XG5cbmNvbnN0IGRlcHJlY2F0ZWRXYXJuaW5ncyA9IHt9O1xuXG4vKipcbiAqIFRyYW5zaXRpb25hbCBvcHRpb24gdmFsaWRhdG9yXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbnxib29sZWFuP30gdmFsaWRhdG9yIC0gc2V0IHRvIGZhbHNlIGlmIHRoZSB0cmFuc2l0aW9uYWwgb3B0aW9uIGhhcyBiZWVuIHJlbW92ZWRcbiAqIEBwYXJhbSB7c3RyaW5nP30gdmVyc2lvbiAtIGRlcHJlY2F0ZWQgdmVyc2lvbiAvIHJlbW92ZWQgc2luY2UgdmVyc2lvblxuICogQHBhcmFtIHtzdHJpbmc/fSBtZXNzYWdlIC0gc29tZSBtZXNzYWdlIHdpdGggYWRkaXRpb25hbCBpbmZvXG4gKlxuICogQHJldHVybnMge2Z1bmN0aW9ufVxuICovXG52YWxpZGF0b3JzLnRyYW5zaXRpb25hbCA9IGZ1bmN0aW9uIHRyYW5zaXRpb25hbCh2YWxpZGF0b3IsIHZlcnNpb24sIG1lc3NhZ2UpIHtcbiAgZnVuY3Rpb24gZm9ybWF0TWVzc2FnZShvcHQsIGRlc2MpIHtcbiAgICByZXR1cm4gJ1tBeGlvcyB2JyArIFZFUlNJT04gKyAnXSBUcmFuc2l0aW9uYWwgb3B0aW9uIFxcJycgKyBvcHQgKyAnXFwnJyArIGRlc2MgKyAobWVzc2FnZSA/ICcuICcgKyBtZXNzYWdlIDogJycpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuICh2YWx1ZSwgb3B0LCBvcHRzKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRvciA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKG9wdCwgJyBoYXMgYmVlbiByZW1vdmVkJyArICh2ZXJzaW9uID8gJyBpbiAnICsgdmVyc2lvbiA6ICcnKSksXG4gICAgICAgIEF4aW9zRXJyb3IuRVJSX0RFUFJFQ0FURURcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHZlcnNpb24gJiYgIWRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdKSB7XG4gICAgICBkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSA9IHRydWU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKFxuICAgICAgICAgIG9wdCxcbiAgICAgICAgICAnIGhhcyBiZWVuIGRlcHJlY2F0ZWQgc2luY2UgdicgKyB2ZXJzaW9uICsgJyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZWFyIGZ1dHVyZSdcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdG9yID8gdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdHMpIDogdHJ1ZTtcbiAgfTtcbn07XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCdzIHByb3BlcnRpZXMgdHlwZVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge29iamVjdH0gc2NoZW1hXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBhbGxvd1Vua25vd25cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICovXG5cbmZ1bmN0aW9uIGFzc2VydE9wdGlvbnMob3B0aW9ucywgc2NoZW1hLCBhbGxvd1Vua25vd24pIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0JywgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gIH1cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGNvbnN0IG9wdCA9IGtleXNbaV07XG4gICAgY29uc3QgdmFsaWRhdG9yID0gc2NoZW1hW29wdF07XG4gICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgY29uc3QgdmFsdWUgPSBvcHRpb25zW29wdF07XG4gICAgICBjb25zdCByZXN1bHQgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRpb25zKTtcbiAgICAgIGlmIChyZXN1bHQgIT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbiAnICsgb3B0ICsgJyBtdXN0IGJlICcgKyByZXN1bHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChhbGxvd1Vua25vd24gIT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdVbmtub3duIG9wdGlvbiAnICsgb3B0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhc3NlcnRPcHRpb25zLFxuICB2YWxpZGF0b3JzXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSAnLi4vaGVscGVycy9idWlsZFVSTC5qcyc7XG5pbXBvcnQgSW50ZXJjZXB0b3JNYW5hZ2VyIGZyb20gJy4vSW50ZXJjZXB0b3JNYW5hZ2VyLmpzJztcbmltcG9ydCBkaXNwYXRjaFJlcXVlc3QgZnJvbSAnLi9kaXNwYXRjaFJlcXVlc3QuanMnO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gJy4vbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGJ1aWxkRnVsbFBhdGggZnJvbSAnLi9idWlsZEZ1bGxQYXRoLmpzJztcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnLi4vaGVscGVycy92YWxpZGF0b3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuL0F4aW9zSGVhZGVycy5qcyc7XG5cbmNvbnN0IHZhbGlkYXRvcnMgPSB2YWxpZGF0b3IudmFsaWRhdG9ycztcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuY2xhc3MgQXhpb3Mge1xuICBjb25zdHJ1Y3RvcihpbnN0YW5jZUNvbmZpZykge1xuICAgIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGNvbmZpZ09yVXJsIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAgICogQHBhcmFtIHs/T2JqZWN0fSBjb25maWdcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICAgKi9cbiAgYXN5bmMgcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGxldCBkdW1teTtcblxuICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSA/IEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGR1bW15ID0ge30pIDogKGR1bW15ID0gbmV3IEVycm9yKCkpO1xuXG4gICAgICAgIC8vIHNsaWNlIG9mZiB0aGUgRXJyb3I6IC4uLiBsaW5lXG4gICAgICAgIGNvbnN0IHN0YWNrID0gZHVtbXkuc3RhY2sgPyBkdW1teS5zdGFjay5yZXBsYWNlKC9eLitcXG4vLCAnJykgOiAnJztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIWVyci5zdGFjaykge1xuICAgICAgICAgICAgZXJyLnN0YWNrID0gc3RhY2s7XG4gICAgICAgICAgICAvLyBtYXRjaCB3aXRob3V0IHRoZSAyIHRvcCBzdGFjayBsaW5lc1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhY2sgJiYgIVN0cmluZyhlcnIuc3RhY2spLmVuZHNXaXRoKHN0YWNrLnJlcGxhY2UoL14uK1xcbi4rXFxuLywgJycpKSkge1xuICAgICAgICAgICAgZXJyLnN0YWNrICs9ICdcXG4nICsgc3RhY2tcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpZ25vcmUgdGhlIGNhc2Ugd2hlcmUgXCJzdGFja1wiIGlzIGFuIHVuLXdyaXRhYmxlIHByb3BlcnR5XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxuXG4gIF9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gICAgaWYgKHR5cGVvZiBjb25maWdPclVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgIGNvbmZpZy51cmwgPSBjb25maWdPclVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnID0gY29uZmlnT3JVcmwgfHwge307XG4gICAgfVxuXG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcblxuICAgIGNvbnN0IHt0cmFuc2l0aW9uYWwsIHBhcmFtc1NlcmlhbGl6ZXIsIGhlYWRlcnN9ID0gY29uZmlnO1xuXG4gICAgaWYgKHRyYW5zaXRpb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyh0cmFuc2l0aW9uYWwsIHtcbiAgICAgICAgc2lsZW50SlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgIGZvcmNlZEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICBjbGFyaWZ5VGltZW91dEVycm9yOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pXG4gICAgICB9LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIgIT0gbnVsbCkge1xuICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ocGFyYW1zU2VyaWFsaXplcikpIHtcbiAgICAgICAgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIgPSB7XG4gICAgICAgICAgc2VyaWFsaXplOiBwYXJhbXNTZXJpYWxpemVyXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHBhcmFtc1NlcmlhbGl6ZXIsIHtcbiAgICAgICAgICBlbmNvZGU6IHZhbGlkYXRvcnMuZnVuY3Rpb24sXG4gICAgICAgICAgc2VyaWFsaXplOiB2YWxpZGF0b3JzLmZ1bmN0aW9uXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNldCBjb25maWcubWV0aG9kXG4gICAgY29uZmlnLm1ldGhvZCA9IChjb25maWcubWV0aG9kIHx8IHRoaXMuZGVmYXVsdHMubWV0aG9kIHx8ICdnZXQnKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gICAgbGV0IGNvbnRleHRIZWFkZXJzID0gaGVhZGVycyAmJiB1dGlscy5tZXJnZShcbiAgICAgIGhlYWRlcnMuY29tbW9uLFxuICAgICAgaGVhZGVyc1tjb25maWcubWV0aG9kXVxuICAgICk7XG5cbiAgICBoZWFkZXJzICYmIHV0aWxzLmZvckVhY2goXG4gICAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICAgIChtZXRob2QpID0+IHtcbiAgICAgICAgZGVsZXRlIGhlYWRlcnNbbWV0aG9kXTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuY29uY2F0KGNvbnRleHRIZWFkZXJzLCBoZWFkZXJzKTtcblxuICAgIC8vIGZpbHRlciBvdXQgc2tpcHBlZCBpbnRlcmNlcHRvcnNcbiAgICBjb25zdCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIGxldCBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgaWYgKHR5cGVvZiBpbnRlcmNlcHRvci5ydW5XaGVuID09PSAnZnVuY3Rpb24nICYmIGludGVyY2VwdG9yLnJ1bldoZW4oY29uZmlnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgJiYgaW50ZXJjZXB0b3Iuc3luY2hyb25vdXM7XG5cbiAgICAgIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBsZXQgcHJvbWlzZTtcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGxlbjtcblxuICAgIGlmICghc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzKSB7XG4gICAgICBjb25zdCBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QuYmluZCh0aGlzKSwgdW5kZWZpbmVkXTtcbiAgICAgIGNoYWluLnVuc2hpZnQuYXBwbHkoY2hhaW4sIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluKTtcbiAgICAgIGNoYWluLnB1c2guYXBwbHkoY2hhaW4sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBsZW4gPSBjaGFpbi5sZW5ndGg7XG5cbiAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICAgICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbltpKytdLCBjaGFpbltpKytdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgbGVuID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgbGV0IG5ld0NvbmZpZyA9IGNvbmZpZztcblxuICAgIGkgPSAwO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIGNvbnN0IG9uRnVsZmlsbGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIGNvbnN0IG9uUmVqZWN0ZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbltpKytdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3Q29uZmlnID0gb25GdWxmaWxsZWQobmV3Q29uZmlnKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIG9uUmVqZWN0ZWQuY2FsbCh0aGlzLCBlcnJvcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBwcm9taXNlID0gZGlzcGF0Y2hSZXF1ZXN0LmNhbGwodGhpcywgbmV3Q29uZmlnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbiAgICBpID0gMDtcbiAgICBsZW4gPSByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4ocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluW2krK10sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGdldFVyaShjb25maWcpIHtcbiAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICAgIGNvbnN0IGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gICAgcmV0dXJuIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG4gIH1cbn1cblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2QsXG4gICAgICB1cmwsXG4gICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVIVFRQTWV0aG9kKGlzRm9ybSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBodHRwTWV0aG9kKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgICBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IGlzRm9ybSA/IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgIH0gOiB7fSxcbiAgICAgICAgdXJsLFxuICAgICAgICBkYXRhXG4gICAgICB9KSk7XG4gICAgfTtcbiAgfVxuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZ2VuZXJhdGVIVFRQTWV0aG9kKCk7XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZCArICdGb3JtJ10gPSBnZW5lcmF0ZUhUVFBNZXRob2QodHJ1ZSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4vQ2FuY2VsZWRFcnJvci5qcyc7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKlxuICogQHJldHVybnMge0NhbmNlbFRva2VufVxuICovXG5jbGFzcyBDYW5jZWxUb2tlbiB7XG4gIGNvbnN0cnVjdG9yKGV4ZWN1dG9yKSB7XG4gICAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGxldCByZXNvbHZlUHJvbWlzZTtcblxuICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2tlbiA9IHRoaXM7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuKGNhbmNlbCA9PiB7XG4gICAgICBpZiAoIXRva2VuLl9saXN0ZW5lcnMpIHJldHVybjtcblxuICAgICAgbGV0IGkgPSB0b2tlbi5fbGlzdGVuZXJzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgICAgdG9rZW4uX2xpc3RlbmVyc1tpXShjYW5jZWwpO1xuICAgICAgfVxuICAgICAgdG9rZW4uX2xpc3RlbmVycyA9IG51bGw7XG4gICAgfSk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuID0gb25mdWxmaWxsZWQgPT4ge1xuICAgICAgbGV0IF9yZXNvbHZlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgdG9rZW4uc3Vic2NyaWJlKHJlc29sdmUpO1xuICAgICAgICBfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICB9KS50aGVuKG9uZnVsZmlsbGVkKTtcblxuICAgICAgcHJvbWlzZS5jYW5jZWwgPSBmdW5jdGlvbiByZWplY3QoKSB7XG4gICAgICAgIHRva2VuLnVuc3Vic2NyaWJlKF9yZXNvbHZlKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH07XG5cbiAgICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gICAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWxlZEVycm9yKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCk7XG4gICAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICAgKi9cbiAgdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICAgIHRocm93IHRoaXMucmVhc29uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIGNhbmNlbCBzaWduYWxcbiAgICovXG5cbiAgc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICBsaXN0ZW5lcih0aGlzLnJlYXNvbik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2xpc3RlbmVycykge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSBbbGlzdGVuZXJdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHVuc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAgICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAgICovXG4gIHN0YXRpYyBzb3VyY2UoKSB7XG4gICAgbGV0IGNhbmNlbDtcbiAgICBjb25zdCB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgICBjYW5jZWwgPSBjO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbixcbiAgICAgIGNhbmNlbFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvc1xuICpcbiAqIEBwYXJhbSB7Kn0gcGF5bG9hZCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiB1dGlscy5pc09iamVjdChwYXlsb2FkKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufVxuIiwiY29uc3QgSHR0cFN0YXR1c0NvZGUgPSB7XG4gIENvbnRpbnVlOiAxMDAsXG4gIFN3aXRjaGluZ1Byb3RvY29sczogMTAxLFxuICBQcm9jZXNzaW5nOiAxMDIsXG4gIEVhcmx5SGludHM6IDEwMyxcbiAgT2s6IDIwMCxcbiAgQ3JlYXRlZDogMjAxLFxuICBBY2NlcHRlZDogMjAyLFxuICBOb25BdXRob3JpdGF0aXZlSW5mb3JtYXRpb246IDIwMyxcbiAgTm9Db250ZW50OiAyMDQsXG4gIFJlc2V0Q29udGVudDogMjA1LFxuICBQYXJ0aWFsQ29udGVudDogMjA2LFxuICBNdWx0aVN0YXR1czogMjA3LFxuICBBbHJlYWR5UmVwb3J0ZWQ6IDIwOCxcbiAgSW1Vc2VkOiAyMjYsXG4gIE11bHRpcGxlQ2hvaWNlczogMzAwLFxuICBNb3ZlZFBlcm1hbmVudGx5OiAzMDEsXG4gIEZvdW5kOiAzMDIsXG4gIFNlZU90aGVyOiAzMDMsXG4gIE5vdE1vZGlmaWVkOiAzMDQsXG4gIFVzZVByb3h5OiAzMDUsXG4gIFVudXNlZDogMzA2LFxuICBUZW1wb3JhcnlSZWRpcmVjdDogMzA3LFxuICBQZXJtYW5lbnRSZWRpcmVjdDogMzA4LFxuICBCYWRSZXF1ZXN0OiA0MDAsXG4gIFVuYXV0aG9yaXplZDogNDAxLFxuICBQYXltZW50UmVxdWlyZWQ6IDQwMixcbiAgRm9yYmlkZGVuOiA0MDMsXG4gIE5vdEZvdW5kOiA0MDQsXG4gIE1ldGhvZE5vdEFsbG93ZWQ6IDQwNSxcbiAgTm90QWNjZXB0YWJsZTogNDA2LFxuICBQcm94eUF1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDQwNyxcbiAgUmVxdWVzdFRpbWVvdXQ6IDQwOCxcbiAgQ29uZmxpY3Q6IDQwOSxcbiAgR29uZTogNDEwLFxuICBMZW5ndGhSZXF1aXJlZDogNDExLFxuICBQcmVjb25kaXRpb25GYWlsZWQ6IDQxMixcbiAgUGF5bG9hZFRvb0xhcmdlOiA0MTMsXG4gIFVyaVRvb0xvbmc6IDQxNCxcbiAgVW5zdXBwb3J0ZWRNZWRpYVR5cGU6IDQxNSxcbiAgUmFuZ2VOb3RTYXRpc2ZpYWJsZTogNDE2LFxuICBFeHBlY3RhdGlvbkZhaWxlZDogNDE3LFxuICBJbUFUZWFwb3Q6IDQxOCxcbiAgTWlzZGlyZWN0ZWRSZXF1ZXN0OiA0MjEsXG4gIFVucHJvY2Vzc2FibGVFbnRpdHk6IDQyMixcbiAgTG9ja2VkOiA0MjMsXG4gIEZhaWxlZERlcGVuZGVuY3k6IDQyNCxcbiAgVG9vRWFybHk6IDQyNSxcbiAgVXBncmFkZVJlcXVpcmVkOiA0MjYsXG4gIFByZWNvbmRpdGlvblJlcXVpcmVkOiA0MjgsXG4gIFRvb01hbnlSZXF1ZXN0czogNDI5LFxuICBSZXF1ZXN0SGVhZGVyRmllbGRzVG9vTGFyZ2U6IDQzMSxcbiAgVW5hdmFpbGFibGVGb3JMZWdhbFJlYXNvbnM6IDQ1MSxcbiAgSW50ZXJuYWxTZXJ2ZXJFcnJvcjogNTAwLFxuICBOb3RJbXBsZW1lbnRlZDogNTAxLFxuICBCYWRHYXRld2F5OiA1MDIsXG4gIFNlcnZpY2VVbmF2YWlsYWJsZTogNTAzLFxuICBHYXRld2F5VGltZW91dDogNTA0LFxuICBIdHRwVmVyc2lvbk5vdFN1cHBvcnRlZDogNTA1LFxuICBWYXJpYW50QWxzb05lZ290aWF0ZXM6IDUwNixcbiAgSW5zdWZmaWNpZW50U3RvcmFnZTogNTA3LFxuICBMb29wRGV0ZWN0ZWQ6IDUwOCxcbiAgTm90RXh0ZW5kZWQ6IDUxMCxcbiAgTmV0d29ya0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDUxMSxcbn07XG5cbk9iamVjdC5lbnRyaWVzKEh0dHBTdGF0dXNDb2RlKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgSHR0cFN0YXR1c0NvZGVbdmFsdWVdID0ga2V5O1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEh0dHBTdGF0dXNDb2RlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgYmluZCBmcm9tICcuL2hlbHBlcnMvYmluZC5qcyc7XG5pbXBvcnQgQXhpb3MgZnJvbSAnLi9jb3JlL0F4aW9zLmpzJztcbmltcG9ydCBtZXJnZUNvbmZpZyBmcm9tICcuL2NvcmUvbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IGZvcm1EYXRhVG9KU09OIGZyb20gJy4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBDYW5jZWxUb2tlbiBmcm9tICcuL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyc7XG5pbXBvcnQgaXNDYW5jZWwgZnJvbSAnLi9jYW5jZWwvaXNDYW5jZWwuanMnO1xuaW1wb3J0IHtWRVJTSU9OfSBmcm9tICcuL2Vudi9kYXRhLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vaGVscGVycy90b0Zvcm1EYXRhLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCBzcHJlYWQgZnJvbSAnLi9oZWxwZXJzL3NwcmVhZC5qcyc7XG5pbXBvcnQgaXNBeGlvc0Vycm9yIGZyb20gJy4vaGVscGVycy9pc0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi9jb3JlL0F4aW9zSGVhZGVycy5qc1wiO1xuaW1wb3J0IGFkYXB0ZXJzIGZyb20gJy4vYWRhcHRlcnMvYWRhcHRlcnMuanMnO1xuaW1wb3J0IEh0dHBTdGF0dXNDb2RlIGZyb20gJy4vaGVscGVycy9IdHRwU3RhdHVzQ29kZS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJucyB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgY29uc3QgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgY29uc3QgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCwge2FsbE93bktleXM6IHRydWV9KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0LCBudWxsLCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbiAgaW5zdGFuY2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGRlZmF1bHRDb25maWcsIGluc3RhbmNlQ29uZmlnKSk7XG4gIH07XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbmNvbnN0IGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsZWRFcnJvciA9IENhbmNlbGVkRXJyb3I7XG5heGlvcy5DYW5jZWxUb2tlbiA9IENhbmNlbFRva2VuO1xuYXhpb3MuaXNDYW5jZWwgPSBpc0NhbmNlbDtcbmF4aW9zLlZFUlNJT04gPSBWRVJTSU9OO1xuYXhpb3MudG9Gb3JtRGF0YSA9IHRvRm9ybURhdGE7XG5cbi8vIEV4cG9zZSBBeGlvc0Vycm9yIGNsYXNzXG5heGlvcy5BeGlvc0Vycm9yID0gQXhpb3NFcnJvcjtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbmF4aW9zLnNwcmVhZCA9IHNwcmVhZDtcblxuLy8gRXhwb3NlIGlzQXhpb3NFcnJvclxuYXhpb3MuaXNBeGlvc0Vycm9yID0gaXNBeGlvc0Vycm9yO1xuXG4vLyBFeHBvc2UgbWVyZ2VDb25maWdcbmF4aW9zLm1lcmdlQ29uZmlnID0gbWVyZ2VDb25maWc7XG5cbmF4aW9zLkF4aW9zSGVhZGVycyA9IEF4aW9zSGVhZGVycztcblxuYXhpb3MuZm9ybVRvSlNPTiA9IHRoaW5nID0+IGZvcm1EYXRhVG9KU09OKHV0aWxzLmlzSFRNTEZvcm0odGhpbmcpID8gbmV3IEZvcm1EYXRhKHRoaW5nKSA6IHRoaW5nKTtcblxuYXhpb3MuZ2V0QWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXI7XG5cbmF4aW9zLkh0dHBTdGF0dXNDb2RlID0gSHR0cFN0YXR1c0NvZGU7XG5cbmF4aW9zLmRlZmF1bHQgPSBheGlvcztcblxuLy8gdGhpcyBtb2R1bGUgc2hvdWxkIG9ubHkgaGF2ZSBhIGRlZmF1bHQgZXhwb3J0XG5leHBvcnQgZGVmYXVsdCBheGlvc1xuIiwiaW1wb3J0IHsgQm94LCBCdXR0b24sIERyb3Bab25lLCBJY29uIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSdcbmltcG9ydCB7IEFjdGlvblByb3BzIH0gZnJvbSAnYWRtaW5qcydcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcydcbi8qIGVzbGludC1kaXNhYmxlIHVuaWNvcm4vZmlsZW5hbWUtY2FzZSAqL1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5cbmNvbnN0IGNhbXBvc0ltYWdlbnNSZXNvdXJjZXMgPSB7XG4gIFVzdWFyaW9zOiAnYXZhdGFyJyxcbiAgRXZlbnRvczogJ2ltYWdlbScsXG4gIElncmVqYXM6ICdsb2dvJyxcbn1cblxuZXhwb3J0IGRlZmF1bHQgKHByb3BzOiBBY3Rpb25Qcm9wcykgPT4ge1xuICBjb25zdCBbZmlsZSwgc2V0RmlsZV0gPSB1c2VTdGF0ZShudWxsKVxuICBjb25zdCBbdXBsb2FkaW5nLCBzZXRVcGxvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxuICBjb25zdCB7IHJlY29yZCwgcmVzb3VyY2UgfSA9IHByb3BzXG5cbiAgY29uc3QgaGFuZGxlRHJvcCA9IChmaWxlczogYW55KSA9PiB7XG4gICAgc2V0RmlsZShmaWxlc1swXSlcbiAgfVxuXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFmaWxlKSB0aHJvdyBuZXcgRXJyb3IoJ1NlbGVjaW9uZSB1bSBhcnF1aXZvIHBhcmEgZW52aWFyIScpXG4gICAgICBpZiAoIXJlc291cmNlLmlkKSB0aHJvdyBuZXcgRXJyb3IoJ1N1YSBzZXNzw6NvIGV4cGlyb3UsIGZhw6dhIGxvZ2luIG5vdmFtZW50ZS4nKVxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgaWYgKGZpbGUuc2l6ZSAvICgxMDI0ICogMTAyNCkgPiAxMDApXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGFtYW5obyBkZSBhcnF1aXZvIGludsOhbGlkby5cXG5MaW1pdGU6IDEwME1CLicpXG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBpZiAoZmlsZS5uYW1lLmxlbmd0aCA+IDUwKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vbWUgZGUgYXJxdWl2byBpbnbDoWxpZG8uXFxuTGltaXRlOiA1MCBjYXJhY3RlcmVzLicpXG5cbiAgICAgIHNldFVwbG9hZGluZyh0cnVlKVxuXG4gICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpXG5cbiAgICAgIGZvcm1EYXRhLmFwcGVuZCgnaWQnLCByZWNvcmQ/LmlkKVxuICAgICAgZm9ybURhdGEuYXBwZW5kKCdwYXRoJywgcmVzb3VyY2UuaWQpXG4gICAgICAvL0B0cy1pZ25vcmVcbiAgICAgIGZvcm1EYXRhLmFwcGVuZCgnYXR0cmlidXRlJywgY2FtcG9zSW1hZ2Vuc1Jlc291cmNlc1tyZXNvdXJjZS5pZF0pXG4gICAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlKVxuXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnBvc3QoJy9wYWluZWwvYXJxdWl2by91cGxvYWQnLCBmb3JtRGF0YSlcblxuICAgICAgYWxlcnQocmVzcG9uc2UuZGF0YS5tZXNzYWdlKVxuICAgICAgc2V0VXBsb2FkaW5nKGZhbHNlKVxuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL2FkbWluL3Jlc291cmNlcy8ke3Jlc291cmNlLmlkfWBcbiAgICAgIH0sIDEwMDApXG4gICAgfSBjYXRjaCAoZXJybzogYW55KSB7XG4gICAgICBjb25zdCB7IG1lc3NhZ2UgfSA9IGVycm9cbiAgICAgIGlmIChtZXNzYWdlKSBzZXRFcnJvck1lc3NhZ2UobWVzc2FnZSlcbiAgICAgIGVsc2VcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKFxuICAgICAgICAgICdFcnJvIGFvIHByb2Nlc3NhciBvIGVudmlvIGRvIGFycXVpdm8uIFBvciBmYXZvciwgZW50cmUgZW0gY29udGF0byBjb20gbyBzdXBvcnRlLidcbiAgICAgICAgKVxuXG4gICAgICBzZXRVcGxvYWRpbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94XG4gICAgICBzdHlsZT17e1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICBoZWlnaHQ6ICc2MHZoJyxcbiAgICAgIH19XG4gICAgPlxuICAgICAgPGgzIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMjAsIHRleHRBbGlnbjogJ2NlbnRlcicsIGZvbnRTaXplOiAxNiB9fT5VcGxvYWQgZGUgQXJxdWl2bzwvaDM+XG4gICAgICA8RHJvcFpvbmVcbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZURyb3B9XG4gICAgICAgIG11bHRpcGxlPXtmYWxzZX1cbiAgICAgICAgdHJhbnNsYXRpb25zPXt7XG4gICAgICAgICAgcGxhY2Vob2xkZXI6ICdTZWxlY2lvbmUgb3UgYXJyYXN0ZSBvIGFycXVpdm8gYXF1aScsXG4gICAgICAgIH19XG4gICAgICAvPlxuXG4gICAgICB7ZXJyb3JNZXNzYWdlICYmIDxCb3ggc3R5bGU9e3sgY29sb3I6ICdyZWQnLCBtYXJnaW5Ub3A6IDIwIH19PntlcnJvck1lc3NhZ2V9PC9Cb3g+fVxuXG4gICAgICA8QnV0dG9uXG4gICAgICAgIG9uQ2xpY2s9e2hhbmRsZVN1Ym1pdH1cbiAgICAgICAgbXQ9XCJsZ1wiXG4gICAgICAgIGRpc2FibGVkPXshZmlsZSB8fCB1cGxvYWRpbmd9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgZm9udFNpemU6ICcxcmVtJyxcbiAgICAgICAgICBtYXJnaW5Ub3A6ICcycmVtJyxcbiAgICAgICAgICBwYWRkaW5nOiAnMC44cmVtIDEuNnJlbScsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiKDI1NCwgOTcsIDApJyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8SWNvbiBpY29uPVwiU2VuZFwiIC8+XG4gICAgICAgIHt1cGxvYWRpbmcgPyAnRW52aWFuZG8uLi4nIDogJ0Vudmlhcid9XG4gICAgICA8L0J1dHRvbj5cbiAgICA8L0JveD5cbiAgKVxufVxuIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgVVBMT0FEIGZyb20gJy4uL2FwcC9hZG1pbi9jb21wb25lbnRzL3VwbG9hZCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVVBMT0FEID0gVVBMT0FEIl0sIm5hbWVzIjpbInV0aWxzIiwicHJvdG90eXBlIiwiZW5jb2RlIiwiVVJMU2VhcmNoUGFyYW1zIiwiRm9ybURhdGEiLCJCbG9iIiwicGxhdGZvcm0iLCJ2YWxpZGF0b3JzIiwiY2FtcG9zSW1hZ2Vuc1Jlc291cmNlcyIsIlVzdWFyaW9zIiwiRXZlbnRvcyIsIklncmVqYXMiLCJwcm9wcyIsImZpbGUiLCJzZXRGaWxlIiwidXNlU3RhdGUiLCJ1cGxvYWRpbmciLCJzZXRVcGxvYWRpbmciLCJlcnJvck1lc3NhZ2UiLCJzZXRFcnJvck1lc3NhZ2UiLCJyZWNvcmQiLCJyZXNvdXJjZSIsImhhbmRsZURyb3AiLCJmaWxlcyIsImhhbmRsZVN1Ym1pdCIsIkVycm9yIiwiaWQiLCJzaXplIiwibmFtZSIsImxlbmd0aCIsImZvcm1EYXRhIiwiYXBwZW5kIiwicmVzcG9uc2UiLCJheGlvcyIsInBvc3QiLCJhbGVydCIsImRhdGEiLCJtZXNzYWdlIiwic2V0VGltZW91dCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImVycm8iLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJCb3giLCJzdHlsZSIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIiwiYWxpZ25JdGVtcyIsImp1c3RpZnlDb250ZW50IiwiaGVpZ2h0IiwibWFyZ2luQm90dG9tIiwidGV4dEFsaWduIiwiZm9udFNpemUiLCJEcm9wWm9uZSIsIm9uQ2hhbmdlIiwibXVsdGlwbGUiLCJ0cmFuc2xhdGlvbnMiLCJwbGFjZWhvbGRlciIsImNvbG9yIiwibWFyZ2luVG9wIiwiQnV0dG9uIiwib25DbGljayIsIm10IiwiZGlzYWJsZWQiLCJwYWRkaW5nIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyUmFkaXVzIiwiSWNvbiIsImljb24iLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiLCJVUExPQUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFFZSxTQUFTLElBQUksQ0FBQyxFQUFFLEVB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SztBQUNMO0VBQ0EsSUFBSSxJQUFJQSxPQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJQSxPQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFO0VBQ2pFLE1BQU0sT0FBTyxPQUFPLElBQUksT0FBTyxJQUFJLEtBQUssVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQzVGLEtBQUs7QUFDTDtFQUNBLElBQUksT0FBTyxLQUFLLENBQUM7RUFDakIsR0FBRztBQUNIO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxFQUFFLFNBQVMsY0FBYyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO0VBQzVDLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDO0FBQ3BCO0VBQ0EsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7RUFDckQsTUFBTSxJQUFJQSxPQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRTtFQUNyQztFQUNBLFFBQVEsR0FBRyxHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsRDtFQUNBLFFBQVEsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDdEMsT0FBTyxNQUFNO0VBQ2IsUUFBUSxDQUFDQSxPQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUM7RUFDbkQsU0FBUyxDQUFDQSxPQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJQSxPQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLEdB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SUFBQUEsWUFBWSxFQUFFO0VBQ1pDLE1BQUFBLFdBQVcsRUFBRSxxQ0FBQTtFQUNmLEtBQUE7S0FDRCxDQUFDLEVBRUR6QyxZQUFZLGlCQUFJeUIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUNDLElBQUFBLEtBQUssRUFBRTtFQUFFYyxNQUFBQSxLQUFLLEVBQUUsS0FBSztFQUFFQyxNQUFBQSxTQUFTLEVBQUUsRUFBQTtFQUFHLEtBQUE7RUFBRSxHQUFBLEVBQUUzQyxZQUFrQixDQUFDLGVBRWxGeUIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDa0IsbUJBQU0sRUFBQTtFQUNMQyxJQUFBQSxPQUFPLEVBQUV2QyxZQUFhO0VBQ3RCd0MsSUFBQUEsRUFBRSxFQUFDLElBQUk7RUFDUEMsSUFBQUEsUUFBUSxFQUFFLENBQUNwRCxJQUFJLElBQUlHLFNBQVU7RUFDN0I4QixJQUFBQSxLQUFLLEVBQUU7RUFDTFEsTUFBQUEsUUFBUSxFQUFFLE1BQU07RUFDaEJPLE1BQUFBLFNBQVMsRUFBRSxNQUFNO0VBQ2pCSyxNQUFBQSxPQUFPLEVBQUUsZUFBZTtFQUN4QkMsTUFBQUEsZUFBZSxFQUFFLGlCQUFpQjtFQUNsQ0MsTUFBQUEsWUFBWSxFQUFFLEtBQUs7RUFDbkJSLE1BQUFBLEtBQUssRUFBRSxPQUFBO0VBQ1QsS0FBQTtFQUFFLEdBQUEsZUFFRmpCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3lCLGlCQUFJLEVBQUE7RUFBQ0MsSUFBQUEsSUFBSSxFQUFDLE1BQUE7S0FBUSxDQUFDLEVBQ25CdEQsU0FBUyxHQUFHLGFBQWEsR0FBRyxRQUN2QixDQUNMLENBQUMsQ0FBQTtFQUVWLENBQUM7O0VDdEdEdUQsT0FBTyxDQUFDQyxjQUFjLEdBQUcsRUFBRSxDQUFBO0VBRTNCRCxPQUFPLENBQUNDLGNBQWMsQ0FBQ0MsTUFBTSxHQUFHQSxNQUFNOzs7Ozs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMSwyLDMsNCw1LDYsNyw4LDksMTAsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMTgsMTksMjAsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMjgsMjksMzAsMzEsMzIsMzMsMzQsMzUsMzYsMzcsMzgsMzksNDAsNDEsNDIsNDMsNDQsNDUsNDYsNDcsNDhdfQ==
