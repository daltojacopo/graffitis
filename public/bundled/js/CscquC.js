import { B as useContext, D as createContext, E as createComponent, M as createSignal, a as getThresholdSessionIndex, k as createMemo, n as useImageState, o as increment, r as decrement, u as invariant } from "./JbfuUj.js";
//#region assets/ts/configState.tsx
var thresholds = [
	{
		threshold: 20,
		trailLength: 20
	},
	{
		threshold: 40,
		trailLength: 10
	},
	{
		threshold: 80,
		trailLength: 5
	},
	{
		threshold: 140,
		trailLength: 5
	},
	{
		threshold: 200,
		trailLength: 5
	}
];
var ConfigStateContext = createContext();
function getSafeThresholdIndex() {
	const index = getThresholdSessionIndex();
	if (index < 0 || index >= thresholds.length) return 2;
	return index;
}
function ConfigStateProvider(props) {
	const [thresholdIndex, setThresholdIndex] = createSignal(getSafeThresholdIndex());
	const state = createMemo(() => {
		const current = thresholds[thresholdIndex()];
		return {
			thresholdIndex: thresholdIndex(),
			threshold: current.threshold,
			trailLength: current.trailLength
		};
	});
	const updateThreshold = (stride) => {
		const nextIndex = thresholdIndex() + stride;
		if (nextIndex < 0 || nextIndex >= thresholds.length) return;
		sessionStorage.setItem("thresholdsIndex", nextIndex.toString());
		setThresholdIndex(nextIndex);
	};
	return createComponent(ConfigStateContext.Provider, {
		value: [state, {
			incThreshold: () => {
				updateThreshold(1);
			},
			decThreshold: () => {
				updateThreshold(-1);
			}
		}],
		get children() {
			return props.children;
		}
	});
}
function useConfigState() {
	const context = useContext(ConfigStateContext);
	invariant(context, "undefined config context");
	return context;
}
//#endregion
//#region assets/ts/desktop/state.ts
var DesktopStateContext = createContext();
function DesktopStateProvider(props) {
	const imageState = useImageState();
	const [index, setIndex] = createSignal(-1);
	const [cordHist, setCordHist] = createSignal([]);
	const [hoverText, setHoverText] = createSignal("");
	const [isOpen, setIsOpen] = createSignal(false);
	const [isAnimating, setIsAnimating] = createSignal(false);
	const [isLoading, setIsLoading] = createSignal(false);
	const [navVector, setNavVector] = createSignal("none");
	const updateIndex = (stride) => {
		const length = imageState().length;
		if (length <= 0) return;
		setIndex((current) => stride === 1 ? increment(current, length) : decrement(current, length));
	};
	return createComponent(DesktopStateContext.Provider, {
		value: [{
			index,
			cordHist,
			hoverText,
			isOpen,
			isAnimating,
			isLoading,
			navVector
		}, {
			setIndex,
			incIndex: () => {
				updateIndex(1);
			},
			decIndex: () => {
				updateIndex(-1);
			},
			setCordHist,
			setHoverText,
			setIsOpen,
			setIsAnimating,
			setIsLoading,
			setNavVector
		}],
		get children() {
			return props.children;
		}
	});
}
function useDesktopState() {
	const context = useContext(DesktopStateContext);
	invariant(context, "undefined desktop context");
	return context;
}
//#endregion
export { useConfigState as i, useDesktopState as n, ConfigStateProvider as r, DesktopStateProvider as t };
