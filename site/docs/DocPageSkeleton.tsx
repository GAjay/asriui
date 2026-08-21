import { Skeleton } from "../../src/components/Skeleton";
import styles from "./DocPageSkeleton.module.css";

export function DocPageSkeleton() {
  return (
    <div className={styles.wrap} aria-busy="true" aria-label="Loading documentation">
      <Skeleton variant="text" width="25%" height={14} />
      <Skeleton variant="text" width="55%" height={36} className={styles.gap} />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="75%" className={styles.gap} />

      <div className={styles.badges}>
        <Skeleton variant="rounded" width={80} height={24} />
        <Skeleton variant="rounded" width={72} height={24} />
        <Skeleton variant="rounded" width={88} height={24} />
      </div>

      <Skeleton variant="rounded" height={100} className={styles.gapLg} />

      <Skeleton variant="text" width="30%" height={20} className={styles.gapLg} />
      <Skeleton variant="rounded" height={180} />
      <Skeleton variant="rounded" height={180} className={styles.gap} />
    </div>
  );
}
