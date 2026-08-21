import styles from "./ComponentPerformanceMetrics.module.css";
import { getComponentPerformance } from "./performanceMetrics";

type Props = {
  slug: string;
};

export function ComponentPerformanceMetrics({ slug }: Props) {
  const metric = getComponentPerformance(slug);

  if (!metric) {
    return (
      <p className={styles.note}>
        Performance metrics are generated after <code>pnpm build</code>. Run the library build to
        populate bundle sizes for this component.
      </p>
    );
  }

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <caption className={styles.caption}>Bundle performance (isolated subpath import)</caption>
        <thead>
          <tr>
            <th scope="col">Metric</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ESM bundle (raw)</td>
            <td>{metric.rawKb} KB</td>
          </tr>
          <tr>
            <td>ESM bundle (gzip)</td>
            <td>{metric.gzipKb} KB</td>
          </tr>
          <tr>
            <td>Tree-shakable</td>
            <td>{metric.treeShakable ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>SSR friendly</td>
            <td>{metric.ssr ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>
      <p className={styles.note}>
        Measured by bundling <code>axiom-ui/{slug}</code> with esbuild (React externalized). Actual
        app bundles vary with shared chunks and dependencies such as <code>framer-motion</code>.
      </p>
    </div>
  );
}
