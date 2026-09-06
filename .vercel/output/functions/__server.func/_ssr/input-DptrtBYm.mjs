import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn } from "./button-vRa2F1t9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-DptrtBYm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = (0, import_react.forwardRef)(function Input({ className, ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		ref,
		className: cn("h-10 w-full rounded-md bg-subtle px-3 text-sm text-fg placeholder:text-faint shadow-card", "transition-[box-shadow] duration-150 ease-out", "focus:outline-none focus:shadow-card-hover", className),
		...props
	});
});
//#endregion
export { Input as t };
