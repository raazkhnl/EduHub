import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * SidebarItem — a compact, opinionated sidebar/listing row.
 *
 * Use it on landing pages (a program's syllabus listing, or a subject's
 * material-type index) where Docusaurus's auto-generated tree would feel too
 * heavy. It is *not* a swizzle of the docs sidebar — it is a presentation
 * component, free of Docusaurus internals.
 *
 * Usage:
 *   <SidebarItem
 *     href="/ioe/msncs/year-1-part-1/cryptography"
 *     title="Cryptography & Data Security"
 *     code="ENCTNS502"
 *     meta="4 cr · 64 hrs"
 *     badge="CORE"
 *     description="Symmetric/asymmetric crypto, hash functions, PKI, data security, privacy."
 *   />
 */
export default function SidebarItem({
  href,
  title,
  code,
  meta,
  badge,
  description,
  active = false,
  external = false,
  className,
}) {
  const Wrapper = external ? 'a' : Link;
  const wrapperProps = external
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { to: href };

  return (
    <Wrapper
      {...wrapperProps}
      className={clsx(styles.item, active && styles.active, className)}
    >
      <div className={styles.main}>
        <div className={styles.heading}>
          {code && <span className={styles.code}>{code}</span>}
          <span className={styles.title}>{title}</span>
          {badge && <span className={styles.badge} data-variant={badge.toLowerCase()}>{badge}</span>}
        </div>
        {description && <p className={styles.desc}>{description}</p>}
      </div>
      <div className={styles.tail}>
        {meta && <span className={styles.meta}>{meta}</span>}
        <span className={styles.chev} aria-hidden="true">→</span>
      </div>
    </Wrapper>
  );
}

/** Grouping wrapper to render a row of SidebarItems with consistent rhythm. */
export function SidebarItemList({ children, title, hint }) {
  return (
    <section className={styles.list}>
      {(title || hint) && (
        <header className={styles.listHead}>
          {title && <h3 className={styles.listTitle}>{title}</h3>}
          {hint  && <p className={styles.listHint}>{hint}</p>}
        </header>
      )}
      <div className={styles.listBody}>{children}</div>
    </section>
  );
}
