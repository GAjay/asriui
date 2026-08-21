import { HorizontalTimeline } from "./HorizontalTimeline";
import styles from "./SetupTimeline.module.css";

const SETUP_STEPS = [
  {
    id: "install",
    title: "Install",
    date: "Step 1",
    description: "pnpm add axiom-ui framer-motion",
    status: "complete" as const,
  },
  {
    id: "configure",
    title: "Configure",
    date: "Step 2",
    description: "Wrap with AxiomProvider + import styles",
    status: "complete" as const,
  },
  {
    id: "compose",
    title: "Compose",
    date: "Step 3",
    description: "Import components and motion presets",
    status: "active" as const,
  },
  {
    id: "ship",
    title: "Ship",
    date: "Step 4",
    description: "Deploy with PWA, analytics, and monitoring",
    status: "default" as const,
  },
];

export function SetupTimeline() {
  return (
    <div className={styles.root}>
      <p className={styles.caption}>From install to production in four steps</p>
      <HorizontalTimeline steps={SETUP_STEPS} aria-label="Setup progress" />
    </div>
  );
}
