import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useRouter, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, v as useNavigate, y as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-za4XTYXo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var APPS = [
	{
		id: "home",
		name: "Home",
		blurb: "Workspace",
		tint: "ink"
	},
	{
		id: "crm",
		name: "CRM",
		blurb: "Pipeline & people",
		tint: "teal"
	},
	{
		id: "sales",
		name: "Sales",
		blurb: "Quotes to cash",
		tint: "ink"
	},
	{
		id: "buying",
		name: "Buying",
		blurb: "Vendors & POs",
		tint: "stone"
	},
	{
		id: "stock",
		name: "Inventory",
		blurb: "Items & warehouses",
		tint: "sage"
	},
	{
		id: "accounts",
		name: "Accounting",
		blurb: "Ledger & cash",
		tint: "slate"
	},
	{
		id: "hr",
		name: "HR",
		blurb: "People ops",
		tint: "warm"
	},
	{
		id: "mfg",
		name: "Manufacture",
		blurb: "BOM & work orders",
		tint: "char"
	},
	{
		id: "projects",
		name: "Projects",
		blurb: "Delivery board",
		tint: "olive"
	},
	{
		id: "studio",
		name: "Theme Studio",
		blurb: "Skin the desk",
		tint: "teal"
	}
];
var NOTIFICATIONS = [
	{
		id: "n1",
		title: "SO-24018 overdue",
		body: "Al-Nour Contracting — SAR 86,400 unpaid 12 days",
		time: "12m",
		unread: true
	},
	{
		id: "n2",
		title: "Lead assigned",
		body: "Ma’aden inquiry routed to Layla Al-Harbi",
		time: "1h",
		unread: true
	},
	{
		id: "n3",
		title: "GRN posted",
		body: "Valve shipment received at Dammam WH",
		time: "3h",
		unread: false
	},
	{
		id: "n4",
		title: "Leave approved",
		body: "Omar Qureshi — 4–6 Sep",
		time: "Yesterday",
		unread: false
	}
];
var DOCTYPES = {
	Lead: {
		name: "Lead",
		app: "crm",
		plural: "Leads",
		views: ["list"],
		columns: [
			{
				key: "id",
				label: "ID"
			},
			{
				key: "title",
				label: "Lead"
			},
			{
				key: "organization",
				label: "Organization"
			},
			{
				key: "status",
				label: "Status",
				kind: "status"
			},
			{
				key: "source",
				label: "Source"
			},
			{
				key: "owner",
				label: "Owner"
			},
			{
				key: "date",
				label: "Date",
				kind: "date"
			}
		],
		fields: [
			{
				name: "organization",
				label: "Organization",
				type: "text"
			},
			{
				name: "contact",
				label: "Contact",
				type: "text"
			},
			{
				name: "email",
				label: "Email",
				type: "text"
			},
			{
				name: "phone",
				label: "Phone",
				type: "text"
			},
			{
				name: "source",
				label: "Source",
				type: "select",
				options: [
					"Website",
					"Referral",
					"Tender",
					"Walk-in",
					"Exhibition"
				]
			},
			{
				name: "territory",
				label: "Territory",
				type: "text"
			},
			{
				name: "notes",
				label: "Notes",
				type: "textarea",
				span: 2
			}
		],
		workflow: [
			"New",
			"Contacted",
			"Qualified",
			"Lost"
		],
		smart: [{
			label: "Opportunities",
			value: "1"
		}, {
			label: "Calls",
			value: "3"
		}]
	},
	Opportunity: {
		name: "Opportunity",
		app: "crm",
		plural: "Opportunities",
		views: ["list", "kanban"],
		stages: [
			"New",
			"Qualified",
			"Proposition",
			"Negotiation",
			"Won"
		],
		columns: [
			{
				key: "id",
				label: "ID"
			},
			{
				key: "title",
				label: "Opportunity"
			},
			{
				key: "customer",
				label: "Customer"
			},
			{
				key: "status",
				label: "Stage",
				kind: "status"
			},
			{
				key: "amount",
				label: "Amount",
				kind: "currency"
			},
			{
				key: "owner",
				label: "Owner"
			},
			{
				key: "date",
				label: "Close",
				kind: "date"
			}
		],
		fields: [
			{
				name: "customer",
				label: "Customer",
				type: "link"
			},
			{
				name: "contact",
				label: "Contact",
				type: "text"
			},
			{
				name: "probability",
				label: "Probability",
				type: "percent"
			},
			{
				name: "expected_close",
				label: "Expected close",
				type: "date"
			},
			{
				name: "source",
				label: "Source",
				type: "text"
			},
			{
				name: "next_action",
				label: "Next action",
				type: "text"
			},
			{
				name: "notes",
				label: "Notes",
				type: "textarea",
				span: 2
			}
		],
		workflow: [
			"New",
			"Qualified",
			"Proposition",
			"Negotiation",
			"Won"
		],
		smart: [{
			label: "Quotations",
			value: "2"
		}, {
			label: "Meetings",
			value: "4"
		}]
	},
	"Sales Order": {
		name: "Sales Order",
		app: "sales",
		plural: "Sales Orders",
		views: ["list"],
		columns: [
			{
				key: "id",
				label: "ID"
			},
			{
				key: "title",
				label: "Customer"
			},
			{
				key: "status",
				label: "Status",
				kind: "status"
			},
			{
				key: "amount",
				label: "Grand total",
				kind: "currency"
			},
			{
				key: "delivery_date",
				label: "Delivery"
			},
			{
				key: "owner",
				label: "Owner"
			},
			{
				key: "date",
				label: "Date",
				kind: "date"
			}
		],
		fields: [
			{
				name: "customer",
				label: "Customer",
				type: "link"
			},
			{
				name: "po_no",
				label: "Customer PO",
				type: "text"
			},
			{
				name: "delivery_date",
				label: "Delivery date",
				type: "date"
			},
			{
				name: "warehouse",
				label: "Warehouse",
				type: "link"
			},
			{
				name: "payment_terms",
				label: "Payment terms",
				type: "select",
				options: [
					"Net 15",
					"Net 30",
					"Net 45",
					"Advance 50%"
				]
			},
			{
				name: "sales_partner",
				label: "Sales partner",
				type: "text"
			},
			{
				name: "notes",
				label: "Terms",
				type: "textarea",
				span: 2
			}
		],
		workflow: [
			"Draft",
			"To Deliver",
			"To Bill",
			"Completed"
		],
		smart: [
			{
				label: "Pick lists",
				value: "1"
			},
			{
				label: "Invoices",
				value: "0"
			},
			{
				label: "Deliveries",
				value: "1"
			}
		]
	},
	Quotation: {
		name: "Quotation",
		app: "sales",
		plural: "Quotations",
		views: ["list"],
		columns: [
			{
				key: "id",
				label: "ID"
			},
			{
				key: "title",
				label: "Customer"
			},
			{
				key: "status",
				label: "Status",
				kind: "status"
			},
			{
				key: "amount",
				label: "Amount",
				kind: "currency"
			},
			{
				key: "owner",
				label: "Owner"
			},
			{
				key: "date",
				label: "Valid till",
				kind: "date"
			}
		],
		fields: [
			{
				name: "customer",
				label: "Customer",
				type: "link"
			},
			{
				name: "valid_till",
				label: "Valid till",
				type: "date"
			},
			{
				name: "incoterm",
				label: "Incoterm",
				type: "select",
				options: [
					"EXW",
					"FOB",
					"CIF",
					"DAP"
				]
			},
			{
				name: "notes",
				label: "Notes",
				type: "textarea",
				span: 2
			}
		],
		workflow: [
			"Draft",
			"Open",
			"Ordered",
			"Lost"
		]
	},
	"Purchase Order": {
		name: "Purchase Order",
		app: "buying",
		plural: "Purchase Orders",
		views: ["list"],
		columns: [
			{
				key: "id",
				label: "ID"
			},
			{
				key: "title",
				label: "Supplier"
			},
			{
				key: "status",
				label: "Status",
				kind: "status"
			},
			{
				key: "amount",
				label: "Amount",
				kind: "currency"
			},
			{
				key: "owner",
				label: "Buyer"
			},
			{
				key: "date",
				label: "Required",
				kind: "date"
			}
		],
		fields: [
			{
				name: "supplier",
				label: "Supplier",
				type: "link"
			},
			{
				name: "required_by",
				label: "Required by",
				type: "date"
			},
			{
				name: "warehouse",
				label: "Target warehouse",
				type: "link"
			},
			{
				name: "notes",
				label: "Notes",
				type: "textarea",
				span: 2
			}
		],
		workflow: [
			"Draft",
			"To Receive",
			"To Bill",
			"Completed"
		]
	},
	Item: {
		name: "Item",
		app: "stock",
		plural: "Items",
		views: ["list"],
		columns: [
			{
				key: "id",
				label: "Code"
			},
			{
				key: "title",
				label: "Item"
			},
			{
				key: "group",
				label: "Group"
			},
			{
				key: "status",
				label: "Status",
				kind: "status"
			},
			{
				key: "qty",
				label: "On hand",
				kind: "text"
			},
			{
				key: "amount",
				label: "Valuation",
				kind: "currency"
			}
		],
		fields: [
			{
				name: "item_group",
				label: "Item group",
				type: "select",
				options: [
					"Pipes",
					"Valves",
					"Pumps",
					"Safety",
					"Electrical"
				]
			},
			{
				name: "uom",
				label: "Default UOM",
				type: "text"
			},
			{
				name: "warehouse",
				label: "Default warehouse",
				type: "link"
			},
			{
				name: "safety_stock",
				label: "Safety stock",
				type: "number"
			},
			{
				name: "description",
				label: "Description",
				type: "textarea",
				span: 2
			}
		],
		workflow: [
			"Active",
			"Active",
			"Disabled"
		]
	},
	Employee: {
		name: "Employee",
		app: "hr",
		plural: "Employees",
		views: ["list", "kanban"],
		stages: [
			"Onboarding",
			"Active",
			"On leave",
			"Notice"
		],
		columns: [
			{
				key: "id",
				label: "ID"
			},
			{
				key: "title",
				label: "Name"
			},
			{
				key: "department",
				label: "Department"
			},
			{
				key: "status",
				label: "Status",
				kind: "status"
			},
			{
				key: "owner",
				label: "Reports to"
			},
			{
				key: "date",
				label: "Joined",
				kind: "date"
			}
		],
		fields: [
			{
				name: "department",
				label: "Department",
				type: "select",
				options: [
					"Sales",
					"Finance",
					"Warehouse",
					"HR",
					"Procurement"
				]
			},
			{
				name: "designation",
				label: "Designation",
				type: "text"
			},
			{
				name: "reports_to",
				label: "Reports to",
				type: "link"
			},
			{
				name: "email",
				label: "Work email",
				type: "text"
			},
			{
				name: "phone",
				label: "Phone",
				type: "text"
			},
			{
				name: "joined",
				label: "Date of joining",
				type: "date"
			}
		],
		workflow: [
			"Onboarding",
			"Active",
			"On leave",
			"Notice"
		]
	},
	Task: {
		name: "Task",
		app: "projects",
		plural: "Tasks",
		views: ["list", "kanban"],
		stages: [
			"Backlog",
			"In progress",
			"Review",
			"Done"
		],
		columns: [
			{
				key: "id",
				label: "ID"
			},
			{
				key: "title",
				label: "Task"
			},
			{
				key: "project",
				label: "Project"
			},
			{
				key: "status",
				label: "Status",
				kind: "status"
			},
			{
				key: "owner",
				label: "Assignee"
			},
			{
				key: "date",
				label: "Due",
				kind: "date"
			}
		],
		fields: [
			{
				name: "project",
				label: "Project",
				type: "link"
			},
			{
				name: "assignee",
				label: "Assignee",
				type: "link"
			},
			{
				name: "priority",
				label: "Priority",
				type: "select",
				options: [
					"Low",
					"Medium",
					"High"
				]
			},
			{
				name: "due",
				label: "Due date",
				type: "date"
			},
			{
				name: "notes",
				label: "Description",
				type: "textarea",
				span: 2
			}
		],
		workflow: [
			"Backlog",
			"In progress",
			"Review",
			"Done"
		]
	},
	"Work Order": {
		name: "Work Order",
		app: "mfg",
		plural: "Work Orders",
		views: ["list"],
		columns: [
			{
				key: "id",
				label: "ID"
			},
			{
				key: "title",
				label: "Item"
			},
			{
				key: "status",
				label: "Status",
				kind: "status"
			},
			{
				key: "qty",
				label: "Qty"
			},
			{
				key: "owner",
				label: "Supervisor"
			},
			{
				key: "date",
				label: "Due",
				kind: "date"
			}
		],
		fields: [
			{
				name: "bom",
				label: "BOM",
				type: "link"
			},
			{
				name: "qty",
				label: "Qty to manufacture",
				type: "number"
			},
			{
				name: "workshop",
				label: "Workstation",
				type: "text"
			},
			{
				name: "notes",
				label: "Notes",
				type: "textarea",
				span: 2
			}
		],
		workflow: [
			"Not started",
			"In process",
			"Completed"
		]
	},
	"Sales Invoice": {
		name: "Sales Invoice",
		app: "accounts",
		plural: "Sales Invoices",
		views: ["list", "dashboard"],
		columns: [
			{
				key: "id",
				label: "ID"
			},
			{
				key: "title",
				label: "Customer"
			},
			{
				key: "status",
				label: "Status",
				kind: "status"
			},
			{
				key: "amount",
				label: "Outstanding",
				kind: "currency"
			},
			{
				key: "owner",
				label: "Owner"
			},
			{
				key: "date",
				label: "Due",
				kind: "date"
			}
		],
		fields: [
			{
				name: "customer",
				label: "Customer",
				type: "link"
			},
			{
				name: "due_date",
				label: "Due date",
				type: "date"
			},
			{
				name: "payment_terms",
				label: "Payment terms",
				type: "text"
			},
			{
				name: "notes",
				label: "Remarks",
				type: "textarea",
				span: 2
			}
		],
		workflow: [
			"Draft",
			"Unpaid",
			"Paid",
			"Overdue"
		]
	}
};
var act = (type, author, time, text) => ({
	type,
	author,
	time,
	text
});
var SEED = {
	Lead: [
		{
			id: "CRM-LEAD-0041",
			title: "Ma’aden phosphate spares",
			subtitle: "Ras Al-Khair",
			status: "Qualified",
			date: "2026-09-02",
			owner: "Layla Al-Harbi",
			tags: ["Tender", "Strategic"],
			fields: {
				organization: "Ma’aden",
				contact: "Fahad Al-Qahtani",
				email: "f.qahtani@maaden.com.sa",
				phone: "+966 13 874 1100",
				source: "Tender",
				territory: "Eastern Province",
				notes: "Looking for a 24-month frame agreement on valves and gaskets. Site visit requested."
			},
			activity: [act("call", "Layla Al-Harbi", "2h ago", "Discovery call. Technical pack due Thursday."), act("email", "Antony Viju", "Yesterday", "Sent capability statement and ISO certificates.")]
		},
		{
			id: "CRM-LEAD-0038",
			title: "SABIC Jubail instrumentation",
			subtitle: "Jubail Industrial",
			status: "Contacted",
			date: "2026-08-28",
			owner: "Layla Al-Harbi",
			tags: ["Website"],
			fields: {
				organization: "SABIC",
				contact: "Nora Al-Mutairi",
				email: "n.mutairi@sabic.com",
				phone: "+966 13 345 6789",
				source: "Website",
				territory: "Jubail",
				notes: "Need explosion-proof transmitters, Q4 turnaround."
			},
			activity: [act("email", "Layla Al-Harbi", "3d ago", "Acknowledged RFQ. Waiting on P&ID.")]
		},
		{
			id: "CRM-LEAD-0034",
			title: "Al-Nour contracting yard",
			subtitle: "Dammam 2nd Industrial",
			status: "New",
			date: "2026-09-05",
			owner: "Antony Viju",
			tags: ["Walk-in"],
			fields: {
				organization: "Al-Nour Contracting",
				contact: "Hassan Farid",
				email: "hassan@alnour.sa",
				phone: "+966 50 412 8890",
				source: "Walk-in",
				territory: "Dammam",
				notes: "Walked into the showroom. Interested in PPE + grinding consumables."
			}
		},
		{
			id: "CRM-LEAD-0031",
			title: "NEOM utility corridor",
			subtitle: "Tabuk",
			status: "Qualified",
			date: "2026-08-19",
			owner: "Layla Al-Harbi",
			tags: ["Referral"],
			fields: {
				organization: "NEOM",
				contact: "Ibrahim Cole",
				email: "i.cole@neom.com",
				phone: "+966 14 555 0190",
				source: "Referral",
				territory: "Tabuk",
				notes: "Referred by Khatib & Alami. Long-cycle, high visibility."
			}
		},
		{
			id: "CRM-LEAD-0027",
			title: "Bahri dry-dock consumables",
			subtitle: "King Abdulaziz Port",
			status: "Lost",
			date: "2026-07-30",
			owner: "Omar Qureshi",
			tags: ["Exhibition"],
			fields: {
				organization: "Bahri",
				contact: "Yousef Rahman",
				email: "y.rahman@bahri.sa",
				phone: "+966 13 668 2000",
				source: "Exhibition",
				territory: "Dammam Port",
				notes: "Lost on lead time. Keep warm for 2027 dry-dock window."
			}
		}
	],
	Opportunity: [
		{
			id: "CRM-OPP-0118",
			title: "Aramco Dhahran valve frame",
			subtitle: "Saudi Aramco",
			status: "Negotiation",
			stage: "Negotiation",
			amount: 184e4,
			date: "2026-10-12",
			owner: "Layla Al-Harbi",
			tags: ["Frame", "Aramco"],
			fields: {
				customer: "Saudi Aramco",
				contact: "Majid Al-Dosari",
				probability: 70,
				expected_close: "2026-10-12",
				source: "Existing",
				next_action: "Commercial clarification workshop",
				notes: "Three-year frame. Legal reviewing liquidated damages clause."
			},
			activity: [act("note", "Layla Al-Harbi", "4h ago", "Procurement asked for 2% annual price lock."), act("email", "Antony Viju", "1d ago", "Sent revised commercial schedule.")]
		},
		{
			id: "CRM-OPP-0112",
			title: "Maaden mill spares 2026",
			subtitle: "Ma’aden",
			status: "Proposition",
			stage: "Proposition",
			amount: 62e4,
			date: "2026-09-28",
			owner: "Layla Al-Harbi",
			tags: ["Spares"],
			fields: {
				customer: "Ma’aden",
				contact: "Fahad Al-Qahtani",
				probability: 55,
				expected_close: "2026-09-28",
				source: "Tender",
				next_action: "Submit technical pack",
				notes: "Must match OEM form-fit-function."
			}
		},
		{
			id: "CRM-OPP-0104",
			title: "SABIC transmitters lot",
			subtitle: "SABIC",
			status: "Qualified",
			stage: "Qualified",
			amount: 275e3,
			date: "2026-10-04",
			owner: "Antony Viju",
			fields: {
				customer: "SABIC",
				contact: "Nora Al-Mutairi",
				probability: 40,
				expected_close: "2026-10-04",
				source: "Website",
				next_action: "Site survey",
				notes: "Need ATEX docs."
			}
		},
		{
			id: "CRM-OPP-0098",
			title: "Harbor yard expansion PPE",
			subtitle: "Internal",
			status: "New",
			stage: "New",
			amount: 48e3,
			date: "2026-09-18",
			owner: "Sara Chen",
			fields: {
				customer: "Harbor & Co.",
				contact: "Sara Chen",
				probability: 90,
				expected_close: "2026-09-18",
				source: "Internal",
				next_action: "Issue PR",
				notes: "Safety refresh for new warehouse hires."
			}
		},
		{
			id: "CRM-OPP-0091",
			title: "Al-Nour grinding package",
			subtitle: "Al-Nour Contracting",
			status: "Won",
			stage: "Won",
			amount: 86400,
			date: "2026-08-22",
			owner: "Antony Viju",
			fields: {
				customer: "Al-Nour Contracting",
				contact: "Hassan Farid",
				probability: 100,
				expected_close: "2026-08-22",
				source: "Walk-in",
				next_action: "Kick off delivery",
				notes: "Converted. First order SO-24018."
			}
		},
		{
			id: "CRM-OPP-0088",
			title: "SEC Dammam switchgear",
			subtitle: "Saudi Electricity Co.",
			status: "Qualified",
			stage: "Qualified",
			amount: 41e4,
			date: "2026-11-02",
			owner: "Layla Al-Harbi",
			fields: {
				customer: "Saudi Electricity Co.",
				contact: "Reem Al-Zahrani",
				probability: 35,
				expected_close: "2026-11-02",
				source: "Tender",
				next_action: "Prequalification file",
				notes: "New account. Need vendor number."
			}
		}
	],
	"Sales Order": [
		{
			id: "SO-24018",
			title: "Al-Nour Contracting",
			subtitle: "PO-AN-8891",
			status: "To Deliver",
			amount: 86400,
			date: "2026-09-01",
			owner: "Antony Viju",
			tags: ["Rush"],
			fields: {
				customer: "Al-Nour Contracting",
				po_no: "PO-AN-8891",
				delivery_date: "2026-09-09",
				warehouse: "Dammam WH-01",
				payment_terms: "Net 30",
				sales_partner: "Direct",
				notes: "Deliver to 2nd Industrial City, gate 4. Call Hassan 30 min prior.",
				grand_total: 86400
			},
			lines: [
				{
					item: "PPE-HARNESS-X3",
					description: "Full-body harness, Class A",
					qty: 24,
					rate: 420,
					uom: "Nos"
				},
				{
					item: "GRIND-DISC-180",
					description: "Cutting disc 180mm INOX",
					qty: 200,
					rate: 18,
					uom: "Nos"
				},
				{
					item: "SAFE-BOOT-42",
					description: "Composite-toe boot",
					qty: 24,
					rate: 265,
					uom: "Pair"
				}
			],
			activity: [act("change", "System", "2h ago", "Picked 18 of 24 harnesses."), act("comment", "James Okonkwo", "Yesterday", "Boots arriving from Jeddah tonight.")]
		},
		{
			id: "SO-24014",
			title: "Saudi Aramco",
			subtitle: "Frame call-off 7",
			status: "To Bill",
			amount: 312e3,
			date: "2026-08-21",
			owner: "Layla Al-Harbi",
			fields: {
				customer: "Saudi Aramco",
				po_no: "4500348871",
				delivery_date: "2026-08-30",
				warehouse: "Dammam WH-01",
				payment_terms: "Net 45",
				sales_partner: "Direct",
				notes: "Call-off against frame AGR-2025-19.",
				grand_total: 312e3
			},
			lines: [{
				item: "VLV-GATE-6-300",
				description: "Gate valve 6\" 300# A216 WCB",
				qty: 12,
				rate: 18400,
				uom: "Nos"
			}, {
				item: "GSK-SPIR-6",
				description: "Spiral wound gasket 6\"",
				qty: 48,
				rate: 95,
				uom: "Nos"
			}],
			activity: [act("change", "James Okonkwo", "5d ago", "DN completed. Awaiting invoice.")]
		},
		{
			id: "SO-24011",
			title: "SABIC",
			subtitle: "Jubail stores",
			status: "Completed",
			amount: 54800,
			date: "2026-08-08",
			owner: "Layla Al-Harbi",
			fields: {
				customer: "SABIC",
				po_no: "SBC-7721",
				delivery_date: "2026-08-14",
				warehouse: "Dammam WH-01",
				payment_terms: "Net 30",
				sales_partner: "Direct",
				notes: "Closed.",
				grand_total: 54800
			},
			lines: [{
				item: "TX-DP-ATEX",
				description: "DP transmitter ATEX",
				qty: 4,
				rate: 13700,
				uom: "Nos"
			}]
		},
		{
			id: "SO-24009",
			title: "Ma’aden",
			subtitle: "Phosphate mill",
			status: "Draft",
			amount: 198500,
			date: "2026-09-04",
			owner: "Antony Viju",
			fields: {
				customer: "Ma’aden",
				po_no: "Pending",
				delivery_date: "2026-09-22",
				warehouse: "Dammam WH-01",
				payment_terms: "Advance 50%",
				sales_partner: "Direct",
				notes: "Hold until commercial sign-off.",
				grand_total: 198500
			},
			lines: [{
				item: "PMP-CHEM-40",
				description: "Chemical process pump 40m3/h",
				qty: 2,
				rate: 64200,
				uom: "Nos"
			}, {
				item: "SL-MECH-40",
				description: "Mechanical seal kit",
				qty: 4,
				rate: 17525,
				uom: "Set"
			}]
		},
		{
			id: "SO-24006",
			title: "SEC Dammam",
			subtitle: "Substation 12",
			status: "To Deliver",
			amount: 121e3,
			date: "2026-08-26",
			owner: "Layla Al-Harbi",
			fields: {
				customer: "Saudi Electricity Co.",
				po_no: "SEC-441-26",
				delivery_date: "2026-09-11",
				warehouse: "Dammam WH-01",
				payment_terms: "Net 30",
				sales_partner: "Direct",
				notes: "Escort required at gate.",
				grand_total: 121e3
			},
			lines: [{
				item: "CBL-XLPE-240",
				description: "XLPE 240mm cable",
				qty: 500,
				rate: 242,
				uom: "Mtr"
			}]
		}
	],
	Quotation: [
		{
			id: "QTN-1182",
			title: "Ma’aden",
			status: "Open",
			amount: 62e4,
			date: "2026-09-20",
			owner: "Layla Al-Harbi",
			fields: {
				customer: "Ma’aden",
				valid_till: "2026-09-20",
				incoterm: "DAP",
				notes: "Validity 14 days."
			},
			lines: [{
				item: "PMP-CHEM-40",
				description: "Chemical process pump",
				qty: 6,
				rate: 64200,
				uom: "Nos"
			}]
		},
		{
			id: "QTN-1174",
			title: "Saudi Aramco",
			status: "Ordered",
			amount: 184e4,
			date: "2026-09-01",
			owner: "Layla Al-Harbi",
			fields: {
				customer: "Saudi Aramco",
				valid_till: "2026-09-01",
				incoterm: "DAP",
				notes: "Converted to frame."
			}
		},
		{
			id: "QTN-1168",
			title: "SABIC",
			status: "Draft",
			amount: 275e3,
			date: "2026-09-18",
			owner: "Antony Viju",
			fields: {
				customer: "SABIC",
				valid_till: "2026-09-18",
				incoterm: "EXW",
				notes: "Awaiting ATEX annex."
			}
		}
	],
	"Purchase Order": [
		{
			id: "PO-5512",
			title: "Emerson Gulf",
			status: "To Receive",
			amount: 188e3,
			date: "2026-09-08",
			owner: "James Okonkwo",
			fields: {
				supplier: "Emerson Gulf",
				required_by: "2026-09-08",
				warehouse: "Dammam WH-01",
				notes: "Air freight the transmitters."
			},
			lines: [{
				item: "TX-DP-ATEX",
				description: "DP transmitter ATEX",
				qty: 10,
				rate: 18800,
				uom: "Nos"
			}]
		},
		{
			id: "PO-5504",
			title: "Kitz Valves ME",
			status: "Completed",
			amount: 24e4,
			date: "2026-08-18",
			owner: "James Okonkwo",
			fields: {
				supplier: "Kitz Valves ME",
				required_by: "2026-08-18",
				warehouse: "Dammam WH-01",
				notes: "Received complete."
			}
		},
		{
			id: "PO-5498",
			title: "3M Saudi",
			status: "To Bill",
			amount: 21400,
			date: "2026-09-03",
			owner: "Sara Chen",
			fields: {
				supplier: "3M Saudi",
				required_by: "2026-09-03",
				warehouse: "Dammam WH-01",
				notes: "PPE restock."
			}
		}
	],
	Item: [
		{
			id: "VLV-GATE-6-300",
			title: "Gate valve 6\" 300#",
			status: "Active",
			amount: 220800,
			owner: "James Okonkwo",
			fields: {
				item_group: "Valves",
				uom: "Nos",
				warehouse: "Dammam WH-01",
				safety_stock: 6,
				description: "Cast steel gate, API 600, RF flanged.",
				qty_on_hand: 12,
				group: "Valves",
				qty: 12
			}
		},
		{
			id: "PMP-CHEM-40",
			title: "Chemical process pump",
			status: "Active",
			amount: 128400,
			fields: {
				item_group: "Pumps",
				uom: "Nos",
				warehouse: "Dammam WH-01",
				safety_stock: 1,
				description: "ANSI chemical pump, 40 m³/h, 316SS.",
				qty_on_hand: 2,
				group: "Pumps",
				qty: 2
			}
		},
		{
			id: "TX-DP-ATEX",
			title: "DP transmitter ATEX",
			status: "Active",
			amount: 54800,
			fields: {
				item_group: "Electrical",
				uom: "Nos",
				warehouse: "Dammam WH-01",
				safety_stock: 4,
				description: "4-20mA HART, Ex d IIC.",
				qty_on_hand: 4,
				group: "Electrical",
				qty: 4
			}
		},
		{
			id: "PPE-HARNESS-X3",
			title: "Full-body harness",
			status: "Active",
			amount: 10080,
			fields: {
				item_group: "Safety",
				uom: "Nos",
				warehouse: "Dammam WH-01",
				safety_stock: 20,
				description: "EN 361, dorsal + sternal D-rings.",
				qty_on_hand: 24,
				group: "Safety",
				qty: 24
			}
		},
		{
			id: "CBL-XLPE-240",
			title: "XLPE 240mm cable",
			status: "Active",
			amount: 121e3,
			fields: {
				item_group: "Electrical",
				uom: "Mtr",
				warehouse: "Dammam WH-01",
				safety_stock: 200,
				description: "Cu XLPE/SWA/PVC 0.6/1kV.",
				qty_on_hand: 500,
				group: "Electrical",
				qty: 500
			}
		},
		{
			id: "GRIND-DISC-180",
			title: "Cutting disc 180mm",
			status: "Active",
			amount: 3600,
			fields: {
				item_group: "Safety",
				uom: "Nos",
				warehouse: "Dammam WH-01",
				safety_stock: 80,
				description: "INOX, 1.6mm.",
				qty_on_hand: 200,
				group: "Safety",
				qty: 200
			}
		}
	],
	Employee: [
		{
			id: "HR-EMP-0001",
			title: "Antony Viju",
			subtitle: "System Manager",
			status: "Active",
			stage: "Active",
			date: "2022-03-14",
			owner: "Board",
			fields: {
				department: "Management",
				designation: "Managing Partner",
				reports_to: "Board",
				email: "antony@harbor.co",
				phone: "+966 50 100 4401",
				joined: "2022-03-14"
			}
		},
		{
			id: "HR-EMP-0004",
			title: "Layla Al-Harbi",
			subtitle: "Sales Manager",
			status: "Active",
			stage: "Active",
			date: "2023-01-09",
			owner: "Antony Viju",
			fields: {
				department: "Sales",
				designation: "Sales Manager",
				reports_to: "Antony Viju",
				email: "layla@harbor.co",
				phone: "+966 55 882 1904",
				joined: "2023-01-09"
			}
		},
		{
			id: "HR-EMP-0007",
			title: "Omar Qureshi",
			subtitle: "Accountant",
			status: "On leave",
			stage: "On leave",
			date: "2023-06-01",
			owner: "Antony Viju",
			fields: {
				department: "Finance",
				designation: "Accountant",
				reports_to: "Antony Viju",
				email: "omar@harbor.co",
				phone: "+966 54 220 7711",
				joined: "2023-06-01"
			}
		},
		{
			id: "HR-EMP-0011",
			title: "James Okonkwo",
			subtitle: "Warehouse lead",
			status: "Active",
			stage: "Active",
			date: "2024-02-18",
			owner: "Antony Viju",
			fields: {
				department: "Warehouse",
				designation: "Warehouse Lead",
				reports_to: "Antony Viju",
				email: "james@harbor.co",
				phone: "+966 53 441 2280",
				joined: "2024-02-18"
			}
		},
		{
			id: "HR-EMP-0014",
			title: "Sara Chen",
			subtitle: "People ops",
			status: "Active",
			stage: "Active",
			date: "2024-11-04",
			owner: "Antony Viju",
			fields: {
				department: "HR",
				designation: "HR Generalist",
				reports_to: "Antony Viju",
				email: "sara@harbor.co",
				phone: "+966 56 019 3344",
				joined: "2024-11-04"
			}
		},
		{
			id: "HR-EMP-0018",
			title: "Maha Al-Shammari",
			subtitle: "Buyer",
			status: "Onboarding",
			stage: "Onboarding",
			date: "2026-09-01",
			owner: "James Okonkwo",
			fields: {
				department: "Procurement",
				designation: "Buyer",
				reports_to: "James Okonkwo",
				email: "maha@harbor.co",
				phone: "+966 58 772 0012",
				joined: "2026-09-01"
			}
		}
	],
	Task: [
		{
			id: "PRJ-TSK-22",
			title: "Aramco QA dossier",
			status: "In progress",
			stage: "In progress",
			date: "2026-09-08",
			owner: "Layla Al-Harbi",
			fields: {
				project: "Aramco frame 2026",
				assignee: "Layla Al-Harbi",
				priority: "High",
				due: "2026-09-08",
				notes: "Compile mill certs + ITP."
			}
		},
		{
			id: "PRJ-TSK-19",
			title: "Dammam racking layout",
			status: "Review",
			stage: "Review",
			date: "2026-09-06",
			owner: "James Okonkwo",
			fields: {
				project: "WH expansion",
				assignee: "James Okonkwo",
				priority: "Medium",
				due: "2026-09-06",
				notes: "Aisle 4-6 re-slot."
			}
		},
		{
			id: "PRJ-TSK-17",
			title: "VAT return Aug",
			status: "Backlog",
			stage: "Backlog",
			date: "2026-09-10",
			owner: "Omar Qureshi",
			fields: {
				project: "Close Aug",
				assignee: "Omar Qureshi",
				priority: "High",
				due: "2026-09-10",
				notes: "ZATCA Fatoora alignment."
			}
		},
		{
			id: "PRJ-TSK-15",
			title: "Onboard Maha",
			status: "In progress",
			stage: "In progress",
			date: "2026-09-07",
			owner: "Sara Chen",
			fields: {
				project: "People ops",
				assignee: "Sara Chen",
				priority: "Medium",
				due: "2026-09-07",
				notes: "Laptop, badge, ERP user."
			}
		},
		{
			id: "PRJ-TSK-12",
			title: "Pump test protocol",
			status: "Done",
			stage: "Done",
			date: "2026-09-02",
			owner: "James Okonkwo",
			fields: {
				project: "Maaden mill",
				assignee: "James Okonkwo",
				priority: "Low",
				due: "2026-09-02",
				notes: "Signed off."
			}
		},
		{
			id: "PRJ-TSK-09",
			title: "Website catalog photos",
			status: "Backlog",
			stage: "Backlog",
			date: "2026-09-15",
			owner: "Sara Chen",
			fields: {
				project: "Brand",
				assignee: "Sara Chen",
				priority: "Low",
				due: "2026-09-15",
				notes: "Valves + PPE hero shots."
			}
		},
		{
			id: "PRJ-TSK-08",
			title: "Credit limit review",
			status: "Review",
			stage: "Review",
			date: "2026-09-05",
			owner: "Omar Qureshi",
			fields: {
				project: "Close Aug",
				assignee: "Omar Qureshi",
				priority: "High",
				due: "2026-09-05",
				notes: "Al-Nour + SEC."
			}
		},
		{
			id: "PRJ-TSK-05",
			title: "ISO 9001 surveillance",
			status: "In progress",
			stage: "In progress",
			date: "2026-09-20",
			owner: "Antony Viju",
			fields: {
				project: "Quality",
				assignee: "Antony Viju",
				priority: "High",
				due: "2026-09-20",
				notes: "Auditor on site 20 Sep."
			}
		}
	],
	"Work Order": [
		{
			id: "WO-441",
			title: "Seal kit assembly",
			status: "In process",
			amount: 4,
			date: "2026-09-07",
			owner: "James Okonkwo",
			fields: {
				bom: "BOM-SL-MECH-40",
				qty: 4,
				workshop: "Bay A",
				notes: "For Maaden hold order."
			}
		},
		{
			id: "WO-436",
			title: "Harness inspection lot",
			status: "Completed",
			amount: 24,
			date: "2026-09-01",
			owner: "James Okonkwo",
			fields: {
				bom: "BOM-PPE-HARNESS",
				qty: 24,
				workshop: "QA bench",
				notes: "Passed."
			}
		},
		{
			id: "WO-429",
			title: "Cable cut-to-length",
			status: "Not started",
			amount: 500,
			date: "2026-09-10",
			owner: "James Okonkwo",
			fields: {
				bom: "BOM-CBL-240",
				qty: 500,
				workshop: "Cut station",
				notes: "SEC order."
			}
		}
	],
	"Sales Invoice": [
		{
			id: "SINV-2408-014",
			title: "Saudi Aramco",
			status: "Unpaid",
			amount: 312e3,
			date: "2026-09-15",
			owner: "Omar Qureshi",
			fields: {
				customer: "Saudi Aramco",
				due_date: "2026-09-15",
				payment_terms: "Net 45",
				notes: "Call-off 7."
			}
		},
		{
			id: "SINV-2408-009",
			title: "SABIC",
			status: "Paid",
			amount: 0,
			date: "2026-08-28",
			owner: "Omar Qureshi",
			fields: {
				customer: "SABIC",
				due_date: "2026-08-28",
				payment_terms: "Net 30",
				notes: "Settled."
			}
		},
		{
			id: "SINV-2407-031",
			title: "Al-Nour Contracting",
			status: "Overdue",
			amount: 86400,
			date: "2026-08-25",
			owner: "Omar Qureshi",
			fields: {
				customer: "Al-Nour Contracting",
				due_date: "2026-08-25",
				payment_terms: "Net 30",
				notes: "Reminder 2 sent."
			}
		},
		{
			id: "SINV-2408-021",
			title: "Ma’aden",
			status: "Draft",
			amount: 99300,
			date: "2026-09-12",
			owner: "Omar Qureshi",
			fields: {
				customer: "Ma’aden",
				due_date: "2026-09-12",
				payment_terms: "Advance 50%",
				notes: "Advance invoice."
			}
		}
	]
};
function cloneRecords() {
	return JSON.parse(JSON.stringify(SEED));
}
function findRecord(records, doctype, id) {
	return records[doctype]?.find((r) => r.id === id);
}
var MONTHLY_REVENUE = [
	{
		month: "Mar",
		value: 98e4
	},
	{
		month: "Apr",
		value: 112e4
	},
	{
		month: "May",
		value: 104e4
	},
	{
		month: "Jun",
		value: 141e4
	},
	{
		month: "Jul",
		value: 126e4
	},
	{
		month: "Aug",
		value: 168e4
	},
	{
		month: "Sep",
		value: 74e4
	}
];
var AGED_RECEIVABLES = [
	{
		bucket: "Current",
		value: 312e3
	},
	{
		bucket: "1–30",
		value: 54800
	},
	{
		bucket: "31–60",
		value: 86400
	},
	{
		bucket: "61+",
		value: 22e3
	}
];
function statusTone(status) {
	const s = status.toLowerCase();
	if ([
		"won",
		"completed",
		"paid",
		"active",
		"done",
		"ordered"
	].includes(s)) return "success";
	if ([
		"overdue",
		"lost",
		"disabled"
	].includes(s)) return "danger";
	if ([
		"negotiation",
		"to deliver",
		"to bill",
		"to receive",
		"review",
		"on leave",
		"open",
		"in process",
		"in progress"
	].includes(s)) return "warning";
	if ([
		"qualified",
		"proposition",
		"unpaid",
		"contacted"
	].includes(s)) return "info";
	return "neutral";
}
var USER = {
	name: "Antony Viju",
	email: "antony@harbor.co",
	role: "System Manager",
	company: "Harbor & Co.",
	city: "Dammam"
};
var useDeskStore = create()(persist((set, get) => ({
	skin: "aurea",
	mode: "light",
	density: "comfortable",
	accent: "harbor",
	sidebarExpanded: true,
	mobileNav: false,
	commandOpen: false,
	notifOpen: false,
	studioOpen: false,
	chatterCollapsed: false,
	loggedIn: false,
	records: cloneRecords(),
	toasts: [],
	setSkin: (skin) => set({ skin }),
	setMode: (mode) => set({ mode }),
	setDensity: (density) => set({ density }),
	setAccent: (accent) => set({ accent }),
	setSidebarExpanded: (sidebarExpanded) => set({ sidebarExpanded }),
	setMobileNav: (mobileNav) => set({ mobileNav }),
	setCommandOpen: (commandOpen) => set({ commandOpen }),
	setNotifOpen: (notifOpen) => set({ notifOpen }),
	setStudioOpen: (studioOpen) => set({ studioOpen }),
	setChatterCollapsed: (chatterCollapsed) => set({ chatterCollapsed }),
	setLoggedIn: (loggedIn) => set({ loggedIn }),
	updateRecord: (doctype, id, patch) => {
		const records = { ...get().records };
		records[doctype] = (records[doctype] ?? []).map((r) => r.id === id ? {
			...r,
			...patch,
			fields: {
				...r.fields,
				...patch.fields ?? {}
			}
		} : r);
		set({ records });
	},
	moveStage: (doctype, id, stage) => {
		const rec = findRecord(get().records, doctype, id);
		if (!rec) return;
		get().updateRecord(doctype, id, {
			stage,
			status: stage
		});
		get().pushToast("Stage updated", `${rec.title} → ${stage}`);
	},
	addComment: (doctype, id, text) => {
		const rec = findRecord(get().records, doctype, id);
		if (!rec) return;
		const activity = [{
			type: "comment",
			author: "Antony Viju",
			time: "Just now",
			text
		}, ...rec.activity ?? []];
		get().updateRecord(doctype, id, { activity });
	},
	addLine: (doctype, id, line) => {
		const rec = findRecord(get().records, doctype, id);
		if (!rec) return;
		const lines = [...rec.lines ?? [], line];
		const amount = lines.reduce((s, l) => s + l.qty * l.rate, 0);
		get().updateRecord(doctype, id, {
			lines,
			amount,
			fields: {
				...rec.fields,
				grand_total: amount
			}
		});
	},
	pushToast: (title, body) => {
		const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
		set({ toasts: [...get().toasts, {
			id,
			title,
			body
		}] });
		window.setTimeout(() => get().dismissToast(id), 3200);
	},
	dismissToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) })
}), {
	name: "aurea-desk",
	skipHydration: true,
	storage: createJSONStorage(() => localStorage),
	partialize: (s) => ({
		skin: s.skin,
		mode: s.mode,
		density: s.density,
		accent: s.accent,
		sidebarExpanded: s.sidebarExpanded,
		loggedIn: s.loggedIn,
		chatterCollapsed: s.chatterCollapsed
	})
}));
var styles_default = "/assets/styles-BPZMcQbL.css";
var APP_NAME = "Aurea";
var Route$3 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#0E5C54"
			},
			{
				name: "description",
				content: "Aurea — a premium ERPNext desk theme. Odoo-inspired, quieter, and installable on any site."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		"data-skin": "aurea",
		"data-mode": "light",
		"data-accent": "harbor",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskHydrate, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
function DeskHydrate() {
	(0, import_react.useEffect)(() => {
		useDeskStore.persist.rehydrate().then(() => {
			const s = useDeskStore.getState();
			const el = document.documentElement;
			el.dataset.skin = s.skin;
			el.dataset.mode = s.mode;
			el.dataset.accent = s.accent;
			el.dataset.density = s.density;
		});
	}, []);
	return null;
}
var $$splitComponentImporter$2 = () => import("./routes-BgEuuRs5.mjs");
var Route$2 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
function parseDeskSearch(s) {
	const m = typeof s.m === "string" ? s.m : "home";
	const v = typeof s.v === "string" ? s.v : "workspace";
	return {
		m: m || "home",
		v: v || "workspace",
		d: typeof s.d === "string" ? s.d : void 0,
		id: typeof s.id === "string" ? s.id : void 0
	};
}
function useDeskNav() {
	const navigate = useNavigate({ from: "/desk" });
	const search = useSearch({ from: "/desk" });
	const go = (patch) => {
		navigate({
			to: "/desk",
			search: (prev) => {
				const next = {
					...prev,
					...patch
				};
				if (patch.v && patch.v !== "form") next.id = patch.id;
				if (patch.m && !patch.d && !patch.v) {
					next.v = "workspace";
					next.d = void 0;
					next.id = void 0;
				}
				return next;
			}
		});
	};
	return {
		search,
		go
	};
}
var $$splitComponentImporter$1 = () => import("./desk-CTWl1t4E.mjs");
var Route$1 = createFileRoute("/desk")({
	validateSearch: parseDeskSearch,
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./install-eOYo-C7F.mjs");
var Route = createFileRoute("/install")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$2.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	DeskRoute: Route$1.update({
		id: "/desk",
		path: "/desk",
		getParentRoute: () => Route$3
	}),
	InstallRoute: Route.update({
		id: "/install",
		path: "/install",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { APPS as a, NOTIFICATIONS as c, AGED_RECEIVABLES as i, USER as l, useDeskNav as n, DOCTYPES as o, useDeskStore as r, MONTHLY_REVENUE as s, router_exports as t, statusTone as u };
