import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Tabs } from "../src";
import styles from "./LandingSectionTabs.module.css";

export type LandingTabItem = {
  value: string;
  label: string;
  panel: ReactNode;
};

type LandingSectionTabsProps = {
  items: LandingTabItem[];
  defaultValue?: string;
  ariaLabel: string;
};

export function LandingSectionTabs({ items, defaultValue, ariaLabel }: LandingSectionTabsProps) {
  const reducedMotion = useReducedMotion();
  const initial = defaultValue ?? items[0]?.value ?? "";
  const [active, setActive] = useState(initial);
  const activeItem = items.find((item) => item.value === active) ?? items[0];

  return (
    <div className={styles.root}>
      <Tabs
        value={active}
        onValueChange={setActive}
        variant="pills"
        animated={false}
        className={styles.tabs}
        classNames={{
          list: styles.list,
          trigger: styles.trigger,
        }}
      >
        <Tabs.List aria-label={ariaLabel} className={styles.list}>
          {items.map((item) => (
            <Tabs.Trigger key={item.value} value={item.value}>
              {item.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs>

      <div className={styles.viewport}>
        <motion.div
          key={activeItem?.value}
          role="tabpanel"
          className={styles.panel}
          initial={reducedMotion ? false : { x: 14 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.85 }}
        >
          {activeItem?.panel}
        </motion.div>
      </div>
    </div>
  );
}
