import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as Download, N as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as Button, t as AureaMark } from "./button-vRa2F1t9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/install-eOYo-C7F.js
var import_jsx_runtime = require_jsx_runtime();
function InstallPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mx-auto flex max-w-3xl items-center justify-between px-5 py-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex items-center gap-2 text-sm font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AureaMark, { className: "size-7" })
				}), "Aurea"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/desk",
				search: {
					m: "home",
					v: "workspace"
				},
				className: "text-sm text-muted hover:text-fg",
				children: "Open desk"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-3xl px-5 pb-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center gap-1 text-xs text-muted hover:text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), " Back"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-4 text-4xl md:text-5xl",
					children: "Install on any ERPNext"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
					children: [
						"Aurea is a standard Frappe custom app. Drop it on a bench, install it on a site, rebuild assets. The Desk restyles globally — workspaces, lists, forms, kanban, chatter, login — without patching ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "text-fg",
							children: "frappe"
						}),
						" or ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "text-fg",
							children: "erpnext"
						}),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/aurea_theme.zip",
					download: true,
					className: "mt-6 inline-flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Download aurea_theme.zip"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-10 space-y-6",
					children: [
						["Place the app on your bench", "Unzip into apps/aurea_theme so the folder contains setup.py, pyproject.toml and the aurea_theme Python package."],
						["Register and install", "bench get-app is optional if the folder is already there. Then: bench --site [site] install-app aurea_theme && bench build --app aurea_theme && bench --site [site] clear-cache && bench restart."],
						["Confirm the Desk", "Hard-refresh /app. You should see the dark app rail, Plus Jakarta type, and harbor teal primary buttons. Search Aurea Settings to change accent, density, and dark mode."]
					].map(([t, b], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-fg",
							children: i + 1
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold text-fg",
							children: t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-relaxed text-muted",
							children: b
						})] })]
					}, t))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12 rounded-xl bg-surface p-5 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Compatibility"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: [
							"Built against Frappe v14 / v15 / v16 and ERPNext v14–v16. Hooks used:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "app_include_css" }),
							", ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "app_include_js" }),
							", ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "web_include_css" }),
							",",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "web_include_js" }),
							", ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "boot_session" }),
							", ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "after_install" }),
							". Uninstall removes the skin; no DocTypes in ERPNext are modified."
						]
					})]
				})
			]
		})]
	});
}
//#endregion
export { InstallPage as component };
