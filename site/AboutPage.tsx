import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "../src/components/Button";
import { SITE_AUTHOR } from "./author";
import { SectionContextMenu } from "./SectionContextMenu";
import { LandingFooter } from "./LandingFooter";
import { LandingSiteHeader } from "./LandingSiteHeader";
import { SCROLL_REPLAY_VIEWPORT } from "./scrollReplay";
import { SectionKicker } from "./SectionKicker";
import { SITE_NAME } from "./siteMeta";
import { absoluteSiteUrl } from "./seo/seoUtils";
import { usePageSeo } from "./seo/usePageSeo";
import { SECTION_LAYOUTS } from "./sectionLayouts";
import { useSiteTheme } from "./useSiteTheme";
import styles from "./AboutPage.module.css";
import landingStyles from "./LandingPage.module.css";

const STATS = [
  { value: "2014", label: "First public commits", hint: "Building in the open" },
  { value: "94+", label: "Public repositories", hint: "GitHub" },
  { value: "4", label: "Product organizations", hint: "Consulting + SaaS" },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

export function AboutPage() {
  const { theme } = useSiteTheme();
  const [portraitSrc, setPortraitSrc] = useState<string>(SITE_AUTHOR.linkedInPhoto);
  const reducedMotion = useReducedMotion();
  const canonical = absoluteSiteUrl("/about");
  const motionProps = reducedMotion
    ? {}
    : { variants: stagger, initial: "hidden" as const, animate: "visible" as const };

  usePageSeo({
    title: `About ${SITE_AUTHOR.name} — ${SITE_NAME}`,
    description: `${SITE_AUTHOR.headline}. ${SITE_AUTHOR.summary}`,
    canonical,
    ogType: "profile",
  });

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_AUTHOR.name,
    jobTitle: SITE_AUTHOR.role,
    image: absoluteSiteUrl(SITE_AUTHOR.avatar),
    email: SITE_AUTHOR.email,
    url: canonical,
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    sameAs: [SITE_AUTHOR.linkedIn, SITE_AUTHOR.github, SITE_AUTHOR.buyMeACoffee],
    worksFor: { "@type": "Organization", name: "Publicis Sapient" },
  };

  return (
    <div className={landingStyles.page} data-theme={theme} data-landing-page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <LandingSiteHeader />

      <main>
        <section className={styles.hero} data-band="white" aria-labelledby="about-name">
          <SectionContextMenu layoutCode={SECTION_LAYOUTS.about} />
          <div className={styles.heroGridBg} aria-hidden="true" />
          <motion.div className={styles.heroInner} {...motionProps}>
            <motion.div className={styles.heroCopy} variants={reducedMotion ? undefined : fadeUp}>
              <div className={styles.heroMeta}>
                <SectionKicker accent="emerald">About</SectionKicker>
                <span className={styles.status}>Available for collaboration</span>
              </div>
              <h1 id="about-name" className={styles.name}>
                {SITE_AUTHOR.shortName}
                <span className={styles.nameRest}> {SITE_AUTHOR.name.replace(SITE_AUTHOR.shortName, "").trim()}</span>
              </h1>
              <p className={styles.headline}>{SITE_AUTHOR.headline}</p>
              <p className={styles.lead}>{SITE_AUTHOR.summary}</p>
              <div className={styles.actions}>
                <a className={styles.actionPrimary} href={SITE_AUTHOR.linkedIn} target="_blank" rel="noreferrer">
                  LinkedIn
                  <span aria-hidden="true">↗</span>
                </a>
                <a className={styles.actionGhost} href={SITE_AUTHOR.github} target="_blank" rel="noreferrer">
                  GitHub @{SITE_AUTHOR.githubHandle}
                </a>
                <a className={styles.actionGhost} href={`mailto:${SITE_AUTHOR.email}`}>
                  Email
                </a>
              </div>
            </motion.div>

            <motion.div className={styles.portraitCol} variants={reducedMotion ? undefined : fadeUp}>
              <div className={styles.portraitFrame}>
                <div className={styles.portraitWell}>
                  <img
                    className={styles.portrait}
                    src={portraitSrc}
                    alt={`${SITE_AUTHOR.name} portrait`}
                    width={640}
                    height={640}
                    onError={() => setPortraitSrc(SITE_AUTHOR.avatar)}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className={styles.portraitCaption}>
                  <span>{SITE_AUTHOR.location}</span>
                  <span>{SITE_AUTHOR.role}</span>
                </div>
              </div>
              <ul className={styles.orbit} aria-label="Core skills">
                {SITE_AUTHOR.skills.slice(0, 5).map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </section>

        <section className={styles.band} data-band="black" id="focus">
          <SectionContextMenu layoutCode={SECTION_LAYOUTS.focus} />
          <div className={styles.wrap}>
            <header className={styles.sectionHead}>
              <SectionKicker accent="cyan">Now</SectionKicker>
              <h2 className={styles.sectionTitle}>A bento of the work</h2>
              <p className={styles.sectionLead}>
                The same principles behind {SITE_NAME} — accessibility, typed APIs, small bundles —
                show up in the products I ship at work.
              </p>
            </header>

            <motion.div
              className={styles.bento}
              variants={reducedMotion ? undefined : stagger}
              initial={reducedMotion ? undefined : "hidden"}
              whileInView={reducedMotion ? undefined : "visible"}
              viewport={SCROLL_REPLAY_VIEWPORT}
            >
              {STATS.map((stat) => (
                <motion.article key={stat.label} className={styles.bentoStat} variants={reducedMotion ? undefined : fadeUp}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  <em>{stat.hint}</em>
                </motion.article>
              ))}
              <motion.article className={styles.bentoFocus} variants={reducedMotion ? undefined : fadeUp}>
                <h3>What I care about</h3>
                <ol>
                  {SITE_AUTHOR.focus.map((item, index) => (
                    <li key={item}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </motion.article>
            </motion.div>
          </div>
        </section>

        <section className={styles.band} data-band="white" id="experience">
          <SectionContextMenu layoutCode={SECTION_LAYOUTS.experience} />
          <div className={styles.wrap}>
            <header className={styles.sectionHead}>
              <SectionKicker accent="emerald">Experience</SectionKicker>
              <h2 className={styles.sectionTitle}>Teams and products</h2>
              <p className={styles.sectionLead}>
                Full-stack delivery across consulting and product companies — React, TypeScript, and
                the APIs behind the UI.
              </p>
            </header>

            <ol className={styles.timeline}>
              {SITE_AUTHOR.experience.map((job, index) => (
                <li
                  key={job.company}
                  className={styles.job}
                  data-current={job.current ? "true" : undefined}
                >
                  <span className={styles.jobIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <div className={styles.jobBody}>
                    <div className={styles.jobTop}>
                      <h3>{job.role}</h3>
                      {job.current ? <span className={styles.now}>Now</span> : <span className={styles.then}>{job.period}</span>}
                    </div>
                    <p className={styles.jobCompany}>{job.company}</p>
                    <p className={styles.jobDesc}>{job.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.band} data-band="black" id="skills">
          <SectionContextMenu layoutCode={SECTION_LAYOUTS.skills} />
          <div className={styles.wrap}>
            <header className={styles.sectionHead}>
              <SectionKicker accent="amber">Stack</SectionKicker>
              <h2 className={styles.sectionTitle}>Tools I reach for</h2>
              <p className={styles.sectionLead}>
                Languages and platforms I use to ship product UI and the services behind it.
              </p>
            </header>
            <ul className={styles.skills} aria-label="Skills">
              {SITE_AUTHOR.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.ctaBand} data-band="white" id="open-source">
          <SectionContextMenu layoutCode={SECTION_LAYOUTS["open-source"]} />
          <div className={styles.wrap}>
            <div className={styles.ctaPanel}>
              <SectionKicker accent="cyan">Open source</SectionKicker>
              <h2 className={styles.ctaTitle}>
                {SITE_NAME} is the public
                <br />
                system I maintain.
              </h2>
              <p className={styles.ctaLead}>
                Accessible React components, page templates, and docs you can fork — so teams start
                from typed primitives instead of a blank canvas.
              </p>
              <div className={styles.ctaActions}>
                <Link to="/docs/getting-started">
                  <Button className={`${landingStyles.btnPrimary} ${landingStyles.btnHeader}`}>Read the docs</Button>
                </Link>
                <a href={SITE_AUTHOR.buyMeACoffee} target="_blank" rel="noreferrer">
                  <Button variant="secondary" className={`${landingStyles.btnMuted} ${landingStyles.btnHeader}`}>
                    Buy me a coffee
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter band="white" />
    </div>
  );
}
