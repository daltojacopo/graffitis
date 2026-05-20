import { B as useContext, D as createContext, E as createComponent, M as createSignal, n as useImageState, o as increment, r as decrement, u as invariant } from "./JbfuUj.js";
//#region assets/ts/mobile/state.ts
var MobileStateContext = createContext();
function MobileStateProvider(props) {
	const imageState = useImageState();
	const [index, setIndex] = createSignal(-1);
	const [isOpen, setIsOpen] = createSignal(false);
	const [isAnimating, setIsAnimating] = createSignal(false);
	const [isScrollLocked, setIsScrollLocked] = createSignal(false);
	const updateIndex = (stride) => {
		const length = imageState().length;
		if (length <= 0) return;
		setIndex((current) => stride === 1 ? increment(current, length) : decrement(current, length));
	};
	return createComponent(MobileStateContext.Provider, {
		value: [{
			index,
			isOpen,
			isAnimating,
			isScrollLocked
		}, {
			setIndex,
			incIndex: () => {
				updateIndex(1);
			},
			decIndex: () => {
				updateIndex(-1);
			},
			setIsOpen,
			setIsAnimating,
			setIsScrollLocked
		}],
		get children() {
			return props.children;
		}
	});
}
function useMobileState() {
	const context = useContext(MobileStateContext);
	invariant(context, "undefined mobile context");
	return context;
}
//#endregion
export { useMobileState as n, MobileStateProvider as t };
