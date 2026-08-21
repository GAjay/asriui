import { Outlet, useLocation } from "react-router-dom";
import { LandingSiteHeader } from "../LandingSiteHeader";
import { SectionContextMenu } from "../SectionContextMenu";
import { getTemplateSnippet } from "../docs/templateSnippets";
import { useDocsScrollRestoration } from "../docs/useDocsScrollRestoration";
import { useSiteTheme } from "../useSiteTheme";
import { PAGE_TEMPLATES } from "./templateMeta";
import { TemplateDemoNav } from "./TemplateDemoNav";
import styles from "./templates.module.css";

function isTemplateDemo(pathname: string) {
  const match = pathname.match(/^\/templates\/([^/]+)\/?$/);
  if (!match?.[1]) return false;
  return PAGE_TEMPLATES.some((template) => template.slug === match[1]);
}

export function TemplatesLayout() {
  useDocsScrollRestoration();
  const { theme } = useSiteTheme();
  const { pathname } = useLocation();
  const showDemoNav = isTemplateDemo(pathname);
  const demoMatch = pathname.match(/^\/templates\/([^/]+)\/?$/);
  const snippet = showDemoNav && demoMatch?.[1] ? getTemplateSnippet(demoMatch[1]) : undefined;

  return (
    <div className={styles.siteShell} data-theme={theme} data-landing-page>
      <LandingSiteHeader />
      <main className={styles.demoMain} data-template-demo={showDemoNav ? "true" : undefined}>
        <div className={styles.demoCenter}>
          {snippet ? <SectionContextMenu layoutCode={snippet.code} /> : null}
          {showDemoNav ? (
            <div className={styles.demoToolbarWrap}>
              <TemplateDemoNav />
            </div>
          ) : null}
          <Outlet />
        </div>
      </main>
    </div>
  );
}
