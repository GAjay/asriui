import { CodeBlock } from "axiom-ui";
import type { ComponentApiDoc } from "./componentApi";
import styles from "./ComponentApiTable.module.css";

type Props = {
  api: ComponentApiDoc;
};

export function ComponentApiTable({ api }: Props) {
  return (
    <div className={styles.wrap}>
      <section className={styles.section}>
        <h2 className={styles.heading}>Description</h2>
        <p className={styles.summary}>{api.description}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Import</h2>
        <CodeBlock
          code={`import { ${api.exportName} } from "${api.importPath}";`}
          language="tsx"
          showCopy
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Usage</h2>
        <CodeBlock code={api.usage} language="tsx" showCopy />
      </section>

      {api.accessibility ? (
        <section className={styles.section}>
          <h2 className={styles.heading}>Accessibility</h2>
          <p className={styles.note}>{api.accessibility}</p>
        </section>
      ) : null}

      {api.propGroups?.map((group) => (
        <section key={group.title} className={styles.section}>
          <h2 className={styles.heading}>{group.title}</h2>
          <PropTable props={group.props} />
        </section>
      ))}

      {api.props.length > 0 ? (
        <section className={styles.section}>
          <h2 className={styles.heading}>Props</h2>
          <PropTable props={api.props} />
        </section>
      ) : null}
    </div>
  );
}

function PropTable({ props }: { props: ComponentApiDoc["props"] }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name}>
              <td>
                <code className={styles.propName}>{prop.name}</code>
                {prop.required ? <span className={styles.required}>required</span> : null}
              </td>
              <td>
                <code className={styles.type}>{prop.type}</code>
              </td>
              <td>
                {prop.defaultValue ? (
                  <code className={styles.defaultVal}>{prop.defaultValue}</code>
                ) : (
                  "—"
                )}
              </td>
              <td>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
