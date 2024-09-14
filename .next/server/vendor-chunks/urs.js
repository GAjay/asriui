"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/urs";
exports.ids = ["vendor-chunks/urs"];
exports.modules = {

/***/ "(ssr)/./node_modules/urs/dist/useRefState.js":
/*!**********************************************!*\
  !*** ./node_modules/urs/dist/useRefState.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar react_1 = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/**\n * Determines if the given param is an object. {}\n * @param obj\n */\nexports.isObject = function (obj) { return Object.prototype.toString.call(obj) === '[object Object]'; }; // eslint-disable-line\nvar useMounted = function () {\n    var mounted = react_1.useRef(false);\n    react_1.useEffect(function () {\n        mounted.current = true;\n        return function () {\n            mounted.current = false;\n        };\n    }, []);\n    return mounted;\n};\nfunction useRefState(initialState, blockIfUnmounted) {\n    if (blockIfUnmounted === void 0) { blockIfUnmounted = true; }\n    var mounted = useMounted();\n    var _a = react_1.useState(initialState), reactState = _a[0], setReactState = _a[1];\n    var state = react_1.useRef(reactState);\n    var setState = react_1.useCallback(function (arg) {\n        if (!mounted.current && blockIfUnmounted)\n            return;\n        state.current = (typeof arg === 'function') ? arg(state.current) : arg;\n        setReactState(state.current);\n    }, []);\n    return [state, setState];\n}\nexports.useRefState = useRefState;\nexports[\"default\"] = useRefState;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdXJzL2Rpc3QvdXNlUmVmU3RhdGUuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsY0FBYyxtQkFBTyxDQUFDLHdHQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG9CQUFvQixxRUFBcUU7QUFDekc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixrQkFBZSIsInNvdXJjZXMiOlsid2VicGFjazovL2NoYXJnZXFpay8uL25vZGVfbW9kdWxlcy91cnMvZGlzdC91c2VSZWZTdGF0ZS5qcz9mYjlhIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJlYWN0XzEgPSByZXF1aXJlKFwicmVhY3RcIik7XG4vKipcbiAqIERldGVybWluZXMgaWYgdGhlIGdpdmVuIHBhcmFtIGlzIGFuIG9iamVjdC4ge31cbiAqIEBwYXJhbSBvYmpcbiAqL1xuZXhwb3J0cy5pc09iamVjdCA9IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBPYmplY3RdJzsgfTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxudmFyIHVzZU1vdW50ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG1vdW50ZWQgPSByZWFjdF8xLnVzZVJlZihmYWxzZSk7XG4gICAgcmVhY3RfMS51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBtb3VudGVkLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbW91bnRlZC5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgfSwgW10pO1xuICAgIHJldHVybiBtb3VudGVkO1xufTtcbmZ1bmN0aW9uIHVzZVJlZlN0YXRlKGluaXRpYWxTdGF0ZSwgYmxvY2tJZlVubW91bnRlZCkge1xuICAgIGlmIChibG9ja0lmVW5tb3VudGVkID09PSB2b2lkIDApIHsgYmxvY2tJZlVubW91bnRlZCA9IHRydWU7IH1cbiAgICB2YXIgbW91bnRlZCA9IHVzZU1vdW50ZWQoKTtcbiAgICB2YXIgX2EgPSByZWFjdF8xLnVzZVN0YXRlKGluaXRpYWxTdGF0ZSksIHJlYWN0U3RhdGUgPSBfYVswXSwgc2V0UmVhY3RTdGF0ZSA9IF9hWzFdO1xuICAgIHZhciBzdGF0ZSA9IHJlYWN0XzEudXNlUmVmKHJlYWN0U3RhdGUpO1xuICAgIHZhciBzZXRTdGF0ZSA9IHJlYWN0XzEudXNlQ2FsbGJhY2soZnVuY3Rpb24gKGFyZykge1xuICAgICAgICBpZiAoIW1vdW50ZWQuY3VycmVudCAmJiBibG9ja0lmVW5tb3VudGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBzdGF0ZS5jdXJyZW50ID0gKHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbicpID8gYXJnKHN0YXRlLmN1cnJlbnQpIDogYXJnO1xuICAgICAgICBzZXRSZWFjdFN0YXRlKHN0YXRlLmN1cnJlbnQpO1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gW3N0YXRlLCBzZXRTdGF0ZV07XG59XG5leHBvcnRzLnVzZVJlZlN0YXRlID0gdXNlUmVmU3RhdGU7XG5leHBvcnRzLmRlZmF1bHQgPSB1c2VSZWZTdGF0ZTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/urs/dist/useRefState.js\n");

/***/ })

};
;