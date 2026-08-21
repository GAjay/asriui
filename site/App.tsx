import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AxiomProvider } from "../src/config";
import { ToastProvider } from "../src/components/Toast";
import { getRouterBasename } from "./routerBasename";
import { siteAxiomConfig } from "./axiomSiteConfig";
import { SiteThemeProvider } from "./useSiteTheme";
import { LandingPage } from "./LandingPage";
import { ScrollToTop } from "./ScrollToTop";

const DocsLayout = lazy(() =>
  import("./docs/DocsLayout").then((m) => ({ default: m.DocsLayout })),
);
const ComponentDocPage = lazy(() =>
  import("./docs/ComponentDocPage").then((m) => ({ default: m.ComponentDocPage })),
);
const DocsIndex = lazy(() =>
  import("./docs/ComponentDocPage").then((m) => ({ default: m.DocsIndex })),
);
const GettingStartedPage = lazy(() =>
  import("./docs/GettingStartedPage").then((m) => ({ default: m.GettingStartedPage })),
);
const TemplatesPage = lazy(() =>
  import("./docs/TemplatesPage").then((m) => ({ default: m.TemplatesPage })),
);
const TemplateDocPage = lazy(() =>
  import("./docs/TemplateDocPage").then((m) => ({ default: m.TemplateDocPage })),
);
const RoadmapPage = lazy(() =>
  import("./docs/RoadmapPage").then((m) => ({ default: m.RoadmapPage })),
);
const ReleasesPage = lazy(() =>
  import("./docs/ReleasesPage").then((m) => ({ default: m.ReleasesPage })),
);
const StylingPage = lazy(() =>
  import("./docs/StylingPage").then((m) => ({ default: m.StylingPage })),
);
const ThemePage = lazy(() =>
  import("./docs/ThemePage").then((m) => ({ default: m.ThemePage })),
);
const TypographyGuidePage = lazy(() =>
  import("./docs/TypographyGuidePage").then((m) => ({ default: m.TypographyGuidePage })),
);
const TokensPage = lazy(() =>
  import("./docs/TokensPage").then((m) => ({ default: m.TokensPage })),
);
const BrandingPage = lazy(() =>
  import("./docs/BrandingPage").then((m) => ({ default: m.BrandingPage })),
);

const TemplatesLayout = lazy(() =>
  import("./templates/TemplatesLayout").then((m) => ({ default: m.TemplatesLayout })),
);
const TemplatesIndex = lazy(() =>
  import("./templates/TemplatesIndex").then((m) => ({ default: m.TemplatesIndex })),
);
const AuthorAboutPage = lazy(() =>
  import("./AboutPage").then((m) => ({ default: m.AboutPage })),
);
const AboutPage = lazy(() =>
  import("./templates/AboutPage").then((m) => ({ default: m.AboutPage })),
);
const ContactPage = lazy(() =>
  import("./templates/ContactPage").then((m) => ({ default: m.ContactPage })),
);
const DashboardPage = lazy(() =>
  import("./templates/DashboardPage").then((m) => ({ default: m.DashboardPage })),
);
const PricingPage = lazy(() =>
  import("./templates/PricingPage").then((m) => ({ default: m.PricingPage })),
);
const LoginPage = lazy(() =>
  import("./templates/LoginPage").then((m) => ({ default: m.LoginPage })),
);
const ShopPage = lazy(() =>
  import("./templates/ShopPage").then((m) => ({ default: m.ShopPage })),
);
const CartPage = lazy(() =>
  import("./templates/CartPage").then((m) => ({ default: m.CartPage })),
);
const CheckoutPage = lazy(() =>
  import("./templates/CheckoutPage").then((m) => ({ default: m.CheckoutPage })),
);
const SettingsPage = lazy(() =>
  import("./templates/SettingsPage").then((m) => ({ default: m.SettingsPage })),
);
const InboxPage = lazy(() =>
  import("./templates/InboxPage").then((m) => ({ default: m.InboxPage })),
);
const BillingPage = lazy(() =>
  import("./templates/BillingPage").then((m) => ({ default: m.BillingPage })),
);
const TeamPage = lazy(() =>
  import("./templates/TeamPage").then((m) => ({ default: m.TeamPage })),
);
const OnboardingPage = lazy(() =>
  import("./templates/OnboardingPage").then((m) => ({ default: m.OnboardingPage })),
);
const AnalyticsPage = lazy(() =>
  import("./templates/AnalyticsPage").then((m) => ({ default: m.AnalyticsPage })),
);
const JsonPageDemo = lazy(() =>
  import("./templates/JsonPageDemo").then((m) => ({ default: m.JsonPageDemo })),
);
const AiWorkflowPage = lazy(() =>
  import("./templates/AiWorkflowPage").then((m) => ({ default: m.AiWorkflowPage })),
);
const AiOrchestratorPage = lazy(() =>
  import("./templates/AiOrchestratorPage").then((m) => ({ default: m.AiOrchestratorPage })),
);
const WatchLandingPage = lazy(() =>
  import("./templates/WatchLandingPage").then((m) => ({ default: m.WatchLandingPage })),
);
const TemplateNotFoundPage = lazy(() =>
  import("./templates/TemplateNotFoundPage").then((m) => ({ default: m.TemplateNotFoundPage })),
);

function RouteFallback() {
  return null;
}

export function App() {
  return (
    <AxiomProvider config={siteAxiomConfig}>
      <ToastProvider position="top-right">
        <SiteThemeProvider>
        <BrowserRouter basename={getRouterBasename()}>
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AuthorAboutPage />} />
          <Route element={<TemplatesLayout />}>
            <Route path="/templates" element={<TemplatesIndex />} />
            <Route path="/templates/about" element={<AboutPage />} />
            <Route path="/templates/contact" element={<ContactPage />} />
            <Route path="/templates/pricing" element={<PricingPage />} />
            <Route path="/templates/dashboard" element={<DashboardPage />} />
            <Route path="/templates/analytics" element={<AnalyticsPage />} />
            <Route path="/templates/billing" element={<BillingPage />} />
            <Route path="/templates/team" element={<TeamPage />} />
            <Route path="/templates/login" element={<LoginPage />} />
            <Route path="/templates/onboarding" element={<OnboardingPage />} />
            <Route path="/templates/shop" element={<ShopPage />} />
            <Route path="/templates/cart" element={<CartPage />} />
            <Route path="/templates/checkout" element={<CheckoutPage />} />
            <Route path="/templates/settings" element={<SettingsPage />} />
            <Route path="/templates/inbox" element={<InboxPage />} />
            <Route path="/templates/watch-landing" element={<WatchLandingPage />} />
            <Route path="/templates/json-page" element={<JsonPageDemo />} />
            <Route path="/templates/ai-workflow" element={<AiWorkflowPage />} />
            <Route path="/templates/ai-orchestrator" element={<AiOrchestratorPage />} />
            <Route path="/templates/*" element={<TemplateNotFoundPage />} />
          </Route>
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<DocsIndex />} />
            <Route path="components/:slug" element={<ComponentDocPage />} />
            <Route path="getting-started" element={<GettingStartedPage />} />
            <Route path="overview" element={<Navigate to="/docs/getting-started" replace />} />
            <Route path="styling" element={<StylingPage />} />
            <Route path="theme" element={<ThemePage />} />
            <Route path="typography" element={<TypographyGuidePage />} />
            <Route path="branding" element={<BrandingPage />} />
            <Route path="tokens" element={<TokensPage />} />
            <Route path="templates" element={<TemplatesPage />} />
            <Route path="templates/:slug" element={<TemplateDocPage />} />
            <Route path="roadmap" element={<RoadmapPage />} />
            <Route path="releases" element={<ReleasesPage />} />
            <Route path="changelog" element={<Navigate to="/docs/releases" replace />} />
            <Route path="playground" element={<Navigate to="/docs/getting-started" replace />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
        </SiteThemeProvider>
      </ToastProvider>
    </AxiomProvider>
  );
}
