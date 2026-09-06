# Aurea

A premium desk theme for ERPNext / Frappe. Install it on any site and the entire UI restyles — navbar, workspace, list, form, kanban, chatter, login — without forking core.

## Install

```sh
# unzip into frappe-bench/apps/aurea_theme
bench --site [site] install-app aurea_theme
bench build --app aurea_theme
bench --site [site] clear-cache
bench restart
```

Open `/app` and hard-refresh. Search **Aurea Settings** to change accent, density, and dark mode.

## Uninstall

```sh
bench --site [site] uninstall-app aurea_theme
bench build
```

No ERPNext DocTypes are patched. Compatible with Frappe / ERPNext v14–v16.
