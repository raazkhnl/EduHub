// Swizzled PwaReloadPopup — local copy of the @docusaurus/plugin-pwa theme
// component. We swizzle it for two reasons:
//   1. Some dev-server setups fail to resolve `@theme/PwaReloadPopup` against
//      the plugin's own theme path, throwing "Module not found" at start time.
//      Owning the file in src/theme/ removes that ambiguity.
//   2. Lets us restyle it to match EduHub's premium glass-chip look (mint
//      accent, hairline border, soft shadow) instead of the Docusaurus alert.
//
// Surfaced when a new service-worker version is ready — clicking Refresh
// reloads the page so the new build's chunks are picked up.
import React, { useState } from 'react';
import clsx from 'clsx';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

export default function PwaReloadPopup({ onReload }) {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  return (
    <div className={clsx(styles.popup)} role="status" aria-live="polite">
      <span className={styles.dot} aria-hidden="true" />
      <p className={styles.text}>
        <Translate id="theme.PwaReloadPopup.info" description="The text for PWA reload popup">
          New version available
        </Translate>
      </p>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.refresh}
          onClick={() => {
            setIsVisible(false);
            onReload();
          }}
        >
          <Translate
            id="theme.PwaReloadPopup.refreshButtonText"
            description="The text for PWA reload button"
          >
            Refresh
          </Translate>
        </button>
        <button
          type="button"
          aria-label={translate({
            id: 'theme.PwaReloadPopup.closeButtonAriaLabel',
            message: 'Close',
            description: 'The ARIA label for close button of PWA reload popup',
          })}
          className={styles.close}
          onClick={() => setIsVisible(false)}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>
  );
}
