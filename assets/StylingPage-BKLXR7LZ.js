import{j as e}from"./react-vendor-BqYBd8Oh.js";import{D as a}from"./DocPageShell-BxgNL5jg.js";import{s}from"./GuidesPage.module-Bou0J4Vn.js";import{c as t}from"./router-vendor-Des_0oDA.js";import{B as n}from"./Breadcrumb-CFVXumgW.js";import{C as o}from"./CodeBlock-Ccqh1VJo.js";import"./index-CMvYutQe.js";import"./motion-vendor-CY9KY1yJ.js";import"./PageLayout-B8Sdg0jN.js";const c=[{id:"introduction",label:"Introduction"},{id:"what-you-get",label:"What you get"},{id:"overriding",label:"Overriding styles"},{id:"tokens",label:"Design tokens"},{id:"custom-components",label:"Custom components"},{id:"common-issues",label:"Common issues"}],l=`:root,
[data-theme="light"] {
  --asriui-color-background: #ffffff;
  --asriui-color-foreground: #09090b;
  --asriui-color-primary: #18181b;
  --asriui-radius-md: 0.5rem;
}

[data-theme="dark"] {
  --asriui-color-background: #09090b;
  --asriui-color-foreground: #fafafa;
}`,d=`import { Button } from "asriui/button";
import styles from "./SaveBar.module.css";

export function SaveBar() {
  return (
    <div className={styles.bar}>
      <Button className={styles.primary} size="sm">
        Save changes
      </Button>
    </div>
  );
}`,m=`import { cn } from "asriui/utils";
import styles from "./Panel.module.css";

export function Panel({ className, children }: { className?: string; children: React.ReactNode }) {
  return <section className={cn(styles.panel, className)}>{children}</section>;
}

/* Panel.module.css — reuse AsriUI tokens */
.panel {
  padding: var(--asriui-space-4);
  border: 1px solid var(--asriui-color-border);
  border-radius: var(--asriui-radius-lg);
  background: var(--asriui-color-background);
  color: var(--asriui-color-foreground);
}`;function b(){const r=t();return e.jsx(a,{toc:c.map(i=>({...i})),children:e.jsxs("article",{className:s.page,children:[e.jsx(n,{className:s.breadcrumb,showBack:!0,onBack:()=>r("/docs/getting-started"),items:[{label:"Docs",href:"/docs/getting-started"},{label:"Guides",href:"/docs/styling"},{label:"Styling",current:!0}]}),e.jsxs("header",{className:s.header,children:[e.jsx("p",{className:s.kicker,children:"Guides"}),e.jsx("h1",{className:s.title,children:"Styling"}),e.jsx("p",{className:s.lead,children:"How to approach styling with AsriUI — CSS Modules, design tokens, and when to build custom components instead of fighting overrides."}),e.jsxs("div",{className:s.metaRow,children:[e.jsx("span",{className:s.metaBadge,children:"CSS Modules"}),e.jsx("span",{className:s.metaBadge,children:"Design tokens"}),e.jsx("span",{className:s.metaBadge,children:"No CSS-in-JS runtime"})]})]}),e.jsxs("section",{className:s.section,id:"introduction",children:[e.jsx("h2",{className:s.sectionTitle,children:"Introduction"}),e.jsxs("p",{className:s.prose,children:["AsriUI does not ship a ",e.jsx("code",{children:"css"})," or ",e.jsx("code",{children:"sx"})," prop and does not depend on a styling library at runtime. Components are built with vanilla CSS Modules. You pick the styling stack for your app — Tailwind, plain CSS, or Modules — without fighting an embedded system."]}),e.jsxs("p",{className:s.prose,children:["Import styles once at your app entry: ",e.jsx("code",{children:'import "asriui/style.css"'}),"."]})]}),e.jsxs("section",{className:s.section,id:"what-you-get",children:[e.jsx("h2",{className:s.sectionTitle,children:"What you get"}),e.jsx("p",{className:s.prose,children:"Components are intentionally closed: they expose props and theme tokens rather than every internal class. You also get the same CSS custom properties that power the kit, so custom UI can feel native to AsriUI."}),e.jsxs("ul",{className:s.changeList,children:[e.jsx("li",{children:"Tokenized color, space, radius, shadow, and typography variables"}),e.jsxs("li",{children:[e.jsx("code",{children:"className"})," and ",e.jsx("code",{children:"style"})," on most components for light composition"]}),e.jsxs("li",{children:["Light and dark themes via ",e.jsx("code",{children:"data-theme"})," (see the Theme guide)"]})]})]}),e.jsxs("section",{className:s.section,id:"overriding",children:[e.jsx("h2",{className:s.sectionTitle,children:"Overriding styles"}),e.jsx("p",{className:s.prose,children:"Prefer props and tokens first. If you find yourself overriding many internals, that is a signal to compose a custom component with the same tokens — not to pierce deep selectors."}),e.jsx(o,{code:d,language:"tsx",showCopy:!0,filename:"SaveBar.tsx"}),e.jsx("p",{className:s.prose,children:"Good defaults: use existing variants and sizes, tweak tokens at the theme root, or wrap primitives. Avoid targeting generated CSS Module hashes."})]}),e.jsxs("section",{className:s.section,id:"tokens",children:[e.jsx("h2",{className:s.sectionTitle,children:"Design tokens"}),e.jsxs("p",{className:s.prose,children:["Override tokens on ",e.jsx("code",{children:":root"})," / ",e.jsx("code",{children:"[data-theme]"})," to rebrand the whole kit. Token changes are treated as breaking when names are removed or renamed."]}),e.jsx(o,{code:l,language:"tsx",showCopy:!0,filename:"theme.css"})]}),e.jsxs("section",{className:s.section,id:"custom-components",children:[e.jsx("h2",{className:s.sectionTitle,children:"Custom components"}),e.jsxs("p",{className:s.prose,children:["Build product-specific UI with the same building blocks AsriUI uses: tokens,"," ",e.jsx("code",{children:"cn()"})," for class merges, and layout primitives like"," ",e.jsx("code",{children:"Container"}),", ",e.jsx("code",{children:"Flex"}),", and ",e.jsx("code",{children:"Grid"}),"."]}),e.jsx(o,{code:m,language:"tsx",showCopy:!0,filename:"Panel.tsx"})]}),e.jsxs("section",{className:s.section,id:"common-issues",children:[e.jsx("h2",{className:s.sectionTitle,children:"Common issues"}),e.jsx("h3",{className:s.releaseVersion,style:{fontSize:"1.05rem"},children:"Portals and theme tokens"}),e.jsxs("p",{className:s.prose,children:["Content rendered in a portal still inherits ",e.jsx("code",{children:"data-theme"})," from"," ",e.jsx("code",{children:"document.documentElement"}),". Keep theme on the root (via"," ",e.jsx("code",{children:"AsriUIProvider"})," or ",e.jsx("code",{children:"ThemeSwitch"}),") so overlays stay consistent."]}),e.jsx("h3",{className:s.releaseVersion,style:{fontSize:"1.05rem"},children:"CSS import order"}),e.jsxs("p",{className:s.prose,children:["Import ",e.jsx("code",{children:"asriui/style.css"})," before your app CSS so your rules can override tokens and utility classes predictably. If a framework reorders CSS in production, merge imports or use layers."]}),e.jsx("h3",{className:s.releaseVersion,style:{fontSize:"1.05rem"},children:"Tailwind preflight"}),e.jsxs("p",{className:s.prose,children:["Tailwind base resets can strip button backgrounds. Prefer separate CSS layers, skip"," ",e.jsx("code",{children:"@tailwind base"})," where it conflicts, or re-assert AsriUI button tokens after preflight."]})]})]})})}export{b as StylingPage};
//# sourceMappingURL=StylingPage-BKLXR7LZ.js.map
