import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-vRa2F1t9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function sar(value) {
	return new Intl.NumberFormat("en-SA", {
		style: "currency",
		currency: "SAR",
		maximumFractionDigits: 0
	}).format(value);
}
function sarExact(value) {
	return new Intl.NumberFormat("en-SA", {
		style: "currency",
		currency: "SAR",
		minimumFractionDigits: 2
	}).format(value);
}
function fmtDate(iso) {
	return new Date(iso).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function initials(name) {
	return name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
}
function AureaMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-8", className),
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "9",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8.5 22.5V15.2c0-4.1 3.3-7.2 7.5-7.2s7.5 3.1 7.5 7.2v7.3",
				fill: "none",
				stroke: "var(--aurea-accent-fg)",
				strokeWidth: "2.2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 12.2v10.3",
				fill: "none",
				stroke: "var(--aurea-accent-fg)",
				strokeWidth: "2.2",
				strokeLinecap: "round"
			})
		]
	});
}
var variants = {
	primary: "bg-accent text-accent-fg hover:opacity-90 shadow-card",
	secondary: "bg-surface text-fg shadow-card hover:shadow-card-hover",
	ghost: "bg-transparent text-fg hover:bg-subtle",
	danger: "bg-danger text-accent-fg hover:opacity-90",
	sidebar: "bg-transparent text-sidebar-fg hover:bg-sidebar-hover"
};
var sizes = {
	sm: "h-9 px-3 text-sm gap-1.5 rounded-sm",
	md: "h-10 px-4 text-sm gap-2 rounded-md",
	lg: "h-11 px-5 text-sm gap-2 rounded-md",
	icon: "size-10 rounded-md"
};
var Button = (0, import_react.forwardRef)(function Button({ className, variant = "primary", size = "md", type = "button", ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		ref,
		type,
		className: cn("inline-flex items-center justify-center font-medium transition-[opacity,transform,box-shadow,background-color] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-40", variants[variant], sizes[size], className),
		...props
	});
});
//#endregion
export { initials as a, fmtDate as i, Button as n, sar as o, cn as r, sarExact as s, AureaMark as t };
