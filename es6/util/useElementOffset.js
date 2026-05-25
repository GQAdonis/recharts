function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import { useCallback, useState } from 'react';
var EPS = 1;

/**
 * TODO this documentation does not reflect what this hook is doing, update it.
 * Stores the `offsetHeight`, `offsetLeft`, `offsetTop`, and `offsetWidth` of a DOM element.
 */

/**
 * Use this to listen to element layout changes.
 *
 * Very useful for reading actual sizes of DOM elements relative to the viewport.
 *
 * @param extraDependencies use this to trigger new DOM dimensions read when any of these change. Good for things like payload and label, that will re-render something down in the children array, but you want to read the layout box of a parent.
 * @returns [lastElementOffset, updateElementOffset] most recent value, and setter. Pass the setter to a DOM element ref like this: `<div ref={updateElementOffset}>`
 */
export function useElementOffset() {
  var extraDependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _useState = useState({
      height: 0,
      left: 0,
      top: 0,
      width: 0
    }),
    _useState2 = _slicedToArray(_useState, 2),
    lastBoundingBox = _useState2[0],
    setLastBoundingBox = _useState2[1];
  var updateBoundingBox = useCallback(node => {
    if (node != null) {
      var rect = node.getBoundingClientRect();
      var box = {
        height: rect.height,
        left: rect.left,
        top: rect.top,
        width: rect.width
      };
      if (Math.abs(box.height - lastBoundingBox.height) > EPS || Math.abs(box.left - lastBoundingBox.left) > EPS || Math.abs(box.top - lastBoundingBox.top) > EPS || Math.abs(box.width - lastBoundingBox.width) > EPS) {
        setLastBoundingBox({
          height: box.height,
          left: box.left,
          top: box.top,
          width: box.width
        });
      }
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [lastBoundingBox.width, lastBoundingBox.height, lastBoundingBox.top, lastBoundingBox.left, ...extraDependencies]);
  return [lastBoundingBox, updateBoundingBox];
}