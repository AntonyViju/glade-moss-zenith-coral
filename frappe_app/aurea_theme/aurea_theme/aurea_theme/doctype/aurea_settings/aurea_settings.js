frappe.ui.form.on("Aurea Settings", {
  refresh(frm) {
    frm.add_custom_button(__("Apply now"), () => {
      if (window.aurea && aurea.applySettings) {
        aurea.applySettings({
          accent_color: frm.doc.accent_color,
          theme_mode: frm.doc.theme_mode,
          density: frm.doc.density,
          sidebar_style: frm.doc.sidebar_style,
          custom_css: frm.doc.custom_css,
        });
        frappe.show_alert({ message: __("Aurea applied"), indicator: "green" });
      } else {
        frappe.ui.toolbar.clear_cache();
      }
    });
  },
});
