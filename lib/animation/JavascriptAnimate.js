"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JavascriptAnimate = JavascriptAnimate;
var _react = require("react");
var _DataUtils = require("../util/DataUtils");
var _resolveDefaultProps = require("../util/resolveDefaultProps");
var _configUpdate = _interopRequireDefault(require("./configUpdate"));
var _easing = require("./easing");
var _useAnimationManager = require("./useAnimationManager");
var _Global = require("../util/Global");
var _usePrefersReducedMotion = require("../util/usePrefersReducedMotion");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var defaultJavascriptAnimateProps = {
  begin: 0,
  duration: 1000,
  easing: 'ease',
  isActive: true,
  canBegin: true,
  onAnimationEnd: () => {},
  onAnimationStart: () => {}
};
var from = {
  t: 0
};
var to = {
  t: 1
};
function JavascriptAnimate(outsideProps) {
  var props = (0, _resolveDefaultProps.resolveDefaultProps)(outsideProps, defaultJavascriptAnimateProps);
  var isActiveProp = props.isActive,
    canBegin = props.canBegin,
    duration = props.duration,
    easing = props.easing,
    begin = props.begin,
    onAnimationEnd = props.onAnimationEnd,
    onAnimationStart = props.onAnimationStart,
    children = props.children;
  var prefersReducedMotion = (0, _usePrefersReducedMotion.usePrefersReducedMotion)();
  var isActive = isActiveProp === 'auto' ? !_Global.Global.isSsr && !prefersReducedMotion : isActiveProp;
  var animationManager = (0, _useAnimationManager.useAnimationManager)(props.animationId, props.animationManager);
  var _useState = (0, _react.useState)(isActive ? from : to),
    _useState2 = _slicedToArray(_useState, 2),
    style = _useState2[0],
    setStyle = _useState2[1];
  var stopJSAnimation = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    if (!isActive) {
      setStyle(to);
    }
  }, [isActive]);
  (0, _react.useEffect)(() => {
    if (!isActive || !canBegin) {
      return _DataUtils.noop;
    }
    var startAnimation = (0, _configUpdate.default)(from, to, (0, _easing.configEasing)(easing), duration, setStyle, animationManager.getTimeoutController());
    var onAnimationActive = () => {
      stopJSAnimation.current = startAnimation();
    };
    animationManager.start([onAnimationStart, begin, onAnimationActive, duration, onAnimationEnd]);
    return () => {
      animationManager.stop();
      if (stopJSAnimation.current) {
        stopJSAnimation.current();
      }
      onAnimationEnd();
    };
  }, [isActive, canBegin, duration, easing, begin, onAnimationStart, onAnimationEnd, animationManager]);
  return children(style.t);
}