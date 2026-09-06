import frappe
from frappe.model.document import Document


class AureaSettings(Document):
    def on_update(self):
        frappe.clear_cache()
        frappe.publish_realtime("aurea_settings_update", self.as_dict())
