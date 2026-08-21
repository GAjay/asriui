import{r as d,j as e}from"./react-vendor-BqYBd8Oh.js";import{D as w}from"./DocPageShell-BxgNL5jg.js";import{T as y}from"./ThemeDocPreview-CAGy-OGh.js";import{d as j,e as b,f as k,h as N,i as h,j as _}from"./index-CMvYutQe.js";import{B as g}from"./Badge-BNdCUAYL.js";import{s}from"./GettingStartedPage.module-Ds0GUNfC.js";import{c as C}from"./router-vendor-Des_0oDA.js";import{B as P}from"./Breadcrumb-CFVXumgW.js";import{C as m}from"./CodeBlock-Ccqh1VJo.js";import"./PageLayout-B8Sdg0jN.js";import"./motion-vendor-CY9KY1yJ.js";async function S(a,r){if(!(!a.reportUrl||typeof fetch>"u"))try{await fetch(a.reportUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r),keepalive:!0})}catch{}}function T(){const a=j(),r=(a==null?void 0:a.debug.enabled)??!1,o=d.useCallback((n,c)=>r?b(n,{source:"manual",...c}):null,[r]);return d.useMemo(()=>({enabled:r,logError:o,getLogs:N,clearLogs:k}),[r,o])}const A="_fallback_e4vuf_1",E="_title_e4vuf_11",I="_message_e4vuf_17",L="_actions_e4vuf_25",B="_stack_e4vuf_30",u={fallback:A,title:E,message:I,actions:L,stack:B};function D({error:a,reset:r,showStack:o}){return e.jsxs("div",{className:u.fallback,role:"alert",children:[e.jsx("h2",{className:u.title,children:"Something went wrong"}),e.jsx("p",{className:u.message,children:a.message}),o&&a.stack?e.jsx("pre",{className:u.stack,children:a.stack}):null,e.jsx("div",{className:u.actions,children:e.jsx(h,{onClick:r,children:"Try again"})})]})}class U extends d.Component{constructor(){super(...arguments),this.state={error:null},this.reset=()=>this.setState({error:null})}static getDerivedStateFromError(r){return{error:r}}componentDidCatch(r,o){var t,p,x,f;(p=(t=this.props).onError)==null||p.call(t,r,o);const n=(x=this.props.asriuiConfig)==null?void 0:x.debug;n!=null&&n.enabled&&b(r,{source:"error-boundary",componentStack:o.componentStack??void 0});const c=(f=this.props.asriuiConfig)==null?void 0:f.monitoring,l=this.props.monitoringUrl??(c==null?void 0:c.reportUrl);c!=null&&c.enabled&&l&&S({enabled:!0,reportUrl:l},{message:r.message,stack:r.stack,componentStack:o.componentStack??void 0,url:typeof window<"u"?window.location.href:"",userAgent:typeof navigator<"u"?navigator.userAgent:"",timestamp:new Date().toISOString()})}render(){var c;const{error:r}=this.state;if(!r)return this.props.children;const o={error:r,reset:this.reset},{fallback:n}=this.props;return typeof n=="function"?n(o):n||e.jsx(D,{...o,showStack:((c=this.props.asriuiConfig)==null?void 0:c.debug.enabled)&&this.props.asriuiConfig.debug.showStack})}}function v(a){const r=j();return e.jsx(U,{...a,asriuiConfig:r})}v.displayName="ErrorBoundary";const O=`// site/pwa.config.ts
import type { VitePWAOptions } from "vite-plugin-pwa";

export const pwaOptions = {
  registerType: "autoUpdate",
  injectRegister: "auto",
  includeAssets: ["favicon.svg", "apple-touch-icon.svg", "mask-icon.svg"],
  manifest: {
    name: "AsriUI",
    short_name: "AsriUI",
    description: "Production-ready React UI components with docs and live demos.",
    theme_color: "#000000",
    background_color: "#ffffff",
    display: "standalone",
    start_url: "/",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  },
  workbox: {
    navigateFallback: "/index.html",
    globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,gif,svg,webp,avif,woff,woff2}"],
    runtimeCaching: [
      {
        urlPattern: /\\.(?:png|gif|jpg|jpeg|svg|webp|avif|ico)$/i,
        handler: "CacheFirst",
        options: {
          cacheName: "asriui-images",
          expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 7 },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
      {
        urlPattern: /\\.(?:woff2?|ttf|otf)$/i,
        handler: "CacheFirst",
        options: {
          cacheName: "asriui-fonts",
          expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
        },
      },
    ],
  },
} satisfies Partial<VitePWAOptions>;`,M=`// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { pwaOptions } from "./site/pwa.config";

export default defineConfig({
  plugins: [react(), VitePWA(pwaOptions)],
});`,W="_shell_bbwc1_1",G="_note_bbwc1_11",R="_toolbar_bbwc1_18",F="_grid_bbwc1_24",z="_panel_bbwc1_30",H="_panelLabel_bbwc1_39",V="_list_bbwc1_48",$="_fallback_bbwc1_58",X="_fallbackTitle_bbwc1_63",q="_stack_bbwc1_70",J="_ok_bbwc1_86",K="_logs_bbwc1_92",Q="_logsHead_bbwc1_97",Y="_logList_bbwc1_103",Z="_logItem_bbwc1_111",ee="_logSource_bbwc1_123",se="_logMeta_bbwc1_133",re="_empty_bbwc1_139",i={shell:W,note:G,toolbar:R,grid:F,panel:z,panelLabel:H,list:V,fallback:$,fallbackTitle:X,stack:q,ok:J,logs:K,logsHead:Q,logList:Y,logItem:Z,logSource:ee,logMeta:se,empty:re};function ie(){throw new Error("Render crash — caught by ErrorBoundary")}function ae(){const a=T(),[r,o]=d.useState(!1),[n,c]=d.useState(()=>a.getLogs()),l=()=>c(a.getLogs());return a.enabled?e.jsxs("div",{className:i.shell,children:[e.jsxs("div",{className:i.toolbar,children:[e.jsx(h,{size:"sm",variant:"outline",onClick:()=>{a.logError(new Error("Manual debug error from docs demo")),l()},children:"Log manual error"}),e.jsx(h,{size:"sm",variant:"outline",onClick:()=>{o(!0),l()},children:"Trigger render error"}),e.jsx(h,{size:"sm",variant:"ghost",onClick:()=>{a.clearLogs(),o(!1),l()},children:"Clear logs"})]}),e.jsxs("div",{className:i.grid,children:[e.jsxs("div",{className:i.panel,children:[e.jsx("p",{className:i.panelLabel,children:"What you will see"}),e.jsxs("ul",{className:i.list,children:[e.jsx("li",{children:"Toast notification with the error message"}),e.jsxs("li",{children:["Collapsed console group: ",e.jsx("code",{children:"[AsriUI Debug] …"})]}),e.jsx("li",{children:"ErrorBoundary fallback with stack trace when debug is on"}),e.jsxs("li",{children:["In-memory log entries via ",e.jsx("code",{children:"useAsriUIDebug().getLogs()"})]})]})]}),e.jsxs("div",{className:i.panel,children:[e.jsx("p",{className:i.panelLabel,children:"Live boundary"}),e.jsx(v,{fallback:({error:t,reset:p})=>e.jsxs("div",{className:i.fallback,children:[e.jsx(g,{variant:"destructive",children:"ErrorBoundary"}),e.jsx("p",{className:i.fallbackTitle,children:t.message}),t.stack?e.jsx("pre",{className:i.stack,children:t.stack}):null,e.jsx(h,{size:"sm",onClick:()=>{o(!1),p(),l()},children:"Reset preview"})]}),children:r?e.jsx(ie,{}):e.jsx("p",{className:i.ok,children:"No errors — preview is healthy."})})]})]}),e.jsxs("div",{className:i.logs,children:[e.jsxs("div",{className:i.logsHead,children:[e.jsx("p",{className:i.panelLabel,children:"Captured logs"}),e.jsx(g,{variant:"secondary",children:n.length})]}),n.length?e.jsx("ul",{className:i.logList,children:n.slice(0,4).map(t=>e.jsxs("li",{className:i.logItem,children:[e.jsx("span",{className:i.logSource,children:t.source}),e.jsx("strong",{children:t.message}),e.jsx("span",{className:i.logMeta,children:new Date(t.timestamp).toLocaleTimeString()})]},t.id))}):e.jsx("p",{className:i.empty,children:"Trigger an error above to populate the debug log."})]})]}):e.jsx("div",{className:i.shell,children:e.jsxs("p",{className:i.note,children:["Debug mode is off. Set ",e.jsx("code",{children:"debug: true"})," on ",e.jsx("code",{children:"AsriUIProvider"})," (this docs site enables it automatically in development)."]})})}const te=[{id:"installation",label:"Installation"},{id:"configuration",label:"Configuration"},{id:"debugging",label:"Debug mode"},{id:"pwa",label:"PWA"},{id:"subpath-imports",label:"Subpath imports"},{id:"theming",label:"Theming"}],oe=`pnpm add asriui framer-motion

import { Button } from "asriui";
import "asriui/style.css";

export function App() {
  return <Button>Get Started</Button>;
}`,ne=`import { AsriUIProvider } from "asriui/config";
import { Button } from "asriui";
import "asriui/style.css";

const config = {
  theme: "light", // "light" | "dark" | "system"
  motion: "apple", // "apple" | "snappy" | "soft" | "playful" | "minimal"
  fontFamily: '"Work Sans", ui-sans-serif, sans-serif',
  analytics: {
    enabled: true,
    gtmId: "GTM-XXXX",
    dataLayerName: "dataLayer",
  },
  monitoring: {
    enabled: true,
    reportUrl: "/api/errors",
  },
  debug: import.meta.env.DEV, // toast + console logs in development
};

export function App() {
  return (
    <AsriUIProvider config={config}>
      <Button>Get Started</Button>
    </AsriUIProvider>
  );
}`,ce=`import { AsriUIProvider, useAsriUIDebug } from "asriui/config";
import { ErrorBoundary, ToastProvider } from "asriui";

const config = {
  debug: {
    enabled: true,
    notify: true,
    logToConsole: true,
    captureGlobal: true,
    showStack: true,
  },
};

function ReportPanel() {
  const debug = useAsriUIDebug();

  return (
    <button type="button" onClick={() => debug.logError(new Error("Demo failure"))}>
      Log test error
    </button>
  );
}

export function App() {
  return (
    <AsriUIProvider config={config}>
      <ToastProvider>
        <ErrorBoundary>
          <ReportPanel />
        </ErrorBoundary>
      </ToastProvider>
    </AsriUIProvider>
  );
}`,le=`import { Button } from "asriui/button";
import { Input } from "asriui/input";
import { Dialog } from "asriui/dialog";
import { Typography } from "asriui/typography";
import { cn } from "asriui/utils";
import "asriui/style.css";`,de=`// Toggle with a root attribute — no provider required
<div data-theme="dark">
  <Button>Save</Button>
</div>

// Or override tokens in CSS
:root {
  --asriui-color-primary: #0ea5e9;
}`,pe=[{id:"light",label:"Light"},{id:"dark",label:"Dark"},{id:"system",label:"System"}];function ke(){const a=C(),[r,o]=d.useState("light"),[n,c]=d.useState(!1);d.useEffect(()=>{const t=window.matchMedia("(prefers-color-scheme: dark)"),p=()=>c(t.matches);return p(),t.addEventListener("change",p),()=>t.removeEventListener("change",p)},[]);const l=d.useMemo(()=>r==="system"?n?"dark":"light":r,[r,n]);return e.jsx(w,{toc:[...te],children:e.jsxs("article",{className:s.page,children:[e.jsx(P,{className:s.breadcrumb,showBack:!0,onBack:()=>a(-1),items:[{label:"Home",href:"/"},{label:"Overview",current:!0}]}),e.jsxs("header",{className:s.header,children:[e.jsx("p",{className:s.kicker,children:"Documentation"}),e.jsx("h1",{className:s.title,children:"Overview"}),e.jsxs("p",{className:s.lead,children:["Install AsriUI, wrap your app with ",e.jsx("code",{children:"AsriUIProvider"}),", and configure theme, fonts, analytics, and monitoring from a single config object."]}),e.jsxs("div",{className:s.metaRow,children:[e.jsx("span",{className:s.metaBadge,children:"React 18+"}),e.jsx("span",{className:s.metaBadge,children:"TypeScript"}),e.jsx("span",{className:s.metaBadge,children:"Tree-shakable"})]})]}),e.jsxs("section",{id:"installation",className:s.section,children:[e.jsx("h2",{className:s.sectionTitle,children:"Installation"}),e.jsxs("p",{className:s.prose,children:["Add the package and import styles once at your app entry. Peer dependencies:"," ",e.jsx("code",{children:"react"}),", ",e.jsx("code",{children:"react-dom"})," (≥18), and ",e.jsx("code",{children:"framer-motion"})," (≥11)."]}),e.jsx(m,{code:oe,language:"bash",showCopy:!0,filename:"setup"})]}),e.jsxs("section",{id:"configuration",className:s.section,children:[e.jsx("h2",{className:s.sectionTitle,children:"Configuration"}),e.jsxs("p",{className:s.prose,children:[e.jsx("code",{children:"AsriUIProvider"})," applies theme mode, global font stack, Google Tag Manager analytics, and remote error reporting. Use the preview to see how theme mode affects components."]}),e.jsxs("div",{className:s.configShell,children:[e.jsxs("div",{className:s.codePane,children:[e.jsx("div",{className:s.paneLabel,children:"Provider setup"}),e.jsx("div",{className:s.codeBody,children:e.jsx(m,{code:ne,language:"tsx",showCopy:!0,filename:"App.tsx"})})]}),e.jsxs("div",{className:s.previewPane,children:[e.jsxs("div",{className:s.previewToolbar,children:[e.jsx("span",{className:s.paneLabel,children:"Live preview"}),e.jsx("div",{className:s.themeSwitch,role:"group","aria-label":"Preview theme",children:pe.map(t=>e.jsx("button",{type:"button",className:r===t.id?s.themeBtnActive:s.themeBtn,"aria-pressed":r===t.id,onClick:()=>o(t.id),children:t.label},t.id))})]}),e.jsx("div",{className:s.previewStage,"data-theme":l,children:e.jsxs("div",{className:s.previewCard,children:[e.jsxs("div",{className:s.previewHeader,children:[e.jsx(g,{children:"Preview"}),e.jsxs("span",{className:s.previewThemeLabel,children:[l," mode"]})]}),e.jsx(_,{label:"Email",placeholder:"you@company.com"}),e.jsxs("div",{className:s.previewActions,children:[e.jsx(h,{size:"sm",children:"Primary"}),e.jsx(h,{size:"sm",variant:"outline",children:"Outline"})]})]})})]})]}),e.jsxs("div",{className:s.callout,children:[e.jsx("p",{className:s.calloutLabel,children:"Config options"}),e.jsxs("ul",{className:s.optionList,children:[e.jsxs("li",{children:[e.jsx("code",{children:"theme"})," — ",e.jsx("code",{children:"light"}),", ",e.jsx("code",{children:"dark"}),", or"," ",e.jsx("code",{children:"system"})]}),e.jsxs("li",{children:[e.jsx("code",{children:"motion"})," — ",e.jsx("code",{children:"apple"}),", ",e.jsx("code",{children:"snappy"}),", ",e.jsx("code",{children:"soft"}),","," ",e.jsx("code",{children:"playful"}),", or ",e.jsx("code",{children:"minimal"})," animation preset pack"]}),e.jsxs("li",{children:[e.jsx("code",{children:"fontFamily"})," — sets ",e.jsx("code",{children:"--asriui-font-family"})," on the document root"]}),e.jsxs("li",{children:[e.jsx("code",{children:"analytics.gtmId"})," — injects GTM; ",e.jsx("code",{children:"Button"})," and ",e.jsx("code",{children:"Link"})," ","emit ",e.jsx("code",{children:"asriui_button_click"})," / ",e.jsx("code",{children:"asriui_link_click"})," events. Override per instance with ",e.jsx("code",{children:"trackEvent"}),", ",e.jsx("code",{children:"trackLabel"}),", and"," ",e.jsx("code",{children:"trackPayload"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"monitoring.reportUrl"})," — ",e.jsx("code",{children:"ErrorBoundary"})," POSTs caught errors"]}),e.jsxs("li",{children:[e.jsx("code",{children:"debug"})," — developer mode with toast notifications, console logs, and global error capture (see below)"]})]})]})]}),e.jsxs("section",{id:"debugging",className:s.section,children:[e.jsx("h2",{className:s.sectionTitle,children:"Debug mode"}),e.jsxs("p",{className:s.prose,children:["Enable ",e.jsx("code",{children:"debug"})," on ",e.jsx("code",{children:"AsriUIProvider"})," to surface errors with toast notifications, structured console logs, and an in-memory log you can inspect via"," ",e.jsx("code",{children:"useAsriUIDebug()"}),". Pair with ",e.jsx("code",{children:"ToastProvider"})," and"," ",e.jsx("code",{children:"ErrorBoundary"})," for the best experience."]}),e.jsx(m,{code:ce,language:"tsx",showCopy:!0,filename:"App.tsx"}),e.jsx(ae,{})]}),e.jsxs("section",{id:"pwa",className:s.section,children:[e.jsx("h2",{className:s.sectionTitle,children:"Progressive web app (PWA)"}),e.jsxs("p",{className:s.prose,children:["This docs site is installable as a PWA. Configure the web app manifest, icons, and service worker in ",e.jsx("code",{children:"site/pwa.config.ts"}),", then register the plugin in your Vite config. Run ",e.jsx("code",{children:"pnpm build:site"})," to generate the service worker and manifest."]}),e.jsx(m,{code:O,language:"tsx",showCopy:!0,filename:"site/pwa.config.ts"}),e.jsx("div",{className:s.codeSpacer}),e.jsx(m,{code:M,language:"tsx",showCopy:!0,filename:"vite.config.ts"}),e.jsxs("div",{className:s.callout,children:[e.jsx("p",{className:s.calloutLabel,children:"PWA checklist"}),e.jsxs("ul",{className:s.optionList,children:[e.jsxs("li",{children:["Add ",e.jsx("code",{children:"public/favicon.svg"}),", ",e.jsx("code",{children:"apple-touch-icon.svg"}),", and PNG icons at 192×192 and 512×512"]}),e.jsxs("li",{children:["Set ",e.jsx("code",{children:"theme_color"})," and ",e.jsx("code",{children:"background_color"})," to match your brand"]}),e.jsxs("li",{children:[e.jsx("code",{children:'registerType: "autoUpdate"'})," refreshes the service worker when you deploy"]}),e.jsx("li",{children:"Images and fonts use CacheFirst with expiration so repeat views stay local, then refetch after the TTL"})]})]})]}),e.jsxs("section",{id:"subpath-imports",className:s.section,children:[e.jsx("h2",{className:s.sectionTitle,children:"Subpath imports"}),e.jsxs("p",{className:s.prose,children:["Import only the modules you need. Each component ships as a separate ESM chunk under"," ",e.jsx("code",{children:"dist/"})," for smaller bundles."]}),e.jsx(m,{code:le,language:"tsx",showCopy:!0,filename:"imports.ts"})]}),e.jsxs("section",{id:"theming",className:s.section,children:[e.jsx("h2",{className:s.sectionTitle,children:"Theming"}),e.jsx("p",{className:s.prose,children:"AsriUI uses CSS custom properties. Toggle light or dark with a root attribute, or override tokens in your own stylesheet. Use the site theme toggle in the docs sidebar or the preview below to see components in each mode."}),e.jsx(y,{}),e.jsx("div",{className:s.codeSpacer}),e.jsx(m,{code:de,language:"tsx",showCopy:!0,filename:"theme.tsx"})]})]})})}export{ke as GettingStartedPage};
//# sourceMappingURL=GettingStartedPage-CGs6Zuvm.js.map
