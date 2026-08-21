const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-DymUt0dR.js","assets/react-vendor-BqYBd8Oh.js","assets/FlowChartInner-ZI84cmyl.js","assets/style-D-a6uSHZ.js","assets/style-BnuhLJ6X.css"])))=>i.map(i=>d[i]);
import{j as e,r as o}from"./react-vendor-BqYBd8Oh.js";import{A as At,I as ir,G as nr,M as sr,P as ar,a as Bi,E as $i}from"./examples-BeZKpSvl.js";import{W as st,i as z,v as xe,a as y,d as Rr,X as qi,I as Z,A as qe,P as Ft,j as Te,_ as Ir,z as Ct,D as Dr,Y as Hi,F as Dt,Z as Oi,$ as Fi,a0 as Ui,a1 as De,O as ee,a2 as Er,x as Wi,y as or,a3 as Vi,a4 as lr,a5 as Gi,k as Qi,a6 as et,w as Yi}from"./index-CMvYutQe.js";import{D as at,V as Xi}from"./DataGrid-D6cgLr67.js";import{C as xt}from"./Callout-B-2zfBYv.js";import{L as Ae,A as Ki,a as Ji,b as Zi,c as en,d as tn,M as X}from"./AiOrchestrator-C-rhWEOr.js";import{A as rn,D as ht}from"./AiWorkflowBuilder-DRI5hvr7.js";import{C as nn}from"./ColorPalette-DNLvsx34.js";import{T as tt}from"./Typography-DFcK0y-j.js";import{T as We}from"./Timeline-kolGVplT.js";import{P as he}from"./PageLayout-B8Sdg0jN.js";import{S as _}from"./SideNav-BWtZrxUB.js";import{C as dr}from"./CodeBlock-Ccqh1VJo.js";import{a as sn,b as an}from"./style-D-a6uSHZ.js";import{B as Ve}from"./Badge-BNdCUAYL.js";import{L as on}from"./LoginForm-BvbRqfOV.js";import{T as ge}from"./Table-BrGNsDNT.js";import{S as fe}from"./ComponentDocPage-DSJw0b8X.js";import{A as ae}from"./Accordion-BTnTIc3Z.js";import{T as Q}from"./Tabs-vm_w4Pok.js";import{m as kt}from"./motion-vendor-CY9KY1yJ.js";import{T as Ge}from"./Tooltip-CnZ2ZT37.js";import{M as ne}from"./Menu-CuMp9a77.js";import{B as de}from"./Breadcrumb-CFVXumgW.js";import"./router-vendor-Des_0oDA.js";import"./menuPosition-DJemRDl6.js";import"./DocPageShell-BxgNL5jg.js";const ln="_root_7a5xs_1",dn="_header_7a5xs_6",cn="_title_7a5xs_11",un="_description_7a5xs_18",mn="_grid_7a5xs_25",pn="_cols2_7a5xs_30",hn="_cols3_7a5xs_34",gn="_cols4_7a5xs_38",Ne={root:ln,header:dn,title:cn,description:un,grid:mn,cols2:pn,cols3:hn,cols4:gn},fn={2:Ne.cols2,3:Ne.cols3,4:Ne.cols4};function zr({title:t,description:r,items:i,columns:n=3,className:s,position:a="bottom-right",duration:l,limit:d,showProgress:u=!0,variants:c}){return e.jsx(st,{position:a,duration:l,limit:d,showProgress:u,variants:c,children:e.jsxs("div",{className:y(Ne.root,s),children:[t||r?e.jsxs("header",{className:Ne.header,children:[t?e.jsx("h3",{className:Ne.title,children:t}):null,r?e.jsx("p",{className:Ne.description,children:r}):null]}):null,e.jsx("div",{className:y(Ne.grid,fn[n]),children:i.map(m=>e.jsx(z,{type:"button",variant:m.buttonVariant??"outline",onClick:()=>xe({...m.toast}),children:m.label},m.label))})]})})}zr.displayName="ToastShowcase";const vn="_root_15bom_1",xn="_muted_15bom_15",bn="_button_15bom_23",yn="_externalIcon_15bom_40",bt={root:vn,muted:xn,button:bn,externalIcon:yn};function wn(t){return/^https?:\/\//i.test(t)}function jn(t,r,i){return i!==void 0?i:r==="_blank"?!0:wn(t)}function Sn(){return e.jsxs("svg",{className:bt.externalIcon,width:"0.85em",height:"0.85em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("path",{d:"M15 3h6v6"}),e.jsx("path",{d:"M10 14 21 3"}),e.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"})]})}const Qe=o.forwardRef(function({href:r,variant:i="default",external:n,showExternalIcon:s,className:a,children:l,target:d,rel:u,onClick:c,track:m,trackEvent:g,trackLabel:h,trackPayload:f,"aria-label":p,...v},x){const w=Rr(),S=jn(r,d,n),C=d==="_blank"||S&&d!=="_self",b=s??S,j=o.useMemo(()=>u||(C?"noopener noreferrer":void 0),[C,u]),T=o.useMemo(()=>p||(C?`${h??(typeof l=="string"?l:void 0)??"Link"} (opens in new tab)`:void 0),[p,l,C,h]),M=k=>{c==null||c(k),!k.defaultPrevented&&w&&qi(w.analytics,{href:r,label:h??(typeof l=="string"?l:void 0),external:S,target:d},{track:m,trackEvent:g,trackLabel:h,trackPayload:f})};return e.jsxs("a",{ref:x,href:r,className:y(bt.root,i==="muted"&&bt.muted,i==="button"&&bt.button,a),target:d,rel:j,"aria-label":T,onClick:M,...v,children:[l,b&&S?e.jsx(Sn,{}):null]})});Qe.displayName="Link";function Et(t){return t==null||typeof t=="boolean"?"":typeof t=="string"||typeof t=="number"?String(t):Array.isArray(t)?t.map(Et).join(""):o.isValidElement(t)?Et(t.props.children):""}const Br="en-US";function Ut(t){var s;const r=t.trim().split("-");if(!r[0])return Br;const i=r[0].toLowerCase(),n=(s=r[1])==null?void 0:s.toUpperCase();return n?`${i}-${n}`:i}function _n(t){const r=t==null?void 0:t.trim();return r?Ut(r):Br}function jt(t){var r;return((r=t.split("-")[0])==null?void 0:r.toLowerCase())??t.toLowerCase()}const Cn=["en-us","us english","english (united states)","english (us)","samantha","aaron","nicky","google us english"];function cr(t,r){const i=t.lang.toLowerCase(),n=Ut(r).toLowerCase(),s=jt(n);let a=0;if(i===n?a+=100:jt(t.lang)===s&&(a+=40),n==="en-us"){i==="en-us"&&(a+=30);const l=`${t.name} ${t.voiceURI}`.toLowerCase();Cn.some(d=>l.includes(d))&&(a+=20),(i==="en-gb"||i==="en-au")&&(a-=15)}return t.localService&&(a+=5),t.default||(a+=2),a}function ur(t,r){return t.reduce((i,n)=>{const s=cr(i,r);return cr(n,r)>s?n:i})}function kn(t,r,i){if(!t.length)return;if(i){const c=t.find(m=>m.voiceURI===i);if(c)return c}const n=Ut(r),s=n.toLowerCase(),a=t.filter(c=>c.lang.toLowerCase()===s);if(a.length)return ur(a,n);const l=jt(n),d=t.filter(c=>jt(c.lang)===l);return d.length?ur(d,n):t.find(c=>c.default)??t[0]}function mr(){return typeof window>"u"||!("speechSynthesis"in window)?[]:window.speechSynthesis.getVoices()}function pr(t=3e3){const r=mr();return r.length?Promise.resolve(r):typeof window>"u"||!("speechSynthesis"in window)?Promise.resolve([]):new Promise(i=>{let n=!1;const s=()=>{n||(n=!0,window.speechSynthesis.removeEventListener("voiceschanged",a),window.clearTimeout(l),i(mr()))},a=()=>s(),l=window.setTimeout(s,t);window.speechSynthesis.addEventListener("voiceschanged",a),window.speechSynthesis.getVoices()})}function Tn({text:t,lang:r="en-US",voiceURI:i,rate:n=1,pitch:s=1}){const[a,l]=o.useState(!1),d=o.useRef(null),u=typeof window<"u"&&"speechSynthesis"in window,c=o.useCallback(()=>{u&&(window.speechSynthesis.cancel(),l(!1))},[u]);o.useEffect(()=>{u&&pr()},[u]);const m=o.useCallback(()=>{if(!u||!t.trim())return;(async()=>{const h=await pr(),f=_n(r),p=kn(h,f,i);window.speechSynthesis.cancel(),await new Promise(x=>window.setTimeout(x,50));const v=new SpeechSynthesisUtterance(t.trim());v.lang=(p==null?void 0:p.lang)??f,p&&(v.voice=p),v.rate=n,v.pitch=s,v.onend=()=>l(!1),v.onerror=()=>l(!1),d.current=v,l(!0),window.speechSynthesis.speak(v)})()},[r,s,n,u,t,i]);return o.useEffect(()=>()=>{u&&window.speechSynthesis.cancel()},[u]),{speak:m,stop:c,speaking:a,supported:u}}const Mn="_root_jeh3b_1",An="_content_jeh3b_8",Nn="_button_jeh3b_12",Pn="_buttonActive_jeh3b_46",gt={root:Mn,content:An,button:Nn,buttonActive:Pn},$r=o.forwardRef(function({className:r,text:i,children:n,lang:s="en-US",voiceURI:a,rate:l=1,pitch:d=1,iconPosition:u="end",speakLabel:c="Listen to this text",disabled:m=!1,...g},h){const f=o.useMemo(()=>i??Et(n),[n,i]),{speak:p,speaking:v,supported:x}=Tn({text:f,lang:s,voiceURI:a,rate:l,pitch:d}),w=e.jsx("button",{type:"button",className:y(gt.button,v&&gt.buttonActive),"aria-label":c,disabled:m||!x||!f.trim(),onClick:()=>p(),children:e.jsx(Z,{name:v?"volume":"speaker",size:"sm"})});return e.jsxs("span",{ref:h,className:y(gt.root,r),...g,children:[u==="start"?w:null,n?e.jsx("span",{className:gt.content,children:n}):null,u==="end"?w:null]})});$r.displayName="TextToSpeech";const Nt=new Set;function Ln({scriptSrc:t,slotId:r,attrs:i,enabled:n=!0,onLoad:s,onError:a}){const l=o.useRef(null),[d,u]=o.useState("idle"),[c,m]=o.useState(null),[g,h]=o.useState(0),f=o.useRef(0);o.useEffect(()=>{const v=l.current;if(!n||!t||!v)return;f.current+=1;const x=f.current;u("loading"),m(null),r&&(v.id=r),Object.entries(i??{}).forEach(([b,j])=>{v.setAttribute(b,j)});const w=()=>{x===f.current&&(Nt.add(t),u("ready"),s==null||s())},S=()=>{if(x!==f.current)return;const b=new Error(`Failed to load widget script: ${t}`);u("error"),m(b),a==null||a(b)};if(Nt.has(t)){w();return}const C=document.createElement("script");return C.src=t,C.async=!0,C.dataset.asriuiWidget=t,C.addEventListener("load",w,{once:!0}),C.addEventListener("error",S,{once:!0}),v.appendChild(C),()=>{C.removeEventListener("load",w),C.removeEventListener("error",S),C.parentNode===v&&v.removeChild(C)}},[i,n,a,s,g,t,r]);const p=o.useCallback(()=>{t&&(Nt.delete(t),u("idle"),m(null),h(v=>v+1))},[t]);return{mountRef:l,status:d,error:c,retry:p}}const Rn="_root_1nk7l_1",In="_frame_1nk7l_13",Dn="_mount_1nk7l_21",En="_state_1nk7l_27",zn="_stateTitle_1nk7l_36",Bn="_stateMessage_1nk7l_42",$n="_skeleton_1nk7l_50",Le={root:Rn,frame:In,mount:Dn,state:En,stateTitle:zn,stateMessage:Bn,skeleton:$n};function hr(t){if(t!==void 0)return typeof t=="number"?`${t}px`:t}function qn(t,r,i,n){return t==="script"?"script":t==="iframe"?"iframe":r?"script":"iframe"}function Hn(){return e.jsx("div",{className:Le.state,"aria-hidden":"true",children:e.jsx("div",{className:Le.skeleton})})}function gr({error:t,retry:r}){return e.jsxs("div",{className:Le.state,role:"alert",children:[e.jsx("p",{className:Le.stateTitle,children:"Widget failed to load"}),e.jsx("p",{className:Le.stateMessage,children:t.message}),e.jsx(z,{size:"sm",variant:"outline",onClick:r,children:"Retry"})]})}const zt=o.forwardRef(function({className:r,mode:i="auto",src:n,scriptSrc:s,slotId:a,attrs:l,title:d="Embedded widget",sandbox:u="allow-scripts allow-same-origin allow-popups allow-forms",height:c=280,width:m="100%",loading:g="lazy",html:h,fallback:f,errorFallback:p,iframeProps:v,onLoad:x,onError:w,style:S,...C},b){const j=qn(i,s,n,h),[T,M]=o.useState(!1),[k,H]=o.useState(null),[L,D]=o.useState(0),O=Ln({scriptSrc:j==="script"?s:void 0,slotId:a,attrs:l,enabled:j==="script",onLoad:x,onError:w}),ie=o.useMemo(()=>({width:hr(m),height:hr(c),...S}),[c,S,m]),A=j==="script"&&O.status==="loading",N=j==="script"&&O.status==="error"&&O.error,V=j==="iframe"&&!T&&!k,q=j==="iframe"&&k,te=()=>{if(j==="script"){O.retry();return}M(!1),H(null),D(Y=>Y+1)};return e.jsxs("div",{ref:b,className:y(Le.root,r),style:ie,"data-asriui-widget":j,...C,children:[j==="script"?e.jsx("div",{ref:O.mountRef,className:Le.mount,"data-widget-slot":a??!0}):e.jsx("iframe",{className:Le.frame,title:d,src:h?void 0:n,srcDoc:h,sandbox:u,loading:g,onLoad:()=>{M(!0),x==null||x()},onError:()=>{const Y=new Error(`Failed to load widget iframe: ${n??"inline html"}`);H(Y),w==null||w(Y)},...v},L),A||V?f??e.jsx(Hn,{}):null,N?(p==null?void 0:p(O.error,te))??e.jsx(gr,{error:O.error,retry:te}):null,q?(p==null?void 0:p(k,te))??e.jsx(gr,{error:k,retry:te}):null]})});zt.displayName="Widget";const On="_root_e2agd_1",Fn="_horizontal_e2agd_7",Un="_vertical_e2agd_12",Pt={root:On,horizontal:Fn,vertical:Un},qr=o.forwardRef(function({className:r,orientation:i="horizontal",decorative:n=!0,label:s,...a},l){return e.jsx("div",{ref:l,role:n?"none":"separator","aria-orientation":n?void 0:i,"aria-label":n?void 0:s,className:y(Pt.root,i==="vertical"?Pt.vertical:Pt.horizontal,r),...a})});qr.displayName="Separator";const Wn="_root_fdvzc_1",Vn="_content_fdvzc_11",Gn="_large_fdvzc_18",Qn="_footer_fdvzc_22",Yn="_cite_fdvzc_29",rt={root:Wn,content:Vn,large:Gn,footer:Qn,cite:Yn},Hr=o.forwardRef(function({className:r,variant:i="default",cite:n,footer:s,children:a,motion:l=!0,...d},u){const c=qe(),{pack:m,enabled:g}=Ft(),h=l&&g&&!c;return e.jsxs(kt.blockquote,{ref:u,className:y(rt.root,i==="large"&&rt.large,r),variants:m.fadeUp,initial:h?"hidden":void 0,animate:h?"visible":void 0,transition:m.reveal,cite:n,...d,children:[e.jsx("p",{className:rt.content,children:a}),s?e.jsx("footer",{className:rt.footer,children:s}):null,n&&!s?e.jsx("cite",{className:rt.cite,children:n}):null]})});Hr.displayName="Quote";const Xn="_root_l2x9l_1",Kn="_checked_l2x9l_22",Jn="_disabled_l2x9l_28",Zn="_input_l2x9l_33",es="_header_l2x9l_39",ts="_title_l2x9l_46",rs="_description_l2x9l_52",is="_indicator_l2x9l_59",ns="_badge_l2x9l_76",ss="_content_l2x9l_80",_e={root:Xn,checked:Kn,disabled:Jn,input:Zn,header:es,title:ts,description:rs,indicator:is,badge:ns,content:ss},Or=o.forwardRef(function({className:r,checked:i,defaultChecked:n=!1,onCheckedChange:s,disabled:a=!1,title:l,description:d,badge:u,children:c,motion:m=!0,onClick:g,...h},f){const[p,v]=o.useState(n),x=i??p,w=qe(),{pack:S,enabled:C}=Ft(),b=m&&C&&!w;return e.jsxs(kt.label,{ref:f,className:y(_e.root,x&&_e.checked,a&&_e.disabled,r),variants:S.scaleIn,initial:b?"hidden":void 0,animate:b?"visible":void 0,transition:S.reveal,onClick:j=>{if(g==null||g(j),a||j.defaultPrevented)return;const T=!x;i===void 0&&v(T),s==null||s(T)},...h,children:[e.jsx("input",{type:"checkbox",className:_e.input,checked:x,disabled:a,readOnly:!0,tabIndex:-1,"aria-hidden":"true"}),e.jsxs("div",{className:_e.header,children:[e.jsxs("div",{children:[l?e.jsx("p",{className:_e.title,children:l}):null,d?e.jsx("p",{className:_e.description,children:d}):null]}),e.jsx("span",{className:_e.indicator,"aria-hidden":"true"})]}),u?e.jsx("div",{className:_e.badge,children:u}):null,c?e.jsx("div",{className:_e.content,children:c}):null]})});Or.displayName="CheckboxCard";const Fr=o.createContext(null),as=Fr.Provider;function os(){return o.useContext(Fr)}const ls="_group_raxz4_1",ds="_root_raxz4_6",cs="_checked_raxz4_27",us="_disabled_raxz4_33",ms="_input_raxz4_38",ps="_header_raxz4_44",hs="_title_raxz4_51",gs="_description_raxz4_57",fs="_indicator_raxz4_64",vs="_badge_raxz4_80",xs="_content_raxz4_84",ve={group:ls,root:ds,checked:cs,disabled:us,input:ms,header:ps,title:hs,description:gs,indicator:fs,badge:vs,content:xs},Ur=o.forwardRef(function({className:r,value:i,title:n,description:s,badge:a,disabled:l,children:d,motion:u=!0,onClick:c,...m},g){const h=os(),f=(h==null?void 0:h.value)===i,p=l??(h==null?void 0:h.disabled),v=qe(),{pack:x,enabled:w}=Ft(),S=u&&w&&!v;return e.jsxs(kt.label,{ref:g,className:y(ve.root,f&&ve.checked,p&&ve.disabled,r),variants:x.scaleIn,initial:S?"hidden":void 0,animate:S?"visible":void 0,transition:x.reveal,onClick:C=>{var b;c==null||c(C),!(p||C.defaultPrevented)&&((b=h==null?void 0:h.onValueChange)==null||b.call(h,i))},...m,children:[e.jsx("input",{type:"radio",className:ve.input,name:h==null?void 0:h.name,value:i,checked:f,disabled:p,readOnly:!0,tabIndex:-1,"aria-hidden":"true"}),e.jsxs("div",{className:ve.header,children:[e.jsxs("div",{children:[n?e.jsx("p",{className:ve.title,children:n}):null,s?e.jsx("p",{className:ve.description,children:s}):null]}),e.jsx("span",{className:ve.indicator,"aria-hidden":"true"})]}),a?e.jsx("div",{className:ve.badge,children:a}):null,d?e.jsx("div",{className:ve.content,children:d}):null]})});Ur.displayName="RadioCard";const Wt=o.forwardRef(function({className:r,name:i,value:n,defaultValue:s="",onValueChange:a,disabled:l=!1,children:d,...u},c){const m=o.useId(),[g,h]=o.useState(s),f=n??g;return e.jsx(as,{value:{name:i??m,value:f,disabled:l,onValueChange:p=>{n===void 0&&h(p),a==null||a(p)}},children:e.jsx("div",{ref:c,role:"radiogroup",className:y(ve.group,r),...u,children:d})})});Wt.displayName="RadioCard.Group";const fr=Object.assign(Ur,{Group:Wt}),bs=Wt,Wr=o.createContext(null);function ys(){const t=o.useContext(Wr);if(!t)throw new Error("useReset must be used within Reset.Root");return t}function ws({defaults:t,children:r}){const[i,n]=o.useState(t),s=o.useCallback(()=>{n(t)},[t]),a=o.useCallback((d,u)=>{n(c=>({...c,[d]:u}))},[]),l=o.useMemo(()=>({values:i,setValues:n,setValue:a,reset:s,defaults:t}),[t,s,a,i]);return e.jsx(Wr.Provider,{value:l,children:typeof r=="function"?r(l):r})}const js="_trigger_1386z_1",Ss="_target_1386z_29",_s="_root_1386z_33",Vt={trigger:js,target:Ss,root:_s};function Bt({defaults:t,className:r,children:i}){return e.jsx(ws,{defaults:t,children:n=>e.jsx("div",{className:y(Vt.root,r),children:typeof i=="function"?i(n):i})})}Bt.displayName="Reset.Root";const Vr=o.forwardRef(function({className:r,children:i="Reset to defaults",type:n="button",onClick:s,...a},l){const{reset:d}=ys();return e.jsx("button",{ref:l,type:n,className:y(Vt.trigger,r),onClick:u=>{s==null||s(u),u.defaultPrevented||d()},...a,children:i})});Vr.displayName="Reset.Trigger";const Gr=o.forwardRef(function({className:r,children:i,...n},s){return e.jsx("div",{ref:s,className:y(Vt.target,r),...n,children:i})});Gr.displayName="Reset.Target";const vr=Object.assign(Bt,{Root:Bt,Trigger:Vr,Target:Gr}),Cs="_root_1udqb_1",ks="_hidden_1udqb_5",Ts="_collapsed_1udqb_9",ft={root:Cs,hidden:ks,collapsed:Ts},Gt=o.forwardRef(function({when:r,keepMounted:i=!1,animate:n=!0,children:s},a){const l=qe(),d=n&&!l;return!r&&!i?null:d?e.jsx(kt.div,{ref:a,className:y(ft.root,!r&&ft.collapsed),initial:!1,animate:{opacity:r?1:0,height:r?"auto":0,marginTop:r?void 0:0,marginBottom:r?void 0:0},transition:{duration:.2},"aria-hidden":!r,style:{display:r||i?void 0:"none"},children:r||i?s:null}):e.jsx("div",{ref:a,className:y(ft.root,!r&&ft.hidden),hidden:!r,"aria-hidden":!r,children:s})});Gt.displayName="Visible";const Qr=o.forwardRef(function({when:r,keepMounted:i=!1,animate:n=!0,children:s},a){return e.jsx(Gt,{ref:a,when:!r,keepMounted:i,animate:n,children:s})});Qr.displayName="Hidden";const Ms={number:"",expiry:"",cvc:"",name:""};function je(t){return t.replace(/\D+/g,"")}function Yr(t,r=St(t)){const i=je(t).slice(0,Tt(r));return r==="amex"?[i.slice(0,4),i.slice(4,10),i.slice(10,15)].filter(Boolean).join(" "):i.replace(/(\d{4})(?=\d)/g,"$1 ").trim()}function xr(t){const r=je(t).slice(0,4);return r.length<=2?r:`${r.slice(0,2)}/${r.slice(2)}`}function Tt(t){return t==="amex"?15:t==="diners"?14:16}function Xr(t){return t==="amex"?4:3}function St(t){const r=je(t);return r?/^3[47]/.test(r)?"amex":/^3(0[0-5]|[68])/.test(r)?"diners":/^6(?:011|5)/.test(r)?"discover":/^(?:2131|1800|35)/.test(r)?"jcb":/^62/.test(r)?"unionpay":/^5[1-5]/.test(r)||/^2(2[2-9]|[3-6]\d|7[01]|720)/.test(r)?"mastercard":/^4/.test(r)?"visa":"unknown":"unknown"}function As(t){const r=je(t);if(r.length<12)return!1;let i=0,n=!1;for(let s=r.length-1;s>=0;s-=1){let a=Number(r[s]);if(Number.isNaN(a))return!1;n&&(a*=2,a>9&&(a-=9)),i+=a,n=!n}return i%10===0}function Ns(t){const r=je(t);if(r.length!==4)return null;const i=Number(r.slice(0,2)),n=Number(r.slice(2,4));return i<1||i>12?null:{month:i,year:2e3+n}}function Ps(t,r=new Date){const i=Ns(t);if(!i)return!1;const n=r.getFullYear(),s=r.getMonth()+1;return i.year>n?!0:i.year<n?!1:i.month>=s}function Qt(t){return{number:je((t==null?void 0:t.number)??""),expiry:je((t==null?void 0:t.expiry)??"").slice(0,4),cvc:je((t==null?void 0:t.cvc)??""),name:((t==null?void 0:t.name)??"").trimStart()}}function Ls(t,r={}){const i=r.required!==!1,n=Qt(t),s=St(n.number),a={};n.number?n.number.length<Tt(s)?a.number="Enter the full card number":As(n.number)||(a.number="Card number is invalid"):i&&(a.number="Card number is required"),n.expiry?n.expiry.length<4?a.expiry="Use MM/YY":Ps(n.expiry)||(a.expiry="Card is expired"):i&&(a.expiry="Expiry is required");const l=Xr(s);return n.cvc?n.cvc.length<l&&(a.cvc=s==="amex"?"Enter 4-digit CID":"Enter 3-digit CVC"):i&&(a.cvc="Security code is required"),r.requireName&&(n.name.trim()?n.name.trim().length<2&&(a.name="Enter the name on the card"):a.name="Name on card is required"),a}function br(t,r){return Qt({...t,...r})}const Rs="_root_1rpoo_1",Is="_preview_1rpoo_9",Ds="_previewTop_1rpoo_23",Es="_brand_1rpoo_30",zs="_previewNumber_1rpoo_45",Bs="_previewMeta_1rpoo_54",$s="_fields_1rpoo_71",qs="_row_1rpoo_76",Hs="_message_1rpoo_82",Ce={root:Rs,preview:Is,previewTop:Ds,brand:Es,previewNumber:zs,previewMeta:Bs,fields:$s,row:qs,message:Hs},yr={visa:"Visa",mastercard:"Mastercard",amex:"Amex",discover:"Discover",diners:"Diners",jcb:"JCB",unionpay:"UnionPay",unknown:"Card"};function Os(t,r){const i=Yr(t.padEnd(Tt(r),"•"),r);return t?i:r==="amex"?"•••• •••••• •••••":"•••• •••• •••• ••••"}function wr({values:t,defaultValues:r,onChange:i,onValidate:n,showPreview:s=!0,showName:a=!0,labels:l,placeholders:d,disabled:u=!1,required:c=!0,errors:m,validateOn:g="blur",helperText:h,className:f,classNames:p,...v}){const x=o.useId(),[w,S]=o.useState(()=>Qt(r)),[C,b]=o.useState({}),[j,T]=o.useState(!1),[M,k]=o.useState({}),H=t!==void 0,L=o.useMemo(()=>H?br(Ms,t??{}):w,[t,H,w]),D=St(L.number),O=Xr(D),ie={...M,...m},A=o.useCallback(B=>{H||S(B),i==null||i(B)},[H,i]),N=o.useCallback(B=>{const K=Ls(B,{required:c,requireName:a&&c});return k(K),n==null||n(K,B),K},[n,c,a]),V=o.useCallback((B,K)=>{let J;B==="number"?J={number:je(K).slice(0,Tt(St(K)))}:B==="expiry"?J={expiry:je(K).slice(0,4)}:B==="cvc"?J={cvc:je(K).slice(0,O)}:J={name:K.slice(0,64)};const Re=br(L,J);A(Re),b(me=>({...me,[B]:!0})),j&&g==="change"&&N(Re)},[O,N,A,j,g,L]),q=o.useCallback(B=>{b(K=>({...K,[B]:!0})),T(!0),(g==="blur"||g==="change")&&N(L)},[N,g,L]),te=B=>!!((C[B]||j)&&ie[B]),Y=B=>te(B)?ie[B]:void 0;return e.jsxs("div",{...v,className:y(Ce.root,p==null?void 0:p.root,f),"data-card-brand":D,role:"group","aria-labelledby":`${x}-legend`,children:[e.jsx("span",{id:`${x}-legend`,className:"sr-only",style:{position:"absolute",width:1,height:1,overflow:"hidden",clip:"rect(0 0 0 0)"},children:"Card details"}),s?e.jsxs("div",{className:y(Ce.preview,p==null?void 0:p.preview),"aria-hidden":"true",children:[e.jsx("div",{className:Ce.previewTop,children:e.jsx("span",{className:y(Ce.brand,p==null?void 0:p.brand),children:yr[D]})}),e.jsx("p",{className:Ce.previewNumber,children:Os(L.number,D)}),e.jsxs("div",{className:Ce.previewMeta,children:[e.jsxs("div",{children:["Name",e.jsx("strong",{children:L.name.trim()||"YOUR NAME"})]}),e.jsxs("div",{children:["Expires",e.jsx("strong",{children:L.expiry.length>=4?xr(L.expiry):"MM/YY"})]})]})]}):null,e.jsxs("div",{className:y(Ce.fields,p==null?void 0:p.fields),children:[a?e.jsx(Te,{label:(l==null?void 0:l.name)??"Name on card",placeholder:(d==null?void 0:d.name)??"Full name",autoComplete:"cc-name",name:"cc-name",value:L.name,disabled:u,required:c,error:Y("name"),motion:!1,onChange:B=>V("name",B.target.value),onBlur:()=>q("name")}):null,e.jsx(Te,{label:(l==null?void 0:l.number)??"Card number",placeholder:(d==null?void 0:d.number)??(D==="amex"?"3782 822463 10005":"4242 4242 4242 4242"),inputMode:"numeric",autoComplete:"cc-number",name:"cc-number",value:Yr(L.number,D),disabled:u,required:c,error:Y("number"),suffix:e.jsx("span",{className:Ce.brand,children:yr[D]}),motion:!1,onChange:B=>V("number",B.target.value),onBlur:()=>q("number")}),e.jsxs("div",{className:y(Ce.row,p==null?void 0:p.row),children:[e.jsx(Te,{label:(l==null?void 0:l.expiry)??"Expiry",placeholder:(d==null?void 0:d.expiry)??"MM/YY",inputMode:"numeric",autoComplete:"cc-exp",name:"cc-exp",value:xr(L.expiry),disabled:u,required:c,error:Y("expiry"),motion:!1,onChange:B=>V("expiry",B.target.value),onBlur:()=>q("expiry")}),e.jsx(Te,{label:(l==null?void 0:l.cvc)??(D==="amex"?"CID":"CVC"),placeholder:(d==null?void 0:d.cvc)??(D==="amex"?"1234":"123"),inputMode:"numeric",autoComplete:"cc-csc",name:"cc-csc",value:L.cvc,disabled:u,required:c,error:Y("cvc"),motion:!1,onChange:B=>V("cvc",B.target.value),onBlur:()=>q("cvc")})]})]}),h&&!Object.keys(ie).length?e.jsx("p",{className:y(Ce.message,p==null?void 0:p.message),children:h}):null]})}const Fs="_shell_9xmmo_1",Us="_fallback_9xmmo_7",jr={shell:Fs,fallback:Us},Ws=o.lazy(()=>Ir(()=>import("./index-DymUt0dR.js"),__vite__mapDeps([0,1])));function Kr({language:t="json",value:r,defaultValue:i="",onChange:n,height:s="320px",theme:a="vs-dark",readOnly:l=!1,className:d,options:u}){const[c,m]=o.useState(i),g=r??c;return e.jsx("div",{className:y(jr.shell,d),children:e.jsx(o.Suspense,{fallback:e.jsx("div",{className:jr.fallback,children:"Loading editor…"}),children:e.jsx(Ws,{height:s,language:t,theme:a,value:g,onChange:h=>{const f=h??"";r===void 0&&m(f),n==null||n(f)},options:{minimap:{enabled:!1},fontSize:13,readOnly:l,scrollBeyondLastLine:!1,...u}})})})}Kr.displayName="MonacoEditor";const Vs="_shell_1darc_1",Gs="_fallback_1darc_8",Sr={shell:Vs,fallback:Gs},Qs=o.lazy(()=>Ir(()=>import("./FlowChartInner-ZI84cmyl.js"),__vite__mapDeps([2,1,3,4])).then(t=>({default:t.FlowChartInner}))),Ys=[{id:"1",position:{x:0,y:0},data:{label:"Start"}},{id:"2",position:{x:200,y:80},data:{label:"Process"}},{id:"3",position:{x:400,y:0},data:{label:"End"}}],Xs=[{id:"e1-2",source:"1",target:"2"},{id:"e2-3",source:"2",target:"3"}];function Jr({nodes:t,edges:r,onNodesChange:i,onEdgesChange:n,height:s="400px",showMiniMap:a=!0,showControls:l=!0,className:d}){const[u,c]=o.useState(t??Ys),[m,g]=o.useState(r??Xs),h=o.useCallback(p=>{c(v=>{const x=sn(p,v);return i==null||i(x),x})},[i]),f=o.useCallback(p=>{g(v=>{const x=an(p,v);return n==null||n(x),x})},[n]);return e.jsx("div",{className:y(Sr.shell,d),style:{height:s},children:e.jsx(o.Suspense,{fallback:e.jsx("div",{className:Sr.fallback,children:"Loading flow chart…"}),children:e.jsx(Qs,{nodes:u,edges:m,onNodesChange:h,onEdgesChange:f,showMiniMap:a,showControls:l})})})}Jr.displayName="FlowChart";const Ks="_root_1ff8r_1",Js="_page_1ff8r_10",Zs="_viewport_1ff8r_14",ea="_pageViewport_1ff8r_27",ta="_scrollbar_1ff8r_31",ra="_vertical_1ff8r_61",ia="_horizontal_1ff8r_69",na="_pageVertical_1ff8r_77",sa="_track_1ff8r_86",aa="_thumb_1ff8r_101",oa="_sentinel_1ff8r_130",be={root:Ks,page:Js,viewport:Zs,pageViewport:ea,scrollbar:ta,vertical:ra,horizontal:ia,pageVertical:na,track:sa,thumb:aa,sentinel:oa},Zr=o.createContext(null);function la(){return o.useContext(Zr)}function da({onIntersect:t,onLeave:r,onChange:i,rootMargin:n="0px",threshold:s=0,enabled:a=!0,root:l}={}){const d=la(),[u,c]=o.useState(null),m=o.useRef({onIntersect:t,onLeave:r,onChange:i});m.current={onIntersect:t,onLeave:r,onChange:i};const g=l!==void 0?l:d?d.page?null:d.viewport:null;return o.useEffect(()=>{if(!a||!u||typeof IntersectionObserver>"u")return;const f=new IntersectionObserver(p=>{var v,x,w,S,C,b;for(const j of p)(x=(v=m.current).onChange)==null||x.call(v,j,j.isIntersecting),j.isIntersecting?(S=(w=m.current).onIntersect)==null||S.call(w,j):(b=(C=m.current).onLeave)==null||b.call(C,j)},{root:g,rootMargin:n,threshold:s});return f.observe(u),()=>f.disconnect()},[a,g,n,u,s]),o.useCallback(f=>{c(f)},[])}const ei=o.forwardRef(function({className:r,onIntersect:i,onLeave:n,onChange:s,rootMargin:a,threshold:l,enabled:d,root:u,...c},m){const g=da({onIntersect:i,onLeave:n,onChange:s,rootMargin:a,threshold:l,enabled:d,root:u}),h=o.useCallback(f=>{g(f),typeof m=="function"?m(f):m&&(m.current=f)},[g,m]);return e.jsx("div",{ref:h,className:y(be.sentinel,r),"aria-hidden":"true","data-scroll-sentinel":"",...c})});ei.displayName="ScrollArea.Sentinel";const ca={scrollTop:0,scrollLeft:0,scrollHeight:0,scrollWidth:0,clientHeight:0,clientWidth:0};function ua(){const t=document.documentElement;return{scrollTop:window.scrollY,scrollLeft:window.scrollX,scrollHeight:t.scrollHeight,scrollWidth:t.scrollWidth,clientHeight:window.innerHeight,clientWidth:window.innerWidth}}function ma(t){return{scrollTop:t.scrollTop,scrollLeft:t.scrollLeft,scrollHeight:t.scrollHeight,scrollWidth:t.scrollWidth,clientHeight:t.clientHeight,clientWidth:t.clientWidth}}function pa(t,r){const[i,n]=o.useState(ca),s=o.useCallback(()=>{if(r){if(typeof window>"u")return;n(ua());return}const l=t.current;l&&n(ma(l))},[r,t]);o.useEffect(()=>{if(s(),r){if(typeof window>"u")return;window.addEventListener("scroll",s,{passive:!0}),window.addEventListener("resize",s);let u;return typeof ResizeObserver<"u"&&(u=new ResizeObserver(s),u.observe(document.documentElement),document.body&&u.observe(document.body)),()=>{window.removeEventListener("scroll",s),window.removeEventListener("resize",s),u==null||u.disconnect()}}const l=t.current;if(!l)return;l.addEventListener("scroll",s,{passive:!0});let d;return typeof ResizeObserver<"u"&&(d=new ResizeObserver(s),d.observe(l)),()=>{l.removeEventListener("scroll",s),d==null||d.disconnect()}},[r,s,t]);const a=o.useCallback(l=>{if(r){window.scrollTo({top:l.scrollTop??window.scrollY,left:l.scrollLeft??window.scrollX,behavior:"auto"});return}const d=t.current;d&&(l.scrollTop!==void 0&&(d.scrollTop=l.scrollTop),l.scrollLeft!==void 0&&(d.scrollLeft=l.scrollLeft))},[r,t]);return{metrics:i,update:s,scrollTo:a}}function _r(t,r,i){return Math.min(Math.max(t,r),i)}function $t(t,r){const i=t==="vertical",n=i?r.scrollHeight:r.scrollWidth,s=i?r.clientHeight:r.clientWidth,a=i?r.scrollTop:r.scrollLeft;if(n<=s||s<=0)return{visible:!1,size:0,offset:0,maxOffset:0,maxScroll:0};const l=s-8,d=Math.max(s/n*l,24),u=l-d,c=n-s,m=c>0?a/c*u:0;return{visible:!0,size:d,offset:m,maxOffset:u,maxScroll:c,clientSize:s,scrollOffset:a}}function Cr({axis:t,page:r,metrics:i,scrollTo:n,update:s}){const a=o.useRef(null),[l,d]=o.useState(!1),u=o.useRef(null),c=o.useMemo(()=>$t(t,i),[t,i]),m=t==="vertical",g=o.useCallback(x=>{if(!a.current||!c.visible||x.target!==a.current)return;const w=a.current.getBoundingClientRect(),S=m?x.clientY-w.top:x.clientX-w.left,C=_r(S-c.size/2,0,c.maxOffset),j=(c.maxOffset>0?C/c.maxOffset:0)*c.maxScroll;n(m?{scrollTop:j}:{scrollLeft:j}),s()},[m,n,c.maxOffset,c.maxScroll,c.size,c.visible,s]),h=o.useCallback(x=>{c.visible&&(x.preventDefault(),x.stopPropagation(),u.current={startPointer:m?x.clientY:x.clientX,startScroll:c.scrollOffset??0,maxOffset:c.maxOffset,maxScroll:c.maxScroll},d(!0),x.currentTarget.setPointerCapture(x.pointerId))},[m,c.maxOffset,c.maxScroll,c.scrollOffset,c.visible]),f=o.useCallback(x=>{const w=u.current;if(!w)return;const C=(m?x.clientY:x.clientX)-w.startPointer,b=w.maxOffset>0?C/w.maxOffset*w.maxScroll:0,j=_r(w.startScroll+b,0,w.maxScroll);n(m?{scrollTop:j}:{scrollLeft:j}),s()},[m,n,s]),p=o.useCallback(x=>{u.current=null,d(!1),x.currentTarget.releasePointerCapture(x.pointerId)},[]);if(!c.visible)return null;const v=m?{height:c.size,transform:`translateY(${c.offset}px)`}:{width:c.size,transform:`translateX(${c.offset}px)`};return e.jsx("div",{className:y(be.scrollbar,m?be.vertical:be.horizontal,r&&m?be.pageVertical:void 0),"data-orientation":t,"aria-hidden":"true",children:e.jsx("div",{ref:a,className:be.track,onPointerDown:g,children:e.jsx("div",{className:be.thumb,"data-dragging":l?"true":void 0,style:v,onPointerDown:h,onPointerMove:f,onPointerUp:p,onPointerCancel:p})})})}function kr(t,r){return t==="both"||t===r}const ti=o.forwardRef(function({children:r,page:i=!1,height:n,maxHeight:s,type:a="auto",orientation:l="vertical",label:d,className:u,viewportClassName:c,style:m,...g},h){const f=o.useRef(null),[p,v]=o.useState(null),{metrics:x,update:w,scrollTo:S}=pa(f,i),C=o.useCallback(D=>{f.current=D,v(D),typeof h=="function"?h(D):h&&(h.current=D)},[h]),b=i?{}:{height:typeof n=="number"?`${n}px`:n,maxHeight:typeof s=="number"?`${s}px`:s},j=kr(l,"vertical"),T=kr(l,"horizontal"),M=o.useMemo(()=>j?$t("vertical",x):{visible:!1},[x,j]),k=o.useMemo(()=>T?$t("horizontal",x):{visible:!1},[x,T]),H=M.visible||k.visible,L=o.useMemo(()=>({viewportRef:f,viewport:p,page:i}),[i,p]);return e.jsx(Zr.Provider,{value:L,children:e.jsxs("div",{className:y(be.root,i&&be.page,u),"data-type":a,"data-page":i?"true":void 0,"data-overflow":H?"true":void 0,style:m,...g,children:[e.jsx("div",{ref:C,className:y(be.viewport,i&&be.pageViewport,c),style:b,role:d?"region":void 0,"aria-label":d,tabIndex:i?void 0:0,children:r}),j?e.jsx(Cr,{axis:"vertical",page:i,metrics:x,scrollTo:S,update:w}):null,T&&!i?e.jsx(Cr,{axis:"horizontal",page:i,metrics:x,scrollTo:S,update:w}):null]})})});ti.displayName="ScrollArea";const vt=Object.assign(ti,{Sentinel:ei}),ri=o.createContext(null);function He(t){const r=o.useContext(ri);if(!r)throw new Error(`${t} must be used within Hero`);return r}const ha="_root_17jua_1",ga="_full_17jua_14",fa="_split_17jua_18",va="_sizeMd_17jua_22",xa="_sizeLg_17jua_26",ba="_copy_17jua_30",ya="_alignCenter_17jua_39",wa="_alignStart_17jua_44",ja="_eyebrow_17jua_58",Sa="_title_17jua_67",_a="_description_17jua_82",Ca="_actions_17jua_94",ka="_media_17jua_105",Ta="_backdrop_17jua_112",Ma="_backdropCustom_17jua_119",Aa="_muted_17jua_129",Na="_dotted_17jua_133",Pa="_grid_17jua_143",La="_glow_17jua_151",Ra="_aurora_17jua_159",Ia="_mesh_17jua_170",Da="_animatedBackdrop_17jua_178",W={root:ha,full:ga,split:fa,sizeMd:va,sizeLg:xa,copy:ba,alignCenter:ya,alignStart:wa,eyebrow:ja,title:Sa,description:_a,actions:Ca,media:ka,backdrop:Ta,backdropCustom:Ma,muted:Aa,dotted:Na,grid:Pa,glow:La,aurora:Ra,mesh:Ia,animatedBackdrop:Da},{SlotClassNamesProvider:Ea,useSlotClassName:Oe}=Ct(),ii={none:void 0,muted:W.muted,dotted:W.dotted,grid:W.grid,glow:W.glow,aurora:W.aurora,mesh:W.mesh},ni=o.forwardRef(function({variant:r="full",textSide:i="left",align:n="start",size:s="lg",background:a="none",animated:l=!0,as:d="section",className:u,classNames:c,children:m,...g},h){const f=qe(),p=l&&!f&&a!=="none",v=o.useMemo(()=>({variant:r,textSide:i,align:n,size:s}),[n,s,i,r]);return e.jsx(ri.Provider,{value:v,children:e.jsx(Ea,{classNames:c,children:o.createElement(d,{ref:h,className:y(W.root,r==="split"?W.split:W.full,n==="center"?W.alignCenter:W.alignStart,s==="md"?W.sizeMd:W.sizeLg,c==null?void 0:c.root,u),"data-variant":r,"data-text-side":i,"data-align":n,"data-background":a,"data-animated":p?"true":void 0,...g},a!=="none"?e.jsx("div",{className:y(W.backdrop,ii[a],p?W.animatedBackdrop:void 0,c==null?void 0:c.background),"aria-hidden":"true"},"hero-backdrop"):null,m)})})});ni.displayName="Hero";const si=o.forwardRef(function({className:r,children:i,...n},s){return He("Hero.Copy"),e.jsx("div",{ref:s,className:y(W.copy,Oe("copy"),r),...n,children:i})});si.displayName="Hero.Copy";const ai=o.forwardRef(function({className:r,children:i,...n},s){return He("Hero.Eyebrow"),e.jsx("p",{ref:s,className:y(W.eyebrow,Oe("eyebrow"),r),...n,children:i})});ai.displayName="Hero.Eyebrow";const oi=o.forwardRef(function({className:r,children:i,as:n="h1",...s},a){return He("Hero.Title"),o.createElement(n,{ref:a,className:y(W.title,Oe("title"),r),...s},i)});oi.displayName="Hero.Title";const li=o.forwardRef(function({className:r,children:i,...n},s){return He("Hero.Description"),e.jsx("p",{ref:s,className:y(W.description,Oe("description"),r),...n,children:i})});li.displayName="Hero.Description";const di=o.forwardRef(function({className:r,children:i,...n},s){return He("Hero.Actions"),e.jsx("div",{ref:s,className:y(W.actions,Oe("actions"),r),...n,children:i})});di.displayName="Hero.Actions";const ci=o.forwardRef(function({className:r,children:i,...n},s){return He("Hero.Media"),e.jsx("div",{ref:s,className:y(W.media,Oe("media"),r),...n,children:i})});ci.displayName="Hero.Media";const ui=o.forwardRef(function({variant:r="none",animated:i=!0,className:n,children:s,...a},l){He("Hero.Background");const d=qe(),u=i&&!d&&r!=="none";return e.jsx("div",{ref:l,className:y(W.backdrop,ii[r],u?W.animatedBackdrop:void 0,s?W.backdropCustom:void 0,Oe("background"),n),"aria-hidden":s?void 0:!0,"data-background":r,...a,children:s})});ui.displayName="Hero.Background";const ce=Object.assign(ni,{Copy:si,Eyebrow:ai,Title:oi,Description:li,Actions:di,Media:ci,Background:ui}),mi=o.createContext(null),pi=o.createContext(null);function Ke(t){const r=o.useContext(mi);if(!r)throw new Error(`${t} must be used within Slider`);return r}function za(t){const r=o.useContext(pi);if(!r)throw new Error(`${t} must be used within Slider.Track`);return r}const Ba="_root_5ysbu_1",$a="_viewport_5ysbu_9",qa="_draggable_5ysbu_17",Ha="_dragging_5ysbu_21",Oa="_slide_5ysbu_26",Fa="_track_5ysbu_30",Ua="_animated_5ysbu_35",Wa="_controls_5ysbu_52",Va="_nav_5ysbu_59",Ga="_dots_5ysbu_87",Qa="_dot_5ysbu_87",Ya="_dotActive_5ysbu_104",ue={root:Ba,viewport:$a,draggable:qa,dragging:Ha,slide:Oa,track:Fa,animated:Ua,controls:Wa,nav:Va,dots:Ga,dot:Qa,dotActive:Ya},{SlotClassNamesProvider:Xa,useSlotClassName:$e}=Ct(),hi=o.forwardRef(function({index:r,defaultIndex:i=0,onIndexChange:n,loop:s=!0,autoplay:a=0,drag:l=!0,label:d="Slideshow",className:u,classNames:c,children:m,onMouseEnter:g,onMouseLeave:h,...f},p){const v=o.useId(),x=Dr(`slider-${v.replace(/:/g,"")}`),w=qe(),[S,C]=o.useState(i),[b,j]=o.useState(0),[T,M]=o.useState(!1),[k,H]=o.useState(!1),L=T||k,D=r??S,O=o.useCallback(q=>{if(b<=0)return;const te=b-1;let Y=q;s?Y=(q%b+b)%b:Y=Math.min(Math.max(q,0),te),r===void 0&&C(Y),n==null||n(Y)},[b,r,s,n]),ie=o.useCallback(()=>O(D-1),[D,O]),A=o.useCallback(()=>O(D+1),[D,O]);o.useEffect(()=>{b!==0&&D>b-1&&O(b-1)},[b,D,O]);const N=typeof a=="number"?a:0;o.useEffect(()=>{if(L||w||N<=0||b<2)return;const q=window.setInterval(A,N);return()=>window.clearInterval(q)},[b,A,N,L,w]);const V=o.useMemo(()=>({index:D,count:b,setCount:j,goTo:O,goPrev:ie,goNext:A,loop:s,idPrefix:x,animated:!w,drag:l,setDragPaused:H}),[b,D,l,A,ie,O,x,s,w]);return e.jsx(mi.Provider,{value:V,children:e.jsx(Xa,{classNames:c,children:e.jsx("div",{ref:p,className:y(ue.root,c==null?void 0:c.root,u),role:"region","aria-roledescription":"carousel","aria-label":d,onMouseEnter:q=>{M(!0),g==null||g(q)},onMouseLeave:q=>{M(!1),h==null||h(q)},...f,children:m})})})});hi.displayName="Slider";const Ka=48;function Ja(t,r){typeof t=="function"?t(r):t&&(t.current=r)}const gi=o.forwardRef(function({className:r,children:i,onPointerDown:n,onPointerMove:s,onPointerUp:a,onPointerCancel:l,...d},u){const{index:c,setCount:m,animated:g,drag:h,loop:f,count:p,goNext:v,goPrev:x,setDragPaused:w}=Ke("Slider.Track"),S=o.Children.toArray(i).filter(o.isValidElement),C=o.useRef(null),b=o.useRef({active:!1,startX:0,pointerId:0}),[j,T]=o.useState(0),[M,k]=o.useState(!1);o.useLayoutEffect(()=>{m(S.length)},[m,S.length]);const H=o.useCallback(A=>{var te;if(!b.current.active)return;const N=A-b.current.startX,V=((te=C.current)==null?void 0:te.offsetWidth)??1,q=Math.max(Ka,V*.18);b.current.active=!1,k(!1),T(0),w(!1),N<=-q?v():N>=q&&x()},[v,x,w]);function L(A){var V,q;if(n==null||n(A),A.defaultPrevented||!h||A.button!==0)return;const N=A.target;N!=null&&N.closest("button, a, input, textarea, select, [data-slider-ignore-drag]")||(b.current={active:!0,startX:A.clientX,pointerId:A.pointerId},(q=(V=C.current)==null?void 0:V.setPointerCapture)==null||q.call(V,A.pointerId),w(!0))}function D(A){if(s==null||s(A),!b.current.active)return;let N=A.clientX-b.current.startX;f||(c===0&&N>0&&(N*=.35),p>0&&c>=p-1&&N<0&&(N*=.35)),Math.abs(N)>8&&k(!0),T(N)}function O(A){a==null||a(A),H(A.clientX)}function ie(A){l==null||l(A),H(A.clientX)}return e.jsx("div",{ref:A=>{C.current=A,Ja(u,A)},className:y(ue.viewport,h?ue.draggable:void 0,M?ue.dragging:void 0,$e("track"),r),"data-slider-track":"",onPointerDown:L,onPointerMove:D,onPointerUp:O,onPointerCancel:ie,...d,children:e.jsx("div",{className:y(ue.track,g&&!M?ue.animated:void 0),style:{transform:`translateX(calc(-${c*100}% + ${j}px))`},children:S.map((A,N)=>e.jsx(pi.Provider,{value:{index:N,active:N===c},children:A},A.key??N))})})});gi.displayName="Slider.Track";const fi=o.forwardRef(function({className:r,children:i,...n},s){const{idPrefix:a}=Ke("Slider.Slide"),{index:l,active:d}=za("Slider.Slide");return e.jsx("div",{ref:s,id:`${a}-slide-${l}`,className:y(ue.slide,$e("slide"),r),role:"group","aria-roledescription":"slide","aria-label":`Slide ${l+1}`,"aria-hidden":d?void 0:!0,...n,children:i})});fi.displayName="Slider.Slide";const vi=o.forwardRef(function({className:r,children:i,...n},s){return Ke("Slider.Controls"),e.jsx("div",{ref:s,className:y(ue.controls,$e("controls"),r),...n,children:i})});vi.displayName="Slider.Controls";const xi=o.forwardRef(function({className:r,children:i,disabled:n,onClick:s,...a},l){const{goPrev:d,loop:u,index:c}=Ke("Slider.Prev"),m=n||!u&&c===0;return e.jsx("button",{ref:l,type:"button",className:y(ue.nav,$e("prev"),r),"aria-label":"Previous slide",disabled:m,onClick:g=>{s==null||s(g),g.defaultPrevented||d()},...a,children:i??e.jsx(Z,{name:"chevron-left",size:"sm","aria-hidden":!0})})});xi.displayName="Slider.Prev";const bi=o.forwardRef(function({className:r,children:i,disabled:n,onClick:s,...a},l){const{goNext:d,loop:u,index:c,count:m}=Ke("Slider.Next"),g=n||!u&&m>0&&c>=m-1;return e.jsx("button",{ref:l,type:"button",className:y(ue.nav,$e("next"),r),"aria-label":"Next slide",disabled:g,onClick:h=>{s==null||s(h),h.defaultPrevented||d()},...a,children:i??e.jsx(Z,{name:"chevron-right",size:"sm","aria-hidden":!0})})});bi.displayName="Slider.Next";const yi=o.forwardRef(function({className:r,...i},n){const{count:s,index:a,goTo:l}=Ke("Slider.Dots"),d=$e("dots"),u=$e("dot");return e.jsx("div",{ref:n,className:y(ue.dots,d,r),role:"group","aria-label":"Choose slide",...i,children:Array.from({length:s},(c,m)=>e.jsx("button",{type:"button",className:y(ue.dot,m===a?ue.dotActive:void 0,u),"aria-label":`Go to slide ${m+1}`,"aria-current":m===a?"true":void 0,onClick:()=>l(m)},m))})});yi.displayName="Slider.Dots";const re=Object.assign(hi,{Track:gi,Slide:fi,Controls:vi,Prev:xi,Next:bi,Dots:yi}),Za="_root_hr85s_1",eo="_centered_hr85s_6",to="_sizeSm_hr85s_10",ro="_sizeMd_hr85s_14",io="_sizeLg_hr85s_18",no="_sizeXl_hr85s_22",so="_sizeFull_hr85s_26",ao="_padNone_hr85s_30",oo="_padSm_hr85s_34",lo="_padMd_hr85s_38",co="_padLg_hr85s_42",we={root:Za,centered:eo,sizeSm:to,sizeMd:ro,sizeLg:io,sizeXl:no,sizeFull:so,padNone:ao,padSm:oo,padMd:lo,padLg:co},uo={sm:we.sizeSm,md:we.sizeMd,lg:we.sizeLg,xl:we.sizeXl,full:we.sizeFull},mo={none:we.padNone,sm:we.padSm,md:we.padMd,lg:we.padLg},wi=o.forwardRef(function({size:r="lg",padding:i="md",centered:n=!0,as:s="div",className:a,children:l,...d},u){return e.jsx(s,{ref:u,className:y(we.root,uo[r],mo[i],n&&we.centered,a),...d,children:l})});wi.displayName="Container";const po="_root_1uoc0_1",ho="_inline_1uoc0_6",go="_dirRow_1uoc0_11",fo="_dirColumn_1uoc0_15",vo="_dirRowReverse_1uoc0_19",xo="_dirColumnReverse_1uoc0_23",bo="_alignStart_1uoc0_27",yo="_alignCenter_1uoc0_31",wo="_alignEnd_1uoc0_35",jo="_alignStretch_1uoc0_39",So="_alignBaseline_1uoc0_43",_o="_justifyStart_1uoc0_47",Co="_justifyCenter_1uoc0_51",ko="_justifyEnd_1uoc0_55",To="_justifyBetween_1uoc0_59",Mo="_justifyAround_1uoc0_63",Ao="_justifyEvenly_1uoc0_67",No="_wrapNowrap_1uoc0_71",Po="_wrapWrap_1uoc0_75",Lo="_wrapReverse_1uoc0_79",Ro="_gapNone_1uoc0_83",Io="_gapXs_1uoc0_87",Do="_gapSm_1uoc0_91",Eo="_gapMd_1uoc0_95",zo="_gapLg_1uoc0_99",Bo="_gapXl_1uoc0_103",F={root:po,inline:ho,dirRow:go,dirColumn:fo,dirRowReverse:vo,dirColumnReverse:xo,alignStart:bo,alignCenter:yo,alignEnd:wo,alignStretch:jo,alignBaseline:So,justifyStart:_o,justifyCenter:Co,justifyEnd:ko,justifyBetween:To,justifyAround:Mo,justifyEvenly:Ao,wrapNowrap:No,wrapWrap:Po,wrapReverse:Lo,gapNone:Ro,gapXs:Io,gapSm:Do,gapMd:Eo,gapLg:zo,gapXl:Bo},$o={row:F.dirRow,column:F.dirColumn,"row-reverse":F.dirRowReverse,"column-reverse":F.dirColumnReverse},qo={start:F.alignStart,center:F.alignCenter,end:F.alignEnd,stretch:F.alignStretch,baseline:F.alignBaseline},Ho={start:F.justifyStart,center:F.justifyCenter,end:F.justifyEnd,between:F.justifyBetween,around:F.justifyAround,evenly:F.justifyEvenly},Oo={none:F.gapNone,xs:F.gapXs,sm:F.gapSm,md:F.gapMd,lg:F.gapLg,xl:F.gapXl},Fo={nowrap:F.wrapNowrap,wrap:F.wrapWrap,"wrap-reverse":F.wrapReverse},qt=o.forwardRef(function({direction:r="row",align:i="stretch",justify:n="start",gap:s="none",wrap:a="nowrap",inline:l=!1,className:d,children:u,...c},m){return e.jsx("div",{ref:m,className:y(F.root,l&&F.inline,$o[r],qo[i],Ho[n],Oo[s],Fo[a],d),...c,children:u})});qt.displayName="Flex";function ot(t,r){const i=t.endsWith("/")?t.slice(0,-1):t,n=r.startsWith("/")?r:`/${r}`;return`${i}${n}`}function ji(t){return t.startsWith("http://")||t.startsWith("https://")}async function Xe(t,r){const i=await fetch(t,r);if(!i.ok)throw new Error(`Request failed with status ${i.status}`);return await i.json()}function lt(t,r){return{credentials:t.credentials??"same-origin",headers:{"Content-Type":"application/json",...t.headers,...r==null?void 0:r.headers},...r}}async function _t(t,r){if(!t.baseUrl)throw new Error("[asriui] database.baseUrl is required for direct SQL queries. Set it on AsriUIProvider config.");const i=t.queryEndpoint??"/query",n=ot(t.baseUrl,i);return Xe(n,lt(t,{method:"POST",body:JSON.stringify(r)}))}function Tr(t,r,i){var s;const n=(s=t.queries)==null?void 0:s[r];if(!n)throw new Error(`[asriui] Unknown database query key "${r}". Add it to config.database.queries.`);if(typeof n=="string"){if(ji(n)||n.startsWith("/")){const a=n.startsWith("/")&&t.baseUrl?ot(t.baseUrl,n):n;return()=>Xe(a,lt(t))}return()=>_t(t,{sql:n,params:i})}return Uo(t,n,i)}function Uo(t,r,i){if(r.sql)return()=>_t(t,{sql:r.sql,params:i});if(r.path){const n=t.baseUrl?ot(t.baseUrl,r.path):r.path.startsWith("/")?r.path:`/${r.path}`,s=r.method??"GET";return()=>Xe(n,lt(t,{method:s,body:s==="POST"?JSON.stringify({params:i}):void 0}))}throw new Error("[asriui] Named database query must include sql or path.")}function Wo(t,r){var i;if(typeof t=="function")return t;if(typeof t=="object"&&t!==null){if("sql"in t){const n=t;return()=>{if(!(r!=null&&r.baseUrl))throw new Error("[asriui] database.baseUrl is required for SQL queries. Set it on AsriUIProvider config.");return _t(r,n)}}if("key"in t){const n=t;if(!r)throw new Error(`[asriui] database config is required for query key "${n.key}". Set config.database on AsriUIProvider.`);return Tr(r,n.key,n.params)}}if(typeof t=="string"){if(t.startsWith("sql:")){const n=t.slice(4).trim();return()=>{if(!(r!=null&&r.baseUrl))throw new Error("[asriui] database.baseUrl is required for sql: queries.");return _t(r,{sql:n})}}if((i=r==null?void 0:r.queries)!=null&&i[t])return Tr(r,t);if(ji(t)||t.startsWith("/")){const n=t.startsWith("/")&&(r!=null&&r.baseUrl)?ot(r.baseUrl,t):t;return()=>Xe(n,lt(r??{}))}return r!=null&&r.baseUrl?()=>Xe(ot(r.baseUrl,t),lt(r)):()=>Xe(t)}throw new Error("[asriui] Invalid ServerQuery input.")}function Vo(t){return t instanceof Error?t:new Error(String(t))}function Go({query:t,queryKey:r,enabled:i=!0,initialData:n,onSuccess:s,onError:a}){const l=Rr(),d=l==null?void 0:l.database,[u,c]=o.useState(n!==void 0?"success":"idle"),[m,g]=o.useState(n),[h,f]=o.useState(null),[p,v]=o.useState(0),x=o.useMemo(()=>Wo(t,d),[d,t]),w=o.useMemo(()=>JSON.stringify(r??null),[r]),S=o.useRef(s),C=o.useRef(a);S.current=s,C.current=a;const b=o.useCallback(()=>{v(j=>j+1)},[]);return o.useEffect(()=>{if(!i){c(n!==void 0?"success":"idle");return}let j=!1;return c("loading"),f(null),x().then(T=>{var M;j||(g(T),c("success"),(M=S.current)==null||M.call(S,T))}).catch(T=>{var k;if(j)return;const M=Vo(T);f(M),c("error"),(k=C.current)==null||k.call(C,M)}),()=>{j=!0}},[i,p,n,x,w]),{data:m,error:h,status:u,isIdle:u==="idle",isLoading:u==="loading",isSuccess:u==="success",isError:u==="error",refetch:b}}const Qo="_root_1a6c0_1",Yo="_fallback_1a6c0_5",Xo="_errorTitle_1a6c0_15",Ko="_errorMessage_1a6c0_21",ze={root:Qo,fallback:Yo,errorTitle:Xo,errorMessage:Ko};function Jo(){return e.jsx(Ae,{variant:"dots",size:"sm",label:"Loading data",showLabel:!0})}function Zo({error:t,refetch:r}){return e.jsxs("div",{className:ze.fallback,role:"alert",children:[e.jsx("p",{className:ze.errorTitle,children:"Could not load data"}),e.jsx("p",{className:ze.errorMessage,children:t.message}),e.jsx(z,{size:"sm",variant:"outline",onClick:r,children:"Try again"})]})}function yt({query:t,queryKey:r,enabled:i,initialData:n,onSuccess:s,onError:a,className:l,loading:d,error:u,renderStatus:c,children:m}){const g=Go({query:t,queryKey:r,enabled:i,initialData:n,onSuccess:s,onError:a});if(c)return e.jsx("div",{className:y(ze.root,l),children:c(g)});if(g.isLoading&&g.data===void 0)return e.jsx("div",{className:y(ze.root,l),children:d??e.jsx(Jo,{})});if(g.isError&&g.data===void 0){const h=typeof u=="function"?u(g.error??new Error("Request failed"),g.refetch):u??e.jsx(Zo,{error:g.error??new Error("Request failed"),refetch:g.refetch});return e.jsx("div",{className:y(ze.root,l),children:h})}return g.data!==void 0&&m?e.jsx("div",{className:y(ze.root,l),children:m(g.data,{refetch:g.refetch})}):null}yt.displayName="ServerQuery";const Si=o.createContext(null);function Yt(t){const r=o.useContext(Si);if(!r)throw new Error(`${t} must be used within Calendar`);return r}function Ht(t){const r=t.getFullYear(),i=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${r}-${i}-${n}`}function el(t){const[r,i,n]=t.split("-").map(Number);return new Date(r,i-1,n)}function tl(t,r){return t.getFullYear()===r.getFullYear()&&t.getMonth()===r.getMonth()}function rl(t){return new Date(t.getFullYear(),t.getMonth(),1)}function Mr(t,r){return new Date(t.getFullYear(),t.getMonth()+r,1)}function il(t,r){const i=rl(t),n=(i.getDay()-r+7)%7,s=new Date(i);return s.setDate(i.getDate()-n),Array.from({length:42},(a,l)=>{const d=new Date(s);return d.setDate(s.getDate()+l),d})}function _i(t,r){return new Intl.DateTimeFormat(r,{month:"long",year:"numeric"}).format(t)}function nl(t,r){const i=new Intl.DateTimeFormat(t,{weekday:"short"}),n=new Date(2024,0,7),s=[];for(let a=0;a<7;a+=1){const l=new Date(n);l.setDate(n.getDate()+(r+a)%7),s.push(i.format(l))}return s}function Pe(t,r){return`${t}::${r}`}function sl(t){const r=new Map;for(const i of t)r.set(Pe(i.date,i.slotId),i);return Array.from(r.values())}function al(t,r,i,n){const s=Pe(r,i);return t.some(l=>Pe(l.date,l.slotId)===s)?t.filter(l=>Pe(l.date,l.slotId)!==s):n!=null&&t.length>=n?t:[...t,{date:r,slotId:i}]}function Lt(t,r,i){return(i==null?void 0:i[t])??r}const ol=[{id:"09:00",label:"09:00 AM",start:"09:00",end:"09:30"},{id:"09:30",label:"09:30 AM",start:"09:30",end:"10:00"},{id:"10:00",label:"10:00 AM",start:"10:00",end:"10:30"},{id:"10:30",label:"10:30 AM",start:"10:30",end:"11:00"},{id:"11:00",label:"11:00 AM",start:"11:00",end:"11:30"},{id:"13:00",label:"01:00 PM",start:"13:00",end:"13:30"},{id:"13:30",label:"01:30 PM",start:"13:30",end:"14:00"},{id:"14:00",label:"02:00 PM",start:"14:00",end:"14:30"},{id:"14:30",label:"02:30 PM",start:"14:30",end:"15:00"},{id:"15:00",label:"03:00 PM",start:"15:00",end:"15:30"}],ll="_root_m8c7c_1",dl="_shell_m8c7c_13",cl="_shellWithPanel_m8c7c_19",ul="_header_m8c7c_25",ml="_monthLabel_m8c7c_32",pl="_navButton_m8c7c_39",hl="_weekdays_m8c7c_61",gl="_weekday_m8c7c_61",fl="_grid_m8c7c_77",vl="_dayButton_m8c7c_83",xl="_dayOutside_m8c7c_108",bl="_dayToday_m8c7c_113",yl="_dayActive_m8c7c_117",wl="_dayDisabled_m8c7c_122",jl="_dayCount_m8c7c_127",Sl="_slotPanel_m8c7c_138",_l="_slotPanelTitle_m8c7c_147",Cl="_slotPanelHint_m8c7c_153",kl="_slotGrid_m8c7c_159",Tl="_slotButton_m8c7c_165",Ml="_slotSelected_m8c7c_188",Al="_slotBooked_m8c7c_194",Nl="_slotDisabled_m8c7c_195",Pl="_slotMeta_m8c7c_201",Ll="_summary_m8c7c_206",Rl="_summaryTitle_m8c7c_215",Il="_summaryList_m8c7c_221",$={root:ll,shell:dl,shellWithPanel:cl,header:ul,monthLabel:ml,navButton:pl,weekdays:hl,weekday:gl,grid:fl,dayButton:vl,dayOutside:xl,dayToday:bl,dayActive:yl,dayDisabled:wl,dayCount:jl,slotPanel:Sl,slotPanelTitle:_l,slotPanelHint:Cl,slotGrid:kl,slotButton:Tl,slotSelected:Ml,slotBooked:Al,slotDisabled:Nl,slotMeta:Pl,summary:Ll,summaryTitle:Rl,summaryList:Il},Xt=o.forwardRef(function({className:r,...i},n){const{month:s,locale:a,weekStartsOn:l,activeDate:d,setActiveDate:u,isDateDisabled:c,getSelectionCountForDate:m}=Yt("Calendar.Grid"),g=nl(a,l),h=il(s,l),f=Ht(new Date);return e.jsxs("div",{ref:n,className:y($.gridWrap,r),...i,children:[e.jsx("div",{className:$.weekdays,"aria-hidden":"true",children:g.map(p=>e.jsx("div",{className:$.weekday,children:p},p))}),e.jsx("div",{className:$.grid,role:"grid","aria-label":_i(s,a),children:h.map(p=>{const v=Ht(p),x=!tl(p,s),w=c(p),S=v===f,C=d===v,b=m(v);return e.jsxs("button",{type:"button",role:"gridcell",className:y($.dayButton,x&&$.dayOutside,S&&$.dayToday,C&&$.dayActive,w&&$.dayDisabled),"aria-label":`${p.toLocaleDateString(a,{weekday:"long",month:"long",day:"numeric"})}${b?`, ${b} slots selected`:""}`,"aria-selected":C,disabled:w,onClick:()=>u(v),children:[e.jsx("span",{children:p.getDate()}),b>0?e.jsx("span",{className:$.dayCount,children:b}):null]},v)})})]})});Xt.displayName="Calendar.Grid";const Kt=o.forwardRef(function({className:r,...i},n){const{month:s,locale:a,goToPreviousMonth:l,goToNextMonth:d}=Yt("Calendar.Header");return e.jsxs("div",{ref:n,className:y($.header,r),...i,children:[e.jsx("button",{type:"button",className:$.navButton,"aria-label":"Previous month",onClick:l,children:"‹"}),e.jsx("h2",{className:$.monthLabel,children:_i(s,a)}),e.jsx("button",{type:"button",className:$.navButton,"aria-label":"Next month",onClick:d,children:"›"})]})});Kt.displayName="Calendar.Header";const Jt=o.forwardRef(function({className:r,...i},n){const{activeDate:s,locale:a,getSlotsForDate:l,toggleSlot:d,isSlotSelected:u,isSlotBooked:c,maxSelections:m,selection:g}=Yt("Calendar.SlotPanel");if(!s)return e.jsx("div",{ref:n,className:y($.slotPanel,r),...i,children:e.jsx("p",{className:$.slotPanelHint,children:"Select a day to choose booking slots."})});const h=l(s),f=el(s).toLocaleDateString(a,{weekday:"long",month:"long",day:"numeric"});return e.jsxs("div",{ref:n,className:y($.slotPanel,r),...i,children:[e.jsxs("div",{children:[e.jsx("h3",{className:$.slotPanelTitle,children:f}),e.jsxs("p",{className:$.slotPanelHint,children:["Select multiple time slots",m?` (max ${m} total)`:"","."," ",g.length>0?`${g.length} selected.`:""]})]}),e.jsx("div",{className:$.slotGrid,role:"group","aria-label":`Time slots for ${f}`,children:h.length===0?e.jsx("p",{className:$.slotPanelHint,children:"No slots available for this day."}):h.map(p=>{const v=u(s,p.id),x=c(s,p.id),w=x||p.disabled;return e.jsxs("button",{type:"button",className:y($.slotButton,v&&$.slotSelected,x&&$.slotBooked,p.disabled&&$.slotDisabled),"aria-pressed":v,disabled:w,onClick:()=>d(s,p.id),children:[e.jsx("span",{children:p.label}),p.start&&p.end?e.jsxs("span",{className:$.slotMeta,children:[p.start," – ",p.end]}):null]},p.id)})})]})});Jt.displayName="Calendar.SlotPanel";function Dl({value:t,defaultValue:r=[],onValueChange:i,month:n,defaultMonth:s=new Date,onMonthChange:a,activeDate:l,defaultActiveDate:d,onActiveDateChange:u,slots:c=ol,daySlots:m,booked:g=[],disabledDates:h=[],minDate:f,maxDate:p,maxSelections:v,locale:x="en-US",weekStartsOn:w=0,showSlotPanel:S=!0,renderSelectionSummary:C,className:b,children:j,...T},M){const[k,H]=o.useState(Ar(s)),[L,D]=o.useState(r),[O,ie]=o.useState(d??null),A=n??k,N=t??L,V=l??O,q=o.useMemo(()=>new Set(g.map(E=>Pe(E.date,E.slotId))),[g]),te=o.useMemo(()=>new Set(h),[h]),Y=o.useCallback(E=>{const U=sl(E);t===void 0&&D(U),i==null||i(U)},[i,t]),B=o.useCallback(E=>{const U=Ar(E);n===void 0&&H(U),a==null||a(U)},[n,a]),K=o.useCallback(E=>{l===void 0&&ie(E),u==null||u(E)},[l,u]),J=o.useCallback(E=>{const U=Ht(E);return!!(te.has(U)||f&&E<Nr(f)||p&&E>Nr(p))},[te,p,f]),Re=o.useMemo(()=>({locale:x,weekStartsOn:w,month:A,activeDate:V,setActiveDate:K,goToPreviousMonth:()=>B(Mr(A,-1)),goToNextMonth:()=>B(Mr(A,1)),selection:N,toggleSlot:(E,U)=>{if(q.has(Pe(E,U)))return;const pe=Lt(E,c,m).find(Fe=>Fe.id===U);!pe||pe.disabled||Y(al(N,E,U,v))},isSlotSelected:(E,U)=>N.some(pe=>pe.date===E&&pe.slotId===U),isSlotBooked:(E,U)=>q.has(Pe(E,U)),isDateDisabled:J,getSlotsForDate:E=>Lt(E,c,m),getSelectionCountForDate:E=>N.filter(U=>U.date===E).length,maxSelections:v}),[q,m,V,J,x,v,N,K,B,Y,c,A,w]),me=N.length>0&&e.jsxs("div",{className:$.summary,children:[e.jsxs("p",{className:$.summaryTitle,children:["Your bookings (",N.length,")"]}),e.jsx("ul",{className:$.summaryList,children:N.map(E=>{const U=Lt(E.date,c,m).find(pe=>pe.id===E.slotId);return e.jsxs("li",{children:[E.date," · ",(U==null?void 0:U.label)??E.slotId]},Pe(E.date,E.slotId))})})]});return e.jsx(Si.Provider,{value:Re,children:e.jsx("div",{ref:M,className:y($.root,b),...T,children:j??e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:y($.shell,S&&$.shellWithPanel),children:[e.jsxs("div",{children:[e.jsx(Kt,{}),e.jsx(Xt,{})]}),S?e.jsx(Jt,{}):null]}),C?C(N):me]})})})}function Ar(t){return new Date(t.getFullYear(),t.getMonth(),1)}function Nr(t){return new Date(t.getFullYear(),t.getMonth(),t.getDate())}const El=o.forwardRef(Dl),Ci=Object.assign(El,{Header:Kt,Grid:Xt,SlotPanel:Jt});Ci.displayName="Calendar";function oe(t){return new Date(t.getFullYear(),t.getMonth(),t.getDate())}function Rt(t,r){return t.getFullYear()===r.getFullYear()&&t.getMonth()===r.getMonth()&&t.getDate()===r.getDate()}function zl(t,r){return t.getFullYear()===r.getFullYear()&&t.getMonth()===r.getMonth()}function Bl(t,r){return oe(t).getTime()<oe(r).getTime()}function $l(t,r){return oe(t).getTime()>oe(r).getTime()}function ql(t,r,i){const n=oe(t).getTime(),s=oe(r).getTime(),a=oe(i).getTime(),l=Math.min(s,a),d=Math.max(s,a);return n>=l&&n<=d}function Hl(t){return new Date(t.getFullYear(),t.getMonth(),1)}function Ol(t,r){const i=Hl(t),n=(i.getDay()-r+7)%7,s=new Date(i);return s.setDate(i.getDate()-n),Array.from({length:42},(a,l)=>{const d=new Date(s);return d.setDate(s.getDate()+l),d})}function Fl(t,r){return new Intl.DateTimeFormat(r,{month:"long",year:"numeric"}).format(t)}function Ul(t,r){const i=new Intl.DateTimeFormat(t,{weekday:"short"}),n=new Date(2024,0,7),s=[];for(let a=0;a<7;a+=1){const l=new Date(n);l.setDate(n.getDate()+(r+a)%7),s.push(i.format(l))}return s}function Wl(t,r){return t==="iso"?r==="datetime"?"yyyy-MM-dd HH:mm":"yyyy-MM-dd":t==="eu"?r==="datetime"?"dd/MM/yyyy HH:mm":"dd/MM/yyyy":r==="datetime"?"MM/dd/yyyy h:mm a":"MM/dd/yyyy"}function nt(t){return String(t).padStart(2,"0")}function Vl(t){const r=t.getHours(),i=r%12||12,n=nt(t.getMinutes()),s=r>=12?"PM":"AM";return`${i}:${n} ${s}`}function Ye(t,r,i){const n=t.getFullYear(),s=nt(t.getMonth()+1),a=nt(t.getDate()),l=nt(t.getHours()),d=nt(t.getMinutes());if(r==="iso"){const c=`${n}-${s}-${a}`;return i==="datetime"?`${c} ${l}:${d}`:c}if(r==="eu"){const c=`${a}/${s}/${n}`;return i==="datetime"?`${c} ${l}:${d}`:c}const u=`${s}/${a}/${n}`;return i==="datetime"?`${u} ${Vl(t)}`:u}function it(t,r,i){if(!t.from&&!t.to)return"";const n=t.from?Ye(t.from,r,i):"",s=t.to?Ye(t.to,r,i):"";return n&&s?`${n} - ${s}`:n||s}function ki(t){const r=t.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);if(!r)return null;let i=Number(r[1]);const n=Number(r[2]),s=r[3].toUpperCase();return i<1||i>12||n>59?null:(s==="PM"&&i<12&&(i+=12),s==="AM"&&i===12&&(i=0),{hours:i,minutes:n})}function Gl(t){const r=t.trim().match(/^(\d{1,2}):(\d{2})$/);if(!r)return null;const i=Number(r[1]),n=Number(r[2]);return i>23||n>59?null:{hours:i,minutes:n}}function It(t,r,i,n=0,s=0){const a=new Date(t,r-1,i,n,s,0,0);return a.getFullYear()!==t||a.getMonth()!==r-1||a.getDate()!==i?null:a}function Ot(t,r,i){const n=t.trim();if(!n)return null;if(r==="iso"){const d=i==="datetime"?n.match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{1,2}):(\d{2})$/):n.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!d)return null;const u=i==="datetime"?Number(d[4]):0,c=i==="datetime"?Number(d[5]):0;return It(Number(d[1]),Number(d[2]),Number(d[3]),u,c)}if(r==="eu"){const d=i==="datetime"?n.match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{1,2}):(\d{2})$/):n.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);if(!d)return null;const u=i==="datetime"?Number(d[4]):0,c=i==="datetime"?Number(d[5]):0;return It(Number(d[3]),Number(d[2]),Number(d[1]),u,c)}const s=i==="datetime"?n.match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(.+)$/):n.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);if(!s)return null;let a=0,l=0;if(i==="datetime"){const d=ki(s[4]);if(!d)return null;a=d.hours,l=d.minutes}return It(Number(s[3]),Number(s[1]),Number(s[2]),a,l)}function Ql(t,r,i){const n=t.trim();if(!n)return{from:null,to:null};const s=n.split(/\s+-\s+/);if(s.length!==2)return null;const a=Ot(s[0],r,i),l=Ot(s[1],r,i);return!a||!l?null:a.getTime()<=l.getTime()?{from:a,to:l}:{from:l,to:a}}function Yl(t,{disablePast:r,minDate:i,maxDate:n,isDateDisabled:s}){const a=oe(new Date),l=r?i?new Date(Math.max(oe(i).getTime(),a.getTime())):a:i?oe(i):void 0;return!!(l&&Bl(t,l)||n&&$l(t,n)||s!=null&&s(t))}function Xl(t,r){return r?ki(t):Gl(t)}function Kl(t,r,i){const n=new Date(t);return n.setHours(r,i,0,0),n}function Pr(t){return!t.from||!t.to||t.from.getTime()<=t.to.getTime()?t:{from:t.to,to:t.from}}const Jl="_root_138am_1",Zl="_label_138am_8",ed="_required_138am_14",td="_field_138am_19",rd="_control_138am_23",id="_controlError_138am_37",nd="_controlDisabled_138am_41",sd="_input_138am_45",ad="_trigger_138am_67",od="_popover_138am_87",ld="_calendar_138am_101",dd="_calendarHeader_138am_105",cd="_monthLabel_138am_113",ud="_navButton_138am_118",md="_weekdays_138am_135",pd="_grid_138am_136",hd="_weekday_138am_135",gd="_day_138am_150",fd="_dayOutside_138am_167",vd="_daySelected_138am_172",xd="_dayInRange_138am_181",bd="_dayRangeStart_138am_185",yd="_dayRangeEnd_138am_186",wd="_dayDisabled_138am_191",jd="_timeRow_138am_196",Sd="_timeField_138am_205",_d="_timeLabel_138am_211",Cd="_timeInput_138am_217",kd="_message_138am_227",Td="_error_138am_234",Md="_hint_138am_238",I={root:Jl,label:Zl,required:ed,field:td,control:rd,controlError:id,controlDisabled:nd,input:sd,trigger:ad,popover:od,calendar:ld,calendarHeader:dd,monthLabel:cd,navButton:ud,weekdays:md,grid:pd,weekday:hd,day:gd,dayOutside:fd,daySelected:vd,dayInRange:xd,dayRangeStart:bd,dayRangeEnd:yd,dayDisabled:wd,timeRow:jd,timeField:Sd,timeLabel:_d,timeInput:Cd,message:kd,error:Td,hint:Md};function Ad({month:t,locale:r,weekStartsOn:i,mode:n,selectedDate:s,rangeValue:a,hoverDate:l,disablePast:d,minDate:u,maxDate:c,isDateDisabled:m,onMonthChange:g,onSelectDate:h,onHoverDate:f,className:p}){const v=o.useMemo(()=>Ul(r,i),[r,i]),x=o.useMemo(()=>Ol(t,i),[t,i]),w=o.useMemo(()=>(n!=="range"||!a.from||l)&&n==="range"&&a.from&&l?{from:a.from,to:l}:a,[l,n,a]);return e.jsxs("div",{className:y(I.calendar,p),children:[e.jsxs("div",{className:I.calendarHeader,children:[e.jsx("button",{type:"button",className:I.navButton,"aria-label":"Previous month",onClick:()=>g(new Date(t.getFullYear(),t.getMonth()-1,1)),children:"‹"}),e.jsx("span",{className:I.monthLabel,children:Fl(t,r)}),e.jsx("button",{type:"button",className:I.navButton,"aria-label":"Next month",onClick:()=>g(new Date(t.getFullYear(),t.getMonth()+1,1)),children:"›"})]}),e.jsx("div",{className:I.weekdays,children:v.map(S=>e.jsx("span",{className:I.weekday,children:S},S))}),e.jsx("div",{className:I.grid,children:x.map(S=>{const C=Yl(S,{disablePast:d,minDate:u,maxDate:c,isDateDisabled:m}),b=n==="single"?!!(s&&Rt(S,s)):!1,j=n==="range"&&w.from&&w.to&&ql(S,w.from,w.to),T=n==="range"&&w.from&&Rt(S,w.from),M=n==="range"&&w.to&&Rt(S,w.to);return e.jsx("button",{type:"button",className:y(I.day,!zl(S,t)&&I.dayOutside,b&&I.daySelected,j&&I.dayInRange,T&&I.dayRangeStart,M&&I.dayRangeEnd,C&&I.dayDisabled),disabled:C,onMouseEnter:()=>f(S),onMouseLeave:()=>f(null),onClick:()=>h(S),children:S.getDate()},S.toISOString())})})]})}const{SlotClassNamesProvider:Nd}=Ct(),Lr={from:null,to:null};function Pd(){return e.jsx("svg",{viewBox:"0 0 20 20",width:"16",height:"16",fill:"currentColor","aria-hidden":"true",children:e.jsx("path",{d:"M5.75 3a.75.75 0 00-.75.75V5H4a2 2 0 00-2 2v8.5A2.5 2.5 0 004.5 18h11a2.5 2.5 0 002.5-2.5V7a2 2 0 00-2-2h-1V3.75a.75.75 0 00-1.5 0V5H6.5V3.75A.75.75 0 005.75 3zM4 7.5h12V15.5a1 1 0 01-1 1h-10a1 1 0 01-1-1V7.5z"})})}const wt=o.forwardRef(function({mode:r="single",precision:i="date",value:n,defaultValue:s=null,onValueChange:a,rangeValue:l,defaultRangeValue:d=Lr,onRangeValueChange:u,disablePast:c=!1,minDate:m,maxDate:g,isDateDisabled:h,dateFormat:f="us",allowTyping:p=!0,label:v,placeholder:x,helperText:w,error:S,disabled:C=!1,required:b=!1,weekStartsOn:j=0,locale:T="en-US",className:M,classNames:k,...H},L){const D=o.useId(),O=Dr(`datepicker-${D.replace(/:/g,"")}`),ie=o.useRef(null),A=o.useRef(null),[N,V]=o.useState(!1),[q,te]=o.useState(s),[Y,B]=o.useState(d),[K,J]=o.useState(""),[Re,me]=o.useState(null),[E,U]=o.useState(null),[pe,Fe]=o.useState(null),[Ii,Mt]=o.useState(()=>oe(n??s??new Date)),[Je,Zt]=o.useState("09:00"),[dt,Di]=o.useState("17:00"),Se=n??q,se=l??Y,ct=x??Wl(f,i),ut=f==="us"&&i==="datetime",Ue=o.useCallback(R=>{n===void 0&&te(R),a==null||a(R)},[a,n]),Me=o.useCallback(R=>{const le=Pr(R);l===void 0&&B(le),u==null||u(le)},[u,l]),er=o.useCallback(()=>{if(r==="range"){J(it(se,f,i));return}J(Se?Ye(Se,f,i):"")},[f,r,i,Se,se]);o.useEffect(()=>{er()},[er]),o.useEffect(()=>{r==="single"&&Se&&(Mt(oe(Se)),i==="datetime"&&Zt(Ye(Se,f,"datetime").split(" ").slice(1).join(" "))),r==="range"&&se.from&&Mt(oe(se.from))},[f,r,i,Se,se.from]),o.useEffect(()=>{if(!N)return;function R(le){var Ze,ke;const G=le.target;(Ze=A.current)!=null&&Ze.contains(G)||(ke=ie.current)!=null&&ke.contains(G)||(V(!1),Fe(null),U(null))}return document.addEventListener("mousedown",R),()=>document.removeEventListener("mousedown",R)},[N]);const Ie=o.useCallback((R,le)=>{if(i!=="datetime")return oe(R);const G=Xl(le,ut);return G?Kl(R,G.hours,G.minutes):R},[i,ut]),Ei=o.useCallback(R=>{if(r==="single"){const ke=Ie(R,Je);Ue(ke),J(Ye(ke,f,i)),me(null),i==="date"&&V(!1);return}if(!pe){const ke=Ie(R,Je);Fe(ke),Me({from:ke,to:null}),J(it({from:ke,to:null},f,i));return}const le=pe,G=Ie(R,dt),Ze=Pr({from:le,to:G});Me(Ze),J(it(Ze,f,i)),Fe(null),U(null),me(null),i==="date"&&V(!1)},[Ie,f,r,pe,i,dt,Me,Ue,Je]),tr=o.useCallback(()=>{if(!p)return;const R=K.trim();if(!R){me(null),r==="single"?Ue(null):Me(Lr);return}if(r==="range"){const G=Ql(R,f,i);if(!(G!=null&&G.from)||!G.to){me(`Enter a valid range like ${ct}`);return}me(null),Me(G),Fe(null);return}const le=Ot(R,f,i);if(!le){me(`Enter a valid date like ${ct}`);return}me(null),Ue(le)},[p,f,ct,K,r,i,Me,Ue]),zi=R=>{J(R.target.value),Re&&me(null)},mt=(R,le="start")=>{if(le==="end"){if(Di(R),se.to){const G=Ie(se.to,R);Me({...se,to:G}),J(it({...se,to:G},f,i))}return}if(Zt(R),r==="single"&&Se){const G=Ie(Se,R);Ue(G),J(Ye(G,f,i));return}if(r==="range"&&se.from){const G=Ie(se.from,R);Me({...se,from:G}),J(it({...se,from:G},f,i))}},pt=S??Re,rr=o.useMemo(()=>ut?"09:00 AM":"09:00",[ut]);return e.jsx(Nd,{classNames:k,children:e.jsxs("div",{ref:L,className:y(I.root,k==null?void 0:k.root,M),...H,children:[v?e.jsxs("label",{className:I.label,htmlFor:O,children:[v,b?e.jsx("span",{className:I.required,"aria-hidden":"true",children:"*"}):null]}):null,e.jsxs("div",{ref:A,className:I.field,children:[e.jsxs("div",{className:y(I.control,k==null?void 0:k.control,pt?I.controlError:void 0,C&&I.controlDisabled),children:[e.jsx("input",{id:O,className:y(I.input,k==null?void 0:k.input),value:K,placeholder:ct,disabled:C||!p,readOnly:!p,"aria-invalid":pt?!0:void 0,"aria-required":b||void 0,onChange:zi,onBlur:tr,onKeyDown:R=>{R.key==="Enter"&&(R.preventDefault(),tr())}}),e.jsx("button",{type:"button",className:y(I.trigger,k==null?void 0:k.trigger),"aria-label":"Open calendar",disabled:C,onClick:()=>V(R=>!R),children:e.jsx(Pd,{})})]}),N?e.jsxs("div",{ref:ie,className:y(I.popover,k==null?void 0:k.popover),children:[e.jsx(Ad,{className:k==null?void 0:k.calendar,month:Ii,locale:T,weekStartsOn:j,mode:r,selectedDate:Se,rangeValue:se,hoverDate:E,disablePast:c,minDate:m,maxDate:g,isDateDisabled:h,onMonthChange:Mt,onSelectDate:Ei,onHoverDate:U}),i==="datetime"?e.jsxs("div",{className:y(I.timeRow,k==null?void 0:k.time),children:[e.jsxs("div",{className:I.timeField,children:[e.jsx("span",{className:I.timeLabel,children:r==="range"?"Start time":"Time"}),e.jsx("input",{className:I.timeInput,value:Je,placeholder:rr,onChange:R=>mt(R.target.value,"start"),onBlur:()=>mt(Je,"start")})]}),r==="range"?e.jsxs("div",{className:I.timeField,children:[e.jsx("span",{className:I.timeLabel,children:"End time"}),e.jsx("input",{className:I.timeInput,value:dt,placeholder:rr,onChange:R=>mt(R.target.value,"end"),onBlur:()=>mt(dt,"end")})]}):null]}):null,r==="range"?e.jsx("p",{className:I.hint,children:pe?"Select an end date":"Select a start date, then an end date"}):null]}):null]}),pt?e.jsx("p",{className:y(I.message,I.error),role:"alert",children:pt}):w?e.jsx("p",{className:I.message,children:w}):null]})})});wt.displayName="DatePicker";const Ld="_root_141rp_1",Rd="_messages_141rp_11",Id="_message_141rp_11",Dd="_user_141rp_32",Ed="_assistant_141rp_38",zd="_system_141rp_44",Bd="_meta_141rp_54",$d="_suggestions_141rp_59",qd="_suggestion_141rp_59",Hd="_prompt_141rp_87",Od="_promptRow_141rp_96",Fd="_queueHint_141rp_102",Ud="_queue_141rp_102",Wd="_queueHeader_141rp_120",Vd="_queueTitle_141rp_127",Gd="_queueCount_141rp_135",Qd="_queueList_141rp_140",Yd="_queueItem_141rp_149",Xd="_queueQueued_141rp_160",Kd="_queueRunning_141rp_164",Jd="_queueDone_141rp_170",Zd="_queueFailed_141rp_174",ec="_queueBody_141rp_189",tc="_queueStatus_141rp_195",rc="_statusQueued_141rp_202",ic="_statusRunning_141rp_206",nc="_statusDone_141rp_210",sc="_statusFailed_141rp_214",ac="_queueText_141rp_218",oc="_queueActions_141rp_227",lc="_queueAction_141rp_227",dc="_queueEmpty_141rp_252",cc="_field_141rp_258",uc="_label_141rp_265",mc="_textarea_141rp_277",pc="_send_141rp_301",P={root:Ld,messages:Rd,message:Id,user:Dd,assistant:Ed,system:zd,meta:Bd,suggestions:$d,suggestion:qd,prompt:Hd,promptRow:Od,queueHint:Fd,queue:Ud,queueHeader:Wd,queueTitle:Vd,queueCount:Gd,queueList:Qd,queueItem:Yd,queueQueued:Xd,queueRunning:Kd,queueDone:Jd,queueFailed:Zd,queueBody:ec,queueStatus:tc,statusQueued:rc,statusRunning:ic,statusDone:nc,statusFailed:sc,queueText:ac,queueActions:oc,queueAction:lc,queueEmpty:dc,field:cc,label:uc,textarea:mc,send:pc},{SlotClassNamesProvider:hc,useSlotClassName:Be}=Ct(),Ti=o.forwardRef(function({label:r="AI chat",className:i,classNames:n,children:s,...a},l){return e.jsx(hc,{classNames:n,children:e.jsx("div",{ref:l,className:y(P.root,n==null?void 0:n.root,i),role:"region","aria-label":r,...a,children:s})})});Ti.displayName="AiChat";const Mi=o.forwardRef(function({className:r,children:i,...n},s){return e.jsx("div",{ref:s,className:y(P.messages,Be("messages"),r),role:"log","aria-live":"polite","aria-relevant":"additions",...n,children:i})});Mi.displayName="AiChat.Messages";const Ai=o.forwardRef(function({messageRole:r,meta:i,className:n,children:s,...a},l){const d=r==="user"?P.user:r==="assistant"?P.assistant:P.system;return e.jsxs("div",{ref:l,className:y(P.message,d,Be("message"),n),role:r==="system"?"note":"article","aria-label":r==="user"?"Your message":r==="assistant"?"Assistant message":"System message",...a,children:[e.jsx("div",{children:s}),i?e.jsx("span",{className:P.meta,children:i}):null]})});Ai.displayName="AiChat.Message";const Ni=o.forwardRef(function({suggestions:r,onSelect:i,label:n="Suggested prompts",className:s,...a},l){const d=Be("suggestions");return r.length?e.jsx("div",{ref:l,className:y(P.suggestions,d,s),role:"group","aria-label":n,...a,children:r.map(u=>e.jsx("button",{type:"button",className:P.suggestion,onClick:()=>i(u),children:u},u))}):null});Ni.displayName="AiChat.Suggestions";const gc={queued:"Waiting",running:"Running",done:"Done",failed:"Failed"},fc={queued:P.queueQueued,running:P.queueRunning,done:P.queueDone,failed:P.queueFailed},vc={queued:P.statusQueued,running:P.statusRunning,done:P.statusDone,failed:P.statusFailed},Pi=o.forwardRef(function({items:r,onRemove:i,onRetry:n,label:s="Task queue",emptyLabel:a="No tasks in queue",showDone:l=!0,showFailed:d=!0,className:u,...c},m){const g=r.filter(h=>h.status==="done"?l:h.status==="failed"?d:!0);return e.jsxs("div",{ref:m,className:y(P.queue,Be("queue"),u),"aria-label":s,...c,children:[e.jsxs("div",{className:P.queueHeader,children:[e.jsx("span",{className:P.queueTitle,children:s}),e.jsx("span",{className:P.queueCount,children:g.length?`${g.length} task${g.length===1?"":"s"}`:a})]}),g.length?e.jsx("ul",{className:P.queueList,children:g.map(h=>e.jsxs("li",{className:y(P.queueItem,fc[h.status]),children:[e.jsxs("div",{className:P.queueBody,children:[e.jsx("span",{className:y(P.queueStatus,vc[h.status]),children:gc[h.status]}),e.jsx("p",{className:P.queueText,children:h.text})]}),e.jsxs("div",{className:P.queueActions,children:[h.status==="failed"&&n?e.jsx("button",{type:"button",className:P.queueAction,onClick:()=>n(h.id),children:"Retry"}):null,h.status==="queued"&&i?e.jsx("button",{type:"button",className:P.queueAction,"aria-label":`Remove queued task: ${h.text}`,onClick:()=>i(h.id),children:"Remove"}):null]})]},h.id))}):e.jsx("p",{className:P.queueEmpty,children:a})]})});Pi.displayName="AiChat.Queue";const Li=o.forwardRef(function({value:r,onValueChange:i,onSubmit:n,onQueue:s,busy:a=!1,placeholder:l="Ask anything…",busyPlaceholder:d="Queue a follow-up while the assistant works…",disabled:u=!1,inputLabel:c="Message",sendLabel:m="Send message",queueSendLabel:g="Queue message",textareaProps:h,className:f,...p},v){const x=a&&!!s,{className:w,...S}=h??{},C=o.useCallback(T=>{T.preventDefault();const M=r.trim();!M||u||(x?s==null||s(M):n(M))},[u,s,n,x,r]),b=x?d:l,j=x?g:m;return e.jsxs("form",{ref:v,className:y(P.prompt,Be("prompt"),f),onSubmit:C,...p,children:[x?e.jsx("p",{className:P.queueHint,role:"status",children:"Assistant is working — new messages join the queue and run when the current task finishes."}):null,e.jsxs("div",{className:P.promptRow,children:[e.jsxs("div",{className:P.field,children:[e.jsx("label",{className:P.label,htmlFor:"ai-chat-prompt",children:c}),e.jsx("textarea",{id:"ai-chat-prompt",className:y(P.textarea,Be("textarea"),w),value:r,onChange:T=>i(T.target.value),placeholder:b,disabled:u,rows:1,"aria-label":c,onKeyDown:T=>{var M;T.key==="Enter"&&!T.shiftKey&&(T.preventDefault(),(M=T.currentTarget.form)==null||M.requestSubmit())},...S})]}),e.jsx("button",{type:"submit",className:y(P.send,Be("send")),disabled:u||!r.trim(),"aria-label":j,children:e.jsx(Z,{name:"send",size:"sm"})})]})]})});Li.displayName="AiChat.Prompt";const ye=Object.assign(Ti,{Messages:Mi,Message:Ai,Suggestions:Ni,Queue:Pi,Prompt:Li});function xc(){return`task-${Date.now()}-${Math.random().toString(36).slice(2,7)}`}function bc({onProcess:t,onTaskComplete:r,onTaskError:i,keepDone:n=3}){const[s,a]=o.useState([]),l=o.useRef(s),d=o.useRef(!1),u=o.useRef(t),c=o.useRef(r),m=o.useRef(i);l.current=s,u.current=t,c.current=r,m.current=i;const g=o.useCallback(b=>{const j=b.filter(M=>M.status==="done").length;if(j<=n)return b;let T=0;return b.filter(M=>M.status!=="done"?!0:(T+=1,j-T<n))},[n]),h=o.useCallback(async()=>{var T,M;if(d.current)return;const b=l.current.find(k=>k.status==="queued");if(!b)return;d.current=!0;const j={...b,status:"running"};a(k=>{const H=k.map(L=>L.id===b.id?j:L);return l.current=H,H});try{await u.current(j),a(k=>{const H=g(k.map(L=>L.id===b.id?{...L,status:"done"}:L));return l.current=H,H}),(T=c.current)==null||T.call(c,j)}catch(k){a(H=>{const L=H.map(D=>D.id===b.id?{...D,status:"failed"}:D);return l.current=L,L}),(M=m.current)==null||M.call(m,j,k)}finally{d.current=!1,queueMicrotask(()=>{h()})}},[g]),f=o.useCallback(b=>{const j=b.trim();if(!j)return"";const T={id:xc(),text:j,createdAt:Date.now(),status:"queued"};return a(M=>{const k=[...M,T];return l.current=k,queueMicrotask(()=>{h()}),k}),T.id},[h]),p=o.useCallback(b=>{a(j=>j.filter(T=>T.id!==b||T.status==="running"))},[]),v=o.useCallback(()=>{a(b=>b.filter(j=>j.status!=="done"&&j.status!=="failed"))},[]),x=o.useCallback(b=>{a(j=>{const T=j.map(M=>M.id===b&&M.status==="failed"?{...M,status:"queued"}:M);return l.current=T,queueMicrotask(()=>{h()}),T})},[h]),w=s.filter(b=>b.status==="queued"),S=s.find(b=>b.status==="running")??null;return{items:s,queue:w,current:S,isProcessing:S!==null,enqueue:f,remove:p,clearCompleted:v,retry:x}}const yc=[{label:"Success",toast:{variant:"success",title:"Saved",description:"Your profile was updated."}},{label:"Error",toast:{variant:"error",title:"Upload failed",description:"Try again in a minute."}},{label:"Warning",toast:{variant:"warning",title:"Storage almost full",description:"Free up space to keep syncing."}},{label:"Info",toast:{variant:"info",title:"New version available",description:"Refresh to get the latest features."}},{label:"With action",buttonVariant:"ghost",toast:{variant:"error",title:"Sync failed",description:"We could not reach the server.",action:{label:"Get support",onClick:()=>{}}}}],wc=`import { ToastShowcase } from "asriui/toast";

const items = [
  {
    label: "Success",
    toast: { variant: "success", title: "Saved", description: "Your profile was updated." },
  },
  {
    label: "Error",
    toast: { variant: "error", title: "Upload failed", description: "Try again." },
  },
];

export function NotificationsDemo() {
  return (
    <ToastShowcase
      title="Try each notification"
      description="Pass items — the page builds itself."
      items={items}
      columns={2}
      position="bottom-right"
      showProgress
    />
  );
}`;function jc(){return e.jsx(zr,{title:"Try each notification",description:"Config-driven — add or remove items in the array.",items:yc,columns:3,position:"bottom-right",showProgress:!0})}const Sc=[{id:"sku",header:"SKU",accessor:"sku",sortable:!0,editable:!0,width:120,required:!0,unique:!0,pattern:/^SKU-\d{4}$/},{id:"name",header:"Name",accessor:"name",editable:"text",minLength:3,maxLength:40},{id:"category",header:"Category",accessor:"category",editable:"select",editor:{options:[{label:"Hardware",value:"Hardware"},{label:"Software",value:"Software"},{label:"Services",value:"Services"}]},rules:[{type:"oneOf",values:["Hardware","Software","Services"]}]},{id:"price",header:"Price",accessor:"price",align:"right",editable:"number",min:1,max:999}],_c=Array.from({length:80},(t,r)=>({id:`row-${r+1}`,sku:`SKU-${String(r+1).padStart(4,"0")}`,name:`Product ${r+1}`,category:["Hardware","Software","Services"][r%3],price:10+r%10*5})),Cc=`import { useState } from "react";
import { DataGrid, type DataGridColumn } from "asriui/data-grid";
import { ToastProvider, toast } from "asriui/toast";

type ProductRow = {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
};

const columns: DataGridColumn<ProductRow>[] = [
  { id: "sku", header: "SKU", accessor: "sku", editable: true, required: true, unique: true },
  { id: "name", header: "Name", accessor: "name", editable: "text", minLength: 3 },
  { id: "category", header: "Category", accessor: "category", editable: "select", editor: { options: [...] } },
  { id: "price", header: "Price", accessor: "price", editable: "number", min: 1, max: 999 },
];

export function ProductCatalogGrid() {
  const [rows, setRows] = useState<ProductRow[]>(initialRows);

  return (
    <ToastProvider>
      <DataGrid
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        height={420}
        editable={{
          validateOn: "blur",
          commitOn: "blur",
          onRowsChange: setRows,
          onCellChange: ({ row, columnId }) =>
            toast.success("Row saved", { description: \`Updated \${columnId} on \${row.name}\` }),
        }}
        expandable={{
          renderExpandedRow: (row) => (
            <div>
              <strong>{row.name}</strong> — SKU {row.sku}, {row.category}, \${row.price}
            </div>
          ),
        }}
        pagination={{ pageSize: 10, pageSizeOptions: [10, 25, 50] }}
        virtualize={{ rowHeight: 48, threshold: 30 }}
        exportable={{ csv: true, excel: true, filename: "products" }}
      />
    </ToastProvider>
  );
}`;function kc(){const[t,r]=o.useState(_c);return e.jsx(st,{position:"top-center",children:e.jsx(at,{columns:Sc,rows:t,getRowId:i=>i.id,height:420,defaultSort:{columnId:"sku",direction:"asc"},editable:{validateOn:"blur",commitOn:"blur",onRowsChange:r,onCellChange:({row:i,columnId:n})=>xe.success("Row saved",{description:`Updated ${n} on ${i.name}`})},expandable:{renderExpandedRow:i=>e.jsxs("div",{children:[e.jsx("strong",{children:i.name})," — SKU ",i.sku,", ",i.category,", $",i.price]})},pagination:{pageSize:10,pageSizeOptions:[10,25,50]},virtualize:{rowHeight:48,threshold:30},exportable:{csv:!0,excel:!0,filename:"products"}})})}const Ri=[{id:"1",name:"License",status:"Active",owner:"Ada"},{id:"2",name:"Support plan",status:"Trial",owner:"Grace"},{id:"3",name:"Analytics add-on",status:"Active",owner:"Lin"},{id:"4",name:"Storage pack",status:"Paused",owner:"Ada"},{id:"5",name:"API gateway",status:"Active",owner:"Noor"},{id:"6",name:"Design seats",status:"Trial",owner:"Grace"},{id:"7",name:"Workflow builder",status:"Active",owner:"Lin"},{id:"8",name:"Audit logs",status:"Paused",owner:"Noor"},{id:"9",name:"SSO bundle",status:"Active",owner:"Ada"},{id:"10",name:"Mobile SDK",status:"Trial",owner:"Grace"},{id:"11",name:"Edge cache",status:"Active",owner:"Lin"},{id:"12",name:"Premium support",status:"Paused",owner:"Noor"}];function Tc(t,r){if(!r)return t;const i=r.direction==="asc"?1:-1;return[...t].sort((n,s)=>{const a=n[r.columnId],l=s[r.columnId];return String(a).localeCompare(String(l))*i})}function Mc(t,r){var s;const i=(s=r.query)==null?void 0:s.trim().toLowerCase(),n=r.columns??{};return t.filter(a=>n.name&&!a.name.toLowerCase().includes(n.name.toLowerCase())||n.status&&!a.status.toLowerCase().includes(n.status.toLowerCase())||n.owner&&!a.owner.toLowerCase().includes(n.owner.toLowerCase())?!1:i?`${a.name} ${a.status} ${a.owner}`.toLowerCase().includes(i):!0)}const Ac=`const [rows, setRows] = useState<Row[]>([]);
const [sort, setSort] = useState<DataGridSortState>(null);
const [filter, setFilter] = useState<DataGridFilterState>({ query: "" });
const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(5);

<DataGrid
  columns={columns}
  rows={rows}
  getRowId={(row) => row.id}
  height={320}
  filter={{ query: filter.query, columns: filter.columns, onFilterChange: setFilter }}
  sort={sort}
  onSortChange={setSort}
  serverSide={{ totalRowCount: total }}
  pagination={{
    mode: "server",
    page,
    pageSize,
    totalRowCount: total,
    onPageChange: setPage,
    onPageSizeChange: setPageSize,
  }}
/>`;function Nc(){const[t,r]=o.useState(null),[i,n]=o.useState({query:""}),[s,a]=o.useState(1),[l,d]=o.useState(5),[u,c]=o.useState(!1),m=o.useMemo(()=>Mc(Ri,i),[i]),g=o.useMemo(()=>Tc(m,t),[m,t]),h=g.length,f=o.useMemo(()=>{const v=(s-1)*l;return g.slice(v,v+l)},[s,l,g]);o.useEffect(()=>{c(!0);const v=window.setTimeout(()=>c(!1),180);return()=>window.clearTimeout(v)},[i,t,s,l]);const p=o.useCallback(v=>{n(v),a(1)},[]);return e.jsx(at,{columns:[{id:"name",header:"Product",accessor:"name",sortable:!0,filterable:!0},{id:"status",header:"Status",accessor:"status",sortable:!0,filterable:!0},{id:"owner",header:"Owner",accessor:"owner",sortable:!0,filterable:!0}],rows:f,getRowId:v=>v.id,height:320,loading:u,filter:{query:i.query,columns:i.columns,onFilterChange:p},sort:t,onSortChange:v=>{r(v),a(1)},serverSide:{totalRowCount:h},pagination:{mode:"server",page:s,pageSize:l,totalRowCount:h,onPageChange:a,onPageSizeChange:v=>{d(v),a(1)}}})}function Pc(){return e.jsx(at,{columns:[{id:"name",header:"Product",accessor:"name",sortable:!0,filterable:!0},{id:"status",header:"Status",accessor:"status",sortable:!0,filterable:{type:"select",options:[{label:"Active",value:"Active"},{label:"Trial",value:"Trial"},{label:"Paused",value:"Paused"}]}},{id:"owner",header:"Owner",accessor:"owner",sortable:!0,filterable:!0}],rows:Ri,getRowId:t=>t.id,height:360,filter:{global:!1,columnFilters:!0},pagination:{pageSize:5,pageSizeOptions:[5,10]},defaultSort:{columnId:"name",direction:"asc"}})}const Lc={software:[{label:"License",value:"license"},{label:"Support",value:"support"}],services:[{label:"Onboarding",value:"onboarding"},{label:"Training",value:"training"}]},Rc=`const form = useForm(config);

<Form config={config} onSubmit={(values) => console.log(values)} />

// Or headless:
<Button onClick={() => form.handleSubmit(save)}>Save</Button>`;function Ic(){const[t,r]=o.useState(null),i=Hi({fields:[{name:"note",type:"text",label:"Quick note",placeholder:"From useForm hook"}]});return e.jsxs("div",{style:{display:"grid",gap:"1.5rem",maxWidth:480},children:[e.jsx(Dt,{config:{submitLabel:"Create profile",fields:[{name:"accountType",type:"select",label:"Account type",required:!0,options:[{label:"Personal",value:"personal"},{label:"Business",value:"business"}]},{name:"company",type:"text",label:"Company name",showWhen:{field:"accountType",equals:"business"},required:!0},{name:"category",type:"select",label:"Category",required:!0,options:[{label:"Software",value:"software"},{label:"Services",value:"services"}]},{name:"product",type:"select",label:"Product",required:!0,optionsFrom:{dependsOn:"category",load:async n=>Lc[String(n)]??[]}},{name:"avatar",type:"image",label:"Profile image",required:!0,multiple:!1}]},onSubmit:n=>r(n)}),e.jsx("div",{children:e.jsx(z,{size:"sm",variant:"outline",onClick:()=>i.handleSubmit(n=>r(n)),children:"Submit headless note via useForm"})}),t?e.jsx(xt,{variant:"success",title:"Submitted values",children:JSON.stringify(Object.fromEntries(Object.entries(t).map(([n,s])=>[n,Array.isArray(s)?s.map(a=>a.name):s])),null,2)}):null]})}function Dc(t){return new Promise(r=>{window.setTimeout(r,t)})}const Ec=`import { useState } from "react";
import { AiChat, useAiChatQueue } from "asriui/ai-chat";

export function AssistantWithQueue() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);

  const { items, isProcessing, enqueue, remove, retry } = useAiChatQueue({
    onProcess: async (task) => {
      setMessages((prev) => [...prev, { role: "user", text: task.text }]);
      const reply = await callModel(task.text);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    },
    onTaskComplete: () => {
      // Next queued task starts automatically
    },
  });

  function handleSubmit(value: string) {
    enqueue(value);
    setPrompt("");
  }

  return (
    <AiChat>
      <AiChat.Messages>{/* render messages */}</AiChat.Messages>
      <AiChat.Queue items={items} onRemove={remove} onRetry={retry} />
      <AiChat.Prompt
        value={prompt}
        onValueChange={setPrompt}
        onSubmit={handleSubmit}
        onQueue={handleSubmit}
        busy={isProcessing}
      />
    </AiChat>
  );
}`;function zc(){const[t,r]=o.useState(""),[i,n]=o.useState([{role:"assistant",text:"Ask me anything — send multiple prompts while I work."}]),{items:s,isProcessing:a,enqueue:l,remove:d,retry:u}=bc({onProcess:async m=>{n(g=>[...g,{role:"user",text:m.text}]),await Dc(1400),n(g=>[...g,{role:"assistant",text:`Finished "${m.text}". The next queued task starts on its own.`}])}}),c=o.useCallback(m=>{l(m),r("")},[l]);return e.jsx("div",{style:{maxWidth:420,width:"100%"},children:e.jsxs(ye,{label:"Assistant with queue",children:[e.jsx(ye.Messages,{children:i.map((m,g)=>e.jsx(ye.Message,{messageRole:m.role,children:m.text},`${g}-${m.text}`))}),e.jsx(ye.Queue,{items:s,onRemove:d,onRetry:u,label:"Message queue"}),e.jsx(ye.Suggestions,{suggestions:["Summarize docs","Generate form schema"],onSelect:r}),e.jsx(ye.Prompt,{value:t,onValueChange:r,onSubmit:c,onQueue:c,busy:a})]})})}function Ee(t){return e.jsx("div",{style:{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"},children:t})}function Bc(){const[t,r]=o.useState("light");return e.jsxs("div",{"data-theme":t,style:{display:"flex",alignItems:"center",gap:12},children:[e.jsx(Qi,{theme:t,onThemeChange:r,animation:"ripple",showLabel:!0}),e.jsxs("span",{style:{fontSize:13,color:"var(--asriui-color-muted-foreground)"},children:[t," mode"]})]})}const $c={button:[{id:"button-variants",title:"Variants",description:"Five visual styles for different emphasis levels.",code:`<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`,preview:Ee(e.jsxs(e.Fragment,{children:[e.jsx(z,{children:"Primary"}),e.jsx(z,{variant:"secondary",children:"Secondary"}),e.jsx(z,{variant:"outline",children:"Outline"}),e.jsx(z,{variant:"ghost",children:"Ghost"}),e.jsx(z,{variant:"danger",children:"Danger"})]}))},{id:"button-sizes",title:"Sizes",description:"Three size scales for dense UIs and hero CTAs.",code:`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,preview:Ee(e.jsxs(e.Fragment,{children:[e.jsx(z,{size:"sm",children:"Small"}),e.jsx(z,{size:"md",children:"Medium"}),e.jsx(z,{size:"lg",children:"Large"})]}))},{id:"button-loading",title:"Loading",description:"Disables interaction and shows a spinner with aria-busy.",code:`<Button loading>Saving…</Button>
<Button variant="outline" loading>Processing</Button>`,preview:Ee(e.jsxs(e.Fragment,{children:[e.jsx(z,{loading:!0,children:"Saving…"}),e.jsx(z,{variant:"outline",loading:!0,children:"Processing"})]}))},{id:"button-analytics",title:"GTM tracking",description:"Wrap the app in AsriUIProvider with analytics.gtmId. Override events per button with trackEvent and trackLabel.",code:`<AsriUIProvider config={{ analytics: { enabled: true, gtmId: "GTM-XXXX" } }}>
  <Button trackEvent="cta_save" trackLabel="Save profile">
    Save
  </Button>
</AsriUIProvider>`,preview:e.jsx(z,{trackEvent:"cta_save",trackLabel:"Save profile",children:"Save"})}],link:[{id:"link-variants",title:"Variants",description:"Default, muted, and button-styled links for inline navigation.",code:`<Link href="/docs">Documentation</Link>
<Link href="/settings" variant="muted">Settings</Link>
<Link href="/upgrade" variant="button">Upgrade</Link>`,preview:Ee(e.jsxs(e.Fragment,{children:[e.jsx(Qe,{href:"/docs",children:"Documentation"}),e.jsx(Qe,{href:"/settings",variant:"muted",children:"Settings"}),e.jsx(Qe,{href:"/upgrade",variant:"button",children:"Upgrade"})]}))},{id:"link-external",title:"External links",description:"Absolute URLs and target=_blank show an external icon and announce “opens in new tab” to assistive tech.",code:`<Link href="https://example.com" target="_blank">
  External docs
</Link>`,preview:e.jsx(Qe,{href:"https://example.com",target:"_blank",children:"External docs"})},{id:"link-analytics",title:"GTM tracking",description:"Per-link overrides mirror Button tracking props.",code:`<Link
  href="/pricing"
  trackEvent="nav_pricing"
  trackLabel="Pricing"
  trackPayload={{ section: "header" }}
>
  Pricing
</Link>`,preview:e.jsx(Qe,{href:"/pricing",trackEvent:"nav_pricing",trackLabel:"Pricing",children:"Pricing"})}],breadcrumb:[{id:"breadcrumb-trail",title:"Trail with back",description:"Declarative items API with a back control for nested docs and settings views.",code:`<Breadcrumb
  showBack
  onBack={() => history.back()}
  items={[
    { label: "Docs", href: "/docs" },
    { label: "Components", href: "/docs/components" },
    { label: "Button", current: true },
  ]}
/>`,preview:e.jsx(de,{showBack:!0,onBack:()=>{},items:[{label:"Docs",href:"/docs"},{label:"Components",href:"/docs/components"},{label:"Button",current:!0}]})},{id:"breadcrumb-compound",title:"Compound layout",description:"Compose Back, List, Item, and Separator for full control. Default separator is /.",code:`<Breadcrumb>
  <Breadcrumb.Back label="Back" />
  <Breadcrumb.List>
    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item current>Settings</Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb>`,preview:e.jsxs(de,{children:[e.jsx(de.Back,{label:"Back",onClick:()=>{}}),e.jsxs(de.List,{children:[e.jsx(de.Item,{href:"/",children:"Home"}),e.jsx(de.Separator,{}),e.jsx(de.Item,{current:!0,children:"Settings"})]})]})},{id:"breadcrumb-custom-separator",title:"Custom separator",description:"Override the default slash with text or any icon via the separator prop.",code:`<Breadcrumb
  separator="›"
  items={[
    { label: "Docs", href: "/docs" },
    { label: "Components", href: "/docs/components" },
    { label: "Button", current: true },
  ]}
/>

{/* Or per-separator in compound API */}
<Breadcrumb.Separator>•</Breadcrumb.Separator>`,preview:e.jsxs("div",{style:{display:"grid",gap:12},children:[e.jsx(de,{separator:"›",items:[{label:"Docs",href:"/docs"},{label:"Components",href:"/docs/components"},{label:"Button",current:!0}]}),e.jsx(de,{children:e.jsxs(de.List,{children:[e.jsx(de.Item,{href:"/",children:"Home"}),e.jsx(de.Separator,{children:"•"}),e.jsx(de.Item,{current:!0,children:"Profile"})]})})]})}],menu:[{id:"menu-basic",title:"Action menu",description:"Dropdown with items, separator, and destructive action styling.",code:`<Menu>
  <Menu.Trigger>Options</Menu.Trigger>
  <Menu.Content aria-label="Row actions">
    <Menu.Item onSelect={() => edit()}>Edit</Menu.Item>
    <Menu.Separator />
    <Menu.Item destructive onSelect={() => remove()}>Delete</Menu.Item>
  </Menu.Content>
</Menu>`,preview:e.jsxs(ne,{children:[e.jsx(ne.Trigger,{children:"Options"}),e.jsxs(ne.Content,{"aria-label":"Row actions",children:[e.jsx(ne.Item,{children:"Edit"}),e.jsx(ne.Separator,{}),e.jsx(ne.Item,{destructive:!0,children:"Delete"})]})]})},{id:"menu-groups",title:"Grouped menu",description:"Organize related links with Menu.Group and Menu.Label.",code:`<Menu placement="bottom-end">
  <Menu.Trigger>Menu</Menu.Trigger>
  <Menu.Content>
    <Menu.Group label="Account">
      <Menu.Item>Profile</Menu.Item>
      <Menu.Item>Settings</Menu.Item>
    </Menu.Group>
  </Menu.Content>
</Menu>`,preview:e.jsxs(ne,{placement:"bottom-end",children:[e.jsx(ne.Trigger,{children:"Menu"}),e.jsxs(ne.Content,{children:[e.jsxs(ne.Group,{label:"Account",children:[e.jsx(ne.Item,{children:"Profile"}),e.jsx(ne.Item,{children:"Settings"})]}),e.jsx(ne.Separator,{}),e.jsx(ne.Group,{label:"Support",children:e.jsx(ne.Item,{children:"Docs"})})]})]})}],dropdown:[{id:"dropdown-basic",title:"Basic dropdown",description:"Single-select field with an options array.",code:`<Dropdown
  label="Country"
  placeholder="Select a country"
  value={country}
  onValueChange={setCountry}
  options={[
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
  ]}
/>`,preview:e.jsx(ht,{label:"Country",placeholder:"Select a country",defaultValue:"us",options:[{value:"us",label:"United States"},{value:"uk",label:"United Kingdom"},{value:"ca",label:"Canada"}]})},{id:"dropdown-searchable",title:"Searchable with scroll",description:"Type to filter options. Long lists scroll inside the panel.",code:`<Dropdown
  label="Country"
  searchable
  placeholder="Type to filter countries"
  listMaxHeight="12rem"
  value={country}
  onValueChange={setCountry}
  options={countries}
/>`,preview:e.jsx(ht,{label:"Country",searchable:!0,placeholder:"Type to filter countries",listMaxHeight:"12rem",options:[{value:"us",label:"United States"},{value:"uk",label:"United Kingdom"},{value:"ca",label:"Canada"},{value:"de",label:"Germany"},{value:"fr",label:"France"},{value:"es",label:"Spain"},{value:"it",label:"Italy"},{value:"jp",label:"Japan"},{value:"au",label:"Australia"},{value:"br",label:"Brazil"},{value:"in",label:"India"},{value:"mx",label:"Mexico"}]})},{id:"dropdown-size-sm",title:"Compact size",description:'Use size="sm" for toolbars and dense layouts.',code:`<Dropdown
  size="sm"
  searchable
  placeholder="Template"
  options={templates}
/>`,preview:e.jsx(ht,{size:"sm",searchable:!0,placeholder:"Template",defaultValue:"blank",options:[{value:"blank",label:"Blank canvas"},{value:"support",label:"Support agent"},{value:"notify",label:"Omnichannel notify"}]})},{id:"dropdown-multiple",title:"Multiple select",description:"Set multiple to choose several options. The menu stays open until you click outside.",code:`<Dropdown
  multiple
  label="Teams"
  placeholder="Select teams"
  value={teams}
  onValueChange={setTeams}
  options={[
    { value: "design", label: "Design" },
    { value: "eng", label: "Engineering" },
    { value: "ops", label: "Operations" },
  ]}
/>`,preview:e.jsx(ht,{multiple:!0,label:"Teams",placeholder:"Select teams",defaultValue:["eng"],options:[{value:"design",label:"Design"},{value:"eng",label:"Engineering"},{value:"ops",label:"Operations"},{value:"sales",label:"Sales"}]})}],"date-picker":[{id:"date-picker-single",title:"Single date",description:"Type a date or pick from the calendar. Past dates are blocked.",code:`<DatePicker
  label="Appointment"
  disablePast
  dateFormat="us"
  value={date}
  onValueChange={setDate}
/>`,preview:e.jsx(wt,{label:"Appointment",disablePast:!0,dateFormat:"us"})},{id:"date-picker-range",title:"Date range",description:"Select a start and end date with range highlighting.",code:`<DatePicker
  label="Travel dates"
  mode="range"
  disablePast
  rangeValue={range}
  onRangeValueChange={setRange}
/>`,preview:e.jsx(wt,{label:"Travel dates",mode:"range",disablePast:!0})},{id:"date-picker-datetime",title:"Date and time",description:"Datetime precision with typed input and time fields.",code:`<DatePicker
  label="Meeting"
  precision="datetime"
  dateFormat="iso"
  defaultValue={new Date()}
/>`,preview:e.jsx(wt,{label:"Meeting",precision:"datetime",dateFormat:"iso",defaultValue:new Date(2026,7,11,14,30)})}],tooltip:[{id:"tooltip-basic",title:"Default tooltip",description:"Shows help text on hover and keyboard focus.",code:`<Tooltip>
  <Tooltip.Trigger>
    <Button variant="outline">Hover me</Button>
  </Tooltip.Trigger>
  <Tooltip.Content>Install with pnpm add asriui</Tooltip.Content>
</Tooltip>`,preview:e.jsxs(Ge,{children:[e.jsx(Ge.Trigger,{children:e.jsx(z,{variant:"outline",children:"Hover me"})}),e.jsx(Ge.Content,{children:"Install with pnpm add asriui"})]})},{id:"tooltip-placement",title:"Placement",description:"Position the tooltip on any side of the trigger.",code:`<Tooltip>
  <Tooltip.Trigger>
    <Button size="sm" variant="ghost">Right</Button>
  </Tooltip.Trigger>
  <Tooltip.Content placement="right">Opens to the right</Tooltip.Content>
</Tooltip>`,preview:e.jsx("div",{style:{display:"flex",gap:"1rem",padding:"2rem"},children:["top","bottom","left","right"].map(t=>e.jsxs(Ge,{children:[e.jsx(Ge.Trigger,{children:e.jsx(z,{size:"sm",variant:"ghost",children:t})}),e.jsxs(Ge.Content,{placement:t,children:["Tooltip on ",t]})]},t))})}],input:[{id:"input-default",title:"Default",description:"Label, placeholder, and helper text with automatic ARIA wiring.",code:`<Input
  label="Email"
  placeholder="you@company.com"
  helperText="We'll never share your email."
  required
/>`,preview:e.jsx(Te,{label:"Email",placeholder:"you@company.com",helperText:"We'll never share your email.",required:!0})},{id:"input-error",title:"Validation error",description:"Error message replaces helper text and sets aria-invalid.",code:`<Input
  label="Email"
  error="Enter a valid email address"
  defaultValue="not-an-email"
/>`,preview:e.jsx(Te,{label:"Email",error:"Enter a valid email address",defaultValue:"not-an-email"})},{id:"input-affixes",title:"Prefix & suffix",description:"Inline affixes for currency, units, or icons.",code:'<Input label="Amount" prefix="$" suffix="USD" placeholder="0.00" />',preview:e.jsx(Te,{label:"Amount",prefix:"$",suffix:"USD",placeholder:"0.00"})}],card:[{id:"card-basic",title:"Basic card",description:"Compound layout with header, content, and footer slots.",code:`<Card>
  <Card.Header><Card.Title>Account</Card.Title></Card.Header>
  <Card.Content>Manage workspace settings.</Card.Content>
  <Card.Footer>
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </Card.Footer>
</Card>`,preview:e.jsxs(ee,{children:[e.jsx(ee.Header,{children:e.jsx(ee.Title,{children:"Account"})}),e.jsx(ee.Content,{children:"Manage workspace settings."}),e.jsxs(ee.Footer,{children:[e.jsx(z,{variant:"outline",children:"Cancel"}),e.jsx(z,{children:"Save"})]})]})},{id:"card-billing",title:"Billing summary",description:"Cards work well for settings panels and billing overviews.",code:`<Card>
  <Card.Header><Card.Title>Plan</Card.Title></Card.Header>
  <Card.Content>Pro — $29/mo</Card.Content>
</Card>`,preview:e.jsxs(ee,{children:[e.jsx(ee.Header,{children:e.jsx(ee.Title,{children:"Plan"})}),e.jsx(ee.Content,{children:"Pro — $29/mo · Renews Apr 1"})]})}],widget:[{id:"widget-iframe",title:"Partner iframe",description:"Sandboxed webview for hosted partner pages and widgets.",code:`<Widget
  src="https://partner.example/widget"
  title="Partner widget"
  height={280}
/>`,preview:e.jsx("div",{style:{width:420},children:e.jsx(zt,{html:'<!doctype html><html><body style="margin:0;font-family:system-ui,sans-serif;padding:16px;"><strong>Partner widget</strong><p style="margin:8px 0 0;color:#64748b;font-size:13px;">Loaded in an isolated iframe — no page wiring required.</p></body></html>',title:"Partner widget",height:120})})},{id:"widget-script",title:"Ad / script slot",description:"Drop in a vendor script with slot id and data attributes.",code:`<Widget
  mode="script"
  scriptSrc="https://cdn.vendor.com/ads.js"
  slotId="ad-slot-1"
  attrs={{ "data-ad-client": "ca-pub-xxx" }}
  height={90}
/>`,preview:e.jsx("div",{style:{width:420},children:e.jsx(zt,{mode:"script",html:'<!doctype html><html><body style="margin:0;font-family:system-ui,sans-serif;padding:16px;background:#f8fafc;"><div style="border:1px dashed #cbd5e1;border-radius:8px;padding:12px;font-size:13px;color:#475569;">Script mount point with <code>slotId</code> and <code>data-*</code> attrs for ad networks.</div></body></html>',title:"Ad slot preview",height:90})})}],metric:[{id:"metric-quote",title:"Live quote",description:"Hero price tile with symbol, change, and session range.",code:`<Metric variant="quote" trend="up" live>
  <Metric.Symbol>BTC/USD</Metric.Symbol>
  <Metric.Value value={68420.5} format="currency" />
  <Metric.Change value={3.54} />
  <Metric.Hint>24h high $69,120 · low $66,480</Metric.Hint>
</Metric>`,preview:e.jsx("div",{style:{width:300},children:e.jsxs(X,{variant:"quote",trend:"up",live:!0,children:[e.jsx(X.Symbol,{children:"BTC/USD"}),e.jsx(X.Value,{value:68420.5,format:"currency"}),e.jsx(X.Change,{value:3.54}),e.jsx(X.Hint,{children:"24h high $69,120 · low $66,480"})]})})},{id:"metric-market-grid",title:"Market summary",description:"Volume, high, and low tiles for trading dashboards.",code:`<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
  <Metric trend="up">
    <Metric.Label>24h Volume</Metric.Label>
    <Metric.Value value={28400000000} format="compact" />
    <Metric.Change value={12.4} />
  </Metric>
  <Metric trend="up">
    <Metric.Label>24h High</Metric.Label>
    <Metric.Value value={69120} format="currency" />
  </Metric>
  <Metric trend="down">
    <Metric.Label>24h Low</Metric.Label>
    <Metric.Value value={66480} format="currency" />
  </Metric>
</div>`,preview:e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, minmax(140px, 1fr))",gap:12,width:460},children:[e.jsxs(X,{trend:"up",children:[e.jsx(X.Label,{children:"24h Volume"}),e.jsx(X.Value,{value:284e8,format:"compact"}),e.jsx(X.Change,{value:12.4})]}),e.jsxs(X,{trend:"up",children:[e.jsx(X.Label,{children:"24h High"}),e.jsx(X.Value,{value:69120,format:"currency"})]}),e.jsxs(X,{trend:"down",children:[e.jsx(X.Label,{children:"24h Low"}),e.jsx(X.Value,{value:66480,format:"currency"})]})]})},{id:"metric-compact",title:"Ticker row",description:"Compact pair row for watchlists and portfolio headers.",code:`<Metric variant="compact" trend="down">
  <Metric.Label>ETH/USD</Metric.Label>
  <div>
    <Metric.Value value={3421.18} format="currency" />
    <Metric.Change value={-1.82} />
  </div>
</Metric>`,preview:e.jsx("div",{style:{width:360},children:e.jsxs(X,{variant:"compact",trend:"down",children:[e.jsx(X.Label,{children:"ETH/USD"}),e.jsxs("div",{children:[e.jsx(X.Value,{value:3421.18,format:"currency"}),e.jsx(X.Change,{value:-1.82})]})]})})}],separator:[{id:"separator-basic",title:"Section divider",code:"<Separator />",preview:e.jsxs("div",{style:{width:280},children:[e.jsx("p",{style:{margin:0},children:"Section A"}),e.jsx(qr,{}),e.jsx("p",{style:{margin:0},children:"Section B"})]})}],callout:[{id:"callout-warning",title:"Warning callout",code:'<Callout variant="warning" title="Heads up">Market data may be delayed.</Callout>',preview:e.jsx("div",{style:{width:360},children:e.jsx(xt,{variant:"warning",title:"Heads up",children:"Market data may be delayed."})})}],quote:[{id:"quote-basic",title:"Pull quote",code:'<Quote footer="— Ada Lovelace">That brain of mine is something more than merely mortal.</Quote>',preview:e.jsx("div",{style:{width:360},children:e.jsx(Hr,{footer:"— Ada Lovelace",children:"That brain of mine is something more than merely mortal."})})}],"text-to-speech":[{id:"text-to-speech-basic",title:"Speak wrapped text",description:"Click the speaker icon to read the content aloud.",code:`<TextToSpeech lang="en-US">
  AsriUI ships accessible components with motion, theming, and builder-ready workflows.
</TextToSpeech>`,preview:e.jsx("div",{style:{maxWidth:420},children:e.jsx($r,{lang:"en-US",children:"AsriUI ships accessible components with motion, theming, and builder-ready workflows."})})}],checkbox:[{id:"checkbox-basic",title:"Labeled checkbox",code:'<Checkbox label="Email alerts" description="Daily summary at 9am" defaultChecked />',preview:e.jsx(Gi,{label:"Email alerts",description:"Daily summary at 9am",defaultChecked:!0})}],radio:[{id:"radio-group",title:"Radio group",code:`<Radio.Group defaultValue="pro">
  <Radio value="starter" label="Starter" />
  <Radio value="pro" label="Pro" />
</Radio.Group>`,preview:e.jsxs(Vi,{defaultValue:"pro",children:[e.jsx(lr,{value:"starter",label:"Starter"}),e.jsx(lr,{value:"pro",label:"Pro"})]})}],"checkbox-card":[{id:"checkbox-card-basic",title:"Feature card",code:'<CheckboxCard title="Priority support" description="24/7 chat" defaultChecked />',preview:e.jsx("div",{style:{width:280},children:e.jsx(Or,{title:"Priority support",description:"24/7 chat",defaultChecked:!0})})}],"radio-card":[{id:"radio-card-group",title:"Shipping options",code:`<RadioCard.Group defaultValue="standard">
  <RadioCard value="standard" title="Standard" description="5–7 days" />
  <RadioCard value="express" title="Express" description="2 days" />
</RadioCard.Group>`,preview:e.jsx("div",{style:{width:320,display:"grid",gap:8},children:e.jsxs(bs,{defaultValue:"standard",children:[e.jsx(fr,{value:"standard",title:"Standard",description:"5–7 days"}),e.jsx(fr,{value:"express",title:"Express",description:"2 days"})]})})}],reset:[{id:"reset-basic",title:"Reset preview state",code:`<Reset.Root defaults={{ size: "md" }}>
  {({ values, setValue }) => (
    <>
      <Button size={values.size}>Preview</Button>
      <Reset.Trigger />
    </>
  )}
</Reset.Root>`,preview:e.jsx(vr.Root,{defaults:{size:"md"},children:({values:t,setValue:r})=>e.jsxs("div",{style:{display:"grid",gap:8},children:[e.jsx(z,{size:t.size,children:"Preview button"}),e.jsx(z,{variant:"outline",size:"sm",onClick:()=>r("size","lg"),children:"Make large"}),e.jsx(vr.Trigger,{})]})})}],visible:[{id:"visible-basic",title:"Toggle visibility",code:"<Visible when={open}>Panel content</Visible>",preview:e.jsxs("div",{style:{width:280,display:"grid",gap:8},children:[e.jsx(Gt,{when:!0,children:e.jsxs(xt,{variant:"info",title:"Visible",children:["This block is shown with ",e.jsx("code",{children:"when=true"}),"."]})}),e.jsx(Qr,{when:!0,children:e.jsxs(xt,{variant:"danger",title:"Hidden",children:["Hidden when ",e.jsx("code",{children:"when=true"}),"."]})})]})}],"list-item":[{id:"list-item-basic",title:"Settings list",description:"Interactive rows with media, description, and trailing content.",code:`<List aria-label="Settings">
  <ListItem title="General" description="Timezone" media="G" trailing="›" interactive selected />
  <ListItem title="Members" description="12 users" media="M" trailing="12" interactive />
</List>`,preview:e.jsxs(Wi,{"aria-label":"Settings",children:[e.jsx(or,{title:"General",description:"Timezone, language",media:"G",trailing:"›",interactive:!0,selected:!0}),e.jsx(or,{title:"Members",description:"Invite and manage",media:"M",trailing:"12",interactive:!0})]})}],badge:[{id:"badge-variants",title:"Variants",code:`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Failed</Badge>`,preview:Ee(e.jsxs(e.Fragment,{children:[e.jsx(Ve,{children:"Default"}),e.jsx(Ve,{variant:"secondary",children:"Secondary"}),e.jsx(Ve,{variant:"outline",children:"Outline"}),e.jsx(Ve,{variant:"destructive",children:"Failed"})]}))}],label:[{id:"label-basic",title:"With input",code:`<Label htmlFor="name" required>Name</Label>
<Input id="name" placeholder="Jane Doe" />`,preview:e.jsxs("div",{style:{display:"grid",gap:8,maxWidth:320},children:[e.jsx(Er,{htmlFor:"name",required:!0,children:"Name"}),e.jsx(Te,{id:"name",placeholder:"Jane Doe"})]})}],switch:[{id:"switch-basic",title:"Controlled",description:"Pair with Label for accessible toggle groups.",code:`const [on, setOn] = useState(false);
<Switch id="notify" checked={on} onCheckedChange={setOn} />
<Label htmlFor="notify">Notifications</Label>`,preview:e.jsx(qc,{})}],tabs:[{id:"tabs-basic",title:"Account settings",code:`<Tabs defaultValue="account">
  <Tabs.List>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="password">Password</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">Account settings</Tabs.Content>
  <Tabs.Content value="password">Password settings</Tabs.Content>
</Tabs>`,preview:e.jsxs(Q,{defaultValue:"account",style:{width:"100%",maxWidth:400},children:[e.jsxs(Q.List,{children:[e.jsx(Q.Trigger,{value:"account",children:"Account"}),e.jsx(Q.Trigger,{value:"password",children:"Password"})]}),e.jsx(Q.Content,{value:"account",children:"Make changes to your account."}),e.jsx(Q.Content,{value:"password",children:"Change your password."})]})},{id:"tabs-underline",title:"Underline variant",description:"Bottom-line active indicator with animated tab panel transitions.",code:`<Tabs defaultValue="account" variant="underline">
  <Tabs.List>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="password">Password</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">Account settings</Tabs.Content>
  <Tabs.Content value="password">Password settings</Tabs.Content>
</Tabs>`,preview:e.jsxs(Q,{defaultValue:"account",variant:"underline",style:{width:"100%",maxWidth:400},children:[e.jsxs(Q.List,{children:[e.jsx(Q.Trigger,{value:"account",children:"Account"}),e.jsx(Q.Trigger,{value:"password",children:"Password"}),e.jsx(Q.Trigger,{value:"billing",children:"Billing"})]}),e.jsx(Q.Content,{value:"account",children:"Make changes to your account."}),e.jsx(Q.Content,{value:"password",children:"Change your password."}),e.jsx(Q.Content,{value:"billing",children:"Update billing details."})]})},{id:"tabs-pills",title:"Pills variant",description:"Individual pill triggers without a segmented container.",code:'<Tabs defaultValue="account" variant="pills">...</Tabs>',preview:e.jsxs(Q,{defaultValue:"account",variant:"pills",style:{width:"100%",maxWidth:400},children:[e.jsxs(Q.List,{children:[e.jsx(Q.Trigger,{value:"account",children:"Account"}),e.jsx(Q.Trigger,{value:"password",children:"Password"})]}),e.jsx(Q.Content,{value:"account",children:"Account panel"}),e.jsx(Q.Content,{value:"password",children:"Password panel"})]})}],accordion:[{id:"accordion-single",title:"Single collapsible",description:"One open section at a time with optional leading icons and end meta.",code:`<Accordion type="single" collapsible defaultValue="faq-1">
  <Accordion.Item value="faq-1">
    <Accordion.Trigger icon={<Icon name="sparkles" size="sm" />}>
      What is AsriUI?
    </Accordion.Trigger>
    <Accordion.Content>
      A design system and React component library for product teams.
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`,preview:e.jsxs(ae,{type:"single",collapsible:!0,defaultValue:"faq-1",style:{width:"100%",maxWidth:420},children:[e.jsxs(ae.Item,{value:"faq-1",children:[e.jsx(ae.Trigger,{icon:e.jsx(Z,{name:"sparkles",size:"sm","aria-hidden":!0}),children:"What is AsriUI?"}),e.jsx(ae.Content,{children:"A design system and React component library for product teams."})]}),e.jsxs(ae.Item,{value:"faq-2",children:[e.jsx(ae.Trigger,{endContent:"3 steps",children:"How do I get started?"}),e.jsx(ae.Content,{children:"Install the package, add AsriUIProvider, and import components."})]})]})},{id:"accordion-bordered",title:"Bordered multiple",description:"Keep multiple sections open with bordered styling.",code:`<Accordion type="multiple" variant="bordered" defaultValue={["billing"]}>
  <Accordion.Item value="account">
    <Accordion.Trigger>Account</Accordion.Trigger>
    <Accordion.Content>Profile settings</Accordion.Content>
  </Accordion.Item>
</Accordion>`,preview:e.jsxs(ae,{type:"multiple",variant:"bordered",defaultValue:["billing"],style:{width:"100%",maxWidth:420},children:[e.jsxs(ae.Item,{value:"account",children:[e.jsx(ae.Trigger,{startContent:e.jsx(Z,{name:"check",size:"sm","aria-hidden":!0}),children:"Account"}),e.jsx(ae.Content,{children:"Manage profile details and security settings."})]}),e.jsxs(ae.Item,{value:"billing",children:[e.jsx(ae.Trigger,{endContent:e.jsx(Ve,{variant:"secondary",children:"Pro"}),children:"Billing"}),e.jsx(ae.Content,{children:"Update payment method and download invoices."})]})]})}],dialog:[{id:"dialog-confirm",title:"Confirmation",description:"Shorthand title and description on Content with portal and focus trap.",code:`<Dialog>
  <Dialog.Trigger>Delete</Dialog.Trigger>
  <Dialog.Content
    title="Are you sure?"
    description="This cannot be undone."
  >
    <Dialog.Footer>
      <Dialog.Close>Cancel</Dialog.Close>
      <Button variant="danger">Delete</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>`,preview:e.jsx(Hc,{})}],"scroll-area":[{id:"scroll-area-container",title:"Container scroll",description:"Fixed-height region with a custom vertical scrollbar.",code:`<ScrollArea height={220} type="always" label="Updates">
  {items.map((item) => (
    <p key={item}>{item}</p>
  ))}
</ScrollArea>`,preview:e.jsx(vt,{height:220,type:"always",label:"Updates",style:{width:"100%",maxWidth:360},children:Array.from({length:12},(t,r)=>e.jsxs("p",{style:{margin:"0 0 0.75rem"},children:["Update ",r+1,": deployment completed successfully."]},r))})},{id:"scroll-area-page",title:"Page scroll",description:"Wrap your app shell to style document scrolling.",code:`<ScrollArea page type="hover">
  <App />
</ScrollArea>`,preview:e.jsx(vt,{height:220,type:"always",label:"Page preview",style:{width:"100%",maxWidth:360},children:Array.from({length:16},(t,r)=>e.jsxs("p",{style:{margin:"0 0 0.75rem"},children:["Page section ",r+1]},r))})},{id:"scroll-area-intersection",title:"Intersection observer",description:"Place ScrollArea.Sentinel at the end of a list to load more when it enters the viewport. Uses the scroll container as root automatically.",code:`<ScrollArea height={220} type="always" label="Feed">
  {items.map((item) => (
    <p key={item}>{item}</p>
  ))}
  <ScrollArea.Sentinel
    rootMargin="120px"
    onIntersect={() => loadMore()}
  />
</ScrollArea>`,preview:e.jsxs(vt,{height:220,type:"always",label:"Feed",style:{width:"100%",maxWidth:360},children:[Array.from({length:8},(t,r)=>e.jsxs("p",{style:{margin:"0 0 0.75rem"},children:["Post ",r+1]},r)),e.jsx(vt.Sentinel,{rootMargin:"40px"})]})}],skeleton:[{id:"skeleton-variants",title:"Variants",description:"Text, circular, rounded, and rectangular shapes.",code:`<Skeleton variant="text" width="80%" />
<Skeleton variant="circular" width={48} height={48} />
<Skeleton variant="rounded" height={100} />`,preview:e.jsxs("div",{style:{display:"grid",gap:12,width:"100%",maxWidth:320},children:[e.jsx(fe,{variant:"text",width:"80%"}),e.jsx(fe,{variant:"text",width:"55%"}),e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[e.jsx(fe,{variant:"circular",width:48,height:48}),e.jsxs("div",{style:{flex:1,display:"grid",gap:8},children:[e.jsx(fe,{variant:"text",width:"70%"}),e.jsx(fe,{variant:"text",width:"45%"})]})]}),e.jsx(fe,{variant:"rounded",height:80})]})},{id:"skeleton-presets",title:"Presets",description:"Ready-made profile and card loading layouts.",code:`<Skeleton.Profile />
<Skeleton.Card />`,preview:e.jsxs("div",{style:{display:"grid",gap:20,width:"100%",maxWidth:360},children:[e.jsx(fe.Profile,{}),e.jsx(fe.Card,{})]})},{id:"skeleton-list",title:"List loading",description:"Compose skeletons while async data loads.",code:`{[1, 2, 3].map((i) => (
  <Skeleton.Profile key={i} />
))}`,preview:e.jsxs("div",{style:{display:"grid",gap:16,width:"100%"},children:[e.jsx(fe.Profile,{}),e.jsx(fe.Profile,{}),e.jsx(fe.Profile,{})]})}],"virtual-list":[{id:"virtual-list-basic",title:"Transaction feed",code:`<VirtualList
  items={rows}
  itemHeight={44}
  height={220}
  renderItem={(row) => row}
/>`,preview:e.jsx(Xi,{items:Array.from({length:200},(t,r)=>`Transaction #${r+1}`),itemHeight:40,height:220,renderItem:t=>t})}],table:[{id:"table-bordered",title:"Bordered inventory",code:`<Table variant="bordered" scrollable>
  <Table.Header>
    <Table.Row>
      <Table.Head>Component</Table.Head>
      <Table.Head>Status</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Button</Table.Cell>
      <Table.Cell>Stable</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`,preview:e.jsxs(ge,{variant:"bordered",scrollable:!0,children:[e.jsx(ge.Header,{children:e.jsxs(ge.Row,{children:[e.jsx(ge.Head,{children:"Component"}),e.jsx(ge.Head,{children:"Status"})]})}),e.jsxs(ge.Body,{children:[e.jsxs(ge.Row,{children:[e.jsx(ge.Cell,{children:"Button"}),e.jsx(ge.Cell,{children:"Stable"})]}),e.jsxs(ge.Row,{children:[e.jsx(ge.Cell,{children:"DataGrid"}),e.jsx(ge.Cell,{children:"Beta"})]})]})]})}],"data-grid":[{id:"data-grid-native",title:"Native sortable grid",description:"Client-side sorting with the built-in table engine — no extra dependencies.",code:`<DataGrid
  columns={[
    { id: "name", header: "Name", accessor: "name", sortable: true },
    { id: "status", header: "Status", accessor: "status" },
  ]}
  rows={rows}
  getRowId={(row) => row.id}
  height={240}
/>`,preview:e.jsx(at,{columns:[{id:"name",header:"Component",accessor:"name",sortable:!0},{id:"status",header:"Status",accessor:"status",sortable:!0}],rows:[{id:"button",name:"Button",status:"Stable"},{id:"dialog",name:"Dialog",status:"Stable"},{id:"data-grid",name:"DataGrid",status:"Beta"}],getRowId:t=>t.id,height:220,defaultSort:{columnId:"name",direction:"asc"}})},{id:"data-grid-export",title:"Excel export",description:"Export grid data to CSV or Microsoft Excel (.xlsx). Excel requires peer dependency xlsx.",code:`<DataGrid
  columns={columns}
  rows={rows}
  exportable={{ csv: true, excel: true, filename: "report" }}
/>`,preview:e.jsx(at,{columns:[{id:"name",header:"Product",accessor:"name",sortable:!0},{id:"qty",header:"Qty",accessor:"qty"}],rows:[{id:"1",name:"License",qty:12},{id:"2",name:"Support",qty:4}],getRowId:t=>t.id,height:220,exportable:{csv:!0,excel:!0,filename:"inventory"}})},{id:"data-grid-editable",title:"Editable grid with validation",description:"Inline editing with required, pattern, unique, min/max rules, expandable row details, pagination, VirtualList for large datasets, and CSV/Excel export.",code:Cc,preview:e.jsx(kc,{})},{id:"data-grid-filter-pagination",title:"Column filters and pagination",description:"Filter each column independently. Matching rows are paginated.",code:`<DataGrid
  columns={[
    { id: "name", header: "Product", accessor: "name", filterable: true },
    {
      id: "status",
      header: "Status",
      accessor: "status",
      filterable: {
        type: "select",
        options: [
          { label: "Active", value: "Active" },
          { label: "Trial", value: "Trial" },
        ],
      },
    },
  ]}
  rows={rows}
  filter={{ global: false, columnFilters: true }}
  pagination={{ pageSize: 5 }}
/>`,preview:e.jsx(Pc,{})},{id:"data-grid-server",title:"Server-side filter, sort, and pagination",description:'Enable `serverSide` and `pagination.mode="server"` — parent fetches each page.',code:Ac,preview:e.jsx(Nc,{})}],toast:[{id:"toast-showcase",title:"Config-driven page",description:"Pass a configuration array to ToastShowcase — it wraps ToastProvider and renders trigger buttons for each toast.",code:wc,preview:e.jsx(jc,{})},{id:"toast-variants",title:"Variants",description:"Each variant has its own accent color, tinted background, and icon. Override globally with ToastProvider variants or per toast with accentColor, backgroundColor, and icon.",code:`// Global variant theme
<ToastProvider
  variants={{
    success: { accent: "#10b981", background: "#ecfdf5" },
    error: { accent: "#ef4444" },
  }}
>
  <App />
</ToastProvider>

// Per-toast override
toast({
  variant: "info",
  title: "Custom",
  accentColor: "#7c3aed",
  icon: <MyIcon />,
});`,preview:e.jsx(st,{position:"bottom-right",showProgress:!0,children:e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:[e.jsx(z,{variant:"outline",onClick:()=>xe.success("Saved",{description:"Your profile was updated."}),children:"Success"}),e.jsx(z,{variant:"outline",onClick:()=>xe.error("Upload failed",{description:"Try again in a minute."}),children:"Error"}),e.jsx(z,{variant:"outline",onClick:()=>xe.warning("Storage almost full"),children:"Warning"}),e.jsx(z,{variant:"outline",onClick:()=>xe.info("New version available"),children:"Info"})]})})},{id:"toast-action",title:"Action button",description:"Add a single action such as Undo or Get support. The toast dismisses after the action by default.",code:`toast({
  variant: "error",
  title: "Sync failed",
  description: "We could not reach the server.",
  action: {
    label: "Get support",
    onClick: () => openSupportChat(),
  },
});`,preview:e.jsx(st,{position:"bottom-right",showProgress:!0,children:e.jsx(z,{variant:"outline",onClick:()=>xe({variant:"error",title:"Sync failed",description:"We could not reach the server.",action:{label:"Get support",onClick:()=>{}}}),children:"Show with action"})})},{id:"toast-progress",title:"Progress bar",description:"Enable or disable the bottom auto-dismiss progress bar on the provider or per toast.",code:`<ToastProvider showProgress={false}>
  <App />
</ToastProvider>

toast.info("Heads up", { showProgress: true });`,preview:e.jsx(st,{position:"bottom-right",showProgress:!1,children:e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:[e.jsx(z,{variant:"outline",onClick:()=>xe.info("No progress bar",{description:"Provider has showProgress={false}."}),children:"Without bar"}),e.jsx(z,{variant:"outline",onClick:()=>xe.success("With bar",{description:"Per-toast showProgress overrides the provider.",showProgress:!0}),children:"Override on"})]})})}],auth:[{id:"auth-login",title:"Login with OAuth",description:"Microsoft, Google, GitHub, and Apple buttons plus email form.",code:`<LoginForm
  onSubmit={signInWithEmail}
  onOAuth={(provider) => signInWithProvider(provider)}
/>`,preview:e.jsx(on,{providers:["microsoft","google"],onSubmit:()=>{},onOAuth:()=>{}})}],calendar:[{id:"calendar-booking",title:"Multi-slot booking",description:"Pick a day, then select multiple time slots. Supports booked slots and per-day overrides.",code:`import { useState } from "react";
import { Calendar, type CalendarSlotSelection } from "asriui/calendar";

export function BookingCalendar() {
  const [selection, setSelection] = useState<CalendarSlotSelection[]>([]);

  return (
    <Calendar
      value={selection}
      onValueChange={setSelection}
      booked={[{ date: "2026-08-12", slotId: "09:00" }]}
      maxSelections={5}
      defaultMonth={new Date(2026, 7, 1)}
      daySlots={{
        "2026-08-15": [
          { id: "10:00", label: "10:00 AM", start: "10:00", end: "11:00" },
          { id: "14:00", label: "02:00 PM", start: "14:00", end: "15:00" },
        ],
      }}
    />
  );
}`,preview:e.jsx(Ci,{defaultMonth:new Date(2026,7,1),defaultActiveDate:"2026-08-11",booked:[{date:"2026-08-12",slotId:"09:00"}],maxSelections:5})}],"server-query":[{id:"server-query-database",title:"Config-level database queries",description:"Set database once on AsriUIProvider — then use named keys, sql: strings, or { sql, params } in ServerQuery.",code:`<AsriUIProvider
  config={{
    database: {
      baseUrl: "https://api.example.com",
      queryEndpoint: "/query",
      headers: { Authorization: "Bearer …" },
      queries: {
        users: "SELECT id, name FROM users LIMIT 50",
        stats: { path: "/dashboard/stats", method: "GET" },
      },
    },
  }}
>
  <ServerQuery query="users">{(rows) => <DataGrid data={rows} />}</ServerQuery>
  <ServerQuery query={{ sql: "SELECT * FROM orders WHERE status = :status", params: { status: "open" } }}>
    {(orders) => <OrdersList items={orders} />}
  </ServerQuery>
</AsriUIProvider>`,preview:e.jsx(yt,{query:async()=>({count:128}),queryKey:"demo-db",children:t=>e.jsxs("p",{style:{margin:0},children:["Named query ready — example count: ",e.jsx("strong",{children:t.count}),". Configure ",e.jsx("code",{children:"database"})," on AsriUIProvider, then use ",e.jsx("code",{children:'query="users"'})," or ",e.jsx("code",{children:"sql:SELECT …"}),"."]})})},{id:"server-query-user",title:"Fetch and render",description:"Pass a URL or async function — ServerQuery handles loading, errors, and retry.",code:`import { ServerQuery } from "asriui/server-query";
import { Card, Badge } from "asriui";

<ServerQuery query="https://api.example.com/users/1" queryKey="profile">
  {(user, { refetch }) => (
    <Card>
      <Card.Header>
        <Card.Title>{user.name}</Card.Title>
      </Card.Header>
      <Card.Content>
        <p>{user.email}</p>
        <Badge variant="secondary">{user.company.name}</Badge>
        <button type="button" onClick={refetch}>Refresh</button>
      </Card.Content>
    </Card>
  )}
</ServerQuery>`,preview:e.jsx(yt,{query:"https://jsonplaceholder.typicode.com/users/1",queryKey:"docs-user",children:t=>e.jsxs(ee,{style:{maxWidth:360},children:[e.jsx(ee.Header,{children:e.jsx(ee.Title,{children:t.name})}),e.jsxs(ee.Content,{children:[e.jsx("p",{style:{margin:"0 0 0.5rem"},children:t.email}),e.jsx(Ve,{variant:"secondary",children:t.company.name})]})]})})},{id:"server-query-status",title:"Custom states",description:"Use renderStatus for full control over loading, error, and success UI.",code:`<ServerQuery
  query={fetchStats}
  renderStatus={({ data, isLoading, error, refetch }) => {
    if (isLoading) return <Loader showLabel label="Loading stats" />;
    if (error) return <button onClick={refetch}>Retry</button>;
    return <Stats data={data} />;
  }}
>
  {() => null}
</ServerQuery>`,preview:e.jsx(yt,{query:async()=>(await new Promise(t=>setTimeout(t,600)),{users:3842,revenue:"$48.2k"}),queryKey:"demo-stats",renderStatus:({data:t,isLoading:r,error:i,refetch:n})=>r?e.jsx(Ae,{variant:"dots",showLabel:!0,label:"Loading stats"}):i?e.jsx(z,{size:"sm",variant:"outline",onClick:n,children:"Retry"}):e.jsxs("div",{style:{display:"flex",gap:"1rem"},children:[e.jsx(ee,{children:e.jsxs(ee.Content,{children:[e.jsx("strong",{children:t==null?void 0:t.users}),e.jsx("p",{style:{margin:0,fontSize:"0.8rem",color:"var(--asriui-color-muted-foreground)"},children:"Active users"})]})}),e.jsx(ee,{children:e.jsxs(ee.Content,{children:[e.jsx("strong",{children:t==null?void 0:t.revenue}),e.jsx("p",{style:{margin:0,fontSize:"0.8rem",color:"var(--asriui-color-muted-foreground)"},children:"Revenue"})]})})]})})}],form:[{id:"form-json",title:"JSON configuration",description:"Define fields declaratively — supports required, regex, min/max length, cross-field match, unique values, and custom rules.",code:`const config = {
  fields: [
    {
      name: "username",
      type: "text",
      label: "Username",
      rules: [
        { type: "required" },
        { type: "pattern", value: "^[a-z0-9_]+$", message: "Use lowercase letters, numbers, or underscores" },
        { type: "notOneOf", values: ["admin", "root"], message: "That username is reserved" },
      ],
    },
    { name: "password", type: "password", label: "Password", required: true, minLength: 8 },
    { name: "confirm", type: "password", label: "Confirm password", matches: "password" },
  ],
};
<Form config={config} onSubmit={save} />`,preview:e.jsx(Dt,{config:{fields:[{name:"username",type:"text",label:"Username",rules:[{type:"required"},{type:"pattern",value:"^[a-z0-9_]+$",message:"Use lowercase letters, numbers, or underscores"}]},{name:"password",type:"password",label:"Password",required:!0,minLength:8},{name:"confirm",type:"password",label:"Confirm password",matches:"password"}]},onSubmit:()=>{}})},{id:"form-validation-rules",title:"Validation rules",description:"Regex, allowed values, numeric bounds, and unique field checks via JSON rules.",code:`{ name: "slug", type: "text", label: "Slug",
  pattern: "^[a-z0-9-]+$",
  patternMessage: "Use lowercase letters, numbers, and hyphens",
  uniqueAmong: ["name"] }`,preview:e.jsx(Dt,{config:{fields:[{name:"name",type:"text",label:"Name",required:!0},{name:"slug",type:"text",label:"Slug",pattern:"^[a-z0-9-]+$",patternMessage:"Use lowercase letters, numbers, and hyphens",uniqueAmong:["name"]}]},onSubmit:()=>{}})},{id:"form-advanced",title:"useForm, conditional fields, image upload",description:"Conditional `showWhen`, API-driven `optionsFrom`, image drag-and-drop, and headless `useForm` submit.",code:Rc,preview:e.jsx(Ic,{})}],page:[{id:"page-contact-json",title:"Contact page from JSON",description:"Pass a PageConfig — layout, header, and form blocks render automatically.",code:`import { Page } from "asriui/page";

const config = {
  layout: { variant: "centered", contentMaxWidth: "36rem" },
  header: {
    badge: "Support",
    title: "Contact us",
    description: "We reply within one business day.",
  },
  blocks: [
    {
      id: "contact-form",
      type: "form",
      config: {
        submitLabel: "Send message",
        fields: [
          { name: "name", type: "text", label: "Full name", required: true },
          { name: "email", type: "email", label: "Work email", required: true },
        ],
      },
    },
  ],
};

<Page config={config} onFormSubmit={(id, values) => console.log(id, values)} />`,preview:e.jsx("div",{style:{width:"100%",maxWidth:420},children:e.jsx(ar,{config:Bi,onFormSubmit:async()=>{xe.success("Message sent")}})})},{id:"page-dashboard-json",title:"Dashboard from JSON",description:"Sidebar shell with stats, table, and timeline — still one config object.",code:"<Page config={dashboardConfig} onAction={(event) => console.log(event)} />",preview:e.jsx("div",{style:{width:"100%",maxHeight:420,overflow:"auto",border:"1px solid var(--lp-border)"},children:e.jsx(ar,{config:$i,onAction:t=>{xe.info(`${t.type}: ${t.id}`)}})})}],"card-validation":[{id:"card-validation-basic",title:"Checkout card fields",description:"Formats the number, detects brand, and validates Luhn + expiry + CVC.",code:`import { CardValidation } from "asriui/card-validation";

<CardValidation
  helperText="Try 4242 4242 4242 4242 — Visa test card."
  onChange={(values) => console.log(values)}
/>`,preview:e.jsx("div",{style:{width:"100%",maxWidth:420},children:e.jsx(wr,{helperText:"Try 4242 4242 4242 4242 — Visa test card."})})},{id:"card-validation-amex",title:"Amex (15-digit + CID)",description:"Amex uses 4-6-5 formatting and a 4-digit CID.",code:`<CardValidation
  defaultValues={{ number: "378282246310005" }}
  showName={false}
/>`,preview:e.jsx("div",{style:{width:"100%",maxWidth:420},children:e.jsx(wr,{defaultValues:{number:"378282246310005"},showName:!1})})}],"error-boundary":[{id:"error-boundary-info",title:"Usage",description:"Wrap any subtree to catch render errors and show fallback UI.",code:`<ErrorBoundary monitoringUrl="/api/errors">
  <App />
</ErrorBoundary>`,preview:e.jsxs("p",{style:{margin:0,fontSize:14,color:"var(--lp-muted-fg)",lineHeight:1.6},children:["ErrorBoundary catches render errors, displays a fallback, and optionally POSTs error details to your monitoring endpoint via ",e.jsx("code",{children:"AsriUIProvider"}),"."]})}],"monaco-editor":[{id:"monaco-json",title:"JSON editor",code:`<MonacoEditor language="json" defaultValue='{"theme":"light"}' height={180} />`,preview:e.jsx(Kr,{language:"json",defaultValue:`{
  "theme": "light"
}`,height:160})}],"flow-chart":[{id:"flow-chart-basic",title:"Default graph",code:"<FlowChart height={220} showMiniMap showControls />",preview:e.jsx(Jr,{height:200})}],"code-block":[{id:"code-block-basic",title:"Syntax highlighting",description:"VS Code dark theme with colored tokens — no Monaco required.",code:`<CodeBlock
  code={\`const greeting = "Hello";\`}
  language="tsx"
  showCopy
/>`,preview:e.jsx(dr,{code:`import { Button } from "asriui/button";

export function App() {
  return <Button>Get started</Button>;
}`,showCopy:!0,filename:"App.tsx"})},{id:"code-block-lines",title:"Line numbers",code:"<CodeBlock code={source} lineNumbers showCopy />",preview:e.jsx(dr,{code:`function sum(a: number, b: number) {
  return a + b;
}`,lineNumbers:!0,showCopy:!0})}],markdown:[{id:"markdown-basic",title:"Docs & release notes",description:"Headings, lists, links, tables, and fenced CodeBlock — zero markdown deps.",code:`<Markdown
  source={\`# Hello

- Accessible
- Themeable

\\\`\\\`\\\`tsx
import { Markdown } from "asriui/markdown";
\\\`\\\`\\\`
\`}
/>`,preview:e.jsx(sr,{source:`# Hello AsriUI

Render **docs** and *changelogs* with theme tokens.

- Headings & lists
- Inline \`code\`
- [Safe links](https://example.com)

| Prop | Default |
| --- | --- |
| showCodeCopy | true |

\`\`\`tsx
import { Markdown } from "asriui/markdown";
\`\`\`
`})},{id:"markdown-children",title:"String children",code:'<Markdown>{"Install with `pnpm add asriui`."}</Markdown>',preview:e.jsx(sr,{children:"Install with `pnpm add asriui`, then wrap your app in **AsriUIProvider**."})}],"side-nav":[{id:"side-nav-basic",title:"Grouped links",description:"Left border accent on hover and active state.",code:`<SideNav>
  <SideNav.Group label="Components">
    <SideNav.List>
      <SideNav.Item>
        <SideNav.Link href="/button" active>Button</SideNav.Link>
      </SideNav.Item>
    </SideNav.List>
  </SideNav.Group>
</SideNav>`,preview:e.jsx("div",{style:{maxWidth:220,padding:12,background:"var(--asriui-color-muted)",borderRadius:8},children:e.jsx(_,{children:e.jsx(_.Group,{label:"Components",children:e.jsxs(_.List,{children:[e.jsx(_.Item,{children:e.jsx(_.Link,{href:"#",active:!0,children:"Button"})}),e.jsx(_.Item,{children:e.jsx(_.Link,{href:"#",children:"Input"})}),e.jsx(_.Item,{children:e.jsx(_.Link,{href:"#",children:"Card"})})]})})})})},{id:"side-nav-collapsible",title:"Collapsible groups",description:"Collapse sections with animated chevrons, or collapse the whole sidebar with Toggle.",code:`<SideNav collapsible>
  <SideNav.Toggle />
  <SideNav.Group label="Components" collapsible defaultOpen>
    <SideNav.List>
      <SideNav.Item>
        <SideNav.Link href="/button" active>Button</SideNav.Link>
      </SideNav.Item>
    </SideNav.List>
  </SideNav.Group>
</SideNav>`,preview:e.jsx("div",{style:{maxWidth:220,padding:12,background:"var(--asriui-color-muted)",borderRadius:8},children:e.jsxs(_,{collapsible:!0,children:[e.jsx(_.Toggle,{}),e.jsx(_.Group,{label:"Components",collapsible:!0,defaultOpen:!0,children:e.jsxs(_.List,{children:[e.jsx(_.Item,{children:e.jsx(_.Link,{href:"#",active:!0,children:"Button"})}),e.jsx(_.Item,{children:e.jsx(_.Link,{href:"#",children:"Input"})})]})}),e.jsx(_.Group,{label:"Layout",collapsible:!0,defaultOpen:!1,children:e.jsx(_.List,{children:e.jsx(_.Item,{children:e.jsx(_.Link,{href:"#",children:"Card"})})})})]})})},{id:"side-nav-hamburger",title:"Hamburger hide",description:'Animated hamburger ↔ close icon. With collapseMode="hidden", clicking hides the whole sidenav and leaves the toggle to reopen.',code:`<SideNav collapsible collapseMode="hidden">
  <SideNav.Toggle variant="hamburger" />
  <SideNav.Header>
    <strong>App</strong>
  </SideNav.Header>
  <SideNav.Group label="Pages" collapsible defaultOpen>
    <SideNav.List>
      <SideNav.Item>
        <SideNav.Link href="/dashboard" active>Dashboard</SideNav.Link>
      </SideNav.Item>
      <SideNav.Item>
        <SideNav.Link href="/settings">Settings</SideNav.Link>
      </SideNav.Item>
    </SideNav.List>
  </SideNav.Group>
</SideNav>`,preview:e.jsxs("div",{style:{display:"flex",gap:12,width:"100%",maxWidth:420,padding:12,background:"var(--asriui-color-muted)",borderRadius:8},children:[e.jsxs(_,{collapsible:!0,collapseMode:"hidden",style:{width:200},children:[e.jsx(_.Toggle,{variant:"hamburger"}),e.jsx(_.Header,{children:e.jsx("strong",{children:"App"})}),e.jsx(_.Group,{label:"Pages",collapsible:!0,defaultOpen:!0,children:e.jsxs(_.List,{children:[e.jsx(_.Item,{children:e.jsx(_.Link,{href:"#",active:!0,children:"Dashboard"})}),e.jsx(_.Item,{children:e.jsx(_.Link,{href:"#",children:"Settings"})}),e.jsx(_.Item,{children:e.jsx(_.Link,{href:"#",children:"Billing"})})]})})]}),e.jsx("div",{style:{flex:1,fontSize:13,color:"var(--asriui-color-muted-foreground)",paddingTop:4},children:"Click the hamburger to hide the sidenav. Open state shows an X."})]})},{id:"side-nav-menus",title:"Multiple menus with icons",description:"Switch between top-level menus via an icon rail. Groups and links accept custom icons.",code:`<SideNav>
  <SideNav.Menus defaultMenu="docs">
    <SideNav.Menu id="docs" label="Docs" icon={<Icon name="sparkles" size="sm" />}>
      <SideNav.Group label="Components" icon={<Icon name="grid" size="sm" />} collapsible>
        <SideNav.List>
          <SideNav.Item>
            <SideNav.Link href="/button" icon={<Icon name="check" size="sm" />} active>
              Button
            </SideNav.Link>
          </SideNav.Item>
        </SideNav.List>
      </SideNav.Group>
    </SideNav.Menu>
    <SideNav.Menu id="settings" label="Settings" icon={<Icon name="package" size="sm" />}>
      <SideNav.List>
        <SideNav.Item>
          <SideNav.Link href="/profile">Profile</SideNav.Link>
        </SideNav.Item>
      </SideNav.List>
    </SideNav.Menu>
  </SideNav.Menus>
</SideNav>`,preview:e.jsx("div",{style:{maxWidth:260,padding:12,background:"var(--asriui-color-muted)",borderRadius:8},children:e.jsx(_,{children:e.jsxs(_.Menus,{defaultMenu:"docs",children:[e.jsx(_.Menu,{id:"docs",label:"Docs",icon:e.jsx(Z,{name:"sparkles",size:"sm","aria-hidden":!0}),children:e.jsx(_.Group,{label:"Components",icon:e.jsx(Z,{name:"grid",size:"sm","aria-hidden":!0}),collapsible:!0,children:e.jsx(_.List,{children:e.jsx(_.Item,{children:e.jsx(_.Link,{href:"#",icon:e.jsx(Z,{name:"check",size:"sm","aria-hidden":!0}),active:!0,children:"Button"})})})})}),e.jsx(_.Menu,{id:"settings",label:"Settings",icon:e.jsx(Z,{name:"package",size:"sm","aria-hidden":!0}),children:e.jsx(_.List,{children:e.jsx(_.Item,{children:e.jsx(_.Link,{href:"#",children:"Profile"})})})})]})})})},{id:"side-nav-submenu",title:"Nested submenu levels",description:"Nest links under SideNav.Submenu for deeper menu hierarchies.",code:`<SideNav>
  <SideNav.List>
    <SideNav.Submenu label="Form" icon={<Icon name="form" size="sm" />} defaultOpen>
      <SideNav.Item>
        <SideNav.Link href="/button">Button</SideNav.Link>
      </SideNav.Item>
      <SideNav.Item>
        <SideNav.Link href="/input">Input</SideNav.Link>
      </SideNav.Item>
    </SideNav.Submenu>
  </SideNav.List>
</SideNav>`,preview:e.jsx("div",{style:{maxWidth:220,padding:12,background:"var(--asriui-color-muted)",borderRadius:8},children:e.jsx(_,{children:e.jsx(_.List,{children:e.jsxs(_.Submenu,{label:"Form",icon:e.jsx(Z,{name:"form",size:"sm","aria-hidden":!0}),defaultOpen:!0,children:[e.jsx(_.Item,{children:e.jsx(_.Link,{href:"#",active:!0,children:"Button"})}),e.jsx(_.Item,{children:e.jsx(_.Link,{href:"#",children:"Input"})})]})})})})},{id:"side-nav-virtual",title:"Virtualized list",description:"Enable virtualization for large navigation lists. Only visible rows are mounted.",code:`const items = routes.map((route) => ({
  id: route.id,
  label: route.label,
  href: route.href,
}));

<SideNav>
  <SideNav.Group label="Routes" collapsible defaultOpen>
    <SideNav.VirtualList
      items={items}
      itemHeight={36}
      height={280}
      getItemKey={(item) => item.id}
      renderItem={(item) => (
        <SideNav.Link href={item.href}>{item.label}</SideNav.Link>
      )}
    />
  </SideNav.Group>
</SideNav>`,preview:e.jsx("div",{style:{maxWidth:220,padding:12,background:"var(--asriui-color-muted)",borderRadius:8},children:e.jsx(_,{children:e.jsx(_.Group,{label:"Routes",collapsible:!0,defaultOpen:!0,children:e.jsx(_.VirtualList,{items:Array.from({length:120},(t,r)=>({id:`route-${r}`,label:`Route ${r+1}`,href:`#route-${r}`})),itemHeight:36,height:160,getItemKey:t=>t.id,renderItem:t=>e.jsx(_.Link,{href:t.href,children:t.label})})})})})}],"page-layout":[{id:"page-layout-sidebar",title:"Sidebar layout",description:"Two-column shell with sticky sidebar.",code:`<PageLayout variant="sidebar">
  <PageLayout.Sidebar><SideNav>...</SideNav></PageLayout.Sidebar>
  <PageLayout.Main>
    <PageLayout.Content maxWidth="48rem">{children}</PageLayout.Content>
  </PageLayout.Main>
</PageLayout>`,preview:e.jsx("div",{style:{border:"1px solid var(--asriui-color-border)",borderRadius:8,overflow:"hidden"},children:e.jsxs(he,{variant:"sidebar",style:{minHeight:180},children:[e.jsx(he.Sidebar,{children:e.jsx(_,{children:e.jsxs(_.List,{children:[e.jsx(_.Item,{children:e.jsx(_.Link,{href:"#",active:!0,children:"Docs"})}),e.jsx(_.Item,{children:e.jsx(_.Link,{href:"#",children:"Settings"})})]})})}),e.jsx(he.Main,{children:e.jsx(he.Content,{children:e.jsx("p",{style:{margin:0,fontSize:14},children:"Main content area"})})})]})})},{id:"page-layout-docs",title:"Docs layout",description:"Sidebar + content + sticky aside for table of contents.",code:`<PageLayout variant="docs">
  <PageLayout.Sidebar>...</PageLayout.Sidebar>
  <PageLayout.Main>
    <PageLayout.Content>{article}</PageLayout.Content>
    <PageLayout.Aside>{toc}</PageLayout.Aside>
  </PageLayout.Main>
</PageLayout>`,preview:e.jsx("div",{style:{border:"1px solid var(--asriui-color-border)",borderRadius:8,overflow:"hidden"},children:e.jsxs(he,{variant:"docs",style:{minHeight:180},children:[e.jsx(he.Sidebar,{children:e.jsx(_,{children:e.jsx(_.List,{children:e.jsx(_.Item,{children:e.jsx(_.Link,{href:"#",active:!0,children:"API"})})})})}),e.jsxs(he.Main,{children:[e.jsx(he.Content,{children:e.jsx("p",{style:{margin:0,fontSize:14},children:"Article"})}),e.jsx(he.Aside,{children:e.jsx("p",{style:{margin:0,fontSize:12,opacity:.65},children:"TOC"})})]})]})})},{id:"page-layout-centered",title:"Centered layout",description:"Single centered column for marketing, about, and contact pages.",code:`<PageLayout variant="centered" contentMaxWidth="48rem">
  <PageLayout.Main>
    <PageLayout.Content>{children}</PageLayout.Content>
  </PageLayout.Main>
</PageLayout>`,preview:e.jsx("div",{style:{border:"1px solid var(--asriui-color-border)",borderRadius:8,overflow:"hidden"},children:e.jsx(he,{variant:"centered",contentMaxWidth:"28rem",style:{minHeight:120,padding:"1rem 0"},children:e.jsx(he.Main,{children:e.jsx(he.Content,{children:e.jsx("p",{style:{margin:0,fontSize:14,textAlign:"center"},children:"Centered content"})})})})})}],hero:[{id:"hero-full",title:"Full text",description:"Centered copy on an animated dotted background.",code:`<Hero variant="full" align="center" background="dotted" animated>
  <Hero.Copy>
    <Hero.Eyebrow>AsriUI</Hero.Eyebrow>
    <Hero.Title>The React kit for product teams</Hero.Title>
    <Hero.Description>Accessible components you own.</Hero.Description>
    <Hero.Actions>
      <Button>Browse docs</Button>
    </Hero.Actions>
  </Hero.Copy>
</Hero>`,preview:e.jsx(ce,{variant:"full",align:"center",size:"md",background:"dotted",animated:!0,children:e.jsxs(ce.Copy,{children:[e.jsx(ce.Eyebrow,{children:"AsriUI"}),e.jsx(ce.Title,{as:"h2",children:"The React kit for product teams"}),e.jsx(ce.Description,{children:"Accessible components you own."}),e.jsx(ce.Actions,{children:e.jsx(z,{children:"Browse docs"})})]})})},{id:"hero-right-text",title:"Right text + slider",description:"Split layout with copy on the right and a compound Slider in Hero.Media.",code:`<Hero variant="split" textSide="right" background="glow" animated>
  <Hero.Copy>
    <Hero.Title>Copy on the right</Hero.Title>
    <Hero.Description>Media sits on the left.</Hero.Description>
  </Hero.Copy>
  <Hero.Media>
    <Slider>
      <Slider.Track>
        <Slider.Slide>One</Slider.Slide>
        <Slider.Slide>Two</Slider.Slide>
      </Slider.Track>
      <Slider.Controls>
        <Slider.Prev />
        <Slider.Dots />
        <Slider.Next />
      </Slider.Controls>
    </Slider>
  </Hero.Media>
</Hero>`,preview:e.jsxs(ce,{variant:"split",textSide:"right",size:"md",background:"glow",animated:!0,children:[e.jsxs(ce.Copy,{children:[e.jsx(ce.Eyebrow,{children:"Launch"}),e.jsx(ce.Title,{as:"h2",children:"Copy on the right"}),e.jsx(ce.Description,{children:"Pair a slider or visual on the left."}),e.jsx(ce.Actions,{children:e.jsx(z,{size:"sm",children:"Get started"})})]}),e.jsx(ce.Media,{children:e.jsxs(re,{children:[e.jsxs(re.Track,{children:[e.jsx(re.Slide,{children:e.jsx("div",{style:{padding:"2.5rem 1rem",textAlign:"center"},children:"One"})}),e.jsx(re.Slide,{children:e.jsx("div",{style:{padding:"2.5rem 1rem",textAlign:"center"},children:"Two"})})]}),e.jsxs(re.Controls,{children:[e.jsx(re.Prev,{}),e.jsx(re.Dots,{}),e.jsx(re.Next,{})]})]})})]})}],slider:[{id:"slider-default",title:"Track, arrows, and dots",description:"Compound carousel — drag the track, or use Prev, Next, and Dots.",code:`<Slider>
  <Slider.Track>
    <Slider.Slide>First</Slider.Slide>
    <Slider.Slide>Second</Slider.Slide>
  </Slider.Track>
  <Slider.Controls>
    <Slider.Prev />
    <Slider.Dots />
    <Slider.Next />
  </Slider.Controls>
</Slider>`,preview:e.jsx("div",{style:{width:"100%",maxWidth:420},children:e.jsxs(re,{children:[e.jsxs(re.Track,{children:[e.jsx(re.Slide,{children:e.jsx("div",{style:{padding:"2.75rem 1rem",textAlign:"center"},children:"First"})}),e.jsx(re.Slide,{children:e.jsx("div",{style:{padding:"2.75rem 1rem",textAlign:"center"},children:"Second"})})]}),e.jsxs(re.Controls,{children:[e.jsx(re.Prev,{}),e.jsx(re.Dots,{}),e.jsx(re.Next,{})]})]})})}],grid:[{id:"grid-fixed",title:"Fixed columns",description:"Two-column grid for galleries and card layouts.",code:`<Grid variant="fixed" columns={2} gap="md">
  <Card>...</Card>
  <Card>...</Card>
</Grid>`,preview:e.jsxs(nr,{variant:"fixed",columns:2,gap:"md",style:{width:"100%"},children:[e.jsx("div",{style:{padding:16,background:"var(--asriui-color-muted)",borderRadius:8},children:"A"}),e.jsx("div",{style:{padding:16,background:"var(--asriui-color-muted)",borderRadius:8},children:"B"}),e.jsx("div",{style:{padding:16,background:"var(--asriui-color-muted)",borderRadius:8},children:"C"}),e.jsx("div",{style:{padding:16,background:"var(--asriui-color-muted)",borderRadius:8},children:"D"})]})},{id:"grid-auto",title:"Auto-fill",description:"Responsive columns that wrap based on min width. Cards animate smoothly when the layout reflows on resize.",code:`<Grid variant="auto" minColumnWidth={140} gap="sm">
  {items.map((item) => (
    <Card key={item.id}>{item.title}</Card>
  ))}
</Grid>`,preview:e.jsx(nr,{variant:"auto",minColumnWidth:120,gap:"sm",style:{width:"100%"},children:["Forms","Layout","Data","Docs"].map(t=>e.jsx("div",{style:{padding:12,background:"var(--asriui-color-muted)",borderRadius:8,fontSize:13},children:t},t))})}],container:[{id:"container-basic",title:"Constrained content",description:"Center content with a max-width size token and horizontal padding.",code:`<Container size="md" padding="md">
  <h2>Readable column</h2>
  <p>Body copy stays within a comfortable measure.</p>
</Container>`,preview:e.jsx(wi,{size:"md",padding:"sm",style:{border:"1px dashed var(--asriui-color-border)",borderRadius:8},children:e.jsx("p",{style:{margin:0,fontSize:14},children:'Container size="md"'})})}],flex:[{id:"flex-toolbar",title:"Toolbar row",description:"Horizontal flex with space-between and gap tokens.",code:`<Flex align="center" justify="between" gap="md">
  <span>Filters</span>
  <Button size="sm">Export</Button>
</Flex>`,preview:e.jsxs(qt,{align:"center",justify:"between",gap:"md",style:{width:"100%"},children:[e.jsx("span",{style:{fontSize:14,fontWeight:600},children:"Filters"}),e.jsx(z,{size:"sm",children:"Export"})]})},{id:"flex-stack",title:"Vertical stack",code:`<Flex direction="column" gap="sm">
  <Input label="Name" />
  <Button>Continue</Button>
</Flex>`,preview:e.jsxs(qt,{direction:"column",gap:"sm",style:{width:"100%",maxWidth:280},children:[e.jsx(Te,{label:"Name",placeholder:"Ada Lovelace"}),e.jsx(z,{size:"sm",children:"Continue"})]})}],"theme-switch":[{id:"theme-switch-basic",title:"Ripple toggle",description:"Default circular reveal. Try other animations via the animation prop.",code:'<ThemeSwitch theme={theme} onThemeChange={setTheme} animation="ripple" showLabel />',preview:e.jsx(Bc,{})}],"aspect-ratio":[{id:"aspect-ratio-video",title:"16:9 media frame",code:`<AspectRatio ratio={16 / 9}>
  <Image src="/hero.jpg" alt="Hero" />
</AspectRatio>`,preview:e.jsx("div",{style:{width:"100%",maxWidth:320},children:e.jsx(At,{ratio:16/9,children:e.jsx("div",{style:{width:"100%",height:"100%",background:"linear-gradient(135deg, var(--asriui-color-muted), var(--asriui-color-border))",display:"grid",placeItems:"center",fontSize:13,color:"var(--asriui-color-muted-foreground)"},children:"16:9"})})})}],image:[{id:"image-responsive",title:"Responsive srcSet",description:"One base path generates multiple width variants for lazy loading.",code:`<Image
  src="/assets/photo.jpg"
  alt="Gallery"
  widths={[400, 800, 1200]}
  srcPattern="suffix"
/>`,preview:e.jsx("div",{style:{width:"100%",maxWidth:320},children:e.jsx(At,{ratio:4/3,children:e.jsx(ir,{src:"https://picsum.photos/seed/asriui-docs/1200/900",alt:"Gallery sample",widths:[320,640],srcPattern:"query",sizes:"320px"})})})},{id:"image-cache",title:"On-device cache",description:"Cache Storage keeps the image local. refetchInterval controls when it revalidates in the background.",code:`<Image
  src="/assets/photo.jpg"
  alt="Gallery"
  cache
  refetchInterval={60 * 60 * 1000}
/>`,preview:e.jsx("div",{style:{width:"100%",maxWidth:320},children:e.jsx(At,{ratio:4/3,children:e.jsx(ir,{src:"https://picsum.photos/seed/asriui-cache/1200/900",alt:"Cached gallery sample",widths:[320,640],srcPattern:"query",sizes:"320px",cache:!0,refetchInterval:60*60*1e3})})})}],loader:[{id:"loader-variants",title:"Variants",description:"Spinner, bouncing dots, and ring indicators with accessible labels.",code:`<Loader variant="spinner" label="Loading" showLabel />
<Loader variant="dots" size="sm" />
<Loader variant="ring" size="lg" />`,preview:e.jsxs("div",{style:{display:"flex",gap:24,alignItems:"center"},children:[e.jsx(Ae,{variant:"spinner",showLabel:!0,label:"Spinner"}),e.jsx(Ae,{variant:"dots"}),e.jsx(Ae,{variant:"ring",size:"lg"})]})},{id:"loader-sizes",title:"Sizes",code:`<Loader size="sm" />
<Loader size="md" />
<Loader size="lg" />`,preview:e.jsxs("div",{style:{display:"flex",gap:20,alignItems:"center"},children:[e.jsx(Ae,{size:"sm"}),e.jsx(Ae,{size:"md"}),e.jsx(Ae,{size:"lg"})]})}],timeline:[{id:"timeline-roadmap",title:"Product roadmap",description:"Mark steps as complete, active, or upcoming with connector lines.",code:`<Timeline>
  <Timeline.Item title="Alpha" status="complete" date="Shipped" />
  <Timeline.Item title="Beta" status="active" date="Now" />
  <Timeline.Item title="GA" status="default" date="Soon" />
</Timeline>`,preview:e.jsx("div",{style:{maxWidth:360},children:e.jsxs(We,{children:[e.jsx(We.Item,{title:"Core components",date:"Shipped",status:"complete",description:"Button, Input, Card, Dialog, and more."}),e.jsx(We.Item,{title:"Docs & layouts",date:"Shipped",status:"complete",description:"PageLayout, SideNav, CodeBlock."}),e.jsx(We.Item,{title:"Advanced tooling",date:"Now",status:"active",description:"Monaco, React Flow, JSON forms."}),e.jsx(We.Item,{title:"Select & DatePicker",date:"Soon",status:"default",description:"More form primitives coming."})]})})},{id:"timeline-horizontal-config",title:"Horizontal with config",description:"Pass items and statusColors to auto-build a horizontal progress timeline.",code:`<Timeline
  orientation="horizontal"
  items={[
    { id: "1", title: "Install", date: "Step 1", status: "complete" },
    { id: "2", title: "Configure", date: "Step 2", status: "complete" },
    { id: "3", title: "Ship", date: "Step 3", status: "active" },
  ]}
  statusColors={{
    complete: { dot: "#059669", dotBorder: "#059669" },
    active: { dot: "#0284c7", dotBorder: "#0284c7" },
  }}
/>`,preview:e.jsx(We,{orientation:"horizontal",animateOnView:!1,items:[{id:"1",title:"Install",date:"Step 1",status:"complete",description:"pnpm add asriui"},{id:"2",title:"Configure",date:"Step 2",status:"complete",description:"Wrap with AsriUIProvider"},{id:"3",title:"Ship",date:"Step 3",status:"active",description:"Deploy to production"}],statusColors:{complete:{dot:"#059669",dotBorder:"#059669"},active:{dot:"#0284c7",dotBorder:"#0284c7"}}})}],icon:[{id:"icon-sizes",title:"Sizes",description:"Four size presets for inline and standalone use.",code:`<Icon name="sparkles" size="sm" />
<Icon name="sparkles" size="md" />
<Icon name="sparkles" size="lg" />
<Icon name="sparkles" size="xl" />`,preview:Ee(e.jsxs(e.Fragment,{children:[e.jsx(Z,{name:"sparkles",size:"sm"}),e.jsx(Z,{name:"sparkles",size:"md"}),e.jsx(Z,{name:"sparkles",size:"lg"}),e.jsx(Z,{name:"sparkles",size:"xl"})]}))},{id:"icon-labeled",title:"Accessible label",description:"Pass label when the icon conveys meaning without text.",code:'<Icon name="accessibility" label="Accessibility features" />',preview:e.jsx(Z,{name:"accessibility",label:"Accessibility features"})},{id:"icon-custom",title:"Custom SVG & images",description:"Pass library icons as children or use src for raster images.",code:`{/* lucide-react, react-icons, etc. */}
<Icon label="Launch">
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3l9 18-9-4-9 4 9-18z" fill="currentColor" />
  </svg>
</Icon>

<Icon src="/logo.png" label="Logo" />`,preview:Ee(e.jsxs(e.Fragment,{children:[e.jsx(Z,{label:"Custom SVG",children:e.jsx("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("path",{d:"M12 3l9 18-9-4-9 4 9-18z",fill:"currentColor"})})}),e.jsx(Z,{src:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23000'/%3E%3C/svg%3E",label:"Image icon"})]}))}],typography:[{id:"typography-scale",title:"Type scale",description:"Semantic heading and body presets.",code:`<Typography.H1>Heading 1</Typography.H1>
<Typography.H2>Heading 2</Typography.H2>
<Typography.Lead>Lead paragraph for intros.</Typography.Lead>
<Typography.P>Body copy with comfortable line height.</Typography.P>
<Typography.Muted>Muted helper text</Typography.Muted>`,preview:e.jsxs("div",{style:{display:"grid",gap:8,maxWidth:480},children:[e.jsx(tt.H1,{children:"Heading 1"}),e.jsx(tt.H2,{children:"Heading 2"}),e.jsx(tt.Lead,{children:"Lead paragraph for intros."}),e.jsx(tt.P,{children:"Body copy with comfortable line height."}),e.jsx(tt.Muted,{children:"Muted helper text"})]})}],"color-palette":[{id:"palette-default",title:"Default tokens",description:"Click a swatch to copy the CSS variable name.",code:"<ColorPalette />",preview:e.jsx(nn,{columns:4})}],"ai-chat":[{id:"ai-chat-queue",title:"Message queue",description:"Queue follow-up prompts while a task runs. useAiChatQueue processes one task at a time and starts the next when the previous finishes.",code:Ec,preview:e.jsx(zc,{})},{id:"ai-chat-basic",title:"Chat shell",description:"Messages, suggestions, and prompt input with keyboard send.",code:`<AiChat>
  <AiChat.Messages>
    <AiChat.Message messageRole="assistant">How can I help you build today?</AiChat.Message>
  </AiChat.Messages>
  <AiChat.Suggestions suggestions={["Show docs", "Create form"]} onSelect={setPrompt} />
  <AiChat.Prompt value={prompt} onValueChange={setPrompt} onSubmit={send} />
</AiChat>`,preview:e.jsx(Oc,{})}],"ai-workflow-builder":[{id:"ai-workflow-default",title:"Support agent flow",description:"Palette, canvas, inspector, and run controls for designing AI workflows.",code:`<AiWorkflowBuilder
  className="support-workflow"
  onRun={({ nodes, edges }) => console.log({ nodes, edges })}
/>`,preview:e.jsx("div",{style:{width:"100%",maxWidth:1100},children:e.jsx(rn,{height:420})})}],"ai-summarizer":[{id:"ai-summarizer-default",title:"Summarize text",description:"Condense articles or tickets into bullets or a paragraph.",code:"<AiSummarizer source={text} onSourceChange={setText} demo />",preview:e.jsx(tn,{source:"AsriUI ships accessible React components with tree-shakable subpath imports, live docs, and PWA-ready site templates.",demo:!0})}],"ai-data-analyst":[{id:"ai-data-analyst-default",title:"Ask in natural language",description:"Returns KPI metrics, a bar chart, and a breakdown table.",code:"<AiDataAnalyst query={query} onQueryChange={setQuery} demo />",preview:e.jsx(en,{query:"Show revenue by region",demo:!0})}],"ai-form-filler":[{id:"ai-form-filler-default",title:"Fill from instructions",description:"Maps free-form text onto a field schema preview.",code:"<AiFormFiller prompt={prompt} fields={fields} demo />",preview:e.jsx(Zi,{prompt:"Name is Ada Lovelace, email ada@example.com, company Analytical Engines",fields:[{name:"name",type:"text",label:"Full name"},{name:"email",type:"email",label:"Email"},{name:"company",type:"text",label:"Company"}],demo:!0})}],"ai-search":[{id:"ai-search-default",title:"Semantic search",description:"Rank docs corpus items by natural-language relevance.",code:"<AiSearch query={query} items={corpus} demo />",preview:e.jsx(Ji,{query:"dark mode forms",items:[{id:"1",title:"Theming",description:"CSS variables and data-theme",tags:["docs"]},{id:"2",title:"Form validation",description:"JSON-driven forms",tags:["form"]}],demo:!0})}],"ai-orchestrator":[{id:"ai-orchestrator-default",title:"Multi-tool shell",description:"Tabs for each AI tool plus a pipeline that runs all steps.",code:"<AiOrchestrator searchItems={corpus} demo />",preview:e.jsx(Ki,{searchItems:[{id:"1",title:"DataGrid filters",description:"Server-side pagination",tags:["data"]}],demo:!0})}],"context-menu":[{id:"context-menu-default",title:"Right-click menu",description:"Replace the browser menu with Copy layout, Add feature, and Questionnaire actions.",code:`<ContextMenu>
  <ContextMenu.Trigger>
    <div>Right-click this area</div>
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item onSelect={copy}>Copy layout</ContextMenu.Item>
    <ContextMenu.Separator />
    <ContextMenu.Item>Add feature</ContextMenu.Item>
    <ContextMenu.Item>Questionnaire</ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu>`,preview:e.jsxs(De,{children:[e.jsx(De.Trigger,{children:e.jsx("div",{style:{padding:"1.5rem",border:"1px dashed var(--asriui-color-border, #d4d4d8)",borderRadius:12,minWidth:220},children:"Right-click this area"})}),e.jsxs(De.Content,{children:[e.jsx(De.Item,{children:"Copy layout"}),e.jsx(De.Separator,{}),e.jsx(De.Item,{children:"Add feature"}),e.jsx(De.Item,{children:"Questionnaire"})]})]})}],"feature-request":[{id:"feature-request-default",title:"Feature intake",description:"Title, category, description, and optional email.",code:"<FeatureRequest onSubmit={(values) => console.log(values)} />",preview:e.jsx(Ui,{onSubmit:()=>{}})}],questionnaire:[{id:"questionnaire-default",title:"Stepped questions",description:"Text, single-choice, and multiple-choice steps.",code:"<Questionnaire questions={DEFAULT_QUESTIONNAIRE} onComplete={save} />",preview:e.jsx(Oi,{questions:Fi})}]};function qc(){const[t,r]=o.useState(!1);return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[e.jsx(Yi,{id:"doc-switch",checked:t,onCheckedChange:r}),e.jsx(Er,{htmlFor:"doc-switch",children:"Email notifications"})]})}function Hc(){return e.jsxs(et,{children:[e.jsx(et.Trigger,{children:"Open dialog"}),e.jsx(et.Content,{title:"Delete project?",description:"This action cannot be undone.",children:e.jsxs(et.Footer,{children:[e.jsx(et.Close,{children:"Cancel"}),e.jsx(z,{variant:"danger",children:"Delete"})]})})]})}function Oc(){const[t,r]=o.useState(""),[i,n]=o.useState(["How can I help you build today?"]);function s(a){n(l=>[...l,a,"Here’s a starting point — wire this to your model API."]),r("")}return e.jsx("div",{style:{maxWidth:420,width:"100%"},children:e.jsxs(ye,{label:"Assistant demo",children:[e.jsx(ye.Messages,{children:i.map((a,l)=>e.jsx(ye.Message,{messageRole:l%2===0?"assistant":"user",children:a},`${l}-${a}`))}),e.jsx(ye.Suggestions,{suggestions:["Show component docs","Create a form"],onSelect:r}),e.jsx(ye.Prompt,{value:t,onValueChange:r,onSubmit:s})]})})}function fu(t){return $c[t]??[]}export{$c as componentExamples,fu as getExamples};
//# sourceMappingURL=index-CBsgqe9d.js.map
