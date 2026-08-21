/** Site author — sourced from public LinkedIn + GitHub profiles. */
export const SITE_AUTHOR = {
  name: "Ajay Kumar Maheshwari",
  shortName: "Ajay",
  role: "Full Stack Engineer",
  headline: "Full Stack Engineer at Publicis Sapient · Creator of AxiomUI",
  location: "India",
  email: "ajay.maheshwari095@gmail.com",
  linkedIn: "https://www.linkedin.com/in/ajaymaheshwari24/",
  github: "https://github.com/GAjay",
  githubHandle: "GAjay",
  buyMeACoffee: "https://www.buymeacoffee.com/gajay",
  /** LinkedIn is tried first; GitHub photo is the public fallback (LinkedIn blocks hotlinking). */
  avatar: "/ajay-maheshwari.jpg",
  linkedInPhoto: `https://unavatar.io/linkedin/ajaymaheshwari24?fallback=${encodeURIComponent("https://avatars.githubusercontent.com/u/6947656?s=800")}`,
  summary:
    "I build scalable products across the stack — React, TypeScript, Node.js, Django, Python, and GraphQL — and ship the interface layer teams actually reuse. AxiomUI is the open-source component library I maintain so product teams can start from accessible, typed primitives instead of a blank canvas.",
  focus: [
    "Accessible React component systems",
    "Product UI at consulting and SaaS scale",
    "TypeScript, GraphQL, and API-backed frontends",
    "Open-source tooling and developer experience",
  ],
  skills: [
    "React",
    "TypeScript",
    "Node.js",
    "GraphQL",
    "Python",
    "Django",
    "JavaScript",
    "Design systems",
    "Accessibility",
    "PWA",
  ],
  experience: [
    {
      company: "Publicis Sapient",
      role: "Full Stack Engineer",
      period: "Current",
      current: true,
      description:
        "Building digital products for enterprise clients — React and TypeScript on the client, Node and GraphQL where the API needs to keep up.",
    },
    {
      company: "Vymo",
      role: "Full Stack Engineer",
      period: "Previous",
      current: false,
      description:
        "Shipped scalable sales-enablement surfaces with React, TypeScript, and API-driven workflows.",
    },
    {
      company: "ExpressIn",
      role: "Engineering",
      period: "Previous",
      current: false,
      description: "Product engineering across web clients and backend services.",
    },
    {
      company: "Razr Corp",
      role: "Engineering",
      period: "Previous",
      current: false,
      description: "Full-stack delivery on client-facing web applications.",
    },
  ],
} as const;
