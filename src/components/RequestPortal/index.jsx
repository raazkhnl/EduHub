import React from 'react';
import styles from './styles.module.css';

/**
 * RequestPortal — "Missing a resource?" embedded form.
 *
 * Embeds a Tally / Google Form via <iframe>. The URL is taken from
 * `siteConfig.customFields.requestFormUrl` (set in docusaurus.config.js) or
 * the prop, so non-coders can change the form without touching JSX.
 *
 * Falls back to a plain mailto link if no form URL is configured — students
 * never hit a dead page.
 *
 * Usage:
 *   <RequestPortal />
 *   <RequestPortal formUrl="https://tally.so/embed/wXYZ?alignLeft=1&hideTitle=1" height={620} />
 */
export default function RequestPortal({
  formUrl,
  height = 720,
  fallbackEmail = 'raju@astha.ai',
  title = 'Request a resource',
  subtitle = 'Missing a syllabus, lab manual, or past paper? Tell us what you need — most requests are filled within a week.',
}) {
  if (!formUrl) {
    return (
      <section className={styles.fallback}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
        <a className={styles.btn} href={`mailto:${fallbackEmail}?subject=EduHub%20—%20resource%20request`}>
          Email the request
        </a>
        <p className={styles.note}>
          Or open an issue on{' '}
          <a href="https://github.com/raazkhnl/eduhub/issues/new?labels=request" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>.
        </p>
      </section>
    );
  }

  return (
    <section className={styles.wrap} aria-labelledby="rp-title">
      <header className={styles.head}>
        <h3 id="rp-title" className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
      </header>
      <div className={styles.frameWrap} style={{ minHeight: height }}>
        <iframe
          src={formUrl}
          loading="lazy"
          title="Resource request form"
          width="100%"
          height={height}
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
        >
          Loading form…
        </iframe>
      </div>
    </section>
  );
}
