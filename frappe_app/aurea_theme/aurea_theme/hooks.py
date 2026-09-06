app_name = "aurea_theme"
app_title = "Aurea"
app_publisher = "Aurea"
app_description = "Premium Odoo-inspired desk theme for ERPNext"
app_email = "hello@aurea.desk"
app_license = "mit"
app_version = "1.0.0"

app_include_css = ["/assets/aurea_theme/css/aurea.css"]
app_include_js = ["/assets/aurea_theme/js/aurea.js"]
web_include_css = ["/assets/aurea_theme/css/aurea.css"]
web_include_js = ["/assets/aurea_theme/js/aurea.js"]

after_install = "aurea_theme.install.after_install"
after_migrate = "aurea_theme.install.after_migrate"
boot_session = "aurea_theme.boot.boot_session"

fixtures = []
