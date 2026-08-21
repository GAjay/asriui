/** Copy-paste section layouts built from AsriUI primitives. */

export const SECTION_LAYOUTS = {
  hero: `import { Badge, Button, PageLayout, Typography } from "asriui";
import "asriui/style.css";

export function HeroLayout() {
  return (
    <PageLayout variant="centered" contentMaxWidth="64rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <header style={{ textAlign: "center" }}>
            <Badge variant="secondary">Open source · MIT</Badge>
            <Typography variant="h1">The React UI kit for design systems</Typography>
            <Typography variant="lead">
              Accessible components you own — TypeScript, motion, and tree-shakable imports.
            </Typography>
            <Button size="lg" style={{ marginTop: "1.25rem" }}>
              Browse documentation
            </Button>
          </header>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,

  marquee: `import { Badge, Flex } from "asriui";
import "asriui/style.css";

const ITEMS = ["React 18", "TypeScript", "Framer Motion", "Vite", "CSS Modules"];

export function TechMarqueeLayout() {
  return (
    <Flex gap="sm" wrap="nowrap" style={{ overflow: "auto", padding: "0.75rem 0" }}>
      {ITEMS.map((item) => (
        <Badge key={item} variant="secondary">
          {item}
        </Badge>
      ))}
    </Flex>
  );
}`,

  features: `import { Card, Grid, Icon, PageLayout, Typography } from "asriui";
import "asriui/style.css";

const FEATURES = [
  { title: "Accessible by default", body: "ARIA roles, keyboard support, and focus management." },
  { title: "Motion-ready", body: "Framer Motion presets with reduced-motion baked in." },
  { title: "Tree-shakable", body: "Import only what you need via subpath exports." },
];

export function FeaturesLayout() {
  return (
    <PageLayout variant="centered" contentMaxWidth="64rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <Typography variant="h2">Everything you need to ship</Typography>
          <Typography variant="lead">Primitives, layouts, and AI-ready shells.</Typography>
          <Grid minColumnWidth="16rem" gap="md" style={{ marginTop: "1.5rem" }}>
            {FEATURES.map((feature) => (
              <Card key={feature.title}>
                <Card.Header>
                  <Icon name="sparkles" size="sm" />
                  <Card.Title>{feature.title}</Card.Title>
                </Card.Header>
                <Card.Content>
                  <Typography variant="muted">{feature.body}</Typography>
                </Card.Content>
              </Card>
            ))}
          </Grid>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,

  "design-system": `import { ColorPalette, PageLayout, Typography } from "asriui";
import "asriui/style.css";

export function DesignTokensLayout() {
  return (
    <PageLayout variant="centered" contentMaxWidth="64rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <Typography variant="h2">Design tokens that scale</Typography>
          <Typography variant="lead">Light and dark themes from CSS variables you can override.</Typography>
          <div style={{ marginTop: "1.5rem" }}>
            <ColorPalette />
          </div>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,

  "ship-faster": `import { Card, Grid, LoginForm, PageLayout, Typography } from "asriui";
import "asriui/style.css";

export function AuthShellLayout() {
  return (
    <PageLayout variant="centered" contentMaxWidth="64rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <Typography variant="h2">Auth and installable shells</Typography>
          <Grid minColumnWidth="18rem" gap="lg" style={{ marginTop: "1.5rem", alignItems: "start" }}>
            <Card>
              <Card.Header>
                <Card.Title>Sign in</Card.Title>
              </Card.Header>
              <Card.Content>
                <LoginForm />
              </Card.Content>
            </Card>
            <Typography variant="muted">
              Pair LoginForm with OAuth providers, then reuse the same tokens in a PWA shell.
            </Typography>
          </Grid>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,

  explore: `import { Card, Grid, PageLayout, Typography } from "asriui";
import "asriui/style.css";

const ITEMS = [
  { title: "Button", href: "/docs/components/button" },
  { title: "DataGrid", href: "/docs/components/data-grid" },
  { title: "Form", href: "/docs/components/form" },
];

export function CatalogLayout() {
  return (
    <PageLayout variant="centered" contentMaxWidth="64rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <Typography variant="h2">Components and templates</Typography>
          <Grid minColumnWidth="12rem" gap="sm" style={{ marginTop: "1.25rem" }}>
            {ITEMS.map((item) => (
              <Card key={item.title}>
                <Card.Content>
                  <Typography variant="h3">{item.title}</Typography>
                </Card.Content>
              </Card>
            ))}
          </Grid>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,

  "powered-by": `import { Badge, Flex, PageLayout, Typography } from "asriui";
import "asriui/style.css";

export function StackLayout() {
  return (
    <PageLayout variant="centered" contentMaxWidth="56rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <Typography variant="h2">Powered by a modern stack</Typography>
          <Flex gap="sm" wrap="wrap" style={{ marginTop: "1rem" }}>
            {["React", "TypeScript", "Vite", "Framer Motion"].map((item) => (
              <Badge key={item} variant="secondary">{item}</Badge>
            ))}
          </Flex>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,

  milestones: `import { PageLayout, Timeline, Typography } from "asriui";
import "asriui/style.css";

export function MilestonesLayout() {
  return (
    <PageLayout variant="centered" contentMaxWidth="48rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <Typography variant="h2">What we have shipped</Typography>
          <Timeline>
            <Timeline.Item title="AI orchestrator" date="Now" status="active" />
            <Timeline.Item title="DataGrid filters" date="Shipped" status="complete" />
          </Timeline>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,

  faq: `import { Accordion, PageLayout, Typography } from "asriui";
import "asriui/style.css";

export function FaqLayout() {
  return (
    <PageLayout variant="centered" contentMaxWidth="48rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <Typography variant="h2">Frequently asked questions</Typography>
          <Accordion type="single" collapsible style={{ marginTop: "1.25rem" }}>
            <Accordion.Item value="license">
              <Accordion.Trigger>Is AsriUI free?</Accordion.Trigger>
              <Accordion.Content>Yes. It is MIT licensed — use it in commercial products.</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="react">
              <Accordion.Trigger>Which React version?</Accordion.Trigger>
              <Accordion.Content>React 18 or later with TypeScript.</Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,

  support: `import { Button, Card, Flex, PageLayout, Typography } from "asriui";
import "asriui/style.css";

export function SupportLayout() {
  return (
    <PageLayout variant="centered" contentMaxWidth="48rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <Card>
            <Card.Header>
              <Card.Title>Enjoying the library?</Card.Title>
            </Card.Header>
            <Card.Content>
              <Typography variant="muted">Star the repo, open issues, or support development.</Typography>
              <Flex gap="sm" style={{ marginTop: "1rem" }}>
                <Button>Star on GitHub</Button>
                <Button variant="secondary">Buy me a coffee</Button>
              </Flex>
            </Card.Content>
          </Card>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,

  footer: `import { Flex, Link, PageLayout, Typography } from "asriui";
import "asriui/style.css";

export function FooterLayout() {
  return (
    <PageLayout variant="centered" contentMaxWidth="64rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <footer style={{ borderTop: "1px solid var(--asriui-color-border)", paddingTop: "2rem" }}>
            <Flex justify="between" wrap="wrap" gap="md">
              <Typography variant="h3">AsriUI</Typography>
              <Flex gap="md">
                <Link href="/docs">Docs</Link>
                <Link href="/about">About</Link>
                <Link href="https://github.com" target="_blank">GitHub</Link>
              </Flex>
            </Flex>
            <Typography variant="muted" style={{ marginTop: "1rem" }}>
              MIT Licensed.
            </Typography>
          </footer>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,

  about: `import { Badge, Button, Flex, PageLayout, Typography } from "asriui";
import "asriui/style.css";

export function AboutHeroLayout() {
  return (
    <PageLayout variant="centered" contentMaxWidth="64rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <Flex gap="xl" align="center" wrap="wrap">
            <div style={{ flex: "1 1 18rem" }}>
              <Badge variant="secondary">Available</Badge>
              <Typography variant="h1">gajay</Typography>
              <Typography variant="lead">Full Stack Engineer · Creator of AsriUI</Typography>
              <Flex gap="sm" style={{ marginTop: "1rem" }}>
                <Button>LinkedIn</Button>
                <Button variant="secondary">GitHub</Button>
              </Flex>
            </div>
            <img
              src="/ajay-maheshwari.jpg"
              alt="Portrait"
              width={320}
              height={320}
              style={{ width: "16rem", height: "16rem", objectFit: "cover", borderRadius: 24 }}
            />
          </Flex>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,

  focus: `import { Card, Grid, Metric, PageLayout, Typography } from "asriui";
import "asriui/style.css";

export function BentoStatsLayout() {
  return (
    <PageLayout variant="centered" contentMaxWidth="64rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <Typography variant="h2">A bento of the work</Typography>
          <Grid minColumnWidth="12rem" gap="md" style={{ marginTop: "1.25rem" }}>
            <Metric>
              <Metric.Value>2014</Metric.Value>
              <Metric.Label>First public commits</Metric.Label>
            </Metric>
            <Metric>
              <Metric.Value>94+</Metric.Value>
              <Metric.Label>Public repositories</Metric.Label>
            </Metric>
            <Card>
              <Card.Header>
                <Card.Title>Focus</Card.Title>
              </Card.Header>
              <Card.Content>
                <Typography variant="muted">Accessible React systems, typed APIs, and small bundles.</Typography>
              </Card.Content>
            </Card>
          </Grid>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,

  experience: `import { Badge, Card, Grid, PageLayout, Typography } from "asriui";
import "asriui/style.css";

const JOBS = [
  { role: "Full Stack Engineer", company: "Publicis Sapient", current: true },
  { role: "Full Stack Engineer", company: "Vymo", current: false },
];

export function ExperienceLayout() {
  return (
    <PageLayout variant="centered" contentMaxWidth="64rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <Typography variant="h2">Teams and products</Typography>
          <Grid minColumnWidth="18rem" gap="md" style={{ marginTop: "1.25rem" }}>
            {JOBS.map((job) => (
              <Card key={job.company}>
                <Card.Header>
                  <Card.Title>{job.role}</Card.Title>
                  {job.current ? <Badge>Now</Badge> : <Badge variant="secondary">Previous</Badge>}
                </Card.Header>
                <Card.Content>
                  <Typography variant="muted">{job.company}</Typography>
                </Card.Content>
              </Card>
            ))}
          </Grid>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,

  skills: `import { Badge, Flex, PageLayout, Typography } from "asriui";
import "asriui/style.css";

const SKILLS = ["React", "TypeScript", "Node.js", "GraphQL", "Python", "Django"];

export function SkillsLayout() {
  return (
    <PageLayout variant="centered" contentMaxWidth="48rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <Typography variant="h2">Tools I reach for</Typography>
          <Flex gap="sm" wrap="wrap" style={{ marginTop: "1rem" }}>
            {SKILLS.map((skill) => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </Flex>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,

  "open-source": `import { Button, Card, Flex, PageLayout, Typography } from "asriui";
import "asriui/style.css";

export function OpenSourceCtaLayout() {
  return (
    <PageLayout variant="centered" contentMaxWidth="56rem">
      <PageLayout.Main>
        <PageLayout.Content>
          <Card>
            <Card.Header>
              <Card.Title>AsriUI is the public system I maintain</Card.Title>
            </Card.Header>
            <Card.Content>
              <Typography variant="muted">
                Accessible React components, page templates, and docs you can fork.
              </Typography>
              <Flex gap="sm" style={{ marginTop: "1rem" }}>
                <Button>Read the docs</Button>
                <Button variant="secondary">Buy me a coffee</Button>
              </Flex>
            </Card.Content>
          </Card>
        </PageLayout.Content>
      </PageLayout.Main>
    </PageLayout>
  );
}`,

  featureRequest: `import { FeatureRequest } from "asriui";
import "asriui/style.css";

export function FeatureRequestLayout() {
  return (
    <FeatureRequest
      onSubmit={(values) => {
        console.log(values);
      }}
    />
  );
}`,

  questionnaire: `import { Questionnaire, DEFAULT_QUESTIONNAIRE } from "asriui";
import "asriui/style.css";

export function QuestionnaireLayout() {
  return (
    <Questionnaire
      questions={DEFAULT_QUESTIONNAIRE}
      onComplete={(answers) => {
        console.log(answers);
      }}
    />
  );
}`,
} as const;
