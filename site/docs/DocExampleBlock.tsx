import { useState } from "react";
import { CodeBlock } from "asriui";
import styles from "./DocExampleBlock.module.css";

type Props = {
  id: string;
  title: string;
  description?: string;
  code: string;
  preview: React.ReactNode;
};

export function DocExampleBlock({ id, title, description, code, preview }: Props) {
  const [showCode, setShowCode] = useState(false);

  return (
    <section id={id} className={styles.section}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>

      <div className={styles.panel}>
        <div className={styles.toolbar}>
          <button
            type="button"
            className={!showCode ? styles.tabActive : styles.tab}
            onClick={() => setShowCode(false)}
          >
            Preview
          </button>
          <button
            type="button"
            className={showCode ? styles.tabActive : styles.tab}
            onClick={() => setShowCode(true)}
          >
            Code
          </button>
        </div>

        {showCode ? (
          <div className={styles.codeWrap}>
            <CodeBlock code={code} language="tsx" showCopy />
          </div>
        ) : (
          <div className={styles.preview}>{preview}</div>
        )}
      </div>
    </section>
  );
}
