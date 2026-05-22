// Wraps the original Docusaurus Layout and mounts global UI affordances
// (Focus Mode, Bundle FAB, Scroll progress, Keyboard help).
//
// Each of the wrapped components reads its own feature flag from
// siteConfig.customFields.features and self-renders to null when disabled.

import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import FocusMode      from '@site/src/components/FocusMode';
import ScrollProgress from '@site/src/components/ScrollProgress';
import KeyboardHelp   from '@site/src/components/KeyboardHelp';
import BundleFab      from '@site/src/components/BundleBuilder/BundleFab';

export default function LayoutWrapper(props) {
  return (
    <>
      <ScrollProgress />
      <OriginalLayout {...props} />
      <BundleFab />
      <FocusMode />
      <KeyboardHelp />
    </>
  );
}
