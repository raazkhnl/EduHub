import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import SidebarItem, { SidebarItemList } from '@site/src/components/SidebarItem';
import styles from './index.module.css';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title="Smart study, simplified." description={siteConfig.tagline}>
      <Hero />
      <main className="container">
        <Curricula />
        <Principles />
        <CTA />
      </main>
    </Layout>
  );
}

function Hero() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <p className={styles.eyebrow}>EduHub · v0.1</p>
        <h1 className={styles.headline}>
          Smart study,
          <br />
          simplified.
        </h1>
        <p className={styles.lede}>
          Curated chapter notes, lab manuals, and past papers for IOE, CTEVT, and TU programs —
          carefully typeset, searchable, and free to read, share, and fork.
        </p>
        <div className={styles.heroActions}>
          <Link to="/ioe/msncs" className={styles.btnPrimary}>
            Browse IOE M.Sc. (MSNCS)
          </Link>
          <Link to="/contribute" className={styles.btnGhost}>
            How to contribute →
          </Link>
        </div>
        <p className={styles.heroFoot}>
          <span>·</span> Built with Docusaurus
          <span>·</span> Offline-ready PWA
          <span>·</span> Licensed CC BY 4.0
        </p>
      </div>
    </header>
  );
}

function Curricula() {
  return (
    <section className={styles.section}>
      <SidebarItemList
        title="Institute of Engineering (IOE) — Tribhuvan University"
        hint="Pulchowk and constituent campuses · Bachelor (BE) and Master (MSc) programs"
      >
        <SidebarItem
          href="/ioe/msncs"
          title="M.Sc. — Networks & Cybersecurity (MSNCS)"
          code="MSNCS"
          meta="2 yr · 4 sem"
          badge="ACTIVE"
          description="Specialisation under M.Sc. in Computer Engineering. Cryptography, SDN/NFV, IPv6, 5G, IoT, post-quantum security."
        />
        <SidebarItem
          href="/ioe/bct"
          title="Bachelor of Computer Engineering (BCT)"
          code="BCT"
          meta="4 yr · 8 sem"
          description="From data structures and OS through compilers, networks, and capstone project work."
        />
        <SidebarItem
          href="/ioe/bce"
          title="Bachelor of Civil Engineering (BCE)"
          code="BCE"
          meta="4 yr · 8 sem"
          description="Structural, geotechnical, transportation, water resources, surveying."
        />
        <SidebarItem
          href="/ioe/bel"
          title="Bachelor of Electrical Engineering (BEL)"
          code="BEL"
          meta="4 yr · 8 sem"
          description="Power systems, machines, control, electronics, instrumentation."
        />
        <SidebarItem
          href="/ioe/bex"
          title="Bachelor of Electronics & Communication (BEX)"
          code="BEX"
          meta="4 yr · 8 sem"
          description="Analog/digital electronics, communications, embedded systems, signal processing."
        />
      </SidebarItemList>

      <SidebarItemList
        title="CTEVT — Council for Technical Education & Vocational Training"
        hint="Three-year diploma programs across engineering trades"
      >
        <SidebarItem
          href="/ctevt/diploma-computer"
          title="Diploma in Computer Engineering"
          code="DCE"
          meta="3 yr · 6 sem"
          description="Programming, databases, networking, OS, microprocessors, web technologies."
        />
        <SidebarItem
          href="/ctevt/diploma-civil"
          title="Diploma in Civil Engineering"
          code="DCV"
          meta="3 yr · 6 sem"
          description="Surveying, structures, hydraulics, transportation, project management."
        />
        <SidebarItem
          href="/ctevt/diploma-electrical"
          title="Diploma in Electrical Engineering"
          code="DEE"
          meta="3 yr · 6 sem"
          description="Circuits, machines, power, instrumentation, industrial drives."
        />
      </SidebarItemList>
    </section>
  );
}

function Principles() {
  return (
    <section className={styles.principles}>
      <h2 className={styles.h2}>How this works</h2>
      <div className={styles.grid}>
        <div>
          <h3 className={styles.cardH}>Read, don't decorate</h3>
          <p>
            Lora and Inter on a warm paper background, hairline rules, no decorative gradients.
            Reading is the feature.
          </p>
        </div>
        <div>
          <h3 className={styles.cardH}>Equations as first-class</h3>
          <p>
            KaTeX renders inline and display math at native quality. No image stand-ins, no surprise
            typography.
          </p>
        </div>
        <div>
          <h3 className={styles.cardH}>Search, sync, offline</h3>
          <p>
            Algolia DocSearch when available, with a local index as fallback. PWA caches everything
            for offline review.
          </p>
        </div>
        <div>
          <h3 className={styles.cardH}>Edit on GitHub</h3>
          <p>
            Every page links to its source. Spot a typo or a better explanation — open a PR straight
            from the page.
          </p>
        </div>
        <div>
          <h3 className={styles.cardH}>Track your syllabus</h3>
          <p>
            A LocalStorage checklist on each syllabus page so you can mark chapters complete as you
            study them.
          </p>
        </div>
        <div>
          <h3 className={styles.cardH}>Focus when needed</h3>
          <p>
            Shift+F enters Focus Mode: navbar, sidebar, and chrome step aside. Esc brings them back.
          </p>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className={styles.cta}>
      <div>
        <h2 className={styles.h2}>Missing something?</h2>
        <p>
          If a subject, lab manual, or past paper isn't here yet, request it — most fills happen
          within a week.
        </p>
      </div>
      <Link to="/contribute#request" className={styles.btnPrimary}>
        Request a resource
      </Link>
    </section>
  );
}
