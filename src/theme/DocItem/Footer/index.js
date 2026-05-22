// Wraps (not replaces) the doc page footer to add:
//   - an "Add to bundle" chip
//   - a reading-time estimate
// next to the existing tags / "Edit this page" / "Last updated" footer.
//
// Regenerate the unmodified original any time with:
//   npm run swizzle -- @docusaurus/theme-classic DocItem/Footer

import React from 'react';
import OriginalFooter from '@theme-original/DocItem/Footer';
import AddToBundleButton from '@site/src/components/BundleBuilder/AddToBundleButton';
import ReadingTime from '@site/src/components/ReadingTime';
import styles from './styles.module.css';

export default function FooterWrapper(props) {
  return (
    <>
      <div className={styles.utility}>
        <AddToBundleButton />
        <ReadingTime />
      </div>
      <OriginalFooter {...props} />
    </>
  );
}
