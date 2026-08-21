import { Link } from "react-router-dom";
import { Card, Icon, type IconName } from "../src";
import styles from "./BentoFeatures.module.css";

export type BentoFeature = {
  title: string;
  description: string;
  tag: string;
  icon: IconName;
  span?: "wide" | "tall";
};

type Props = {
  features: readonly BentoFeature[];
};

export function BentoFeatures({ features }: Props) {
  return (
    <div className={styles.grid}>
      {features.map((feature) => (
        <article
          key={feature.title}
          className={[
            styles.card,
            feature.span === "wide" ? styles.wide : "",
            feature.span === "tall" ? styles.tall : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <Card className={styles.cardInner}>
            <div className={styles.cardTop}>
              <span className={styles.iconWrap} aria-hidden="true">
                <Icon name={feature.icon} size="md" />
              </span>
              <span className={styles.tag}>{feature.tag}</span>
            </div>
            <Card.Header>
              <Card.Title>{feature.title}</Card.Title>
            </Card.Header>
            <Card.Content>
              <p className={styles.description}>{feature.description}</p>
            </Card.Content>
          </Card>
        </article>
      ))}
      <Link to="/docs" className={styles.exploreCard}>
        <span className={styles.exploreIcon} aria-hidden="true">
          <Icon name="chevron-right" size="lg" />
        </span>
        <span className={styles.exploreTitle}>Explore all components</span>
        <span className={styles.exploreMeta}>Primitives with docs & examples</span>
      </Link>
    </div>
  );
}
