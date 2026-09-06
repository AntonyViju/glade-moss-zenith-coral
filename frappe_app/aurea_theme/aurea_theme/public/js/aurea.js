/* Aurea desk runtime — apply settings, inject switcher, keep class on body. */
frappe.provide("aurea");

aurea.defaults = {
  accent_color: "#0E5C54",
  theme_mode: "Light",
  density: "Comfortable",
  sidebar_style: "Icon Rail",
  custom_css: "",
};

aurea.getSettings = function () {
  const boot = (window.frappe && frappe.boot && frappe.boot.aurea) || {};
  const stored = (() => {
    try {
      return JSON.parse(localStorage.getItem("aurea-settings") || "{}");
    } catch (e) {
      return {};
    }
  })();
  return Object.assign({}, aurea.defaults, boot, stored);
};

aurea.applySettings = function (override) {
  const s = Object.assign(aurea.getSettings(), override || {});
  try {
    localStorage.setItem("aurea-settings", JSON.stringify(s));
  } catch (e) {
    /* ignore quota */
  }

  const html = document.documentElement;
  const body = document.body;
  html.classList.add("aurea-root");
  body.classList.add("aurea-desk");

  const dark =
    s.theme_mode === "Dark" ||
    (s.theme_mode === "System" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  html.classList.toggle("aurea-dark", !!dark);
  body.classList.toggle("aurea-dark", !!dark);
  body.classList.toggle("aurea-compact", s.density === "Compact");
  body.classList.toggle("aurea-rail", s.sidebar_style === "Icon Rail");

  const accent = s.accent_color || aurea.defaults.accent_color;
  html.style.setProperty("--aurea-accent", accent);
  html.style.setProperty("--primary", accent);
  html.style.setProperty("--primary-color", accent);

  let tag = document.getElementById("aurea-custom-css");
  if (!tag) {
    tag = document.createElement("style");
    tag.id = "aurea-custom-css";
    document.head.appendChild(tag);
  }
  tag.textContent = s.custom_css || "";
};

aurea.injectSwitcher = function () {
  if (document.querySelector(".aurea-switcher")) return;
  const host =
    document.querySelector(".navbar .container") ||
    document.querySelector("header.navbar") ||
    document.querySelector(".navbar");
  if (!host) return;

  const s = aurea.getSettings();
  const wrap = document.createElement("div");
  wrap.className = "aurea-switcher";
  wrap.innerHTML =
    '<button type="button" data-aurea="mode"></button>' +
    '<button type="button" data-aurea="density"></button>';
  const modeBtn = wrap.querySelector('[data-aurea="mode"]');
  const densBtn = wrap.querySelector('[data-aurea="density"]');

  const paint = () => {
    const cur = aurea.getSettings();
    const dark =
      cur.theme_mode === "Dark" ||
      (cur.theme_mode === "System" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    modeBtn.textContent = dark ? "Light" : "Dark";
    densBtn.textContent = cur.density === "Compact" ? "Comfortable" : "Compact";
  };
  paint();

  modeBtn.addEventListener("click", () => {
    const cur = aurea.getSettings();
    const next = cur.theme_mode === "Dark" ? "Light" : "Dark";
    aurea.applySettings({ theme_mode: next });
    paint();
  });
  densBtn.addEventListener("click", () => {
    const cur = aurea.getSettings();
    const next = cur.density === "Compact" ? "Comfortable" : "Compact";
    aurea.applySettings({ density: next });
    paint();
  });

  const actions = host.querySelector(".navbar-right, .nav.navbar-nav.navbar-right, ul.navbar-nav");
  if (actions) actions.prepend(wrap);
  else host.appendChild(wrap);
};

aurea.boot = function () {
  aurea.applySettings();
  aurea.injectSwitcher();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", aurea.boot);
} else {
  aurea.boot();
}

$(document).on("app_ready", function () {
  aurea.boot();
});

$(document).on("page-change", function () {
  document.body.classList.add("aurea-desk");
  aurea.injectSwitcher();
});
