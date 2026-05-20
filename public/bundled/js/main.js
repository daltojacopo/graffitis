const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["js/J9WuFH.js","js/JbfuUj.js","js/CscquC.js","js/B-2NQ8.js","js/Bf_rSH.js"])))=>i.map(i=>d[i]);
import { C as Show, E as createComponent, P as lazy, S as Match, _ as template, j as createResource, l as __vitePreload, p as render, t as ImageStateProvider, w as Switch } from "./JbfuUj.js";
import { r as ConfigStateProvider, t as DesktopStateProvider } from "./CscquC.js";
import { t as MobileStateProvider } from "./Bf_rSH.js";
//#region assets/ts/resources.ts
async function getImageJSON() {
	if (document.title.split(" | ")[0] === "404") return [];
	const ogUrlMetaTag = document.querySelector("meta[property=\"og:url\"]");
	const indexJsonUrl = ogUrlMetaTag?.content ? new URL("index.json", ogUrlMetaTag.content).href : new URL("index.json", window.location.href).href;
	try {
		return (await (await fetch(indexJsonUrl, { headers: { Accept: "application/json" } })).json()).sort((a, b) => {
			if (a.index < b.index) return -1;
			return 1;
		});
	} catch (e) {
		console.error(e);
		return [];
	}
}
//#endregion
//#region assets/ts/main.tsx
var _tmpl$ = /* @__PURE__ */ template(`<div>Error`);
var container = document.getElementsByClassName("container")[0];
var Desktop = lazy(async () => await __vitePreload(() => import("./J9WuFH.js"), __vite__mapDeps([0,1,2])));
var Mobile = lazy(async () => await __vitePreload(() => import("./B-2NQ8.js"), __vite__mapDeps([3,1,4])));
function AppContent(props) {
	return createComponent(Switch, {
		get fallback() {
			return _tmpl$();
		},
		get children() {
			return [createComponent(Match, {
				get when() {
					return props.isMobile;
				},
				get children() {
					return createComponent(MobileStateProvider, { get children() {
						return createComponent(Mobile, {
							get closeText() {
								return props.closeText;
							},
							get loadingText() {
								return props.loadingText;
							}
						});
					} });
				}
			}), createComponent(Match, {
				get when() {
					return !props.isMobile;
				},
				get children() {
					return createComponent(DesktopStateProvider, { get children() {
						return createComponent(Desktop, {
							get prevText() {
								return props.prevText;
							},
							get closeText() {
								return props.closeText;
							},
							get nextText() {
								return props.nextText;
							},
							get loadingText() {
								return props.loadingText;
							}
						});
					} });
				}
			})];
		}
	});
}
function Main() {
	const [ijs] = createResource(getImageJSON);
	const ua = window.navigator.userAgent.toLowerCase();
	const hasTouchInput = "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
	const hasTouchLayout = window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches;
	const isMobileUA = /android|iphone|ipad|ipod|mobile/.test(ua);
	const isWindowsDesktop = /windows nt/.test(ua);
	const isMobile = isMobileUA || hasTouchInput && hasTouchLayout && !isWindowsDesktop;
	return createComponent(Show, {
		get when() {
			return ijs.state === "ready";
		},
		get children() {
			return createComponent(ImageStateProvider, {
				get images() {
					return ijs() ?? [];
				},
				get children() {
					return createComponent(ConfigStateProvider, { get children() {
						return createComponent(AppContent, {
							isMobile,
							get prevText() {
								return container.dataset.prev;
							},
							get closeText() {
								return container.dataset.close;
							},
							get nextText() {
								return container.dataset.next;
							},
							get loadingText() {
								return container.dataset.loading;
							}
						});
					} });
				}
			});
		}
	});
}
render(() => createComponent(Main, {}), container);
//#endregion
