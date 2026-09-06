import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { useDeskStore } from "@/lib/desk-store";
import appCss from "../styles.css?url";

const APP_NAME = "Aurea";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "theme-color", content: "#0E5C54" },
      {
        name: "description",
        content: "Aurea — a premium ERPNext desk theme. Odoo-inspired, quieter, and installable on any site.",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" suppressHydrationWarning data-skin="aurea" data-mode="light" data-accent="harbor">
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <DeskHydrate />
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});

function DeskHydrate() {
  useEffect(() => {
    void Promise.resolve(useDeskStore.persist.rehydrate()).then(() => {
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
