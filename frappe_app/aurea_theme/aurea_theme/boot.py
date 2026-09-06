import frappe


def boot_session(bootinfo):
    """Expose Aurea settings on frappe.boot so the desk JS can apply them immediately."""
    try:
        if frappe.db.exists("DocType", "Aurea Settings"):
            doc = frappe.get_single("Aurea Settings")
            bootinfo.aurea = {
                "accent_color": doc.get("accent_color") or "#0E5C54",
                "theme_mode": doc.get("theme_mode") or "Light",
                "density": doc.get("density") or "Comfortable",
                "sidebar_style": doc.get("sidebar_style") or "Icon Rail",
                "custom_css": doc.get("custom_css") or "",
            }
        else:
            bootinfo.aurea = {
                "accent_color": "#0E5C54",
                "theme_mode": "Light",
                "density": "Comfortable",
                "sidebar_style": "Icon Rail",
                "custom_css": "",
            }
    except Exception:
        bootinfo.aurea = {
            "accent_color": "#0E5C54",
            "theme_mode": "Light",
            "density": "Comfortable",
            "sidebar_style": "Icon Rail",
            "custom_css": "",
        }
