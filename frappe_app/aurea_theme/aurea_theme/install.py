import frappe


def after_install():
    ensure_settings()


def after_migrate():
    ensure_settings()


def ensure_settings():
    if not frappe.db.exists("DocType", "Aurea Settings"):
        return
    try:
        doc = frappe.get_single("Aurea Settings")
        if not doc.accent_color:
            doc.accent_color = "#0E5C54"
        if not doc.theme_mode:
            doc.theme_mode = "Light"
        if not doc.density:
            doc.density = "Comfortable"
        if not doc.sidebar_style:
            doc.sidebar_style = "Icon Rail"
        doc.save(ignore_permissions=True)
        frappe.db.commit()
    except Exception:
        frappe.log_error(title="Aurea Settings bootstrap")
