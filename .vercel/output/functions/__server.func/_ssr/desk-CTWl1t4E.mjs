import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as Bell, C as Download, D as ChevronLeft, E as ChevronsLeft, O as Check, S as IdCard, T as ChevronsRight, _ as LogOut, a as SwatchBook, b as Landmark, c as Send, d as Palette, f as Package, g as Menu, h as MessageSquare, j as ArrowUpRight, k as BookOpen, l as Search, m as Moon, n as Warehouse, o as Sun, p as PackageSearch, r as Users, s as ShoppingBag, t as X, u as Plus, v as LayoutGrid, w as Cog, x as Kanban, y as LayoutList } from "../_libs/lucide-react.mjs";
import { a as APPS, c as NOTIFICATIONS, i as AGED_RECEIVABLES, l as USER, n as useDeskNav, o as DOCTYPES, r as useDeskStore, s as MONTHLY_REVENUE, u as statusTone } from "./router-za4XTYXo.mjs";
import { a as initials, i as fmtDate, n as Button, o as sar, r as cn, s as sarExact, t as AureaMark } from "./button-vRa2F1t9.mjs";
import { t as Input } from "./input-DptrtBYm.mjs";
import { t as _e } from "../_libs/cmdk.mjs";
import { a as Area, c as Tooltip, i as XAxis, n as BarChart, o as Bar, r as YAxis, s as ResponsiveContainer, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desk-CTWl1t4E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CommandPalette() {
	const open = useDeskStore((s) => s.commandOpen);
	const setOpen = useDeskStore((s) => s.setCommandOpen);
	const setMode = useDeskStore((s) => s.setMode);
	const mode = useDeskStore((s) => s.mode);
	const setSkin = useDeskStore((s) => s.setSkin);
	const skin = useDeskStore((s) => s.skin);
	const setStudio = useDeskStore((s) => s.setStudioOpen);
	const records = useDeskStore((s) => s.records);
	const { go } = useDeskNav();
	const [q, setQ] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setOpen(!open);
			}
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, setOpen]);
	const hits = (0, import_react.useMemo)(() => {
		const needle = q.trim().toLowerCase();
		if (needle.length < 2) return [];
		const out = [];
		for (const [doctype, rows] of Object.entries(records)) for (const r of rows) {
			if (`${r.id} ${r.title} ${r.subtitle ?? ""} ${r.status}`.toLowerCase().includes(needle)) out.push({
				doctype,
				id: r.id,
				title: r.title
			});
			if (out.length >= 8) return out;
		}
		return out;
	}, [q, records]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center px-4 pt-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Close command palette",
			className: "absolute inset-0 bg-fg/30",
			onClick: () => setOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e, {
			className: "relative w-full max-w-lg overflow-hidden rounded-xl bg-surface shadow-card-hover",
			loop: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 border-b border-line px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-faint" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
					value: q,
					onValueChange: setQ,
					placeholder: "Jump to an app, document, or action…",
					className: "h-12 w-full bg-transparent text-sm text-fg outline-none placeholder:text-faint"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.List, {
				className: "max-h-80 overflow-y-auto p-2 desk-scroll",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
						className: "px-3 py-6 text-center text-sm text-muted",
						children: "Nothing matches."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
						heading: "Apps",
						children: APPS.filter((a) => a.id !== "home").map((app) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
							onSelect: () => {
								go({
									m: app.id,
									v: app.id === "studio" ? "workspace" : "workspace"
								});
								setOpen(false);
								if (app.id === "studio") setStudio(true);
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-3.5" }),
								app.name,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-auto text-xs text-faint",
									children: app.blurb
								})
							]
						}, app.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
						heading: "Doctypes",
						children: Object.values(DOCTYPES).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
							onSelect: () => {
								go({
									m: d.app,
									v: d.views.includes("kanban") ? "kanban" : "list",
									d: d.name,
									id: void 0
								});
								setOpen(false);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3.5" }), d.plural]
						}, d.name))
					}),
					hits.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
						heading: "Documents",
						children: hits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
							onSelect: () => {
								const dt = DOCTYPES[h.doctype];
								go({
									m: dt?.app ?? "home",
									v: "form",
									d: h.doctype,
									id: h.id
								});
								setOpen(false);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-faint",
								children: h.id
							}), h.title]
						}, h.id))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						heading: "Theme",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
								onSelect: () => {
									setMode(mode === "dark" ? "light" : "dark");
									setOpen(false);
								},
								children: [
									mode === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-3.5" }),
									"Toggle ",
									mode === "dark" ? "light" : "dark",
									" mode"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
								onSelect: () => {
									setSkin(skin === "aurea" ? "standard" : "aurea");
									setOpen(false);
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwatchBook, { className: "size-3.5" }),
									"Switch to ",
									skin === "aurea" ? "standard ERPNext" : "Aurea"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
								onSelect: () => {
									setStudio(true);
									go({
										m: "studio",
										v: "workspace"
									});
									setOpen(false);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "size-3.5" }), "Open Theme Studio"]
							})
						]
					})
				]
			})]
		})]
	});
}
function Group({ heading, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
		heading,
		className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-faint",
		children
	});
}
function Item({ children, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Item, {
		onSelect,
		className: cn("flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-sm text-fg", "data-[selected=true]:bg-accent-soft data-[selected=true]:text-accent"),
		children
	});
}
function Toasts() {
	const toasts = useDeskStore((s) => s.toasts);
	const dismiss = useDeskStore((s) => s.dismissToast);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed right-4 bottom-4 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2",
		children: toasts.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => dismiss(t.id),
			className: cn("pointer-events-auto rounded-lg bg-fg px-4 py-3 text-left text-bg shadow-card", "animate-[aurea-in_250ms_cubic-bezier(0.22,1,0.36,1)]"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-medium",
				children: t.title
			}), t.body ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-0.5 text-xs opacity-80",
				children: t.body
			}) : null]
		}, t.id))
	});
}
var ACCENTS = [
	{
		id: "harbor",
		label: "Harbor",
		swatch: "#0e5c54"
	},
	{
		id: "ink",
		label: "Ink",
		swatch: "#1a1916"
	},
	{
		id: "slate",
		label: "Slate",
		swatch: "#3d5a6c"
	},
	{
		id: "olive",
		label: "Olive",
		swatch: "#4a5c3a"
	}
];
function ThemeStudio() {
	const skin = useDeskStore((s) => s.skin);
	const mode = useDeskStore((s) => s.mode);
	const density = useDeskStore((s) => s.density);
	const accent = useDeskStore((s) => s.accent);
	const setSkin = useDeskStore((s) => s.setSkin);
	const setMode = useDeskStore((s) => s.setMode);
	const setDensity = useDeskStore((s) => s.setDensity);
	const setAccent = useDeskStore((s) => s.setAccent);
	const pushToast = useDeskStore((s) => s.pushToast);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-5xl flex-col gap-6 p-4 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "stagger-in",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-wide text-accent uppercase",
						children: "Theme Studio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display mt-1 text-4xl text-fg md:text-5xl",
						children: "Skin every desk. One app."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
						children: "Aurea replaces ERPNext’s stock chrome the moment it is installed — navbar, workspace, lists, forms, kanban, chatter, login. Toggle the live desk against stock Frappe, then drop the same CSS onto any site."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						title: "Skin",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seg, {
							value: skin,
							onChange: (v) => setSkin(v),
							options: [{
								id: "aurea",
								label: "Aurea"
							}, {
								id: "standard",
								label: "Standard ERPNext"
							}]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs leading-relaxed text-muted",
							children: "Standard is the stock Frappe look. Aurea is the installable theme — Odoo’s layout discipline with quieter type, concentric radii, and a dark app rail."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						title: "Appearance",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: mode === "light" ? "primary" : "secondary",
								size: "sm",
								onClick: () => setMode("light"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-3.5" }), " Light"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: mode === "dark" ? "primary" : "secondary",
								size: "sm",
								onClick: () => setMode("dark"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-3.5" }), " Dark"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-2 text-xs font-medium text-muted",
								children: "Density"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seg, {
								value: density,
								onChange: (v) => setDensity(v),
								options: [{
									id: "comfortable",
									label: "Comfortable"
								}, {
									id: "compact",
									label: "Compact"
								}]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
							children: ACCENTS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setAccent(a.id),
								className: cn("flex h-16 flex-col items-start justify-between rounded-md p-3 text-left shadow-card transition-transform duration-150 active:scale-[0.96]", accent === a.id && "ring-2 ring-accent ring-offset-2 ring-offset-bg"),
								style: { background: a.swatch },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-4 rounded-full bg-accent-fg",
									children: accent === a.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-fg" }) : null
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium text-accent-fg",
									children: a.label
								})]
							}, a.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						title: "Install on any ERPNext",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted",
							children: "Aurea ships as a Frappe custom app. Install it on a site and the Desk restyles globally — no core patches, survives `bench update`."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/aurea_theme.zip",
								download: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), " Download app"]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/install",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "secondary",
									size: "sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwatchBook, { className: "size-3.5" }), " Install guide"]
								})
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "What changes after install",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: [
						["Desk chrome", "Navbar, awesomebar, sidebar, and workspace cards restyled."],
						["List & Kanban", "Hairline rows, status pills, quieter filters, Odoo-like boards."],
						["Forms + chatter", "Status pipeline, smart buttons, two-column fields, refined timeline."],
						["Login & website", "Same type and accent on /login and portal pages."],
						["Dark mode", "A designed dark desk — not an invert filter."],
						["Aurea Settings", "Single DocType for accent, density, and custom CSS."]
					].map(([t, b]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-md bg-subtle p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-medium text-fg",
							children: t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs leading-relaxed text-muted",
							children: b
						})]
					}, t))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					variant: "secondary",
					size: "sm",
					onClick: () => {
						setSkin("aurea");
						pushToast("Aurea applied", "This is the desk your users will see.");
					},
					children: "Preview Aurea on this desk"
				})]
			})
		]
	});
}
function Panel({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-surface p-5 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm font-semibold text-fg",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children
		})]
	});
}
function Seg({ value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "inline-flex rounded-md bg-subtle p-1",
		children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(o.id),
			className: cn("h-9 rounded-sm px-3 text-sm font-medium transition-colors duration-150", value === o.id ? "bg-surface text-fg shadow-card" : "text-muted hover:text-fg"),
			children: o.label
		}, o.id))
	});
}
var ICONS$1 = {
	crm: Users,
	sales: ShoppingBag,
	buying: PackageSearch,
	stock: Warehouse,
	accounts: Landmark,
	hr: IdCard,
	mfg: Cog,
	projects: Kanban,
	studio: Palette
};
var KPIS = [
	{
		label: "Revenue · Aug",
		value: sar(168e4),
		delta: "+19%",
		tone: "up"
	},
	{
		label: "Open pipeline",
		value: sar(3193e3),
		delta: "6 deals",
		tone: "flat"
	},
	{
		label: "Receivables",
		value: sar(475200),
		delta: "1 overdue",
		tone: "warn"
	},
	{
		label: "Gross margin",
		value: "31.4%",
		delta: "+1.2pt",
		tone: "up"
	}
];
function Workspace() {
	const { search, go } = useDeskNav();
	const records = useDeskStore((s) => s.records);
	if (search.m === "studio") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeStudio, {});
	if (search.m !== "home") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHome, {});
	const recent = [...(records["Sales Order"] ?? []).slice(0, 3), ...(records.Opportunity ?? []).slice(0, 2)];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-6xl flex-col gap-8 p-4 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: "Sunday, 6 September · Dammam"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-1 text-4xl text-fg md:text-5xl",
					children: "Good afternoon, Antony."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => go({
							m: "crm",
							v: "form",
							d: "Lead",
							id: "new"
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " New lead"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: () => go({
							m: "sales",
							v: "list",
							d: "Sales Order"
						}),
						children: "Sales orders"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4 stagger-in",
				children: KPIS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl bg-surface p-4 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-medium text-muted",
							children: k.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 font-medium text-2xl tabular-nums tracking-tight text-fg",
							children: k.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("mt-1 text-xs", k.tone === "up" && "text-success", k.tone === "warn" && "text-warning", k.tone === "flat" && "text-muted"),
							children: k.delta
						})
					]
				}, k.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-baseline justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold text-fg",
					children: "Apps"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-faint",
					children: "Installed on this site"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
				children: APPS.filter((a) => a.id !== "home").map((app) => {
					const Icon = ICONS$1[app.id] ?? LayoutGridFallback;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => go({
							m: app.id,
							v: "workspace",
							d: void 0,
							id: void 0
						}),
						className: "group flex items-center gap-3 rounded-xl bg-surface p-3 text-left shadow-card transition-[box-shadow,transform] duration-150 hover:shadow-card-hover active:scale-[0.98]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-11 items-center justify-center rounded-md bg-accent-soft text-accent",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm font-medium text-fg",
									children: app.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-xs text-muted",
									children: app.blurb
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "ml-auto size-4 text-faint opacity-0 transition-opacity group-hover:opacity-100" })
						]
					}, app.id);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl bg-surface p-4 shadow-card lg:col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold text-fg",
							children: "Revenue"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: "SAR · last 7 months"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-48",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: MONTHLY_REVENUE,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "rev",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "var(--aurea-accent)",
											stopOpacity: .28
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "var(--aurea-accent)",
											stopOpacity: 0
										})]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "month",
										hide: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: {
											background: "var(--aurea-surface)",
											border: "none",
											borderRadius: 12,
											boxShadow: "var(--aurea-shadow)",
											fontSize: 12
										},
										formatter: (v) => sar(Number(v ?? 0))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "value",
										stroke: "var(--aurea-accent)",
										strokeWidth: 2,
										fill: "url(#rev)"
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl bg-surface p-4 shadow-card lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold text-fg",
						children: "Inbox"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex flex-col gap-3",
						children: NOTIFICATIONS.slice(0, 4).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("mt-1.5 size-1.5 shrink-0 rounded-full", n.unread ? "bg-accent" : "bg-subtle") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm text-fg",
										children: n.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs text-muted",
										children: n.body
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-auto shrink-0 text-xs text-faint",
									children: n.time
								})
							]
						}, n.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-sm font-semibold text-fg",
				children: "Recent documents"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-xl bg-surface shadow-card",
				children: recent.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						const isOpp = (records.Opportunity ?? []).some((x) => x.id === r.id);
						go({
							m: isOpp ? "crm" : "sales",
							v: "form",
							d: isOpp ? "Opportunity" : "Sales Order",
							id: r.id
						});
					},
					className: "flex w-full items-center gap-4 border-b border-line px-4 py-3 text-left last:border-0 hover:bg-subtle",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-28 font-mono text-xs text-faint",
							children: r.id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 flex-1 truncate text-sm text-fg",
							children: r.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden text-xs text-muted sm:block",
							children: r.status
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-sm text-fg",
							children: r.amount ? sar(r.amount) : "—"
						})
					]
				}, r.id))
			})] })
		]
	});
}
function AppHome() {
	const { search, go } = useDeskNav();
	const app = APPS.find((a) => a.id === search.m);
	const records = useDeskStore((s) => s.records);
	const doctypes = Object.values(APP_DOCTYPES_SAFE(search.m));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-6xl flex-col gap-8 p-4 md:p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide text-muted uppercase",
				children: "App"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-1 text-4xl text-fg",
				children: app?.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: app?.blurb
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: doctypes.map((name) => {
				const rows = records[name] ?? [];
				const amount = rows.reduce((s, r) => s + (r.amount ?? 0), 0);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => go({
						m: search.m,
						v: "list",
						d: name,
						id: void 0
					}),
					className: "rounded-xl bg-surface p-5 text-left shadow-card transition-[box-shadow] duration-150 hover:shadow-card-hover",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-medium text-fg",
							children: name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 text-2xl font-medium tabular-nums text-fg",
							children: rows.length
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-xs text-muted",
							children: amount ? sar(amount) : `${rows.length} records`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium text-accent",
								children: "Open list"
							}), name === "Opportunity" || name === "Task" || name === "Employee" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-xs text-muted hover:text-fg",
								onClick: (e) => {
									e.stopPropagation();
									go({
										m: search.m,
										v: "kanban",
										d: name,
										id: void 0
									});
								},
								children: "Kanban"
							}) : null]
						})
					]
				}, name);
			})
		})]
	});
}
function APP_DOCTYPES_SAFE(app) {
	return {
		crm: ["Lead", "Opportunity"],
		sales: ["Sales Order", "Quotation"],
		buying: ["Purchase Order"],
		stock: ["Item"],
		accounts: ["Sales Invoice"],
		hr: ["Employee"],
		mfg: ["Work Order"],
		projects: ["Task"]
	}[app] ?? [];
}
function LayoutGridFallback(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { ...props });
}
var tones = {
	neutral: "bg-subtle text-muted",
	info: "bg-accent-soft text-accent",
	success: "bg-success/12 text-success",
	warning: "bg-warning/12 text-warning",
	danger: "bg-danger/12 text-danger"
};
function Badge({ tone = "neutral", className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium tracking-tight", tones[tone], className),
		children
	});
}
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: statusTone(status),
		children: status
	});
}
function ListView() {
	const { search, go } = useDeskNav();
	const doctype = search.d ?? "Lead";
	const def = DOCTYPES[doctype];
	const records = useDeskStore((s) => s.records[doctype] ?? []);
	const density = useDeskStore((s) => s.density);
	const [q, setQ] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const statuses = (0, import_react.useMemo)(() => {
		return ["all", ...new Set(records.map((r) => r.status))];
	}, [records]);
	const filtered = records.filter((r) => {
		const hay = `${r.id} ${r.title} ${r.subtitle ?? ""} ${r.status} ${r.owner ?? ""}`.toLowerCase();
		if (q && !hay.includes(q.toLowerCase())) return false;
		if (status !== "all" && r.status !== status) return false;
		return true;
	});
	if (!def) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 text-sm text-muted",
		children: "Unknown doctype."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3 border-b border-line px-4 py-4 md:flex-row md:items-center md:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-lg font-semibold text-fg",
						children: def.plural
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [filtered.length, " records"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative min-w-48 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-faint" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: q,
								onChange: (e) => setQ(e.target.value),
								placeholder: `Search ${def.plural.toLowerCase()}…`,
								className: "pl-9"
							})]
						}),
						def.views.includes("kanban") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							size: "sm",
							onClick: () => go({
								v: "kanban",
								d: doctype,
								id: void 0
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kanban, { className: "size-3.5" }), " Board"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							size: "sm",
							disabled: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutList, { className: "size-3.5" }), " List"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: () => go({
								v: "form",
								d: doctype,
								id: "new"
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " New"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto px-4 py-3 md:px-6",
				children: statuses.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setStatus(s),
					className: cn("h-8 shrink-0 rounded-full px-3 text-xs font-medium", status === s ? "bg-fg text-bg" : "bg-subtle text-muted hover:text-fg"),
					children: s === "all" ? "All" : s
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 overflow-auto desk-scroll",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "sticky top-0 bg-bg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "border-b border-line text-xs text-faint",
							children: def.columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2 font-medium md:px-6",
								children: c.label
							}, c.key))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						onClick: () => go({
							v: "form",
							d: doctype,
							id: r.id
						}),
						className: "cursor-pointer border-b border-line hover:bg-surface",
						children: def.columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cn("px-4 md:px-6", density === "compact" ? "py-2" : "py-3"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
								record: r,
								col: c
							})
						}, c.key))
					}, r.id)) })]
				}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-6 py-16 text-center text-sm text-muted",
					children: "No matching records."
				}) : null]
			})
		]
	});
}
function Cell({ record, col }) {
	const raw = valueOf(record, col.key);
	if (col.kind === "status") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: String(raw ?? record.status) });
	if (col.kind === "currency") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "tabular-nums",
		children: typeof raw === "number" ? sar(raw) : "—"
	});
	if (col.kind === "date") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-muted",
		children: raw ? fmtDate(String(raw)) : "—"
	});
	if (col.key === "id") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "font-mono text-xs text-faint",
		children: String(raw)
	});
	if (col.key === "title") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "font-medium text-fg",
		children: record.title
	}), record.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-xs text-muted",
		children: record.subtitle
	}) : null] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-fg",
		children: raw === void 0 || raw === "" ? "—" : String(raw)
	});
}
function valueOf(record, key) {
	if (key === "id") return record.id;
	if (key === "title") return record.title;
	if (key === "status") return record.status;
	if (key === "amount") return record.amount;
	if (key === "date") return record.date;
	if (key === "owner") return record.owner;
	const f = record.fields[key];
	if (typeof f === "string" || typeof f === "number") return f;
}
function FormView() {
	const { search, go } = useDeskNav();
	const doctype = search.d ?? "Lead";
	const def = DOCTYPES[doctype];
	const records = useDeskStore((s) => s.records[doctype] ?? []);
	const updateRecord = useDeskStore((s) => s.updateRecord);
	const addComment = useDeskStore((s) => s.addComment);
	const addLine = useDeskStore((s) => s.addLine);
	const pushToast = useDeskStore((s) => s.pushToast);
	const chatterCollapsed = useDeskStore((s) => s.chatterCollapsed);
	const setChatterCollapsed = useDeskStore((s) => s.setChatterCollapsed);
	const density = useDeskStore((s) => s.density);
	const isNew = search.id === "new";
	const record = records.find((r) => r.id === search.id);
	const draft = (0, import_react.useMemo)(() => {
		if (record) return record;
		return {
			id: `${doctype.slice(0, 3).toUpperCase()}-NEW`,
			title: "",
			status: def?.workflow?.[0] ?? "Draft",
			fields: {},
			activity: [],
			lines: []
		};
	}, [
		record,
		doctype,
		def
	]);
	if (!def) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 text-sm text-muted",
		children: "Unknown doctype."
	});
	const workflow = def.workflow ?? [];
	const currentIdx = Math.max(0, workflow.findIndex((s) => s === draft.status));
	const setField = (name, value) => {
		if (isNew) return;
		const numeric = [
			"probability",
			"qty",
			"safety_stock",
			"grand_total"
		].includes(name);
		updateRecord(doctype, draft.id, {
			fields: {
				...draft.fields,
				[name]: numeric ? Number(value) || 0 : value
			},
			title: name === "customer" || name === "organization" || name === "contact" ? value || draft.title : draft.title
		});
	};
	const advance = (stage) => {
		if (isNew) {
			pushToast("Save the document first");
			return;
		}
		updateRecord(doctype, draft.id, {
			status: stage,
			stage
		});
		pushToast("Status updated", `${draft.id} → ${stage}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-line px-4 py-3 md:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => go({
							v: "list",
							d: doctype,
							id: void 0
						}),
						className: "inline-flex items-center gap-1 text-xs text-muted hover:text-fg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-3.5" }),
							" ",
							def.plural
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "truncate text-xl font-semibold text-fg",
									children: isNew ? `New ${def.name}` : draft.title || draft.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: draft.status })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 font-mono text-xs text-faint",
								children: draft.id
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									size: "sm",
									onClick: () => pushToast("Saved", `${draft.id} written to this session.`),
									children: "Save"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									onClick: () => {
										const next = workflow[currentIdx + 1];
										if (next) advance(next);
										else pushToast("Already at the last stage");
									},
									children: workflow[currentIdx + 1] ? `Mark ${workflow[currentIdx + 1]}` : "Submit"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "lg:hidden",
									onClick: () => setChatterCollapsed(!chatterCollapsed),
									"aria-label": "Toggle chatter",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-4" })
								})
							]
						})]
					}),
					workflow.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-4 flex gap-1 overflow-x-auto pb-1",
						children: workflow.map((s, i) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "flex min-w-0 flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => advance(s),
									className: cn("h-8 w-full truncate rounded-sm px-2 text-xs font-medium", i <= currentIdx ? "bg-accent text-accent-fg" : "bg-subtle text-muted"),
									children: s
								})
							}, s);
						})
					}) : null,
					def.smart?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: def.smart.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex h-9 items-center gap-2 rounded-md bg-subtle px-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: s.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold tabular-nums text-fg",
								children: s.value
							})]
						}, s.label))
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 overflow-auto p-4 desk-scroll md:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl bg-surface p-4 shadow-card md:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 text-xs font-semibold tracking-wide text-muted uppercase",
						children: "Details"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: def.fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: cn("block", f.span === 2 && "sm:col-span-2"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1.5 block text-xs font-medium text-muted",
								children: f.label
							}), f.type === "textarea" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								defaultValue: String(draft.fields[f.name] ?? ""),
								onBlur: (e) => setField(f.name, e.target.value),
								rows: 3,
								className: "w-full rounded-md bg-subtle px-3 py-2 text-sm text-fg shadow-card focus:outline-none"
							}) : f.type === "select" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								defaultValue: String(draft.fields[f.name] ?? f.options?.[0] ?? ""),
								onChange: (e) => setField(f.name, e.target.value),
								className: "h-10 w-full rounded-md bg-subtle px-3 text-sm text-fg shadow-card",
								children: (f.options ?? []).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: o }, o))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: f.type === "number" || f.type === "percent" || f.type === "currency" ? "number" : "text",
								defaultValue: String(draft.fields[f.name] ?? ""),
								onBlur: (e) => setField(f.name, e.target.value)
							})]
						}, f.name))
					})]
				}), draft.lines ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lines, {
					lines: draft.lines,
					density,
					onAdd: (line) => {
						if (isNew) {
							pushToast("Save the document first");
							return;
						}
						addLine(doctype, draft.id, line);
					}
				}) : null]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: cn("w-full shrink-0 border-l border-line bg-surface md:w-80 lg:w-96", chatterCollapsed ? "hidden lg:flex" : "flex", "flex-col"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chatter, {
				record: draft,
				onSend: (text) => {
					if (isNew) {
						pushToast("Save the document first");
						return;
					}
					addComment(doctype, draft.id, text);
				}
			})
		})]
	});
}
function Lines({ lines, density, onAdd }) {
	const total = lines.reduce((s, l) => s + l.qty * l.rate, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-4 rounded-xl bg-surface shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-4 py-3 md:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-semibold tracking-wide text-muted uppercase",
					children: "Items"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: () => onAdd({
						item: "MISC-001",
						description: "Additional line",
						qty: 1,
						rate: 0,
						uom: "Nos"
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " Add row"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-y border-line text-xs text-faint",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2 font-medium md:px-6",
								children: "Item"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "Qty"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "Rate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2 font-medium md:px-6",
								children: "Amount"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: lines.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: cn("px-4 md:px-6", density === "compact" ? "py-2" : "py-3"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-xs text-faint",
									children: l.item
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: l.description })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-3 tabular-nums",
								children: [
									l.qty,
									" ",
									l.uom
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 tabular-nums",
								children: sarExact(l.rate)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 tabular-nums md:px-6",
								children: sarExact(l.qty * l.rate)
							})
						]
					}, `${l.item}-${i}`)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end px-4 py-3 md:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted",
						children: "Grand total"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-lg font-semibold tabular-nums",
						children: sar(total)
					})]
				})
			})
		]
	});
}
function Chatter({ record, onSend }) {
	const [text, setText] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-line px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold text-fg",
				children: "Chatter"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: record.date ? `Created ${fmtDate(record.date)}` : "Conversation"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-auto p-4 desk-scroll",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "flex flex-col gap-4",
				children: [(record.activity ?? []).map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-8 shrink-0 items-center justify-center rounded-full bg-subtle text-xs font-medium text-muted",
						children: initials(a.author)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium text-fg",
								children: a.author
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-faint",
								children: a.time
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-sm leading-relaxed text-muted",
							children: a.text
						})]
					})]
				}, `${a.time}-${i}`)), (record.activity ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm text-muted",
					children: "No messages yet. Leave the first note."
				}) : null]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
			className: "border-t border-line p-3",
			onSubmit: (e) => {
				e.preventDefault();
				if (!text.trim()) return;
				onSend(text.trim());
				setText("");
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: text,
					onChange: (e) => setText(e.target.value),
					placeholder: "Write a note…"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "icon",
					"aria-label": "Send",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
				})]
			})
		})
	] });
}
function KanbanView() {
	const { search, go } = useDeskNav();
	const doctype = search.d ?? "Opportunity";
	const def = DOCTYPES[doctype];
	const records = useDeskStore((s) => s.records[doctype] ?? []);
	const moveStage = useDeskStore((s) => s.moveStage);
	const [dragId, setDragId] = (0, import_react.useState)(null);
	if (!def) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 text-sm text-muted",
		children: "Unknown doctype."
	});
	const stages = def.stages ?? def.workflow ?? ["New"];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between gap-3 border-b border-line px-4 py-4 md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold text-fg",
				children: def.plural
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Drag cards between stages"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "secondary",
					size: "sm",
					onClick: () => go({
						v: "list",
						d: doctype
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutList, { className: "size-3.5" }), " List"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => go({
						v: "form",
						d: doctype,
						id: "new"
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " New"]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-0 flex-1 gap-3 overflow-x-auto p-4 desk-scroll md:p-6",
			children: stages.map((stage) => {
				const cards = records.filter((r) => (r.stage ?? r.status) === stage);
				const sum = cards.reduce((s, r) => s + (r.amount ?? 0), 0);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					onDragOver: (e) => e.preventDefault(),
					onDrop: () => {
						if (dragId) moveStage(doctype, dragId, stage);
						setDragId(null);
					},
					className: cn("flex w-72 shrink-0 flex-col rounded-xl bg-subtle/60 p-2", dragId ? "outline outline-dashed outline-line" : ""),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between px-2 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold text-fg",
							children: stage
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs tabular-nums text-muted",
							children: [cards.length, sum ? ` · ${sar(sum)}` : ""]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-2",
						children: cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							draggable: true,
							onDragStart: () => setDragId(c.id),
							onDragEnd: () => setDragId(null),
							onClick: () => go({
								v: "form",
								d: doctype,
								id: c.id
							}),
							className: cn("cursor-grab rounded-lg bg-surface p-3 shadow-card active:cursor-grabbing", dragId === c.id && "opacity-50"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-medium text-fg",
									children: c.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.status })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center justify-between text-xs text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.owner }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums",
									children: c.amount ? sar(c.amount) : c.id
								})]
							})]
						}, c.id))
					})]
				}, stage);
			})
		})]
	});
}
function Dashboard() {
	const invoices = useDeskStore((s) => s.records["Sales Invoice"] ?? []);
	const { go } = useDeskNav();
	const outstanding = invoices.reduce((s, r) => s + (r.amount ?? 0), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-6xl flex-col gap-6 p-4 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide text-muted uppercase",
				children: "Accounting"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-1 text-4xl text-fg",
				children: "Books at a glance"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Outstanding AR",
						value: sar(outstanding),
						hint: "Open invoices"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Collected · Aug",
						value: sar(54800),
						hint: "SABIC settled"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Overdue",
						value: sar(86400),
						hint: "Al-Nour · 12 days"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl bg-surface p-4 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 text-sm font-semibold text-fg",
						children: "Revenue"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-56",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: MONTHLY_REVENUE,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "month",
										tick: {
											fontSize: 11,
											fill: "var(--aurea-muted)"
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { hide: true }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: {
											background: "var(--aurea-surface)",
											border: "none",
											borderRadius: 12,
											fontSize: 12,
											boxShadow: "var(--aurea-shadow)"
										},
										formatter: (v) => sar(Number(v ?? 0))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "value",
										fill: "var(--aurea-accent)",
										radius: [
											6,
											6,
											0,
											0
										]
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl bg-surface p-4 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 text-sm font-semibold text-fg",
						children: "Aged receivables"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-56",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: AGED_RECEIVABLES,
								layout: "vertical",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										type: "number",
										hide: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										type: "category",
										dataKey: "bucket",
										width: 56,
										tick: {
											fontSize: 11,
											fill: "var(--aurea-muted)"
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: {
											background: "var(--aurea-surface)",
											border: "none",
											borderRadius: 12,
											fontSize: 12,
											boxShadow: "var(--aurea-shadow)"
										},
										formatter: (v) => sar(Number(v ?? 0))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "value",
										fill: "var(--aurea-accent)",
										radius: [
											0,
											6,
											6,
											0
										]
									})
								]
							})
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overflow-hidden rounded-xl bg-surface shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold text-fg",
						children: "Sales invoices"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-xs font-medium text-accent",
						onClick: () => go({
							m: "accounts",
							v: "list",
							d: "Sales Invoice"
						}),
						children: "Open list"
					})]
				}), invoices.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => go({
						m: "accounts",
						v: "form",
						d: "Sales Invoice",
						id: r.id
					}),
					className: "flex w-full items-center gap-3 border-t border-line px-4 py-3 text-left hover:bg-subtle",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-32 font-mono text-xs text-faint",
							children: r.id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1 truncate text-sm",
							children: r.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-24 text-right text-sm tabular-nums",
							children: sar(r.amount ?? 0)
						})
					]
				}, r.id))]
			})
		]
	});
}
function Kpi({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl bg-surface p-4 shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-medium text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 text-2xl font-medium tabular-nums text-fg",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-xs text-faint",
				children: hint
			})
		]
	});
}
var ICONS = {
	home: LayoutGrid,
	crm: Users,
	sales: ShoppingBag,
	buying: PackageSearch,
	stock: Warehouse,
	accounts: Landmark,
	hr: IdCard,
	mfg: Cog,
	projects: Kanban,
	studio: Palette
};
function DeskShell() {
	const skin = useDeskStore((s) => s.skin);
	const mode = useDeskStore((s) => s.mode);
	const accent = useDeskStore((s) => s.accent);
	const density = useDeskStore((s) => s.density);
	const { search } = useDeskNav();
	(0, import_react.useEffect)(() => {
		const el = document.documentElement;
		el.dataset.skin = skin;
		el.dataset.mode = mode;
		el.dataset.accent = accent;
		el.dataset.density = density;
	}, [
		skin,
		mode,
		accent,
		density
	]);
	const body = search.m === "studio" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeStudio, {}) : search.m === "accounts" && (search.v === "workspace" || search.v === "dashboard") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {}) : search.v === "form" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormView, {}) : search.v === "kanban" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KanbanView, {}) : search.v === "list" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListView, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workspace, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Topbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "min-h-0 flex-1 overflow-auto desk-scroll",
					children: body
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toasts, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileDrawer, {})
		]
	});
}
function Sidebar() {
	const expanded = useDeskStore((s) => s.sidebarExpanded);
	const setExpanded = useDeskStore((s) => s.setSidebarExpanded);
	const skin = useDeskStore((s) => s.skin);
	const { search, go } = useDeskNav();
	const aurea = skin === "aurea";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("hidden h-full shrink-0 flex-col md:flex", aurea ? "bg-sidebar text-sidebar-fg" : "border-r border-line bg-surface text-fg", expanded ? "w-56" : "w-16"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex h-14 items-center gap-2 px-3", expanded ? "justify-start" : "justify-center"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: aurea ? "text-sidebar-fg" : "text-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AureaMark, { className: "size-8" })
				}), expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate text-sm font-semibold",
						children: aurea ? "Aurea" : "ERPNext"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("truncate text-xs", aurea ? "text-sidebar-muted" : "text-muted"),
						children: "Harbor & Co."
					})]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex-1 overflow-y-auto px-2 py-2 desk-scroll",
				children: APPS.map((app) => {
					const Icon = ICONS[app.id] ?? LayoutGrid;
					const active = search.m === app.id || app.id === "home" && search.m === "home";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						title: app.name,
						onClick: () => go({
							m: app.id,
							v: "workspace",
							d: void 0,
							id: void 0
						}),
						className: cn("mb-0.5 flex h-11 w-full items-center gap-3 rounded-md px-2 text-sm font-medium transition-colors duration-150", expanded ? "justify-start" : "justify-center", aurea ? active ? "bg-sidebar-hover text-sidebar-fg" : "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-fg" : active ? "bg-accent-soft text-accent" : "text-muted hover:bg-subtle hover:text-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }), expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: app.name
						}) : null]
					}, app.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setExpanded(!expanded),
					className: cn("flex h-10 w-full items-center justify-center rounded-md", aurea ? "text-sidebar-muted hover:bg-sidebar-hover" : "text-muted hover:bg-subtle"),
					"aria-label": expanded ? "Collapse sidebar" : "Expand sidebar",
					children: expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsLeft, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsRight, { className: "size-4" })
				})
			})
		]
	});
}
function Topbar() {
	const setCommand = useDeskStore((s) => s.setCommandOpen);
	const setMobile = useDeskStore((s) => s.setMobileNav);
	const notifOpen = useDeskStore((s) => s.notifOpen);
	const setNotif = useDeskStore((s) => s.setNotifOpen);
	const mode = useDeskStore((s) => s.mode);
	const setMode = useDeskStore((s) => s.setMode);
	const skin = useDeskStore((s) => s.skin);
	const setSkin = useDeskStore((s) => s.setSkin);
	const setLoggedIn = useDeskStore((s) => s.setLoggedIn);
	const navigate = useNavigate();
	const unread = NOTIFICATIONS.filter((n) => n.unread).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "relative flex h-14 shrink-0 items-center gap-2 border-b border-line bg-surface px-3 md:px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "flex size-10 items-center justify-center rounded-md text-fg hover:bg-subtle md:hidden",
				onClick: () => setMobile(true),
				"aria-label": "Open menu",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setCommand(true),
				className: "flex h-10 min-w-0 flex-1 items-center gap-2 rounded-md bg-subtle px-3 text-left text-sm text-faint shadow-card md:max-w-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 shrink-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: "Search or jump…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
						className: "ml-auto hidden rounded-sm bg-surface px-1.5 py-0.5 font-mono text-xs text-muted md:inline",
						children: "⌘K"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "secondary",
				size: "sm",
				className: "hidden sm:inline-flex",
				onClick: () => setSkin(skin === "aurea" ? "standard" : "aurea"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwatchBook, { className: "size-3.5" }), skin === "aurea" ? "Aurea" : "Standard"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setMode(mode === "dark" ? "light" : "dark"),
				className: "flex size-10 items-center justify-center rounded-md hover:bg-subtle",
				"aria-label": "Toggle appearance",
				children: mode === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setNotif(!notifOpen),
					className: "relative flex size-10 items-center justify-center rounded-md hover:bg-subtle",
					"aria-label": "Notifications",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), unread ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-2 right-2 size-1.5 rounded-full bg-danger" }) : null]
				}), notifOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute right-0 z-40 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-lg bg-surface p-2 shadow-card-hover",
					children: NOTIFICATIONS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md px-3 py-2 hover:bg-subtle",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium text-fg",
								children: n.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-faint",
								children: n.time
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: n.body
						})]
					}, n.id))
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					setLoggedIn(false);
					navigate({ to: "/" });
				},
				className: "flex size-10 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-fg",
				title: `${USER.name} · Sign out`,
				"aria-label": "Sign out",
				children: initials(USER.name)
			})
		]
	});
}
function MobileDrawer() {
	const open = useDeskStore((s) => s.mobileNav);
	const setOpen = useDeskStore((s) => s.setMobileNav);
	const setLoggedIn = useDeskStore((s) => s.setLoggedIn);
	const { search, go } = useDeskNav();
	const navigate = useNavigate();
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 md:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-fg/40",
			onClick: () => setOpen(false),
			"aria-label": "Close menu"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-sidebar text-sidebar-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-14 items-center justify-between px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AureaMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold",
							children: "Aurea"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setOpen(false),
						className: "size-10",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 overflow-y-auto px-2",
					children: APPS.map((app) => {
						const Icon = ICONS[app.id] ?? LayoutGrid;
						const active = search.m === app.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								go({
									m: app.id,
									v: "workspace",
									d: void 0,
									id: void 0
								});
								setOpen(false);
							},
							className: cn("mb-0.5 flex h-11 w-full items-center gap-3 rounded-md px-3 text-sm", active ? "bg-sidebar-hover" : "text-sidebar-muted hover:bg-sidebar-hover"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), app.name]
						}, app.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex h-12 items-center gap-3 px-5 text-sm text-sidebar-muted",
					onClick: () => {
						setLoggedIn(false);
						setOpen(false);
						navigate({ to: "/" });
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Sign out"]
				})
			]
		})]
	});
}
var SplitComponent = DeskShell;
//#endregion
export { SplitComponent as component };
