var _excluded = ["shape", "activeShape", "cornerRadius", "id"],
  _excluded2 = ["onMouseEnter", "onClick", "onMouseLeave"],
  _excluded3 = ["value", "background"];
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import * as React from 'react';
import { PureComponent, useCallback, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { defaultRadialBarShape, parseCornerRadius, RadialBarSector } from '../util/RadialBarUtils';
import { Layer } from '../container/Layer';
import { findAllByType } from '../util/ReactUtils';
import { LabelListFromLabelProp, PolarLabelListContextProvider } from '../component/LabelList';
import { Cell } from '../component/Cell';
import { interpolate, mathSign, noop } from '../util/DataUtils';
import { getCateCoordinateOfBar, getNormalizedStackId, getTooltipNameProp, getValueByDataKey, truncateByDomain } from '../util/ChartUtils';
import { adaptEventsOfChild } from '../util/types';
import { useMouseClickItemDispatch, useMouseEnterItemDispatch, useMouseLeaveItemDispatch } from '../context/tooltipContext';
import { SetTooltipEntrySettings } from '../state/SetTooltipEntrySettings';
import { selectRadialBarLegendPayload, selectRadialBarSectors } from '../state/selectors/radialBarSelectors';
import { useAppSelector } from '../state/hooks';
import { selectActiveTooltipIndex } from '../state/selectors/tooltipSelectors';
import { SetPolarLegendPayload } from '../state/SetLegendPayload';
import { useAnimationId } from '../util/useAnimationId';
import { RegisterGraphicalItemId } from '../context/RegisterGraphicalItemId';
import { SetPolarGraphicalItem } from '../state/SetGraphicalItem';
import { svgPropertiesNoEvents, svgPropertiesNoEventsFromUnknown } from '../util/svgPropertiesNoEvents';
import { JavascriptAnimate } from '../animation/JavascriptAnimate';
import { resolveDefaultProps } from '../util/resolveDefaultProps';
import { ZIndexLayer } from '../zIndex/ZIndexLayer';
import { DefaultZIndexes } from '../zIndex/DefaultZIndexes';
import { getZIndexFromUnknown } from '../zIndex/getZIndexFromUnknown';
var STABLE_EMPTY_ARRAY = [];
function RadialBarLabelListProvider(_ref) {
  var showLabels = _ref.showLabels,
    sectors = _ref.sectors,
    children = _ref.children;
  var labelListEntries = sectors.map(sector => ({
    value: sector.value,
    payload: sector.payload,
    parentViewBox: undefined,
    clockWise: false,
    viewBox: {
      cx: sector.cx,
      cy: sector.cy,
      innerRadius: sector.innerRadius,
      outerRadius: sector.outerRadius,
      startAngle: sector.startAngle,
      endAngle: sector.endAngle,
      clockWise: false
    },
    fill: sector.fill
  }));
  return /*#__PURE__*/React.createElement(PolarLabelListContextProvider, {
    value: showLabels ? labelListEntries : undefined
  }, children);
}
function RadialBarSectors(_ref2) {
  var sectors = _ref2.sectors,
    allOtherRadialBarProps = _ref2.allOtherRadialBarProps,
    showLabels = _ref2.showLabels;
  var shape = allOtherRadialBarProps.shape,
    activeShape = allOtherRadialBarProps.activeShape,
    cornerRadius = allOtherRadialBarProps.cornerRadius,
    id = allOtherRadialBarProps.id,
    others = _objectWithoutProperties(allOtherRadialBarProps, _excluded);
  var baseProps = svgPropertiesNoEvents(others);
  var activeIndex = useAppSelector(selectActiveTooltipIndex);
  var onMouseEnterFromProps = allOtherRadialBarProps.onMouseEnter,
    onItemClickFromProps = allOtherRadialBarProps.onClick,
    onMouseLeaveFromProps = allOtherRadialBarProps.onMouseLeave,
    restOfAllOtherProps = _objectWithoutProperties(allOtherRadialBarProps, _excluded2);
  var onMouseEnterFromContext = useMouseEnterItemDispatch(onMouseEnterFromProps, allOtherRadialBarProps.dataKey, id);
  var onMouseLeaveFromContext = useMouseLeaveItemDispatch(onMouseLeaveFromProps);
  var onClickFromContext = useMouseClickItemDispatch(onItemClickFromProps, allOtherRadialBarProps.dataKey, id);
  if (sectors == null) {
    return null;
  }
  return /*#__PURE__*/React.createElement(RadialBarLabelListProvider, {
    showLabels: showLabels,
    sectors: sectors
  }, sectors.map((entry, i) => {
    var isActive = Boolean(activeShape && activeIndex === String(i));
    var onMouseEnter = onMouseEnterFromContext(entry, i);
    var onMouseLeave = onMouseLeaveFromContext(entry, i);
    var onClick = onClickFromContext(entry, i);
    var radialBarSectorProps = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, baseProps), {}, {
      cornerRadius: parseCornerRadius(cornerRadius)
    }, entry), adaptEventsOfChild(restOfAllOtherProps, entry, i)), {}, {
      onMouseEnter,
      onMouseLeave,
      onClick,
      className: "recharts-radial-bar-sector ".concat(entry.className),
      forceCornerRadius: others.forceCornerRadius,
      cornerIsExternal: others.cornerIsExternal,
      isActive,
      option: isActive && activeShape != null ? activeShape : shape,
      index: i
    });
    if (isActive) {
      return /*#__PURE__*/React.createElement(ZIndexLayer, {
        zIndex: DefaultZIndexes.activeBar,
        key: "sector-".concat(entry.cx, "-").concat(entry.cy, "-").concat(entry.innerRadius, "-").concat(entry.outerRadius, "-").concat(entry.startAngle, "-").concat(entry.endAngle, "-").concat(i)
      }, /*#__PURE__*/React.createElement(RadialBarSector, radialBarSectorProps));
    }
    return /*#__PURE__*/React.createElement(RadialBarSector, _extends({
      key: "sector-".concat(entry.cx, "-").concat(entry.cy, "-").concat(entry.innerRadius, "-").concat(entry.outerRadius, "-").concat(entry.startAngle, "-").concat(entry.endAngle, "-").concat(i)
    }, radialBarSectorProps));
  }), /*#__PURE__*/React.createElement(LabelListFromLabelProp, {
    label: allOtherRadialBarProps.label
  }), allOtherRadialBarProps.children);
}
function SectorsWithAnimation(_ref3) {
  var props = _ref3.props,
    previousSectorsRef = _ref3.previousSectorsRef;
  var sectors = props.sectors,
    isAnimationActive = props.isAnimationActive,
    animationBegin = props.animationBegin,
    animationDuration = props.animationDuration,
    animationEasing = props.animationEasing,
    onAnimationEnd = props.onAnimationEnd,
    onAnimationStart = props.onAnimationStart;
  var animationId = useAnimationId(props, 'recharts-radialbar-');
  var prevData = previousSectorsRef.current;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isAnimating = _useState2[0],
    setIsAnimating = _useState2[1];
  var handleAnimationEnd = useCallback(() => {
    if (typeof onAnimationEnd === 'function') {
      onAnimationEnd();
    }
    setIsAnimating(false);
  }, [onAnimationEnd]);
  var handleAnimationStart = useCallback(() => {
    if (typeof onAnimationStart === 'function') {
      onAnimationStart();
    }
    setIsAnimating(true);
  }, [onAnimationStart]);
  return /*#__PURE__*/React.createElement(JavascriptAnimate, {
    animationId: animationId,
    begin: animationBegin,
    duration: animationDuration,
    isActive: isAnimationActive,
    easing: animationEasing,
    onAnimationStart: handleAnimationStart,
    onAnimationEnd: handleAnimationEnd,
    key: animationId
  }, t => {
    var stepData = t === 1 ? sectors : (sectors !== null && sectors !== void 0 ? sectors : STABLE_EMPTY_ARRAY).map((entry, index) => {
      var prev = prevData && prevData[index];
      if (prev) {
        return _objectSpread(_objectSpread({}, entry), {}, {
          startAngle: interpolate(prev.startAngle, entry.startAngle, t),
          endAngle: interpolate(prev.endAngle, entry.endAngle, t)
        });
      }
      var endAngle = entry.endAngle,
        startAngle = entry.startAngle;
      return _objectSpread(_objectSpread({}, entry), {}, {
        endAngle: interpolate(startAngle, endAngle, t)
      });
    });
    if (t > 0) {
      // eslint-disable-next-line no-param-reassign
      previousSectorsRef.current = stepData !== null && stepData !== void 0 ? stepData : null;
    }
    return /*#__PURE__*/React.createElement(RadialBarSectors, {
      sectors: stepData !== null && stepData !== void 0 ? stepData : STABLE_EMPTY_ARRAY,
      allOtherRadialBarProps: props,
      showLabels: !isAnimating
    });
  });
}
function RenderSectors(props) {
  var previousSectorsRef = useRef(null);
  return /*#__PURE__*/React.createElement(SectorsWithAnimation, {
    props: props,
    previousSectorsRef: previousSectorsRef
  });
}
function SetRadialBarPayloadLegend(props) {
  var legendPayload = useAppSelector(state => selectRadialBarLegendPayload(state, props.legendType));
  return /*#__PURE__*/React.createElement(SetPolarLegendPayload, {
    legendPayload: legendPayload !== null && legendPayload !== void 0 ? legendPayload : []
  });
}
var SetRadialBarTooltipEntrySettings = /*#__PURE__*/React.memo(_ref4 => {
  var dataKey = _ref4.dataKey,
    sectors = _ref4.sectors,
    stroke = _ref4.stroke,
    strokeWidth = _ref4.strokeWidth,
    name = _ref4.name,
    hide = _ref4.hide,
    fill = _ref4.fill,
    tooltipType = _ref4.tooltipType,
    id = _ref4.id;
  var tooltipEntrySettings = {
    dataDefinedOnItem: sectors,
    getPosition: noop,
    settings: {
      graphicalItemId: id,
      stroke,
      strokeWidth,
      fill,
      nameKey: undefined,
      // RadialBar does not have nameKey, why?
      dataKey,
      name: getTooltipNameProp(name, dataKey),
      hide,
      type: tooltipType,
      color: fill,
      unit: '' // Why does RadialBar not support unit?
    }
  };
  return /*#__PURE__*/React.createElement(SetTooltipEntrySettings, {
    tooltipEntrySettings: tooltipEntrySettings
  });
});
class RadialBarWithState extends PureComponent {
  renderBackground(sectors) {
    if (sectors == null) {
      return null;
    }
    var cornerRadius = this.props.cornerRadius;
    var backgroundProps = svgPropertiesNoEventsFromUnknown(this.props.background);
    return /*#__PURE__*/React.createElement(ZIndexLayer, {
      zIndex: getZIndexFromUnknown(this.props.background, DefaultZIndexes.barBackground)
    }, sectors.map((entry, i) => {
      var value = entry.value,
        background = entry.background,
        rest = _objectWithoutProperties(entry, _excluded3);
      if (!background) {
        return null;
      }
      var props = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
        cornerRadius: parseCornerRadius(cornerRadius)
      }, rest), {}, {
        // @ts-expect-error backgroundProps is contributing unknown props
        fill: '#eee'
      }, background), backgroundProps), adaptEventsOfChild(this.props, entry, i)), {}, {
        index: i,
        className: clsx('recharts-radial-bar-background-sector', String(backgroundProps === null || backgroundProps === void 0 ? void 0 : backgroundProps.className)),
        option: background,
        isActive: false
      });
      return /*#__PURE__*/React.createElement(RadialBarSector, _extends({
        key: "background-".concat(rest.cx, "-").concat(rest.cy, "-").concat(rest.innerRadius, "-").concat(rest.outerRadius, "-").concat(rest.startAngle, "-").concat(rest.endAngle, "-").concat(i)
      }, props));
    }));
  }
  render() {
    var _this$props = this.props,
      hide = _this$props.hide,
      sectors = _this$props.sectors,
      className = _this$props.className,
      background = _this$props.background;
    if (hide) {
      return null;
    }
    var layerClass = clsx('recharts-area', className);
    return /*#__PURE__*/React.createElement(ZIndexLayer, {
      zIndex: this.props.zIndex
    }, /*#__PURE__*/React.createElement(Layer, {
      className: layerClass
    }, background && /*#__PURE__*/React.createElement(Layer, {
      className: "recharts-radial-bar-background"
    }, this.renderBackground(sectors)), /*#__PURE__*/React.createElement(Layer, {
      className: "recharts-radial-bar-sectors"
    }, /*#__PURE__*/React.createElement(RenderSectors, this.props))));
  }
}
function RadialBarImpl(props) {
  var _useAppSelector;
  var cells = React.useMemo(() => findAllByType(props.children, Cell), [props.children]);
  var radialBarSettings = React.useMemo(() => ({
    data: undefined,
    hide: false,
    id: props.id,
    dataKey: props.dataKey,
    minPointSize: props.minPointSize,
    stackId: getNormalizedStackId(props.stackId),
    maxBarSize: props.maxBarSize,
    barSize: props.barSize,
    type: 'radialBar',
    angleAxisId: props.angleAxisId,
    radiusAxisId: props.radiusAxisId
  }), [props.id, props.dataKey, props.minPointSize, props.stackId, props.maxBarSize, props.barSize, props.angleAxisId, props.radiusAxisId]);
  var sectors = (_useAppSelector = useAppSelector(state => selectRadialBarSectors(state, props.radiusAxisId, props.angleAxisId, radialBarSettings, cells))) !== null && _useAppSelector !== void 0 ? _useAppSelector : STABLE_EMPTY_ARRAY;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SetRadialBarTooltipEntrySettings, {
    dataKey: props.dataKey,
    sectors: sectors,
    stroke: props.stroke,
    strokeWidth: props.strokeWidth,
    name: props.name,
    hide: props.hide,
    fill: props.fill,
    tooltipType: props.tooltipType,
    id: props.id
  }), /*#__PURE__*/React.createElement(RadialBarWithState, _extends({}, props, {
    sectors: sectors
  })));
}
export var defaultRadialBarProps = {
  angleAxisId: 0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease',
  background: false,
  cornerIsExternal: false,
  cornerRadius: 0,
  forceCornerRadius: false,
  hide: false,
  isAnimationActive: 'auto',
  label: false,
  legendType: 'rect',
  minPointSize: 0,
  radiusAxisId: 0,
  shape: defaultRadialBarShape,
  zIndex: DefaultZIndexes.bar
};
export function computeRadialBarDataItems(_ref5) {
  var displayedData = _ref5.displayedData,
    stackedData = _ref5.stackedData,
    dataStartIndex = _ref5.dataStartIndex,
    stackedDomain = _ref5.stackedDomain,
    dataKey = _ref5.dataKey,
    baseValue = _ref5.baseValue,
    layout = _ref5.layout,
    radiusAxis = _ref5.radiusAxis,
    radiusAxisTicks = _ref5.radiusAxisTicks,
    bandSize = _ref5.bandSize,
    pos = _ref5.pos,
    angleAxis = _ref5.angleAxis,
    minPointSize = _ref5.minPointSize,
    cx = _ref5.cx,
    cy = _ref5.cy,
    angleAxisTicks = _ref5.angleAxisTicks,
    cells = _ref5.cells,
    rootStartAngle = _ref5.startAngle,
    rootEndAngle = _ref5.endAngle;
  if (angleAxisTicks == null || radiusAxisTicks == null) {
    return STABLE_EMPTY_ARRAY;
  }
  return (displayedData !== null && displayedData !== void 0 ? displayedData : []).map((entry, index) => {
    var value, innerRadius, outerRadius, startAngle, endAngle, backgroundSector;
    if (stackedData) {
      // @ts-expect-error truncateByDomain expects only numerical domain, but it can received categorical domain too
      value = truncateByDomain(stackedData[dataStartIndex + index], stackedDomain);
    } else {
      value = getValueByDataKey(entry, dataKey);
      if (!Array.isArray(value)) {
        value = [baseValue, value];
      }
    }
    if (layout === 'radial') {
      var _angleAxis$scale$map, _angleAxis$scale$map2;
      startAngle = (_angleAxis$scale$map = angleAxis.scale.map(value[0])) !== null && _angleAxis$scale$map !== void 0 ? _angleAxis$scale$map : rootStartAngle;
      endAngle = (_angleAxis$scale$map2 = angleAxis.scale.map(value[1])) !== null && _angleAxis$scale$map2 !== void 0 ? _angleAxis$scale$map2 : rootEndAngle;
      innerRadius = getCateCoordinateOfBar({
        axis: radiusAxis,
        ticks: radiusAxisTicks,
        bandSize,
        offset: pos.offset,
        entry,
        index
      });
      if (innerRadius != null && endAngle != null && startAngle != null) {
        outerRadius = innerRadius + pos.size;
        var deltaAngle = endAngle - startAngle;
        if (Math.abs(minPointSize) > 0 && Math.abs(deltaAngle) < Math.abs(minPointSize)) {
          var delta = mathSign(deltaAngle || minPointSize) * (Math.abs(minPointSize) - Math.abs(deltaAngle));
          endAngle += delta;
        }
        backgroundSector = {
          background: {
            cx,
            cy,
            innerRadius,
            outerRadius,
            startAngle: rootStartAngle,
            endAngle: rootEndAngle
          }
        };
      }
    } else {
      innerRadius = radiusAxis.scale.map(value[0]);
      outerRadius = radiusAxis.scale.map(value[1]);
      startAngle = getCateCoordinateOfBar({
        axis: angleAxis,
        ticks: angleAxisTicks,
        bandSize,
        offset: pos.offset,
        entry,
        index
      });
      if (innerRadius != null && outerRadius != null && startAngle != null) {
        endAngle = startAngle + pos.size;
        var deltaRadius = outerRadius - innerRadius;
        if (Math.abs(minPointSize) > 0 && Math.abs(deltaRadius) < Math.abs(minPointSize)) {
          var _delta = mathSign(deltaRadius || minPointSize) * (Math.abs(minPointSize) - Math.abs(deltaRadius));
          outerRadius += _delta;
        }
      }
    }
    return _objectSpread(_objectSpread(_objectSpread({}, entry), backgroundSector), {}, {
      payload: entry,
      value: stackedData ? value : value[1],
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      // @ts-expect-error endAngle is used before assigned (?)
      endAngle
    }, cells && cells[index] && cells[index].props);
  });
}

/**
 * @consumes PolarChartContext
 * @provides LabelListContext
 * @provides CellReader
 */
export function RadialBar(outsideProps) {
  var props = resolveDefaultProps(outsideProps, defaultRadialBarProps);
  return /*#__PURE__*/React.createElement(RegisterGraphicalItemId, {
    id: props.id,
    type: "radialBar"
  }, id => {
    var _props$hide, _props$angleAxisId, _props$radiusAxisId;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SetPolarGraphicalItem, {
      type: "radialBar",
      id: id,
      data: undefined // why does RadialBar not allow data defined on the item?
      ,
      dataKey: props.dataKey,
      hide: (_props$hide = props.hide) !== null && _props$hide !== void 0 ? _props$hide : defaultRadialBarProps.hide,
      angleAxisId: (_props$angleAxisId = props.angleAxisId) !== null && _props$angleAxisId !== void 0 ? _props$angleAxisId : defaultRadialBarProps.angleAxisId,
      radiusAxisId: (_props$radiusAxisId = props.radiusAxisId) !== null && _props$radiusAxisId !== void 0 ? _props$radiusAxisId : defaultRadialBarProps.radiusAxisId,
      stackId: getNormalizedStackId(props.stackId),
      barSize: props.barSize,
      minPointSize: props.minPointSize,
      maxBarSize: props.maxBarSize
    }), /*#__PURE__*/React.createElement(SetRadialBarPayloadLegend, props), /*#__PURE__*/React.createElement(RadialBarImpl, _extends({}, props, {
      id: id
    })));
  });
}
RadialBar.displayName = 'RadialBar';