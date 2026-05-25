function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import { useCallback, useEffect, useRef, useState } from 'react';
import { noop } from '../util/DataUtils';
import { resolveDefaultProps } from '../util/resolveDefaultProps';
import { useAnimationManager } from './useAnimationManager';
import { getTransitionVal } from './util';
import { Global } from '../util/Global';
import { usePrefersReducedMotion } from '../util/usePrefersReducedMotion';
var defaultProps = {
  begin: 0,
  duration: 1000,
  easing: 'ease',
  isActive: true,
  canBegin: true,
  onAnimationEnd: () => {},
  onAnimationStart: () => {}
};
export function CSSTransitionAnimate(outsideProps) {
  var props = resolveDefaultProps(outsideProps, defaultProps);
  var animationId = props.animationId,
    from = props.from,
    to = props.to,
    attributeName = props.attributeName,
    isActiveProp = props.isActive,
    canBegin = props.canBegin,
    duration = props.duration,
    easing = props.easing,
    begin = props.begin,
    onAnimationEnd = props.onAnimationEnd,
    onAnimationStartFromProps = props.onAnimationStart,
    children = props.children;
  var prefersReducedMotion = usePrefersReducedMotion();
  var isActive = isActiveProp === 'auto' ? !Global.isSsr && !prefersReducedMotion : isActiveProp;
  var animationManager = useAnimationManager(animationId + attributeName, props.animationManager);
  var _useState = useState(() => {
      if (!isActive) {
        return to;
      }
      return from;
    }),
    _useState2 = _slicedToArray(_useState, 2),
    style = _useState2[0],
    setStyle = _useState2[1];
  var initialized = useRef(false);
  var onAnimationStart = useCallback(() => {
    setStyle(from);
    onAnimationStartFromProps();
  }, [from, onAnimationStartFromProps]);
  useEffect(() => {
    if (!isActive || !canBegin) {
      return noop;
    }
    initialized.current = true;
    var unsubscribe = animationManager.subscribe(setStyle);
    animationManager.start([onAnimationStart, begin, to, duration, onAnimationEnd]);
    return () => {
      animationManager.stop();
      if (unsubscribe) {
        unsubscribe();
      }
      onAnimationEnd();
    };
  }, [isActive, canBegin, duration, easing, begin, onAnimationStart, onAnimationEnd, animationManager, to, from]);
  if (!isActive) {
    /*
     * With isActive=false, the component always renders with the final style, immediately,
     * and ignores all other props.
     * Also there is no transition applied.
     */
    return children({
      [attributeName]: to
    });
  }
  if (!canBegin) {
    return children({
      [attributeName]: from
    });
  }
  if (initialized.current) {
    var transition = getTransitionVal([attributeName], duration, easing);
    return children({
      transition,
      [attributeName]: style
    });
  }
  return children({
    [attributeName]: from
  });
}